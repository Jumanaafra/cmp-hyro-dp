import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { company } from "../data/company";
import { services } from "../data/services";
import { projects } from "../data/projects";
import "../styles/pages.css";

import {
  LuBrain,
  LuShieldCheck,
  LuLayers,
  LuCpu,
  LuRocket,
  LuNetwork,
  LuCode,
  LuCircleCheck,
  LuArrowRight,
  LuMail,
  LuPhone,
  LuMapPin,
  LuGlobe,
  LuExternalLink,
} from "react-icons/lu";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const principles = [
    {
      icon: <LuShieldCheck />,
      title: "Deterministic & Resilient",
      desc: "We don't deploy brittle prototypes. Every AI agent, API, and cloud deployment is engineered with strict guardrails, automated fallbacks, and deterministic error handling.",
    },
    {
      icon: <LuLayers />,
      title: "Zero-Bloat Architecture",
      desc: "Modern digital products should be lightweight and lightning-fast. We eliminate unnecessary dependencies and design streamlined databases and serverless execution paths.",
    },
    {
      icon: <LuBrain />,
      title: "Pragmatic Intelligence",
      desc: "AI is only useful when it creates measurable business leverage. We prioritize high-impact automation, retrieval-augmented reasoning, and autonomous multi-agent pipelines.",
    },
    {
      icon: <LuRocket />,
      title: "Production Speed to Market",
      desc: "From initial sprint planning to staging validation and live production release, our agile workflows deliver verified, testable milestones on tight enterprise schedules.",
    },
  ];

  const industries = [
    {
      title: "Travel & Tourism Technology",
      desc: "Comprehensive booking platforms, tour packages, resort reservation systems, and transport booking engines.",
    },
    {
      title: "Healthcare & Clinical Systems",
      desc: "Hospital information systems, electronic medical records (EMR), doctor scheduling, and departmental workflows.",
    },
    {
      title: "Enterprise SaaS & Dashboards",
      desc: "Multi-tenant operational platforms, internal workflow automation, role-based administration, and business intelligence.",
    },
    {
      title: "AI & Autonomous Workflows",
      desc: "Retrieval-augmented knowledge systems, intelligent customer support agents, and tool-calling automation.",
    },
  ];

  const structuredSchema = {
    "@type": "AboutPage",
    "name": "About Hyro Vision",
    "description":
      "Learn about Hyro Vision: who we are, what we build, core technology capabilities, services, industries served, and verified projects.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "url": "https://hyrovision.com",
      "logo": "https://hyrovision.com/assets/hyro-logo-mark.png",
      "description":
        "Hyro Vision builds high-performance digital products, AI-powered systems and intelligent automation solutions for modern businesses.",
    },
  };

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <>
      <SEO
        title="About Us — Technology, AI & Digital Solutions | Hyro Vision"
        description="Who is Hyro Vision? What does Hyro Vision build? Discover our technology capabilities, services, verified case studies, and engineering philosophy."
        schema={structuredSchema}
        breadcrumbs={breadcrumbs}
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
            <span className="page-breadcrumb-current">About Us</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Company Entity Overview
            </div>
            <h1 className="page-title">
              Engineering Digital Products With <span>Precision & Intelligence</span>.
            </h1>
            <p className="page-subtitle">
              Hyro Vision is a modern technology and IT services engineering company focused on building intelligent digital products, AI-powered systems, automation solutions, SaaS platforms, and enterprise software.
            </p>
          </header>

          {/* Core Entity Question 1: Who is Hyro Vision? */}
          <section className="page-block" style={{ marginTop: "20px" }}>
            <div className="page-grid-2">
              <div className="page-card">
                <div className="page-card-icon">
                  <LuCpu />
                </div>
                <h2 className="page-card-title">Who is Hyro Vision?</h2>
                <p className="page-card-desc" style={{ fontSize: "1.025rem", lineHeight: "1.65" }}>
                  Hyro Vision is an independent technology engineering company and digital solutions studio. We partner with ambitious businesses, founders, and organizations to architect and deploy production-ready web applications, autonomous AI agents, cloud architectures, and custom enterprise software.
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Engineering-First</span>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Remote Worldwide Hub</span>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Verified Deliverables</span>
                </div>
              </div>

              {/* Core Entity Question 2: What does Hyro Vision build? */}
              <div className="page-card">
                <div className="page-card-icon">
                  <LuNetwork />
                </div>
                <h2 className="page-card-title">What does Hyro Vision build?</h2>
                <p className="page-card-desc" style={{ fontSize: "1.025rem", lineHeight: "1.65" }}>
                  We build scalable digital products from ground-up architecture to deployment. Our systems include high-speed consumer web platforms, multi-tenant B2B SaaS applications, healthcare management platforms, grounded AI knowledge agents (RAG), and resilient cloud backends.
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Full-Stack Web Apps</span>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Autonomous AI Agents</span>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Enterprise Systems</span>
                </div>
              </div>
            </div>
          </section>

          {/* Core Entity Question 3: What services does Hyro Vision provide? */}
          <section className="page-block">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 className="page-block-title" style={{ margin: "0 0 6px 0" }}>
                  What services does Hyro Vision provide?
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
                  Dedicated engineering practices tailored to solve tangible business challenges:
                </p>
              </div>
              <Link to="/services" className="page-btn page-btn-outline" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                View All Services <LuArrowRight />
              </Link>
            </div>

            <div className="page-grid-3">
              {services.map((svc) => (
                <article key={svc.id} className="page-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: svc.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Service {svc.number}
                    </span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-heading)", margin: "8px 0 10px 0" }}>
                      {svc.shortTitle || svc.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.55", marginBottom: "16px" }}>
                      {svc.description}
                    </p>
                  </div>
                  <Link
                    to={`/services/${svc.slug}`}
                    style={{
                      color: svc.color,
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "auto",
                      paddingTop: "12px",
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    Explore Service Details <LuArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Core Entity Question 4: What projects has Hyro Vision built? */}
          <section className="page-block">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 className="page-block-title" style={{ margin: "0 0 6px 0" }}>
                  What projects has Hyro Vision built?
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
                  Verified public case studies of production software systems engineered by our team:
                </p>
              </div>
              <Link to="/projects" className="page-btn page-btn-outline" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                View All Case Studies <LuArrowRight />
              </Link>
            </div>

            <div className="page-grid-2">
              {projects.map((proj) => (
                <div key={proj.id} className="page-card" style={{ padding: "28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span className="page-chip" style={{ color: proj.color, borderColor: `${proj.color}40` }}>
                      {proj.industry || proj.category}
                    </span>
                    <span
                      className={`proj-preview-status ${
                        (proj.status || "").toLowerCase().includes("ongoing")
                          ? "proj-preview-status--ongoing"
                          : "proj-preview-status--live"
                      }`}
                    >
                      <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                      {proj.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-heading)", margin: "0 0 10px 0" }}>
                    {proj.title}
                  </h3>

                  <p style={{ fontSize: "0.925rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "18px" }}>
                    {proj.description}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                    <Link
                      to={`/projects/${proj.slug || proj.id}`}
                      className="page-btn page-btn-primary"
                      style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                    >
                      Read Case Study <LuArrowRight />
                    </Link>

                    {proj.liveUrl ? (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="page-btn page-btn-outline"
                        style={{ padding: "8px 14px", fontSize: "0.85rem" }}
                      >
                        Visit Live App <LuExternalLink size={13} />
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                        {proj.notice || "Under Active Development"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Industries Served */}
          <section className="page-block">
            <h2 className="page-block-title">Industries Served</h2>
            <div className="page-grid-2">
              {industries.map((ind, idx) => (
                <div key={idx} className="page-card" style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(var(--cyan-rgb), 0.1)",
                      color: "var(--cyan)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  >
                    <LuCode size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "6px" }}>
                      {ind.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.6", margin: 0 }}>
                      {ind.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering Principles */}
          <section className="page-block">
            <h2 className="page-block-title">Core Engineering Principles</h2>
            <div className="page-grid-2">
              {principles.map((p, idx) => (
                <div key={idx} className="page-card">
                  <div className="page-card-icon">{p.icon}</div>
                  <h3 className="page-card-title">{p.title}</h3>
                  <p className="page-card-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Information & Channels */}
          <section className="page-card" style={{ marginBottom: "40px", borderColor: "rgba(var(--cyan-rgb), 0.3)" }}>
            <h2 className="page-card-title" style={{ fontSize: "1.35rem", marginBottom: "8px" }}>
              How to Contact Hyro Vision
            </h2>
            <p className="page-card-desc" style={{ marginBottom: "24px" }}>
              We collaborate asynchronously with partners worldwide and welcome new project inquiries, technical discovery calls, and engineering consultations.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <LuMail color="var(--cyan)" size={20} />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "block" }}>Email Inquiries</span>
                  <a href={`mailto:${company.contact.email}`} style={{ color: "var(--text-heading)", textDecoration: "none", fontWeight: 600 }}>
                    {company.contact.email}
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <LuPhone color="var(--cyan)" size={20} />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "block" }}>Direct / WhatsApp</span>
                  <a href={`https://wa.me/${company.contact.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-heading)", textDecoration: "none", fontWeight: 600 }}>
                    {company.contact.whatsappNumber}
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <LuMapPin color="var(--cyan)" size={20} />
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", display: "block" }}>Headquarters</span>
                  <span style={{ color: "var(--text-heading)", fontWeight: 600 }}>
                    {company.address || "Remote Worldwide Hub"}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link to="/contact" className="page-btn page-btn-primary">
                Send Project Inquiry <LuArrowRight />
              </Link>
              <a
                href={company.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="page-btn page-btn-outline"
              >
                LinkedIn Profile <LuExternalLink size={13} />
              </a>
              <a
                href={company.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="page-btn page-btn-outline"
              >
                Instagram Profile <LuExternalLink size={13} />
              </a>
              <a
                href={company.socials.github || "https://github.com/hyrovision"}
                target="_blank"
                rel="noopener noreferrer"
                className="page-btn page-btn-outline"
              >
                GitHub Profile <LuExternalLink size={13} />
              </a>
            </div>
          </section>

          {/* Bottom CTA Box */}
          <section className="page-cta-box">
            <h2 className="page-cta-title">Ready to Architect Your Next System?</h2>
            <p className="page-cta-desc">
              Whether you need to launch a modern web application, automate operational workflows, or deploy AI systems, our engineering team is ready.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="page-btn page-btn-primary">
                Schedule a Consultation <LuArrowRight />
              </Link>
              <Link to="/services" className="page-btn page-btn-outline">
                Explore Our Services
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
