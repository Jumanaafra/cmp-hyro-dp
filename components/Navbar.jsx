import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  LuHouse,
  LuUsers,
  LuLayers,
  LuBriefcase,
  LuUserPlus,
  LuBookOpen,
  LuCircleHelp,
  LuChevronDown,
  LuChevronRight,
  LuArrowUpRight,
  LuArrowRight,
  LuMail,
  LuMonitor,
  LuBrainCircuit,
  LuDatabase,
  LuCloud,
  LuCpu,
  LuSparkles,
  LuBuilding2,
  LuServer,
} from "react-icons/lu";

// Services Data for Desktop Mega Menu
const SERVICES_DATA = [
  {
    id: "fullstack-web",
    title: "Full-Stack Web Applications",
    desc: "Next.js, React, Node.js & high-performance APIs engineered for scale.",
    tag: "Web & Cloud",
    icon: LuMonitor,
    path: "/services/fullstack-web",
  },
  {
    id: "saas-enterprise",
    title: "Custom SaaS & Dashboards",
    desc: "Multi-tenant platforms, role-based access control, billing & live telemetry.",
    tag: "Enterprise",
    icon: LuLayers,
    path: "/services/saas-enterprise",
  },
  {
    id: "ai-integration",
    title: "AI Agents & Custom RAG Systems",
    desc: "Vector embeddings, autonomous workflows & multi-provider LLM fallbacks.",
    tag: "AI / RAG",
    icon: LuBrainCircuit,
    path: "/services/ai-integration",
  },
  {
    id: "backend-database",
    title: "Backend API & Database Architecture",
    desc: "High-concurrency microservices, PostgreSQL, Supabase, Redis & caching.",
    tag: "Scale",
    icon: LuDatabase,
    path: "/services/backend-database",
  },
  {
    id: "cloud-seo",
    title: "Cloud Deployment & Performance",
    desc: "Multi-region CDN edge hosting, zero-downtime CI/CD & Core Web Vitals.",
    tag: "DevOps",
    icon: LuCloud,
    path: "/services/cloud-seo",
  },
];

// Portfolio Data for Desktop Mega Menu
const FEATURED_PROJECTS = [
  {
    id: "hills-tourism",
    title: "HillsTourism",
    status: "Live",
    statusColor: "live",
    category: "Tourism / Travel Tech",
    desc: "Complete hill station booking platform with packages, resorts & fleet reservations.",
    path: "/projects/hills-tourism",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "super-d-hospital",
    title: "Super D Hospital",
    status: "Ongoing",
    statusColor: "ongoing",
    category: "Healthcare / MedTech",
    desc: "Enterprise hospital management platform for EMR, doctor scheduling & billing.",
    path: "/projects/super-d-hospital-management",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "happy-star",
    title: "Happy Star Satellite",
    status: "Live",
    statusColor: "live",
    category: "Commercial SaaS",
    desc: "Commercial business operations platform with automated payment workflows.",
    path: "/projects/happy-star-satellite-vision",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "bsmartglass",
    title: "BSmartGlass",
    status: "Live",
    statusColor: "live",
    category: "IoT & Hardware",
    desc: "Smart eyewear firmware & device telemetry synchronization system.",
    path: "/projects/bsmartglass",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
  },
];

// Company Data for Desktop Mega Menu
const COMPANY_ITEMS = [
  {
    title: "About Hyro Vision",
    desc: "Mission, engineering principles, leadership & global team.",
    path: "/about",
    icon: LuUsers,
  },
  {
    title: "Careers",
    desc: "Open engineering roles across Full-Stack, AI & Cloud.",
    path: "/careers",
    badge: "Hiring",
    icon: LuUserPlus,
  },
  {
    title: "Engineering Blog",
    desc: "Deep-dives into LLM fallbacks, WebSockets & architecture.",
    path: "/blog",
    badge: "New",
    icon: LuBookOpen,
  },
  {
    title: "FAQ & Delivery Model",
    desc: "Agile sprints, IP ownership, pricing models & client SLAs.",
    path: "/faq",
    icon: LuCircleHelp,
  },
];

