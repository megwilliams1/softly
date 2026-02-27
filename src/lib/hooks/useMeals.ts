"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "softly:garden:meals";

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

export function useMeals() {
  const [meals, setMeals] = useState<MealsData>(emptyMeals);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setMeals(JSON.parse(stored));
    } catch {}
  }, []);

  function setMeal(day: DayKey, time: MealTime, value: string) {
    setMeals((prev) => {
      const next = { ...prev, [day]: { ...prev[day], [time]: value } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { meals, setMeal };
}
