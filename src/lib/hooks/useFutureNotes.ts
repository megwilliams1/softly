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

export type FutureNote = {
  id: string;
  text: string;
  deliveryDate: string; // YYYY-MM-DD
  delivered: boolean;
  createdAt: number;
};

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function useFutureNotes(uid: string | null) {
  const [notes, setNotes] = useState<FutureNote[]>([]);

  useEffect(() => {
    if (!uid) return;
    const q = collection(db, "users", uid, "futureNotes");
    const unsubscribe = onSnapshot(q, (snap) => {
      setNotes(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as FutureNote))
          .sort((a, b) => a.createdAt - b.createdAt)
      );
    }, (err) => {
      console.error("FutureNotes listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  const today = todayKey();
  const dueNotes = notes.filter((n) => n.deliveryDate <= today && !n.delivered);

  async function addNote(text: string, deliveryDate: string) {
    if (!uid) return;
    await addDoc(collection(db, "users", uid, "futureNotes"), {
      text,
      deliveryDate,
      delivered: false,
      createdAt: Date.now(),
    });
  }

  async function markDelivered(id: string) {
    if (!uid) return;
    await updateDoc(doc(db, "users", uid, "futureNotes", id), { delivered: true });
  }

  async function deleteNote(id: string) {
    if (!uid) return;
    await deleteDoc(doc(db, "users", uid, "futureNotes", id));
  }

  return { notes, dueNotes, addNote, markDelivered, deleteNote };
}
