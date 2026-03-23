"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { getSeason, seasonGreetings } from "@/lib/utils/season";
import WeeklyReset from "@/components/reset/WeeklyReset";

const greeting = seasonGreetings[getSeason()];

export default function ResetPage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;

  if (loading || !user) return null;

  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 600,
              color: "var(--color-lavender-label)",
              fontFamily: "var(--font-body)",
              marginBottom: "8px",
            }}
          >
            {greeting}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              fontWeight: 500,
              color: "var(--color-soil)",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}
          >
            Weekly Reset
          </h1>
          <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
            A few quiet minutes to close the week and open the next.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <WeeklyReset uid={uid} />
        </div>
      </div>
    </main>
  );
}
