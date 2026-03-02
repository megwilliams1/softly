"use client";

import { useEffect } from "react";
import { ExternalLink, Trash2, X } from "lucide-react";
import { type Recipe } from "@/lib/hooks/useRecipes";
import { type User } from "firebase/auth";
import UserAvatar from "@/components/shared/UserAvatar";

interface Props {
  recipe: Recipe;
  currentUser: User | null;
  onDelete: () => void;
  onClose: () => void;
}

export default function RecipeDetailModal({ recipe, currentUser, onDelete, onClose }: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const isAuthor = currentUser?.uid === recipe.authorId;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(61, 53, 48, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "24px",
      }}
    >
      <div
        className="animate-bloom-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lift)",
          width: "100%",
          maxWidth: "560px",
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(255,255,255,0.8)",
            border: "none",
            borderRadius: "var(--radius-full)",
            cursor: "pointer",
            color: "var(--color-stone)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px",
            zIndex: 1,
          }}
        >
          <X size={16} />
        </button>

        {/* Image */}
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            style={{ width: "100%", height: "220px", objectFit: "cover", display: "block", borderRadius: "var(--radius-lg) var(--radius-lg) 0 0" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "220px",
              backgroundColor: "var(--color-butter)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3.5rem",
              borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
            }}
          >
            🍽️
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <UserAvatar photoURL={recipe.authorPhoto} displayName={recipe.authorName} size={24} />
            <span style={{ fontSize: "0.8rem", color: "var(--color-stone)", fontFamily: "var(--font-body)" }}>
              {recipe.authorName} shared a recipe
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              fontWeight: 500,
              color: "var(--color-soil)",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            {recipe.title}
          </h2>

          {/* Timing chips */}
          {recipe.type === "original" && (recipe.prepTime || recipe.cookTime || recipe.servings) && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
              {recipe.prepTime && (
                <span style={{ fontSize: "0.78rem", padding: "4px 10px", borderRadius: "var(--radius-full)", backgroundColor: "var(--color-cream)", color: "var(--color-stone)", border: "1px solid rgba(176, 168, 154, 0.3)", fontFamily: "var(--font-body)" }}>
                  Prep {recipe.prepTime}
                </span>
              )}
              {recipe.cookTime && (
                <span style={{ fontSize: "0.78rem", padding: "4px 10px", borderRadius: "var(--radius-full)", backgroundColor: "var(--color-cream)", color: "var(--color-stone)", border: "1px solid rgba(176, 168, 154, 0.3)", fontFamily: "var(--font-body)" }}>
                  Cook {recipe.cookTime}
                </span>
              )}
              {recipe.servings && (
                <span style={{ fontSize: "0.78rem", padding: "4px 10px", borderRadius: "var(--radius-full)", backgroundColor: "var(--color-cream)", color: "var(--color-stone)", border: "1px solid rgba(176, 168, 154, 0.3)", fontFamily: "var(--font-body)" }}>
                  Serves {recipe.servings}
                </span>
              )}
            </div>
          )}

          {/* Linked: view recipe button */}
          {recipe.type === "linked" && recipe.recipeUrl && (
            <a
              href={recipe.recipeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-butter)",
                color: "var(--color-soil)",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                boxShadow: "var(--shadow-soft)",
                marginBottom: "8px",
              }}
            >
              <ExternalLink size={16} />
              View Recipe
            </a>
          )}

          {/* Original: ingredients + instructions */}
          {recipe.type === "original" && (
            <>
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--color-soil)", marginBottom: "10px" }}>
                    Ingredients
                  </h3>
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {recipe.ingredients.map((item, i) => (
                      <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-shadow)", marginBottom: "4px" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.instructions && recipe.instructions.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--color-soil)", marginBottom: "10px" }}>
                    Instructions
                  </h3>
                  <ol style={{ paddingLeft: "20px", margin: 0 }}>
                    {recipe.instructions.map((step, i) => (
                      <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-shadow)", marginBottom: "8px", lineHeight: 1.5 }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </>
          )}

          {/* Delete button (author only) */}
          {isAuthor && (
            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(176, 168, 154, 0.2)" }}>
              <button
                onClick={onDelete}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--color-error)",
                  backgroundColor: "transparent",
                  color: "var(--color-error)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={14} />
                Delete recipe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
