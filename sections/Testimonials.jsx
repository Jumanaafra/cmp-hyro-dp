import { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";


export default function TestimonialsSection() {
  const { testimonials: TESTIMONIALS } = useData();
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);

  const goTo = (idx) => {
    setFading(true);
    setTimeout(() => { setActive(idx); setFading(false); }, 300);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(a => (a + 1) % TESTIMONIALS.length);
        setFading(false);
      }, 300);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" ref={sectionRef} className="testimonials-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Client Stories</div>
          <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
        </div>
        <div className="testimonial-slider">
          <div className="tcard" style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.3s, transform 0.3s" }}>
            <div className="tcard-quote">"</div>
            <div className="tcard-stars">{"★".repeat(t.rating)}</div>
            <p className="tcard-text">{t.text}</p>
            <div className="tcard-author">
              <div className="tcard-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, #020617)`, borderColor: `${t.color}55` }}>
                {t.avatar}
              </div>
              <div>
                <div className="tcard-name">{t.name}</div>
                <div className="tcard-role">{t.role}</div>
              </div>
            </div>
          </div>
          <div className="tcard-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`tcard-dot ${i === active ? "tcard-dot--active" : ""}`}
                style={{ backgroundColor: i === active ? t.color : undefined }}
                onClick={() => { clearInterval(intervalRef.current); goTo(i); }}
              />
            ))}
          </div>
          <div className="tcard-nav">
            <button className="tcard-nav-btn" onClick={() => { clearInterval(intervalRef.current); goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }}>←</button>
            <button className="tcard-nav-btn" onClick={() => { clearInterval(intervalRef.current); goTo((active + 1) % TESTIMONIALS.length); }}>→</button>
          </div>
        </div>
        <div className="testimonials-logos">
          {TESTIMONIALS.map((ti, i) => (
            <div key={i} className={`tl-chip ${i === active ? "tl-chip--active" : ""}`} style={{ borderColor: i === active ? `${ti.color}66` : undefined }} onClick={() => { clearInterval(intervalRef.current); goTo(i); }}>
              <span className="tl-dot" style={{ background: ti.color }} />
              {ti.name.split(" ")[0]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
