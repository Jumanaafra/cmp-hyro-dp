import { useEffect, useRef } from "react";

const STEPS = [
  { icon: "💡", step: "01", title: "Idea & Discovery", desc: "Deep-dive consultations to understand your goals, users, and technical constraints." },
  { icon: "📐", step: "02", title: "Planning & Strategy", desc: "Architecture diagrams, tech stack selection, sprint planning, and milestone definition." },
  { icon: "🎨", step: "03", title: "Design & Prototype", desc: "High-fidelity UI designs, interactive prototypes, and design system setup." },
  { icon: "⚙️", step: "04", title: "Development & QA", desc: "Agile development with continuous testing, code reviews, and performance optimization." },
  { icon: "🚀", step: "05", title: "Delivery & Support", desc: "Seamless deployment, handover documentation, and ongoing maintenance support." },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const line = lineRef.current;
    if (!el || !line) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("visible");
        line.style.width = "100%";
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="process-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">How We Work</div>
          <h2 className="section-title">Our <span className="gradient-text">Process</span></h2>
          <p className="section-subtitle">A proven, transparent methodology that delivers results — every single time.</p>
        </div>
        <div className="process-wrapper">
          <div className="process-line-track">
            <div className="process-line-fill" ref={lineRef} />
          </div>
          <div className="process-steps">
            {STEPS.map((s, i) => (
              <div key={s.step} className="process-step" style={{ animationDelay: `${i * 0.18}s` }}>
                <div className="ps-number">{s.step}</div>
                <div className="ps-icon-wrap">
                  <div className="ps-icon">{s.icon}</div>
                  <div className="ps-dot" />
                </div>
                <h3 className="ps-title">{s.title}</h3>
                <p className="ps-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
