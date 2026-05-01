import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useToast, ConfirmDialog } from "../adminUtils";

export default function ContactSubmissionsAdmin() {
  const { show, ToastEl } = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delTarget, setDelTarget] = useState(null);
  const [filter, setFilter] = useState("all"); // all | unread | read

  useEffect(() => {
    const q = query(collection(db, "contact_submissions"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setSubmissions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const markRead = async (id) => {
    await updateDoc(doc(db, "contact_submissions", id), { read: true });
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "contact_submissions", delTarget));
    setDelTarget(null);
    show("Submission deleted");
  };

  const fmt = (ts) => {
    if (!ts) return "";
    try {
      return new Date(ts).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch { return ts; }
  };

  const filtered = submissions.filter(s => {
    if (filter === "unread") return !s.read;
    if (filter === "read") return s.read;
    return true;
  });

  const unreadCount = submissions.filter(s => !s.read).length;

  if (loading) return <div className="admin-skeleton" style={{ height: 300, borderRadius: 12 }} />;

  return (
    <div>
      {ToastEl}
      {delTarget && <ConfirmDialog message="Permanently delete this submission?" onConfirm={confirmDelete} onCancel={() => setDelTarget(null)} />}

      <div className="admin-section-header">
        <div>
          <div className="admin-section-title">
            Contact Submissions
            {unreadCount > 0 && <span className="admin-badge-num">{unreadCount} new</span>}
          </div>
          <div className="admin-section-desc">{submissions.length} total submissions from the contact form</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", "unread", "read"].map(f => (
            <button key={f} className={filter === f ? "admin-btn-save" : "admin-btn-secondary"} onClick={() => setFilter(f)} style={{ textTransform: "capitalize" }}>{f}</button>
          ))}
        </div>
      </div>

      <div className="admin-card-list">
        {filtered.map((s) => (
          <div key={s.id} className={`admin-submission-card ${!s.read ? "unread" : ""}`}>
            <div className="admin-submission-meta">
              <div className="admin-submission-name">{s.name}</div>
              <div className="admin-submission-email">{s.email}</div>
              {!s.read && <span className="admin-unread-badge">NEW</span>}
              <div className="admin-submission-time">{fmt(s.timestamp)}</div>
            </div>
            {s.subject && <div className="admin-submission-subject">📌 {s.subject}</div>}
            <div className="admin-submission-message">{s.message}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {!s.read && (
                <button className="admin-btn-secondary" onClick={() => markRead(s.id)} style={{ fontSize: 11 }}>✓ Mark as Read</button>
              )}
              <a href={`mailto:${s.email}`} className="admin-btn-save" style={{ textDecoration: "none", fontSize: 11, padding: "7px 14px" }}>Reply ↗</a>
              <button className="admin-btn-danger" onClick={() => setDelTarget(s.id)} style={{ marginLeft: "auto" }}>Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="admin-empty">
            {filter === "unread" ? "No unread messages." : "No submissions yet."}
          </div>
        )}
      </div>
    </div>
  );
}
