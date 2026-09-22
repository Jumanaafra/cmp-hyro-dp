import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

import {
  LuRocket,
  LuCompass,
  LuChartBar,
  LuGlasses,
  LuBrainCircuit,
  LuGraduationCap,
  LuHotel,
  LuSparkles,
  LuLayers,
  LuGlobe,
  LuArrowUpRight,
  LuArrowRight,
} from "react-icons/lu";

const FILTERS = ["ALL", "AI & AGENTS", "SAAS & ENTERPRISE", "IoT", "COMMERCIAL"];

export function getProjectIcon(project, size = 22) {
  const key = (project.id || project.slug || project.title || "").toLowerCase();
  const cat = (project.category || "").toLowerCase();

  if (key.includes("happy-star") || key.includes("satellite")) return <LuRocket size={size} />;
  if (key.includes("pakka") || key.includes("tourism")) return <LuCompass size={size} />;
  if (key.includes("crm") || key.includes("hrms") || cat.includes("enterprise")) return <LuChartBar size={size} />;
  if (key.includes("glass") || key.includes("auravision") || cat.includes("iot")) return <LuGlasses size={size} />;
  if (key.includes("learning") || key.includes("agent") || cat.includes("agent")) return <LuBrainCircuit size={size} />;
  if (key.includes("alumni") || key.includes("connect") || cat.includes("networking")) return <LuGraduationCap size={size} />;
  if (key.includes("jojo") || key.includes("resort")) return <LuHotel size={size} />;
  if (key.includes("portfolio") || key.includes("3d") || cat.includes("creative")) return <LuSparkles size={size} />;
  if (cat.includes("ai")) return <LuBrainCircuit size={size} />;
  if (cat.includes("commercial")) return <LuGlobe size={size} />;

  return <LuLayers size={size} />;
}

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
    navigate(`/projects/${project.id || project.slug}`);
  };

  const handleLiveClick = (e) => {
    e.stopPropagation();
    if (project.liveUrl && project.liveUrl !== "#") {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    navigate(`/projects/${project.id || project.slug}`);
  };

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl !== "#");

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
          background: `radial-gradient(circle at 85% 15%, ${project.color || "#14B8A6"}24 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0.35,
        }}
      />

      {/* Card inner content */}
      <div className="proj-card-inner">
        <div className="proj-header">
          <div
            className="proj-icon-wrapper"
            style={{
              color: project.color || "var(--cyan)",
              background: `${project.color || "#14B8A6"}16`,
              borderColor: `${project.color || "#14B8A6"}38`,
            }}
          >
            {getProjectIcon(project, 22)}
          </div>
          <div className="proj-arrow-indicator" aria-hidden="true">
            <LuArrowUpRight size={16} />
          </div>
        </div>

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

        {/* Action buttons at bottom */}
        <div className="proj-actions">
          {hasLiveUrl && (
            <button
              type="button"
              className="proj-btn proj-btn--primary"
              onClick={handleLiveClick}
              title="Open live project"
            >
              Open Live Project <LuArrowUpRight size={14} />
            </button>
          )}
          <button
            type="button"
            className={`proj-btn ${hasLiveUrl ? "proj-btn--secondary" : "proj-btn--primary"}`}
            onClick={handleDetailsClick}
            title="View project case study"
          >
            Case Study <LuArrowRight size={14} />
          </button>
        </div>
      </div>

      <div
        className="proj-corner-line"
        style={{ borderColor: `${project.color || "#14B8A6"}44`, pointerEvents: "none" }}
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
