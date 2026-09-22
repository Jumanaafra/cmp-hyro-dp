import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { legalConfig } from "../data/legal";
import "../styles/pages.css";

import { LuShieldCheck, LuLock, LuUserCheck, LuMail } from "react-icons/lu";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Privacy Policy — Hyro Vision"
        description="Learn how Hyro Vision collects, protects, and handles your data when you visit our website or engage our engineering services."
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
            <span className="page-breadcrumb-current">Privacy Policy</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Compliance & Data Protection
            </div>
            <h1 className="page-title">Privacy Policy</h1>
            <p className="page-subtitle">
              Your privacy and intellectual property are paramount. This policy outlines how Hyro Vision collects, processes, and safeguards information.
            </p>
          </header>

          <article className="legal-container">
            <div className="legal-meta">
              <span>Last Revised: <strong>{legalConfig.lastUpdated}</strong></span>
              <span>Entity: <strong>{legalConfig.legalEntityName}</strong></span>
              <span>Contact: <strong>{legalConfig.supportEmail}</strong></span>
            </div>

            <div className="legal-prose">
              <div className="legal-highlight-box">
                <strong>Executive Summary:</strong> We strictly collect information necessary to respond to your technical inquiries, scope custom software projects, and maintain application stability. We do not sell, rent, or monetize your personal data.
              </div>

              <h2>1. Information We Collect</h2>
              <p>
                When you interact with the Hyro Vision website ({legalConfig.websiteUrl}) or engage our engineering services, we may collect:
              </p>
              <ul>
                <li><strong>Direct Inquiries:</strong> Your full name, work email address, company name, phone/WhatsApp number, project budget range, and technical requirements provided via our Contact or Career application forms.</li>
                <li><strong>Technical Telemetry:</strong> Anonymized server logs, browser user-agent, IP address, device type, referring URLs, and general geographic region to ensure system security and optimize load performance.</li>
                <li><strong>Client Communications:</strong> Emails, shared specifications, architecture diagrams, and meeting transcripts shared during technical discovery.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We process collected data exclusively for legitimate engineering and business purposes, including:</p>
              <ul>
                <li>Scoping, estimating, and architecting custom digital products and software services requested by you.</li>
                <li>Delivering agreed technical sprints, API integrations, and code deliverables.</li>
                <li>Communicating project updates, system milestones, and administrative notifications.</li>
                <li>Maintaining the security, performance, and fraud-resistance of our web applications.</li>
                <li>Evaluating prospective applicants for open engineering positions.</li>
              </ul>

              <h2>3. Data Protection & Security Standards</h2>
              <p>
                We employ industry-standard technical and organizational security controls to protect information from unauthorized access, alteration, or disclosure:
              </p>
              <ul>
                <li>All traffic between your browser and our servers is encrypted using modern TLS (HTTPS) certificates.</li>
                <li>Restricted access controls: Only authorized engineering personnel with direct project responsibilities have access to scoping data.</li>
                <li>Third-party databases (Firebase / Supabase) are secured with parameterized queries, encrypted storage at rest, and strict firewall rules.</li>
              </ul>

              <h2>4. Third-Party Service Providers</h2>
              <p>
                We may share minimal data with trusted third-party infrastructure vendors who adhere to strict data security standards:
              </p>
              <ul>
                <li><strong>Hosting & Edge Delivery:</strong> Vercel and Netlify (CDN edge delivery and compute runtime).</li>
                <li><strong>Database & Backend:</strong> Google Cloud / Firebase and Supabase (secure data persistence).</li>
                <li><strong>Analytics:</strong> Aggregated, privacy-respecting website analytics to evaluate traffic flow without intrusive cross-site tracking.</li>
              </ul>

              <h2>5. Your Rights & Data Choices</h2>
              <p>
                Regardless of your location, we respect your rights regarding your personal information:
              </p>
              <ul>
                <li><strong>Access & Portability:</strong> You may request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You may request corrections to any inaccurate or incomplete details.</li>
                <li><strong>Erasure:</strong> You may request the complete deletion of your contact records from our active databases, subject to legal record-keeping obligations.</li>
              </ul>

              <h2>6. Contact Our Privacy Lead</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to exercise any of your data rights, please contact our team directly:
              </p>
              <div style={{ marginTop: "16px", padding: "16px 20px", background: "var(--input-bg)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <div><strong>Hyro Vision Privacy Team</strong></div>
                <div>Email: <a href={`mailto:${legalConfig.supportEmail}`} style={{ color: "var(--cyan)" }}>{legalConfig.supportEmail}</a></div>
                <div>Address: {legalConfig.registeredAddress}</div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
