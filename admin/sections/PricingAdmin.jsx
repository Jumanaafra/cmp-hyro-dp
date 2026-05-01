import { useState } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { createDoc, updateDocument, deleteDocument, batchUpdateOrder } from "../../firebase/firestore";
import { useToast, ConfirmDialog, OrderButtons, VisibilityToggle } from "../adminUtils";

const BLANK = {
  name: "", price: "", period: "/ project", tagline: "",
  features: [], missing: [], color: "#14B8A6", cta: "Get Started",
  highlighted: false, visible: true,
};

export default function PricingAdmin() {
  const { data: plans, loading } = useFirestoreCollection("pricing_plans");
  const { show, ToastEl } = useToast();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [delTarget, setDelTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const startAdd = () => { setForm({ ...BLANK }); setEditing("new"); };
  const startEdit = (item) => { setForm({ ...item }); setEditing(item.id); };
  const cancel = () => setEditing(null);
  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));
  const setList = (field, v) => setForm(fm => ({ ...fm, [field]: v.split("\n").map(t => t.trim()).filter(Boolean) }));

  const save = async () => {
    if (!form.name.trim()) return show("Name is required", "error");
    setSaving(true);
    try {
      if (editing === "new") {
        await createDoc("pricing_plans", { ...form, order: plans.length });
        show("Plan created!");
      } else {
        await updateDocument("pricing_plans", editing, form);
        show("Plan updated!");
      }
      cancel();
    } catch (e) { show(e.message, "error"); } finally { setSaving(false); }
  };

  const toggleVisible = async (item) => {
    await updateDocument("pricing_plans", item.id, { visible: !item.visible });
    show(item.visible ? "Plan hidden" : "Plan shown");
  };

  const toggleHighlighted = async (item) => {
    await updateDocument("pricing_plans", item.id, { highlighted: !item.highlighted });
    show("Updated!");
  };

  const confirmDelete = async () => {
    await deleteDocument("pricing_plans", delTarget);
    setDelTarget(null);
    show("Plan deleted");
  };

  const moveItem = async (idx, dir) => {
    const arr = [...plans];
    const si = dir === "up" ? idx - 1 : idx + 1;
    [arr[idx], arr[si]] = [arr[si], arr[idx]];
    await batchUpdateOrder("pricing_plans", arr);
  };

  const EditForm = () => (
    <div className="admin-edit-form" style={{ marginBottom: 16 }}>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Plan Name</label>
          <input className="admin-field-input" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Price</label>
          <input className="admin-field-input" value={form.price} onChange={e => set("price", e.target.value)} placeholder="$7,500 or Custom" />
        </div>
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Period</label>
          <input className="admin-field-input" value={form.period} onChange={e => set("period", e.target.value)} placeholder="/ project" />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Tagline</label>
          <input className="admin-field-input" value={form.tagline} onChange={e => set("tagline", e.target.value)} />
        </div>
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">CTA Button Label</label>
          <input className="admin-field-input" value={form.cta} onChange={e => set("cta", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Accent Color</label>
          <input className="admin-field-input" value={form.color} onChange={e => set("color", e.target.value)} />
        </div>
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Features (one per line)</label>
        <textarea className="admin-field-textarea" value={(form.features || []).join("\n")} onChange={e => setList("features", e.target.value)} rows={5} />
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Missing/Excluded (one per line)</label>
        <textarea className="admin-field-textarea" value={(form.missing || []).join("\n")} onChange={e => setList("missing", e.target.value)} rows={3} />
      </div>
      <div className="admin-form-actions">
        <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
        <button className="admin-btn-save" onClick={save} disabled={saving}>{saving ? "Saving..." : editing === "new" ? "Create" : "Save"}</button>
      </div>
    </div>
  );

  if (loading) return <div className="admin-skeleton" style={{ height: 280, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      {delTarget && <ConfirmDialog message="Delete this plan?" onConfirm={confirmDelete} onCancel={() => setDelTarget(null)} />}
      <div className="admin-section-header">
        <div><div className="admin-section-title">Pricing Plans</div><div className="admin-section-desc">{plans.length} plans · toggle highlighted to feature a plan</div></div>
        <button className="admin-btn-add" onClick={startAdd}>+ Add Plan</button>
      </div>
      {editing === "new" && <EditForm />}
      <div className="admin-card-list">
        {plans.map((item, idx) => (
          <div key={item.id} className="admin-item-card" style={{ borderColor: item.highlighted ? `${item.color}44` : undefined }}>
            <div className="admin-item-row">
              <OrderButtons idx={idx} total={plans.length} onMoveUp={i => moveItem(i, "up")} onMoveDown={i => moveItem(i, "down")} />
              <div className="admin-item-info">
                <div className="admin-item-title" style={{ color: item.color }}>
                  {item.name} · <span style={{ fontSize: 13 }}>{item.price}</span>
                  {item.highlighted && <span style={{ marginLeft: 8, fontSize: 11, background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)", borderRadius: 20, padding: "2px 8px", color: "#14B8A6" }}>⭐ Featured</span>}
                </div>
                <div className="admin-item-desc">{item.tagline} · {(item.features || []).length} features</div>
              </div>
              <div className="admin-item-actions">
                <button className="admin-btn-secondary" style={{ fontSize: 11 }} onClick={() => toggleHighlighted(item)} title="Toggle featured">⭐</button>
                <VisibilityToggle visible={item.visible} onChange={() => toggleVisible(item)} />
                <button className="admin-btn-secondary" onClick={() => startEdit(item)}>Edit</button>
                <button className="admin-btn-danger" onClick={() => setDelTarget(item.id)}>Del</button>
              </div>
            </div>
            {editing === item.id && <EditForm />}
          </div>
        ))}
        {plans.length === 0 && <div className="admin-empty">No pricing plans yet.</div>}
      </div>
    </div>
  );
}
