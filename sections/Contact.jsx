import { useState, useRef } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  const inputStyle = (name) => ({
    borderColor: focused === name ? "rgba(20,184,166,0.6)" : "rgba(255,255,255,0.1)",
    boxShadow: focused === name ? "0 0 0 3px rgba(20,184,166,0.1)" : "none",
  });

  const CONTACT_INFO = [
    { icon: "✉️", label: "Email", value: import.meta.env.VITE_CONTACT_EMAIL || "hello@hyrovision.ai", href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL || "hello@hyrovision.ai"}` },
    { icon: "💬", label: "WhatsApp", value: import.meta.env.VITE_WHATSAPP_NUMBER || "+1 (555) 123-4567", href: import.meta.env.VITE_WHATSAPP_LINK || "https://wa.me/15551234567" },
    { icon: "📍", label: "Location", value: "Dubai, UAE · Remote Worldwide", href: null },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Get In Touch</div>
          <h2 className="section-title">Ready to <span className="gradient-text">Start?</span></h2>
          <p className="section-subtitle">Tell us about your project. We'll get back to you within 24 hours.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="ci-title">Let's connect</h3>
            <p className="ci-desc">Whether you're looking to build a product, need AI expertise, or want to discuss a complex technical challenge — we're here.</p>
            <div className="ci-items">
              {CONTACT_INFO.map(c => (
                <div key={c.label} className="ci-item">
                  <div className="ci-icon">{c.icon}</div>
                  <div>
                    <div className="ci-label">{c.label}</div>
                    {c.href
                      ? <a href={c.href} className="ci-value">{c.value}</a>
                      : <span className="ci-value">{c.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div className="ci-social">
              {["LinkedIn", "GitHub", "Twitter"].map(s => (
                <a key={s} href="#" className="ci-social-btn">{s}</a>
              ))}
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            {sent && (
              <div className="cf-success">
                <span>✓</span> Message sent! We'll respond within 24 hours.
              </div>
            )}
            <div className="cf-row">
              <div className="cf-field">
                <label className="cf-label">Your Name</label>
                <input
                  type="text" name="name" placeholder="John Doe" value={form.name}
                  onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                  className="cf-input" style={inputStyle("name")} required
                />
              </div>
              <div className="cf-field">
                <label className="cf-label">Email Address</label>
                <input
                  type="email" name="email" placeholder="john@company.com" value={form.email}
                  onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                  className="cf-input" style={inputStyle("email")} required
                />
              </div>
            </div>
            <div className="cf-field">
              <label className="cf-label">Subject</label>
              <input
                type="text" name="subject" placeholder="What's this about?" value={form.subject}
                onChange={handleChange} onFocus={() => setFocused("subject")} onBlur={() => setFocused("")}
                className="cf-input" style={inputStyle("subject")}
              />
            </div>
            <div className="cf-field">
              <label className="cf-label">Message</label>
              <textarea
                name="message" placeholder="Tell us about your project, goals, timeline, and budget..." value={form.message}
                onChange={handleChange} onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                className="cf-textarea" style={inputStyle("message")} rows={6} required
              />
            </div>
            <button type="submit" className="cf-submit">
              Send Message <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
