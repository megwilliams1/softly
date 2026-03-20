"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { type User } from "firebase/auth";
import { db } from "@/lib/firebase";

// ─── Types ────────────────────────────────────────────

export type RecipeType = "linked" | "original";
export type RecipeCategory = "breakfast" | "lunch" | "dinner" | "dessert" | "snack" | "drinks" | "other";

export interface Recipe {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  authorPhoto: string;
  type: RecipeType;
  category?: RecipeCategory;
  imageUrl?: string;
  recipeUrl?: string;
  ingredients?: string[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  createdAt: Timestamp;
}

export type RecipeInput = Omit<Recipe, "id" | "createdAt" | "authorId" | "authorName" | "authorPhoto">;

// ─── Hook ─────────────────────────────────────────────

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "recipes"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Recipe[];
        setRecipes(data);
        setLoading(false);
      },
      (err) => {
        console.error("Recipes listener error:", err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  async function submitRecipe(input: RecipeInput, user: User) {
    await addDoc(collection(db, "recipes"), {
      ...input,
      authorId:    user.uid,
      authorName:  user.displayName ?? "Anonymous",
      authorPhoto: user.photoURL ?? "",
      createdAt:   serverTimestamp(),
    });
  }

  async function deleteRecipe(recipeId: string) {
    await deleteDoc(doc(db, "recipes", recipeId));
  }

  async function updateRecipe(recipeId: string, updates: Partial<RecipeInput>) {
    await updateDoc(doc(db, "recipes", recipeId), updates);
  }

  return { recipes, loading, submitRecipe, deleteRecipe, updateRecipe };
}
