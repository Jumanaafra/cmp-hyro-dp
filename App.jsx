import { useEffect, useRef } from "react";
import "./styles/global.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import HeroSection from "./sections/Hero";
import AboutSection from "./sections/About";
import ServicesSection from "./sections/Services";
import ProjectsSection from "./sections/Projects";
import ProcessSection from "./sections/Process";
import TechStackSection from "./sections/TechStack";
import CtaSection from "./sections/Cta";
import ContactSection from "./sections/Contact";

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
      <AIChatbot />
    </>
  );
}
