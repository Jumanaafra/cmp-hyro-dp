import { createContext, useContext } from "react";

/* ── Static fallback data (shown instantly before Firestore loads) ── */
export const HERO_FALLBACK = {
  badge: "Next-Gen Vision AI · Est. 2024",
  headline_prefix: "We Build",
  words: ["Intelligent", "Powerful", "Scalable", "Futuristic", "Innovative"],
  headline_suffix: "Digital Experiences",
  subtitle: "AI-powered software, custom vision systems, and enterprise platforms — engineered to perform at scale and designed to impress at first glance.",
  cta_primary_label: "View Projects", cta_primary_href: "#projects",
  cta_secondary_label: "Get Started", cta_secondary_href: "#contact",
  stats: [{ v: "50+", l: "Projects" }, { v: "30+", l: "Clients" }, { v: "2+", l: "Yrs Exp" }, { v: "4", l: "Products" }],
  metrics: [
    { label: "AI Inference Speed", val: "12ms", pct: "92%", color: "#14B8A6" },
    { label: "System Uptime", val: "99.9%", pct: "99%", color: "#10b981" },
    { label: "Client Satisfaction", val: "4.9/5", pct: "98%", color: "#3b82f6" },
  ],
  techs: ["React", "Next.js", "Python", "TensorFlow", "Three.js", "Firebase", "TypeScript", "Node.js", "Flutter", "Docker"],
};

export const ABOUT_FALLBACK = {
  tag: "About Us", title: "Pioneering the Future of", title_gradient: "Vision Technology",
  description1: "Hyro Vision is a full-stack AI and software studio at the intersection of intelligence and design. We architect digital systems that don't just function — they inspire.",
  description2: "From computer vision pipelines to premium enterprise SaaS platforms, we bring technical excellence and aesthetic obsession to every build.",
  stats: [
    { icon: "🚀", label: "Projects Delivered", value: "50+" },
    { icon: "🌍", label: "Global Clients", value: "30+" },
    { icon: "⚡", label: "AI Models Deployed", value: "15+" },
    { icon: "🏆", label: "Industry Awards", value: "8" },
  ],
};

export const CTA_FALLBACK = {
  tag: "Ready to Build?", title: "Let's Build Something", title_gradient: "Powerful Together",
  description: "Whether you have a fully-formed idea or just a spark — we're here to turn it into something extraordinary.",
  btn_primary_label: "Start Your Project", btn_primary_href: "#contact", btn_secondary_label: "Email Us",
};

export const CONTACT_FALLBACK = {
  email: "hello@hyrovision.ai",
  whatsapp_number: "+1 (555) 123-4567",
  whatsapp_link: "https://wa.me/15551234567",
  location: "Dubai, UAE · Remote Worldwide",
  socials: [{ label: "LinkedIn", href: "#" }, { label: "GitHub", href: "#" }, { label: "Twitter", href: "#" }],
};

export const SERVICES_FALLBACK = [
  { title: "Custom AI Solutions", icon: "🧠", desc: "Tailor-made machine learning models for enterprise data.", tags: ["Python", "TensorFlow"], color: "#14b8a6" },
  { title: "Web Development", icon: "💻", desc: "High-performance web applications built with modern tech.", tags: ["React", "Node.js"], color: "#3b82f6" },
  { title: "UI/UX Design", icon: "✨", desc: "Premium, futuristic interfaces that captivate users.", tags: ["Figma", "Three.js"], color: "#8b5cf6" }
];

export const PRODUCTS_FALLBACK = [
  { id: "1", name: "VisionAI Core", tagline: "Enterprise Vision", desc: "Advanced image recognition system.", badge: "Enterprise", badgeColor: "#14b8a6", gradient: "linear-gradient(135deg, #14b8a611, #020617)", border: "#14b8a633", glow: "#14b8a6", stats: [{v: "12ms", l: "Latency"}, {v: "99.9%", l: "Accuracy"}], tags: ["Real-time", "High throughput"] },
  { id: "2", name: "Hyro Analytics", tagline: "Data Intelligence", desc: "Data analytics platform for modern teams.", badge: "SaaS", badgeColor: "#3b82f6", gradient: "linear-gradient(135deg, #3b82f611, #020617)", border: "#3b82f633", glow: "#3b82f6", stats: [{v: "10x", l: "Speed"}, {v: "24/7", l: "Uptime"}], tags: ["Dashboards", "Insights"] }
];

