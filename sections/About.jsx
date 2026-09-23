import { useEffect, useRef } from "react";
import { useData } from "../context/DataContext";
import { company } from "../data/company";


function use3DCube(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let angle = 0, rafId, isVisible = true;
    const size = 90;

    const project = (x, y, z, ax, ay) => {
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const fov = 400;
      const scale = fov / (fov + z2 + 200);
      return { x: x1 * scale, y: y1 * scale, z: z2 };
    };

    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
    ].map(([x, y, z]) => [x * size, y * size, z * size]);

    const faces = [
      [0, 1, 2, 3], [4, 5, 6, 7],
      [0, 1, 5, 4], [2, 3, 7, 6],
      [0, 3, 7, 4], [1, 2, 6, 5],
    ];

    const faceColors = [
      "rgba(20,184,166,0.15)", "rgba(59,130,246,0.12)",
      "rgba(16,185,129,0.10)", "rgba(20,184,166,0.08)",
      "rgba(139,92,246,0.10)", "rgba(34,211,238,0.12)",
    ];

    const draw = () => {
      if (!isVisible) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const ax = angle * 0.4, ay = angle;
      const projected = vertices.map(([x, y, z]) => project(x, y, z, ax, ay));
      const cx = W / 2, cy = (H - 28) / 2;

      const sortedFaces = faces.map((face, i) => ({
        face, i,
        avgZ: face.reduce((s, vi) => s + projected[vi].z, 0) / 4,
      })).sort((a, b) => a.avgZ - b.avgZ);

      sortedFaces.forEach(({ face, i }) => {
        const pts = face.map(vi => ({ x: cx + projected[vi].x, y: cy + projected[vi].y }));
        ctx.save();
        ctx.beginPath();
        pts.forEach((p, j) => j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.closePath();
        ctx.fillStyle = faceColors[i];
        ctx.fill();
        ctx.strokeStyle = "rgba(20,184,166,0.6)";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#14B8A6";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
      });

      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 1.6);
      grd.addColorStop(0, "rgba(20,184,166,0.06)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      angle += 0.008;
      rafId = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

export default function AboutSection() {
  const { aboutData } = useData();
  const cubeRef = useRef(null);
  const sectionRef = useRef(null);

  use3DCube(cubeRef);

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

  const principles = aboutData?.principles || company.principles;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section reveal-section"
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >

      {/* ── Section Content ── */}
      <div className="section-container" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div className="about-grid">
          <div className="about-left">
            <div className="section-tag" style={{ color: "var(--cyan, #14B8A6)" }}>
              {aboutData?.tag || "About HyroVision"}
            </div>
            <h2
              className="section-title"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              We Engineer What's{" "}
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--cyan, #14B8A6)",
                }}
              >
                {aboutData?.title_gradient || "Next."}
              </span>
            </h2>
            <p className="about-desc" style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", lineHeight: 1.8 }}>
              {aboutData?.description1 ||
                "HyroVision is a modern technology and IT services company focused on building intelligent digital products, AI-powered systems, automation solutions, SaaS platforms, enterprise systems and connected technology experiences."}
            </p>
            <p className="about-desc" style={{ marginTop: "16px", color: "rgba(255, 255, 255, 0.72)", fontSize: "1.02rem", lineHeight: 1.8 }}>
              {aboutData?.description2 ||
                "We approach technology engineering with rigorous architecture, business-grounded pragmatism, and high-performance standards — turning complex challenges into resilient digital products."}
            </p>

            <div className="about-principles" style={{ marginTop: "32px" }}>
              {principles.map((p) => (
                <div
                  key={p.number}
                  className="about-principle-card liquid-glass"
                  style={{
                    padding: "16px 20px",
                    borderRadius: "14px",
                  }}
                >
                  <span className="ap-num" style={{ color: "var(--cyan, #14B8A6)", fontWeight: 700, fontSize: "12px" }}>
                    {p.number}
                  </span>
                  <span className="ap-title" style={{ color: "#ffffff", fontWeight: 600, fontSize: "15px" }}>
                    {p.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Founder Spotlight on Home Page About */}
            <div
              className="about-founder-snippet liquid-glass"
              style={{
                marginTop: "28px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                padding: "16px 20px",
                borderRadius: "16px",
                border: "1px solid rgba(20, 184, 166, 0.3)",
                background: "rgba(255, 255, 255, 0.03)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src="/assets/bharath-founder.jpg"
                  alt="Bharath — Founder of Hyrovision"
                  loading="lazy"
                  decoding="async"
                  width="68"
                  height="68"
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "14px",
                    objectFit: "cover",
                    objectPosition: "center 15%",
                    border: "2px solid var(--cyan, #14B8A6)",
                    boxShadow: "0 0 16px rgba(20, 184, 166, 0.35)",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--cyan, #14B8A6)",
                      background: "rgba(20, 184, 166, 0.12)",
                      border: "1px solid rgba(20, 184, 166, 0.25)",
                      padding: "2px 8px",
                      borderRadius: "999px",
                    }}
                  >
                    Founder
                  </span>
                </div>
                <h4 style={{ margin: "0 0 2px 0", fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
                  Bharath
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.72)", lineHeight: 1.4 }}>
                  Founder of Hyrovision · Lead Systems Architect
                </p>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="cube-container liquid-glass">
              <canvas ref={cubeRef} className="cube-canvas" />
              <div className="cube-orb-1" />
              <div className="cube-orb-2" />
              <div className="cube-ring" />
              <div className="cube-glow-label">
                <span className="pulse-dot" />HyroVision Engineering Core
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
