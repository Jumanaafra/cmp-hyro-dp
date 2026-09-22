import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { company } from "../data/company";
import "../styles/pages.css";

import {
  LuMail,
  LuPhone,
  LuMessageSquare,
  LuSend,
  LuShieldCheck,
  LuClock,
  LuCircleCheck,
  LuArrowRight,
} from "react-icons/lu";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    service: "Full-Stack Web Application",
    budget: "$5,000 - $15,000",
    message: "",
    _hp: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Your name is required";
    if (!form.email.trim()) {
      errs.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!form.message.trim() || form.message.length < 10) {
      errs.message = "Please share a brief description (min 10 chars) of your project requirements";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.companyName,
          service: form.service,
          budget: form.budget,
          message: form.message,
          _hp: form._hp,
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { error: `Server response error (${res.status}). Please contact info@hyrovision.com.` };
      }
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setServerError(err.message || "Failed to deliver enquiry. Please contact info@hyrovision.com.");
    } finally {
      setLoading(false);
    }
  };

  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Hyro Vision",
    "description": "Get in touch with Hyro Vision for full-stack web development, enterprise systems, and AI engineering inquiries.",
    "url": "https://hyrovision.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "email": company.contact.email,
      "telephone": company.contact.whatsappNumber,
    },
  };

  return (
    <>
      <SEO
        title="Contact Us — Start an Engineering Project"
        description="Connect with Hyro Vision's engineering team to scope your web platform, SaaS dashboard, or autonomous AI agent project."
        schema={structuredSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <Navbar />

      <main className="page-shell">
        <div className="page-bg-grid" />
        <div className="page-orb page-orb-1" />
        <div className="page-orb page-orb-2" />

        <div className="page-container">
          {/* Breadcrumb */}
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-breadcrumb-sep">/</span>
            <span className="page-breadcrumb-current">Contact</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Direct Engineering Consultation
            </div>
            <h1 className="page-title">
              Let's Build Something <span>Extraordinary Together</span>.
            </h1>
            <p className="page-subtitle">
              Whether you need to architect a production SaaS platform, automate complex workflows with AI agents, or scale existing cloud systems, our team is ready to assist.
            </p>
          </header>

          <div className="page-grid-2" style={{ gap: "40px", alignItems: "flex-start" }}>
            {/* Left: Contact Info & SLAs */}
            <div>
              <div className="page-card" style={{ padding: "32px", marginBottom: "24px" }}>
                <h2 className="page-card-title">Direct Communication Channels</h2>
                <p className="page-card-desc">
                  Skip the middleman and communicate directly with our technical team.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <a
                    href={`mailto:${company.contact.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      textDecoration: "none",
                      color: "var(--text)",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: "var(--input-bg)",
                      border: "1px solid var(--border)",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <div style={{ color: "var(--cyan)", fontSize: "20px" }}><LuMail /></div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase" }}>Email Inquiries</div>
                      <div style={{ fontWeight: 600 }}>{company.contact.email}</div>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${company.contact.whatsappNumber.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      textDecoration: "none",
                      color: "var(--text)",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: "var(--input-bg)",
                      border: "1px solid var(--border)",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <div style={{ color: "#25D366", fontSize: "22px" }}><FaWhatsapp /></div>
                    <div>
                       <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase" }}>WhatsApp Chat</div>
                      <div style={{ fontWeight: 600 }}>{company.contact.whatsappNumber}</div>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/hyrovision/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      textDecoration: "none",
                      color: "var(--text)",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: "var(--input-bg)",
                      border: "1px solid var(--border)",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <div style={{ color: "#0A66C2", fontSize: "22px" }}><FaLinkedin /></div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase" }}>LinkedIn Official</div>
                      <div style={{ fontWeight: 600 }}>linkedin.com/company/hyrovision</div>
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/hyro_vision?stkn=NnlmdjM1cnd2dmkx"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      textDecoration: "none",
                      color: "var(--text)",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: "var(--input-bg)",
                      border: "1px solid var(--border)",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <div style={{ color: "#E4405F", fontSize: "22px" }}><FaInstagram /></div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", textTransform: "uppercase" }}>Instagram Official</div>
                      <div style={{ fontWeight: 600 }}>@hyro_vision</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="page-card" style={{ padding: "28px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <LuShieldCheck color="var(--cyan)" /> Our Commitment to You
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    <LuClock color="var(--cyan)" size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>24-Hour Response SLA:</strong> We review all technical inquiries within one business day.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    <LuCircleCheck color="var(--cyan)" size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>NDA / IP Protection:</strong> Your intellectual property, trade secrets, and codebase remain strictly yours.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    <LuCircleCheck color="var(--cyan)" size={16} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span><strong>Fixed Milestone Estimates:</strong> Clear deliverables and sprint horizons before work begins.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Scoping Form */}
            <div className="page-card" style={{ padding: "36px", borderColor: "rgba(var(--cyan-rgb), 0.25)" }}>
              <h2 className="page-card-title" style={{ fontSize: "1.5rem", marginBottom: "8px" }}>
                Project Scoping Form
              </h2>
              <p className="page-card-desc" style={{ marginBottom: "24px" }}>
                Fill in the details below and we'll reply with technical feedback and sprint feasibility.
              </p>

              {submitted ? (
                <div className="form-success-banner">
                  <h3 style={{ margin: "0 0 8px 0", color: "#34d399", fontSize: "1.2rem" }}>
                    Message Received!
                  </h3>
                  <p style={{ margin: "0 0 12px 0", color: "var(--text)" }}>
                    Thank you, <strong>{form.name}</strong>. Your project inquiry has been delivered and confirmation sent to <strong>{form.email}</strong>. Our engineering team will be in touch within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        companyName: "",
                        service: "Full-Stack Web Application",
                        budget: "$5,000 - $15,000",
                        message: "",
                        _hp: "",
                      });
                    }}
                    className="page-btn page-btn-outline"
                    style={{ fontSize: "0.85rem", padding: "8px 16px" }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-shell" noValidate>
                  {/* Honeypot field for bot detection */}
                  <input
                    type="text"
                    name="_hp"
                    value={form._hp || ""}
                    onChange={(e) => setForm({ ...form, _hp: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: "none", position: "absolute", left: "-9999px" }}
                    aria-hidden="true"
                  />

                  {serverError && (
                    <div
                      style={{
                        padding: "14px 18px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "8px",
                        color: "#f87171",
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {serverError}
                    </div>
                  )}

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Your Name <span className="form-label-required">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Jordan Vance"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Work Email <span className="form-label-required">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input"
                        placeholder="jordan@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="companyName">
                        Company / Organization (Optional)
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        className="form-input"
                        placeholder="Acme Inc."
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="service">
                        Primary Service Needed
                      </label>
                      <select
                        id="service"
                        className="form-select"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                      >
                        <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                        <option value="Custom SaaS / Enterprise Platform">Custom SaaS / Enterprise Platform</option>
                        <option value="AI Integration & Autonomous Workflows">AI Integration & Autonomous Agents</option>
                        <option value="Backend Architecture & Database Design">Backend Architecture & Database</option>
                        <option value="Cloud Deployment & Technical SEO">Cloud Deployment & Technical SEO</option>
                        <option value="Other Custom Engineering">Other Custom Engineering</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="budget">
                      Estimated Project Budget
                    </label>
                    <select
                      id="budget"
                      className="form-select"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    >
                      <option value="Under $5,000">Under $5,000 (Small sprint / audit)</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000 (Standard MVP / feature suite)</option>
                      <option value="$15,000 - $30,000">$15,000 - $30,000 (Full platform / multi-agent system)</option>
                      <option value="$30,000+">$30,000+ (Enterprise tier / long-term engagement)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Project Goals & Technical Requirements <span className="form-label-required">*</span>
                    </label>
                    <textarea
                      id="message"
                      className="form-textarea"
                      placeholder="Tell us what you're looking to build, expected timelines, key integrations, or architectural challenges..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="page-btn page-btn-primary"
                    style={{ alignSelf: "flex-start", opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? "Sending..." : (
                      <>
                        <LuSend size={16} /> Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Semantic Internal Linking to Services & Case Studies */}
          <div style={{ marginTop: "36px", textAlign: "center", display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/services" className="page-btn page-btn-outline" style={{ fontSize: "0.875rem" }}>
              Explore Engineering Services →
            </Link>
            <Link to="/projects" className="page-btn page-btn-outline" style={{ fontSize: "0.875rem" }}>
              View Verified Case Studies →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
