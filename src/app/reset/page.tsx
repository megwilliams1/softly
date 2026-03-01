"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import WeeklyReset from "@/components/reset/WeeklyReset";

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
          <h1 className="text-4xl mb-1">Weekly Reset</h1>
          <p style={{ color: "var(--color-stone)", fontSize: "0.95rem" }}>
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
