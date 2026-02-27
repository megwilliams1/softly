"use client";

import { useState, useEffect } from "react";
import { DayKey } from "./useMeals";

const STORAGE_KEY = "softly:garden:activities";

export type Activity = {
  id: string;
  childId: string;
  day: DayKey;
  time: string;
  label: string;
};

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setActivities(JSON.parse(stored));
    } catch {}
  }, []);

  function addActivity(data: Omit<Activity, "id">) {
    setActivities((prev) => {
      const next = [...prev, { ...data, id: crypto.randomUUID() }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function updateActivity(id: string, updates: Partial<Omit<Activity, "id">>) {
    setActivities((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...updates } : a));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function deleteActivity(id: string) {
    setActivities((prev) => {
      const next = prev.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { activities, addActivity, updateActivity, deleteActivity };
}
