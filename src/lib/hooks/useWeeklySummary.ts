"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { MoodKey, MoodHistory } from "@/lib/hooks/useMood";
import type { GratitudeHistory } from "@/lib/hooks/useGratitude";
import type { Goal } from "@/lib/hooks/useGoals";
import { getSummaryLines, type SummaryLines } from "@/lib/utils/summaryMessages";

function getLast7Keys(): string[] {
  const keys: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    keys.push(d.toISOString().split("T")[0]);
  }
  return keys;
}

function getDominantMood(history: MoodHistory, keys: string[]): MoodKey | null {
  const counts: Partial<Record<MoodKey, number>> = {};
  for (const key of keys) {
    const m = history[key];
    if (m) counts[m] = (counts[m] ?? 0) + 1;
  }
  let top: MoodKey | null = null;
  let max = 0;
  for (const [mood, count] of Object.entries(counts) as [MoodKey, number][]) {
    if (count > max) {
      max = count;
      top = mood;
    }
  }
  return top;
}

function countGratitudes(history: GratitudeHistory, keys: string[]): number {
  let total = 0;
  for (const key of keys) {
    const entry = history[key];
    if (entry) total += entry.filter((s) => s.trim().length > 0).length;
  }
  return total;
}

export function useWeeklySummary(uid: string | null) {
  const [moodHistory, setMoodHistory] = useState<MoodHistory>({});
  const [gratitudeHistory, setGratitudeHistory] = useState<GratitudeHistory>({});
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(doc(db, "users", uid, "mood", "current"), (snap) => {
      if (snap.exists()) setMoodHistory(snap.data() as MoodHistory);
    }, (err) => {
      console.error("Weekly summary mood listener error:", err);
    });
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(doc(db, "users", uid, "gratitude", "current"), (snap) => {
      if (snap.exists()) setGratitudeHistory(snap.data() as GratitudeHistory);
    }, (err) => {
      console.error("Weekly summary gratitude listener error:", err);
    });
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(collection(db, "users", uid, "goals"), (snap) => {
      setGoals(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Goal[]);
    }, (err) => {
      console.error("Weekly summary goals listener error:", err);
    });
  }, [uid]);

  const last7 = getLast7Keys();
  const goalCheckInDates = new Set(goals.flatMap((g) => g.checkIns));

  // A day counts as "shown up" if any data was logged that day
  const daysShown = last7.filter(
    (key) =>
      moodHistory[key] != null ||
      (gratitudeHistory[key] != null &&
        gratitudeHistory[key].some((s) => s.trim().length > 0)) ||
      goalCheckInDates.has(key)
  ).length;

  const gratitudeCount = countGratitudes(gratitudeHistory, last7);
  const dominantMood = getDominantMood(moodHistory, last7);
  const isSunday = new Date().getDay() === 0;

  const summaryLines: SummaryLines = getSummaryLines({
    daysShown,
    gratitudeCount,
    dominantMood,
  });

  return { daysShown, gratitudeCount, dominantMood, summaryLines, isSunday };
}
