import { useEffect, useRef } from "react";
import { useData } from "../context/DataContext";
import {
  LuSearch,
  LuRuler,
  LuPalette,
  LuCode,
  LuPlug,
  LuShieldCheck,
  LuRocket,
  LuWorkflow,
} from "react-icons/lu";

function getProcessIcon(step) {
  const num = step.step;
  const title = (step.title || "").toLowerCase();

  if (num === "01" || title.includes("discover")) return <LuSearch size={24} />;
  if (num === "02" || title.includes("define")) return <LuRuler size={24} />;
  if (num === "03" || title.includes("design")) return <LuPalette size={24} />;
  if (num === "04" || title.includes("build")) return <LuCode size={24} />;
  if (num === "05" || title.includes("integrate")) return <LuPlug size={24} />;
  if (num === "06" || title.includes("test")) return <LuShieldCheck size={24} />;
  if (num === "07" || title.includes("deploy") || title.includes("launch")) return <LuRocket size={24} />;

  return <LuWorkflow size={24} />;
}

export default function ProcessSection() {
  const { processSteps: STEPS } = useData();
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
                <div className="ps-icon-wrap">
                  <div className="ps-number">{s.step}</div>
                  <div className="ps-icon" style={{ color: "var(--cyan)" }}>{getProcessIcon(s)}</div>
                  <div className="ps-dot" />
                </div>
                <div className="ps-content">
                  <h3 className="ps-title">{s.title}</h3>
                  <p className="ps-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
