import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Products", id: "products" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Active section detection
      for (const { id } of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav ref={navRef} className={`hv-nav ${scrolled ? "hv-nav--scrolled" : ""}`}>
      <div className="hv-nav-inner">
        <a href="#" className="hv-logo" onClick={e => { e.preventDefault(); scrollTo("home"); }}>
          <div className="hv-logo-mark">H</div>
          <span className="hv-logo-text">Hyro <span>Vision</span></span>
        </a>
        <div className="hv-nav-links">
          {NAV_LINKS.map(({ label, id }) => (
            <button key={id} className={`hv-nav-a ${active === id ? "hv-nav-a--active" : ""}`} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </div>
        <a href="#contact" className="hv-nav-cta" onClick={e => { e.preventDefault(); scrollTo("contact"); }}>
          Get Started
        </a>
        <button className={`hamburger ${menuOpen ? "hamburger--open" : ""}`} onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        {NAV_LINKS.map(({ label, id }) => (
          <button key={id} className={`mobile-nav-a ${active === id ? "mobile-nav-a--active" : ""}`} onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
        <button className="mobile-cta" onClick={() => scrollTo("contact")}>Get Started →</button>
      </div>
    </nav>
  );
}
