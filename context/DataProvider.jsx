import { useState, useEffect } from "react";
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
  // Instantaneous fallback data on frame 0 — zero layout shift, zero network delay
  const [heroRaw, setHeroRaw] = useState(null);
  const [aboutRaw, setAboutRaw] = useState(null);
  const [ctaRaw, setCtaRaw] = useState(null);
  const [contactRaw, setContactRaw] = useState(null);
  const [settingsRaw, setSettingsRaw] = useState(null);

  const [services, setServices] = useState(SERVICES_FALLBACK);
  const [projects, setProjects] = useState(PROJECTS_FALLBACK);
  const [processSteps, setProcessSteps] = useState(PROCESS_FALLBACK);
  const [techStack, setTechStack] = useState(TECH_FALLBACK);

  // Background deferred synchronization with Firestore (runs only when browser is idle)
  useEffect(() => {
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (!apiKey || apiKey === "undefined" || apiKey === "placeholder") return;

    let unsubs = [];
    const schedule =
      typeof window !== "undefined" && window.requestIdleCallback
        ? window.requestIdleCallback
        : (cb) => setTimeout(cb, 1800);

    const idleId = schedule(async () => {
      try {
        const { subscribeDoc, subscribeCollection } = await import("../firebase/firestore");
        unsubs.push(
          subscribeDoc("hero_section", "main", (data) => data && setHeroRaw(data)),
          subscribeDoc("about_section", "main", (data) => data && setAboutRaw(data)),
          subscribeDoc("cta_section", "main", (data) => data && setCtaRaw(data)),
          subscribeDoc("contact_info", "main", (data) => data && setContactRaw(data)),
          subscribeDoc("settings", "main", (data) => data && setSettingsRaw(data)),
          subscribeCollection("services", (docs) => docs && docs.length > 0 && setServices(docs)),
          subscribeCollection("projects", (docs) => docs && docs.length > 0 && setProjects(docs.map(withLiveUrl))),
          subscribeCollection("process_steps", (docs) => docs && docs.length > 0 && setProcessSteps(docs)),
          subscribeCollection("tech_stack", (docs) => docs && docs.length > 0 && setTechStack(docs))
        );
      } catch (err) {
        // Fallback data is active and complete
      }
    });

    return () => {
      if (typeof window !== "undefined" && window.cancelIdleCallback && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      }
      unsubs.forEach((unsub) => typeof unsub === "function" && unsub());
    };
  }, []);

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
      hero: false,
      about: false,
      services: false,
      projects: false,
      process: false,
      techStack: false,
      cta: false,
      contact: false,
      settings: false,
    },
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
