"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "softly:sanctuary:gratitude";

export type GratitudeEntry = [string, string, string];
export type GratitudeHistory = Record<string, GratitudeEntry>;

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function useGratitude() {
  const [history, setHistory] = useState<GratitudeHistory>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {}
  }, []);

  const todayEntry = history[todayKey()] ?? null;
  const yesterdayEntry = history[yesterdayKey()] ?? null;

  function saveEntry(entries: GratitudeEntry) {
    const next = { ...history, [todayKey()]: entries };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setHistory(next);
  }

  return { todayEntry, yesterdayEntry, saveEntry };
}
