import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Process", id: "process" },
  { label: "Tech Stack", id: "tech" },
  { label: "Contact", id: "contact" },
];

function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className={`hv-theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        /* Sun Icon */
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon Icon */
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (location.pathname === "/") {
        // Active section detection on home
        for (const { id } of [...NAV_LINKS].reverse()) {
          const el = document.getElementById(id);
          if (el && window.scrollY >= el.offsetTop - 120) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStartProject = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/contact");
    } else {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else navigate("/contact");
    }
  };

  return (
    <nav ref={navRef} className={`hv-nav ${scrolled ? "hv-nav--scrolled" : ""}`}>
      <div className="hv-nav-inner">
        <a href="/" className="hv-logo" onClick={handleLogoClick}>
          <div className="hv-logo-mark">
            <img src="/assets/hyro-logo-mark.png" alt="Hyro Vision Logo" className="hv-logo-mark-img" />
          </div>
          <span className="hv-logo-text">Hyro <span>Vision</span></span>
        </a>

        <div className="hv-nav-links">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              className={`hv-nav-a ${location.pathname === "/" && active === id ? "hv-nav-a--active" : ""}`}
              onClick={() => handleNavClick(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="hv-nav-actions">
          <ThemeToggle />
          <a
            href="/contact"
            className="hv-nav-cta"
            onClick={handleStartProject}
          >
            Start a Project
          </a>
          <button
            className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        {NAV_LINKS.map(({ label, id }) => (
          <button
            key={id}
            className={`mobile-nav-a ${location.pathname === "/" && active === id ? "mobile-nav-a--active" : ""}`}
            onClick={() => handleNavClick(id)}
          >
            {label}
          </button>
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "14px 24px", borderTop: "1px solid var(--border)" }}>
          <Link to="/about" className="mobile-nav-a" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/services" className="mobile-nav-a" onClick={() => setMenuOpen(false)}>All Services</Link>
          <Link to="/projects" className="mobile-nav-a" onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link to="/careers" className="mobile-nav-a" onClick={() => setMenuOpen(false)}>Careers</Link>
          <Link to="/blog" className="mobile-nav-a" onClick={() => setMenuOpen(false)}>Insights</Link>
          <Link to="/faq" className="mobile-nav-a" onClick={() => setMenuOpen(false)}>FAQ</Link>
        </div>
        <div className="mobile-menu-footer">
          <ThemeToggle className="mobile-theme-toggle" />
          <button className="mobile-cta" onClick={handleStartProject}>
            Start a Project →
          </button>
        </div>
      </div>
    </nav>
  );
}
