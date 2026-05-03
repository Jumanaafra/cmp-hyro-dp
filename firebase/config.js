import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Guard: only initialise if all required keys are present
const isConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId &&
  firebaseConfig.apiKey !== "undefined" &&
  firebaseConfig.projectId !== "undefined"
);

let app, db, storage, auth;

try {
  app = getApps().length ? getApps()[0] : initializeApp(isConfigured ? firebaseConfig : { apiKey: "placeholder", authDomain: "placeholder.firebaseapp.com", projectId: "placeholder", storageBucket: "placeholder.appspot.com", messagingSenderId: "000000000000", appId: "1:000000000000:web:0000000000000000" });
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
} catch (e) {
  console.warn("[Hyro Vision] Firebase init skipped — running in fallback-only mode.", e.message);
  // Create minimal stubs so imports don't crash
  db = null;
  storage = null;
  auth = null;
}

export { db, storage, auth };
export default app;
