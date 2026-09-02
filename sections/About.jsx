import { useEffect, useRef } from "react";
import { useData } from "../context/DataContext";
import { company } from "../data/company";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4";

const FADE_DURATION_MS = 500;
const FADE_OUT_TRIGGER_SEC = 0.55;

/* ── Custom requestAnimationFrame fade system (no CSS transitions) ── */
function createFader(videoEl) {
  let rafId = null;

  function cancelCurrent() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function fadeIn() {
    cancelCurrent();
    const start = performance.now();
    const startOpacity = videoEl.style.opacity === "" ? 0 : parseFloat(videoEl.style.opacity);

    function step(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / FADE_DURATION_MS, 1);
      videoEl.style.opacity = String(startOpacity + (1 - startOpacity) * t);
      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = null;
      }
    }
    rafId = requestAnimationFrame(step);
  }

  function fadeOut(onComplete) {
    cancelCurrent();
    const start = performance.now();
    const startOpacity = videoEl.style.opacity === "" ? 1 : parseFloat(videoEl.style.opacity);

    function step(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / FADE_DURATION_MS, 1);
      videoEl.style.opacity = String(startOpacity * (1 - t));
      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        videoEl.style.opacity = "0";
        rafId = null;
        onComplete?.();
      }
    }
    rafId = requestAnimationFrame(step);
  }

  return { fadeIn, fadeOut, cancelCurrent };
}

function use3DCube(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let angle = 0, rafId;
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
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const ax = angle * 0.4, ay = angle;
      const projected = vertices.map(([x, y, z]) => project(x, y, z, ax, ay));
      const cx = W / 2, cy = H / 2;

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
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

export default function AboutSection() {
  const { aboutData } = useData();
  const cubeRef = useRef(null);
  const videoRef = useRef(null);
  const fadingOutRef = useRef(false);
  const faderRef = useRef(null);
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

  /* ── Fullscreen Video Seamless Loop + Fader ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";
    const fader = createFader(video);
    faderRef.current = fader;

    const handlePlay = () => {
      fadingOutRef.current = false;
      fader.fadeIn();
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_OUT_TRIGGER_SEC && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fader.fadeOut();
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      fader.cancelCurrent();
      fadingOutRef.current = false;
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    video.play().catch(() => {});

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      fader.cancelCurrent();
    };
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
      {/* ── Background Video with 17% Downshift ── */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="about-bg-video"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translateY(17%)",
          opacity: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* ── Dark Overlay for Cinematic Depth ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

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
          </div>

          <div className="about-right">
            <div
              className="cube-container liquid-glass"
              style={{
                borderRadius: "28px",
                padding: "20px",
              }}
            >
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
