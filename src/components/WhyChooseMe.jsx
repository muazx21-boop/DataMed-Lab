import { CheckCircle2, Lock, Clock, MessageSquare } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const ICONS = [CheckCircle2, Lock, Clock, MessageSquare];

export default function WhyChooseMe({ t }) {
  const headerReveal = useReveal();

  return (
    <section id="why-me">
      <div className="container">
        <div ref={headerReveal.ref} className={`section-header reveal ${headerReveal.visible ? "visible" : ""}`}>
          <span className="section-kicker">{t.why.kicker}</span>
          <h2 className="section-title">{t.why.title}</h2>
          <p className="section-subtitle">{t.why.subtitle}</p>
        </div>

        <div className="grid-4">
          {t.why.items.map((item, idx) => {
            const Icon = ICONS[idx];
            return <TrustCard key={idx} Icon={Icon} title={item.title} desc={item.desc} />;
          })}
        </div>
      </div>
    </section>
  );
}

function TrustCard({ Icon, title, desc }) {
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
