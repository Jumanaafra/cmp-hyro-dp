import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { blogPosts, blogCategories } from "../data/blog";
import "../styles/pages.css";

import {
  LuBookOpen,
  LuClock,
  LuCalendar,
  LuArrowRight,
  LuSearch,
  LuLayers,
} from "react-icons/lu";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Hyro Vision Engineering Insights",
    "description": "Technical insights on autonomous AI agents, enterprise SaaS scalability, RAG systems, and modern full-stack development.",
    "publisher": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "url": "https://hyrovision.com",
    },
  };

  return (
    <>
      <SEO
        title="Engineering Insights & Technical Articles — Hyro Vision"
        description="Deep dives into multi-provider LLM fallbacks, enterprise SaaS multi-tenancy, grounded RAG vector pipelines, and IoT architectures."
        schema={structuredSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <Navbar />

      <main className="page-shell">
        <div className="page-bg-grid" />
        <div className="page-orb page-orb-1" />
        <div className="page-orb page-orb-2" />

        <div className="page-container">
          {/* Breadcrumb */}
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-breadcrumb-sep">/</span>
            <span className="page-breadcrumb-current">Engineering Blog</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Technical Dispatches
            </div>
            <h1 className="page-title">
              Engineering Insights & <span>Architectural Deep Dives</span>.
            </h1>
            <p className="page-subtitle">
              Field notes, architecture teardowns, and design patterns from our engineering team building high-performance digital systems and AI infrastructure.
            </p>
          </header>

          {/* Filter and Search Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div className="filter-tabs" style={{ margin: 0 }}>
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab ${selectedCategory === cat ? "filter-tab--active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ position: "relative", minWidth: "260px" }}>
              <LuSearch
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-dim)",
                }}
              />
              <input
                type="text"
                placeholder="Search articles or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "40px", borderRadius: "9999px" }}
              />
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="page-card" style={{ textAlign: "center", padding: "60px 24px" }}>
              <div style={{ color: "var(--text-dim)", marginBottom: "14px" }}>
                <LuLayers size={40} />
              </div>
              <h3 style={{ fontSize: "1.2rem", color: "var(--text-heading)", marginBottom: "8px" }}>
                No Articles Found
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Try adjusting your search query or selecting a different category tab.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="page-btn page-btn-outline"
                style={{ marginTop: "16px" }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="page-grid-2" style={{ gap: "32px" }}>
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="page-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "32px",
                  }}
                >
                  <div>
                    <div className="blog-card-media">
                      <img
                        src={post.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"}
                        alt={post.title}
                        className="blog-card-img"
                        loading="lazy"
                      />
                      <div className="blog-card-overlay" />
                      <div className="blog-card-badge">
                        <span className="page-chip" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "var(--cyan)", borderColor: "rgba(var(--cyan-rgb), 0.35)" }}>
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.825rem", color: "var(--text-dim)", marginBottom: "12px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <LuCalendar size={13} /> {post.publishedDate}
                      </span>
                      <span>•</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <LuClock size={13} /> {post.readTime}
                      </span>
                    </div>

                    <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-heading)", lineHeight: "1.3", marginBottom: "12px" }}>
                      <Link
                        to={`/blog/${post.slug}`}
                        style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="page-card-desc" style={{ marginBottom: "20px" }}>
                      {post.excerpt}
                    </p>

                    <div className="page-chip-list" style={{ marginBottom: "20px" }}>
                      {post.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="page-chip" style={{ fontSize: "0.75rem" }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      paddingTop: "16px",
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "contain", background: "rgba(255,255,255,0.05)" }}
                      />
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{post.author.name}</span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="page-btn page-btn-ghost"
                      style={{ padding: "6px 12px", fontSize: "0.875rem", color: "var(--cyan)" }}
                    >
                      Read Article <LuArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Newsletter / RSS Box */}
          <section className="page-cta-box">
            <h2 className="page-cta-title">Engineering Knowledge, Delivered Pragmatically</h2>
            <p className="page-cta-desc">
              Have questions about implementing multi-provider AI agents, custom vector memory, or scalable SaaS database partitions?
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="page-btn page-btn-primary">
                Consult With Our Engineers <LuArrowRight />
              </Link>
              <Link to="/services" className="page-btn page-btn-outline">
                Explore Engineering Services
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
