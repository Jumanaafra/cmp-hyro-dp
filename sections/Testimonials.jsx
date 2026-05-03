import { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";

/* Static fallback — shown when Firestore has no data yet */
const FALLBACK_TESTIMONIALS = [
  {
    rating: 5,
    text: "Hyro Vision delivered an outstanding AI platform that exceeded every expectation. The team's technical depth and design sensibility are unmatched.",
    name: "Alex Chen", role: "CTO, TechVentures", avatar: "AC", color: "#14B8A6",
  },
  {
    rating: 5,
    text: "From concept to deployment in record time. The computer vision system they built has transformed our operational efficiency by 60%.",
    name: "Sara Mitchell", role: "VP Operations, LogiCore", avatar: "SM", color: "#3b82f6",
  },
  {
    rating: 5,
    text: "The most professional development studio we've worked with. Impeccable code quality, stunning UI, and they truly understand AI at a deep level.",
    name: "Raj Patel", role: "Founder, DataNova", avatar: "RP", color: "#10b981",
  },
];

export default function TestimonialsSection() {
  const { testimonials: raw } = useData();

  // Prefer Firestore data if loaded and non-empty, else static fallback
  const TESTIMONIALS = raw && raw.length > 0 ? raw : FALLBACK_TESTIMONIALS;

  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);

  // Ref so the interval always reads the latest length (avoids stale closure)
  const lenRef = useRef(TESTIMONIALS.length);
  useEffect(() => { lenRef.current = TESTIMONIALS.length; }, [TESTIMONIALS.length]);

  // Clamp index so it never goes out of bounds if the list changes size
  const safeActive = TESTIMONIALS.length > 0 ? Math.min(active, TESTIMONIALS.length - 1) : 0;
  const t = TESTIMONIALS[safeActive];

  const goTo = (idx) => {
    setFading(true);
    setTimeout(() => { setActive(idx); setFading(false); }, 300);
  };

  // Auto-rotate — restart whenever data becomes available
  useEffect(() => {
    if (!TESTIMONIALS.length) return;
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(a => (a + 1) % lenRef.current);
        setFading(false);
      }, 300);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [TESTIMONIALS.length > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Guard — should never trigger due to fallback, but safety net
  if (!t) return null;

  return (
    <section id="testimonials" ref={sectionRef} className="testimonials-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Client Stories</div>
          <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
        </div>

        <div className="testimonial-slider">
          <div
            className="tcard"
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 0.3s, transform 0.3s",
            }}
          >
            <div className="tcard-quote">"</div>
            <div className="tcard-stars">{"★".repeat(Math.max(0, Math.min(5, t.rating ?? 5)))}</div>
            <p className="tcard-text">{t.text}</p>
            <div className="tcard-author">
              <div
                className="tcard-avatar"
                style={{
                  background: `linear-gradient(135deg, ${t.color ?? "#14B8A6"}, #020617)`,
                  borderColor: `${t.color ?? "#14B8A6"}55`,
                }}
              >
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
                className={`tcard-dot ${i === safeActive ? "tcard-dot--active" : ""}`}
                style={{ backgroundColor: i === safeActive ? (t.color ?? "#14B8A6") : undefined }}
                onClick={() => { clearInterval(intervalRef.current); goTo(i); }}
              />
            ))}
          </div>

          <div className="tcard-nav">
            <button
              className="tcard-nav-btn"
              onClick={() => { clearInterval(intervalRef.current); goTo((safeActive - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }}
            >←</button>
            <button
              className="tcard-nav-btn"
              onClick={() => { clearInterval(intervalRef.current); goTo((safeActive + 1) % TESTIMONIALS.length); }}
            >→</button>
          </div>
        </div>

        <div className="testimonials-logos">
          {TESTIMONIALS.map((ti, i) => (
            <div
              key={i}
              className={`tl-chip ${i === safeActive ? "tl-chip--active" : ""}`}
              style={{ borderColor: i === safeActive ? `${ti.color ?? "#14B8A6"}66` : undefined }}
              onClick={() => { clearInterval(intervalRef.current); goTo(i); }}
            >
              <span className="tl-dot" style={{ background: ti.color ?? "#14B8A6" }} />
              {(ti.name ?? "").split(" ")[0]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
