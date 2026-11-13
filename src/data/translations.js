/* =========================================================================
   1. CONTACT, LOGO & PORTFOLIO CONFIG (EDIT YOUR DETAILS HERE)
   ========================================================================= */
export const CONFIG = {
  // Edit WhatsApp number (international format without '+' or spaces, e.g. "201001234567")
  whatsappNumber: "249999068473",
  // Edit your contact email address (e.g. "contact@datamedlab.com")
  email: "data.med.lab0000@gmail.com",
  // Edit your portfolio link (e.g. "https://yourportfolio.com")
  portfolioUrl: "https://rococo-tapioca-7ce116.netlify.app/",
  // Edit logo image path (e.g. "/logo.png" placed inside /public) — leave empty to use the DM badge
  logoUrl: "/logo.jpg"
};

export function getWhatsAppUrl(lang = "ar") {
  const raw = CONFIG.whatsappNumber.trim();
  if (raw === "[MY NUMBER]") {
    return "https://wa.me/[MY NUMBER]";
  }
  const message =
    lang === "en"
      ? "Hello DataMed Lab, I would like to inquire about your biostatistics and medical data analysis service."
      : "مرحبًا مختبر البيانات الطبية (DataMed Lab)، أود الاستفسار عن خدمة التحليل الإحصائي الطبي.";
  return `https://wa.me/${raw.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}

export function getSafePortfolioUrl(customUrl) {
  const raw = (customUrl || CONFIG.portfolioUrl || "").trim();
  return /^https?:\/\/.+/i.test(raw) ? raw : "#work";
}

/* =========================================================================
   2. BILINGUAL CONTENT OBJECT (ARABIC & ENGLISH)
   ========================================================================= */
export const TRANSLATIONS = {
  ar: {
    dir: "rtl",
    pageTitle: "DataMed Lab | مختبر البيانات الطبية — التحليل الإحصائي الطبي وعلوم البيانات",
    toggleLabel: "EN",
    brand: {
      name: "مختبر البيانات الطبية",
      sub: "DataMed Lab"
    },
    nav: {
      services: "الخدمات",
      how: "آلية العمل",
      work: "أعمالنا",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا"
    },
    hero: {
      badge: "الإحصاء الحيوي وعلوم البيانات الطبية",
      title: "نحوّل بيانات بحثك الطبي إلى نتائج واضحة وموثوقة",
      subtitle:
        "خدمة مستقلة تساعد الباحثين والأطباء وطلاب التخصصات الصحية على تنظيف البيانات، اختيار الاختبارات الإحصائية الدقيقة، وصياغة النتائج برسوم وجداول جاهزة للنشر العلمي.",
      ctaPrimary: "اطلب عبر واتساب",
      ctaSecondary: "شاهد أعمالنا",
      panelTitle: "نظرة سريعة على المخرجات",
      panelTag: "منهجية علمية دقيقة",
      p1Label: "جودة البيانات",
      p1Val: "فحص القيم المفقودة والشاذة",
      p2Label: "التحليل الإحصائي",
      p2Val: "اختبارات معلمية ولا معلمية",
      p3Label: "صياغة النتائج",
      p3Val: "جداول وأساليب متوافقة للنشر",
      p4Label: "سرية تامة",
      p4Val: "التزام كامل بخصوصية البيانات"
    },
    services: {
      kicker: "الخدمات",
      title: "كيف نساعدك في بحثك الطبي؟",
      subtitle: "حزمة خدمات متكاملة تغطي رحلة بياناتك البحثية من الملف الخام حتى النسخة النهائية.",
      items: [
        {
          id: "cleaning",
          title: "تنظيف وتجهيز البيانات",
          desc: "مراجعة ملفات Excel أو CSV، توحيد الترميز، التعامل المنهجي مع القيم المفقودة، وفحص التوزيعات قبل البدء بالتحليل."
        },
        {
          id: "analysis",
          title: "التحليل الإحصائي للبيانات",
          desc: "تطبيق الإحصاء الوصفي والاستدلالي (اختبارات المقارنة، الارتباط، الانحدار، والبقاء) بما يناسب تصميم دراستك."
        },
        {
          id: "writing",
          title: "الكتابة العلمية (المنهجية والنتائج)",
          desc: "صياغة قسمي Methods و Results بلغة أكاديمية دقيقة ومنظمة توضح الاختبارات المستخدمة وقيم الدلالة الإحصائية."
        },
        {
          id: "viz",
          title: "تمثيل البيانات (رسوم بيانية وجداول)",
          desc: "تصميم رسوم بيانية عالية الوضوح وجداول منسقة وفق المعايير العلمية لمجلات النشر ورسائل الماجستير والدكتوراه."
        }
      ]
    },
    audience: {
      kicker: "الفئات المستفيدة",
      title: "لمن صُممت هذه الخدمة؟",
      subtitle: "ندعم كل من يعمل على بيانات صحية أو أبحاث سريرية ويحتاج إلى دقة إحصائية وشرح واضح.",
      items: [
        {
          title: "طلاب الطب والصيدلة وطب الأسنان",
          desc: "مساعدة موجهة في مشاريع التخرج والأبحاث الطلابية مع شرح مبسط للخطوات والنتائج."
        },
        {
          title: "باحثو الدراسات العليا",
          desc: "دعم متكامل لرسائل الماجستير والدكتوراه والأوراق البحثية المعدّة للنشر في المجلات المحكّمة."
        },
        {
          title: "الأطباء المقيمون وحديثو التخرج",
          desc: "تحليل بيانات الدراسات السريرية وسلاسل الحالات (Case Series) بكفاءة توفر وقتك السريري."
        },
        {
          title: "العيادات والمراكز الطبية الصغيرة",
          desc: "تلخيص مؤشرات الأداء وجودة الرعاية والبيانات المجمّعة مجهولة الهوية في تقارير واضحة."
        }
      ]
    },
    how: {
      kicker: "آلية العمل",
      title: "أربع خطوات واضحة من البيانات إلى النتيجة",
      subtitle: "مسار عمل بسيط وشفاف لتعرف تماماً ما ستحصل عليه في كل مرحلة.",
      steps: [
        {
          title: "أرسل بياناتك",
          desc: "شارك ملف البيانات (بعد إزالة أي أسماء أو معرفات شخصية للمرضى) مع أسئلة البحث أو أهداف الدراسة."
        },
        {
          title: "مراجعة سريعة مجانية وعرض سعر",
          desc: "نفحص بنية الملف وحجم العينة ونحدد الاختبارات المناسبة، ثم نرسل لك المدة والتكلفة المقترحة [PRICE]."
        },
        {
          title: "التحليل والتسليم",
          desc: "ننفذ التحليل الإحصائي ونجهز الجداول والرسوم البيانية وتقرير النتائج مع شرح مبسط لكل نتيجة."
        },
        {
          title: "التعديلات والدعم",
          desc: "نرافقك في مراجعة النتائج والإجابة عن استفساراتك وتنفيذ التعديلات المطلوبة بعد ملاحظات المشرفين."
        }
      ]
    },
    work: {
      kicker: "أعمالنا",
      title: "نماذج حيّة ومشاريع مختارة",
      subtitle: "استكشف عروضاً تفاعلية مباشرة تعتمد على بيانات عامة مفتوحة، ثم اطّلع على نماذج من أعمالنا الخاصة.",
      demosHeading: "أ) عروض تفاعلية من مصادر بيانات طبية عامة (للتوضيح فقط)",
      demosSubheading:
        "تُسحب هذه الرسوم مباشرة في متصفحك من واجهات برمجة تطبيقات مفتوحة ولا تمثل مشاريع عملاء أو بيانات مرضى.",
      portfolioHeading: "ب) مشاريع من أعمالي الخاصة",
      portfolioSubheading: "روابط لنماذج وتقارير من معرض الأعمال الخاص بي.",
      viewProject: "عرض المشروع في المعرض",
      projects: [
        {
          tag: "مشروع تحليلي #1",
          title: "[YOUR TEXT: عنوان المشروع الأول — مثال: تحليل عوامل الخطر في دراسة مقطعية]",
          desc: "[YOUR TEXT: وصف مختصر للمنهجية الإحصائية والأدوات المستخدمة ونوع المخرجات بدون ذكر بيانات مرضى.]",
          url: "" // Optional: paste specific project URL or leave empty to use CONFIG.portfolioUrl
        },
        {
          tag: "مشروع تحليلي #2",
          title: "[YOUR TEXT: عنوان المشروع الثاني — مثال: لوحة مؤشرات سريرية وتنظيف بيانات]",
          desc: "[YOUR TEXT: وصف مختصر للتحدي البحثي وكيفية معالجة البيانات وتمثيل النتائج.]",
          url: ""
        },
        {
          tag: "مشروع تحليلي #3",
          title: "[YOUR TEXT: عنوان المشروع الثالث — مثال: مراجعة منهجية أو نمذجة إحصائية]",
          desc: "[YOUR TEXT: وصف مختصر للرسوم البيانية والجداول البحثية المُنتجة في هذا المشروع.]",
          url: ""
        }
      ]
    },
    demos: {
      common: {
        loading: "جاري تحميل البيانات من المصدر...",
        error: "تعذّر الاتصال بواجهة البيانات حالياً. يرجى المحاولة مرة أخرى.",
        retry: "إعادة المحاولة",
        update: "تحديث",
        search: "بحث",
        presetsLabel: "أمثلة سريعة:"
      },
      who: {
        title: "اتجاه متوسط العمر المتوقع عالمياً",
        desc: "عرض تطوّر متوسط العمر المتوقع عند الولادة حسب الدولة المختارة خلال السنوات المتاحة.",
        countryLabel: "الدولة:",
        datasetLabel: "متوسط العمر المتوقع (سنة)",
        source: "المصدر: WHO Global Health Observatory OData API، بيانات عامة، لأغراض العرض التوضيحي فقط."
      },
      ct: {
        title: "خريطة التجارب السريرية المسجلة",
        desc: "توزيع الدراسات السريرية حسب الحالة أو المرحلة البحثية لأي مرض أو حالة طبية تكتبها.",
        byStatus: "حسب الحالة",
        byPhase: "حسب المرحلة",
        datasetLabel: "عدد الدراسات",
        source: "المصدر: ClinicalTrials.gov API v2، بيانات عامة، لأغراض العرض التوضيحي فقط.",
        statuses: {
          RECRUITING: "قيد التوظيف",
          NOT_YET_RECRUITING: "لم يبدأ التوظيف",
          ACTIVE_NOT_RECRUITING: "نشط (انتهى التوظيف)",
          COMPLETED: "مكتملة",
          TERMINATED: "متوقفة مبكراً",
          WITHDRAWN: "مسحوبة"
        },
        phases: {
          EARLY_PHASE1: "المرحلة المبكرة 1",
          PHASE1: "المرحلة 1",
          PHASE2: "المرحلة 2",
          PHASE3: "المرحلة 3",
          PHASE4: "المرحلة 4",
          NA: "غير منطبق"
        }
      },
      pubmed: {
        title: "حجم النشر العلمي سنوياً في PubMed",
        desc: "تتبّع عدد الأبحاث المنشورة سنوياً خلال آخر 8 سنوات لأي مصطلح بحثي باللغة الإنجليزية.",
        datasetLabel: "عدد المنشورات",
        source: "المصدر: NCBI PubMed E-utilities API، بيانات عامة، لأغراض العرض التوضيحي فقط."
      }
    },
    why: {
      kicker: "لماذا تختارنا؟",
      title: "معايير عمل تمنحك الثقة في نتائجك",
      subtitle: "نجمع بين الخلفية الإحصائية والوعي الطبي لتقديم مخرجات سهلة الفهم وجاهزة للمناقشة أو النشر.",
      items: [
        {
          title: "الدقة المنهجية",
          desc: "التحقق من افتراضات كل اختبار إحصائي قبل تطبيقه لتجنب الاستنتاجات المضللة."
        },
        {
          title: "سرية البيانات التامة",
          desc: "عدم مشاركة ملفاتك مع أي طرف ثالث، والعمل على بيانات منزوعة الهوية فقط."
        },
        {
          title: "سرعة الإنجاز",
          desc: "التزام واضح بالمواعيد المتفق عليها مع متابعة سريعة لمراحل التنفيذ."
        },
        {
          title: "شروحات واضحة بالعربية",
          desc: "نترجم الأرقام ومعاملات الدلالة إلى لغة عربية بسيطة تساعدك في المناقشة."
        }
      ]
    },
    faq: {
      kicker: "الأسئلة الشائعة",
      title: "إجابات سريعة حول الخدمة",
      subtitle: "إذا كان لديك سؤال إضافي لا تتردد في مراسلتنا مباشرة.",
      items: [
        {
          q: "ما البرامج والأدوات التي تستخدمونها في التحليل؟",
          a: "نستخدم أدوات الإحصاء وعلوم البيانات المعتمدة في الأبحاث الطبية مثل R و Python و SPSS و Jamovi وغيرها وفق طبيعة الدراسة ومتطلبات المشرف أو المجلة."
        },
        {
          q: "كم يستغرق تنفيذ التحليل الإحصائي؟",
          a: "تعتمد المدة على حجم البيانات وتعقيد الاختبارات المطلوبة؛ غالباً ما تُحدد المدة الدقيقة فور المراجعة المجانية الأولية لملفك [YOUR TEXT: أضف المدة المعتادة لديك]."
        },
        {
          q: "هل يتم الحفاظ على سرية بياناتي البحثية؟",
          a: "نعم، تُعامل جميع الملفات والنتائج بسرية تامة ولا يُعاد استخدامها أو مشاركتها إطلاقاً، كما ننصح دائماً بإزالة أسماء المرضى أو أرقامهم التعريفية قبل الإرسال."
        },
        {
          q: "هل تساعدون في تعديلات الرسائل العلمية وملاحظات المحكّمين؟",
          a: "بالتأكيد. نقدم دعماً لتنفيذ التعديلات الإحصائية المطلوبة من لجنة المناقشة أو محكّمي المجلات العلمية وتوضيح الردود الإحصائية المناسبة."
        },
        {
          q: "كيف تتم عملية الدفع وما هي التكلفة؟",
          a: "يُحدد السعر [PRICE] بناءً على حجم العمل بعد المراجعة المجانية الأولية، وتتوفر وسائل الدفع التالية: [YOUR TEXT: اذكر وسائل الدفع المتاحة لديك مثل التحويل البنكي أو المحافظ الإلكترونية]."
        }
      ]
    },
    contact: {
      kicker: "تواصل معنا",
      title: "ابدأ مراجعة بياناتك اليوم",
      subtitle: "راسلنا عبر واتساب أو البريد الإلكتروني، أو جهّز رسالتك عبر النموذج التالي.",
      waTitle: "التواصل السريع عبر واتساب",
      waDesc: "أرسل وصفاً موجزاً لدراستك لتحصل على رد ومراجعة أولية مجانية.",
      waBtn: "مراسلة عبر واتساب",
      emailTitle: "البريد الإلكتروني المباشر",
      emailDesc: "لإرسال ملفات البيانات الكبيرة أو طلب عرض سعر مكتوب:",
      copyEmailBtn: "نسخ البريد",
      copiedEmailBtn: "تم النسخ!",
      form: {
        nameLabel: "الاسم",
        emailLabel: "البريد الإلكتروني",
        serviceLabel: "الخدمة المطلوبة",
        msgLabel: "نبذة عن البيانات أو الدراسة",
        submit: "فتح تطبيق البريد وإرسال الرسالة"
      }
    },
    footer: {
      brand: "DataMed Lab | مختبر البيانات الطبية",
      tagline: "خدمات التحليل الإحصائي الطبي وعلوم البيانات البحثية",
      copyright: "© 2026 DataMed Lab. جميع الحقوق محفوظة.",
      confidential: "يتم التعامل مع جميع البيانات بسرية تامة."
    }
  },

  en: {
    dir: "ltr",
    pageTitle: "DataMed Lab — Biostatistics & Medical Data Science",
    toggleLabel: "AR",
    brand: {
      name: "DataMed Lab",
      sub: "مختبر البيانات الطبية"
    },
    nav: {
      services: "Services",
      how: "How it works",
      work: "Our work",
      faq: "FAQ",
      contact: "Contact"
    },
    hero: {
      badge: "Biostatistics & Medical Data Science",
      title: "We turn your medical research data into clear, reliable results",
      subtitle:
        "An independent biostatistics service helping medical researchers, clinicians, and healthcare students clean data, choose valid statistical tests, and deliver publication-ready tables and figures.",
      ctaPrimary: "Order via WhatsApp",
      ctaSecondary: "See our work",
      panelTitle: "Deliverables Snapshot",
      panelTag: "Rigorous Methodology",
      p1Label: "Data Hygiene",
      p1Val: "Missing & outlier checks",
      p2Label: "Statistical Testing",
      p2Val: "Parametric & non-parametric",
      p3Label: "Scientific Writing",
      p3Val: "Methods & Results ready",
      p4Label: "Confidentiality",
      p4Val: "Strict data privacy handling"
    },
    services: {
      kicker: "Services",
      title: "How Can We Support Your Research?",
      subtitle: "End-to-end biostatistical support from raw spreadsheet to publication-ready outputs.",
      items: [
        {
          id: "cleaning",
          title: "Data Cleaning",
          desc: "Auditing Excel or CSV sheets, standardizing coding, handling missing values appropriately, and checking distributions before analysis."
        },
        {
          id: "analysis",
          title: "Statistical Data Analysis",
          desc: "Descriptive and inferential statistics (group comparisons, correlation, regression, and survival analysis) tailored to your study design."
        },
        {
          id: "writing",
          title: "Scientific Writing (Methods & Results)",
          desc: "Clear, structured academic drafting of your Methods and Results sections with exact test names and statistical reporting."
        },
        {
          id: "viz",
          title: "Data Visualization (Charts & Tables)",
          desc: "High-resolution figures and cleanly formatted summary tables aligned with journal and thesis submission guidelines."
        }
      ]
    },
    audience: {
      kicker: "Who It's For",
      title: "Built for Healthcare Researchers & Teams",
      subtitle: "Tailored support whether you are preparing a graduation project, thesis, or clinical audit.",
      items: [
        {
          title: "Medical, Pharmacy & Dentistry Students",
          desc: "Guided statistical support for graduation projects and student research, paired with clear explanations."
        },
        {
          title: "Postgraduate Researchers",
          desc: "Comprehensive analysis for Master's theses, PhD dissertations, and peer-reviewed journal manuscripts."
        },
        {
          title: "Junior Doctors",
          desc: "Efficient analysis of clinical audits, observational cohorts, and case series that respects your clinical schedule."
        },
        {
          title: "Small Clinics",
          desc: "Clear summaries of anonymized clinic metrics, outcomes, and quality-of-care indicators."
        }
      ]
    },
    how: {
      kicker: "How It Works",
      title: "Four Simple Steps from Raw Data to Clarity",
      subtitle: "A straightforward, transparent workflow so you know what to expect at every stage.",
      steps: [
        {
          title: "Send Your Data",
          desc: "Share your de-identified dataset (no patient names or personal IDs) along with your research questions or objectives."
        },
        {
          title: "Free Quick Review & Quote",
          desc: "We inspect your data structure and sample size, recommend the right statistical plan, and send a timeline and quote [PRICE]."
        },
        {
          title: "Analysis & Delivery",
          desc: "We run the analysis and deliver clean tables, figures, and a results summary explained in plain language."
        },
        {
          title: "Revisions & Support",
          desc: "We walk you through the findings, answer your questions, and assist with supervisor or reviewer revisions."
        }
      ]
    },
    work: {
      kicker: "Our Work",
      title: "Live Open-Data Demos & Portfolio Projects",
      subtitle: "Explore live interactive charts powered by public open APIs alongside selected personal portfolio work.",
      demosHeading: "A) Live Demos Using Public Open Data (Demonstration Only)",
      demosSubheading:
        "Fetched directly in your browser from free public APIs. These are not client projects and contain zero patient-level data.",
      portfolioHeading: "B) My Own Work",
      portfolioSubheading: "Selected projects linking directly to my external portfolio.",
      viewProject: "View in portfolio",
      projects: [
        {
          tag: "Project #1",
          title: "[YOUR TEXT: Project 1 Title — e.g., Cross-sectional Risk Factor Analysis]",
          desc: "[YOUR TEXT: Brief description of the statistical approach, tools used, and deliverables without any patient data.]",
          url: "" // Optional: paste specific project URL or leave empty to use CONFIG.portfolioUrl
        },
        {
          tag: "Project #2",
          title: "[YOUR TEXT: Project 2 Title — e.g., Clinical Data Cleaning & Visual Report]",
          desc: "[YOUR TEXT: Brief summary of the data preparation steps and how findings were visualized.]",
          url: ""
        },
        {
          tag: "Project #3",
          title: "[YOUR TEXT: Project 3 Title — e.g., Regression Modeling & Manuscript Tables]",
          desc: "[YOUR TEXT: Brief overview of the modeling workflow and publication-ready tables produced.]",
          url: ""
        }
      ]
    },
    demos: {
      common: {
        loading: "Fetching live data...",
        error: "Could not load data right now. Please check your connection and retry.",
        retry: "Retry",
        update: "Update",
        search: "Search",
        presetsLabel: "Quick examples:"
      },
      who: {
        title: "Global Life Expectancy Trend",
        desc: "Life expectancy at birth over available years for the selected country.",
        countryLabel: "Country:",
        datasetLabel: "Life Expectancy (Years)",
        source: "Source: WHO Global Health Observatory OData API, public data, for demonstration only."
      },
      ct: {
        title: "Clinical Trial Landscape",
        desc: "Number of registered trials by recruitment status or phase for a chosen condition.",
        byStatus: "By Status",
        byPhase: "By Phase",
        datasetLabel: "Number of Studies",
        source: "Source: ClinicalTrials.gov API v2, public data, for demonstration only.",
        statuses: {
          RECRUITING: "Recruiting",
          NOT_YET_RECRUITING: "Not Yet Recruiting",
          ACTIVE_NOT_RECRUITING: "Active, Not Recruiting",
          COMPLETED: "Completed",
          TERMINATED: "Terminated",
          WITHDRAWN: "Withdrawn"
        },
        phases: {
          EARLY_PHASE1: "Early Phase 1",
          PHASE1: "Phase 1",
          PHASE2: "Phase 2",
          PHASE3: "Phase 3",
          PHASE4: "Phase 4",
          NA: "Not Applicable"
        }
      },
      pubmed: {
        title: "PubMed Research Output Over Time",
        desc: "Annual number of indexed publications over the last 8 years for your search term.",
        datasetLabel: "Publications",
        source: "Source: NCBI PubMed E-utilities API, public data, for demonstration only."
      }
    },
    why: {
      kicker: "Why Choose Me",
      title: "Reliable Work You Can Defend Confidently",
      subtitle: "Combining statistical rigor with clear communication tailored to medical teams.",
      items: [
        {
          title: "Methodological Accuracy",
          desc: "Every test assumption is checked beforehand so your conclusions remain scientifically sound."
        },
        {
          title: "Strict Data Confidentiality",
          desc: "Your datasets are never shared with third parties and we work strictly with de-identified data."
        },
        {
          title: "Fast, Dependable Delivery",
          desc: "Clear timelines agreed upfront with responsive updates throughout the analysis."
        },
        {
          title: "Clear Explanations",
          desc: "Plain-language explanations in simple Arabic or English so you understand every number."
        }
      ]
    },
    faq: {
      kicker: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Have another question? Reach out directly via WhatsApp or email.",
      items: [
        {
          q: "What software do you use?",
          a: "Depending on your study design and requirements, we use standard statistical tools such as R, Python, SPSS, and Jamovi."
        },
        {
          q: "How long does it take?",
          a: "Turnaround depends on dataset size and complexity; an exact timeline is confirmed after our free initial file review [YOUR TEXT: add your typical turnaround]."
        },
        {
          q: "Is my data kept confidential?",
          a: "Yes. All files and results are kept strictly confidential and are never reused or shared. Please remove patient names or personal identifiers before sending."
        },
        {
          q: "Do you help with thesis revisions?",
          a: "Yes. We support revisions requested by thesis committees or journal peer reviewers and help clarify statistical responses."
        },
        {
          q: "How do I pay?",
          a: "Pricing [PRICE] is quoted after the free quick review. Accepted payment methods: [YOUR TEXT: list your payment methods, e.g., bank transfer / e-wallet]."
        }
      ]
    },
    contact: {
      kicker: "Contact",
      title: "Start With a Free Quick Data Review",
      subtitle: "Message us directly on WhatsApp, email us, or prepare your inquiry with the form below.",
      waTitle: "Fastest Response via WhatsApp",
      waDesc: "Send a brief note about your study to receive an initial review and quote.",
      waBtn: "Chat on WhatsApp",
      emailTitle: "Direct Email",
      emailDesc: "For larger datasets or formal written quotes:",
      copyEmailBtn: "Copy email",
      copiedEmailBtn: "Copied!",
      form: {
        nameLabel: "Your Name",
        emailLabel: "Your Email",
        serviceLabel: "Requested Service",
        msgLabel: "Brief Description of Your Data / Study",
        submit: "Open Email App with Message"
      }
    },
    footer: {
      brand: "DataMed Lab | مختبر البيانات الطبية",
      tagline: "Biostatistics & Medical Data Science Services",
      copyright: "© 2026 DataMed Lab. All rights reserved.",
      confidential: "Data is handled confidentially."
    }
  }
};

export const WHO_COUNTRIES = [
  { code: "SDN", ar: "السودان (SDN)", en: "Sudan (SDN)" },
  { code: "EGY", ar: "مصر (EGY)", en: "Egypt (EGY)" },
  { code: "SAU", ar: "السعودية (SAU)", en: "Saudi Arabia (SAU)" },
  { code: "ARE", ar: "الإمارات (ARE)", en: "United Arab Emirates (ARE)" },
  { code: "JOR", ar: "الأردن (JOR)", en: "Jordan (JOR)" },
  { code: "MAR", ar: "المغرب (MAR)", en: "Morocco (MAR)" },
  { code: "TUN", ar: "تونس (TUN)", en: "Tunisia (TUN)" },
  { code: "KWT", ar: "الكويت (KWT)", en: "Kuwait (KWT)" },
  { code: "GBR", ar: "المملكة المتحدة (GBR)", en: "United Kingdom (GBR)" },
  { code: "USA", ar: "الولايات المتحدة (USA)", en: "United States (USA)" },
  { code: "JPN", ar: "اليابان (JPN)", en: "Japan (JPN)" }
];
