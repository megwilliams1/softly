"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ChecklistTab = "groceries" | "errands";

export type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};

export type ChecklistData = Record<ChecklistTab, ChecklistItem[]>;

function emptyChecklist(): ChecklistData {
  return { groceries: [], errands: [] };
}

export function useChecklist(uid: string | null) {
  const [data, setData] = useState<ChecklistData>(emptyChecklist);

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "checklist", "current");
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) setData(snap.data() as ChecklistData);
    }, (err) => {
      console.error("Checklist listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  async function persist(next: ChecklistData) {
    if (!uid) return;
    const ref = doc(db, "users", uid, "checklist", "current");
    await setDoc(ref, next);
    setData(next);
  }

  function addItem(tab: ChecklistTab, label: string) {
    const item: ChecklistItem = {
      id: crypto.randomUUID(),
      label,
      checked: false,
    };
    persist({ ...data, [tab]: [...data[tab], item] });
  }

  function toggleItem(tab: ChecklistTab, id: string) {
    persist({
      ...data,
      [tab]: data[tab].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    });
  }

  function clearCompleted(tab: ChecklistTab) {
    persist({ ...data, [tab]: data[tab].filter((item) => !item.checked) });
  }

  return { data, addItem, toggleItem, clearCompleted };
}
