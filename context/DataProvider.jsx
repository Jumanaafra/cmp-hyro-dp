import { useFirestoreCollection, useFirestoreDoc } from "../hooks/useFirestoreCollection";
import {
  DataContext,
  withLiveUrl,
  HERO_FALLBACK,
  ABOUT_FALLBACK,
  CTA_FALLBACK,
  CONTACT_FALLBACK,
  SERVICES_FALLBACK,
  PROJECTS_FALLBACK,
  PROCESS_FALLBACK,
  TECH_FALLBACK,
} from "./DataContext";

export function DataProvider({ children }) {
  // Single-document collections
  const { data: heroRaw, loading: heroLoading } = useFirestoreDoc("hero_section", "main");
  const { data: aboutRaw, loading: aboutLoading } = useFirestoreDoc("about_section", "main");
  const { data: ctaRaw, loading: ctaLoading } = useFirestoreDoc("cta_section", "main");
  const { data: contactRaw, loading: contactLoading } = useFirestoreDoc("contact_info", "main");
  const { data: settingsRaw, loading: settingsLoading } = useFirestoreDoc("settings", "main");

  // Array collections
  const { data: services, loading: servicesLoading } = useFirestoreCollection("services");
  const { data: projects, loading: projectsLoading } = useFirestoreCollection("projects");
  const { data: processSteps, loading: processLoading } = useFirestoreCollection("process_steps");
  const { data: techStack, loading: techLoading } = useFirestoreCollection("tech_stack");

  const value = {
    heroData: heroRaw || HERO_FALLBACK,
    aboutData: aboutRaw || ABOUT_FALLBACK,
    ctaData: ctaRaw || CTA_FALLBACK,
    contactInfo: contactRaw || CONTACT_FALLBACK,
    settings: settingsRaw || { site_name: "HyroVision", maintenance_mode: false },

    services: (services && services.length > 0 ? services : SERVICES_FALLBACK).filter(
      (s) => s.visible !== false
    ),
    projects: (projects && projects.length > 0 ? projects : PROJECTS_FALLBACK)
      .filter((p) => p.visible !== false)
      .map(withLiveUrl),
    processSteps: (processSteps && processSteps.length > 0 ? processSteps : PROCESS_FALLBACK).filter(
      (s) => s.visible !== false
    ),
    techStack: (techStack && techStack.length > 0 ? techStack : TECH_FALLBACK).filter(
      (t) => t.visible !== false
    ),

    loading: {
      hero: heroLoading,
      about: aboutLoading,
      services: servicesLoading,
      projects: projectsLoading,
      process: processLoading,
      techStack: techLoading,
      cta: ctaLoading,
      contact: contactLoading,
      settings: settingsLoading,
    },
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
