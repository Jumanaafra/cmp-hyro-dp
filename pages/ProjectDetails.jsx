import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import "../styles/global.css";
import "../styles/project-details.css";
import SEO from "../components/SEO";
import {
  LuSearch,
  LuCpu,
  LuInfo,
  LuCircleCheck,
  LuGlobe,
  LuExternalLink,
  LuArrowLeft,
  LuArrowRight,
  LuShieldAlert,
  LuTerminal,
  LuLayers,
} from "react-icons/lu";
import { getProjectIcon } from "../sections/Projects";
import { projects as verifiedProjects } from "../data/projects";
import { getCdnImageUrl, getCdnImageSrcSet } from "../utils/cdn";

// Clean alias lookup map
const PROJECT_ALIASES = {
  "hills-tourism": "hillstourism",
  "hillstourism": "hillstourism",
  "super-d-hospital": "super-d-hospital-management-system",
  "super-d-hospital-management": "super-d-hospital-management-system",
  "super-d-hospital-management-system": "super-d-hospital-management-system",
  "happy-star": "happy-star",
  "happy-star-satellite-vision": "happy-star",
  "pakka-tourism": "pakka-tourism",
  "advanced-crm-hrms": "advanced-crm-hrms",
  "bsmartglass-auravision": "bsmartglass-auravision",
  "b-smart-glass-aura-vision": "bsmartglass-auravision",
  "ai-learning-path": "ai-learning-path",
  "ai-learning-path-generator": "ai-learning-path",
  "alumni-connect": "alumni-connect",
  "alumni-connect-platform": "alumni-connect",
  "jojo-resort": "jojo-resort",
  "3d-ai-portfolio": "3d-ai-portfolio",
  "personal-3d-ai-portfolio": "3d-ai-portfolio",
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProject() {
      const normalizedId = (id || "").toLowerCase();
      const targetSlug = PROJECT_ALIASES[normalizedId] || normalizedId;

      // 1. Search verified local projects
      const local = verifiedProjects.find(
        (p) =>
          p.id === targetSlug ||
          p.slug === targetSlug ||
          p.legacyId === normalizedId ||
          p.altId === normalizedId ||
          p.id.toLowerCase() === normalizedId ||
          p.slug.toLowerCase() === normalizedId
      );

      if (local) {
        setProject(local);
        setLoading(false);
        return;
      }

      // 2. Firestore fallback if available
      if (db) {
        try {
          const snap = await getDoc(doc(db, "projects", id));
          if (snap.exists()) {
            const data = { id: snap.id, ...snap.data() };
            setProject(data);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Firestore project lookup error:", err.message);
        }
      }

      setNotFound(true);
      setLoading(false);
    }
    fetchProject();
  }, [id]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="pd-shell">
        <div className="pd-loader">
          <div className="pd-loader-ring" />
          <span>Loading project case study...</span>
        </div>
      </div>
    );
  }

  /* ── Not found state ── */
  if (notFound || !project) {
    return (
      <div className="pd-shell">
        <div className="pd-not-found">
          <div className="pd-nf-icon" style={{ display: "inline-flex", color: "var(--cyan)", marginBottom: "16px" }}>
            <LuSearch size={52} />
          </div>
          <h1 className="pd-nf-title">Case Study Not Found</h1>
          <p className="pd-nf-desc">The project or case study you're looking for does not exist or may have been archived.</p>
          <button className="pd-back-btn" onClick={() => navigate("/projects")}>
            ← Back to All Projects
          </button>
        </div>
      </div>
    );
  }

  const isOngoing = (project.status || "").toLowerCase().includes("ongoing");
  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl !== "#");

  // Schema.org structured data
  const projectSchema = {
    "@type": "CreativeWork",
    "name": project.title,
    "headline": `${project.title} — Case Study by Hyro Vision`,
    "description": project.description,
    "creator": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "url": "https://hyrovision.com",
    },
    "genre": project.industry || project.category,
    ...(project.officialUrl ? { "url": project.officialUrl } : {}),
  };

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug || project.id}` },
  ];

  return (
    <div className="pd-shell">
      <SEO
        title={`${project.title} — Case Study | Hyro Vision`}
        description={project.description}
        schema={projectSchema}
        breadcrumbs={breadcrumbs}
      />

      {/* Background effects */}
      <div className="pd-orb pd-orb-1" style={{ background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)` }} />
      <div className="pd-orb pd-orb-2" />
      <div className="pd-grid-bg" />

      {/* Topbar / Navigation */}
      <div className="pd-topbar">
        <Link to="/projects" className="pd-back-btn" style={{ textDecoration: "none" }}>
          ← All Projects
        </Link>

        {/* Visual Breadcrumb */}
        <nav className="page-breadcrumb" aria-label="Breadcrumb" style={{ margin: 0, padding: 0 }}>
          <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <span className="page-breadcrumb-sep">/</span>
          <Link to="/projects" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Projects</Link>
          <span className="page-breadcrumb-sep">/</span>
          <span className="page-breadcrumb-current" style={{ color: project.color }}>{project.title}</span>
        </nav>

        <div className="pd-topbar-badge">
          <span className="pd-badge-dot" style={{ background: project.color }} />
          {project.category}
        </div>
      </div>

      {/* Hero Header */}
      <header className="pd-hero">
        <div
          className="pd-hero-icon"
          style={{
            color: project.color || "var(--cyan)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          {getProjectIcon(project, 48)}
        </div>

        <div
          className="pd-hero-tag"
          style={{
            borderColor: `${project.color}44`,
            color: project.color,
            background: `${project.color}12`,
          }}
        >
          {project.category} • {project.status}
        </div>

        <h1 className="pd-hero-title">{project.title}</h1>
        <p className="pd-hero-desc">{project.description}</p>
      </header>

      {/* Ongoing Notice Banner if project is in development */}
      {isOngoing && (
        <div style={{ maxWidth: "1000px", margin: "0 auto 32px", padding: "0 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              padding: "20px 24px",
              borderRadius: "16px",
              background: "rgba(37, 99, 235, 0.08)",
              border: "1px solid rgba(37, 99, 235, 0.3)",
              color: "#93c5fd",
            }}
          >
            <LuShieldAlert size={22} style={{ flexShrink: 0, marginTop: "2px", color: "#60a5fa" }} />
            <div>
              <strong style={{ display: "block", color: "#ffffff", fontSize: "0.95rem", marginBottom: "4px" }}>
                Active Engineering Sprint Notice
              </strong>
              <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: "1.5", color: "#bfdbfe" }}>
                {project.notice || "Project currently under development. Internal staging sprints and workflow verification are actively underway — no public demo link is available."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Visual Project Media Preview */}
      {project.image && (
        <div style={{ maxWidth: "1000px", margin: "0 auto 36px", padding: "0 20px" }}>
          <div
            style={{
              position: "relative",
              height: "360px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 20px 48px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={getCdnImageUrl(project.image, 1080)}
              srcSet={getCdnImageSrcSet(project.image, [480, 800, 1200])}
              sizes="(max-width: 1024px) 100vw, 1000px"
              alt={project.title}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(10, 15, 26, 0.85) 100%)" }} />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "24px",
                right: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <span
                className="page-chip"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(10px)",
                  color: project.color || "var(--cyan)",
                  borderColor: "rgba(var(--cyan-rgb), 0.3)",
                }}
              >
                {project.category}
              </span>

              {project.status && (
                <span
                  className={`proj-preview-status ${
                    isOngoing ? "proj-preview-status--ongoing" : "proj-preview-status--live"
                  }`}
                >
                  <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                  {isOngoing ? "Ongoing Development" : "Live in Production"}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Case Study Core Grid */}
      <div className="pd-content">

        {/* 1. Problem & Solution */}
        {(project.problem || project.solution) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", width: "100%" }}>
            {project.problem && (
              <div className="pd-card">
                <div className="pd-card-label" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#f87171" }}>
                  <LuInfo size={16} /> Problem Statement
                </div>
                <h2 style={{ fontSize: "1.25rem", color: "var(--text-heading)", margin: "0 0 12px 0", fontWeight: 700 }}>
                  The Challenge
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.65", margin: 0 }}>
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="pd-card">
                <div className="pd-card-label" style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--cyan)" }}>
                  <LuCircleCheck size={16} /> Engineering Solution
                </div>
                <h2 style={{ fontSize: "1.25rem", color: "var(--text-heading)", margin: "0 0 12px 0", fontWeight: 700 }}>
                  Our Approach
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.65", margin: 0 }}>
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 2. System Features */}
        {project.features && project.features.length > 0 && (
          <div className="pd-card">
            <div className="pd-card-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <LuLayers size={16} /> Key Capabilities & Features
            </div>
            <h2 style={{ fontSize: "1.25rem", color: "var(--text-heading)", margin: "0 0 16px 0", fontWeight: 700 }}>
              What We Engineered
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
              {project.features.map((feat, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--text-muted)", fontSize: "0.925rem", lineHeight: "1.5" }}>
                  <LuCircleCheck color={project.color} size={16} style={{ flexShrink: 0, marginTop: "3px" }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. Tech stack card */}
        {(project.technologies || project.tech) && (
          <div className="pd-card">
            <div className="pd-card-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <LuCpu size={16} /> Technology Stack
            </div>
            <h2 style={{ fontSize: "1.25rem", color: "var(--text-heading)", margin: "0 0 16px 0", fontWeight: 700 }}>
              Architecture & Tooling
            </h2>
            <div className="pd-tech-grid">
              {(project.technologies || project.tech).map((t) => (
                <span
                  key={t}
                  className="pd-tech-pill"
                  style={{
                    borderColor: `${project.color}44`,
                    color: project.color,
                    background: `${project.color}10`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 4. Development Approach */}
        {project.developmentApproach && (
          <div className="pd-card">
            <div className="pd-card-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <LuTerminal size={16} /> Engineering Methodology
            </div>
            <h2 style={{ fontSize: "1.25rem", color: "var(--text-heading)", margin: "0 0 12px 0", fontWeight: 700 }}>
              Development Approach
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.65", margin: 0 }}>
              {project.developmentApproach}
            </p>
          </div>
        )}

        {/* 5. Verified Outcome */}
        {project.outcome && (
          <div className="pd-card">
            <div className="pd-card-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <LuGlobe size={16} /> Project Outcome & Status
            </div>
            <h2 style={{ fontSize: "1.25rem", color: "var(--text-heading)", margin: "0 0 12px 0", fontWeight: 700 }}>
              Verified Outcome
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.65", margin: 0 }}>
              {project.outcome}
            </p>
          </div>
        )}

        {/* 6. Project Info & Metadata */}
        <div className="pd-card">
          <div className="pd-card-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <LuInfo size={16} /> Project Specification
          </div>
          <div className="pd-info-grid">
            <div className="pd-info-item">
              <span className="pd-info-key">Industry / Category</span>
              <span className="pd-info-val">{project.industry || project.category}</span>
            </div>
            <div className="pd-info-item">
              <span className="pd-info-key">Status</span>
              <span className="pd-info-val" style={{ color: isOngoing ? "#93c5fd" : "#34d399" }}>
                {project.status}
              </span>
            </div>
            <div className="pd-info-item">
              <span className="pd-info-key">Official URL</span>
              {hasLiveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-info-val"
                  style={{ color: project.color, fontSize: "13px", wordBreak: "break-all", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  title={project.liveUrl}
                >
                  {project.liveUrl} <LuExternalLink size={12} />
                </a>
              ) : (
                <span className="pd-info-val" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Under Development (No Public Demo)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 7. Action / CTA card */}
        <div className="pd-card pd-card--cta" style={{ borderColor: `${project.color}33` }}>
          <div className="pd-cta-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}14 0%, transparent 65%)` }} />
          <div className="pd-cta-inner">
            <div>
              <div className="pd-cta-title">
                {hasLiveUrl ? "Experience the Live Platform" : "Interested in Similar Architecture?"}
              </div>
              <div className="pd-cta-sub">
                {hasLiveUrl
                  ? `Visit ${project.domain || "the official application"} in a new browser tab.`
                  : "Discuss how Hyro Vision can engineer a tailored enterprise platform for your organization."}
              </div>
            </div>

            {hasLiveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-live-btn"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)` }}
              >
                Open Official Website ↗
              </a>
            ) : (
              <Link
                to="/contact"
                className="pd-live-btn"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)`, textDecoration: "none" }}
              >
                Inquire About Solutions →
              </Link>
            )}
          </div>
        </div>

        {/* Back to portfolio & Internal Links */}
        <div className="pd-footer-nav">
          <Link to="/projects" className="pd-back-full-btn" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <LuArrowLeft size={16} /> View All Projects
          </Link>
          <Link to="/services" className="pd-back-full-btn" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            Explore Services <LuArrowRight size={16} />
          </Link>
          <Link to="/contact" className="pd-contact-btn" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            Start a Similar Project →
          </Link>
        </div>

      </div>
    </div>
  );
}
