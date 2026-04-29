"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import PageSkeleton from "@/components/shared/PageSkeleton";
import { useRecipes, type Recipe, type RecipeCategory } from "@/lib/hooks/useRecipes";
import { isAdminUser } from "@/lib/admin";
import RecipeCard from "@/components/hearth/RecipeCard";
import SubmitRecipeModal from "@/components/hearth/SubmitRecipeModal";
import RecipeDetailModal from "@/components/hearth/RecipeDetailModal";
import EditRecipeModal from "@/components/hearth/EditRecipeModal";
import Sprig from "@/components/shared/Sprig";

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
  const { recipes, loading: recipesLoading, submitRecipe, deleteRecipe, updateRecipe } = useRecipes();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [activeFilter, setActiveFilter] = useState<RecipeCategory | "all">("all");
  const [search, setSearch] = useState("");
  const isAdmin = isAdminUser(user);

  const q = search.trim().toLowerCase();
  const filteredRecipes = recipes
    .filter((r) => activeFilter === "all" || (r.category ?? "other") === activeFilter)
    .filter((r) => {
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.authorName.toLowerCase().includes(q) ||
        r.ingredients?.some((ing) => ing.toLowerCase().includes(q))
      );
    });

  if (loading) return <PageSkeleton />;
  if (!user) return null;

  return (
    <main style={{ backgroundColor: "var(--color-cream)", minHeight: "100%", position: "relative", overflow: "hidden" }}>
      {/* Botanical sprig — top right */}
      <Sprig
        color="var(--color-hearth-accent)"
        opacity={0.10}
        size={180}
        flip
        style={{ position: "absolute", right: -24, top: -10, zIndex: 0 }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
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
              <p
                style={{
                  fontSize: "9.5px",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  color: "var(--color-hearth-accent)",
                  fontFamily: "var(--font-body)",
                  marginBottom: "6px",
                }}
              >
                Gather · Cook · Share
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 5vw, 42px)",
                  fontWeight: 400,
                  color: "var(--color-soil)",
                  lineHeight: 1.2,
                  marginBottom: "6px",
                }}
              >
                The Hearth
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--color-stone)", margin: 0 }}>
                A cozy corner for recipes we love.
              </p>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              style={{
                padding: "10px 20px",
                borderRadius: "var(--radius-full)",
                border: "none",
                backgroundColor: "var(--color-soil)",
                color: "var(--color-white)",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: "var(--shadow-soft)",
                marginTop: "4px",
              }}
            >
              + Add recipe
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "24px 24px 0" }}>
          <div style={{ position: "relative", maxWidth: "380px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "var(--color-pebble)", pointerEvents: "none" }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search recipes, ingredients, authors…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 36px 10px 38px",
                borderRadius: "var(--radius-full)",
                border: "1.5px solid rgba(176,168,154,0.4)",
                backgroundColor: "var(--color-white)",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--color-soil)",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-hearth-accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(176,168,154,0.4)"; }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--color-pebble)", fontSize: "14px", lineHeight: 1, padding: "2px" }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category filter pills */}
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "12px 24px 0" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "var(--radius-full)",
                  border: `1.5px solid ${activeFilter === opt.value ? "var(--color-hearth-accent)" : "rgba(176,168,154,0.4)"}`,
                  backgroundColor: activeFilter === opt.value ? "var(--color-hearth-tile)" : "transparent",
                  color: activeFilter === opt.value ? "var(--color-hearth-accent)" : "var(--color-stone)",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
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
            <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--color-stone)", fontFamily: "var(--font-body)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{q ? "🔍" : "🍲"}</div>
              <p style={{ fontSize: "1rem", marginBottom: "6px", color: "var(--color-soil)", fontFamily: "var(--font-display)" }}>
                {q ? `No recipes matching "${search}"` : "No recipes yet"}
              </p>
              <p style={{ fontSize: "13px" }}>
                {q ? (
                  <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "var(--color-hearth-accent)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "13px", textDecoration: "underline" }}>
                    Clear search
                  </button>
                ) : "Be the first to share something warm."}
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
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
      </div>

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
          isAdmin={isAdmin}
          onDelete={async () => {
            await deleteRecipe(selectedRecipe.id);
            setSelectedRecipe(null);
          }}
          onEdit={() => {
            setEditingRecipe(selectedRecipe);
            setSelectedRecipe(null);
          }}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {editingRecipe && (
        <EditRecipeModal
          recipe={editingRecipe}
          onSave={(updates) => updateRecipe(editingRecipe.id, updates)}
          onClose={() => setEditingRecipe(null)}
        />
      )}
    </main>
  );
}
