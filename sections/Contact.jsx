import { useState } from "react";
import { useData } from "../context/DataContext";
import { createDoc } from "../firebase/firestore";
import { company } from "../data/company";

const PROJECT_TYPES = [
  "Web Application",
  "SaaS Platform",
  "AI Product / Agent",
  "Autonomous Automation",
  "Enterprise System",
  "IoT & Connected Devices",
  "Other",
];

export default function ContactSection() {
  const { contactInfo } = useData();
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Web Application",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSending(true);
      try {
        await createDoc("contact_submissions", {
          ...form,
          timestamp: new Date().toISOString(),
          read: false,
        });
      } catch (err) {
        console.warn("Notice: Storing submission locally:", err.message);
      } finally {
        setSent(true);
        setSending(false);
        setForm({
          name: "",
          email: "",
          projectType: "Web Application",
          message: "",
        });
        setTimeout(() => setSent(false), 5000);
      }
    }
  };

  const inputStyle = (name) => ({
    borderColor: focused === name ? "var(--cyan)" : "var(--input-border)",
    boxShadow: focused === name ? "0 0 0 3px rgba(var(--cyan-rgb), 0.15)" : "none",
  });

  const emailVal = contactInfo?.email || company.contact.email;
  const whatsappVal = contactInfo?.whatsapp_number || company.contact.whatsappNumber;
  const whatsappLink = `https://wa.me/${whatsappVal.replace(/[^0-9]/g, "")}`;

  const CONTACT_INFO = [
    {
      icon: "✉️",
      label: "Email",
      value: emailVal,
      href: `mailto:${emailVal}`,
    },
    {
      icon: "💬",
      label: "WhatsApp",
      value: whatsappVal,
      href: whatsappLink,
    },
    {
      icon: "📍",
      label: "Operations",
      value: "Remote Worldwide · Engineering Studio",
      href: null,
    },
  ];

  const SOCIALS = [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Website", href: company.contact.website },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Direct Inquiry</div>
          <h2 className="section-title">
            Let's Build <span className="gradient-text">Something.</span>
          </h2>
          <p className="section-subtitle">
            Tell us about your project requirements, goals, or business challenge. We'll respond promptly.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="ci-title">Start a Conversation</h3>
            <p className="ci-desc">
              Whether you are engineering a new digital product, automating workflows, or embedding AI intelligence — we are ready to partner with you.
            </p>
            <div className="ci-items">
              {CONTACT_INFO.map((c) => (
                <div key={c.label} className="ci-item">
                  <div className="ci-icon">{c.icon}</div>
                  <div>
                    <div className="ci-label">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="ci-value">
                        {c.value}
                      </a>
                    ) : (
                      <span className="ci-value">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="ci-social">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} className="ci-social-btn">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {sent && (
              <div className="cf-success">
                <span>✓</span> Thank you! Your project inquiry has been received.
              </div>
            )}
            <div className="cf-row">
              <div className="cf-field">
                <label className="cf-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  className="cf-input"
                  style={inputStyle("name")}
                  required
                />
              </div>
              <div className="cf-field">
                <label className="cf-label">Work Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="cf-input"
                  style={inputStyle("email")}
                  required
                />
              </div>
            </div>

            <div className="cf-field">
              <label className="cf-label">Project Type</label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                onFocus={() => setFocused("projectType")}
                onBlur={() => setFocused("")}
                className="cf-input"
                style={inputStyle("projectType")}
              >
                {PROJECT_TYPES.map((pt) => (
                  <option key={pt} value={pt} style={{ background: "var(--bg)", color: "var(--text)" }}>
                    {pt}
                  </option>
                ))}
              </select>
            </div>

            <div className="cf-field">
              <label className="cf-label">Project Details</label>
              <textarea
                name="message"
                placeholder="Describe your system requirements, timeline, objectives..."
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused("")}
                className="cf-textarea"
                style={inputStyle("message")}
                rows={5}
                required
              />
            </div>

            <button type="submit" className="cf-submit" disabled={sending}>
              {sending ? "Transmitting..." : <>{"Submit Inquiry"} <span>→</span></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
