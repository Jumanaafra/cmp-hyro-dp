import { useEffect, useRef } from "react";

const TECHS = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Python", icon: "🐍" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "PyTorch", icon: "🔥" },
  { name: "Three.js", icon: "🎮" },
  { name: "Node.js", icon: "🟢" },
  { name: "TypeScript", icon: "📘" },
  { name: "Flutter", icon: "🦋" },
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "AWS", icon: "☁️" },
  { name: "Firebase", icon: "🔥" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "OpenCV", icon: "👁️" },
  { name: "Figma", icon: "🎨" },
];

export default function TechStackSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const doubled = [...TECHS, ...TECHS];

  return (
    <section id="techstack" ref={sectionRef} className="techstack-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Our Arsenal</div>
          <h2 className="section-title">Tech We <span className="gradient-text">Master</span></h2>
          <p className="section-subtitle">Battle-tested technologies powering scalable, high-performance digital experiences.</p>
        </div>
      </div>
      <div className="ticker-wrapper">
        <div className="ticker-fade-left" />
        <div className="ticker-fade-right" />
        <div className="ticker-track">
          {doubled.map((t, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-icon">{t.icon}</span>
              <span className="ticker-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ticker-wrapper" style={{ marginTop: "16px" }}>
        <div className="ticker-fade-left" />
        <div className="ticker-fade-right" />
        <div className="ticker-track ticker-track--reverse">
          {doubled.map((t, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-icon">{t.icon}</span>
              <span className="ticker-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
