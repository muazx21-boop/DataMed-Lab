import { GraduationCap, Search, Stethoscope, Building2 } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const ICONS = [GraduationCap, Search, Stethoscope, Building2];

export default function Audience({ t }) {
  const headerReveal = useReveal();

  return (
    <section id="audience" className="section-alt">
      <div className="container">
        <div ref={headerReveal.ref} className={`section-header reveal ${headerReveal.visible ? "visible" : ""}`}>
          <span className="section-kicker">{t.audience.kicker}</span>
          <h2 className="section-title">{t.audience.title}</h2>
          <p className="section-subtitle">{t.audience.subtitle}</p>
        </div>

        <div className="grid-4">
          {t.audience.items.map((item, idx) => {
            const Icon = ICONS[idx];
            return <AudienceCard key={idx} Icon={Icon} title={item.title} desc={item.desc} />;
          })}
        </div>
      </div>
    </section>
  );
}

function AudienceCard({ Icon, title, desc }) {
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
