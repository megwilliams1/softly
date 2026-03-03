"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
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

/** Deep-merge Firestore data onto the empty template so every day always has all three meal times. */
function mergeMeals(data: Partial<MealsData>): MealsData {
  const base = emptyMeals();
  for (const day of DAYS) {
    if (data[day]) {
      for (const time of MEAL_TIMES) {
        if (typeof data[day]![time] === "string") {
          base[day][time] = data[day]![time];
        }
      }
    }
  }
  return base;
}

export function useMeals(uid: string | null) {
  const [meals, setMealsState] = useState<MealsData>(emptyMeals());

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "meals", "current");
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setMealsState(mergeMeals(snap.data() as Partial<MealsData>));
      }
    }, (err) => {
      console.error("Meals listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  async function setMeal(day: DayKey, time: MealTime, value: string) {
    if (!uid) return;
    const ref = doc(db, "users", uid, "meals", "current");
    // Use dot notation with updateDoc so only the specific meal time field
    // is updated, not the entire day object (which would wipe sibling meals).
    try {
      await updateDoc(ref, { [`${day}.${time}`]: value });
    } catch {
      // Document doesn't exist yet — create it with the full template.
      const base = emptyMeals();
      base[day][time] = value;
      await setDoc(ref, base);
    }
  }

  return { meals, setMeal };
}
