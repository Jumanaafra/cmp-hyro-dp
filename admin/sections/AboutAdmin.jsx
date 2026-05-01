import { useState } from "react";
import { useFirestoreDoc } from "../../hooks/useFirestoreCollection";
import { updateDocument } from "../../firebase/firestore";
import { useToast } from "../adminUtils";

export default function AboutAdmin() {
  const { data, loading } = useFirestoreDoc("about_section", "main");
  const { show, ToastEl } = useToast();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const startEdit = () => setForm({ ...data });
  const cancel = () => setForm(null);
  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));

  const handleStatChange = (idx, key, val) =>
    setForm(fm => {
      const arr = [...(fm.stats || [])];
      arr[idx] = { ...arr[idx], [key]: val };
      return { ...fm, stats: arr };
    });

  const save = async () => {
    setSaving(true);
    try {
      await updateDocument("about_section", "main", form);
      show("About section updated!");
      setForm(null);
    } catch (e) {
      show(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-skeleton" style={{ height: 180, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      <div className="admin-section-header">
        <div>
          <div className="admin-section-title">About Section</div>
          <div className="admin-section-desc">Descriptions, gradient title, and 4 stat cards.</div>
        </div>
        {!form && <button className="admin-btn-add" onClick={startEdit}>✏️ Edit About</button>}
      </div>

      {!form ? (
        <div className="admin-single-form">
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Title</span><div style={{ marginTop: 4 }}>{data?.title} <strong style={{ color: "#14B8A6" }}>{data?.title_gradient}</strong></div></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Description 1</span><div style={{ marginTop: 4, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{data?.description1}</div></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Description 2</span><div style={{ marginTop: 4, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{data?.description2}</div></div>
          <div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Stats</span>
            <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
              {(data?.stats || []).map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "8px 14px", fontSize: 13 }}>
                  {s.icon} <strong>{s.value}</strong> · {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-edit-form">
          <div className="admin-field-row">
            <div className="admin-field">
              <label className="admin-field-label">Title (Static Part)</label>
              <input className="admin-field-input" value={form.title || ""} onChange={e => set("title", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Title Gradient Part</label>
              <input className="admin-field-input" value={form.title_gradient || ""} onChange={e => set("title_gradient", e.target.value)} />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Description 1</label>
            <textarea className="admin-field-textarea" value={form.description1 || ""} onChange={e => set("description1", e.target.value)} rows={3} />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Description 2</label>
            <textarea className="admin-field-textarea" value={form.description2 || ""} onChange={e => set("description2", e.target.value)} rows={3} />
          </div>
          <div>
            <label className="admin-field-label" style={{ marginBottom: 8, display: "block" }}>Stat Cards</label>
            {(form.stats || []).map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px", gap: 8, marginBottom: 8 }}>
                <div className="admin-field">
                  <label className="admin-field-label">Label</label>
                  <input className="admin-field-input" value={s.label} onChange={e => handleStatChange(i, "label", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">Value</label>
                  <input className="admin-field-input" value={s.value} onChange={e => handleStatChange(i, "value", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">Icon</label>
                  <input className="admin-field-input" value={s.icon} onChange={e => handleStatChange(i, "icon", e.target.value)} />
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
