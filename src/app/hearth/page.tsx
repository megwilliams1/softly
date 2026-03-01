"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useRecipes, type Recipe } from "@/lib/hooks/useRecipes";
import RecipeCard from "@/components/hearth/RecipeCard";
import SubmitRecipeModal from "@/components/hearth/SubmitRecipeModal";
import RecipeDetailModal from "@/components/hearth/RecipeDetailModal";

export default function HearthPage() {
  const { user, loading } = useRequireAuth();
  const { recipes, loading: recipesLoading, submitRecipe, deleteRecipe } = useRecipes();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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

      {/* Recipe grid */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px 60px" }}>
        {recipesLoading ? (
          <p style={{ fontFamily: "var(--font-body)", color: "var(--color-stone)", fontSize: "0.95rem" }}>
            Loading recipes...
          </p>
        ) : recipes.length === 0 ? (
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
            {recipes.map((recipe, i) => (
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
