"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type MoodKey = "radiant" | "content" | "okay" | "low" | "drained";
export type MoodHistory = Record<string, MoodKey>; // date (YYYY-MM-DD) → mood

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function useMood(uid: string | null) {
  const [history, setHistory] = useState<MoodHistory>({});

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "mood", "current");
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) setHistory(snap.data() as MoodHistory);
    }, (err) => {
      console.error("Mood listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  const todayMood = history[todayKey()] ?? null;

  async function setMood(mood: MoodKey) {
    if (!uid) return;
    const ref = doc(db, "users", uid, "mood", "current");
    const next = { ...history, [todayKey()]: mood };
    await setDoc(ref, next);
    setHistory(next);
  }

  return { todayMood, setMood };
}
