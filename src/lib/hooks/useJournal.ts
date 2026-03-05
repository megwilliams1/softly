"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MoodKey } from "./useMood";

export type JournalEntry = {
  text: string;
  mood: MoodKey | null;
  promptUsed: string | null;
  updatedAt: number;
};

type JournalData = Record<string, JournalEntry>;

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function useJournal(uid: string | null) {
  const [data, setData] = useState<JournalData>({});

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "journal", "entries");
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) setData(snap.data() as JournalData);
    }, (err) => {
      console.error("Journal listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  const todayEntry = data[todayKey()] ?? null;

  const fullHistory = Object.entries(data)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, entry]) => ({ date, ...entry }));

  async function saveEntry(text: string, mood: MoodKey | null, promptUsed: string | null) {
    if (!uid) return;
    const ref = doc(db, "users", uid, "journal", "entries");
    const entry: JournalEntry = { text, mood, promptUsed, updatedAt: Date.now() };
    const next = { ...data, [todayKey()]: entry };
    await setDoc(ref, next);
    setData(next);
  }

  return { todayEntry, fullHistory, saveEntry };
}
