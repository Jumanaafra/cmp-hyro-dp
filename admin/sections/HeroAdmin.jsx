import { useState } from "react";
import { useFirestoreDoc } from "../../hooks/useFirestoreCollection";
import { updateDocument } from "../../firebase/firestore";
import { useToast } from "../adminUtils";

export default function HeroAdmin() {
  const { data, loading } = useFirestoreDoc("hero_section", "main");
  const { show, ToastEl } = useToast();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const startEdit = () => setForm({ ...data });
  const cancel = () => setForm(null);

  const handleChange = (field, val) =>
    setForm(f => ({ ...f, [field]: val }));

  const handleArrayChange = (field, val) =>
    setForm(f => ({ ...f, [field]: val.split(",").map(v => v.trim()).filter(Boolean) }));

  const handleStatChange = (idx, key, val) =>
    setForm(f => {
      const arr = [...(f.stats || [])];
      arr[idx] = { ...arr[idx], [key]: val };
      return { ...f, stats: arr };
    });

  const handleMetricChange = (idx, key, val) =>
    setForm(f => {
      const arr = [...(f.metrics || [])];
      arr[idx] = { ...arr[idx], [key]: val };
      return { ...f, metrics: arr };
    });

  const save = async () => {
    setSaving(true);
    try {
      await updateDocument("hero_section", "main", form);
      show("Hero section updated!");
      setForm(null);
    } catch (e) {
      show("Failed to save: " + e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-skeleton" style={{ height: 200, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      <div className="admin-section-header">
        <div>
          <div className="admin-section-title">Hero Section</div>
          <div className="admin-section-desc">Main landing section — badge, headline, subtitle, stats, metrics, and tech pills.</div>
        </div>
        {!form && (
          <button className="admin-btn-add" onClick={startEdit} id="hero-edit-btn">✏️ Edit Hero</button>
        )}
      </div>

      {!form ? (
        <div className="admin-single-form">
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Badge</span><div style={{ marginTop: 4 }}>{data?.badge}</div></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Headline</span><div style={{ marginTop: 4 }}>{data?.headline_prefix} [word] {data?.headline_suffix}</div></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Typewriter Words</span><div style={{ marginTop: 4 }}>{(data?.words || []).join(", ")}</div></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Subtitle</span><div style={{ marginTop: 4 }}>{data?.subtitle}</div></div>
          <div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Stats</span>
            <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
              {(data?.stats || []).map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>
                  <strong>{s.v}</strong> <span style={{ color: "rgba(255,255,255,0.4)" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-edit-form">
          <div className="admin-field-row">
            <div className="admin-field">
              <label className="admin-field-label">Badge Text</label>
              <input className="admin-field-input" value={form.badge || ""} onChange={e => handleChange("badge", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Headline Prefix</label>
              <input className="admin-field-input" value={form.headline_prefix || ""} onChange={e => handleChange("headline_prefix", e.target.value)} />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Headline Suffix</label>
            <input className="admin-field-input" value={form.headline_suffix || ""} onChange={e => handleChange("headline_suffix", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Typewriter Words (comma-separated)</label>
            <input className="admin-field-input" value={(form.words || []).join(", ")} onChange={e => handleArrayChange("words", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Subtitle</label>
            <textarea className="admin-field-textarea" value={form.subtitle || ""} onChange={e => handleChange("subtitle", e.target.value)} rows={3} />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">CTA Primary Label</label>
            <input className="admin-field-input" value={form.cta_primary_label || ""} onChange={e => handleChange("cta_primary_label", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Tech Stack Pills (comma-separated)</label>
            <input className="admin-field-input" value={(form.techs || []).join(", ")} onChange={e => handleArrayChange("techs", e.target.value)} />
          </div>
          <div>
            <label className="admin-field-label" style={{ marginBottom: 8, display: "block" }}>Stats (value + label)</label>
            {(form.stats || []).map((s, i) => (
              <div key={i} className="admin-field-row" style={{ marginBottom: 8 }}>
                <div className="admin-field">
                  <label className="admin-field-label">Value</label>
                  <input className="admin-field-input" value={s.v} onChange={e => handleStatChange(i, "v", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">Label</label>
                  <input className="admin-field-input" value={s.l} onChange={e => handleStatChange(i, "l", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="admin-field-label" style={{ marginBottom: 8, display: "block" }}>Metrics (label, value, pct, color)</label>
            {(form.metrics || []).map((m, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                <div className="admin-field">
                  <label className="admin-field-label">Label</label>
                  <input className="admin-field-input" value={m.label} onChange={e => handleMetricChange(i, "label", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">Value</label>
                  <input className="admin-field-input" value={m.val} onChange={e => handleMetricChange(i, "val", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">Pct (e.g. 92%)</label>
                  <input className="admin-field-input" value={m.pct} onChange={e => handleMetricChange(i, "pct", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">Color</label>
                  <input className="admin-field-input" value={m.color} onChange={e => handleMetricChange(i, "color", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
            <button className="admin-btn-save" onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
