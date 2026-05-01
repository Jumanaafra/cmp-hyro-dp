import { useState } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { createDoc, updateDocument, deleteDocument, batchUpdateOrder } from "../../firebase/firestore";
import { useToast, ConfirmDialog, OrderButtons, VisibilityToggle } from "../adminUtils";

const BLANK = { icon: "🔧", title: "", desc: "", tags: [], color: "#14B8A6", visible: true };

export default function ServicesAdmin() {
  const { data: services, loading } = useFirestoreCollection("services");
  const { show, ToastEl } = useToast();
  const [editing, setEditing] = useState(null); // null | "new" | id
  const [form, setForm] = useState(BLANK);
  const [delTarget, setDelTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const startAdd = () => { setForm({ ...BLANK }); setEditing("new"); };
  const startEdit = (item) => { setForm({ ...item }); setEditing(item.id); };
  const cancel = () => { setEditing(null); setForm(BLANK); };

  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));
  const setTags = (v) => setForm(fm => ({ ...fm, tags: v.split(",").map(t => t.trim()).filter(Boolean) }));

  const save = async () => {
    if (!form.title.trim()) return show("Title is required", "error");
    setSaving(true);
    try {
      if (editing === "new") {
        await createDoc("services", { ...form, order: services.length });
        show("Service created!");
      } else {
        await updateDocument("services", editing, form);
        show("Service updated!");
      }
      cancel();
    } catch (e) {
      show(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const toggleVisible = async (item) => {
    await updateDocument("services", item.id, { visible: !item.visible });
    show(item.visible ? "Service hidden" : "Service shown");
  };

  const confirmDelete = async () => {
    await deleteDocument("services", delTarget);
    setDelTarget(null);
    show("Service deleted");
  };

  const moveItem = async (idx, direction) => {
    const arr = [...services];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
    await batchUpdateOrder("services", arr);
  };

  if (loading) return <div className="admin-skeleton" style={{ height: 300, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      {delTarget && <ConfirmDialog message="Delete this service? This cannot be undone." onConfirm={confirmDelete} onCancel={() => setDelTarget(null)} />}

      <div className="admin-section-header">
        <div>
          <div className="admin-section-title">Services</div>
          <div className="admin-section-desc">{services.length} services · drag to reorder · toggle visibility</div>
        </div>
        <button className="admin-btn-add" onClick={startAdd} id="add-service-btn">+ Add Service</button>
      </div>

      {/* Add form */}
      {editing === "new" && (
        <div className="admin-edit-form" style={{ marginBottom: 16 }}>
          <div className="admin-field-row">
            <div className="admin-field">
              <label className="admin-field-label">Icon (emoji)</label>
              <input className="admin-field-input" value={form.icon} onChange={e => set("icon", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Title</label>
              <input className="admin-field-input" value={form.title} onChange={e => set("title", e.target.value)} />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-field-label">Description</label>
            <textarea className="admin-field-textarea" value={form.desc} onChange={e => set("desc", e.target.value)} rows={3} />
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label className="admin-field-label">Tags (comma-separated)</label>
              <input className="admin-field-input" value={(form.tags || []).join(", ")} onChange={e => setTags(e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label">Color (hex)</label>
              <input className="admin-field-input" value={form.color} onChange={e => set("color", e.target.value)} />
            </div>
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
            <button className="admin-btn-save" onClick={save} disabled={saving}>{saving ? "Saving..." : "Create Service"}</button>
          </div>
        </div>
      )}

      <div className="admin-card-list">
        {services.map((item, idx) => (
          <div key={item.id} className="admin-item-card">
            <div className="admin-item-row">
              <OrderButtons idx={idx} total={services.length} onMoveUp={i => moveItem(i, "up")} onMoveDown={i => moveItem(i, "down")} />
              <div className="admin-item-icon" style={{ color: item.color }}>{item.icon}</div>
              <div className="admin-item-info">
                <div className="admin-item-title">{item.title}</div>
                <div className="admin-item-desc">{item.desc}</div>
                <div className="admin-item-tags">
                  {(item.tags || []).map(t => <span key={t} className="admin-item-tag">{t}</span>)}
                </div>
              </div>
              <div className="admin-item-actions">
                <VisibilityToggle visible={item.visible} onChange={() => toggleVisible(item)} />
                <button className="admin-btn-secondary" onClick={() => startEdit(item)}>Edit</button>
                <button className="admin-btn-danger" onClick={() => setDelTarget(item.id)}>Del</button>
              </div>
            </div>
            {editing === item.id && (
              <div className="admin-edit-form" style={{ marginTop: 14 }}>
                <div className="admin-field-row">
                  <div className="admin-field">
                    <label className="admin-field-label">Icon</label>
                    <input className="admin-field-input" value={form.icon} onChange={e => set("icon", e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label className="admin-field-label">Title</label>
                    <input className="admin-field-input" value={form.title} onChange={e => set("title", e.target.value)} />
                  </div>
                </div>
                <div className="admin-field">
                  <label className="admin-field-label">Description</label>
                  <textarea className="admin-field-textarea" value={form.desc} onChange={e => set("desc", e.target.value)} rows={3} />
                </div>
                <div className="admin-field-row">
                  <div className="admin-field">
                    <label className="admin-field-label">Tags (comma-separated)</label>
                    <input className="admin-field-input" value={(form.tags || []).join(", ")} onChange={e => setTags(e.target.value)} />
                  </div>
                  <div className="admin-field">
                    <label className="admin-field-label">Color</label>
                    <input className="admin-field-input" value={form.color} onChange={e => set("color", e.target.value)} />
                  </div>
                </div>
                <div className="admin-form-actions">
                  <button className="admin-btn-secondary" onClick={cancel}>Cancel</button>
                  <button className="admin-btn-save" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {services.length === 0 && <div className="admin-empty">No services yet. Add one above.</div>}
      </div>
    </div>
  );
}
