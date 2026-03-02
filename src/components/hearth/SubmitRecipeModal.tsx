"use client";

import { useState, useEffect } from "react";
import { Link2, PenLine, X } from "lucide-react";
import { type User } from "firebase/auth";
import { type RecipeInput, type RecipeCategory } from "@/lib/hooks/useRecipes";

const CATEGORIES: { value: RecipeCategory; label: string }[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch",     label: "Lunch"     },
  { value: "dinner",    label: "Dinner"    },
  { value: "dessert",   label: "Dessert"   },
  { value: "snack",     label: "Snack"     },
  { value: "other",     label: "Other"     },
];

interface Props {
  user: User;
  onSubmit: (input: RecipeInput) => Promise<void>;
  onClose: () => void;
}

export default function SubmitRecipeModal({ user: _user, onSubmit, onClose }: Props) {
  const [mode, setMode] = useState<"linked" | "original">("linked");
  const [category, setCategory] = useState<RecipeCategory>("other");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [recipeUrl, setRecipeUrl] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function isValidUrl(url: string): boolean {
    try {
      const u = new URL(url);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  const recipeUrlInvalid = mode === "linked" && recipeUrl.trim() !== "" && !isValidUrl(recipeUrl.trim());
  const imageUrlInvalid = imageUrl.trim() !== "" && !isValidUrl(imageUrl.trim());

  const canSubmit =
    title.trim() !== "" &&
    !imageUrlInvalid &&
    (mode === "original" || (recipeUrl.trim() !== "" && !recipeUrlInvalid));

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const input: RecipeInput =
        mode === "linked"
          ? {
              type: "linked",
              category,
              title: title.trim(),
              recipeUrl: recipeUrl.trim(),
              imageUrl: imageUrl.trim() || undefined,
            }
          : {
              type: "original",
              category,
              title: title.trim(),
              imageUrl: imageUrl.trim() || undefined,
              ingredients: ingredientsText.split("\n").map((s) => s.trim()).filter(Boolean),
              instructions: instructionsText.split("\n").map((s) => s.trim()).filter(Boolean),
              prepTime: prepTime.trim() || undefined,
              cookTime: cookTime.trim() || undefined,
              servings: servings.trim() || undefined,
            };
      await onSubmit(input);
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "var(--radius-md)",
    border: "1px solid rgba(176, 168, 154, 0.4)",
    backgroundColor: "var(--color-cream)",
    color: "var(--color-soil)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "var(--color-stone)",
    marginBottom: "6px",
    fontFamily: "var(--font-body)",
  };

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
          maxWidth: "520px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "28px",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-pebble)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
          }}
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            fontWeight: 500,
            color: "var(--color-soil)",
            marginBottom: "20px",
          }}
        >
          Share a Recipe
        </h2>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {(["linked", "original"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(176, 168, 154, 0.4)",
                backgroundColor: mode === m ? "var(--color-butter)" : "transparent",
                color: mode === m ? "var(--color-soil)" : "var(--color-stone)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: mode === m ? 500 : 400,
                cursor: "pointer",
              }}
            >
              {m === "linked" ? <Link2 size={14} /> : <PenLine size={14} />}
              {m === "linked" ? "Link a recipe" : "Write my own"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Recipe title *</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grandma's Chicken Soup"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    border: `1.5px solid ${category === cat.value ? "var(--color-butter)" : "rgba(176, 168, 154, 0.4)"}`,
                    backgroundColor: category === cat.value ? "var(--color-butter)" : "transparent",
                    color: category === cat.value ? "var(--color-soil)" : "var(--color-stone)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {mode === "linked" && (
            <div>
              <label style={labelStyle}>Recipe URL *</label>
              <input
                value={recipeUrl}
                onChange={(e) => setRecipeUrl(e.target.value)}
                placeholder="https://..."
                style={inputStyle}
              />
              {recipeUrlInvalid && (
                <p style={{ marginTop: "4px", fontSize: "0.78rem", color: "var(--color-error)", fontFamily: "var(--font-body)" }}>
                  Please enter a valid URL starting with https://
                </p>
              )}
            </div>
          )}

          <div>
            <label style={labelStyle}>Image URL <span style={{ fontWeight: 400 }}>(optional)</span></label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
            {imageUrlInvalid && (
              <p style={{ marginTop: "4px", fontSize: "0.78rem", color: "var(--color-error)", fontFamily: "var(--font-body)" }}>
                Please enter a valid URL starting with https://
              </p>
            )}
          </div>

          {mode === "original" && (
            <>
              <div>
                <label style={labelStyle}>Ingredients <span style={{ fontWeight: 400 }}>(one per line)</span></label>
                <textarea
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  placeholder={"2 cups flour\n1 tsp salt\n..."}
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div>
                <label style={labelStyle}>Instructions <span style={{ fontWeight: 400 }}>(one step per line)</span></label>
                <textarea
                  value={instructionsText}
                  onChange={(e) => setInstructionsText(e.target.value)}
                  placeholder={"Preheat oven to 350°F\nMix dry ingredients\n..."}
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Prep time</label>
                  <input value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="15 min" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Cook time</label>
                  <input value={cookTime} onChange={(e) => setCookTime(e.target.value)} placeholder="30 min" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Servings</label>
                  <input value={servings} onChange={(e) => setServings(e.target.value)} placeholder="4" style={inputStyle} />
                </div>
              </div>
            </>
          )}
        </div>

        {error && (
          <p style={{ marginTop: "12px", fontSize: "0.85rem", color: "var(--color-error)", fontFamily: "var(--font-body)" }}>
            {error}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "9px 18px",
              borderRadius: "var(--radius-full)",
              border: "1px solid rgba(176, 168, 154, 0.4)",
              backgroundColor: "transparent",
              color: "var(--color-stone)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            style={{
              padding: "9px 18px",
              borderRadius: "var(--radius-full)",
              border: "none",
              backgroundColor: canSubmit && !submitting ? "var(--color-butter)" : "var(--color-pebble)",
              color: "var(--color-soil)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: canSubmit && !submitting ? "pointer" : "not-allowed",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Sharing..." : "Share Recipe"}
          </button>
        </div>
      </div>
    </div>
  );
}
