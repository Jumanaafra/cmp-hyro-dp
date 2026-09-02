import { useEffect, useRef } from "react";
import { useData } from "../context/DataContext";
import { capabilities } from "../data/capabilities";
import { company } from "../data/company";

function use3DCube(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let angle = 0, rafId;
    const size = 90;

    const project = (x, y, z, ax, ay) => {
      // Rotate around Y axis
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      // Rotate around X axis
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
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const ax = angle * 0.4, ay = angle;
      const projected = vertices.map(([x, y, z]) => project(x, y, z, ax, ay));
      const cx = W / 2, cy = H / 2;

      // Sort faces by average Z
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

      // Draw glow at center
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
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

export default function AboutSection() {
  const { aboutData } = useData();
  const cubeRef = useRef(null);
  use3DCube(cubeRef);

  const sectionRef = useRef(null);
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
    <section id="about" ref={sectionRef} className="about-section reveal-section">
      <div className="section-container">
        <div className="about-grid">
          <div className="about-left">
            <div className="section-tag">{aboutData?.tag || "About HyroVision"}</div>
            <h2 className="section-title">
              We Engineer What's<br />
              <span className="gradient-text">{aboutData?.title_gradient || "Next."}</span>
            </h2>
            <p className="about-desc">
              {aboutData?.description1 ||
                "HyroVision is a modern technology and IT services company focused on building intelligent digital products, AI-powered systems, automation solutions, SaaS platforms, enterprise systems and connected technology experiences."}
            </p>
            <p className="about-desc" style={{ marginTop: "16px" }}>
              {aboutData?.description2 ||
                "We approach technology engineering with rigorous architecture, business-grounded pragmatism, and high-performance standards — turning complex challenges into resilient digital products."}
            </p>

            <div className="about-principles">
              {principles.map((p) => (
                <div key={p.number} className="about-principle-card">
                  <span className="ap-num">{p.number}</span>
                  <span className="ap-title">{p.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-right">
            <div className="cube-container">
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
