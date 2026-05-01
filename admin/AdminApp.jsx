import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminApp() {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Loading
  if (user === undefined) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", background: "#020617", color: "#14B8A6",
        fontFamily: "Inter, sans-serif", fontSize: "14px",
      }}>
        Authenticating...
      </div>
    );
  }

  // Not logged in
  if (!user) return <AdminLogin />;

  // Logged in
  return <AdminDashboard user={user} />;
}
