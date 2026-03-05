"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type TinyWin = {
  id: string;
  text: string;
  emoji: string;
  createdAt: number;
};

export function useTinyWins(uid: string | null) {
  const [wins, setWins] = useState<TinyWin[]>([]);

  useEffect(() => {
    if (!uid) return;
    const q = collection(db, "users", uid, "tinyWins");
    const unsubscribe = onSnapshot(q, (snap) => {
      setWins(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as TinyWin))
          .sort((a, b) => b.createdAt - a.createdAt)
      );
    }, (err) => {
      console.error("TinyWins listener error:", err);
    });
    return unsubscribe;
  }, [uid]);

  async function addWin(text: string, emoji: string) {
    if (!uid) return;
    await addDoc(collection(db, "users", uid, "tinyWins"), {
      text,
      emoji,
      createdAt: Date.now(),
    });
  }

  async function deleteWin(id: string) {
    if (!uid) return;
    await deleteDoc(doc(db, "users", uid, "tinyWins", id));
  }

  return { wins, addWin, deleteWin };
}
