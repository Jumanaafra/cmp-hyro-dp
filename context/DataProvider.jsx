import { useFirestoreCollection, useFirestoreDoc } from "../hooks/useFirestoreCollection";
import { DataContext, withLiveUrl, HERO_FALLBACK, ABOUT_FALLBACK, CTA_FALLBACK, CONTACT_FALLBACK, SERVICES_FALLBACK, PRODUCTS_FALLBACK, PROJECTS_FALLBACK, PROCESS_FALLBACK, PRICING_FALLBACK, TECH_FALLBACK, TESTIMONIALS_FALLBACK } from "./DataContext";

export function DataProvider({ children }) {
  // Single-document collections
  const { data: heroRaw,     loading: heroLoading }     = useFirestoreDoc("hero_section",  "main");
  const { data: aboutRaw,    loading: aboutLoading }    = useFirestoreDoc("about_section", "main");
  const { data: ctaRaw,      loading: ctaLoading }      = useFirestoreDoc("cta_section",   "main");
  const { data: contactRaw,  loading: contactLoading }  = useFirestoreDoc("contact_info",  "main");
  const { data: settingsRaw, loading: settingsLoading } = useFirestoreDoc("settings",      "main");

  // Array collections
  const { data: services,    loading: servicesLoading }    = useFirestoreCollection("services");
  const { data: products,    loading: productsLoading }    = useFirestoreCollection("products");
  const { data: projects,    loading: projectsLoading }    = useFirestoreCollection("projects");
  const { data: processSteps,loading: processLoading }     = useFirestoreCollection("process_steps");
  const { data: pricingPlans,loading: pricingLoading }     = useFirestoreCollection("pricing_plans");
  const { data: techStack,   loading: techLoading }        = useFirestoreCollection("tech_stack");
  const { data: testimonials,loading: testimonialsLoading }= useFirestoreCollection("testimonials");

  const value = {
    heroData:    heroRaw    || HERO_FALLBACK,
    aboutData:   aboutRaw   || ABOUT_FALLBACK,
    ctaData:     ctaRaw     || CTA_FALLBACK,
    contactInfo: contactRaw || CONTACT_FALLBACK,
    settings:    settingsRaw || { site_name: "Hyro Vision", maintenance_mode: false },

    services:     (services.length     > 0 ? services     : SERVICES_FALLBACK).filter((s) => s.visible !== false),
    products:     (products.length     > 0 ? products     : PRODUCTS_FALLBACK).filter((p) => p.visible !== false),
    projects:     (projects.length     > 0 ? projects     : PROJECTS_FALLBACK).filter((p) => p.visible !== false).map(withLiveUrl),
    processSteps: (processSteps.length > 0 ? processSteps : PROCESS_FALLBACK).filter((s) => s.visible !== false),
    pricingPlans: (pricingPlans.length > 0 ? pricingPlans : PRICING_FALLBACK).filter((p) => p.visible !== false),
    techStack:    (techStack.length    > 0 ? techStack    : TECH_FALLBACK).filter((t) => t.visible !== false),
    testimonials: (testimonials.length > 0 ? testimonials : TESTIMONIALS_FALLBACK).filter((t) => t.visible !== false),

    loading: {
      hero: heroLoading, about: aboutLoading, services: servicesLoading,
      products: productsLoading, projects: projectsLoading, process: processLoading,
      pricing: pricingLoading, techStack: techLoading, testimonials: testimonialsLoading,
      cta: ctaLoading, contact: contactLoading, settings: settingsLoading,
    },
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
