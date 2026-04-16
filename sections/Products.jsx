import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  {
    id: "hyrovision-ai",
    name: "HyroVision AI",
    tagline: "Real-Time Computer Vision Platform",
    desc: "Cloud-native vision AI with object detection, face recognition, and video analytics. Power your camera feeds with intelligence.",
    badge: "🔥 Flagship",
    badgeColor: "#14B8A6",
    stats: [{ v: "60fps", l: "Processing" }, { v: "99.2%", l: "Accuracy" }, { v: "12ms", l: "Latency" }],
    tags: ["Vision AI", "Real-Time", "Cloud"],
    gradient: "linear-gradient(135deg, rgba(20,184,166,0.15), rgba(59,130,246,0.08))",
    border: "rgba(20,184,166,0.35)",
    glow: "#14B8A6",
  },
  {
    id: "hyroflow",
    name: "HyroFlow",
    tagline: "Intelligent Workflow Automation",
    desc: "AI-powered BPM platform that automates repetitive tasks, orchestrates teams, and delivers measurable business outcomes.",
    badge: "⚡ Popular",
    badgeColor: "#8b5cf6",
    stats: [{ v: "80%", l: "Time Saved" }, { v: "500+", l: "Workflows" }, { v: "4.9★", l: "Rating" }],
    tags: ["Automation", "BPM", "AI"],
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(20,184,166,0.06))",
    border: "rgba(139,92,246,0.3)",
    glow: "#8b5cf6",
  },
  {
    id: "hyrochat",
    name: "HyroChat",
    tagline: "Contextual AI Communications Suite",
    desc: "Omnichannel messaging platform with built-in GPT-powered chatbot, smart routing, and real-time customer sentiment analysis.",
    badge: "✨ New",
    badgeColor: "#10b981",
    stats: [{ v: "10M+", l: "Messages" }, { v: "50+", l: "Channels" }, { v: "99.9%", l: "Uptime" }],
    tags: ["Chat AI", "CXM", "SaaS"],
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(59,130,246,0.06))",
    border: "rgba(16,185,129,0.3)",
    glow: "#10b981",
  },
  {
    id: "hyroscan",
    name: "HyroScan",
    tagline: "Document Intelligence & OCR Engine",
    desc: "Extract, classify, and process documents at scale using deep learning OCR. Works on invoices, IDs, reports, and more.",
    badge: "📄 Enterprise",
    badgeColor: "#f59e0b",
    stats: [{ v: "98%", l: "OCR Accuracy" }, { v: "2s", l: "Per Doc" }, { v: "40+", l: "Languages" }],
    tags: ["OCR", "Document AI", "Enterprise"],
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.06))",
    border: "rgba(245,158,11,0.3)",
    glow: "#f59e0b",
  },
];

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0 });
  const ref = useRef(null);

  const onMouseMove = e => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <div
      ref={ref}
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0.5, y: 0 }); }}
      onMouseMove={onMouseMove}
      style={{
        background: product.gradient,
        borderColor: hovered ? product.border : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${product.glow}20` : "none",
        animationDelay: `${index * 0.12}s`,
      }}
    >
      {hovered && (
        <div className="product-spotlight" style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${product.glow}20 0%, transparent 60%)`,
        }} />
      )}
      <div className="pc-top">
        <div className="pc-badge" style={{ color: product.badgeColor, borderColor: `${product.badgeColor}44`, background: `${product.badgeColor}12` }}>
          {product.badge}
        </div>
        <div className="pc-float-icon" style={{ color: product.glow }}>◈</div>
      </div>
      <h3 className="pc-name" style={{ color: hovered ? "#fff" : "#e2e8f0" }}>{product.name}</h3>
      <p className="pc-tagline" style={{ color: product.glow }}>{product.tagline}</p>
      <p className="pc-desc">{product.desc}</p>
      <div className="pc-stats">
        {product.stats.map(s => (
          <div key={s.l} className="pc-stat">
            <span className="pc-sv" style={{ color: product.glow }}>{s.v}</span>
            <span className="pc-sl">{s.l}</span>
          </div>
        ))}
      </div>
      <div className="pc-tags">
        {product.tags.map(t => (
          <span key={t} className="pc-tag">{t}</span>
        ))}
      </div>
      <a href="#contact" className="pc-cta" style={{ borderColor: `${product.glow}55`, color: product.glow }}>
        Learn More <span>→</span>
      </a>
    </div>
  );
}

export default function ProductsSection() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="products-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Our Products</div>
          <h2 className="section-title">Built to <span className="gradient-text">Perform</span></h2>
          <p className="section-subtitle">Proprietary software products engineered from scratch — each solving a unique real-world problem.</p>
        </div>
        <div className="products-grid">
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
