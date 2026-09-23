import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { services } from "../data/services";
import "../styles/pages.css";

import {
  LuCode,
  LuLayoutDashboard,
  LuBrain,
  LuDatabase,
  LuCloud,
  LuArrowRight,
  LuCircleCheck,
  LuShieldCheck,
  LuRocket,
} from "react-icons/lu";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getServiceIcon = (id) => {
    switch (id) {
      case "fullstack-web":
        return <LuCode />;
      case "saas-enterprise":
        return <LuLayoutDashboard />;
      case "ai-integration":
        return <LuBrain />;
      case "backend-database":
        return <LuDatabase />;
      case "cloud-seo":
      default:
        return <LuCloud />;
    }
  };

  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hyro Vision Digital Engineering Services",
    "description": "Comprehensive full-stack engineering, custom SaaS dashboards, autonomous AI integration, backend architecture, and cloud deployment services.",
    "provider": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "url": "https://hyrovision.com",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Engineering Services",
      "itemListElement": services.map((s) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.title,
          "description": s.description,
        },
      })),
    },
  };

  return (
    <>
      <SEO
        title="Engineering Services — Full-Stack, AI & Cloud Solutions | Hyro Vision"
        description="Explore Hyro Vision's production-grade engineering services: Full-Stack Web Development, Custom SaaS Platforms, AI Solutions, Backend Architecture, and Technical SEO."
        schema={structuredSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
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
            <span className="page-breadcrumb-current">Services</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              What We Build
            </div>
            <h1 className="page-title">
              Engineered for Speed, Scalability, and <span>Deep Intelligence</span>.
            </h1>
            <p className="page-subtitle">
              We build production software from the ground up. Whether you are building an AI-native SaaS platform, a high-throughput backend, or mission-critical enterprise workflows, we deliver deterministic results.
            </p>
          </header>

          {/* Services Grid */}
          <div className="page-grid-2" style={{ gap: "28px" }}>
            {services.map((service) => (
              <article
                key={service.id}
                className="page-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderColor: "var(--card-border)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      className="page-card-icon"
                      style={{
                        margin: 0,
                        color: service.color,
                        background: `${service.color}18`,
                      }}
                    >
                      {getServiceIcon(service.id)}
                    </div>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', monospace",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "var(--text-dim)",
                      }}
                    >
                      {service.number}
                    </span>
                  </div>

                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: service.color,
                      marginBottom: "8px",
                    }}
                  >
                    {service.category}
                  </span>

                  <h2 className="page-card-title" style={{ fontSize: "1.35rem", marginBottom: "12px" }}>
                    {service.title}
                  </h2>

                  <p className="page-card-desc" style={{ marginBottom: "20px" }}>
                    {service.description}
                  </p>

                  {/* Capabilities List */}
                  <div style={{ marginBottom: "24px" }}>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "var(--text-dim)",
                        letterSpacing: "0.05em",
                        marginBottom: "10px",
                      }}
                    >
                      Core Capabilities
                    </div>
                    <div className="page-chip-list">
                      {service.capabilities.slice(0, 6).map((cap, idx) => (
                        <span key={idx} className="page-chip">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: "20px",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="page-btn page-btn-outline"
                    style={{ padding: "10px 18px", fontSize: "0.875rem" }}
                  >
                    Service Architecture <LuArrowRight />
                  </Link>

                  <Link
                    to="/contact"
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--cyan)",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Get Estimate →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Engineering Process Banner */}
          <section className="page-block">
            <h2 className="page-block-title">How We Deliver Engineering Projects</h2>
            <div className="page-grid-3">
              <div className="page-card">
                <div className="page-card-icon"><LuShieldCheck /></div>
                <h3 className="page-card-title">1. Blueprint & Architecture</h3>
                <p className="page-card-desc">
                  We translate business needs into data schemas, system boundaries, and API contracts before touching a single line of production code.
                </p>
              </div>

              <div className="page-card">
                <div className="page-card-icon"><LuCode /></div>
                <h3 className="page-card-title">2. Agile Sprint Slices</h3>
                <p className="page-card-desc">
                  Continuous delivery in bi-weekly increments with live staging previews so your team can test every feature in real-time.
                </p>
              </div>

              <div className="page-card">
                <div className="page-card-icon"><LuRocket /></div>
                <h3 className="page-card-title">3. Production Release & QA</h3>
                <p className="page-card-desc">
                  Rigorous automated testing, security audit scans, and CDN edge optimization to ensure immediate stability at launch.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom CTA Box */}
          <section className="page-cta-box">
            <h2 className="page-cta-title">Need a Custom Technical Architecture?</h2>
            <p className="page-cta-desc">
              Have unique requirements, complex legacy integrations, or custom AI agent workflows? Discuss your project directly with an engineer.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="page-btn page-btn-primary">
                Book a Technical Scoping Call <LuArrowRight />
              </Link>
              <Link to="/projects" className="page-btn page-btn-outline">
                Review Our Work
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
