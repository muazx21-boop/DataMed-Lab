import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getSafePortfolioUrl, WHO_COUNTRIES } from "../data/translations";
import { useReveal } from "../hooks/useReveal";
import {
  fetchClinicalTrials,
  fetchPubmedTrend,
  fetchWhoLifeExpectancy
} from "../utils/apiCache";
import ChartCanvas from "./ChartCanvas";

export default function WorkSection({ lang, t }) {
  const headerReveal = useReveal();
  const demosHeadReveal = useReveal();
  const portfolioHeadReveal = useReveal();

  return (
    <section id="work" className="section-alt">
      <div className="container">
        <div
          ref={headerReveal.ref}
          className={`section-header reveal ${headerReveal.visible ? "visible" : ""}`}
        >
          <span className="section-kicker">{t.work.kicker}</span>
          <h2 className="section-title">{t.work.title}</h2>
          <p className="section-subtitle">{t.work.subtitle}</p>
        </div>

        <div
          ref={demosHeadReveal.ref}
          className={`subsection-head reveal ${demosHeadReveal.visible ? "visible" : ""}`}
        >
          <h3 className="subsection-title">{t.work.demosHeading}</h3>
          <p className="subsection-desc">{t.work.demosSubheading}</p>
        </div>

        <div className="demo-grid">
          <WhoDemoCard lang={lang} t={t} />
          <ClinicalTrialsDemoCard lang={lang} t={t} />
          <PubmedDemoCard lang={lang} t={t} />
        </div>

        <div
          ref={portfolioHeadReveal.ref}
          className={`subsection-head reveal ${portfolioHeadReveal.visible ? "visible" : ""}`}
        >
          <h3 className="subsection-title">{t.work.portfolioHeading}</h3>
          <p className="subsection-desc">{t.work.portfolioSubheading}</p>
        </div>

        <div className="grid-3">
          {t.work.projects.map((project, idx) => (
            <PortfolioCard
              key={idx}
              tag={project.tag}
              title={project.title}
              desc={project.desc}
              url={project.url}
              ctaLabel={t.work.viewProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoDemoCard({ lang, t }) {
  const reveal = useReveal();
  const [country, setCountry] = useState("EGY");
  const [status, setStatus] = useState("loading");
  const [payload, setPayload] = useState(null);

  const load = useCallback(async (iso3) => {
    setStatus("loading");
    try {
      const data = await fetchWhoLifeExpectancy(iso3);
      setPayload(data);
      setStatus("ready");
    } catch (err) {
      console.error("WHO GHO error:", err);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load(country);
  }, [country, load]);

  const fontFamily = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";

  const chartData = useMemo(() => {
    if (!payload) return null;
    return {
      labels: payload.labels,
      datasets: [
        {
          label: t.demos.who.datasetLabel,
          data: payload.values,
          borderColor: "#2A9D9F",
          backgroundColor: "rgba(42, 157, 159, 0.14)",
          borderWidth: 2.5,
          pointRadius: 3,
          pointBackgroundColor: "#1B3358",
          fill: true,
          tension: 0.25
        }
      ]
    };
  }, [payload, t.demos.who.datasetLabel]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { family: fontFamily } } }
      },
      scales: {
        x: { ticks: { font: { family: fontFamily }, maxTicksLimit: 7 } },
        y: { ticks: { font: { family: fontFamily } } }
      }
    }),
    [fontFamily]
  );

  return (
    <article ref={reveal.ref} className={`demo-card reveal ${reveal.visible ? "visible" : ""}`}>
      <div className="demo-card-top">
        <h4 className="demo-title">{t.demos.who.title}</h4>
        <p className="demo-desc">{t.demos.who.desc}</p>
      </div>

      <div className="demo-controls">
        <label htmlFor="whoCountrySelect" className="demo-control-label">
          {t.demos.who.countryLabel}
        </label>
        <select
          id="whoCountrySelect"
          className="form-control demo-input"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {WHO_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c[lang]}
            </option>
          ))}
        </select>
      </div>

      <div className="demo-chart-wrap">
        {status === "loading" && (
          <div className="demo-state" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <span>{t.demos.common.loading}</span>
          </div>
        )}
        {status === "error" && (
          <div className="demo-state" role="alert">
            <p className="demo-error-text">{t.demos.common.error}</p>
            <button type="button" className="btn btn-outline-teal" onClick={() => load(country)}>
              {t.demos.common.retry}
            </button>
          </div>
        )}
        {chartData && (
          <ChartCanvas
            type="line"
            data={chartData}
            options={chartOptions}
            ariaLabel="WHO Global Health Observatory Chart"
          />
        )}
      </div>

      <p className="demo-caption">{t.demos.who.source}</p>
    </article>
  );
}

