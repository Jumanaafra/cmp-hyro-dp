import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { DataProvider } from "./context/DataContext.jsx";

// Lazy-load admin → zero impact on main site bundle
const AdminApp = lazy(() => import("./admin/AdminApp.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
