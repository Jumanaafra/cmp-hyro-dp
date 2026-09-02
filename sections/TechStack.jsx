import { useEffect, useRef } from "react";
import { useData } from "../context/DataContext";
import { technologies } from "../data/technologies";

const CATEGORY_ICONS = {
  Frontend: "⚛️",
  Backend: "⚡",
  Database: "🗄️",
  AI: "🧠",
  Automation: "🔄",
  Cloud: "☁️",
  Creative: "✨",
};

export default function TechStackSection() {
  const { techStack: TECHS } = useData();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = TECHS && TECHS.length > 0 ? TECHS : [];
  const half = Math.ceil(items.length / 2);
  const row1 = [...items.slice(0, half), ...items.slice(0, half)];
  const row2 = [...items.slice(half), ...items.slice(half)];

  const renderItem = (t, i) => (
    <div key={i} className="ts-item" aria-hidden={i >= items.length}>
      <span className="ts-icon">
        {CATEGORY_ICONS[t.category] || "🛠️"}
      </span>
      <span className="ts-name">{t.name}</span>
    </div>
  );

  return (
    <section id="tech" ref={sectionRef} className="techstack-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Technology Universe</div>
          <h2 className="section-title">
            Technologies We <span className="gradient-text">Engineer With</span>
          </h2>
          <p className="section-subtitle">
            Modern, battle-tested tools and frameworks powering our full-stack architectures, AI agents, and cloud platforms.
          </p>
        </div>
      </div>

      {/* Row 1 — scrolls LEFT */}
      <div className="ts-marquee-wrapper">
        <div className="ts-fade-left" />
        <div className="ts-fade-right" />
        <div className="ts-track ts-track--left">
          {row1.map(renderItem)}
        </div>
      </div>

      {/* Row 2 — scrolls RIGHT */}
      <div className="ts-marquee-wrapper" style={{ marginTop: "16px" }}>
        <div className="ts-fade-left" />
        <div className="ts-fade-right" />
        <div className="ts-track ts-track--right">
          {row2.map(renderItem)}
        </div>
      </div>
    </section>
  );
}
