"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "softly:reset:history";

type ResetEntry = {
  weekKey: string;
  weekMood: string;
  intention: string;
  completedAt: string;
};

export function thisWeekSunday(): string {
  const d = new Date();
  const offset = d.getDay(); // 0=Sun, so offset 0 means today is Sunday
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - offset);
  return sunday.toISOString().split("T")[0];
}

export function useWeeklyReset() {
  const [history, setHistory] = useState<ResetEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {}
  }, []);

  const weekKey = thisWeekSunday();
  const thisWeekDone = history.some((e) => e.weekKey === weekKey);

  function saveReset(weekMood: string, intention: string) {
    const entry: ResetEntry = {
      weekKey,
      weekMood,
      intention,
      completedAt: new Date().toISOString(),
    };
    const next = [...history.filter((e) => e.weekKey !== weekKey), entry];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setHistory(next);
  }

  return { thisWeekDone, saveReset };
}
