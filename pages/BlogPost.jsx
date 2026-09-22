import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blog";
import "../styles/pages.css";

import {
  LuClock,
  LuCalendar,
  LuArrowLeft,
  LuArrowRight,
  LuShare2,
  LuSearch,
  LuCheck,
} from "react-icons/lu";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = blogPosts.find((p) => p.slug === slug || p.id === slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="page-shell">
          <div className="page-container page-container--narrow" style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ color: "var(--cyan)", marginBottom: "16px" }}>
              <LuSearch size={48} />
            </div>
            <h1 className="page-title">Article Not Found</h1>
            <p className="page-subtitle" style={{ margin: "0 auto 24px" }}>
              The technical article you requested could not be located or may have been updated.
            </p>
            <Link to="/blog" className="page-btn page-btn-primary">
              <LuArrowLeft /> Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Find related posts
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && (post.relatedSlugs?.includes(p.slug) || post.relatedSlugs?.includes(p.id) || p.category === post.category))
    .slice(0, 2);

  const structuredSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedDate,
    "author": {
      "@type": "Organization",
      "name": "Hyro Vision",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hyro Vision",
      "url": "https://hyrovision.com",
    },
  };

  // Helper to format markdown-like content blocks safely
  const renderFormattedContent = (contentStr) => {
    const lines = contentStr.trim().split("\n");
    const elements = [];
    let inCodeBlock = false;
    let codeContent = [];
    let keyIdx = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={keyIdx++}
              style={{
                background: "var(--bg3, #141418)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "18px 20px",
                overflowX: "auto",
                fontSize: "0.875rem",
                color: "var(--cyan)",
                fontFamily: "monospace",
                lineHeight: "1.6",
                margin: "24px 0",
              }}
            >
              <code>{codeContent.join("\n")}</code>
            </pre>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        continue;
      }

      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={keyIdx++}
            style={{
              fontSize: "1.45rem",
              fontWeight: 700,
              color: "var(--text-heading)",
              marginTop: "32px",
              marginBottom: "12px",
              letterSpacing: "-0.01em",
            }}
          >
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("#### ")) {
        elements.push(
          <h4
            key={keyIdx++}
            style={{
              fontSize: "1.15rem",
              fontWeight: 600,
              color: "var(--cyan)",
              marginTop: "24px",
              marginBottom: "10px",
            }}
          >
            {line.replace("#### ", "")}
          </h4>
        );
      } else if (line.startsWith("---")) {
        elements.push(
          <hr
            key={keyIdx++}
            style={{ border: "none", borderTop: "1px solid var(--border)", margin: "32px 0" }}
          />
        );
      } else if (line.match(/^\d+\.\s/)) {
        elements.push(
          <p
            key={keyIdx++}
            style={{
              fontSize: "1rem",
              lineHeight: "1.75",
              color: "var(--text-muted)",
              marginBottom: "12px",
              paddingLeft: "12px",
            }}
          >
            {line}
          </p>
        );
      } else if (line.trim().length > 0) {
        elements.push(
          <p
            key={keyIdx++}
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.75",
              color: "var(--text-muted)",
              marginBottom: "18px",
            }}
          >
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <>
      <SEO
        title={`${post.title} — Hyro Vision`}
        description={post.excerpt}
        ogType="article"
        schema={structuredSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
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
            <Link to="/blog">Engineering Blog</Link>
            <span className="page-breadcrumb-sep">/</span>
            <span className="page-breadcrumb-current">{post.title.substring(0, 32)}...</span>
          </nav>

          {/* Article Header */}
          <header className="page-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
              <span className="page-chip" style={{ background: "rgba(var(--cyan-rgb), 0.1)", color: "var(--cyan)", borderColor: "rgba(var(--cyan-rgb), 0.3)" }}>
                {post.category}
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <LuCalendar size={13} /> {post.publishedDate}
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <LuClock size={13} /> {post.readTime}
              </span>
            </div>

            <h1 className="page-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              {post.title}
            </h1>
            <p className="page-subtitle" style={{ fontSize: "1.15rem" }}>
              {post.excerpt}
            </p>

            {/* Author bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
                marginTop: "28px",
                padding: "16px 20px",
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "contain", background: "rgba(255,255,255,0.05)" }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: "var(--text-heading)", fontSize: "0.95rem" }}>
                    {post.author.name}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                    {post.author.role}
                  </div>
                </div>
              </div>

              <div className="page-chip-list">
                {post.tags.map((t, idx) => (
                  <span key={idx} className="page-chip">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Article Hero Cover Image */}
          {post.image && (
            <div className="blog-post-hero-image-wrap">
              <img src={post.image} alt={post.title} className="blog-post-hero-img" />
              <div className="blog-post-hero-overlay" />
            </div>
          )}

          {/* Article Body */}
          <article className="legal-container" style={{ padding: "40px" }}>
            <div className="legal-prose">
              {renderFormattedContent(post.content)}
            </div>
          </article>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="page-block">
              <h2 className="page-block-title" style={{ fontSize: "1.5rem" }}>
                Related Engineering Articles
              </h2>
              <div className="page-grid-2">
                {relatedPosts.map((rel) => (
                  <div key={rel.id} className="page-card" style={{ padding: "24px" }}>
                    <span className="page-chip" style={{ fontSize: "0.75rem", marginBottom: "12px" }}>
                      {rel.category}
                    </span>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: "8px" }}>
                      <Link
                        to={`/blog/${rel.slug}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {rel.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "16px", lineHeight: "1.5" }}>
                      {rel.excerpt}
                    </p>
                    <Link
                      to={`/blog/${rel.slug}`}
                      style={{ fontSize: "0.85rem", color: "var(--cyan)", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      Read Now <LuArrowRight size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA Box */}
          <section className="page-cta-box">
            <h2 className="page-cta-title">Engineering High-Leverage Systems?</h2>
            <p className="page-cta-desc">
              Whether you need to deploy fault-tolerant AI routers, scale Next.js microservices, or configure cloud databases, our team is available for architectural consultations.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="page-btn page-btn-primary">
                Consult With Our Engineers <LuArrowRight />
              </Link>
              <Link to="/blog" className="page-btn page-btn-outline">
                <LuArrowLeft /> All Articles
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
