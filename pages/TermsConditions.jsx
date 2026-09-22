import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { legalConfig } from "../data/legal";
import "../styles/pages.css";

export default function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Terms & Conditions — Hyro Vision"
        description="Review the terms and conditions governing the use of Hyro Vision's website and commercial software engineering engagements."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms-and-conditions" },
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
            <span className="page-breadcrumb-current">Terms & Conditions</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Legal Agreement
            </div>
            <h1 className="page-title">Terms & Conditions</h1>
            <p className="page-subtitle">
              These terms outline the operational guidelines, project milestones, and intellectual property rights governing our services.
            </p>
          </header>

          <article className="legal-container">
            <div className="legal-meta">
              <span>Effective Date: <strong>{legalConfig.lastUpdated}</strong></span>
              <span>Entity: <strong>{legalConfig.legalEntityName}</strong></span>
              <span>Inquiries: <strong>{legalConfig.supportEmail}</strong></span>
            </div>

            <div className="legal-prose">
              <div className="legal-highlight-box">
                By accessing this website ({legalConfig.websiteUrl}) or signing a Statement of Work (SOW) with Hyro Vision, you agree to be bound by these Terms and Conditions.
              </div>

              <h2>1. Scope of Engineering Services</h2>
              <p>
                Hyro Vision provides custom digital engineering, software architecture, full-stack application development, SaaS platform building, AI agent workflows, and cloud infrastructure deployment. Specific deliverables, sprint schedules, and pricing are defined in individual project Statements of Work (SOW) or written service agreements.
              </p>

              <h2>2. Intellectual Property & Code Ownership</h2>
              <p>
                We believe in full ownership for our clients:
              </p>
              <ul>
                <li><strong>Custom Project Deliverables:</strong> Upon full and final settlement of all agreed milestone payments, all bespoke source code, frontend assets, database schemas, and documentation created specifically for the client are assigned to and become the exclusive property of the client.</li>
                <li><strong>Pre-existing Hyro Vision Tools & Libraries:</strong> Any proprietary internal libraries, boilerplate templates, or foundational scripts incorporated into the project remain the intellectual property of Hyro Vision, and the client is granted a perpetual, non-exclusive, royalty-free license to use and modify them for the project's operation.</li>
              </ul>

              <h2>3. Client Responsibilities & Collaboration</h2>
              <p>
                Successful software delivery requires active collaboration. Clients agree to:
              </p>
              <ul>
                <li>Provide timely access to necessary third-party API credentials, assets, and design specifications.</li>
                <li>Participate in milestone review cycles and provide acceptance feedback within the agreed review window (typically 5 business days).</li>
                <li>Designate a primary technical or product contact to make authoritative sprint decisions.</li>
              </ul>

              <h2>4. Milestone Billing & Payments</h2>
              <p>
                Engineering engagements are structured around clear sprint milestones. Invoices are issued upon milestone commencement or milestone completion as outlined in the individual contract. Payment terms are net 15 days unless otherwise specified in writing.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Hyro Vision and its engineers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, or operational interruption resulting from the deployment, use, or inability to use delivered software systems.
              </p>

              <h2>6. Defect Remediation & Warranty</h2>
              <p>
                We stand behind our code. Hyro Vision provides a 30-day post-launch warranty window for all custom engineering deliverables, during which any verifiable defects or deviations from the agreed specifications are corrected at no additional charge.
              </p>

              <h2>7. Governing Law & Dispute Resolution</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws applicable to [LEGAL JURISDICTION], without regard to conflict of law principles. Any dispute arising out of or relating to these terms shall first be addressed through good-faith technical negotiation between executive representatives.
              </p>

              <h2>8. Amendments & Updates</h2>
              <p>
                Hyro Vision reserves the right to modify these Terms & Conditions periodically. Changes take effect upon posting to this URL. Continued use of our website or services constitutes acceptance of revised terms.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
