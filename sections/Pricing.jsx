import { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";


export default function PricingSection() {
  const { pricingPlans: PLANS } = useData();
  const sectionRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="pricing-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Pricing</div>
          <h2 className="section-title">Transparent <span className="gradient-text">Pricing</span></h2>
          <p className="section-subtitle">Straightforward packages with no hidden fees. Choose what fits — or let's build something custom.</p>
        </div>
        <div className="pricing-grid">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.highlighted ? "pricing-card--featured" : ""}`}
              onMouseEnter={() => setHovered(plan.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderColor: hovered === plan.id || plan.highlighted ? `${plan.color}55` : "rgba(255,255,255,0.08)",
                boxShadow: plan.highlighted ? `0 0 60px ${plan.color}25, 0 20px 60px rgba(0,0,0,0.4)` : hovered === plan.id ? `0 0 40px ${plan.color}20` : "none",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {plan.highlighted && <div className="pricing-featured-badge" style={{ background: `linear-gradient(90deg, ${plan.color}, #3b82f6)` }}>⭐ Most Popular</div>}
              <div className="pc2-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${plan.color}18 0%, transparent 65%)` }} />
              <div className="pc2-name">{plan.name}</div>
              <div className="pc2-tagline">{plan.tagline}</div>
              <div className="pc2-price">
                <span className="pc2-amount" style={{ color: plan.color }}>{plan.price}</span>
                <span className="pc2-period">{plan.period}</span>
              </div>
              <div className="pc2-divider" style={{ background: `linear-gradient(90deg, transparent, ${plan.color}55, transparent)` }} />
              <ul className="pc2-features">
                {(plan.features ?? []).map(f => (
                  <li key={f} className="pc2-feature pc2-feature--yes">
                    <span className="pc2-check" style={{ color: plan.color }}>✓</span>{f}
                  </li>
                ))}
                {(plan.missing ?? []).map(f => (
                  <li key={f} className="pc2-feature pc2-feature--no">
                    <span className="pc2-check-no">✕</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="pc2-cta" style={{
                background: plan.highlighted ? `linear-gradient(135deg, ${plan.color}, #3b82f6)` : "transparent",
                border: `1px solid ${plan.color}66`,
                color: plan.highlighted ? "#020617" : plan.color,
              }}>
                {plan.cta} {plan.highlighted ? "" : "→"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
