import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

const FILTERS = ["ALL", "AI & AGENTS", "SAAS & ENTERPRISE", "IoT", "COMMERCIAL"];

function matchesFilter(project, filter) {
  if (filter === "ALL") return true;
  const cat = (project.category || "").toUpperCase();
  const tech = (project.technologies || project.tech || []).join(" ").toUpperCase();
  const title = (project.title || "").toUpperCase();
  const full = `${cat} ${tech} ${title}`;

  if (filter === "AI & AGENTS") return full.includes("AI") || full.includes("AGENT") || full.includes("VISION");
  if (filter === "SAAS & ENTERPRISE") return full.includes("SAAS") || full.includes("ENTERPRISE") || full.includes("CRM") || full.includes("MANAGEMENT") || full.includes("PLATFORM");
  if (filter === "IoT") return full.includes("IOT") || full.includes("GLASS") || full.includes("HARDWARE") || full.includes("WEBRTC");
  if (filter === "COMMERCIAL") return full.includes("COMMERCIAL") || full.includes("TOURISM") || full.includes("RESORT") || full.includes("BUSINESS");
  return true;
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (project.liveUrl && project.liveUrl !== "#") {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/projects/${project.id || project.slug}`);
    }
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    navigate(`/projects/${project.id || project.slug}`);
  };

  return (
    <div
      className={`project-card ${project.size === "large" ? "project-card--large" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
      style={{
        "--proj-color": project.color || "var(--cyan)",
        cursor: "pointer",
      }}
    >
      {/* Background glow */}
      <div
        className="proj-bg"
        style={{
          background: `linear-gradient(135deg, ${project.color || "#14B8A6"}18, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Card content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="proj-emoji">{project.emoji || "🚀"}</div>
        <div className="proj-category">{project.category}</div>
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-desc">{project.desc || project.description}</p>
        <div className="proj-tech">
          {(project.tech || project.technologies || []).map((t) => (
            <span key={t} className="proj-tech-tag">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hover action overlay */}
      <div
        className={`proj-overlay ${hovered ? "proj-overlay--visible" : ""}`}
        style={{ pointerEvents: hovered ? "all" : "none" }}
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          {project.liveUrl && project.liveUrl !== "#" && (
            <span
              className="proj-view-btn"
              style={{
                background: project.color || "var(--cyan)",
                color: "#020617",
                border: "none",
              }}
              onClick={handleCardClick}
            >
              Open Live Project ↗
            </span>
          )}
          <button
            className="proj-view-btn"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
            }}
            onClick={handleDetailsClick}
          >
            Case Study →
          </button>
        </div>
      </div>

      <div
        className="proj-corner-line"
        style={{ borderColor: `${project.color || "#14B8A6"}55`, pointerEvents: "none" }}
      />
    </div>
  );
}

export default function ProjectsSection() {
  const { projects: PROJECTS } = useData();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = PROJECTS.filter((p) => matchesFilter(p, activeFilter));

  return (
    <section id="projects" ref={sectionRef} className="projects-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Portfolio & Case Studies</div>
          <h2 className="section-title">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p className="section-subtitle">
            Real-world systems engineered by HyroVision — spanning AI agents, SaaS architectures, IoT hardware, and digital platforms.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "36px",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                border: "1px solid",
                borderColor: activeFilter === f ? "var(--cyan)" : "var(--border)",
                background: activeFilter === f ? "rgba(var(--cyan-rgb), 0.12)" : "var(--card-bg)",
                color: activeFilter === f ? "var(--cyan)" : "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id || p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
