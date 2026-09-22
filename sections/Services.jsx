import { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";
import {
  LuCode,
  LuLayoutDashboard,
  LuBrainCircuit,
  LuWorkflow,
  LuCloud,
  LuCpu,
  LuDatabase,
  LuArrowRight,
} from "react-icons/lu";

function getServiceIcon(service, index) {
  const title = (service.title || "").toLowerCase();
  const id = (service.id || "").toLowerCase();

  if (title.includes("web") || title.includes("full-stack") || id.includes("fullstack")) return <LuCode size={24} />;
  if (title.includes("saas") || title.includes("dashboard") || title.includes("enterprise") || id.includes("saas")) return <LuLayoutDashboard size={24} />;
  if (title.includes("ai") || title.includes("agent") || id.includes("ai")) return <LuBrainCircuit size={24} />;
  if (title.includes("automation") || title.includes("workflow") || id.includes("automation")) return <LuWorkflow size={24} />;
  if (title.includes("cloud") || title.includes("devops") || id.includes("cloud")) return <LuCloud size={24} />;
  if (title.includes("iot") || title.includes("hardware") || id.includes("iot")) return <LuCpu size={24} />;
  if (title.includes("database") || title.includes("data") || id.includes("data")) return <LuDatabase size={24} />;

  const fallbackList = [LuCode, LuLayoutDashboard, LuBrainCircuit, LuDatabase, LuCloud];
  const Fallback = fallbackList[index % fallbackList.length];
  return <Fallback size={24} />;
}

function ServiceCard({ service, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -20;
    setTilt({ x, y });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className="service-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        animationDelay: `${index * 0.1}s`,
        "--card-color": service.color,
      }}
    >
      <div className="sc-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}22 0%, transparent 70%)` }} />
      <div className="sc-icon" style={{ borderColor: `${service.color}44`, background: `${service.color}15`, color: service.color }}>
        {getServiceIcon(service, index)}
      </div>
      <h3 className="sc-title">{service.title}</h3>
      <p className="sc-desc">{service.desc}</p>
      <div className="sc-tags">
        {(service.tags ?? []).map(t => (
          <span key={t} className="sc-tag" style={{ borderColor: `${service.color ?? "#14B8A6"}44`, color: service.color ?? "#14B8A6" }}>
            {t}
          </span>
        ))}
      </div>
      <div className="sc-arrow"><LuArrowRight size={18} /></div>
    </div>
  );
}

export default function ServicesSection() {
  const { services: SERVICES } = useData();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="services-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">What We Do</div>
          <h2 className="section-title">Services We <span className="gradient-text">Deliver</span></h2>
          <p className="section-subtitle">End-to-end digital solutions crafted to transform your vision into a high-performing reality.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
