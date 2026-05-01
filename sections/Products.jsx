import { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";


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
  const { products: PRODUCTS } = useData();
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
