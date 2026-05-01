import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// Lazy section imports
import HeroAdmin from "./sections/HeroAdmin";
import AboutAdmin from "./sections/AboutAdmin";
import ServicesAdmin from "./sections/ServicesAdmin";
import ProductsAdmin from "./sections/ProductsAdmin";
import ProjectsAdmin from "./sections/ProjectsAdmin";
import ProcessAdmin from "./sections/ProcessAdmin";
import PricingAdmin from "./sections/PricingAdmin";
import TechStackAdmin from "./sections/TechStackAdmin";
import TestimonialsAdmin from "./sections/TestimonialsAdmin";
import CtaAdmin from "./sections/CtaAdmin";
import ContactAdmin from "./sections/ContactAdmin";
import ContactSubmissionsAdmin from "./sections/ContactSubmissionsAdmin";
import SettingsAdmin from "./sections/SettingsAdmin";

const NAV = [
  { group: "Sections", items: [
    { id: "hero", label: "Hero", icon: "🏠" },
    { id: "about", label: "About", icon: "ℹ️" },
    { id: "services", label: "Services", icon: "⚙️" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "projects", label: "Projects", icon: "🗂️" },
    { id: "process", label: "Process", icon: "📐" },
    { id: "pricing", label: "Pricing", icon: "💰" },
    { id: "techstack", label: "Tech Stack", icon: "🛠️" },
    { id: "testimonials", label: "Testimonials", icon: "⭐" },
    { id: "cta", label: "CTA", icon: "📣" },
    { id: "contact", label: "Contact Info", icon: "📞" },
  ]},
  { group: "Management", items: [
    { id: "submissions", label: "Contact Submissions", icon: "📨" },
    { id: "settings", label: "Settings", icon: "🔧" },
  ]},
];

const SECTION_MAP = {
  hero: HeroAdmin,
  about: AboutAdmin,
  services: ServicesAdmin,
  products: ProductsAdmin,
  projects: ProjectsAdmin,
  process: ProcessAdmin,
  pricing: PricingAdmin,
  techstack: TechStackAdmin,
  testimonials: TestimonialsAdmin,
  cta: CtaAdmin,
  contact: ContactAdmin,
  submissions: ContactSubmissionsAdmin,
  settings: SettingsAdmin,
};

export default function AdminDashboard({ user }) {
  const [active, setActive] = useState("hero");

  const handleLogout = async () => {
    await signOut(auth);
  };

  const ActiveSection = SECTION_MAP[active] || HeroAdmin;
  const allItems = NAV.flatMap(g => g.items);
  const activeItem = allItems.find(i => i.id === active);

  return (
    <div className="admin-shell">
      <div className="admin-layout">
        {/* ── Sidebar ── */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-logo">
            <div className="admin-sidebar-logo-mark">H</div>
            <div>
              <div className="admin-sidebar-title">Hyro Vision</div>
              <div className="admin-sidebar-sub">Admin Panel</div>
            </div>
          </div>

          <nav className="admin-nav">
            {NAV.map(({ group, items }) => (
              <div key={group}>
                <div className="admin-nav-section">{group}</div>
                {items.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    className={`admin-nav-item ${active === id ? "active" : ""}`}
                    onClick={() => setActive(id)}
                    id={`admin-nav-${id}`}
                  >
                    <span className="admin-nav-icon">{icon}</span>
                    {label}
                  </button>
                ))}
                <div className="admin-divider" />
              </div>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-user-info">
              <div className="admin-avatar">
                {(user.email?.[0] || "A").toUpperCase()}
              </div>
              <div className="admin-user-email">{user.email}</div>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout} id="admin-logout">
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="admin-main">
          <div className="admin-topbar">
            <div className="admin-topbar-title">
              {activeItem?.icon} {activeItem?.label}
            </div>
            <div className="admin-topbar-badge">
              <div className="admin-topbar-dot" />
              Live Sync Active
            </div>
          </div>
          <div className="admin-content">
            <ActiveSection />
          </div>
        </main>
      </div>
    </div>
  );
}
