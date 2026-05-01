import { useState } from "react";
import { useFirestoreDoc } from "../../hooks/useFirestoreCollection";
import { updateDocument } from "../../firebase/firestore";
import { seedAll } from "../../firebase/seed";
import { useToast } from "../adminUtils";

export default function SettingsAdmin() {
  const { data, loading } = useFirestoreDoc("settings", "main");
  const { show, ToastEl } = useToast();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedDone, setSeedDone] = useState(false);

  const startEdit = () => setForm({ ...data });
  const cancel = () => setForm(null);
  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));

  const save = async () => {
    setSaving(true);
    try {
      await updateDocument("settings", "main", form);
      show("Settings saved!");
      setForm(null);
    } catch (e) { show(e.message, "error"); } finally { setSaving(false); }
  };

  const handleSeed = async () => {
    if (!window.confirm("This will overwrite ALL Firestore data with the default values. Proceed?")) return;
    setSeeding(true);
    try {
      await seedAll();
      setSeedDone(true);
      show("Database seeded with all default data!");
    } catch (e) {
      show("Seeding failed: " + e.message, "error");
    } finally {
      setSeeding(false);
    }
  };

  if (loading) return <div className="admin-skeleton" style={{ height: 200, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      <div className="admin-section-header">
        <div><div className="admin-section-title">Settings</div><div className="admin-section-desc">Global site settings and database management.</div></div>
        {!form && <button className="admin-btn-add" onClick={startEdit}>✏️ Edit Settings</button>}
      </div>

      {/* Settings form */}
      {!form ? (
        <div className="admin-single-form" style={{ marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Site Name</span>
              <div style={{ marginTop: 4, fontSize: 15, fontWeight: 600 }}>{data?.site_name}</div>
            </div>
            <div>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Maintenance Mode</span>
              <div style={{ marginTop: 4 }}>
                <span style={{ background: data?.maintenance_mode ? "rgba(239,68,68,0.1)" : "rgba(20,184,166,0.1)", border: `1px solid ${data?.maintenance_mode ? "rgba(239,68,68,0.3)" : "rgba(20,184,166,0.3)"}`, borderRadius: 20, padding: "3px 10px", fontSize: 12, color: data?.maintenance_mode ? "#f87171" : "#14B8A6" }}>
                  {data?.maintenance_mode ? "🔴 Maintenance" : "🟢 Live"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-edit-form" style={{ marginBottom: 24 }}>
          <div className="admin-field">
            <label className="admin-field-label">Site Name</label>
            <input className="admin-field-input" value={form.site_name || ""} onChange={e => set("site_name", e.target.value)} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <label className="admin-toggle">
              <input type="checkbox" checked={!!form.maintenance_mode} onChange={e => set("maintenance_mode", e.target.checked)} />
              <span className="admin-toggle-slider" />
            </label>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Maintenance Mode</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>When enabled, site shows maintenance notice to visitors</div>
            </div>
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
            <button className="admin-btn-save" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Settings"}</button>
          </div>
        </div>
      )}

      {/* Database zone */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>🌱 Database Management</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20, lineHeight: 1.7 }}>
          Use the Seed button to populate Firestore with all default data from the original static version.<br />
          <strong style={{ color: "#f59e0b" }}>⚠️ Warning:</strong> This will overwrite all current content.
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            className="admin-btn-danger"
            onClick={handleSeed}
            disabled={seeding}
            style={{ padding: "10px 20px", fontSize: 13 }}
            id="seed-db-btn"
          >
            {seeding ? "Seeding..." : seedDone ? "✓ Seeded!" : "🌱 Seed Database with Defaults"}
          </button>
          <a
            href="https://console.firebase.google.com"
            target="_blank"
            rel="noreferrer"
            className="admin-btn-secondary"
            style={{ padding: "10px 20px", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
          >
            🔗 Open Firebase Console ↗
          </a>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {[
          { label: "🌐 View Live Site", href: "/" },
          { label: "📊 Firestore Console", href: "https://console.firebase.google.com" },
          { label: "🔐 Firebase Auth", href: "https://console.firebase.google.com" },
          { label: "📦 Storage", href: "https://console.firebase.google.com" },
        ].map(({ label, href }) => (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" className="admin-btn-secondary" style={{ textDecoration: "none", textAlign: "center", padding: "12px" }}>{label}</a>
        ))}
      </div>
    </div>
  );
}
