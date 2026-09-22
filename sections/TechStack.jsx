import { useEffect, useRef } from "react";
import { useData } from "../context/DataContext";
import { technologies } from "../data/technologies";

import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiSqlite,
  SiFirebase,
  SiMongoose,
  SiGooglegemini,
  SiLangchain,
  SiN8N,
  SiMake,
  SiVercel,
  SiNetlify,
  SiRender,
  SiGreensock,
  SiFramer,
} from "react-icons/si";
import { TbBrandCss3, TbBrandOpenai } from "react-icons/tb";
import { FaAws } from "react-icons/fa6";
import {
  LuCpu,
  LuPalette,
  LuLayoutTemplate,
  LuServer,
  LuDatabase,
  LuBrainCircuit,
  LuWorkflow,
  LuCloud,
  LuSparkles,
  LuCode,
} from "react-icons/lu";

const TECH_META = {
  "React.js": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "var(--text-heading)" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "HTML5": { icon: SiHtml5, color: "#E34F26" },
  "CSS3": { icon: TbBrandCss3, color: "#1572B6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Bootstrap": { icon: SiBootstrap, color: "#7952B3" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express.js": { icon: SiExpress, color: "var(--text-heading)" },
  "Python": { icon: SiPython, color: "#3776AB" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "SQLite": { icon: SiSqlite, color: "#003B57" },
  "Firebase Firestore": { icon: SiFirebase, color: "#FFCA28" },
  "Firebase": { icon: SiFirebase, color: "#FFCA28" },
  "Mongoose": { icon: SiMongoose, color: "#880000" },
  "OpenAI": { icon: TbBrandOpenai, color: "#10A37F" },
  "Gemini": { icon: SiGooglegemini, color: "#8E75FF" },
  "LangGraph": { icon: SiLangchain, color: "#22C55E" },
  "MCP": { icon: LuCpu, color: "#06B6D4" },
  "n8n": { icon: SiN8N, color: "#EA4B71" },
  "Make.com": { icon: SiMake, color: "#6D28D9" },
  "AWS": { icon: FaAws, color: "#FF9900" },
  "Vercel": { icon: SiVercel, color: "var(--text-heading)" },
  "Netlify": { icon: SiNetlify, color: "#00C7B7" },
  "Render": { icon: SiRender, color: "#46E3B7" },
  "GSAP": { icon: SiGreensock, color: "#88CE02" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF" },
  "Canvas": { icon: LuPalette, color: "#EC4899" },
};

const CATEGORY_FALLBACK_ICONS = {
  Frontend: { icon: LuLayoutTemplate, color: "var(--cyan)" },
  Backend: { icon: LuServer, color: "#10B981" },
  Database: { icon: LuDatabase, color: "#3B82F6" },
  AI: { icon: LuBrainCircuit, color: "#8B5CF6" },
  Automation: { icon: LuWorkflow, color: "#F59E0B" },
  Cloud: { icon: LuCloud, color: "#06B6D4" },
  Creative: { icon: LuSparkles, color: "#EC4899" },
};

export default function TechStackSection() {
  const { techStack: TECHS } = useData();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = TECHS && TECHS.length > 0 ? TECHS : [];
  const half = Math.ceil(items.length / 2);
  const row1 = [...items.slice(0, half), ...items.slice(0, half)];
  const row2 = [...items.slice(half), ...items.slice(half)];

  const renderItem = (t, i) => {
    const meta =
      TECH_META[t.name] ||
      CATEGORY_FALLBACK_ICONS[t.category] || {
        icon: LuCode,
        color: "var(--cyan)",
      };
    const IconComponent = meta.icon;

    return (
      <div key={i} className="ts-item" aria-hidden={i >= items.length}>
        <span className="ts-icon" style={{ color: meta.color }}>
          <IconComponent size={18} />
        </span>
        <span className="ts-name">{t.name}</span>
      </div>
    );
  };

  return (
    <section id="tech" ref={sectionRef} className="techstack-section reveal-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Technology Universe</div>
          <h2 className="section-title">
            Technologies We <span className="gradient-text">Engineer With</span>
          </h2>
          <p className="section-subtitle">
            Modern, battle-tested tools and frameworks powering our full-stack architectures, AI agents, and cloud platforms.
          </p>
        </div>
      </div>

      {/* Row 1 — scrolls LEFT */}
      <div className="ts-marquee-wrapper">
        <div className="ts-fade-left" />
        <div className="ts-fade-right" />
        <div className="ts-track ts-track--left">
          {row1.map(renderItem)}
        </div>
      </div>

      {/* Row 2 — scrolls RIGHT */}
      <div className="ts-marquee-wrapper" style={{ marginTop: "16px" }}>
        <div className="ts-fade-left" />
        <div className="ts-fade-right" />
        <div className="ts-track ts-track--right">
          {row2.map(renderItem)}
        </div>
      </div>
    </section>
  );
}
