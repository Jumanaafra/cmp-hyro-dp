import { useState } from "react";
import "../styles/admin.css";

const ADMIN_EMAIL    = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminLogin({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (
        email.trim().toLowerCase() === ADMIN_EMAIL?.toLowerCase() &&
        password === ADMIN_PASSWORD
      ) {
        // Save session so page refresh keeps them logged in
        sessionStorage.setItem("hv_admin_auth", "true");
        if (onLogin) onLogin();
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 600); // small delay for UX feel
  };

  return (
    <div className="admin-shell">
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <div className="admin-login-logo-mark">H</div>
            <div className="admin-login-title">Hyro Vision Admin</div>
            <div className="admin-login-sub">Control Panel · Secured</div>
          </div>

          {error && <div className="admin-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label className="admin-label">Email Address</label>
              <input
                id="admin-email"
                type="email"
                className="admin-input"
                placeholder="admin@hyrovision.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  className="admin-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: "44px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)", background: "none",
                    border: "none", cursor: "pointer", color: "#64748b",
                    fontSize: "16px", padding: "0",
                  }}
                  tabIndex={-1}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-btn-primary"
              id="admin-login-btn"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
