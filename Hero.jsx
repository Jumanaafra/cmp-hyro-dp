import { useEffect, useRef, useState, useCallback } from "react";

/* ── Typewriter words ── */
const WORDS = ["Intelligent", "Powerful", "Scalable", "Futuristic", "Innovative"];

/* ── Canvas particle hook ── */
function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const COLORS = ["#14B8A6", "#3b82f6", "#10b981", "#6366f1", "#22d3ee"];
    let W, H, pts = [], rafId;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize, { passive: true });
    resize();

    const mkP = () => {
      const c = COLORS[Math.random() * COLORS.length | 0];
      return {
        x: Math.random() * W, y: H + 10,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(Math.random() * 0.55 + 0.25),
        r: Math.random() * 2 + 0.5,
        o: 0, mo: Math.random() * 0.65 + 0.2,
        c, life: 0, max: Math.random() * 380 + 240,
      };
    };

    for (let i = 0; i < 55; i++) {
      const p = mkP();
      p.y = Math.random() * H;
      p.life = Math.random() * p.max;
      pts.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy; p.life++;
        const h1 = p.max * 0.12, h2 = p.max * 0.85;
        p.o = p.life < h1 ? (p.life / h1) * p.mo
            : p.life > h2 ? ((p.max - p.life) / (p.max - h2)) * p.mo
            : p.mo;
        ctx.save();
        ctx.globalAlpha = p.o * 0.45;
        ctx.shadowColor = p.c; ctx.shadowBlur = p.r * 7;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = p.o;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.fill();
        ctx.restore();
        if (p.life >= p.max || p.y < -10) pts[i] = mkP();
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [canvasRef]);
}

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef   = useRef(null);
  const gridRef   = useRef(null);

  /* particles */
  useParticles(canvasRef);

  /* typewriter */
  const [wordIdx, setWordIdx] = useState(0);
  const [out, setOut]         = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setOut(true);
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setOut(false); }, 340);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  /* navbar scroll glass */
  const navRef = useRef(null);
  useEffect(() => {
    const onScroll = () => navRef.current?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* cursor spotlight */
  const spotRef = useRef(null);
  useEffect(() => {
    let sx = 0, sy = 0, tx = 0, ty = 0, rafId;
    const onMove = e => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener("mousemove", onMove);
    const tick = () => {
      sx += (tx - sx) * 0.09; sy += (ty - sy) * 0.09;
      if (spotRef.current) { spotRef.current.style.left = sx + "px"; spotRef.current.style.top = sy + "px"; }
      rafId = requestAnimationFrame(tick);
    };
    tick();
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  /* parallax */
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [par,   setPar]   = useState({ x: 0, y: 0 });
  const parRef = useRef({ x: 0, y: 0 });
  const tgtRef = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback(e => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    tgtRef.current = { x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 };
  }, []);

  useEffect(() => {
    let rafId;
    const tick = () => {
      parRef.current.x += (tgtRef.current.x - parRef.current.x) * 0.06;
      parRef.current.y += (tgtRef.current.y - parRef.current.y) * 0.06;
      if (gridRef.current) {
        gridRef.current.style.transform = `translate(${parRef.current.x * -9}px,${parRef.current.y * -6}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ── Styles (inline for zero-dependency standalone) ── */
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --cyan:#14B8A6; --green:#10b981; --blue:#3b82f6; --bg:#020617; }
    html { scroll-behavior: smooth; }
    body { font-family:'Inter',sans-serif; background:var(--bg); color:#f1f5f9; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
    ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:var(--bg);}
    ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,var(--cyan),var(--blue));border-radius:3px;}
    ::selection{background:rgba(20,184,166,.3);color:#fff;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(32px);filter:blur(5px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
    @keyframes floatUD{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
    @keyframes orbDrift{0%,100%{transform:translate(0,0)}33%{transform:translate(50px,-40px)}66%{transform:translate(-30px,25px)}}
    @keyframes glowPulse{0%,100%{opacity:.22}50%{opacity:.5}}
    @keyframes gridFade{0%,100%{opacity:.035}50%{opacity:.07}}
    @keyframes raySweep{0%{opacity:0;left:-25%}40%{opacity:.12}100%{opacity:0;left:130%}}
    @keyframes scanDown{0%{top:-2%}100%{top:102%}}
    @keyframes barIn{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes scrollBob{0%,100%{transform:translateY(0);opacity:.8}50%{transform:translateY(8px);opacity:.3}}
    @keyframes pulseDot{0%,100%{box-shadow:0 0 0 0 rgba(20,184,166,.5)}50%{box-shadow:0 0 0 5px rgba(20,184,166,0)}}
    @keyframes navIn{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes wordIn{from{opacity:0;transform:translateY(18px);filter:blur(7px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
    @keyframes wordOut{from{opacity:1;transform:translateY(0);filter:blur(0)}to{opacity:0;transform:translateY(-14px);filter:blur(5px)}}
    @keyframes shine{0%{left:-60%}100%{left:120%}}

    #hv-nav{position:fixed;top:0;left:0;right:0;z-index:100;animation:navIn .65s cubic-bezier(.16,1,.3,1) both;transition:background .45s,border-color .45s,box-shadow .45s;}
    #hv-nav.scrolled{background:rgba(2,6,23,.9);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,.07);box-shadow:0 2px 32px rgba(0,0,0,.5);}
    .hv-nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 32px;height:68px;}
    .hv-logo{display:flex;align-items:center;gap:10px;text-decoration:none;}
    .hv-logo-mark{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(20,184,166,.18),rgba(30,64,175,.18));border:1px solid rgba(20,184,166,.45);font-weight:900;font-size:15px;color:var(--cyan);box-shadow:0 0 14px rgba(20,184,166,.2);transition:transform .25s,box-shadow .25s;}
    .hv-logo:hover .hv-logo-mark{transform:scale(1.1);box-shadow:0 0 22px rgba(20,184,166,.45);}
    .hv-logo-text{font-weight:800;font-size:17px;letter-spacing:-.4px;color:#fff;}
    .hv-logo-text span{background:linear-gradient(135deg,var(--cyan),#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 7px rgba(20,184,166,.5));}
    .hv-nav-links{display:flex;align-items:center;gap:2px;}
    .hv-nav-a{padding:7px 14px;border-radius:9px;font-size:14px;font-weight:500;color:#94a3b8;text-decoration:none;transition:color .2s,background .2s;}
    .hv-nav-a:hover{color:#fff;background:rgba(255,255,255,.06);}
    .hv-nav-cta{padding:9px 20px;border-radius:10px;font-size:14px;font-weight:600;background:linear-gradient(135deg,var(--cyan),var(--green));color:#020617;text-decoration:none;transition:transform .25s,box-shadow .25s;}
    .hv-nav-cta:hover{transform:scale(1.05) translateY(-1px);box-shadow:0 0 24px rgba(20,184,166,.5);}
    @media(max-width:780px){.hv-nav-links{display:none;}}

    #hv-hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:var(--bg);}
    .hv-grid-bg{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(20,184,166,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,.04) 1px,transparent 1px);background-size:58px 58px;animation:gridFade 5s ease-in-out infinite;}
    .hv-orb{position:absolute;border-radius:50%;pointer-events:none;}
    .hv-orb-1{width:620px;height:620px;top:-180px;left:-160px;background:radial-gradient(circle,rgba(20,184,166,.13) 0%,transparent 70%);animation:orbDrift 14s ease-in-out infinite;}
    .hv-orb-2{width:700px;height:700px;bottom:-220px;right:-160px;background:radial-gradient(circle,rgba(30,64,175,.16) 0%,transparent 70%);animation:orbDrift 17s ease-in-out reverse infinite;animation-delay:-7s;}
    .hv-orb-3{width:480px;height:480px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(16,185,129,.06) 0%,transparent 70%);animation:glowPulse 7s ease-in-out infinite;}
    .hv-rays{position:absolute;inset:0;overflow:hidden;pointer-events:none;}
    .hv-ray{position:absolute;top:0;bottom:0;width:180px;background:linear-gradient(180deg,transparent,rgba(20,184,166,.15),transparent);opacity:0;transform:skewX(-10deg);animation:raySweep 9s ease-in-out infinite;}
    .hv-ray:nth-child(2){width:110px;background:linear-gradient(180deg,transparent,rgba(59,130,246,.12),transparent);animation-delay:4.5s;animation-duration:12s;}
    #hv-canvas{position:absolute;inset:0;pointer-events:none;z-index:0;}
    .hv-vig-t{position:absolute;top:0;left:0;right:0;height:130px;background:linear-gradient(180deg,var(--bg),transparent);z-index:2;pointer-events:none;}
    .hv-vig-b{position:absolute;bottom:0;left:0;right:0;height:160px;background:linear-gradient(0deg,var(--bg),transparent);z-index:2;pointer-events:none;}

    .hv-content{position:relative;z-index:10;width:100%;max-width:1200px;margin:0 auto;padding:90px 40px 80px;display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center;min-height:100vh;}
    @media(max-width:900px){.hv-content{grid-template-columns:1fr;padding:100px 24px 80px;min-height:auto;}.hv-right{display:none;}}

    .hv-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;border:1px solid rgba(20,184,166,.3);background:rgba(20,184,166,.08);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan);margin-bottom:26px;width:fit-content;animation:fadeUp .7s cubic-bezier(.16,1,.3,1) .1s both;}
    .hv-dot{width:6px;height:6px;border-radius:50%;background:var(--cyan);animation:pulseDot 2s ease-in-out infinite;}
    .hv-h1{font-size:clamp(2.4rem,4.8vw,4rem);font-weight:900;line-height:1.07;letter-spacing:-.03em;color:#fff;margin-bottom:22px;animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .25s both;}
    .hv-word-wrap{display:inline-block;position:relative;height:1.12em;overflow:hidden;vertical-align:bottom;}
    .hv-word{display:block;background:linear-gradient(135deg,var(--cyan) 0%,#3b82f6 55%,var(--green) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:wordIn .4s cubic-bezier(.16,1,.3,1) both;}
    .hv-word.out{animation:wordOut .32s ease both;}
    .hv-p{font-size:1.08rem;color:#94a3b8;line-height:1.78;max-width:490px;margin-bottom:36px;font-weight:300;animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .42s both;}

    .hv-btns{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:44px;animation:scaleIn .7s cubic-bezier(.16,1,.3,1) .6s both;}
    .hv-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:12px;border:none;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;transition:transform .22s,box-shadow .22s;}
    .hv-btn-p{background:linear-gradient(135deg,var(--cyan),var(--green));color:#020617;}
    .hv-btn-p::after{content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);transform:skewX(-20deg);transition:left .5s;}
    .hv-btn-p:hover::after{left:120%;}
    .hv-btn-p:hover{transform:scale(1.04) translateY(-2px);box-shadow:0 0 30px rgba(20,184,166,.55),0 0 60px rgba(20,184,166,.2);}
    .hv-btn-s{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.14);color:#fff;}
    .hv-btn-s:hover{border-color:rgba(20,184,166,.5);background:rgba(20,184,166,.09);transform:scale(1.03) translateY(-1px);box-shadow:0 0 18px rgba(20,184,166,.2);}
    .hv-arr{font-size:17px;transition:transform .2s;display:inline-block;}
    .hv-btn-p:hover .hv-arr{transform:translateX(4px);}
    .hv-ico{color:var(--cyan);font-size:14px;}

    .hv-stats{display:inline-flex;align-items:center;gap:16px;flex-wrap:wrap;padding:11px 20px;border-radius:16px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);animation:fadeIn .8s ease .88s both;}
    .hv-stat{display:flex;flex-direction:column;align-items:center;gap:2px;}
    .hv-sv{font-size:17px;font-weight:800;background:linear-gradient(135deg,var(--cyan),#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .hv-sl{font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.12em;font-weight:500;}
    .hv-sdiv{width:1px;height:28px;background:rgba(255,255,255,.09);}

    .hv-right{display:flex;flex-direction:column;gap:14px;}
    .hv-card{border-radius:18px;padding:22px;background:rgba(14,24,46,.8);border:1px solid rgba(20,184,166,.2);box-shadow:0 8px 32px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.07);position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s;animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .85s both;}
    .hv-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.6),0 0 24px rgba(20,184,166,.1);}
    .hv-card2{animation-delay:1.05s;}
    .hv-card-float{animation:fadeUp .9s cubic-bezier(.16,1,.3,1) 1.05s both,floatUD 6s ease-in-out 2s infinite;}
    .hv-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(20,184,166,.5),transparent);animation:scanDown 4s linear infinite;pointer-events:none;}
    .hv-corner{position:absolute;top:0;right:0;width:72px;height:72px;pointer-events:none;overflow:hidden;}
    .hv-corner::before{content:'';position:absolute;top:0;right:0;width:100%;height:100%;background:linear-gradient(225deg,rgba(20,184,166,.12) 0%,transparent 55%);}
    .hv-cdot{position:absolute;top:10px;right:10px;width:7px;height:7px;border-radius:50%;background:var(--cyan);animation:pulseDot 2s ease-in-out infinite;}
    .hv-chead{display:flex;align-items:center;gap:12px;margin-bottom:18px;}
    .hv-cico{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(20,184,166,.12);border:1px solid rgba(20,184,166,.3);font-size:16px;flex-shrink:0;}
    .hv-ctitle{font-size:14px;font-weight:600;color:#f1f5f9;}
    .hv-csub{font-size:12px;color:#475569;margin-top:2px;}
    .hv-online{margin-left:auto;display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#34d399;}
    .hv-ondot{width:7px;height:7px;border-radius:50%;background:#34d399;animation:pulseDot 1.8s ease-in-out infinite;}
    .hv-met{margin-bottom:13px;}.hv-met:last-child{margin-bottom:0;}
    .hv-mrow{display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;}
    .hv-mlbl{color:#94a3b8;}.hv-mval{font-weight:600;}
    .hv-mtrack{height:4px;border-radius:99px;background:rgba(255,255,255,.06);overflow:hidden;}
    .hv-mbar{height:100%;border-radius:99px;transform-origin:left;animation:barIn 1.4s cubic-bezier(.16,1,.3,1) 1.4s both;}
    .hv-mc{background:linear-gradient(90deg,rgba(20,184,166,.6),#14B8A6);box-shadow:0 0 8px rgba(20,184,166,.5);}
    .hv-mg{background:linear-gradient(90deg,rgba(16,185,129,.6),#10b981);box-shadow:0 0 8px rgba(16,185,129,.5);}
    .hv-mb{background:linear-gradient(90deg,rgba(59,130,246,.6),#3b82f6);box-shadow:0 0 8px rgba(59,130,246,.5);}
    .hv-tags{display:flex;flex-wrap:wrap;gap:7px;}
    .hv-tag{padding:5px 11px;border-radius:8px;font-size:12px;font-weight:500;color:#cbd5e1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);cursor:default;transition:color .2s,border-color .2s,background .2s;}
    .hv-tag:hover{color:var(--cyan);border-color:rgba(20,184,166,.4);background:rgba(20,184,166,.07);}

    .hv-scroll{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;z-index:20;cursor:pointer;opacity:0;animation:fadeIn 1s ease 2.5s forwards;}
    .hv-slbl{font-size:10px;color:#475569;text-transform:uppercase;letter-spacing:.2em;font-weight:500;}
    .hv-chev{width:16px;height:9px;position:relative;}
    .hv-chev::before,.hv-chev::after{content:'';position:absolute;width:9px;height:1.5px;background:var(--cyan);border-radius:1px;top:2px;}
    .hv-chev::before{left:0;transform:rotate(35deg);}
    .hv-chev::after{right:0;transform:rotate(-35deg);}
    .hv-c1{animation:scrollBob 1.7s ease-in-out infinite;}
    .hv-c2{animation:scrollBob 1.7s ease-in-out .22s infinite;margin-top:-2px;}

    #hv-spot{pointer-events:none;position:fixed;z-index:1;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,.055) 0%,transparent 70%);transform:translate(-50%,-50%);}
  `;

  const TECHS = ["React","Next.js","Python","TensorFlow","Three.js","Firebase","TypeScript","Node.js","Flutter","Docker"];
  const METRICS = [
    { label:"AI Inference Speed", val:"12ms",  pct:"92%",  cls:"hv-mc", color:"#14B8A6" },
    { label:"System Uptime",      val:"99.9%", pct:"99%",  cls:"hv-mg", color:"#10b981" },
    { label:"Client Satisfaction",val:"4.9/5", pct:"98%",  cls:"hv-mb", color:"#3b82f6" },
  ];
  const STATS = [
    { v:"50+", l:"Projects" }, { v:"30+", l:"Clients" },
    { v:"2+",  l:"Yrs Exp"  }, { v:"4",   l:"Products" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div id="hv-spot" ref={spotRef} />

      {/* Navbar */}
      <nav id="hv-nav" ref={navRef}>
        <div className="hv-nav-inner">
          <a href="#" className="hv-logo">
            <div className="hv-logo-mark">H</div>
            <span className="hv-logo-text">Hyro <span>Vision</span></span>
          </a>
          <div className="hv-nav-links">
            {["About","Services","Products","Projects","Pricing","Contact"].map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} className="hv-nav-a">{n}</a>
            ))}
          </div>
          <a href="#contact" className="hv-nav-cta">Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="hv-hero" ref={heroRef} onMouseMove={onMouseMove}>
        <div className="hv-grid-bg" />
        <div className="hv-orb hv-orb-1" />
        <div className="hv-orb hv-orb-2" />
        <div className="hv-orb hv-orb-3" />
        <div className="hv-rays"><div className="hv-ray" /><div className="hv-ray" /></div>
        <canvas id="hv-canvas" ref={canvasRef} />
        <div className="hv-vig-t" /><div className="hv-vig-b" />

        <div className="hv-content" ref={gridRef}>

          {/* Left */}
          <div>
            <div className="hv-badge"><div className="hv-dot" />Next-Gen Vision AI · Est. 2024</div>

            <h1 className="hv-h1">
              We Build{" "}
              <span className="hv-word-wrap">
                <span className={`hv-word${out ? " out" : ""}`}>{WORDS[wordIdx]}</span>
              </span>
              <span style={{ display:"block" }}>Digital Experiences</span>
            </h1>

            <p className="hv-p">
              AI-powered software, custom vision systems, and enterprise platforms —
              engineered to perform at scale and designed to impress at first glance.
            </p>

            <div className="hv-btns">
              <a href="#projects" className="hv-btn hv-btn-p" id="cta-projects">
                View Projects <span className="hv-arr">→</span>
              </a>
              <a href="#contact" className="hv-btn hv-btn-s" id="cta-contact">
                <span className="hv-ico">▶</span> Get Started
              </a>
            </div>

            <div className="hv-stats">
              {STATS.map((s, i) => (
                <>
                  <div key={s.l} className="hv-stat">
                    <span className="hv-sv">{s.v}</span>
                    <span className="hv-sl">{s.l}</span>
                  </div>
                  {i < STATS.length - 1 && <div key={`d${i}`} className="hv-sdiv" />}
                </>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hv-right">
            {/* Card 1 — Metrics */}
            <div className="hv-card">
              <div className="hv-scan" />
              <div className="hv-corner"><div className="hv-cdot" /></div>
              <div className="hv-chead">
                <div className="hv-cico">⚡</div>
                <div>
                  <div className="hv-ctitle">Live System Status</div>
                  <div className="hv-csub">All systems operational</div>
                </div>
                <div className="hv-online"><div className="hv-ondot" />Online</div>
              </div>
              {METRICS.map(m => (
                <div key={m.label} className="hv-met">
                  <div className="hv-mrow">
                    <span className="hv-mlbl">{m.label}</span>
                    <span className="hv-mval" style={{ color: m.color }}>{m.val}</span>
                  </div>
                  <div className="hv-mtrack">
                    <div className={`hv-mbar ${m.cls}`} style={{ width: m.pct }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Card 2 — Tech Stack */}
            <div className="hv-card hv-card2 hv-card-float">
              <div className="hv-chead" style={{ marginBottom:"14px" }}>
                <div className="hv-cico">🛠</div>
                <div>
                  <div className="hv-ctitle">Tech Stack</div>
                  <div className="hv-csub">Technologies we master</div>
                </div>
              </div>
              <div className="hv-tags">
                {TECHS.map(t => <span key={t} className="hv-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hv-scroll">
          <span className="hv-slbl">Scroll to explore</span>
          <div><div className="hv-chev hv-c1" /><div className="hv-chev hv-c2" /></div>
        </div>
      </section>
    </>
  );
}