import { useState } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { createDoc, updateDocument, deleteDocument, batchUpdateOrder } from "../../firebase/firestore";
import { useToast, ConfirmDialog, OrderButtons, VisibilityToggle } from "../adminUtils";

const BLANK = {
  name: "", tagline: "", desc: "", badge: "🔥 New", badgeColor: "#14B8A6",
  stats: [{ v: "", l: "" }, { v: "", l: "" }, { v: "", l: "" }],
  tags: [], gradient: "linear-gradient(135deg, rgba(20,184,166,0.15), rgba(59,130,246,0.08))",
  border: "rgba(20,184,166,0.35)", glow: "#14B8A6", visible: true,
};

export default function ProductsAdmin() {
  const { data: products, loading } = useFirestoreCollection("products");
  const { show, ToastEl } = useToast();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [delTarget, setDelTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const startAdd = () => { setForm({ ...BLANK, stats: [{ v: "", l: "" }, { v: "", l: "" }, { v: "", l: "" }] }); setEditing("new"); };
  const startEdit = (item) => { setForm({ ...item }); setEditing(item.id); };
  const cancel = () => { setEditing(null); };
  const set = (f, v) => setForm(fm => ({ ...fm, [f]: v }));
  const setTags = (v) => setForm(fm => ({ ...fm, tags: v.split(",").map(t => t.trim()).filter(Boolean) }));
  const setStat = (idx, key, val) => setForm(fm => {
    const arr = [...(fm.stats || [])];
    arr[idx] = { ...arr[idx], [key]: val };
    return { ...fm, stats: arr };
  });

  const save = async () => {
    if (!form.name.trim()) return show("Name is required", "error");
    setSaving(true);
    try {
      if (editing === "new") {
        await createDoc("products", { ...form, order: products.length });
        show("Product created!");
      } else {
        await updateDocument("products", editing, form);
        show("Product updated!");
      }
      cancel();
    } catch (e) { show(e.message, "error"); } finally { setSaving(false); }
  };

  const toggleVisible = async (item) => {
    await updateDocument("products", item.id, { visible: !item.visible });
    show(item.visible ? "Product hidden" : "Product shown");
  };

  const confirmDelete = async () => {
    await deleteDocument("products", delTarget);
    setDelTarget(null);
    show("Product deleted");
  };

  const moveItem = async (idx, dir) => {
    const arr = [...products];
    const si = dir === "up" ? idx - 1 : idx + 1;
    [arr[idx], arr[si]] = [arr[si], arr[idx]];
    await batchUpdateOrder("products", arr);
  };

  const EditForm = () => (
    <div className="admin-edit-form" style={{ marginBottom: 16 }}>
      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Name</label>
          <input className="admin-field-input" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Badge</label>
          <input className="admin-field-input" value={form.badge} onChange={e => set("badge", e.target.value)} />
        </div>
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Tagline</label>
        <input className="admin-field-input" value={form.tagline} onChange={e => set("tagline", e.target.value)} />
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
          <label className="admin-field-label">Glow Color</label>
          <input className="admin-field-input" value={form.glow} onChange={e => set("glow", e.target.value)} />
        </div>
      </div>
      <div>
        <label className="admin-field-label" style={{ display: "block", marginBottom: 8 }}>Stats (value + label)</label>
        {(form.stats || []).map((s, i) => (
          <div key={i} className="admin-field-row" style={{ marginBottom: 8 }}>
            <div className="admin-field"><label className="admin-field-label">Value</label><input className="admin-field-input" value={s.v} onChange={e => setStat(i, "v", e.target.value)} /></div>
            <div className="admin-field"><label className="admin-field-label">Label</label><input className="admin-field-input" value={s.l} onChange={e => setStat(i, "l", e.target.value)} /></div>
          </div>
        ))}
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
      {delTarget && <ConfirmDialog message="Delete this product? This cannot be undone." onConfirm={confirmDelete} onCancel={() => setDelTarget(null)} />}
      <div className="admin-section-header">
        <div><div className="admin-section-title">Products</div><div className="admin-section-desc">{products.length} products</div></div>
        <button className="admin-btn-add" onClick={startAdd}>+ Add Product</button>
      </div>
      {editing === "new" && <EditForm />}
      <div className="admin-card-list">
        {products.map((item, idx) => (
          <div key={item.id} className="admin-item-card">
            <div className="admin-item-row">
              <OrderButtons idx={idx} total={products.length} onMoveUp={i => moveItem(i, "up")} onMoveDown={i => moveItem(i, "down")} />
              <div className="admin-item-icon">{item.badge?.split(" ")[0] || "📦"}</div>
              <div className="admin-item-info">
                <div className="admin-item-title" style={{ color: item.glow }}>{item.name}</div>
                <div className="admin-item-desc">{item.tagline}</div>
                <div className="admin-item-tags">{(item.tags || []).map(t => <span key={t} className="admin-item-tag">{t}</span>)}</div>
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
        {products.length === 0 && <div className="admin-empty">No products yet.</div>}
      </div>
    </div>
  );
}
