import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

// Check sessionStorage so refresh keeps the user logged in
function isAuthenticated() {
  return sessionStorage.getItem("hv_admin_auth") === "true";
}

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated);

  const handleLogin  = () => setLoggedIn(true);
  const handleLogout = () => {
    sessionStorage.removeItem("hv_admin_auth");
    setLoggedIn(false);
  };

  if (!loggedIn) return <AdminLogin onLogin={handleLogin} />;

  return <AdminDashboard onLogout={handleLogout} />;
}
