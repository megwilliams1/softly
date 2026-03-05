"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DayKey } from "./useMeals";

export type Activity = {
  id: string;
  childIds: string[];
  day: DayKey;
  time: string;
  label: string;
};

export function useActivities(uid: string | null) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!uid) return;
    const q = collection(db, "users", uid, "activities");
    const unsubscribe = onSnapshot(q, (snap) => {
      setActivities(
        snap.docs.map((d) => {
          const data = d.data();
          // Migrate old childId string → childIds array
          const childIds: string[] =
            Array.isArray(data.childIds)
              ? data.childIds
              : data.childId
              ? [data.childId]
              : [];
          return { id: d.id, ...data, childIds } as Activity;
        })
      );
    }, (err) => {
      console.error("Activities listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  async function addActivity(data: Omit<Activity, "id">) {
    if (!uid) return;
    await addDoc(collection(db, "users", uid, "activities"), data);
  }

  async function updateActivity(id: string, updates: Partial<Omit<Activity, "id">>) {
    if (!uid) return;
    await updateDoc(doc(db, "users", uid, "activities", id), updates);
  }

  async function deleteActivity(id: string) {
    if (!uid) return;
    await deleteDoc(doc(db, "users", uid, "activities", id));
  }

  return { activities, addActivity, updateActivity, deleteActivity };
}
