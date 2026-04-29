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
export function mergeMeals(data: Partial<MealsData>): MealsData {
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

function currentWeekKey(): string {
  const d = new Date();
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - d.getDay());
  return sunday.toISOString().split("T")[0];
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
    const weekKey = currentWeekKey();
    const currentRef = doc(db, "users", uid, "meals", "current");
    const archiveRef = doc(db, "users", uid, "meals", weekKey);
    try {
      await updateDoc(currentRef, { [`${day}.${time}`]: value });
      await updateDoc(archiveRef, { [`${day}.${time}`]: value });
    } catch {
      const base = emptyMeals();
      base[day][time] = value;
      await setDoc(currentRef, base);
      await setDoc(archiveRef, base);
    }
  }

  async function copyWeekToCurrents(data: MealsData) {
    if (!uid) return;
    const weekKey = currentWeekKey();
    await setDoc(doc(db, "users", uid, "meals", "current"), data);
    await setDoc(doc(db, "users", uid, "meals", weekKey), data);
  }

  return { meals, setMeal, copyWeekToCurrent: copyWeekToCurrents };
}
