import { getWhatsAppUrl } from "../data/translations";
import { useReveal } from "../hooks/useReveal";

export default function Hero({ lang, t }) {
  const leftReveal = useReveal();
  const rightReveal = useReveal();

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div ref={leftReveal.ref} className={`reveal ${leftReveal.visible ? "visible" : ""}`}>
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span>{t.hero.badge}</span>
          </div>
          <h1 className="hero-title">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-cta">
            <a
              href={getWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.03 2a9.97 9.97 0 0 0-8.48 15.22L2 22l4.93-1.5A9.98 9.98 0 1 0 12.03 2Zm5.8 14.12c-.24.68-1.42 1.3-1.97 1.38-.52.08-1.18.11-1.91-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.37-5.15-4.57-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38h.58c.19 0 .44-.07.69.52.24.59.84 2.04.91 2.19.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.17-.32.38-.45.51-.15.15-.31.31-.13.61.18.3.8 1.32 1.72 2.14 1.18 1.05 2.17 1.38 2.47 1.53.3.15.48.13.66-.08.18-.2.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.58.35.07.12.07.72-.17 1.4Z" />
              </svg>
              <span>{t.hero.ctaPrimary}</span>
            </a>
            <a href="#work" className="btn btn-secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <aside
          ref={rightReveal.ref}
          className={`hero-visual reveal ${rightReveal.visible ? "visible" : ""}`}
          aria-label="Service overview"
        >
          <div className="hero-visual-header">
            <span className="hero-visual-title">{t.hero.panelTitle}</span>
            <span className="hero-visual-tag">{t.hero.panelTag}</span>
          </div>
          <div className="hero-pillars">
            <div className="hero-pillar">
              <div className="hero-pillar-label">{t.hero.p1Label}</div>
              <div className="hero-pillar-value">{t.hero.p1Val}</div>
            </div>
            <div className="hero-pillar">
              <div className="hero-pillar-label">{t.hero.p2Label}</div>
              <div className="hero-pillar-value">{t.hero.p2Val}</div>
            </div>
            <div className="hero-pillar">
              <div className="hero-pillar-label">{t.hero.p3Label}</div>
              <div className="hero-pillar-value">{t.hero.p3Val}</div>
            </div>
            <div className="hero-pillar">
              <div className="hero-pillar-label">{t.hero.p4Label}</div>
              <div className="hero-pillar-value">{t.hero.p4Val}</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
