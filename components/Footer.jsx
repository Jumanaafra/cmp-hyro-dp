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
            <p className="footer-desc">Building the next generation of AI-powered software. From vision systems to enterprise platforms.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4 className="footer-col-title">Company</h4>
              {["About", "Services", "Projects", "Careers"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
              ))}
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Products</h4>
              {["HyroVision AI", "HyroFlow", "HyroChat", "HyroScan"].map(l => (
                <a key={l} href="#products" className="footer-link">{l}</a>
              ))}
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Connect</h4>
              <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || "hello@hyrovision.ai"}`} className="footer-link">Email</a>
              <a href={import.meta.env.VITE_WHATSAPP_LINK || "https://wa.me/15551234567"} className="footer-link">WhatsApp</a>
              <a href="#" className="footer-link">LinkedIn</a>
              <a href="#" className="footer-link">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {currentYear} Hyro Vision. All rights reserved.</span>
          <span className="footer-made">Crafted with ⚡ by Hyro Vision</span>
        </div>
      </div>
    </footer>
  );
}
