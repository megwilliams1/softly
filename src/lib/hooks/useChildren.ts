"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "softly:garden:children";

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

export function useChildren() {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setChildren(JSON.parse(stored));
    } catch {}
  }, []);

  function addChild(name: string, color: string) {
    const child: Child = { id: crypto.randomUUID(), name, color };
    setChildren((prev) => {
      const next = [...prev, child];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function removeChild(id: string) {
    setChildren((prev) => {
      const next = prev.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { children, addChild, removeChild };
}
