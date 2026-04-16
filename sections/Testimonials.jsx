import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO, NeuralRetail Inc.",
    avatar: "SC",
    text: "Hyro Vision transformed our retail analytics. The computer vision system they built processes 60+ camera feeds in real-time with accuracy we didn't think was possible. It's genuinely impressive.",
    rating: 5,
    color: "#14B8A6",
  },
  {
    name: "Alex Müller",
    role: "CEO, MedScan Solutions",
    avatar: "AM",
    text: "We came with a complex healthcare problem and they delivered beyond expectations. The OCR engine processes thousands of medical documents daily with 98% accuracy. Incredible team.",
    rating: 5,
    color: "#3b82f6",
  },
  {
    name: "Priya Nair",
    role: "Product Lead, EduTech Global",
    avatar: "PN",
    text: "The LMS they built for us has a UX that our students actually love. The AI personalization module boosted course completion by 43%. We couldn't be happier with the outcome.",
    rating: 5,
    color: "#8b5cf6",
  },
  {
    name: "Omar Al-Rashid",
    role: "Director of Tech, SwiftLogistics",
    avatar: "OA",
    text: "Their enterprise logistics platform saved us 80+ hours per week in manual operations. The real-time tracking and AI-driven route optimization paid for itself within 3 months.",
    rating: 5,
    color: "#10b981",
  },
];

export default function TestimonialsSection() {
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
