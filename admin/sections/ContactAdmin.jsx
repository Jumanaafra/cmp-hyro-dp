import { useState } from "react";
import { useFirestoreDoc } from "../../hooks/useFirestoreCollection";
import { updateDocument } from "../../firebase/firestore";
import { useToast } from "../adminUtils";

export default function ContactAdmin() {
  const { data, loading } = useFirestoreDoc("contact_info", "main");
  const { show, ToastEl } = useToast();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const startEdit = () => setForm({ ...data, socials: data?.socials ? [...data.socials] : [] });
  const cancel = () => setForm(null);
  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));

  const setSocial = (idx, key, val) =>
    setForm(fm => {
      const arr = [...(fm.socials || [])];
      arr[idx] = { ...arr[idx], [key]: val };
      return { ...fm, socials: arr };
    });

  const addSocial = () =>
    setForm(fm => ({ ...fm, socials: [...(fm.socials || []), { label: "", href: "#" }] }));

  const removeSocial = (idx) =>
    setForm(fm => ({ ...fm, socials: fm.socials.filter((_, i) => i !== idx) }));

  const save = async () => {
    setSaving(true);
    try {
      await updateDocument("contact_info", "main", form);
      show("Contact info updated!");
      setForm(null);
    } catch (e) { show(e.message, "error"); } finally { setSaving(false); }
  };

  if (loading) return <div className="admin-skeleton" style={{ height: 180, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      <div className="admin-section-header">
        <div><div className="admin-section-title">Contact Info</div><div className="admin-section-desc">Email, WhatsApp, location, and social links shown on the contact section.</div></div>
        {!form && <button className="admin-btn-add" onClick={startEdit}>✏️ Edit Contact Info</button>}
      </div>

      {!form ? (
        <div className="admin-single-form">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Email</span><div style={{ marginTop: 4 }}>{data?.email}</div></div>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>WhatsApp Number</span><div style={{ marginTop: 4 }}>{data?.whatsapp_number}</div></div>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>WhatsApp Link</span><div style={{ marginTop: 4, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{data?.whatsapp_link}</div></div>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Location</span><div style={{ marginTop: 4 }}>{data?.location}</div></div>
          </div>
          <div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Socials</span>
            <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
              {(data?.socials || []).map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#14B8A6", textDecoration: "none" }}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-edit-form">
          <div className="admin-field-row">
            <div className="admin-field">
              <label className="admin-field-label">Email Address</label>
              <input className="admin-field-input" type="email" value={form.email || ""} onChange={e => set("email", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">WhatsApp Number (display)</label>
              <input className="admin-field-input" value={form.whatsapp_number || ""} onChange={e => set("whatsapp_number", e.target.value)} />
            </div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label className="admin-field-label">WhatsApp Link (wa.me/...)</label>
              <input className="admin-field-input" value={form.whatsapp_link || ""} onChange={e => set("whatsapp_link", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Location</label>
              <input className="admin-field-input" value={form.location || ""} onChange={e => set("location", e.target.value)} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <label className="admin-field-label">Social Links</label>
              <button className="admin-btn-secondary" style={{ fontSize: 11, padding: "4px 10px" }} onClick={addSocial}>+ Add</button>
            </div>
            {(form.socials || []).map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 8, marginBottom: 8 }}>
                <div className="admin-field">
                  <label className="admin-field-label">Label</label>
                  <input className="admin-field-input" value={s.label} onChange={e => setSocial(i, "label", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">URL</label>
                  <input className="admin-field-input" value={s.href} onChange={e => setSocial(i, "href", e.target.value)} />
                </div>
                <div style={{ alignSelf: "flex-end" }}>
                  <button className="admin-btn-danger" onClick={() => removeSocial(i)}>✕</button>
                </div>
              </div>
            ))}
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
            <button className="admin-btn-save" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
