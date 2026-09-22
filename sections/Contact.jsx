import { useState } from "react";
import { useData } from "../context/DataContext";
import { createDoc } from "../firebase/firestore";
import { company } from "../data/company";
import { LuMail, LuMapPin, LuGlobe, LuSend, LuCheck } from "react-icons/lu";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa6";

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
    _hp: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setError("");

    try {
      // 1. Submit to Resend Serverless Endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.projectType,
          message: form.message,
          _hp: form._hp,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      // 2. Also log to Firestore if available
      try {
        await createDoc("contact_submissions", {
          name: form.name,
          email: form.email,
          projectType: form.projectType,
          message: form.message,
          timestamp: new Date().toISOString(),
          read: false,
        });
      } catch (err) {
        console.warn("Notice: Firestore backup error:", err.message);
      }

      setSent(true);
      setForm({
        name: "",
        email: "",
        projectType: "Web Application",
        message: "",
        _hp: "",
      });
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setError(err.message || "Failed to deliver enquiry. Please contact info@hyrovision.com.");
    } finally {
      setSending(false);
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
      icon: <LuMail size={18} />,
      label: "Email",
      value: emailVal,
      href: `mailto:${emailVal}`,
    },
    {
      icon: <FaWhatsapp size={18} />,
      label: "WhatsApp",
      value: whatsappVal,
      href: whatsappLink,
    },
    {
      icon: <LuMapPin size={18} />,
      label: "Operations",
      value: "Remote Worldwide · Engineering Studio",
      href: null,
    },
  ];

  const SOCIALS = [
    { label: "LinkedIn", href: "#", icon: FaLinkedin },
    { label: "GitHub", href: "#", icon: FaGithub },
    { label: "Website", href: company.contact.website, icon: LuGlobe },
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
                  <div className="ci-icon" style={{ color: "var(--cyan)" }}>{c.icon}</div>
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
              {SOCIALS.map((s) => {
                const IconComponent = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className="ci-social-btn"
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <IconComponent size={14} />
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Honeypot field for bot detection */}
            <input
              type="text"
              name="_hp"
              value={form._hp || ""}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none", position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            />

            {sent && (
              <div className="cf-success">
                <LuCheck size={18} />
                Enquiry transmitted successfully! Confirmation sent to your inbox.
              </div>
            )}

            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "8px",
                  color: "#f87171",
                  fontSize: "0.875rem",
                  marginBottom: "16px",
                }}
              >
                {error}
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