export const PROJECTS_FALLBACK = [
  { id: "p1", size: "large", color: "#14b8a6", emoji: "🛍️", category: "Computer Vision", title: "Neural Retail Analytics", desc: "Automated checkout using AI.", tech: ["Python", "TensorFlow"], liveUrl: "https://b-smart-glass-aura-vision.vercel.app/" },
  { id: "p2", size: null, color: "#3b82f6", emoji: "📊", category: "Web App", title: "MedScan Pro", desc: "Enterprise management system.", tech: ["React", "Node.js"], liveUrl: "https://alumni-connection-frontend.vercel.app/" }
];

export const PROCESS_FALLBACK = [
  { step: "01", icon: "🔍", title: "Discovery", desc: "We analyze your needs and outline the architecture." },
  { step: "02", icon: "⚙️", title: "Development", desc: "We build the solution with cutting-edge tech." },
  { step: "03", icon: "🚀", title: "Deployment", desc: "We launch and scale your product to the world." }
];

export const PRICING_FALLBACK = [
  { id: "1", highlighted: false, color: "#94a3b8", name: "Starter", tagline: "For small teams", price: "$99", period: "/mo", features: ["Basic Analytics", "Email Support", "1 User"], missing: ["Custom AI Models"], cta: "Get Started" },
  { id: "2", highlighted: true, color: "#3b82f6", name: "Pro", tagline: "For enterprises", price: "$299", period: "/mo", features: ["Advanced AI", "Priority Support", "Unlimited Users", "Custom Models"], missing: [], cta: "Get Pro" }
];

export const TECH_FALLBACK = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }
];

export const TESTIMONIALS_FALLBACK = [
  { text: "Hyro Vision completely transformed our business with their incredible AI solutions.", rating: 5, color: "#10b981", avatar: "JD", name: "John Doe", role: "CEO at TechCorp" },
  { text: "The team delivered a beautiful, performant web app ahead of schedule. Truly premium work.", rating: 5, color: "#3b82f6", avatar: "AS", name: "Alice Smith", role: "Founder at Nexus" }
];

/* ── Backup liveUrl resolver — fuzzy keyword match (case-insensitive) ── */
const LIVE_URL_BY_TITLE = {
  "Aura Vision":                    "https://b-smart-glass-aura-vision.vercel.app/",
  "Alumni Connect":                  "https://alumni-connection-frontend.vercel.app/",
  "Alumini Connect":                 "https://alumni-connection-frontend.vercel.app/",
  "Happy Star Satellite Vision":     "https://happystarsatellitevision.netlify.app/",
  "Happy Star":                      "https://happystarsatellitevision.netlify.app/",
  "Pakka Tourism":                   "https://pakkatourism.com",
  "IEEMA":                           "https://ieema.vercel.app/",
  "Hyro Vision":                     "https://hyrovision.vercel.app/",
  "Neural Retail Analytics":         "https://b-smart-glass-aura-vision.vercel.app/",
  "MedScan Pro":                     "https://alumni-connection-frontend.vercel.app/",
  "SmartLogistics Hub":              "https://happystarsatellitevision.netlify.app/",
  "EduVision LMS":                   "https://pakkatourism.com",
  "FinFlow Dashboard":               "https://ieema.vercel.app/",
  "SecureVault Identity":            "https://hyrovision.vercel.app/",
};

const KEYWORD_URL_MAP = [
  { keywords: ["aura"],                    url: "https://b-smart-glass-aura-vision.vercel.app/" },
  { keywords: ["alumin", "alumni"],        url: "https://alumni-connection-frontend.vercel.app/" },
  { keywords: ["happy star", "satellite"], url: "https://happystarsatellitevision.netlify.app/" },
  { keywords: ["pakka"],                   url: "https://pakkatourism.com" },
  { keywords: ["ieema"],                   url: "https://ieema.vercel.app/" },
  { keywords: ["hyro"],                    url: "https://hyrovision.vercel.app/" },
];

export const resolveLiveUrl = (title = "", firestoreUrl = "") => {
  if (firestoreUrl) return firestoreUrl;
  const exact = LIVE_URL_BY_TITLE[title];
  if (exact) return exact;
  const lower = title.toLowerCase();
  const match = KEYWORD_URL_MAP.find(({ keywords }) =>
    keywords.some((kw) => lower.includes(kw))
  );
  return match ? match.url : "";
};

export const withLiveUrl = (p) => {
  const resolved = resolveLiveUrl(p.title, p.liveUrl);
  console.log(`[Project] "${p.title}" → liveUrl: ${resolved || "(none)"}`);
  return { ...p, liveUrl: resolved };
};

/* ── Create context ── */
export const DataContext = createContext(null);

/* ── Hook to consume context (only export from this file) ── */
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
