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
    services: services.filter((s) => s.visible !== false),
    products: products.filter((p) => p.visible !== false),
    projects: projects.filter((p) => p.visible !== false),
    processSteps: processSteps.filter((s) => s.visible !== false),
    pricingPlans: pricingPlans.filter((p) => p.visible !== false),
    techStack: techStack.filter((t) => t.visible !== false),
    testimonials: testimonials.filter((t) => t.visible !== false),

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
