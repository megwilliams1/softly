"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Child = {
  id: string;
  name: string;
  color: string;
};

export const CHILD_COLORS = [
  "#f2c4ce", // bloom pink
  "#a8b89a", // sage
  "#f7e6b0", // butter
  "#d4c5e2", // lavender
  "#ffb085", // peach
  "#7dbe8e", // mint
  "#a8bfd4", // sky
  "#d4845a", // terra
];

export function useChildren(uid: string | null) {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    if (!uid) return;
    const q = collection(db, "users", uid, "children");
    const unsubscribe = onSnapshot(q, (snap) => {
      setChildren(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Child[]);
    }, (err) => {
      console.error("Children listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  async function addChild(name: string, color: string) {
    if (!uid) return;
    await addDoc(collection(db, "users", uid, "children"), { name, color });
  }

  async function updateChild(id: string, updates: Partial<{ name: string; color: string }>) {
    if (!uid) return;
    await updateDoc(doc(db, "users", uid, "children", id), updates);
  }

  async function removeChild(id: string) {
    if (!uid) return;
    await deleteDoc(doc(db, "users", uid, "children", id));
  }

  return { children, addChild, updateChild, removeChild };
}
