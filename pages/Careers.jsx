import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { careerCulture, workEnvironment, jobOpenings } from "../data/careers";
import { company } from "../data/company";
import "../styles/pages.css";

import {
  LuSparkles,
  LuGlobe,
  LuClock,
  LuBriefcase,
  LuArrowRight,
  LuCode,
  LuLaptop,
  LuZap,
  LuGraduationCap,
} from "react-icons/lu";

export default function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Careers at Hyro Vision",
    "description": "Join Hyro Vision. Explore remote engineering opportunities in Full-Stack, AI Systems, and UI/UX.",
    "publisher": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "url": "https://hyrovision.com",
    },
  };

  return (
    <>
      <SEO
        title="Careers — Join Our Engineering Team"
        description="Build high-performance digital products and autonomous AI systems. Explore open remote engineering roles at Hyro Vision."
        schema={structuredSchema}
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
            <span className="page-breadcrumb-current">Careers</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Join Hyro Vision
            </div>
            <h1 className="page-title">
              Build Systems That <span>Think, Adapt, and Scale</span>.
            </h1>
            <p className="page-subtitle">
              We are an engineering-driven studio building next-generation digital platforms and practical AI architectures. If you love clean abstractions and shipped production software, you belong here.
            </p>
          </header>

          {/* Open Positions Anchor */}
          <section className="page-block" style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <h2 className="page-block-title" style={{ margin: 0 }}>
                Open Positions ({jobOpenings.length})
              </h2>
              <span className="page-chip" style={{ color: "var(--cyan)", borderColor: "rgba(var(--cyan-rgb), 0.3)" }}>
                Remote-First Opportunities
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {jobOpenings.map((job) => (
                <article
                  key={job.id}
                  className="page-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    padding: "32px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                        <span className="page-chip" style={{ background: "rgba(var(--cyan-rgb), 0.1)", color: "var(--cyan)" }}>
                          {job.department}
                        </span>
                        <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <LuGlobe size={13} /> {job.location}
                        </span>
                        <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <LuClock size={13} /> {job.type}
                        </span>
                        <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <LuBriefcase size={13} /> {job.experience}
                        </span>
                      </div>

                      <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-heading)", margin: "0 0 10px 0" }}>
                        {job.title}
                      </h3>
                      <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.6", maxWidth: "780px", margin: 0 }}>
                        {job.overview}
                      </p>
                    </div>

                    <Link
                      to={`/careers/${job.slug}`}
                      className="page-btn page-btn-primary"
                      style={{ padding: "10px 20px", fontSize: "0.875rem", whiteSpace: "nowrap" }}
                    >
                      View Role & Apply <LuArrowRight />
                    </Link>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase" }}>
                      Key Skills:
                    </span>
                    {job.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="page-chip" style={{ fontSize: "0.775rem" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Culture Values */}
          <section className="page-block">
            <h2 className="page-block-title">Our Engineering Culture</h2>
            <div className="page-grid-2">
              {careerCulture.map((item, idx) => (
                <div key={idx} className="page-card">
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "var(--cyan)",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    {item.number}
                  </span>
                  <h3 className="page-card-title">{item.title}</h3>
                  <p className="page-card-desc" style={{ marginBottom: 0 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Work Environment */}
          <section className="page-block">
            <h2 className="page-block-title">Life at Hyro Vision</h2>
            <div className="page-grid-4">
              {workEnvironment.map((env, idx) => (
                <div key={idx} className="page-card" style={{ padding: "24px" }}>
                  <div className="page-card-icon" style={{ width: "40px", height: "40px", fontSize: "20px" }}>
                    {idx === 0 ? <LuGlobe /> : idx === 1 ? <LuZap /> : idx === 2 ? <LuLaptop /> : <LuGraduationCap />}
                  </div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "8px" }}>
                    {env.title}
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.55", margin: 0 }}>
                    {env.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* General Application Callout */}
          <section className="page-cta-box">
            <h2 className="page-cta-title">Don't See Your Exact Role?</h2>
            <p className="page-cta-desc">
              We are constantly seeking brilliant software craftspeople, AI researchers, and system designers. If you love building, send your portfolio or GitHub profile directly to our talent team.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={`mailto:${company.contact.email}?subject=General%20Engineering%20Application%20-%20Hyro%20Vision`}
                className="page-btn page-btn-primary"
              >
                Send Speculative Application <LuArrowRight />
              </a>
              <Link to="/about" className="page-btn page-btn-outline">
                Learn About Our Team
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
