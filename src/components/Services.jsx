import { Database, TrendingUp, FileText, BarChart3 } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const ICONS = [Database, TrendingUp, FileText, BarChart3];

export default function Services({ t }) {
  const headerReveal = useReveal();

  return (
    <section id="services">
      <div className="container">
        <div ref={headerReveal.ref} className={`section-header reveal ${headerReveal.visible ? "visible" : ""}`}>
          <span className="section-kicker">{t.services.kicker}</span>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>

        <div className="grid-4">
          {t.services.items.map((item, idx) => {
            const Icon = ICONS[idx];
            return <ServiceCard key={item.id} Icon={Icon} title={item.title} desc={item.desc} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ Icon, title, desc }) {
  const reveal = useReveal();
  return (
    <article ref={reveal.ref} className={`card reveal ${reveal.visible ? "visible" : ""}`}>
      <div className="icon-box" aria-hidden="true">
        <Icon size={24} />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{desc}</p>
    </article>
  );
}
