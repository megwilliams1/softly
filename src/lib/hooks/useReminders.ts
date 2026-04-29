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

export type Reminder = {
  id: string;
  text: string;
  emoji: string;
  time: string | null;     // HH:MM (24h) — optional daily notification time
  doneDate: string | null; // YYYY-MM-DD if done today
};

export function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function useReminders(uid: string | null) {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    if (!uid) return;
    const q = collection(db, "users", uid, "reminders");
    const unsubscribe = onSnapshot(q, (snap) => {
      setReminders(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Reminder[]);
    }, (err) => {
      console.error("Reminders listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  async function addReminder(text: string, emoji: string, time: string | null = null) {
    if (!uid) return;
    await addDoc(collection(db, "users", uid, "reminders"), {
      text,
      emoji,
      time,
      doneDate: null,
    });
  }

  async function setReminderTime(id: string, time: string | null) {
    if (!uid) return;
    await updateDoc(doc(db, "users", uid, "reminders", id), { time });
  }

  async function toggleDone(id: string) {
    if (!uid) return;
    const reminder = reminders.find((r) => r.id === id);
    if (!reminder) return;
    const today = todayKey();
    await updateDoc(doc(db, "users", uid, "reminders", id), {
      doneDate: reminder.doneDate === today ? null : today,
    });
  }

  async function deleteReminder(id: string) {
    if (!uid) return;
    await deleteDoc(doc(db, "users", uid, "reminders", id));
  }

  return { reminders, addReminder, toggleDone, deleteReminder, setReminderTime };
}
