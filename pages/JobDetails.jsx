import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { jobOpenings } from "../data/careers";
import "../styles/pages.css";

import {
  LuGlobe,
  LuClock,
  LuBriefcase,
  LuCircleCheck,
  LuArrowLeft,
  LuSend,
  LuSparkles,
  LuSearch,
} from "react-icons/lu";

export default function JobDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    githubUrl: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const job = jobOpenings.find((j) => j.slug === slug || j.id === slug);

  if (!job) {
    return (
      <>
        <Navbar />
        <main className="page-shell">
          <div className="page-container page-container--narrow" style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ color: "var(--cyan)", marginBottom: "16px" }}>
              <LuSearch size={48} />
            </div>
            <h1 className="page-title">Role Not Found</h1>
            <p className="page-subtitle" style={{ margin: "0 auto 24px" }}>
              The position you are looking for is no longer active or may have been updated.
            </p>
            <Link to="/careers" className="page-btn page-btn-primary">
              <LuArrowLeft /> Back to Careers
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!form.githubUrl.trim()) {
      errs.githubUrl = "GitHub or LinkedIn profile link is required";
    }
    if (!form.message.trim() || form.message.length < 20) {
      errs.message = "Please share a brief note (minimum 20 characters) about your background";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.overview,
    "datePosted": "2026-01-15",
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "sameAs": "https://hyrovision.com",
    },
    "jobLocationType": "TELECOMMUTE",
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "Worldwide",
    },
  };

  return (
    <>
      <SEO
        title={`${job.title} — Careers at Hyro Vision`}
        description={job.overview}
        schema={structuredSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: job.title, path: `/careers/${job.slug}` },
        ]}
      />
      <Navbar />

      <main className="page-shell">
        <div className="page-bg-grid" />
        <div className="page-orb page-orb-1" />
        <div className="page-orb page-orb-2" />

        <div className="page-container page-container--narrow">
          {/* Breadcrumb */}
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-breadcrumb-sep">/</span>
            <Link to="/careers">Careers</Link>
            <span className="page-breadcrumb-sep">/</span>
            <span className="page-breadcrumb-current">{job.title}</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
              <span className="page-chip" style={{ background: "rgba(var(--cyan-rgb), 0.1)", color: "var(--cyan)" }}>
                {job.department}
              </span>
              <span className="page-chip"><LuGlobe size={13} /> {job.location}</span>
              <span className="page-chip"><LuClock size={13} /> {job.type}</span>
              <span className="page-chip"><LuBriefcase size={13} /> {job.experience}</span>
            </div>

            <h1 className="page-title">{job.title}</h1>
            <p className="page-subtitle">{job.overview}</p>
          </header>

          {/* Key Skills */}
          <section style={{ marginBottom: "36px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "12px" }}>
              Core Technical Skills
            </h3>
            <div className="page-chip-list">
              {job.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="page-chip"
                  style={{
                    fontSize: "0.85rem",
                    padding: "6px 14px",
                    background: "rgba(var(--cyan-rgb), 0.08)",
                    borderColor: "rgba(var(--cyan-rgb), 0.25)",
                    color: "var(--cyan)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Responsibilities */}
          <section className="page-card" style={{ marginBottom: "28px" }}>
            <h2 className="page-card-title">Key Responsibilities</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {job.responsibilities.map((item, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                  <LuCircleCheck color="var(--cyan)" size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="page-card" style={{ marginBottom: "28px" }}>
            <h2 className="page-card-title">What We Look For (Requirements)</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {job.requirements.map((item, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                  <LuCircleCheck color="var(--cyan)" size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Nice to Have */}
          {job.niceToHave && (
            <section className="page-card" style={{ marginBottom: "36px" }}>
              <h2 className="page-card-title">Bonus / Nice to Have</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {job.niceToHave.map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--cyan)", marginTop: "7px", flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Application Form */}
          <section className="page-card form-page-card" id="apply" style={{ borderColor: "rgba(var(--cyan-rgb), 0.3)" }}>
            <h2 className="page-card-title" style={{ fontSize: "1.5rem", marginBottom: "8px" }}>
              Apply for {job.title}
            </h2>
            <p className="page-card-desc" style={{ marginBottom: "24px" }}>
              Submit your profile and past project links. We review all applications and respond within 48 business hours.
            </p>

            {submitted ? (
              <div className="form-success-banner">
                <h3 style={{ margin: "0 0 8px 0", color: "#34d399", fontSize: "1.15rem" }}>
                  Application Received!
                </h3>
                <p style={{ margin: 0, color: "var(--text)" }}>
                  Thank you for applying to Hyro Vision. Our engineering leadership will evaluate your code repositories and reach out to <strong>{form.email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form-shell" noValidate>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">
                      Full Name <span className="form-label-required">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Alex Morgan"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                    {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address <span className="form-label-required">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="alex@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="githubUrl">
                      GitHub or LinkedIn Profile <span className="form-label-required">*</span>
                    </label>
                    <input
                      id="githubUrl"
                      type="url"
                      className="form-input"
                      placeholder="https://github.com/your-username"
                      value={form.githubUrl}
                      onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    />
                    {errors.githubUrl && <span className="form-error">{errors.githubUrl}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="portfolioUrl">
                      Portfolio / Live Project Link (Optional)
                    </label>
                    <input
                      id="portfolioUrl"
                      type="url"
                      className="form-input"
                      placeholder="https://yourportfolio.dev"
                      value={form.portfolioUrl}
                      onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Tell Us About Your Work & Why Hyro Vision? <span className="form-label-required">*</span>
                  </label>
                  <textarea
                    id="message"
                    className="form-textarea"
                    placeholder="Briefly describe the most challenging architecture you've built and why you're interested in our engineering team..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="page-btn page-btn-primary"
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Submitting Application..." : (
                    <>
                      <LuSend size={16} /> Submit Application
                    </>
                  )}
                </button>
              </form>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
