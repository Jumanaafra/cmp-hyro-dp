import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { faqs, faqCategories } from "../data/faq";
import "../styles/pages.css";

import {
  LuChevronDown,
  LuSearch,
  LuCircleHelp,
  LuArrowRight,
  LuMessageSquare,
} from "react-icons/lu";

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState(new Set(["gen-1"])); // First item open by default

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleItem = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCat =
        selectedCategory === "All" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);

      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.slice(0, 15).map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Frequently Asked Questions (FAQ) — Hyro Vision"
        description="Find answers to common questions about Hyro Vision's software engineering services, AI agents, architecture standards, pricing, and project workflows."
        schema={structuredSchema}
      />
      <Navbar />

      <main className="page-shell">
        <div className="page-bg-grid" />
        <div className="page-orb page-orb-1" />
        <div className="page-orb page-orb-2" />

        <div className="page-container page-container--narrow">
          {/* Breadcrumb */}
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-breadcrumb-sep">/</span>
            <span className="page-breadcrumb-current">FAQ</span>
          </nav>

          {/* Header */}
          <header className="page-header page-header--center">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Help & Answers
            </div>
            <h1 className="page-title">
              Frequently Asked <span>Questions</span>.
            </h1>
            <p className="page-subtitle">
              Everything you need to know about our engineering process, autonomous AI integrations, technical pricing tiers, and delivery standards.
            </p>
          </header>

          {/* Search bar */}
          <div style={{ position: "relative", marginBottom: "28px" }}>
            <LuSearch
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-dim)",
              }}
            />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "46px", borderRadius: "9999px" }}
            />
          </div>

          {/* Filter Categories */}
          <div className="filter-tabs" style={{ justifyContent: "center", marginBottom: "36px" }}>
            {faqCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${selectedCategory === cat ? "filter-tab--active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="page-card" style={{ textAlign: "center", padding: "48px 24px" }}>
              <div style={{ color: "var(--text-dim)", marginBottom: "12px" }}>
                <LuCircleHelp size={40} />
              </div>
              <h3 style={{ fontSize: "1.15rem", color: "var(--text-heading)", marginBottom: "8px" }}>
                No Matching Questions Found
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Try searching for a different keyword or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="page-btn page-btn-outline"
                style={{ marginTop: "16px" }}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="faq-accordion">
              {filteredFaqs.map((faq) => {
                const isOpen = openIds.has(faq.id);
                return (
                  <div key={faq.id} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                    <button
                      className="faq-trigger"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span className="page-chip" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>
                          {faq.category}
                        </span>
                        <span>{faq.question}</span>
                      </div>
                      <LuChevronDown className="faq-icon" />
                    </button>
                    {isOpen && (
                      <div className="faq-body">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Contact Support Banner */}
          <section className="page-cta-box" style={{ marginTop: "50px" }}>
            <h2 className="page-cta-title" style={{ fontSize: "1.8rem" }}>
              Have a Specific Technical Question?
            </h2>
            <p className="page-cta-desc">
              If your question isn't covered here, our engineers are happy to review your custom architecture requirements directly.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="page-btn page-btn-primary">
                Ask an Engineer <LuArrowRight />
              </Link>
              <Link to="/services" className="page-btn page-btn-outline">
                Explore Services
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
