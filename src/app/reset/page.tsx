"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useWeeklyReset } from "@/lib/hooks/useWeeklyReset";
import WeeklyReset from "@/components/reset/WeeklyReset";
import ResetHistory from "@/components/reset/ResetHistory";
import PageSkeleton from "@/components/shared/PageSkeleton";

export default function ResetPage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;
  const { pastEntries } = useWeeklyReset(uid);

  if (loading) return <PageSkeleton />;
  if (!user) return null;

  return (
    <main
      className="min-h-full px-6 py-12"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "9.5px",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 600,
              color: "var(--color-reset-accent)",
              fontFamily: "var(--font-body)",
              marginBottom: "8px",
            }}
          >
            Reflect · Release · Renew
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 42px)",
              fontWeight: 400,
              color: "var(--color-soil)",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}
          >
            Weekly Reset
          </h1>
          <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-body)", fontSize: "13px" }}>
            A few quiet minutes to close the week and open the next.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "64px" }}>
          <WeeklyReset uid={uid} />
        </div>

        {pastEntries.length > 0 && (
          <div style={{ borderTop: "1px solid rgba(176,168,154,0.2)", paddingTop: "48px" }}>
            <ResetHistory entries={pastEntries} />
          </div>
        )}
      </div>
    </main>
  );
}
