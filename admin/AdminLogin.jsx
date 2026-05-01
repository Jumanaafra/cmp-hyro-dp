import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import "../styles/admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(
        err.code === "auth/invalid-credential" ||
          err.code === "auth/wrong-password" ||
          err.code === "auth/user-not-found"
          ? "Invalid email or password."
          : "Login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
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
                type="email"
                className="admin-input"
                placeholder="admin@hyrovision.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="admin-email"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Password</label>
              <input
                type="password"
                className="admin-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                id="admin-password"
              />
            </div>
            <button type="submit" className="admin-btn-primary" disabled={loading} id="admin-login-btn">
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
