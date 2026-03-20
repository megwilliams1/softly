"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useRecipes, type Recipe, type RecipeCategory } from "@/lib/hooks/useRecipes";
import RecipeCard from "@/components/hearth/RecipeCard";
import SubmitRecipeModal from "@/components/hearth/SubmitRecipeModal";
import RecipeDetailModal from "@/components/hearth/RecipeDetailModal";

const FILTER_OPTIONS: { value: RecipeCategory | "all"; label: string }[] = [
  { value: "all",       label: "All"       },
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch",     label: "Lunch"     },
  { value: "dinner",    label: "Dinner"    },
  { value: "dessert",   label: "Dessert"   },
  { value: "snack",     label: "Snack"     },
  { value: "drinks",    label: "Drinks"    },
  { value: "other",     label: "Other"     },
];

export default function HearthPage() {
  const { user, loading } = useRequireAuth();
  const { recipes, loading: recipesLoading, submitRecipe, deleteRecipe } = useRecipes();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeFilter, setActiveFilter] = useState<RecipeCategory | "all">("all");

  const filteredRecipes = activeFilter === "all"
    ? recipes
    : recipes.filter((r) => (r.category ?? "other") === activeFilter);

  if (loading || !user) return null;

  return (
    <main style={{ backgroundColor: "var(--color-cream)", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <Flame size={28} style={{ color: "var(--color-butter)" }} />
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 500,
                  color: "var(--color-soil)",
                  lineHeight: 1,
                }}
              >
                The Hearth
              </h1>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-stone)", margin: 0 }}>
              A cozy corner for recipes we love.
            </p>
          </div>

          {user && !loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "4px" }}>
              <button
                onClick={() => setShowSubmitModal(true)}
                style={{
                  padding: "9px 18px",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  backgroundColor: "var(--color-butter)",
                  color: "var(--color-soil)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                Share a Recipe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category filter pills */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "24px 24px 0" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              style={{
                padding: "7px 16px",
                borderRadius: "var(--radius-full)",
                border: `1.5px solid ${activeFilter === opt.value ? "var(--color-butter)" : "rgba(176, 168, 154, 0.4)"}`,
                backgroundColor: activeFilter === opt.value ? "var(--color-butter)" : "transparent",
                color: activeFilter === opt.value ? "var(--color-soil)" : "var(--color-stone)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: activeFilter === opt.value ? 500 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe grid */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "24px 24px 60px" }}>
        {recipesLoading ? (
          <p style={{ fontFamily: "var(--font-body)", color: "var(--color-stone)", fontSize: "0.95rem" }}>
            Loading recipes...
          </p>
        ) : filteredRecipes.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              color: "var(--color-stone)",
              fontFamily: "var(--font-body)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🔥</div>
            <p style={{ fontSize: "1rem", marginBottom: "6px", color: "var(--color-soil)" }}>
              No recipes yet
            </p>
            <p style={{ fontSize: "0.88rem" }}>
              Be the first to share something warm.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredRecipes.map((recipe, i) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                animDelay={i * 0.06}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showSubmitModal && user && (
        <SubmitRecipeModal
          user={user}
          onSubmit={(input) => submitRecipe(input, user)}
          onClose={() => setShowSubmitModal(false)}
        />
      )}

      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          currentUser={user}
          onDelete={async () => {
            await deleteRecipe(selectedRecipe.id);
            setSelectedRecipe(null);
          }}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </main>
  );
}
