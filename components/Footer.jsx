import { Link } from "react-router-dom";
import { company } from "../data/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-glow" />
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="hv-logo" style={{ marginBottom: "16px", textDecoration: "none" }}>
              <div className="hv-logo-mark">
                <img src="/assets/hyro-logo-mark.png" alt="Hyro Vision Logo" className="hv-logo-mark-img" />
              </div>
              <span className="hv-logo-text" style={{ color: "#ffffff" }}>Hyro <span>Vision</span></span>
            </Link>
            <p className="footer-desc">
              {company.positioning}
            </p>
            <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", color: "var(--text-dim, #64748b)" }}>
                Global B2B Engineering
              </span>
              <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: "999px", background: "rgba(20,184,166,0.1)", color: "var(--cyan, #14B8A6)" }}>
                Production-Grade Delivery
              </span>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4 className="footer-col-title">Navigation</h4>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/services" className="footer-link">All Services</Link>
              <Link to="/projects" className="footer-link">Portfolio</Link>
              <Link to="/careers" className="footer-link">Careers</Link>
              <Link to="/blog" className="footer-link">Engineering Blog</Link>
              <Link to="/faq" className="footer-link">FAQ</Link>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Solutions</h4>
              <Link to="/services/ai-autonomous-agents" className="footer-link">AI & Autonomous Agents</Link>
              <Link to="/services/enterprise-web-applications" className="footer-link">Enterprise Web Apps</Link>
              <Link to="/services/saas-platform-engineering" className="footer-link">SaaS Platforms</Link>
              <Link to="/services/cloud-devops-architecture" className="footer-link">Cloud & DevOps</Link>
              <Link to="/services/api-integrations-microservices" className="footer-link">API & Microservices</Link>
              <Link to="/services/iot-industrial-systems" className="footer-link">IoT & Edge Computing</Link>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Legal & Trust</h4>
              <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms & Conditions</Link>
              <Link to="/cookie-policy" className="footer-link">Cookie Policy</Link>
              <Link to="/refund-policy" className="footer-link">Refund & Cancellation</Link>
              <a href={`mailto:${company.contact.email}`} className="footer-link">
                Direct: {company.contact.email}
              </a>
              <a
                href={`https://wa.me/${company.contact.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                WhatsApp Inquiry
              </a>
              <Link to="/contact" className="footer-link" style={{ color: "var(--cyan, #14B8A6)", fontWeight: 600 }}>
                Start a Project →
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {currentYear} Hyro Vision. All rights reserved.</span>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "0.85rem" }}>
            <Link to="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>Privacy</Link>
            <Link to="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms</Link>
            <Link to="/cookie-policy" style={{ color: "inherit", textDecoration: "none" }}>Cookies</Link>
            <Link to="/refund-policy" style={{ color: "inherit", textDecoration: "none" }}>Refunds</Link>
          </div>
          <span className="footer-made">We Engineer Intelligent Digital Products.</span>
        </div>
      </div>
    </footer>
  );
}
