import { useReveal } from "../hooks/useReveal";

export default function HowItWorks({ t }) {
  const headerReveal = useReveal();

  return (
    <section id="how-it-works">
      <div className="container">
        <div ref={headerReveal.ref} className={`section-header reveal ${headerReveal.visible ? "visible" : ""}`}>
          <span className="section-kicker">{t.how.kicker}</span>
          <h2 className="section-title">{t.how.title}</h2>
          <p className="section-subtitle">{t.how.subtitle}</p>
        </div>

        <div className="grid-4">
          {t.how.steps.map((step, idx) => (
            <StepCard key={idx} number={idx + 1} title={step.title} desc={step.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ number, title, desc }) {
  const reveal = useReveal();
  return (
    <article ref={reveal.ref} className={`card step-card reveal ${reveal.visible ? "visible" : ""}`}>
      <div className="step-num">{number}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{desc}</p>
    </article>
  );
}
