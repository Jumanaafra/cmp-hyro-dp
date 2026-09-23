import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { projects } from "../data/projects";
import "../styles/pages.css";

import {
  LuSearch,
  LuExternalLink,
  LuArrowRight,
  LuCpu,
  LuGlobe,
  LuLayers,
} from "react-icons/lu";

const CATEGORIES = [
  "ALL",
  "AI & IOT",
  "ENTERPRISE & SAAS",
  "TRAVEL & TOURISM",
  "COMMERCIAL PLATFORMS",
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      let matchesCategory = true;
      const cat = (project.category || project.industry || "").toLowerCase();
      const title = (project.title || "").toLowerCase();
      const tech = (project.technologies || []).join(" ").toLowerCase();
      const full = `${cat} ${title} ${tech}`;

      if (selectedCategory === "AI & IOT") {
        matchesCategory =
          full.includes("ai") ||
          full.includes("iot") ||
          full.includes("agent") ||
          full.includes("smart") ||
          full.includes("learning") ||
          full.includes("hardware") ||
          full.includes("interactive") ||
          full.includes("3d");
      } else if (selectedCategory === "ENTERPRISE & SAAS") {
        matchesCategory =
          full.includes("enterprise") ||
          full.includes("crm") ||
          full.includes("hrms") ||
          full.includes("hospital") ||
          full.includes("healthcare") ||
          full.includes("saas");
      } else if (selectedCategory === "TRAVEL & TOURISM") {
        matchesCategory =
          full.includes("tourism") ||
          full.includes("travel") ||
          full.includes("hills") ||
          full.includes("resort");
      } else if (selectedCategory === "COMMERCIAL PLATFORMS") {
        matchesCategory =
          full.includes("commercial") ||
          full.includes("networking") ||
          full.includes("business") ||
          full.includes("satellite") ||
          full.includes("alumni");
      }

      // Search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        cat.includes(query) ||
        (project.technologies &&
          project.technologies.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Hyro Vision Portfolio — Engineered Digital Systems",
    "description": "Explore production software, autonomous AI agents, enterprise SaaS, and IoT applications engineered by Hyro Vision.",
    "publisher": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "url": "https://hyrovision.com",
    },
  };

  return (
    <>
      <SEO
        title="Portfolio & Case Studies — Verified Engineering Work | Hyro Vision"
        description="Explore verified case studies of 10+ production software systems engineered by Hyro Vision, spanning AI agents, IoT hardware, tourism platforms, and enterprise SaaS."
        schema={structuredSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
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
            <span className="page-breadcrumb-current">Portfolio</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Production Track Record
            </div>
            <h1 className="page-title">
              Engineered Systems, <span>Real Production Impact</span>.
            </h1>
            <p className="page-subtitle">
              Explore our portfolio of verified enterprise web platforms, autonomous AI workflows, and hardware-connected systems built with modern engineering standards.
            </p>
          </header>

          {/* Search & Filter Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div className="filter-tabs" style={{ margin: 0 }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab ${selectedCategory === cat ? "filter-tab--active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ position: "relative", minWidth: "260px" }}>
              <LuSearch
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-dim)",
                }}
              />
              <input
                type="text"
                placeholder="Search projects or stacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "40px", borderRadius: "9999px" }}
              />
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="page-card" style={{ textAlign: "center", padding: "60px 24px" }}>
              <div style={{ color: "var(--text-dim)", marginBottom: "14px" }}>
                <LuLayers size={40} />
              </div>
              <h3 style={{ fontSize: "1.2rem", color: "var(--text-heading)", marginBottom: "8px" }}>
                No Projects Found
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                No engineering projects match your search query or filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="page-btn page-btn-outline"
                style={{ marginTop: "16px" }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="page-grid-2" style={{ gap: "28px" }}>
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="page-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "24px",
                  }}
                >
                  <div>
                    {project.image && (
                      <div className="proj-preview-media">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="proj-preview-img"
                          loading="lazy"
                        />
                        <div className="proj-preview-overlay" />
                        <div className="proj-preview-badges">
                          {project.status && (
                            <span
                              className={`proj-preview-status ${
                                project.status.toLowerCase().includes("ongoing")
                                  ? "proj-preview-status--ongoing"
                                  : "proj-preview-status--live"
                              }`}
                            >
                              <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                              {project.status.toLowerCase().includes("ongoing") ? "Ongoing" : "Live"}
                            </span>
                          )}
                          {project.domain && (
                            <span className="proj-preview-domain">
                              <LuGlobe size={11} /> {project.domain}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "14px",
                      }}
                    >
                      <span className="page-chip" style={{ color: "var(--cyan)", borderColor: "rgba(var(--cyan-rgb), 0.3)" }}>
                        {project.category}
                      </span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Visit Live Application"
                          style={{
                            color: "var(--text-dim)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "0.85rem",
                            textDecoration: "none",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
                        >
                          <LuGlobe size={14} /> Live <LuExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    <h2 className="page-card-title" style={{ fontSize: "1.35rem" }}>
                      {project.title}
                    </h2>

                    <p className="page-card-desc" style={{ marginBottom: "20px" }}>
                      {project.description}
                    </p>

                    {/* Technologies list */}
                    {project.technologies && (
                      <div style={{ marginBottom: "24px" }}>
                        <div className="page-chip-list">
                          {project.technologies.map((t, idx) => (
                            <span key={idx} className="page-chip">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      paddingTop: "18px",
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link
                      to={`/projects/${project.id}`}
                      className="page-btn page-btn-primary"
                      style={{ padding: "8px 18px", fontSize: "0.875rem" }}
                    >
                      View Case Study <LuArrowRight />
                    </Link>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="page-btn page-btn-outline"
                        style={{ padding: "8px 16px", fontSize: "0.875rem" }}
                      >
                        Visit Site <LuExternalLink size={14} />
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                        Enterprise Confidential / Private
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom CTA Box */}
          <section className="page-cta-box">
            <h2 className="page-cta-title">Have a Complex Project in Mind?</h2>
            <p className="page-cta-desc">
              We specialize in taking demanding software visions and turning them into stable, resilient, production-ready systems.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="page-btn page-btn-primary">
                Discuss Your Requirements <LuArrowRight />
              </Link>
              <Link to="/services" className="page-btn page-btn-outline">
                View Service Offerings
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
