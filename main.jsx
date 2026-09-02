// @refresh reset
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { DataProvider } from "./context/DataProvider.jsx";

// Lazy-load admin → zero impact on main site bundle
const AdminApp = lazy(() => import("./admin/AdminApp.jsx"));

// Lazy-load project detail page
const ProjectDetails = lazy(() => import("./pages/ProjectDetails.jsx"));

import { ThemeProvider } from "./context/ThemeContext.jsx";

function PageLoader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--bg, #0a0a0a)", color: "var(--cyan, #14B8A6)", fontFamily: "Inter, sans-serif", fontSize: "16px" }}>
      Loading...
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin panel — lazy loaded, completely separate chunk */}
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminApp />
              </Suspense>
            }
          />
          {/* Project detail page — dynamic route */}
          <Route
            path="/projects/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProjectDetails />
              </Suspense>
            }
          />
          {/* Main public site - catch-all for any other route */}
          <Route
            path="*"
            element={
              <DataProvider>
                <App />
              </DataProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

