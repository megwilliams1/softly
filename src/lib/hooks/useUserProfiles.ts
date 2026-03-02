"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type UserProfile = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: Timestamp | null;
};

export function useUserProfiles() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "users"))
      .then((snap) => {
        setProfiles(
          snap.docs.map((d) => ({
            uid: d.id,
            displayName: d.data().displayName ?? null,
            email: d.data().email ?? null,
            photoURL: d.data().photoURL ?? null,
            createdAt: d.data().createdAt ?? null,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { profiles, loading };
}
