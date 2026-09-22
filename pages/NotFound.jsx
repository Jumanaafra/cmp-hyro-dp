import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "../styles/pages.css";

import {
  LuHouse,
  LuCompass,
  LuBriefcase,
  LuCode,
  LuArrowLeft,
  LuSearch,
} from "react-icons/lu";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="404 — Page Not Found | Hyro Vision"
        description="The requested page could not be found on Hyro Vision."
      />
      <Navbar />

      <main className="page-shell" style={{ display: "flex", alignItems: "center", minHeight: "85vh" }}>
        <div className="page-bg-grid" />
        <div className="page-orb page-orb-1" />
        <div className="page-orb page-orb-2" />

        <div className="page-container page-container--narrow" style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "clamp(4.5rem, 10vw, 8rem)",
              fontWeight: 800,
              lineHeight: 1,
              background: "linear-gradient(135deg, var(--cyan) 0%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "12px",
            }}
          >
            404
          </div>

          <h1 className="page-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
            System Route Not Found
          </h1>

          <p className="page-subtitle" style={{ margin: "0 auto 32px" }}>
            The endpoint or resource you are attempting to access does not exist or may have been relocated.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
            <Link to="/" className="page-btn page-btn-primary">
              <LuHouse size={16} /> Return to Homepage
            </Link>
            <button onClick={() => navigate(-1)} className="page-btn page-btn-outline">
              <LuArrowLeft size={16} /> Go Back
            </button>
          </div>

          <div
            className="page-card"
            style={{
              textAlign: "left",
              padding: "28px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "16px" }}>
              Explore Other Destinations
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Link to="/services" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <LuCode color="var(--cyan)" size={15} /> All Services
              </Link>
              <Link to="/projects" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <LuCompass color="var(--cyan)" size={15} /> Project Portfolio
              </Link>
              <Link to="/careers" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <LuBriefcase color="var(--cyan)" size={15} /> Careers
              </Link>
              <Link to="/contact" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <LuSearch color="var(--cyan)" size={15} /> Contact Engineers
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
