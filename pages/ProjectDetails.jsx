import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import "../styles/global.css";
import "../styles/project-details.css";

import { projects as verifiedProjects } from "../data/projects";
import { PROJECTS_FALLBACK } from "../context/DataContext";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProject() {
      // First check local verified projects
      const local = PROJECTS_FALLBACK.find(
        (p) => p.id === id || p.slug === id || p.id.toLowerCase() === id.toLowerCase()
      );
      if (local) {
        setProject(local);
        setLoading(false);
        return;
      }

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
          <span>Loading project...</span>
        </div>
      </div>
    );
  }

  /* ── Not found state ── */
  if (notFound || !project) {
    return (
      <div className="pd-shell">
        <div className="pd-not-found">
          <div className="pd-nf-emoji">🔍</div>
          <h1 className="pd-nf-title">Project Not Found</h1>
          <p className="pd-nf-desc">The project you're looking for doesn't exist or may have been removed.</p>
          <button className="pd-back-btn" onClick={() => navigate("/#projects")}>
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-shell">
      {/* Background effects */}
      <div className="pd-orb pd-orb-1" style={{ background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)` }} />
      <div className="pd-orb pd-orb-2" />
      <div className="pd-grid-bg" />

      {/* Back button */}
      <div className="pd-topbar">
        <button className="pd-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="pd-topbar-badge">
          <span className="pd-badge-dot" style={{ background: project.color }} />
          {project.category}
        </div>
      </div>

      {/* Hero area */}
      <header className="pd-hero">
        <div className="pd-hero-emoji">{project.emoji}</div>
        <div className="pd-hero-tag" style={{ borderColor: `${project.color}44`, color: project.color, background: `${project.color}12` }}>
          {project.category}
        </div>
        <h1 className="pd-hero-title">{project.title}</h1>
        <p className="pd-hero-desc">{project.desc}</p>
      </header>

      {/* Content grid */}
      <div className="pd-content">

        {/* Tech stack card */}
        {project.tech && project.tech.length > 0 && (
          <div className="pd-card">
            <div className="pd-card-label">🛠 Tech Stack</div>
            <div className="pd-tech-grid">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="pd-tech-pill"
                  style={{ borderColor: `${project.color}44`, color: project.color, background: `${project.color}10` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project info card */}
        <div className="pd-card">
          <div className="pd-card-label">📋 Project Info</div>
          <div className="pd-info-grid">
            <div className="pd-info-item">
              <span className="pd-info-key">Category</span>
              <span className="pd-info-val">{project.category}</span>
            </div>
            <div className="pd-info-item">
              <span className="pd-info-key">Card Type</span>
              <span className="pd-info-val" style={{ textTransform: "capitalize" }}>{project.size || "standard"}</span>
            </div>
            <div className="pd-info-item">
              <span className="pd-info-key">Live URL</span>
              {project.liveUrl && project.liveUrl !== "#" ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-info-val"
                  style={{ color: project.color, fontSize: "13px", wordBreak: "break-all", textDecoration: "none" }}
                  title={project.liveUrl}
                >
                  {project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              ) : (
                <span className="pd-info-val" style={{ color: "rgba(255,255,255,0.3)" }}>Not deployed</span>
              )}
            </div>
          </div>
        </div>

        {/* CTA card */}
        <div className="pd-card pd-card--cta" style={{ borderColor: `${project.color}33` }}>
          <div className="pd-cta-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}14 0%, transparent 65%)` }} />
          <div className="pd-cta-inner">
            <div>
              <div className="pd-cta-title">Want to see it live?</div>
              <div className="pd-cta-sub">Open the deployed version of this project in a new tab.</div>
            </div>
            {project.liveUrl && project.liveUrl !== "#" ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-live-btn"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)` }}
                onClick={() => console.log("Opening live URL:", project.liveUrl)}
              >
                Open Live Project ↗
              </a>
            ) : (
              <span className="pd-live-btn pd-live-btn--disabled">Coming Soon</span>
            )}
          </div>
        </div>

        {/* Back to portfolio */}
        <div className="pd-footer-nav">
          <button className="pd-back-full-btn" onClick={() => navigate("/#projects")}>
            ← View All Projects
          </button>
          <button className="pd-contact-btn" onClick={() => navigate("/#contact")}>
            Start a Similar Project →
          </button>
        </div>

      </div>
    </div>
  );
}
