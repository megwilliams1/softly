"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "softly:garden:checklist";

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

export function useChecklist() {
  const [data, setData] = useState<ChecklistData>(emptyChecklist);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setData(JSON.parse(stored));
    } catch {}
  }, []);

  function persist(next: ChecklistData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
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
