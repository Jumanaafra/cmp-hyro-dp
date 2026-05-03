// @refresh reset
/**
 * Shared Admin Utilities
 * - useToast: show success/error notifications
 * - reorderItem: move item up/down in array
 * - ConfirmDialog: delete confirmation modal
 */

import { useState, useCallback } from "react";

/* ── Toast hook ── */
export function useToast() {
  const [toast, setToast] = useState(null);

  const show = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const ToastEl = toast ? (
    <div className={`admin-toast${toast.type === "error" ? " error" : ""}`}>
      {toast.type === "success" ? "✓ " : "✕ "}
      {toast.msg}
    </div>
  ) : null;

  return { show, ToastEl };
}

/* ── Reorder helpers ── */
export function moveUp(arr, idx) {
  if (idx === 0) return arr;
  const next = [...arr];
  [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
  return next;
}

export function moveDown(arr, idx) {
  if (idx === arr.length - 1) return arr;
  const next = [...arr];
  [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
  return next;
}

/* ── Confirmation Dialog ── */
export function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="admin-overlay" onClick={onCancel}>
      <div className="admin-dialog" onClick={e => e.stopPropagation()}>
        <div className="admin-dialog-title">Are you sure?</div>
        <div className="admin-dialog-desc">{message}</div>
        <div className="admin-dialog-actions">
          <button className="admin-btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="admin-btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ── Image Upload Widget ── */
export function ImageUpload({ currentUrl, storagePath, onUploaded }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const { uploadFile } = await import("../firebase/firestore");
      const url = await uploadFile(storagePath || `uploads/${Date.now()}_${file.name}`, file, setProgress);
      onUploaded(url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const displayUrl = preview || currentUrl;

  return (
    <div className="admin-image-upload">
      {displayUrl && (
        <img src={displayUrl} alt="preview" className="admin-image-preview" />
      )}
      <label className="admin-upload-btn">
        📎 {uploading ? `Uploading ${Math.round(progress)}%` : "Choose Image"}
        <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      </label>
      {uploading && (
        <div className="admin-upload-progress">
          <div className="admin-upload-bar" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

/* ── Order control buttons ── */
export function OrderButtons({ idx, total, onMoveUp, onMoveDown }) {
  return (
    <div className="admin-order-btns">
      <button className="admin-order-btn" onClick={() => onMoveUp(idx)} disabled={idx === 0} title="Move up">▲</button>
      <button className="admin-order-btn" onClick={() => onMoveDown(idx)} disabled={idx === total - 1} title="Move down">▼</button>
    </div>
  );
}

/* ── Visibility toggle ── */
export function VisibilityToggle({ visible, onChange }) {
  return (
    <label className="admin-toggle" title={visible ? "Visible — click to hide" : "Hidden — click to show"}>
      <input type="checkbox" checked={!!visible} onChange={e => onChange(e.target.checked)} />
      <span className="admin-toggle-slider" />
    </label>
  );
}
