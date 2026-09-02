import { createContext, useContext } from "react";
import { company } from "../data/company";
import { services as verifiedServices } from "../data/services";
import { projects as verifiedProjects } from "../data/projects";
import { technologies as verifiedTechnologies } from "../data/technologies";
import { capabilities as verifiedCapabilities } from "../data/capabilities";
import { processSteps as verifiedProcessSteps } from "../data/process";

/* ── Static verified fallback data (shown before Firestore or when offline) ── */
export const HERO_FALLBACK = {
  badge: "Intelligent Systems · Technology Engineering",
  headline_prefix: "Building",
  words: ["Intelligent", "Scalable", "Autonomous", "High-Performance", "Connected"],
  headline_suffix: "Digital Products.",
  subtitle:
    "HyroVision builds high-performance digital products, AI-powered systems and intelligent automation solutions for modern businesses.",
  cta_primary_label: "Start a Project",
  cta_primary_href: "#contact",
  cta_secondary_label: "Explore Work",
  cta_secondary_href: "#projects",
  capabilities_strip: [
    "FULL-STACK",
    "AI & AGENTS",
    "AUTOMATION",
    "IoT",
    "REAL-TIME SYSTEMS",
    "CLOUD",
  ],
  metrics: [
    { label: "Engineering Quality", val: "Enterprise", pct: "100%", color: "#14B8A6" },
    { label: "System Reliability", val: "99.9%", pct: "99%", color: "#10b981" },
    { label: "AI Integration", val: "Production-Ready", pct: "95%", color: "#3b82f6" },
  ],
  techs: [
    "React.js",
    "Next.js",
    "Node.js",
    "Python",
    "Gemini",
    "OpenAI",
    "LangGraph",
    "Supabase",
    "PostgreSQL",
    "AWS",
  ],
};

export const ABOUT_FALLBACK = {
  tag: "About HyroVision",
  title: "We Engineer What's",
  title_gradient: "Next.",
  description1:
    "HyroVision is a modern technology and IT services company focused on building intelligent digital products, AI-powered systems, automation solutions, SaaS platforms, enterprise systems and connected technology experiences.",
  description2:
    "We approach technology engineering with rigorous architecture, business-grounded pragmatism, and high-performance standards — turning complex challenges into resilient digital products.",
  capabilities: verifiedCapabilities,
  principles: company.principles,
};

export const CTA_FALLBACK = {
  tag: "Let's Collaborate",
  title: "Let's Build",
  title_gradient: "Something Exceptional.",
  description:
    "Have an idea, a business problem, or an operational bottleneck that needs intelligent automation? Let's discuss how we can engineer the right solution.",
  btn_primary_label: "Start a Project",
  btn_primary_href: "#contact",
  btn_secondary_label: "Contact Team",
};

export const CONTACT_FALLBACK = {
  email: company.contact.email,
  whatsapp_number: company.contact.whatsappNumber,
  whatsapp_link: `https://wa.me/${company.contact.whatsappNumber.replace(/[^0-9]/g, "")}`,
  location: "Remote Worldwide · Engineering Hub",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Website", href: company.contact.website },
  ],
};

const PROJECT_COLORS = [
  "#14B8A6",
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#06B6D4",
  "#6366F1",
  "#EC4899",
  "#F59E0B",
];
const PROJECT_EMOJIS = ["🚀", "🌍", "📊", "👓", "🧠", "🎓", "🏖️", "✨"];

export const SERVICES_FALLBACK = verifiedServices.map((s, idx) => ({
  ...s,
  desc: s.description,
  tags: s.capabilities.slice(0, 4),
  icon: ["💻", "📊", "🧠", "🗄️", "☁️"][idx % 5],
  color: PROJECT_COLORS[idx % PROJECT_COLORS.length],
}));

export const PROJECTS_FALLBACK = verifiedProjects.map((p, idx) => ({
  ...p,
  desc: p.description,
  tech: p.technologies,
  color: PROJECT_COLORS[idx % PROJECT_COLORS.length],
  emoji: PROJECT_EMOJIS[idx % PROJECT_EMOJIS.length],
  size: idx === 0 || idx === 3 ? "large" : null,
}));

export const PROCESS_FALLBACK = verifiedProcessSteps.map((s) => ({
  step: s.step,
  title: s.title,
  desc: s.description,
  icon: s.icon,
  whatWeDo: s.whatWeDo,
  clientProvides: s.clientProvides,
  expectedOutput: s.expectedOutput,
}));

export const TECH_FALLBACK = Object.entries(verifiedTechnologies).flatMap(([category, list]) =>
  list.map((name) => ({
    name,
    category,
  }))
);

/* ── Backup liveUrl resolver ── */
export const resolveLiveUrl = (title = "", firestoreUrl = "") => {
  if (firestoreUrl && firestoreUrl !== "#") return firestoreUrl;
  const match = verifiedProjects.find(
    (p) => p.title.toLowerCase() === title.toLowerCase() || p.slug === title
  );
  return match?.liveUrl || "";
};

export const withLiveUrl = (p) => {
  const resolved = resolveLiveUrl(p.title, p.liveUrl);
  return { ...p, liveUrl: resolved || p.liveUrl || "" };
};

/* ── Create context ── */
export const DataContext = createContext(null);

/* ── Hook to consume context ── */
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
