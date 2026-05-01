import { useState, useEffect } from "react";
import { subscribeCollection, subscribeDoc } from "../firebase/firestore";

/**
 * useFirestoreCollection — real-time listener for an ordered collection.
 * Returns { data: [], loading: bool, error: string|null }
 */
export function useFirestoreCollection(collectionName, orderField = "order") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeCollection(
      collectionName,
      (docs) => {
        setData(docs);
        setLoading(false);
      },
      orderField
    );
    return () => unsub();
  }, [collectionName, orderField]);

  return { data, loading, error };
}

/**
 * useFirestoreDoc — real-time listener for a single document.
 * Returns { data: {}, loading: bool, error: string|null }
 */
export function useFirestoreDoc(collectionName, docId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeDoc(collectionName, docId, (doc) => {
      setData(doc);
      setLoading(false);
    });
    return () => unsub();
  }, [collectionName, docId]);

  return { data, loading, error };
}
