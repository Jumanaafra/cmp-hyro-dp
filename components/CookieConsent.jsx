import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuCookie, LuCheck, LuShieldCheck, LuX } from "react-icons/lu";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("hv_cookie_consent");
      if (!consent) {
        // Show after small delay so page loads smoothly
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access restricted in some private modes
    }
  }, []);

  const handleConsent = (choice) => {
    try {
      localStorage.setItem(
        "hv_cookie_consent",
        JSON.stringify({
          choice,
          timestamp: new Date().toISOString(),
          analytics: choice === "all",
          marketing: choice === "all",
          essential: true,
        })
      );
    } catch (e) {
      console.warn("Could not save cookie preferences:", e);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        right: "24px",
        maxWidth: "520px",
        zIndex: 9990,
        background: "var(--card-bg, #0f0f12)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--card-border, rgba(255,255,255,0.1))",
        borderRadius: "var(--radius-md, 16px)",
        padding: "20px 24px",
        boxShadow: "0 20px 45px rgba(0, 0, 0, 0.45)",
        fontFamily: "'Inter', sans-serif",
        color: "var(--text, #f1f5f9)",
        animation: "fadeInUp 0.35s ease-out forwards",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(var(--cyan-rgb, 20, 184, 166), 0.12)",
            color: "var(--cyan, #14B8A6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
            marginTop: "2px",
          }}
        >
          <LuCookie />
        </div>
        <div style={{ flex: 1 }}>
          <h4
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--text-heading, #ffffff)",
              margin: "0 0 6px 0",
              letterSpacing: "-0.01em",
            }}
          >
            Privacy & Cookie Preferences
          </h4>
          <p
            style={{
              fontSize: "0.825rem",
              lineHeight: "1.5",
              color: "var(--text-muted, #94a3b8)",
              margin: "0 0 14px 0",
            }}
          >
            We use strictly essential cookies for core platform security, plus optional performance telemetry to improve your browsing experience. Read our{" "}
            <Link
              to="/cookie-policy"
              style={{ color: "var(--cyan, #14B8A6)", textDecoration: "underline" }}
            >
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              style={{ color: "var(--cyan, #14B8A6)", textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
            .
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <button
              onClick={() => handleConsent("all")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--cyan, #14B8A6)",
                color: "#000000",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "0.825rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "opacity 0.2s",
              }}
            >
              <LuCheck size={14} /> Accept All
            </button>
            <button
              onClick={() => handleConsent("essential")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                color: "var(--text, #f1f5f9)",
                border: "1px solid var(--border, rgba(255,255,255,0.15))",
                borderRadius: "8px",
                padding: "8px 14px",
                fontSize: "0.825rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              <LuShieldCheck size={14} /> Essential Only
            </button>
          </div>
        </div>

        <button
          onClick={() => handleConsent("essential")}
          aria-label="Close cookie banner"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-dim, #64748b)",
            cursor: "pointer",
            padding: "4px",
            fontSize: "16px",
            lineHeight: 1,
          }}
        >
          <LuX />
        </button>
      </div>
    </aside>
  );
}
