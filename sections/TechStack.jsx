import { useEffect, useRef } from "react";
import { useData } from "../context/DataContext";

export default function TechStackSection() {
  const { techStack: TECHS } = useData();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Duplicate exactly 2× — the seamless loop trick:
  // Track width = 2× content. Animating -50% shifts exactly 1 copy.
  // When it resets to 0, the second copy looks identical → no visible jump.
  const items = TECHS.length > 0 ? TECHS : [];
  const doubled = [...items, ...items];

  const renderItem = (t, i) => (
    <div key={i} className="ts-item" aria-hidden={i >= items.length}>
      <span className="ts-icon">
        {typeof t.icon === 'string' && t.icon.startsWith('http')
          ? <img src={t.icon} alt={t.name} width="22" height="22" style={{ objectFit: 'contain', display: 'block' }} />
          : t.icon}
      </span>
      <span className="ts-name">{t.name}</span>
    </div>
  );

  return (
    <section id="techstack" ref={sectionRef} className="techstack-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Our Arsenal</div>
          <h2 className="section-title">Tech We <span className="gradient-text">Master</span></h2>
          <p className="section-subtitle">Battle-tested technologies powering scalable, high-performance digital experiences.</p>
        </div>
      </div>

      {/* Row 1 — scrolls LEFT (0 → -50%) */}
      <div className="ts-marquee-wrapper">
        <div className="ts-fade-left" />
        <div className="ts-fade-right" />
        <div className="ts-track ts-track--left">
          {doubled.map(renderItem)}
        </div>
      </div>

      {/* Row 2 — scrolls RIGHT (-50% → 0) */}
      <div className="ts-marquee-wrapper" style={{ marginTop: '16px' }}>
        <div className="ts-fade-left" />
        <div className="ts-fade-right" />
        <div className="ts-track ts-track--right">
          {doubled.map(renderItem)}
        </div>
      </div>
    </section>
  );
}
