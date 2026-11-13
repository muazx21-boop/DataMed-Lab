import { lazy, Suspense, useEffect, useState } from "react";
import { TRANSLATIONS } from "./data/translations";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Audience from "./components/Audience";
import HowItWorks from "./components/HowItWorks";
import WhyChooseMe from "./components/WhyChooseMe";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const WorkSection = lazy(() => import("./components/WorkSection"));

export default function App() {
  const [lang, setLang] = useState("ar");
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.title = t.pageTitle;
  }, [lang, t.dir, t.pageTitle]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <>
      <Header t={t} onToggleLang={toggleLanguage} />
      <main id="top">
        <Hero lang={lang} t={t} />
        <Services t={t} />
        <Audience t={t} />
        <HowItWorks t={t} />
        <Suspense
          fallback={
            <section id="work" className="section-alt work-fallback" aria-busy="true">
              <div className="container work-fallback-inner">
                <div className="spinner" aria-hidden="true" />
              </div>
            </section>
          }
        >
          <WorkSection lang={lang} t={t} />
        </Suspense>
        <WhyChooseMe t={t} />
        <Faq t={t} />
        <Contact lang={lang} t={t} />
      </main>
      <Footer t={t} />
      <FloatingWhatsApp lang={lang} />
    </>
  );
}
