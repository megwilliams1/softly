"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "softly:sanctuary:mood";

export type MoodKey = "radiant" | "content" | "okay" | "low" | "drained";
export type MoodHistory = Record<string, MoodKey>; // date (YYYY-MM-DD) → mood

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function useMood() {
  const [history, setHistory] = useState<MoodHistory>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {}
  }, []);

  const todayMood = history[todayKey()] ?? null;

  function setMood(mood: MoodKey) {
    const next = { ...history, [todayKey()]: mood };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setHistory(next);
  }

  return { todayMood, setMood };
}