const CT_PRESETS = ["type 2 diabetes", "breast cancer", "hypertension", "asthma"];
const PUBMED_PRESETS = ["diabetic retinopathy", "telemedicine", "breast cancer", "machine learning"];

function ClinicalTrialsDemoCard({ lang, t }) {
  const reveal = useReveal();
  const [conditionInput, setConditionInput] = useState("type 2 diabetes");
  const [activeCondition, setActiveCondition] = useState("type 2 diabetes");
  const [groupBy, setGroupBy] = useState("status");
  const [status, setStatus] = useState("loading");
  const [payload, setPayload] = useState(null);

  const load = useCallback(async (cond, group) => {
    setStatus("loading");
    try {
      const data = await fetchClinicalTrials(cond, group);
      setPayload(data);
      setStatus("ready");
    } catch (err) {
      console.error("ClinicalTrials.gov error:", err);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load(activeCondition, groupBy);
  }, [activeCondition, groupBy, load]);

  const fontFamily = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";

  const chartData = useMemo(() => {
    if (!payload) return null;
    const labelMap = payload.groupBy === "phase" ? t.demos.ct.phases : t.demos.ct.statuses;
    return {
      labels: payload.keys.map((k) => labelMap[k] || k),
      datasets: [
        {
          label: t.demos.ct.datasetLabel,
          data: payload.counts,
          backgroundColor: ["#2A9D9F", "#1B3358", "#3B82F6", "#0D9488", "#64748B", "#94A3B8"],
          borderRadius: 6
        }
      ]
    };
  }, [payload, t.demos.ct]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { font: { family: fontFamily, size: 11 } } },
        y: { beginAtZero: true, ticks: { font: { family: fontFamily } } }
      }
    }),
    [fontFamily]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = conditionInput.trim() || "type 2 diabetes";
    if (cleaned === activeCondition) {
      load(cleaned, groupBy);
    } else {
      setActiveCondition(cleaned);
    }
  };

  return (
    <article ref={reveal.ref} className={`demo-card reveal ${reveal.visible ? "visible" : ""}`}>
      <div className="demo-card-top">
        <h4 className="demo-title">{t.demos.ct.title}</h4>
        <p className="demo-desc">{t.demos.ct.desc}</p>
      </div>

      <form className="demo-controls" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control demo-input"
          maxLength={120}
          value={conditionInput}
          onChange={(e) => setConditionInput(e.target.value)}
          aria-label="Medical condition"
        />
        <select
          className="form-control"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          aria-label="Group by"
        >
          <option value="status">{t.demos.ct.byStatus}</option>
          <option value="phase">{t.demos.ct.byPhase}</option>
        </select>
        <button type="submit" className="btn btn-outline-teal">
          {t.demos.common.update}
        </button>
      </form>

      <div className="preset-chips" aria-label={t.demos.common.presetsLabel}>
        <span className="preset-label">{t.demos.common.presetsLabel}</span>
        {CT_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`preset-chip ${activeCondition.toLowerCase() === preset ? "active" : ""}`}
            onClick={() => {
              setConditionInput(preset);
              setActiveCondition(preset);
            }}
          >
            {preset}
          </button>
        ))}
      </div>

      <div className="demo-chart-wrap">
        {status === "loading" && (
          <div className="demo-state" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <span>{t.demos.common.loading}</span>
          </div>
        )}
        {status === "error" && (
          <div className="demo-state" role="alert">
            <p className="demo-error-text">{t.demos.common.error}</p>
            <button
              type="button"
              className="btn btn-outline-teal"
              onClick={() => load(activeCondition, groupBy)}
            >
              {t.demos.common.retry}
            </button>
          </div>
        )}
        {chartData && (
          <ChartCanvas
            type="bar"
            data={chartData}
            options={chartOptions}
            ariaLabel="ClinicalTrials.gov Studies Chart"
          />
        )}
      </div>

      <p className="demo-caption">{t.demos.ct.source}</p>
    </article>
  );
}

