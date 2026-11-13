import { Lock } from "lucide-react";

export default function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">{t.footer.brand}</div>
        <p className="footer-tagline">{t.footer.tagline}</p>
        <div className="footer-meta">
          <span>{t.footer.copyright}</span>
          <span className="footer-confidential">
            <Lock size={15} aria-hidden="true" />
            <span>{t.footer.confidential}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
