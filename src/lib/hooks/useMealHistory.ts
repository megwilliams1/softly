"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type MealsData, mergeMeals } from "./useMeals";

export type MealWeek = {
  weekKey: string;
  meals: MealsData;
};

export function useMealHistory(uid: string | null) {
  const [history, setHistory] = useState<MealWeek[]>([]);

  useEffect(() => {
    if (!uid) return;
    const ref = collection(db, "users", uid, "meals");
    const unsubscribe = onSnapshot(ref, (snap) => {
      const weeks: MealWeek[] = snap.docs
        .filter((d) => d.id !== "current")
        .map((d) => ({ weekKey: d.id, meals: mergeMeals(d.data()) }))
        .sort((a, b) => b.weekKey.localeCompare(a.weekKey));
      setHistory(weeks);
    }, (err) => {
      console.error("Meal history listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  return { history };
}
