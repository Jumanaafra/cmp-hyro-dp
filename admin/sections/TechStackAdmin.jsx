import { useState } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { createDoc, updateDocument, deleteDocument, batchUpdateOrder } from "../../firebase/firestore";
import { useToast, ConfirmDialog, OrderButtons, VisibilityToggle } from "../adminUtils";

const BLANK = { name: "", icon: "⚛️", visible: true };

export default function TechStackAdmin() {
  const { data: techs, loading } = useFirestoreCollection("tech_stack");
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
        await createDoc("tech_stack", { ...form, order: techs.length });
        show("Tech added!");
      } else {
        await updateDocument("tech_stack", editing, form);
        show("Tech updated!");
      }
      cancel();
    } catch (e) { show(e.message, "error"); } finally { setSaving(false); }
  };

  const toggleVisible = async (item) => {
    await updateDocument("tech_stack", item.id, { visible: !item.visible });
  };

  const confirmDelete = async () => {
    await deleteDocument("tech_stack", delTarget);
    setDelTarget(null);
    show("Tech removed");
  };

  const moveItem = async (idx, dir) => {
    const arr = [...techs];
    const si = dir === "up" ? idx - 1 : idx + 1;
    [arr[idx], arr[si]] = [arr[si], arr[idx]];
    await batchUpdateOrder("tech_stack", arr);
  };

  if (loading) return <div className="admin-skeleton" style={{ height: 250, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      {delTarget && <ConfirmDialog message="Remove this technology?" onConfirm={confirmDelete} onCancel={() => setDelTarget(null)} />}
      <div className="admin-section-header">
        <div><div className="admin-section-title">Tech Stack</div><div className="admin-section-desc">{techs.length} technologies · shown in scrolling ticker</div></div>
        <button className="admin-btn-add" onClick={startAdd}>+ Add Tech</button>
      </div>

      {editing === "new" && (
        <div className="admin-edit-form" style={{ marginBottom: 16 }}>
          <div className="admin-field-row">
            <div className="admin-field">
              <label className="admin-field-label">Name</label>
              <input className="admin-field-input" value={form.name} onChange={e => set("name", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Icon (emoji)</label>
              <input className="admin-field-input" value={form.icon} onChange={e => set("icon", e.target.value)} />
            </div>
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
            <button className="admin-btn-save" onClick={save} disabled={saving}>{saving ? "Saving..." : "Add Tech"}</button>
          </div>
        </div>
      )}

      {/* Grid view for tech items */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
        {techs.map((item, idx) => (
          <div key={item.id} className="admin-item-card" style={{ padding: "12px 16px" }}>
            {editing === item.id ? (
              <div>
                <div className="admin-field-row" style={{ marginBottom: 8 }}>
                  <div className="admin-field">
                    <label className="admin-field-label">Name</label>
                    <input className="admin-field-input" value={form.name} onChange={e => set("name", e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label className="admin-field-label">Icon</label>
                    <input className="admin-field-input" value={form.icon} onChange={e => set("icon", e.target.value)} />
                  </div>
                </div>
                <div className="admin-form-actions">
                  <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
                  <button className="admin-btn-save" onClick={save} disabled={saving}>Save</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <OrderButtons idx={idx} total={techs.length} onMoveUp={i => moveItem(i, "up")} onMoveDown={i => moveItem(i, "down")} />
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{item.name}</span>
                <VisibilityToggle visible={item.visible} onChange={() => toggleVisible(item)} />
                <button className="admin-btn-secondary" style={{ padding: "4px 8px", fontSize: 11 }} onClick={() => startEdit(item)}>✏️</button>
                <button className="admin-btn-danger" style={{ padding: "4px 8px", fontSize: 11 }} onClick={() => setDelTarget(item.id)}>✕</button>
              </div>
            )}
          </div>
        ))}
        {techs.length === 0 && <div className="admin-empty" style={{ gridColumn: "1/-1" }}>No technologies yet.</div>}
      </div>
    </div>
  );
}
