"use client";

import { ExternalLink } from "lucide-react";
import { type Recipe } from "@/lib/hooks/useRecipes";
import UserAvatar from "@/components/shared/UserAvatar";

interface Props {
  recipe: Recipe;
  animDelay?: number;
  onClick: () => void;
}

export default function RecipeCard({ recipe, animDelay = 0, onClick }: Props) {
  return (
    <article
      className="animate-bloom-up"
      onClick={onClick}
      style={{
        backgroundColor: "var(--color-white)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        animationDelay: `${animDelay}s`,
        animationFillMode: "both",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lift)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {recipe.imageUrl ? (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "160px",
            backgroundColor: "var(--color-butter)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
          }}
        >
          🍽️
        </div>
      )}

      <div style={{ padding: "16px" }}>
        {recipe.category && recipe.category !== "other" && (
          <span style={{
            display: "inline-block",
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 600,
            color: "var(--color-moss)",
            fontFamily: "var(--font-body)",
            marginBottom: "6px",
          }}>
            {recipe.category}
          </span>
        )}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.15rem",
            fontWeight: 500,
            color: "var(--color-soil)",
            marginBottom: "8px",
            lineHeight: 1.3,
          }}
        >
          {recipe.title}
        </h3>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <UserAvatar photoURL={recipe.authorPhoto} displayName={recipe.authorName} size={20} />
            <span style={{ fontSize: "0.78rem", color: "var(--color-stone)" }}>
              {recipe.authorName}
            </span>
          </div>

          {recipe.type === "linked" && (
            <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "0.72rem", color: "var(--color-pebble)" }}>
              <ExternalLink size={11} />
              Link
            </span>
          )}
        </div>

        {recipe.type === "original" && (recipe.prepTime || recipe.cookTime) && (
          <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
            {recipe.prepTime && (
              <span style={{ fontSize: "0.72rem", padding: "3px 8px", borderRadius: "var(--radius-full)", backgroundColor: "var(--color-cream)", color: "var(--color-stone)", border: "1px solid rgba(176, 168, 154, 0.3)" }}>
                Prep {recipe.prepTime}
              </span>
            )}
            {recipe.cookTime && (
              <span style={{ fontSize: "0.72rem", padding: "3px 8px", borderRadius: "var(--radius-full)", backgroundColor: "var(--color-cream)", color: "var(--color-stone)", border: "1px solid rgba(176, 168, 154, 0.3)" }}>
                Cook {recipe.cookTime}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
