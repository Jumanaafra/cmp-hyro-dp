import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
// NOTE: updateDoc is intentionally NOT imported — we use setDoc with merge:true
// everywhere so saves never fail on missing documents.
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./config";

/* ── Collection helpers ── */
export const col = (name) => collection(db, name);
export const docRef = (name, id) => doc(db, name, id);

/* ── Read all docs from a collection (ordered by `order` field if exists) ── */
export async function fetchCollection(name) {
  const snap = await getDocs(col(name));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ── Real-time listener (returns unsubscribe fn) ── */
export function subscribeCollection(name, callback, orderField = "order") {
  const q = query(col(name), orderBy(orderField, "asc"));
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
}

/* ── Real-time listener for a single document ── */
export function subscribeDoc(name, id, callback) {
  return onSnapshot(docRef(name, id), (snap) => {
    if (snap.exists()) callback({ id: snap.id, ...snap.data() });
    else callback(null);
  });
}

/* ── Create a new document (auto-id) ── */
export async function createDoc(name, data) {
  const ref = await addDoc(col(name), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/* ── Create / overwrite a document with specific ID (full overwrite) ── */
export async function setDocument(name, id, data) {
  await setDoc(docRef(name, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * updateDocument — the KEY fix:
 * Uses setDoc with { merge: true } instead of updateDoc().
 *
 * WHY: updateDoc() throws "No document to update" if the document does
 * not yet exist (fresh Firebase project / first save ever).
 * setDoc with merge:true creates the document if missing, or merges
 * the provided fields into the existing document if it already exists.
 * This makes it safe for both CREATE and UPDATE in one call.
 */
export async function updateDocument(name, id, data) {
  // Strip any undefined values so Firestore doesn't reject them
  const clean = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined)
  );
  await setDoc(docRef(name, id), {
    ...clean,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

/**
 * upsertDocument — explicit alias for clarity in admin sections.
 * Identical behaviour to the fixed updateDocument above.
 */
export async function upsertDocument(name, id, data) {
  return updateDocument(name, id, data);
}

/* ── Delete a document ── */
export async function deleteDocument(name, id) {
  await deleteDoc(docRef(name, id));
}

/* ── Upload file to Firebase Storage ── */
export function uploadFile(path, file, onProgress) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      (snap) => {
        const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
        if (onProgress) onProgress(pct);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

/* ── Delete file from Firebase Storage ── */
export async function deleteFile(url) {
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (e) {
    console.warn("Could not delete file:", e.message);
  }
}

/* ── Batch update order for a list of documents ── */
export async function batchUpdateOrder(name, items) {
  const batch = writeBatch(db);
  items.forEach((item, idx) => {
    batch.update(docRef(name, item.id), { order: idx });
  });
  await batch.commit();
}
