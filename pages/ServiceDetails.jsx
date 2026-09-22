import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { services } from "../data/services";
import "../styles/pages.css";

import {
  LuCircleCheck,
  LuArrowRight,
  LuChevronDown,
  LuCode,
  LuLayers,
  LuSearch,
  LuArrowLeft,
  LuCpu,
  LuExternalLink,
} from "react-icons/lu";

// Comprehensive alias mappings for AI-readable & semantic URLs
const ALIAS_MAP = {
  "web-development": "fullstack-web",
  "full-stack-development": "fullstack-web",
  "ai-solutions": "ai-integration",
  "automation": "ai-integration",
  "ai-autonomous-agents": "ai-integration",
  "seo-optimization": "cloud-seo",
  "cloud-devops-architecture": "cloud-seo",
  "custom-software": "saas-enterprise",
  "enterprise-web-applications": "fullstack-web",
  "saas-platform-engineering": "saas-enterprise",
  "api-integrations-microservices": "backend-database",
  "backend-architecture": "backend-database",
  "iot-industrial-systems": "saas-enterprise",
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const targetSlug = ALIAS_MAP[slug] || slug;
  const service = services.find(
    (s) => s.slug === targetSlug || s.id === targetSlug || s.slug === slug || s.id === slug
  );

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="page-shell">
          <div className="page-container page-container--narrow" style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ color: "var(--cyan)", marginBottom: "16px" }}>
              <LuSearch size={48} />
            </div>
            <h1 className="page-title">Service Not Found</h1>
            <p className="page-subtitle" style={{ margin: "0 auto 24px" }}>
              We could not find the engineering service specification you were looking for.
            </p>
            <Link to="/services" className="page-btn page-btn-primary">
              <LuArrowLeft /> Back to Services
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const structuredSchema = {
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "url": "https://hyrovision.com",
    },
    "serviceType": service.category,
    "termsOfService": "https://hyrovision.com/terms",
  };

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.shortTitle || service.title, path: `/services/${service.slug}` },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <SEO
        title={`${service.shortTitle || service.title} Services — Hyro Vision`}
        description={service.description}
        schema={structuredSchema}
        breadcrumbs={breadcrumbs}
      />
      <Navbar />

      <main className="page-shell">
        <div className="page-bg-grid" />
        <div
          className="page-orb"
          style={{
            width: "600px",
            height: "600px",
            top: "-150px",
            right: "-100px",
            background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
          }}
        />

        <div className="page-container">
          {/* Breadcrumb Navigation */}
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-breadcrumb-sep">/</span>
            <Link to="/services">Services</Link>
            <span className="page-breadcrumb-sep">/</span>
            <span className="page-breadcrumb-current">{service.shortTitle || service.title}</span>
          </nav>

          {/* Main Service Header (H1) */}
          <header className="page-header">
            <div
              className="page-tag"
              style={{
                borderColor: `${service.color}40`,
                background: `${service.color}15`,
                color: service.color,
              }}
            >
              <span className="page-tag-dot" style={{ background: service.color, boxShadow: `0 0 8px ${service.color}` }} />
              {service.category} • Practice {service.number}
            </div>

            <h1 className="page-title">{service.title}</h1>
            <p className="page-subtitle" style={{ fontSize: "1.15rem", maxWidth: "800px" }}>
              {service.description}
            </p>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/contact" className="page-btn page-btn-primary">
                Inquire About This Service <LuArrowRight />
              </Link>
              <Link to="/services" className="page-btn page-btn-outline">
                <LuArrowLeft /> All Services
              </Link>
            </div>
          </header>

          {/* Definition Section (H2) */}
          <section className="page-block">
            <div className="page-card" style={{ padding: "32px", borderColor: `${service.color}33` }}>
              <h2 className="page-card-title" style={{ fontSize: "1.35rem", marginBottom: "12px" }}>
                What is our {service.shortTitle || service.title} service?
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.025rem", lineHeight: "1.7", margin: 0 }}>
                {service.detailedDescription || service.description}
              </p>
            </div>
          </section>

          {/* What We Build / Capabilities & Tech Stack (H2) */}
          <section className="page-block">
            <div className="page-grid-2">
              <div className="page-card">
                <h2 className="page-card-title" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.25rem" }}>
                  <LuLayers color={service.color} /> What We Build & Deliver
                </h2>
                <p className="page-card-desc">
                  Granular engineering capabilities and deliverables included in this service:
                </p>
                <div className="page-chip-list">
                  {service.capabilities.map((cap, i) => (
                    <span key={i} className="page-chip" style={{ fontSize: "0.85rem", padding: "6px 14px" }}>
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="page-card">
                <h2 className="page-card-title" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.25rem" }}>
                  <LuCode color={service.color} /> Technology
                </h2>
                <p className="page-card-desc">
                  Audited, modern, and production-tested toolchain powering our delivery:
                </p>
                <div className="page-chip-list">
                  {service.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="page-chip"
                      style={{
                        fontSize: "0.85rem",
                        padding: "6px 14px",
                        background: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Development Process (H2) */}
          {service.process && service.process.length > 0 && (
            <section className="page-block">
              <h2 className="page-block-title">Our development process</h2>
              <div className="page-grid-3">
                {service.process.map((step, idx) => (
                  <div key={idx} className="page-card">
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: service.color,
                        marginBottom: "12px",
                      }}
                    >
                      Step {step.step}
                    </span>
                    <h3 className="page-card-title" style={{ fontSize: "1.15rem" }}>
                      {step.title}
                    </h3>
                    <p className="page-card-desc" style={{ marginBottom: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Typical Use Cases & Deliverables */}
          <section className="page-block">
            <div className="page-grid-2">
              {service.useCases && (
                <div className="page-card">
                  <h3 className="page-card-title">Typical Use Cases</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                    {service.useCases.map((useCase, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: service.color, marginTop: "7px", flexShrink: 0 }} />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.deliverables && (
                <div className="page-card">
                  <h3 className="page-card-title">Production Deliverables</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                        <LuCircleCheck color={service.color} size={18} style={{ flexShrink: 0, marginTop: "3px" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Related Case Study Spotlight (Internal Linking) */}
          <section className="page-block">
            <div className="page-card" style={{ padding: "28px", borderColor: "rgba(var(--cyan-rgb), 0.2)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Case Study Spotlight
              </span>
              <h3 style={{ fontSize: "1.25rem", color: "var(--text-heading)", margin: "8px 0 10px 0" }}>
                {service.id === "fullstack-web" || service.id === "cloud-seo"
                  ? "See this in production: HillsTourism"
                  : "See enterprise engineering in action: Super D Hospital Management"}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.925rem", lineHeight: "1.6", marginBottom: "16px" }}>
                {service.id === "fullstack-web" || service.id === "cloud-seo"
                  ? "Explore how Hyro Vision architected and launched HillsTourism with complete holiday packages, resort bookings, and technical SEO."
                  : "Discover our architectural approach for Super D, centralizing clinical hospital workflows and doctor scheduling."}
              </p>
              <Link
                to={
                  service.id === "fullstack-web" || service.id === "cloud-seo"
                    ? "/projects/hillstourism"
                    : "/projects/super-d-hospital-management-system"
                }
                className="page-btn page-btn-primary"
                style={{ padding: "8px 18px", fontSize: "0.85rem", display: "inline-flex" }}
              >
                Read Case Study <LuArrowRight />
              </Link>
            </div>
          </section>

          {/* Service-Specific FAQs (H2) */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="page-block">
              <h2 className="page-block-title">Frequently Asked Questions</h2>
              <div className="faq-accordion">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                      <button
                        className="faq-trigger"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <LuChevronDown className="faq-icon" />
                      </button>
                      {isOpen && (
                        <div className="faq-body">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Bottom CTA Box (H2) */}
          <section className="page-cta-box">
            <h2 className="page-cta-title">Ready to Begin with {service.shortTitle}?</h2>
            <p className="page-cta-desc">
              Get in touch with our engineering team for an architectural breakdown and sprint estimate.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="page-btn page-btn-primary">
                Start This Project <LuArrowRight />
              </Link>
              <Link to="/services" className="page-btn page-btn-outline">
                View Other Services
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
