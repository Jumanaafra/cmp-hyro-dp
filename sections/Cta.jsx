import { useEffect, useRef } from "react";

export default function CtaSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, pts = [], rafId, t = 0;
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);
    resize();
    for (let i = 0; i < 30; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5 });
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.005;
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.save(); ctx.globalAlpha = 0.5; ctx.shadowColor = "#14B8A6"; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${170 + Math.sin(t) * 20}, 70%, 60%)`; ctx.fill(); ctx.restore();
      });
      // Draw connections
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.save(); ctx.globalAlpha = (1 - dist / 120) * 0.25;
          ctx.strokeStyle = "#14B8A6"; ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); ctx.restore();
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section ref={sectionRef} className="cta-section reveal-section">
      <canvas ref={canvasRef} className="cta-canvas" />
      <div className="cta-orb-1" /><div className="cta-orb-2" />
      <div className="section-container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <div className="section-tag" style={{ justifyContent: "center", display: "flex", margin: "0 auto 24px" }}>Ready to Build?</div>
        <h2 className="cta-title">
          Let's Build Something<br />
          <span className="gradient-text">Powerful Together</span>
        </h2>
        <p className="cta-desc">
          Whether you have a fully-formed idea or just a spark — we're here to turn it into something extraordinary.
        </p>
        <div className="cta-buttons">
          <a href="#contact" className="hv-btn hv-btn-p" style={{ fontSize: "16px", padding: "16px 36px" }}>
            Start Your Project <span className="hv-arr">→</span>
          </a>
          <a href="mailto:hello@hyrovision.ai" className="hv-btn hv-btn-s" style={{ fontSize: "16px", padding: "16px 36px" }}>
            <span className="hv-ico">✉</span> Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
