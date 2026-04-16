import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "p1",
    title: "Neural Retail Analytics",
    category: "Computer Vision",
    desc: "AI-powered foot traffic analysis system for retail chains using ceiling cameras and demographic detection.",
    tech: ["Python", "YOLO", "React", "AWS"],
    color: "#14B8A6",
    emoji: "🏪",
    size: "large",
  },
  {
    id: "p2",
    title: "MedScan Pro",
    category: "Healthcare AI",
    desc: "Medical document digitization and intelligent data extraction for hospital systems.",
    tech: ["OCR", "TensorFlow", "Node.js"],
    color: "#3b82f6",
    emoji: "🏥",
    size: "small",
  },
  {
    id: "p3",
    title: "SmartLogistics Hub",
    category: "Enterprise SaaS",
    desc: "Real-time fleet tracking, route optimization, and warehouse management platform for logistics companies.",
    tech: ["React", "PostgreSQL", "Maps API"],
    color: "#10b981",
    emoji: "🚚",
    size: "small",
  },
  {
    id: "p4",
    title: "EduVision LMS",
    category: "EdTech Platform",
    desc: "Modern learning management system with AI-powered personalized curriculum and adaptive assessments.",
    tech: ["Next.js", "Firebase", "AI/ML"],
    color: "#8b5cf6",
    emoji: "🎓",
    size: "large",
  },
  {
    id: "p5",
    title: "FinFlow Dashboard",
    category: "FinTech",
    desc: "Real-time financial analytics and reporting suite with AI-driven anomaly detection and forecasting.",
    tech: ["React", "Python", "D3.js"],
    color: "#f59e0b",
    emoji: "📊",
    size: "small",
  },
  {
    id: "p6",
    title: "SecureVault Identity",
    category: "Biometrics",
    desc: "Enterprise-grade facial recognition authentication system with liveness detection and audit logging.",
    tech: ["OpenCV", "FastAPI", "Redis"],
    color: "#ec4899",
    emoji: "🔐",
    size: "small",
  },
];

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
