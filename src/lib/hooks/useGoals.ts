"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Goal = {
  id: string;
  text: string;
  startDate: string;
  checkIns: string[]; // "YYYY-MM-DD" date keys
  completed: boolean;
  createdAt: Timestamp | null;
};

export function getPlantStage(checkIns: string[]): 0 | 1 | 2 | 3 | 4 {
  const n = checkIns.length;
  if (n === 0) return 0;
  if (n <= 2) return 1;
  if (n <= 5) return 2;
  if (n <= 10) return 3;
  return 4;
}

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function useGoals(uid: string | null) {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    if (!uid) return;
    const q = collection(db, "users", uid, "goals");
    const unsubscribe = onSnapshot(q, (snap) => {
      setGoals(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Goal[]);
    });
    return unsubscribe;
  }, [uid]);

  const today = todayKey();
  const activeGoal = goals.find((g) => !g.completed) ?? null;
  const archivedGoals = goals.filter((g) => g.completed);
  const checkedInToday = activeGoal?.checkIns.includes(today) ?? false;

  async function addGoal(text: string) {
    if (!uid) return;
    await addDoc(collection(db, "users", uid, "goals"), {
      text,
      startDate: today,
      checkIns: [],
      completed: false,
      createdAt: serverTimestamp(),
    });
  }

  async function checkIn() {
    if (!uid || !activeGoal || checkedInToday) return;
    await updateDoc(doc(db, "users", uid, "goals", activeGoal.id), {
      checkIns: [...activeGoal.checkIns, today],
    });
  }

  async function completeGoal() {
    if (!uid || !activeGoal) return;
    await updateDoc(doc(db, "users", uid, "goals", activeGoal.id), {
      completed: true,
    });
  }

  async function deleteGoal(id: string) {
    if (!uid) return;
    await deleteDoc(doc(db, "users", uid, "goals", id));
  }

  return {
    activeGoal,
    archivedGoals,
    checkedInToday,
    addGoal,
    checkIn,
    completeGoal,
    deleteGoal,
  };
}
