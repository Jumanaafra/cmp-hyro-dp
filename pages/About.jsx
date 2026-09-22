import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { company } from "../data/company";
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

  const capabilities = [
    {
      title: "Intelligent Agent Systems",
      desc: "Autonomous workflow agents, multi-step LLM task pipelines, vector memory retrieval, and custom AI copilots.",
    },
    {
      title: "Full-Stack Enterprise Applications",
      desc: "Robust React/Next.js frontend architectures paired with performant microservices in Node.js, Python, and Go.",
    },
    {
      title: "SaaS Platforms & Multi-Tenancy",
      desc: "Scalable billing, role-based access control, tenant isolation, and high-concurrency database optimizations.",
    },
    {
      title: "Cloud Infrastructure & DevOps",
      desc: "Infrastructure-as-code, Docker containers, automated CI/CD pipelines, Kubernetes orchestration, and serverless backends.",
    },
  ];

  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Hyro Vision",
    "description": "Learn about Hyro Vision, our engineering ethos, mission, and how we build intelligent digital systems for modern businesses.",
    "publisher": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "url": "https://hyrovision.com",
    },
  };

  return (
    <>
      <SEO
        title="About Us — Engineering Digital Intelligence"
        description="Learn about Hyro Vision's mission, engineering philosophy, and high-performance approach to building AI-native products, enterprise software, and scalable digital infrastructure."
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
            <span className="page-breadcrumb-current">About Us</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Who We Are
            </div>
            <h1 className="page-title">
              Engineering Digital Products With <span>Precision & Intelligence</span>.
            </h1>
            <p className="page-subtitle">
              Hyro Vision is a high-velocity engineering studio dedicated to building resilient software, autonomous AI systems, and mission-critical cloud infrastructure.
            </p>
          </header>

          {/* Mission & Vision Section */}
          <section className="page-block" style={{ marginTop: "20px" }}>
            <div className="page-grid-2">
              <div className="page-card" style={{ padding: "36px" }}>
                <div className="page-card-icon">
                  <LuCpu />
                </div>
                <h2 className="page-card-title">Our Mission</h2>
                <p className="page-card-desc" style={{ fontSize: "1.05rem" }}>
                  To empower startups, enterprises, and ambitious founders with production-ready software systems that harness modern full-stack frameworks and pragmatic AI automation. We eliminate technical debt before it starts.
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> High Velocity</span>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Uncompromising Quality</span>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Transparent Delivery</span>
                </div>
              </div>

              <div className="page-card" style={{ padding: "36px" }}>
                <div className="page-card-icon">
                  <LuNetwork />
                </div>
                <h2 className="page-card-title">Our Vision</h2>
                <p className="page-card-desc" style={{ fontSize: "1.05rem" }}>
                  To be the global engineering partner of choice for software products that require both architectural elegance and deep intelligence. We envision a future where digital applications continuously adapt, automate, and scale with minimal friction.
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> AI-Native DNA</span>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Enterprise Scalability</span>
                  <span className="page-chip"><LuCircleCheck color="var(--cyan)" /> Modern Stacks</span>
                </div>
              </div>
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

          {/* Capabilities Grid */}
          <section className="page-block">
            <h2 className="page-block-title">What We Bring to Your Team</h2>
            <div className="page-grid-2">
              {capabilities.map((c, idx) => (
                <div
                  key={idx}
                  className="page-card"
                  style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
                >
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
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "8px" }}>
                      {c.title}
                    </h3>
                    <p style={{ fontSize: "0.925rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA Box */}
          <section className="page-cta-box">
            <h2 className="page-cta-title">Ready to Architect Your Next System?</h2>
            <p className="page-cta-desc">
              Whether you need to launch a greenfield SaaS product, integrate autonomous AI agents, or scale cloud infrastructure, our engineering team is ready.
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
