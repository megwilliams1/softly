"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "softly:sanctuary:reminders";

export type Reminder = {
  id: string;
  text: string;
  emoji: string;
  doneDate: string | null; // YYYY-MM-DD if done today, null otherwise
};

export function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setReminders(JSON.parse(stored));
    } catch {}
  }, []);

  function persist(next: Reminder[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setReminders(next);
  }

  function addReminder(text: string, emoji: string) {
    persist([
      ...reminders,
      { id: crypto.randomUUID(), text, emoji, doneDate: null },
    ]);
  }

  function toggleDone(id: string) {
    const today = todayKey();
    persist(
      reminders.map((r) =>
        r.id === id
          ? { ...r, doneDate: r.doneDate === today ? null : today }
          : r
      )
    );
  }

  function deleteReminder(id: string) {
    persist(reminders.filter((r) => r.id !== id));
  }

  return { reminders, addReminder, toggleDone, deleteReminder };
}