// Clean, Uncluttered Mobile Navigation List
const MOBILE_NAV_ITEMS = [
  { label: "Home", path: "/", icon: LuHouse, desc: "Main Portal & Capabilities" },
  { label: "Services", path: "/services", icon: LuLayers, desc: "AI, Cloud & Full-Stack Practices" },
  { label: "Portfolio", path: "/projects", icon: LuBriefcase, desc: "Production Case Studies (10+)" },
  { label: "About Us", path: "/about", icon: LuUsers, desc: "Mission, Principles & Team" },
  { label: "Careers", path: "/careers", icon: LuUserPlus, desc: "Open Engineering Squad Roles", badge: "Hiring" },
  { label: "Engineering Blog", path: "/blog", icon: LuBookOpen, desc: "Tech Insights & AI Systems", badge: "New" },
  { label: "FAQ & Delivery", path: "/faq", icon: LuCircleHelp, desc: "Pricing, Sprints & SLAs" },
  { label: "Contact Us", path: "/contact", icon: LuMail, desc: "Start a Project or Consultation" },
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
  const [activeMega, setActiveMega] = useState(null); // 'services' | 'portfolio' | 'company' | null
  const [menuOpen, setMenuOpen] = useState(false); // Mobile drawer open

  const leaveTimerRef = useRef(null);

  // Detect scroll for compact navbar style
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMega(null);
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Handle outside clicks and Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveMega(null);
        setMenuOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMega(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Desktop Hover Handlers with Debounce
  const handleNavTriggerEnter = (key) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setActiveMega(key);
  };

  const handleNavTriggerLeave = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 180);
  };

  const handlePanelEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const handlePanelLeave = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 180);
  };

  // Nav Click Helpers
  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveMega(null);
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHomeClick = () => {
    setActiveMega(null);
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleItemNavigate = (path, isAnchor, anchorId) => {
    setActiveMega(null);
    setMenuOpen(false);
    if (isAnchor && anchorId) {
      if (location.pathname !== "/") {
        navigate(`/#${anchorId}`);
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartProject = (e) => {
    e.preventDefault();
    setActiveMega(null);
    setMenuOpen(false);
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isServicesActive = location.pathname.startsWith("/services");
  const isPortfolioActive = location.pathname.startsWith("/projects");
  const isCompanyActive =
    location.pathname === "/about" ||
    location.pathname.startsWith("/careers") ||
    location.pathname.startsWith("/blog") ||
    location.pathname === "/faq";
  const isContactActive = location.pathname === "/contact";
  const isHomeActive = location.pathname === "/" && !location.hash;

  const isMobileActive = (item) => {
    if (item.path === "/") {
      return location.pathname === "/" && !location.hash;
    }
    if (item.isAnchor) {
      return location.pathname === "/" && location.hash === `#${item.anchorId}`;
    }
    return location.pathname === item.path || location.pathname.startsWith(item.path + "/");
  };

  return (
    <nav ref={navRef} className={`hv-nav ${scrolled ? "hv-nav--scrolled" : ""}`}>
      {/* ── Top Pill Bar ── */}
      <div className="hv-nav-inner">
        {/* Brand Logo */}
        <a href="/" className="hv-logo" onClick={handleLogoClick} aria-label="Hyro Vision Home">
          <div className="hv-logo-mark">
            <img src="/assets/hyro-logo-mark.png" alt="Hyro Vision Logo" className="hv-logo-mark-img" />
          </div>
          <span className="hv-logo-text">
            Hyro <span>Vision</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hv-nav-links" role="menubar">
          {/* Home */}
          <button
            type="button"
            className={`hv-nav-a ${isHomeActive ? "hv-nav-a--active" : ""}`}
            onClick={handleHomeClick}
            onMouseEnter={() => handleNavTriggerEnter(null)}
          >
            Home
          </button>

          {/* Services Trigger */}
          <div
            className="hv-nav-item-wrapper"
            onMouseEnter={() => handleNavTriggerEnter("services")}
            onMouseLeave={handleNavTriggerLeave}
          >
            <button
              type="button"
              className={`hv-nav-a hv-nav-a--has-mega ${isServicesActive ? "hv-nav-a--active" : ""} ${activeMega === "services" ? "hv-nav-a--open" : ""}`}
              onClick={() => handleItemNavigate("/services")}
              aria-expanded={activeMega === "services"}
              aria-haspopup="true"
            >
              <span>Services</span>
              <LuChevronDown className="hv-nav-chevron" size={14} />
            </button>
          </div>

          {/* Portfolio Trigger */}
          <div
            className="hv-nav-item-wrapper"
            onMouseEnter={() => handleNavTriggerEnter("portfolio")}
            onMouseLeave={handleNavTriggerLeave}
          >
            <button
              type="button"
              className={`hv-nav-a hv-nav-a--has-mega ${isPortfolioActive ? "hv-nav-a--active" : ""} ${activeMega === "portfolio" ? "hv-nav-a--open" : ""}`}
              onClick={() => handleItemNavigate("/projects")}
              aria-expanded={activeMega === "portfolio"}
              aria-haspopup="true"
            >
              <span>Portfolio</span>
              <LuChevronDown className="hv-nav-chevron" size={14} />
            </button>
          </div>

          {/* Company Trigger */}
          <div
            className="hv-nav-item-wrapper"
            onMouseEnter={() => handleNavTriggerEnter("company")}
            onMouseLeave={handleNavTriggerLeave}
          >
            <button
              type="button"
              className={`hv-nav-a hv-nav-a--has-mega ${isCompanyActive ? "hv-nav-a--active" : ""} ${activeMega === "company" ? "hv-nav-a--open" : ""}`}
              onClick={() => handleItemNavigate("/about")}
              aria-expanded={activeMega === "company"}
              aria-haspopup="true"
            >
              <span>Company</span>
              <LuChevronDown className="hv-nav-chevron" size={14} />
            </button>
          </div>

          {/* Contact */}
          <button
            type="button"
            className={`hv-nav-a ${isContactActive ? "hv-nav-a--active" : ""}`}
            onClick={() => handleItemNavigate("/contact")}
            onMouseEnter={() => handleNavTriggerEnter(null)}
          >
            Contact
          </button>
        </div>

        {/* Right Actions */}
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
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════
          DESKTOP MEGA MENUS (Slide & Fade Dropdowns)
          ═════════════════════════════════════════════════════════ */}

      {/* ── 1. SERVICES MEGA MENU ── */}
      {activeMega === "services" && (
        <div
          className="hv-mega-panel hv-mega-panel--services"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}
          role="region"
          aria-label="Services Mega Navigation"
        >
          <div className="hv-mega-header">
            <div className="hv-mega-tag">
              <LuLayers size={13} />
              <span>Core Engineering Practices</span>
            </div>
            <button
              className="hv-mega-view-all"
              onClick={() => handleItemNavigate("/services")}
            >
              <span>Explore All 5 Services</span>
              <LuArrowRight size={13} />
            </button>
          </div>

          <div className="hv-mega-body hv-mega-body--services">
            {/* Left 5 Service Cards Grid */}
            <div className="hv-mega-services-grid">
              {SERVICES_DATA.map((srv) => {
                const Icon = srv.icon;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    className="hv-mega-service-card"
                    onClick={() => handleItemNavigate(srv.path)}
                  >
                    <div className="hv-mega-card-icon">
                      <Icon size={18} />
                    </div>
                    <div className="hv-mega-card-body">
                      <div className="hv-mega-card-top">
                        <span className="hv-mega-card-title">{srv.title}</span>
                        <span className="hv-mega-pill">{srv.tag}</span>
                      </div>
                      <p className="hv-mega-card-desc">{srv.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Side Capability Highlight */}
            <div className="hv-mega-spotlight">
              <div className="hv-spotlight-badge">
                <LuSparkles size={13} />
                <span>ARCHITECTURE FOCUS</span>
              </div>
              <h4 className="hv-spotlight-title">Multi-Provider AI &amp; RAG Systems</h4>
              <p className="hv-spotlight-desc">
                Production-grade generative AI orchestration with zero-downtime multi-provider fallbacks (Groq + Gemini) and low-latency vector search.
              </p>
              <div className="hv-spotlight-tags">
                <span>LangChain</span>
                <span>Groq Llama 3</span>
                <span>Gemini Flash</span>
                <span>ChromaDB</span>
              </div>
              <button
                className="hv-spotlight-cta"
                onClick={() => handleItemNavigate("/services/ai-integration")}
              >
                <span>Read AI Architecture Spec</span>
                <LuArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. PORTFOLIO MEGA MENU ── */}
      {activeMega === "portfolio" && (
        <div
          className="hv-mega-panel hv-mega-panel--portfolio"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}
          role="region"
          aria-label="Portfolio Mega Navigation"
        >
          <div className="hv-mega-header">
            <div className="hv-mega-tag">
              <LuBriefcase size={13} />
              <span>Production Systems &amp; Case Studies</span>
            </div>
            <button
              className="hv-mega-view-all"
              onClick={() => handleItemNavigate("/projects")}
            >
              <span>Browse All 10+ Projects</span>
              <LuArrowRight size={13} />
            </button>
          </div>

          <div className="hv-mega-body hv-mega-body--portfolio">
            {/* 4 Featured Projects Grid */}
            <div className="hv-mega-projects-grid">
              {FEATURED_PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  className="hv-mega-project-card"
                  onClick={() => handleItemNavigate(proj.path)}
                >
                  <div className="hv-mega-project-thumb-wrap">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="hv-mega-project-thumb"
                      loading="lazy"
                    />
                    <span className={`hv-mega-status-badge hv-mega-status-badge--${proj.statusColor}`}>
                      {proj.status}
                    </span>
                  </div>
                  <div className="hv-mega-project-info">
                    <span className="hv-mega-project-cat">{proj.category}</span>
                    <h4 className="hv-mega-project-title">{proj.title}</h4>
                    <p className="hv-mega-project-desc">{proj.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Portfolio Capability Banner */}
            <div className="hv-mega-spotlight hv-mega-spotlight--portfolio">
              <div className="hv-spotlight-badge">
                <LuBuilding2 size={13} />
                <span>DELIVERY TRACK RECORD</span>
              </div>
              <h4 className="hv-spotlight-title">10+ Systems Delivered Globally</h4>
              <p className="hv-spotlight-desc">
                From high-availability tourism booking systems to hospital EMR suites and IoT telemetry for clients across UK, US, and international markets.
              </p>
              <div className="hv-spotlight-metrics">
                <div className="hv-spotlight-metric">
                  <strong>100%</strong>
                  <span>On-Time Cutover</span>
                </div>
                <div className="hv-spotlight-metric">
                  <strong>99.9%</strong>
                  <span>Target SLA Uptime</span>
                </div>
              </div>
              <button
                className="hv-spotlight-cta"
                onClick={() => handleItemNavigate("/projects")}
              >
                <span>View Full Case Catalog</span>
                <LuArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. COMPANY MEGA MENU ── */}
      {activeMega === "company" && (
        <div
          className="hv-mega-panel hv-mega-panel--company"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}
          role="region"
          aria-label="Company Mega Navigation"
        >
          <div className="hv-mega-header">
            <div className="hv-mega-tag">
              <LuBuilding2 size={13} />
              <span>Company, Culture &amp; Technical Insights</span>
            </div>
            <button
              className="hv-mega-view-all"
              onClick={() => handleItemNavigate("/about")}
            >
              <span>About Hyro Vision</span>
              <LuArrowRight size={13} />
            </button>
          </div>

          <div className="hv-mega-body hv-mega-body--company">
            {/* 6 Company Links Grid */}
            <div className="hv-mega-company-grid">
              {COMPANY_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    type="button"
                    className="hv-mega-company-card"
                    onClick={() => handleItemNavigate(item.path, item.isAnchor, item.anchorId)}
                  >
                    <div className="hv-mega-card-icon">
                      <Icon size={18} />
                    </div>
                    <div className="hv-mega-card-body">
                      <div className="hv-mega-card-top">
                        <span className="hv-mega-card-title">{item.title}</span>
                        {item.badge && (
                          <span className={`hv-mega-badge hv-mega-badge--${item.badge.toLowerCase()}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="hv-mega-card-desc">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Side Direct Contact Spotlight */}
            <div className="hv-mega-spotlight hv-mega-spotlight--company">
              <div className="hv-spotlight-badge">
                <LuMail size={13} />
                <span>EXECUTIVE CONTACT</span>
              </div>
              <h4 className="hv-spotlight-title">Direct Engineering Partnership</h4>
              <p className="hv-spotlight-desc">
                Speak directly with senior software architects. Rapid assessment and scoped architectural roadmap within 24 hours.
              </p>
              <div className="hv-mega-contact-row">
                <span className="hv-mega-contact-label">Technical Inquiries:</span>
                <a href="mailto:info@hyrovision.com" className="hv-mega-contact-email">
                  info@hyrovision.com
                </a>
              </div>
              <button
                className="hv-spotlight-cta"
                onClick={() => handleItemNavigate("/contact")}
              >
                <span>Schedule Architecture Call</span>
                <LuArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════
          CLEAN MOBILE MENU DRAWER (Uncluttered, Single-Level)
          ═════════════════════════════════════════════════════════ */}
      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-tag">HYRO NAVIGATION</span>
          <div className="mobile-menu-badge">
            <span className="pulse-dot" />
            <span>Available for Projects</span>
          </div>
        </div>

        <nav className="mobile-nav-list" aria-label="Mobile Navigation Links">
          {MOBILE_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const itemActive = isMobileActive(item);
            return (
              <button
                key={item.label}
                type="button"
                className={`mobile-nav-item ${itemActive ? "mobile-nav-item--active" : ""}`}
                onClick={() => handleItemNavigate(item.path, item.isAnchor, item.anchorId)}
              >
                <div className="mobile-nav-item-icon">
                  <Icon size={17} />
                </div>
                <div className="mobile-nav-item-body">
                  <div className="mobile-nav-item-title-row">
                    <span className="mobile-nav-item-title">{item.label}</span>
                    {item.badge && (
                      <span className={`mobile-nav-badge ${item.badge === "Hiring" ? "mobile-nav-badge--hiring" : "mobile-nav-badge--new"}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="mobile-nav-item-desc">{item.desc}</span>
                </div>
                <div className="mobile-nav-item-arrow">
                  <LuChevronRight size={16} />
                </div>
              </button>
            );
          })}
        </nav>

        <div className="mobile-menu-divider" />

        <div className="mobile-menu-footer">
          <ThemeToggle className="mobile-theme-toggle" />
          <button className="mobile-cta" onClick={handleStartProject}>
            <span>Start a Project</span>
            <LuArrowUpRight size={17} />
          </button>
        </div>

        <div className="mobile-menu-contact-bar">
          <a href="mailto:info@hyrovision.com" className="mobile-menu-email">
            <LuMail size={13} />
            <span>info@hyrovision.com</span>
          </a>
          <span className="mobile-menu-sep">•</span>
          <span className="mobile-menu-loc">UK &amp; Remote Global</span>
        </div>
      </div>
    </nav>
  );
}
