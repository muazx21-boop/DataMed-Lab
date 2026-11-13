import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CONFIG, getWhatsAppUrl } from "../data/translations";
import { useReveal } from "../hooks/useReveal";

export default function Contact({ lang, t }) {
  const headerReveal = useReveal();
  const leftReveal = useReveal();
  const formReveal = useReveal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceId, setServiceId] = useState(t.services.items[0].id);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in non-secure contexts
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedService =
      t.services.items.find((s) => s.id === serviceId)?.title || t.services.items[0].title;

    const safeName = name.trim().replace(/[\r\n]+/g, " ").slice(0, 80);
    const safeEmail = email.trim().replace(/[\r\n]+/g, " ").slice(0, 120);
    const safeMessage = message.trim().slice(0, 1000);

    const subject =
      lang === "ar"
        ? `طلب خدمة من ${safeName} — ${selectedService}`
        : `Service Inquiry from ${safeName} — ${selectedService}`;

    const body =
      lang === "ar"
        ? `الاسم: ${safeName}\nالبريد الإلكتروني: ${safeEmail}\nالخدمة المطلوبة: ${selectedService}\n\nتفاصيل الدراسة:\n${safeMessage}`
        : `Name: ${safeName}\nEmail: ${safeEmail}\nService: ${selectedService}\n\nStudy Details:\n${safeMessage}`;

    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact">
      <div className="container">
        <div ref={headerReveal.ref} className={`section-header reveal ${headerReveal.visible ? "visible" : ""}`}>
          <span className="section-kicker">{t.contact.kicker}</span>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div className="contact-grid">
          <div ref={leftReveal.ref} className={`contact-methods reveal ${leftReveal.visible ? "visible" : ""}`}>
            <div className="contact-box">
              <h3 className="card-title">{t.contact.waTitle}</h3>
              <p className="card-text" style={{ marginBottom: "14px" }}>
                {t.contact.waDesc}
              </p>
              <a
                href={getWhatsAppUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {t.contact.waBtn}
              </a>
            </div>

            <div className="contact-box">
              <h3 className="card-title">{t.contact.emailTitle}</h3>
              <p className="card-text" style={{ marginBottom: "10px" }}>
                {t.contact.emailDesc}
              </p>
              <div className="email-row">
                <a href={`mailto:${CONFIG.email}`} className="project-link">
                  {CONFIG.email}
                </a>
                <button
                  type="button"
                  className="copy-email-btn"
                  onClick={handleCopyEmail}
                >
                  {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                  <span>{copied ? t.contact.copiedEmailBtn : t.contact.copyEmailBtn}</span>
                </button>
              </div>
            </div>
          </div>

          <form
            ref={formReveal.ref}
            className={`contact-form reveal ${formReveal.visible ? "visible" : ""}`}
            onSubmit={handleSubmit}
          >
            <div className="field-group">
              <label htmlFor="senderName" className="field-label">
                {t.contact.form.nameLabel}
              </label>
              <input
                id="senderName"
                type="text"
                className="field-input"
                maxLength={80}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="senderEmail" className="field-label">
                {t.contact.form.emailLabel}
              </label>
              <input
                id="senderEmail"
                type="email"
                className="field-input"
                maxLength={120}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="serviceType" className="field-label">
                {t.contact.form.serviceLabel}
              </label>
              <select
                id="serviceType"
                className="field-input"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              >
                {t.services.items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="senderMessage" className="field-label">
                {t.contact.form.msgLabel}
              </label>
              <textarea
                id="senderMessage"
                rows={4}
                className="field-input"
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-secondary">
              {t.contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
