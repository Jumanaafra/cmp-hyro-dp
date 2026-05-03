import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./config";

/* ── Collection helpers ── */
export const col = (name) => db ? collection(db, name) : null;
export const docRef = (name, id) => db ? doc(db, name, id) : null;

/* ── Read all docs from a collection (ordered by `order` field if exists) ── */
export async function fetchCollection(name) {
  const snap = await getDocs(col(name));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ── Real-time listener (returns unsubscribe fn) ── */
export function subscribeCollection(name, callback, orderField = "order") {
  if (!db) { callback([]); return () => {}; }
  const q = query(col(name), orderBy(orderField, "asc"));
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
}

/* ── Real-time listener for a single document ── */
export function subscribeDoc(name, id, callback) {
  if (!db) { callback(null); return () => {}; }
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

/* ── Create / overwrite a document with specific ID ── */
export async function setDocument(name, id, data) {
  await setDoc(docRef(name, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/* ── Update specific fields on a document ── */
export async function updateDocument(name, id, data) {
  await updateDoc(docRef(name, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
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