function PubmedDemoCard({ lang, t }) {
  const reveal = useReveal();
  const [termInput, setTermInput] = useState("diabetic retinopathy");
  const [activeTerm, setActiveTerm] = useState("diabetic retinopathy");
  const [status, setStatus] = useState("loading");
  const [payload, setPayload] = useState(null);
  const abortRef = useRef(null);

  const load = useCallback(async (term) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    try {
      const data = await fetchPubmedTrend(term, controller.signal);
      setPayload(data);
      setStatus("ready");
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("PubMed E-utilities error:", err);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load(activeTerm);
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [activeTerm, load]);

  const fontFamily = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";

  const chartData = useMemo(() => {
    if (!payload) return null;
    return {
      labels: payload.labels,
      datasets: [
        {
          label: t.demos.pubmed.datasetLabel,
          data: payload.counts,
          backgroundColor: "#1B3358",
          hoverBackgroundColor: "#2A9D9F",
          borderRadius: 6
        }
      ]
    };
  }, [payload, t.demos.pubmed.datasetLabel]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { family: fontFamily } } }
      },
      scales: {
        x: { ticks: { font: { family: fontFamily } } },
        y: { beginAtZero: true, ticks: { font: { family: fontFamily } } }
      }
    }),
    [fontFamily]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = termInput.trim() || "diabetic retinopathy";
    if (cleaned === activeTerm) {
      load(cleaned);
    } else {
      setActiveTerm(cleaned);
    }
  };

  return (
    <article ref={reveal.ref} className={`demo-card reveal ${reveal.visible ? "visible" : ""}`}>
      <div className="demo-card-top">
        <h4 className="demo-title">{t.demos.pubmed.title}</h4>
        <p className="demo-desc">{t.demos.pubmed.desc}</p>
      </div>

      <form className="demo-controls" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control demo-input"
          maxLength={120}
          value={termInput}
          onChange={(e) => setTermInput(e.target.value)}
          aria-label="PubMed search term"
        />
        <button type="submit" className="btn btn-outline-teal">
          {t.demos.common.search}
        </button>
      </form>

      <div className="preset-chips" aria-label={t.demos.common.presetsLabel}>
        <span className="preset-label">{t.demos.common.presetsLabel}</span>
        {PUBMED_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`preset-chip ${activeTerm.toLowerCase() === preset ? "active" : ""}`}
            onClick={() => {
              setTermInput(preset);
              setActiveTerm(preset);
            }}
          >
            {preset}
          </button>
        ))}
      </div>

      <div className="demo-chart-wrap">
        {status === "loading" && (
          <div className="demo-state" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <span>{t.demos.common.loading}</span>
          </div>
        )}
        {status === "error" && (
          <div className="demo-state" role="alert">
            <p className="demo-error-text">{t.demos.common.error}</p>
            <button type="button" className="btn btn-outline-teal" onClick={() => load(activeTerm)}>
              {t.demos.common.retry}
            </button>
          </div>
        )}
        {chartData && (
          <ChartCanvas
            type="bar"
            data={chartData}
            options={chartOptions}
            ariaLabel="PubMed Publications per Year Chart"
          />
        )}
      </div>

      <p className="demo-caption">{t.demos.pubmed.source}</p>
    </article>
  );
}

function PortfolioCard({ tag, title, desc, url, ctaLabel }) {
  const reveal = useReveal();
  return (
    <article ref={reveal.ref} className={`card project-card reveal ${reveal.visible ? "visible" : ""}`}>
      <div>
        <span className="project-tag">{tag}</span>
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{desc}</p>
      </div>
      <a
        className="project-link"
        href={getSafePortfolioUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{ctaLabel}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
