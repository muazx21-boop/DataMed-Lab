import { CONFIG, WHO_COUNTRIES } from "../data/translations";

const REQUEST_TIMEOUT_MS = 12000;
const MAX_QUERY_LENGTH = 120;
const ALLOWED_WHO_CODES = new Set(WHO_COUNTRIES.map((c) => c.code));

const cache = {
  who: new Map(),
  ct: new Map(),
  pubmed: new Map()
};

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(id);
          reject(new DOMException("Aborted", "AbortError"));
        },
        { once: true }
      );
    }
  });
}

async function fetchWithTimeout(url, externalSignal) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const onExternalAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timeoutId);
      throw new DOMException("Aborted", "AbortError");
    }
    externalSignal.addEventListener("abort", onExternalAbort, { once: true });
  }

  try {
    return await fetch(url, {
      signal: controller.signal,
      credentials: "omit",
      referrerPolicy: "strict-origin-when-cross-origin"
    });
  } finally {
    clearTimeout(timeoutId);
    if (externalSignal) {
      externalSignal.removeEventListener("abort", onExternalAbort);
    }
  }
}

async function fetchJsonWithProxyFallback(proxyUrl, directUrl) {
  const candidates = [proxyUrl, directUrl];

  let lastError = null;
  for (const url of candidates) {
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status}`);
        continue;
      }
      const contentType = (res.headers.get("content-type") || "").toLowerCase();
      if (!contentType.includes("application/json")) {
        lastError = new Error("Non-JSON response");
        continue;
      }
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("Failed to fetch JSON");
}

function sanitizeQuery(value, fallback) {
  const cleaned = String(value ?? "").trim().slice(0, MAX_QUERY_LENGTH);
  return cleaned || fallback;
}

export async function fetchWhoLifeExpectancy(iso3) {
  const code = String(iso3 ?? "").trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(code) || !ALLOWED_WHO_CODES.has(code)) {
    throw new Error("Invalid country code");
  }

  if (cache.who.has(code)) {
    return cache.who.get(code);
  }

  const filter = encodeURIComponent(`SpatialDim eq '${code}'`);
  const path = `/WHOSIS_000001?$filter=${filter}`;
  const json = await fetchJsonWithProxyFallback(
    `/api/who${path}`,
    `https://ghoapi.azureedge.net/api${path}`
  );
  const rows = Array.isArray(json.value) ? json.value : [];

  const byYear = new Map();
  rows.forEach((r) => {
    if (typeof r.NumericValue !== "number" || !r.TimeDim) return;
    const isBoth = r.Dim1 === "SEX_BTSX" || r.Dim1 === "BTSX";
    const existing = byYear.get(r.TimeDim);
    if (!existing || (isBoth && !existing.isBoth)) {
      byYear.set(r.TimeDim, { year: Number(r.TimeDim), val: r.NumericValue, isBoth });
    }
  });

  const sorted = Array.from(byYear.values()).sort((a, b) => a.year - b.year);
  if (!sorted.length) throw new Error("Empty dataset");

  const payload = {
    labels: sorted.map((d) => String(d.year)),
    values: sorted.map((d) => Number(d.val.toFixed(1)))
  };

  cache.who.set(code, payload);
  return payload;
}

export async function fetchClinicalTrials(condition, groupBy) {
  const cleanCond = sanitizeQuery(condition, "type 2 diabetes");
  const safeGroup = groupBy === "phase" ? "phase" : "status";
  const cacheKey = `${cleanCond.toLowerCase()}::${safeGroup}`;
  if (cache.ct.has(cacheKey)) {
    return cache.ct.get(cacheKey);
  }

  const keys =
    safeGroup === "phase"
      ? ["EARLY_PHASE1", "PHASE1", "PHASE2", "PHASE3", "PHASE4", "NA"]
      : ["RECRUITING", "NOT_YET_RECRUITING", "ACTIVE_NOT_RECRUITING", "COMPLETED", "TERMINATED", "WITHDRAWN"];

  const counts = await Promise.all(
    keys.map(async (key) => {
      const params = new URLSearchParams({
        "query.cond": cleanCond,
        countTotal: "true",
        pageSize: "1",
        fields: "NCTId"
      });
      if (safeGroup === "phase") {
        params.set("filter.advanced", `AREA[Phase]${key}`);
      } else {
        params.set("filter.overallStatus", key);
      }
      const query = `/studies?${params.toString()}`;
      const data = await fetchJsonWithProxyFallback(
        `/api/ct${query}`,
        `https://clinicaltrials.gov/api/v2${query}`
      );
      return typeof data.totalCount === "number" ? data.totalCount : 0;
    })
  );

  const payload = { groupBy: safeGroup, keys, counts };
  cache.ct.set(cacheKey, payload);
  return payload;
}

export async function fetchPubmedTrend(term, signal) {
  const cleanTerm = sanitizeQuery(term, "diabetic retinopathy");
  const cacheKey = cleanTerm.toLowerCase();
  if (cache.pubmed.has(cacheKey)) {
    return cache.pubmed.get(cacheKey);
  }

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear - 7; y <= currentYear; y++) {
    years.push(y);
  }

  const counts = [];
  const contactEmail = CONFIG.email.includes("@") ? CONFIG.email : "demo@datamedlab.example";

  // Space requests >= 380ms apart to stay under NCBI's 3 req/sec limit without an API key
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const params = new URLSearchParams({
      db: "pubmed",
      term: cleanTerm,
      datetype: "pdat",
      mindate: `${year}/01/01`,
      maxdate: `${year}/12/31`,
      retmax: "0",
      retmode: "json",
      tool: "DataMedLabDemo",
      email: contactEmail
    });

    const res = await fetchWithTimeout(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${params.toString()}`,
      signal
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const count = Number.parseInt(data?.esearchresult?.count ?? "0", 10);
    counts.push(Number.isNaN(count) ? 0 : count);

    if (i < years.length - 1) {
      await sleep(380, signal);
    }
  }

  const payload = { labels: years.map(String), counts };
  cache.pubmed.set(cacheKey, payload);
  return payload;
}
