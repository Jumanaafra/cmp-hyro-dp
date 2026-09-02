import { useEffect, useRef, useState, useCallback } from "react";
import { useData } from "../context/DataContext";

function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const COLORS = ["#14B8A6", "#3b82f6", "#10b981", "#6366f1", "#22d3ee"];
    let W, H, pts = [], rafId;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize, { passive: true });
    resize();
    const mkP = () => {
      const c = COLORS[(Math.random() * COLORS.length) | 0];
      return {
        x: Math.random() * W,
        y: H + 10,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(Math.random() * 0.55 + 0.25),
        r: Math.random() * 2 + 0.5,
        o: 0,
        mo: Math.random() * 0.65 + 0.2,
        c,
        life: 0,
        max: Math.random() * 380 + 240,
      };
    };
    for (let i = 0; i < 60; i++) {
      const p = mkP();
      p.y = Math.random() * H;
      p.life = Math.random() * p.max;
      pts.push(p);
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const h1 = p.max * 0.12,
          h2 = p.max * 0.85;
        p.o =
          p.life < h1
            ? (p.life / h1) * p.mo
            : p.life > h2
            ? ((p.max - p.life) / (p.max - h2)) * p.mo
            : p.mo;
        ctx.save();
        ctx.globalAlpha = p.o * 0.45;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = p.r * 7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
        ctx.restore();
        if (p.life >= p.max || p.y < -10) pts[i] = mkP();
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [canvasRef]);
}

export default function HeroSection() {
  const { heroData } = useData();
  const WORDS = heroData?.words || ["Intelligent", "Scalable", "Autonomous", "High-Performance"];
  const METRICS = heroData?.metrics || [
    { label: "Engineering Quality", val: "Enterprise", pct: "100%", color: "#14B8A6" },
    { label: "System Reliability", val: "99.9%", pct: "99%", color: "#10b981" },
    { label: "AI Integration", val: "Production-Ready", pct: "95%", color: "#3b82f6" },
  ];
  const TECHS = heroData?.techs || [
    "React.js",
    "Next.js",
    "Node.js",
    "Python",
    "Gemini",
    "OpenAI",
    "LangGraph",
    "PostgreSQL",
  ];
  const CAPABILITIES = heroData?.capabilities_strip || [
    "FULL-STACK",
    "AI & AGENTS",
    "AUTOMATION",
    "IoT",
    "REAL-TIME SYSTEMS",
    "CLOUD",
  ];

  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  useParticles(canvasRef);

  const [wordIdx, setWordIdx] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setOut(true);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setOut(false);
      }, 340);
    }, 2800);
    return () => clearInterval(id);
  }, [WORDS.length]);

  const parRef = useRef({ x: 0, y: 0 });
  const tgtRef = useRef({ x: 0, y: 0 });
  const onMouseMove = useCallback((e) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    tgtRef.current = {
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    let rafId;
    const tick = () => {
      parRef.current.x += (tgtRef.current.x - parRef.current.x) * 0.06;
      parRef.current.y += (tgtRef.current.y - parRef.current.y) * 0.06;
      if (gridRef.current)
        gridRef.current.style.transform = `translate(${parRef.current.x * -9}px,${parRef.current.y * -6}px)`;
      rafId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={onMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div className="hv-grid-bg" />
      <div className="hv-orb hv-orb-1" />
      <div className="hv-orb hv-orb-2" />
      <div className="hv-orb hv-orb-3" />
      <div className="hv-rays">
        <div className="hv-ray" />
        <div className="hv-ray" />
      </div>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />
      <div className="hv-vig-t" />
      <div className="hv-vig-b" />

      <div className="hv-hero-content" ref={gridRef}>
        <div>
          <h1 className="hv-h1">
            Building{" "}
            <span className="hv-word-wrap">
              <span className={`hv-word${out ? " out" : ""}`}>{WORDS[wordIdx]}</span>
            </span>
            <span style={{ display: "block" }}>Digital Products.</span>
          </h1>

          <p className="hv-p">
            {heroData?.subtitle ||
              "HyroVision builds high-performance digital products, AI-powered systems and intelligent automation solutions for modern businesses."}
          </p>

          <div className="hv-cap-strip">
            {CAPABILITIES.map((cap) => (
              <span key={cap} className="hv-cap-pill">
                {cap}
              </span>
            ))}
          </div>

          <div className="hv-btns">
            <a href="#contact" className="hv-btn hv-btn-p" id="cta-contact">
              Start a Project <span className="hv-arr">→</span>
            </a>
            <a href="#projects" className="hv-btn hv-btn-s" id="cta-projects">
              <span className="hv-ico">▶</span> Explore Our Work
            </a>
          </div>
        </div>

        <div className="hv-right">
          <div className="hv-card">
            <div className="hv-scan" />
            <div className="hv-corner">
              <div className="hv-cdot" />
            </div>
            <div className="hv-chead">
              <div className="hv-cico">⚡</div>
              <div>
                <div className="hv-ctitle">Engineering Core</div>
                <div className="hv-csub">Production systems operational</div>
              </div>
              <div className="hv-online">
                <div className="hv-ondot" />
                Active
              </div>
            </div>
            {METRICS.map((m) => (
              <div key={m.label} className="hv-met">
                <div className="hv-mrow">
                  <span className="hv-mlbl">{m.label}</span>
                  <span className="hv-mval" style={{ color: m.color }}>
                    {m.val}
                  </span>
                </div>
                <div className="hv-mtrack">
                  <div
                    className="hv-mbar"
                    style={{
                      width: m.pct,
                      background: `linear-gradient(90deg, ${m.color}, ${m.color}99)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="hv-card hv-card-float">
            <div className="hv-chead" style={{ marginBottom: "14px" }}>
              <div className="hv-cico">🛠</div>
              <div>
                <div className="hv-ctitle">Verified Tech Stack</div>
                <div className="hv-csub">Modern architectures we build with</div>
              </div>
            </div>
            <div className="hv-tags">
              {TECHS.map((t) => (
                <span key={t} className="hv-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="hv-scroll-ind"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="hv-slbl">Scroll to explore</span>
        <div>
          <div className="hv-chev hv-c1" />
          <div className="hv-chev hv-c2" />
        </div>
      </div>
    </section>
  );
}
