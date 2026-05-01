import { useState } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { createDoc, updateDocument, deleteDocument, batchUpdateOrder } from "../../firebase/firestore";
import { useToast, ConfirmDialog, OrderButtons, VisibilityToggle } from "../adminUtils";

const BLANK = { emoji: "🚀", title: "", category: "", desc: "", tech: [], color: "#14B8A6", size: "small", visible: true };
const SIZES = ["small", "large"];

export default function ProjectsAdmin() {
  const { data: projects, loading } = useFirestoreCollection("projects");
  const { show, ToastEl } = useToast();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [delTarget, setDelTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const startAdd = () => { setForm({ ...BLANK }); setEditing("new"); };
  const startEdit = (item) => { setForm({ ...item }); setEditing(item.id); };
  const cancel = () => setEditing(null);
  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));
  const setTech = (v) => setForm(fm => ({ ...fm, tech: v.split(",").map(t => t.trim()).filter(Boolean) }));

  const save = async () => {
    if (!form.title.trim()) return show("Title is required", "error");
    setSaving(true);
    try {
      if (editing === "new") {
        await createDoc("projects", { ...form, order: projects.length });
        show("Project created!");
      } else {
        await updateDocument("projects", editing, form);
        show("Project updated!");
      }
      cancel();
    } catch (e) { show(e.message, "error"); } finally { setSaving(false); }
  };

  const toggleVisible = async (item) => {
    await updateDocument("projects", item.id, { visible: !item.visible });
    show(item.visible ? "Project hidden" : "Project shown");
  };

  const confirmDelete = async () => {
    await deleteDocument("projects", delTarget);
    setDelTarget(null);
    show("Project deleted");
  };

  const moveItem = async (idx, dir) => {
    const arr = [...projects];
    const si = dir === "up" ? idx - 1 : idx + 1;
    [arr[idx], arr[si]] = [arr[si], arr[idx]];
    await batchUpdateOrder("projects", arr);
  };

  const EditForm = () => (
    <div className="admin-edit-form" style={{ marginBottom: 16 }}>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Title</label>
          <input className="admin-field-input" value={form.title} onChange={e => set("title", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Category</label>
          <input className="admin-field-input" value={form.category} onChange={e => set("category", e.target.value)} />
        </div>
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Description</label>
        <textarea className="admin-field-textarea" value={form.desc} onChange={e => set("desc", e.target.value)} rows={3} />
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Tech Stack (comma-separated)</label>
          <input className="admin-field-input" value={(form.tech || []).join(", ")} onChange={e => setTech(e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Emoji</label>
          <input className="admin-field-input" value={form.emoji} onChange={e => set("emoji", e.target.value)} />
        </div>
      </div>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Color (hex)</label>
          <input className="admin-field-input" value={form.color} onChange={e => set("color", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Card Size</label>
          <select className="admin-field-input" value={form.size} onChange={e => set("size", e.target.value)}>
            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="admin-form-actions">
        <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
        <button className="admin-btn-save" onClick={save} disabled={saving}>{saving ? "Saving..." : editing === "new" ? "Create" : "Save"}</button>
      </div>
    </div>
  );

  if (loading) return <div className="admin-skeleton" style={{ height: 300, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      {delTarget && <ConfirmDialog message="Delete this project? This cannot be undone." onConfirm={confirmDelete} onCancel={() => setDelTarget(null)} />}
      <div className="admin-section-header">
        <div><div className="admin-section-title">Projects</div><div className="admin-section-desc">{projects.length} projects · size: small or large card</div></div>
        <button className="admin-btn-add" onClick={startAdd}>+ Add Project</button>
      </div>
      {editing === "new" && <EditForm />}
      <div className="admin-card-list">
        {projects.map((item, idx) => (
          <div key={item.id} className="admin-item-card">
            <div className="admin-item-row">
              <OrderButtons idx={idx} total={projects.length} onMoveUp={i => moveItem(i, "up")} onMoveDown={i => moveItem(i, "down")} />
              <div className="admin-item-icon">{item.emoji}</div>
              <div className="admin-item-info">
                <div className="admin-item-title" style={{ color: item.color }}>{item.title}</div>
                <div className="admin-item-desc">{item.category} · {item.size} card</div>
                <div className="admin-item-tags">{(item.tech || []).map(t => <span key={t} className="admin-item-tag">{t}</span>)}</div>
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
        {projects.length === 0 && <div className="admin-empty">No projects yet.</div>}
      </div>
    </div>
  );
}
