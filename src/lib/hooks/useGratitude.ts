"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export function useGratitude(uid: string | null) {
  const [history, setHistory] = useState<GratitudeHistory>({});

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "gratitude", "current");
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) setHistory(snap.data() as GratitudeHistory);
    }, (err) => {
      console.error("Gratitude listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  const todayEntry = history[todayKey()] ?? null;
  const yesterdayEntry = history[yesterdayKey()] ?? null;

  async function saveEntry(entries: GratitudeEntry) {
    if (!uid) return;
    const ref = doc(db, "users", uid, "gratitude", "current");
    const next = { ...history, [todayKey()]: entries };
    await setDoc(ref, next);
    setHistory(next);
  }

  return { todayEntry, yesterdayEntry, saveEntry };
}
