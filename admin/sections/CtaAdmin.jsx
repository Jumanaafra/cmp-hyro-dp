import { useState } from "react";
import { useFirestoreDoc } from "../../hooks/useFirestoreCollection";
import { updateDocument } from "../../firebase/firestore";
import { useToast } from "../adminUtils";

export default function CtaAdmin() {
  const { data, loading } = useFirestoreDoc("cta_section", "main");
  const { show, ToastEl } = useToast();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const startEdit = () => setForm({ ...data });
  const cancel = () => setForm(null);
  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));

  const save = async () => {
    setSaving(true);
    try {
      await updateDocument("cta_section", "main", form);
      show("CTA section updated!");
      setForm(null);
    } catch (e) { show(e.message, "error"); } finally { setSaving(false); }
  };

  if (loading) return <div className="admin-skeleton" style={{ height: 150, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      <div className="admin-section-header">
        <div><div className="admin-section-title">CTA Section</div><div className="admin-section-desc">Call-to-action banner — title, description, button labels.</div></div>
        {!form && <button className="admin-btn-add" onClick={startEdit}>✏️ Edit CTA</button>}
      </div>

      {!form ? (
        <div className="admin-single-form">
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Tag</span><div style={{ marginTop: 4 }}>{data?.tag}</div></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Title</span><div style={{ marginTop: 4 }}>{data?.title} <strong style={{ color: "#14B8A6" }}>{data?.title_gradient}</strong></div></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Description</span><div style={{ marginTop: 4, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{data?.description}</div></div>
          <div style={{ display: "flex", gap: 12 }}>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Primary CTA</span><div style={{ marginTop: 4 }}>{data?.btn_primary_label}</div></div>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Secondary CTA</span><div style={{ marginTop: 4 }}>{data?.btn_secondary_label}</div></div>
          </div>
        </div>
      ) : (
        <div className="admin-edit-form">
          <div className="admin-field-row">
            <div className="admin-field">
              <label className="admin-field-label">Tag Label</label>
              <input className="admin-field-input" value={form.tag || ""} onChange={e => set("tag", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Title (Static)</label>
              <input className="admin-field-input" value={form.title || ""} onChange={e => set("title", e.target.value)} />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Title Gradient Part</label>
            <input className="admin-field-input" value={form.title_gradient || ""} onChange={e => set("title_gradient", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Description</label>
            <textarea className="admin-field-textarea" value={form.description || ""} onChange={e => set("description", e.target.value)} rows={3} />
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label className="admin-field-label">Primary Button Label</label>
              <input className="admin-field-input" value={form.btn_primary_label || ""} onChange={e => set("btn_primary_label", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Secondary Button Label</label>
              <input className="admin-field-input" value={form.btn_secondary_label || ""} onChange={e => set("btn_secondary_label", e.target.value)} />
            </div>
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
