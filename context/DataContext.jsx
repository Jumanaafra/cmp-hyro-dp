// @refresh reset
import { createContext, useContext } from "react";
import { useFirestoreCollection, useFirestoreDoc } from "../hooks/useFirestoreCollection";

/* ── Static fallback data (shown instantly before Firestore loads) ── */
const HERO_FALLBACK = {
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

const ABOUT_FALLBACK = {
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

const CTA_FALLBACK = {
  tag: "Ready to Build?", title: "Let's Build Something", title_gradient: "Powerful Together",
  description: "Whether you have a fully-formed idea or just a spark — we're here to turn it into something extraordinary.",
  btn_primary_label: "Start Your Project", btn_primary_href: "#contact", btn_secondary_label: "Email Us",
};

const CONTACT_FALLBACK = {
  email: "hello@hyrovision.ai",
  whatsapp_number: "+1 (555) 123-4567",
  whatsapp_link: "https://wa.me/15551234567",
  location: "Dubai, UAE · Remote Worldwide",
  socials: [{ label: "LinkedIn", href: "#" }, { label: "GitHub", href: "#" }, { label: "Twitter", href: "#" }],
};

const SERVICES_FALLBACK = [
  { title: "Custom AI Solutions", icon: "🧠", desc: "Tailor-made machine learning models for enterprise data.", tags: ["Python", "TensorFlow"], color: "#14b8a6" },
  { title: "Web Development", icon: "💻", desc: "High-performance web applications built with modern tech.", tags: ["React", "Node.js"], color: "#3b82f6" },
  { title: "UI/UX Design", icon: "✨", desc: "Premium, futuristic interfaces that captivate users.", tags: ["Figma", "Three.js"], color: "#8b5cf6" }
];

const PRODUCTS_FALLBACK = [
  { id: "1", name: "VisionAI Core", tagline: "Enterprise Vision", desc: "Advanced image recognition system.", badge: "Enterprise", badgeColor: "#14b8a6", gradient: "linear-gradient(135deg, #14b8a611, #020617)", border: "#14b8a633", glow: "#14b8a6", stats: [{v: "12ms", l: "Latency"}, {v: "99.9%", l: "Accuracy"}], tags: ["Real-time", "High throughput"] },
  { id: "2", name: "Hyro Analytics", tagline: "Data Intelligence", desc: "Data analytics platform for modern teams.", badge: "SaaS", badgeColor: "#3b82f6", gradient: "linear-gradient(135deg, #3b82f611, #020617)", border: "#3b82f633", glow: "#3b82f6", stats: [{v: "10x", l: "Speed"}, {v: "24/7", l: "Uptime"}], tags: ["Dashboards", "Insights"] }
];

const PROJECTS_FALLBACK = [
  { id: "1", size: "large", color: "#14b8a6", emoji: "🛍️", category: "Computer Vision", title: "Smart Retail", desc: "Automated checkout using AI.", tech: ["Python", "TensorFlow"] },
  { id: "2", size: null, color: "#3b82f6", emoji: "📊", category: "Web App", title: "Nexus Dashboard", desc: "Enterprise management system.", tech: ["React", "Node.js"] }
];

const PROCESS_FALLBACK = [
  { step: "01", icon: "🔍", title: "Discovery", desc: "We analyze your needs and outline the architecture." },
  { step: "02", icon: "⚙️", title: "Development", desc: "We build the solution with cutting-edge tech." },
  { step: "03", icon: "🚀", title: "Deployment", desc: "We launch and scale your product to the world." }
];

const PRICING_FALLBACK = [
  { id: "1", highlighted: false, color: "#94a3b8", name: "Starter", tagline: "For small teams", price: "$99", period: "/mo", features: ["Basic Analytics", "Email Support", "1 User"], missing: ["Custom AI Models"], cta: "Get Started" },
  { id: "2", highlighted: true, color: "#3b82f6", name: "Pro", tagline: "For enterprises", price: "$299", period: "/mo", features: ["Advanced AI", "Priority Support", "Unlimited Users", "Custom Models"], missing: [], cta: "Get Pro" }
];

const TECH_FALLBACK = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }
];

const TESTIMONIALS_FALLBACK = [
  { text: "Hyro Vision completely transformed our business with their incredible AI solutions.", rating: 5, color: "#10b981", avatar: "JD", name: "John Doe", role: "CEO at TechCorp" },
  { text: "The team delivered a beautiful, performant web app ahead of schedule. Truly premium work.", rating: 5, color: "#3b82f6", avatar: "AS", name: "Alice Smith", role: "Founder at Nexus" }
];

/* ── Create context ── */
const DataContext = createContext(null);

export function DataProvider({ children }) {
  // Single-document collections
  const { data: heroRaw, loading: heroLoading } = useFirestoreDoc("hero_section", "main");
  const { data: aboutRaw, loading: aboutLoading } = useFirestoreDoc("about_section", "main");
  const { data: ctaRaw, loading: ctaLoading } = useFirestoreDoc("cta_section", "main");
  const { data: contactRaw, loading: contactLoading } = useFirestoreDoc("contact_info", "main");
  const { data: settingsRaw, loading: settingsLoading } = useFirestoreDoc("settings", "main");

  // Array collections
  const { data: services, loading: servicesLoading } = useFirestoreCollection("services");
  const { data: products, loading: productsLoading } = useFirestoreCollection("products");
  const { data: projects, loading: projectsLoading } = useFirestoreCollection("projects");
  const { data: processSteps, loading: processLoading } = useFirestoreCollection("process_steps");
  const { data: pricingPlans, loading: pricingLoading } = useFirestoreCollection("pricing_plans");
  const { data: techStack, loading: techLoading } = useFirestoreCollection("tech_stack");
  const { data: testimonials, loading: testimonialsLoading } = useFirestoreCollection("testimonials");

  const value = {
    // Merge fallbacks so the site renders instantly without flicker
    heroData: heroRaw || HERO_FALLBACK,
    aboutData: aboutRaw || ABOUT_FALLBACK,
    ctaData: ctaRaw || CTA_FALLBACK,
    contactInfo: contactRaw || CONTACT_FALLBACK,
    settings: settingsRaw || { site_name: "Hyro Vision", maintenance_mode: false },

    // Array collections (filter visible, already sorted by `order`)
    services: (services.length > 0 ? services : SERVICES_FALLBACK).filter((s) => s.visible !== false),
    products: (products.length > 0 ? products : PRODUCTS_FALLBACK).filter((p) => p.visible !== false),
    projects: (projects.length > 0 ? projects : PROJECTS_FALLBACK).filter((p) => p.visible !== false),
    processSteps: (processSteps.length > 0 ? processSteps : PROCESS_FALLBACK).filter((s) => s.visible !== false),
    pricingPlans: (pricingPlans.length > 0 ? pricingPlans : PRICING_FALLBACK).filter((p) => p.visible !== false),
    techStack: (techStack.length > 0 ? techStack : TECH_FALLBACK).filter((t) => t.visible !== false),
    testimonials: (testimonials.length > 0 ? testimonials : TESTIMONIALS_FALLBACK).filter((t) => t.visible !== false),

    // Loading states (individual — prevents cross-section flicker)
    loading: {
      hero: heroLoading,
      about: aboutLoading,
      services: servicesLoading,
      products: productsLoading,
      projects: projectsLoading,
      process: processLoading,
      pricing: pricingLoading,
      techStack: techLoading,
      testimonials: testimonialsLoading,
      cta: ctaLoading,
      contact: contactLoading,
      settings: settingsLoading,
    },
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/* ── Hook to consume context ── */
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
