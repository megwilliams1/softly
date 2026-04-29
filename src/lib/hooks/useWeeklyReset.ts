"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ResetEntry = {
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

export function useWeeklyReset(uid: string | null) {
  const [history, setHistory] = useState<ResetEntry[]>([]);

  useEffect(() => {
    if (!uid) return;
    const q = collection(db, "users", uid, "weeklyResets");
    const unsubscribe = onSnapshot(q, (snap) => {
      setHistory(snap.docs.map((d) => d.data() as ResetEntry));
    }, (err) => {
      console.error("Weekly reset listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  const weekKey = thisWeekSunday();
  const thisWeekDone = history.some((e) => e.weekKey === weekKey);

  async function saveReset(weekMood: string, intention: string) {
    if (!uid) return;
    const entry: ResetEntry = {
      weekKey,
      weekMood,
      intention,
      completedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "users", uid, "weeklyResets", weekKey), entry);
  }

  const pastEntries = [...history].sort((a, b) => b.weekKey.localeCompare(a.weekKey));

  return { thisWeekDone, saveReset, pastEntries };
}
