"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type MealTime = "breakfast" | "lunch" | "dinner";
export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type MealsData = Record<DayKey, Record<MealTime, string>>;

const DAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const MEAL_TIMES: MealTime[] = ["breakfast", "lunch", "dinner"];

function emptyMeals(): MealsData {
  return Object.fromEntries(
    DAYS.map((day) => [
      day,
      Object.fromEntries(MEAL_TIMES.map((t) => [t, ""])),
    ])
  ) as MealsData;
}

export function useMeals(uid: string | null) {
  const [meals, setMealsState] = useState<MealsData>(emptyMeals());

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "meals", "current");
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setMealsState((prev) => ({ ...emptyMeals(), ...prev, ...(snap.data() as MealsData) }));
      }
    });
    return unsubscribe;
  }, [uid]);

  async function setMeal(day: DayKey, time: MealTime, value: string) {
    if (!uid) return;
    const ref = doc(db, "users", uid, "meals", "current");
    await setDoc(ref, { [day]: { [time]: value } }, { merge: true });
  }

  return { meals, setMeal };
}
