import { company } from "../data/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-glow" />
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="hv-logo" style={{ marginBottom: "16px" }}>
              <div className="hv-logo-mark">H</div>
              <span className="hv-logo-text">Hyro <span>Vision</span></span>
            </div>
            <p className="footer-desc">
              {company.positioning}
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4 className="footer-col-title">Navigation</h4>
              <a href="#home" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#services" className="footer-link">Services</a>
              <a href="#projects" className="footer-link">Projects</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Expertise</h4>
              <a href="#services" className="footer-link">Full-Stack Development</a>
              <a href="#services" className="footer-link">AI & Autonomous Agents</a>
              <a href="#services" className="footer-link">SaaS & Enterprise Systems</a>
              <a href="#tech" className="footer-link">Technology Universe</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Direct Connect</h4>
              <a href={`mailto:${company.contact.email}`} className="footer-link">
                {company.contact.email}
              </a>
              <a
                href={`https://wa.me/${company.contact.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                WhatsApp Inquiry
              </a>
              <a href="#contact" className="footer-link">Start a Project</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {currentYear} HyroVision. All rights reserved.</span>
          <span className="footer-made">We Engineer Intelligent Digital Products.</span>
        </div>
      </div>
    </footer>
  );
}
