import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

export default function Faq({ t }) {
  const headerReveal = useReveal();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="section-alt">
      <div className="container">
        <div ref={headerReveal.ref} className={`section-header reveal ${headerReveal.visible ? "visible" : ""}`}>
          <span className="section-kicker">{t.faq.kicker}</span>
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
        </div>

        <div className="faq-list">
          {t.faq.items.map((item, idx) => (
            <FaqItem
              key={idx}
              idx={idx}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ idx, question, answer, isOpen, onToggle }) {
  const reveal = useReveal();
  const panelId = `faq-panel-${idx}`;

  return (
    <div ref={reveal.ref} className={`faq-item reveal ${reveal.visible ? "visible" : ""}`}>
      <button
        type="button"
        className="faq-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{question}</span>
        <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
      </button>
      {isOpen && (
        <div id={panelId} className="faq-panel">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
