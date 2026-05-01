import { useState } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { createDoc, updateDocument, deleteDocument, batchUpdateOrder } from "../../firebase/firestore";
import { useToast, ConfirmDialog, OrderButtons, VisibilityToggle } from "../adminUtils";

const BLANK = { icon: "💡", step: "", title: "", desc: "", visible: true };

export default function ProcessAdmin() {
  const { data: steps, loading } = useFirestoreCollection("process_steps");
  const { show, ToastEl } = useToast();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [delTarget, setDelTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const startAdd = () => {
    const nextNum = String(steps.length + 1).padStart(2, "0");
    setForm({ ...BLANK, step: nextNum });
    setEditing("new");
  };
  const startEdit = (item) => { setForm({ ...item }); setEditing(item.id); };
  const cancel = () => setEditing(null);
  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));

  const save = async () => {
    if (!form.title.trim()) return show("Title is required", "error");
    setSaving(true);
    try {
      if (editing === "new") {
        await createDoc("process_steps", { ...form, order: steps.length });
        show("Step created!");
      } else {
        await updateDocument("process_steps", editing, form);
        show("Step updated!");
      }
      cancel();
    } catch (e) { show(e.message, "error"); } finally { setSaving(false); }
  };

  const toggleVisible = async (item) => {
    await updateDocument("process_steps", item.id, { visible: !item.visible });
  };

  const confirmDelete = async () => {
    await deleteDocument("process_steps", delTarget);
    setDelTarget(null);
    show("Step deleted");
  };

  const moveItem = async (idx, dir) => {
    const arr = [...steps];
    const si = dir === "up" ? idx - 1 : idx + 1;
    [arr[idx], arr[si]] = [arr[si], arr[idx]];
    await batchUpdateOrder("process_steps", arr);
  };

  const EditForm = () => (
    <div className="admin-edit-form" style={{ marginBottom: 16 }}>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Step Number (e.g. "01")</label>
          <input className="admin-field-input" value={form.step} onChange={e => set("step", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Icon (emoji)</label>
          <input className="admin-field-input" value={form.icon} onChange={e => set("icon", e.target.value)} />
        </div>
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Title</label>
        <input className="admin-field-input" value={form.title} onChange={e => set("title", e.target.value)} />
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Description</label>
        <textarea className="admin-field-textarea" value={form.desc} onChange={e => set("desc", e.target.value)} rows={2} />
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
      {delTarget && <ConfirmDialog message="Delete this step?" onConfirm={confirmDelete} onCancel={() => setDelTarget(null)} />}
      <div className="admin-section-header">
        <div><div className="admin-section-title">Process Steps</div><div className="admin-section-desc">{steps.length} steps in the workflow</div></div>
        <button className="admin-btn-add" onClick={startAdd}>+ Add Step</button>
      </div>
      {editing === "new" && <EditForm />}
      <div className="admin-card-list">
        {steps.map((item, idx) => (
          <div key={item.id} className="admin-item-card">
            <div className="admin-item-row">
              <OrderButtons idx={idx} total={steps.length} onMoveUp={i => moveItem(i, "up")} onMoveDown={i => moveItem(i, "down")} />
              <div className="admin-item-icon">{item.icon}</div>
              <div className="admin-item-info">
                <div className="admin-item-title">Step {item.step}: {item.title}</div>
                <div className="admin-item-desc">{item.desc}</div>
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
        {steps.length === 0 && <div className="admin-empty">No steps yet.</div>}
      </div>
    </div>
  );
}
