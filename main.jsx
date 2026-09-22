// @refresh reset
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { DataProvider } from "./context/DataProvider.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import CookieConsent from "./components/CookieConsent.jsx";

// Lazy-loaded routes for code splitting
const AdminApp = lazy(() => import("./admin/AdminApp.jsx"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const Careers = lazy(() => import("./pages/Careers.jsx"));
const JobDetails = lazy(() => import("./pages/JobDetails.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsConditions = lazy(() => import("./pages/TermsConditions.jsx"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy.jsx"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function PageLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "var(--bg, #0a0a0a)",
        color: "var(--cyan, #14B8A6)",
        fontFamily: "'Inter', sans-serif",
        fontSize: "16px",
        letterSpacing: "0.05em",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            border: "3px solid rgba(var(--cyan-rgb, 20, 184, 166), 0.2)",
            borderTopColor: "var(--cyan, #14B8A6)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <span>Loading Hyro Vision...</span>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <CookieConsent />
          <Routes>
            {/* Admin panel — lazy loaded, separate chunk */}
            <Route
              path="/admin/*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminApp />
                </Suspense>
              }
            />

            {/* Main Landing Page */}
            <Route path="/" element={<App />} />

            {/* Core Public Company Pages */}
            <Route
              path="/about"
              element={
                <Suspense fallback={<PageLoader />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/services"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Services />
                </Suspense>
              }
            />
            <Route
              path="/services/:slug"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ServiceDetails />
                </Suspense>
              }
            />
            <Route
              path="/projects"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProjectDetails />
                </Suspense>
              }
            />
            <Route
              path="/careers"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Careers />
                </Suspense>
              }
            />
            <Route
              path="/careers/:slug"
              element={
                <Suspense fallback={<PageLoader />}>
                  <JobDetails />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/blog"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Blog />
                </Suspense>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <Suspense fallback={<PageLoader />}>
                  <BlogPost />
                </Suspense>
              }
            />
            <Route
              path="/faq"
              element={
                <Suspense fallback={<PageLoader />}>
                  <FAQ />
                </Suspense>
              }
            />

            {/* Legal & Compliance Routes */}
            <Route
              path="/privacy-policy"
              element={
                <Suspense fallback={<PageLoader />}>
                  <PrivacyPolicy />
                </Suspense>
              }
            />
            <Route
              path="/terms"
              element={
                <Suspense fallback={<PageLoader />}>
                  <TermsConditions />
                </Suspense>
              }
            />
            <Route
              path="/terms-and-conditions"
              element={
                <Suspense fallback={<PageLoader />}>
                  <TermsConditions />
                </Suspense>
              }
            />
            <Route
              path="/cookie-policy"
              element={
                <Suspense fallback={<PageLoader />}>
                  <CookiePolicy />
                </Suspense>
              }
            />
            <Route
              path="/refund-policy"
              element={
                <Suspense fallback={<PageLoader />}>
                  <RefundPolicy />
                </Suspense>
              }
            />

            {/* Catch-all 404 Route */}
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
);
