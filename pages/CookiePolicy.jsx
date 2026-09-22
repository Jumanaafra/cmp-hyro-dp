import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { legalConfig } from "../data/legal";
import "../styles/pages.css";

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Cookie Policy — Hyro Vision"
        description="Understand how Hyro Vision uses cookies and local storage tokens to optimize site functionality and user experience."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookie-policy" },
        ]}
      />
      <Navbar />

      <main className="page-shell">
        <div className="page-bg-grid" />
        <div className="page-orb page-orb-1" />

        <div className="page-container page-container--narrow">
          {/* Breadcrumb */}
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-breadcrumb-sep">/</span>
            <span className="page-breadcrumb-current">Cookie Policy</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Tracking Transparency
            </div>
            <h1 className="page-title">Cookie Policy</h1>
            <p className="page-subtitle">
              Clear information about how we use cookies, local storage, and telemetry to deliver a seamless web experience.
            </p>
          </header>

          <article className="legal-container">
            <div className="legal-meta">
              <span>Last Revised: <strong>{legalConfig.lastUpdated}</strong></span>
              <span>Entity: <strong>{legalConfig.legalEntityName}</strong></span>
              <span>Questions: <strong>{legalConfig.supportEmail}</strong></span>
            </div>

            <div className="legal-prose">
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your computer or mobile device by websites you visit. They are widely used to make websites work efficiently, remember your preferences, and provide aggregated reporting information.
              </p>

              <h2>2. How Hyro Vision Uses Cookies & Local Storage</h2>
              <p>
                We minimize our cookie footprint. We use cookies and browser <code>localStorage</code> only where strictly necessary or where they enhance your direct experience:
              </p>

              <h3>A. Strictly Essential Tokens</h3>
              <p>
                These are mandatory for core website security, theme persistence (dark mode vs. light mode preference), and cookie consent preferences. They do not store personally identifiable data.
              </p>

              <h3>B. Functional & Preference Storage</h3>
              <p>
                Remembers stateful UI interactions, such as your theme toggling choice (<code>hv_theme</code>) or chatbot state, so you don't have to reconfigure settings on every page load.
              </p>

              <h3>C. Performance & Anonymized Analytics</h3>
              <p>
                Helps us understand how visitors discover and navigate our website, page load times, and error rates, allowing our engineering team to continuously improve Core Web Vitals.
              </p>

              <h2>3. Cookie Inventory</h2>
              <div style={{ overflowX: "auto", margin: "20px 0" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--text)" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
                      <th style={{ padding: "10px" }}>Cookie / Key</th>
                      <th style={{ padding: "10px" }}>Purpose</th>
                      <th style={{ padding: "10px" }}>Type</th>
                      <th style={{ padding: "10px" }}>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      <td style={{ padding: "10px" }}><code>hv_theme</code></td>
                      <td style={{ padding: "10px" }}>Stores your selected Dark or Light color mode</td>
                      <td style={{ padding: "10px" }}>Essential</td>
                      <td style={{ padding: "10px" }}>1 Year</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      <td style={{ padding: "10px" }}><code>hv_cookie_consent</code></td>
                      <td style={{ padding: "10px" }}>Records your cookie preference choice</td>
                      <td style={{ padding: "10px" }}>Essential</td>
                      <td style={{ padding: "10px" }}>1 Year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>4. Managing and Disabling Cookies</h2>
              <p>
                You can configure or delete cookies through your web browser settings. Most browsers allow you to block third-party cookies or wipe stored cookies when closing the browser. Please note that disabling essential cookies may alter your theme preference and website appearance.
              </p>

              <h2>5. Contact Us</h2>
              <p>
                For further clarification about our cookie usage, reach out to our engineering support at <a href={`mailto:${legalConfig.supportEmail}`} style={{ color: "var(--cyan)" }}>{legalConfig.supportEmail}</a>.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
