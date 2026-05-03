import React, { lazy, Suspense, Component } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { DataProvider } from "./context/DataContext.jsx";

// Lazy-load admin → zero impact on main site bundle
const AdminApp = lazy(() => import("./admin/AdminApp.jsx"));

/* ── Top-level error boundary to prevent blank pages on crash ── */
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(err) { console.error("[Hyro Vision] App crashed:", err); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#0a0a0a", color:"#f1f5f9", fontFamily:"Inter,sans-serif", padding:"24px", textAlign:"center", gap:"16px" }}>
        <div style={{ fontSize:"48px" }}>⚡</div>
        <h1 style={{ color:"#14B8A6", fontSize:"24px", margin:0 }}>Hyro Vision</h1>
        <p style={{ color:"#94a3b8", maxWidth:"400px", lineHeight:1.7 }}>Something went wrong loading the site. Please refresh the page.</p>
        <button onClick={() => window.location.reload()} style={{ padding:"12px 28px", borderRadius:"10px", background:"linear-gradient(135deg,#14B8A6,#10b981)", color:"#020617", fontWeight:700, border:"none", cursor:"pointer", fontSize:"15px" }}>Reload Page</button>
        {import.meta.env.DEV && <pre style={{ fontSize:"11px", color:"#475569", maxWidth:"600px", whiteSpace:"pre-wrap", textAlign:"left" }}>{this.state.error?.message}</pre>}
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Main public site */}
          <Route
            path="/"
            element={
              <DataProvider>
                <App />
              </DataProvider>
            }
          />
          {/* Admin panel — lazy loaded, completely separate chunk */}
          <Route
            path="/admin/*"
            element={
              <Suspense
                fallback={
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#020617", color: "#14B8A6", fontFamily: "Inter, sans-serif", fontSize: "16px" }}>
                    Loading Admin Panel...
                  </div>
                }
              >
                <AdminApp />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

