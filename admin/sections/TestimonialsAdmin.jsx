import { useState } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { createDoc, updateDocument, deleteDocument, batchUpdateOrder } from "../../firebase/firestore";
import { useToast, ConfirmDialog, OrderButtons, VisibilityToggle } from "../adminUtils";

const BLANK = { name: "", role: "", avatar: "", text: "", rating: 5, color: "#14B8A6", visible: true };

export default function TestimonialsAdmin() {
  const { data: testimonials, loading } = useFirestoreCollection("testimonials");
  const { show, ToastEl } = useToast();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [delTarget, setDelTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const startAdd = () => { setForm({ ...BLANK }); setEditing("new"); };
  const startEdit = (item) => { setForm({ ...item }); setEditing(item.id); };
  const cancel = () => setEditing(null);
  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));

  const save = async () => {
    if (!form.name.trim()) return show("Name is required", "error");
    setSaving(true);
    try {
      if (editing === "new") {
        await createDoc("testimonials", { ...form, order: testimonials.length });
        show("Testimonial created!");
      } else {
        await updateDocument("testimonials", editing, form);
        show("Testimonial updated!");
      }
      cancel();
    } catch (e) { show(e.message, "error"); } finally { setSaving(false); }
  };

  const toggleVisible = async (item) => {
    await updateDocument("testimonials", item.id, { visible: !item.visible });
    show(item.visible ? "Hidden" : "Shown");
  };

  const confirmDelete = async () => {
    await deleteDocument("testimonials", delTarget);
    setDelTarget(null);
    show("Testimonial deleted");
  };

  const moveItem = async (idx, dir) => {
    const arr = [...testimonials];
    const si = dir === "up" ? idx - 1 : idx + 1;
    [arr[idx], arr[si]] = [arr[si], arr[idx]];
    await batchUpdateOrder("testimonials", arr);
  };

  const EditForm = () => (
    <div className="admin-edit-form" style={{ marginBottom: 16 }}>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Full Name</label>
          <input className="admin-field-input" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Avatar Initials (e.g. SC)</label>
          <input className="admin-field-input" value={form.avatar} onChange={e => set("avatar", e.target.value)} maxLength={3} />
        </div>
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Role / Company</label>
          <input className="admin-field-input" value={form.role} onChange={e => set("role", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Rating (1-5)</label>
          <select className="admin-field-input" value={form.rating} onChange={e => set("rating", Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ★</option>)}
          </select>
        </div>
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Testimonial Text</label>
        <textarea className="admin-field-textarea" value={form.text} onChange={e => set("text", e.target.value)} rows={4} />
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Accent Color</label>
        <input className="admin-field-input" value={form.color} onChange={e => set("color", e.target.value)} />
      </div>
      <div className="admin-form-actions">
        <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
        <button className="admin-btn-save" onClick={save} disabled={saving}>{saving ? "Saving..." : editing === "new" ? "Create" : "Save"}</button>
      </div>
    </div>
  );

  if (loading) return <div className="admin-skeleton" style={{ height: 250, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      {delTarget && <ConfirmDialog message="Delete this testimonial?" onConfirm={confirmDelete} onCancel={() => setDelTarget(null)} />}
      <div className="admin-section-header">
        <div><div className="admin-section-title">Testimonials</div><div className="admin-section-desc">{testimonials.length} client stories · auto-rotates in slider</div></div>
        <button className="admin-btn-add" onClick={startAdd}>+ Add Testimonial</button>
      </div>
      {editing === "new" && <EditForm />}
      <div className="admin-card-list">
        {testimonials.map((item, idx) => (
          <div key={item.id} className="admin-item-card">
            <div className="admin-item-row">
              <OrderButtons idx={idx} total={testimonials.length} onMoveUp={i => moveItem(i, "up")} onMoveDown={i => moveItem(i, "down")} />
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${item.color}, #020617)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                {item.avatar}
              </div>
              <div className="admin-item-info">
                <div className="admin-item-title">{item.name} <span style={{ color: "#f59e0b", fontSize: 12 }}>{"★".repeat(item.rating)}</span></div>
                <div className="admin-item-desc" style={{ fontStyle: "italic" }}>"{item.text?.substring(0, 80)}..."</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{item.role}</div>
              </div>
              <div className="admin-item-actions">
                <VisibilityToggle visible={item.visible} onChange={() => toggleVisible(item)} />
                <button className="admin-btn-secondary" onClick={() => startEdit(item)}>Edit</button>
                <button className="admin-btn-danger" onClick={() => setDelTarget(item.id)}>Del</button>
              </div>
            </div>
            {editing === item.id && <EditForm />}
          </div>
        ))}
        {testimonials.length === 0 && <div className="admin-empty">No testimonials yet.</div>}
      </div>
    </div>
  );
}
