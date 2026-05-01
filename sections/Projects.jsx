import { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";


function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`project-card ${project.size === "large" ? "project-card--large" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ "--proj-color": project.color }}
    >
      <div className="proj-bg" style={{
        background: `linear-gradient(135deg, ${project.color}20, transparent)`,
        opacity: hovered ? 1 : 0.5,
      }} />
      <div className="proj-emoji">{project.emoji}</div>
      <div className="proj-category">{project.category}</div>
      <h3 className="proj-title">{project.title}</h3>
      <p className="proj-desc">{project.desc}</p>
      <div className="proj-tech">
        {project.tech.map(t => (
          <span key={t} className="proj-tech-tag">{t}</span>
        ))}
      </div>
      <div className={`proj-overlay ${hovered ? "proj-overlay--visible" : ""}`}>
        <a href="#contact" className="proj-view-btn" style={{ background: project.color, color: "#020617" }}>
          View Details →
        </a>
      </div>
      <div className="proj-corner-line" style={{ borderColor: `${project.color}55` }} />
    </div>
  );
}

export default function ProjectsSection() {
  const { projects: PROJECTS } = useData();
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Portfolio</div>
          <h2 className="section-title">Projects We're <span className="gradient-text">Proud Of</span></h2>
          <p className="section-subtitle">A selection of real-world projects that showcase our depth across industries and technologies.</p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}
