import { useEffect, useRef, lazy, Suspense } from "react";
import "./styles/global.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import HeroSection from "./sections/Hero";
import AboutSection from "./sections/About";
import ServicesSection from "./sections/Services";
import ProjectsSection from "./sections/Projects";
import ProcessSection from "./sections/Process";
import TechStackSection from "./sections/TechStack";
import CtaSection from "./sections/Cta";
import ContactSection from "./sections/Contact";

// Lazy-load floating chat widget so it does not block initial landing paint
const AIChatbot = lazy(() => import("./components/AIChatbot"));

/* ── Cursor spotlight ── */
function CursorSpotlight() {
  const spotRef = useRef(null);
  useEffect(() => {
    let sx = 0, sy = 0, tx = 0, ty = 0, rafId;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    const tick = () => {
      sx += (tx - sx) * 0.09;
      sy += (ty - sy) * 0.09;
      if (spotRef.current) {
        spotRef.current.style.left = sx + "px";
        spotRef.current.style.top = sy + "px";
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      style={{
        pointerEvents: "none",
        position: "fixed",
        zIndex: 0,
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(var(--cyan-rgb),0.045) 0%, transparent 70%)",
        transform: "translate(-50%,-50%)",
        transition: "opacity 0.3s",
      }}
    />
  );
}

export default function App() {
  return (
    <>
      <SEO
        title="Hyro Vision — Technology, AI & Digital Solutions"
        description="Hyro Vision develops custom web applications, AI-powered systems, and scalable digital solutions for modern businesses."
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />
      <CursorSpotlight />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <TechStackSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AIChatbot />
      </Suspense>
    </>
  );
}
