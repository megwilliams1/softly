"use client";

import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let redirectDone = false;

    // Complete any pending Google sign-in redirect
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setDoc(
            doc(db, "users", result.user.uid),
            { displayName: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL },
            { merge: true }
          ).catch(() => {});
        }
      })
      .catch((err) => {
        console.error("Google redirect sign-in error:", err);
      })
      .finally(() => {
        redirectDone = true;
        // If onAuthStateChanged already fired with null while we were
        // waiting for the redirect check, we can now safely stop loading.
        setLoading(false);
      });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // Only stop loading if we have a user (cached session) OR the
      // redirect check is done. This prevents the flash of the login
      // page when returning from Google sign-in.
      if (firebaseUser || redirectDone) {
        setLoading(false);
      }
      // Backfill profile doc for users who signed up before Firestore writes were added
      if (firebaseUser) {
        setDoc(
          doc(db, "users", firebaseUser.uid),
          {
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL ?? null,
          },
          { merge: true }
        ).catch(() => {});
      }
    });
    return unsubscribe;
  }, []);

  async function signIn() {
    const provider = new GoogleAuthProvider();
    // signInWithRedirect navigates the page to Google, then back.
    // Profile upsert happens in the getRedirectResult handler above.
    await signInWithRedirect(auth, provider);
  }

  async function signUpWithEmail(displayName: string, email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });
    // Non-blocking — profile write failure never prevents sign-up redirect
    setDoc(doc(db, "users", credential.user.uid), {
      displayName,
      email: credential.user.email,
      photoURL: null,
      createdAt: serverTimestamp(),
    }).catch(() => {});
  }

  async function signInWithEmail(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = credential;
    setDoc(doc(db, "users", user.uid), {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }, { merge: true }).catch(() => {});
  }

  async function updateUserProfile(newDisplayName: string, newPhotoURL: string | null) {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName: newDisplayName, photoURL: newPhotoURL });
    setDoc(doc(db, "users", auth.currentUser.uid), {
      displayName: newDisplayName,
      photoURL: newPhotoURL,
    }, { merge: true }).catch(() => {});
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  return { user, loading, signIn, signUpWithEmail, signInWithEmail, updateUserProfile, resetPassword, signOut };
}
