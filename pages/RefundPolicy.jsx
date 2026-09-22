import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { legalConfig } from "../data/legal";
import "../styles/pages.css";

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Refund & Cancellation Policy — Hyro Vision"
        description="Learn about Hyro Vision's milestone-based billing, sprint cancellations, defect remediation, and refund policy for custom software projects."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Refund Policy", path: "/refund-policy" },
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
            <span className="page-breadcrumb-current">Refund Policy</span>
          </nav>

          {/* Header */}
          <header className="page-header">
            <div className="page-tag">
              <span className="page-tag-dot" />
              Billing Transparency
            </div>
            <h1 className="page-title">Refund & Cancellation Policy</h1>
            <p className="page-subtitle">
              Fair, transparent policies governing custom software engineering sprints and professional milestone delivery.
            </p>
          </header>

          <article className="legal-container">
            <div className="legal-meta">
              <span>Policy Date: <strong>{legalConfig.lastUpdated}</strong></span>
              <span>Entity: <strong>{legalConfig.legalEntityName}</strong></span>
              <span>Billing Support: <strong>{legalConfig.supportEmail}</strong></span>
            </div>

            <div className="legal-prose">
              <div className="legal-highlight-box">
                Because Hyro Vision provides bespoke software engineering, architecture design, and development hours dedicated specifically to your project, our refund and cancellation policies reflect our milestone-based delivery structure.
              </div>

              <h2>1. Milestone-Based Billing Structure</h2>
              <p>
                To protect both client and engineering teams, major software projects are decomposed into discrete, testable sprint milestones (e.g., Discovery & Architecture, Backend API & Database, Frontend Integration, Production Release).
              </p>
              <ul>
                <li>Milestone kickoff deposits are billed prior to the start of dedicated engineering work for that sprint.</li>
                <li>Final milestone completion payments are billed only after the milestone deliverables have been deployed to staging and accepted by the client.</li>
              </ul>

              <h2>2. Project Cancellation Prior to Sprint Commencement</h2>
              <p>
                If a client decides to cancel an engagement prior to the commencement of scheduled engineering work, the milestone kickoff deposit will be refunded in full, minus any direct out-of-pocket costs already incurred (e.g., third-party domain purchases, dedicated cloud provisioning).
              </p>

              <h2>3. In-Progress Sprint Cancellations</h2>
              <p>
                If an engagement is terminated mid-sprint:
              </p>
              <ul>
                <li>The client is billed proportionally for verifiable engineering hours completed up to the date of formal written termination notice.</li>
                <li>All work-in-progress code, architecture schematics, and design assets completed up to that point will be immediately handed over to the client.</li>
                <li>Any unspent portion of the milestone deposit will be promptly refunded within 14 business days.</li>
              </ul>

              <h2>4. Defect Remediation Warranty (Code Guarantee)</h2>
              <p>
                We do not abandon our clients post-delivery. Instead of disputes, we provide a <strong>30-day Post-Deployment Defect Warranty</strong> for all production code shipped by Hyro Vision.
              </p>
              <p>
                If a bug, layout failure, or functional deviation from the signed Statement of Work is discovered within this warranty window, our engineers will remediate and redeploy the fix at zero additional charge.
              </p>

              <h2>5. Non-Refundable Expenses</h2>
              <p>
                The following external third-party expenses are strictly non-refundable once committed:
              </p>
              <ul>
                <li>Third-party API quotas and LLM consumption tokens (e.g., OpenAI, Gemini, Groq, Twilio).</li>
                <li>Domain registration, SSL certification, and specialized hardware components (e.g., IoT microcontrollers).</li>
                <li>Paid SaaS integrations, database hosting, or cloud server provisioning paid directly to hosting vendors.</li>
              </ul>

              <h2>6. How to Request a Review or Refund</h2>
              <p>
                To initiate a billing review, milestone adjustment, or refund request, please email our billing team at <a href={`mailto:${legalConfig.supportEmail}`} style={{ color: "var(--cyan)" }}>{legalConfig.supportEmail}</a> with your project reference number and milestone details. We review and resolve billing queries within 5 business days.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
