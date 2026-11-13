import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CONFIG } from "../data/translations";

export default function Header({ t, onToggleLang }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#services", label: t.nav.services },
    { href: "#how-it-works", label: t.nav.how },
    { href: "#work", label: t.nav.work },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact }
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand-link">
          {/* === EDIT LOGO HERE: Set CONFIG.logoUrl in src/data/translations.js or replace <span>DM</span> === */}
          <div className="logo-placeholder" aria-hidden={!CONFIG.logoUrl}>
            {CONFIG.logoUrl ? (
              <img src={CONFIG.logoUrl} alt="DataMed Lab Logo" />
            ) : (
              <span>DM</span>
            )}
          </div>
          <div className="brand-text">
            <span className="brand-name">{t.brand.name}</span>
            <span className="brand-sub">{t.brand.sub}</span>
          </div>
        </a>

        <nav className="nav-desktop" aria-label="Primary Navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="lang-toggle"
            onClick={onToggleLang}
            aria-label="Switch Language"
          >
            <span>{t.toggleLabel}</span>
          </button>

          <button
            type="button"
            className="menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav id="mobileNav" className={`nav-mobile ${menuOpen ? "open" : ""}`} aria-label="Mobile Navigation">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
