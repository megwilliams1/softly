"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { getSeason, seasonGreetings } from "@/lib/utils/season";
import DailyAffirmation from "@/components/sanctuary/DailyAffirmation";
import GratitudeJournal from "@/components/sanctuary/GratitudeJournal";
import SelfCareReminders from "@/components/sanctuary/SelfCareReminders";
import WeeklyGardenSummary from "@/components/sanctuary/WeeklyGardenSummary";

const season = getSeason();
const greeting = seasonGreetings[season];

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.75rem",
          fontWeight: 400,
          color: "var(--color-soil)",
          lineHeight: 1.2,
          marginBottom: sub ? "4px" : 0,
        }}
      >
        {children}
      </h2>
      {sub && (
        <p style={{ color: "var(--color-bloom-pink)", fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function SanctuaryPage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;
  const isSunday = new Date().getDay() === 0;

  if (loading || !user) return null;

  return (
    <main
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <p
        style={{
          fontSize: "0.72rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontWeight: 600,
          color: "var(--color-bloom-pink)",
          fontFamily: "var(--font-body)",
          marginBottom: "6px",
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
          marginBottom: "6px",
        }}
      >
        The Sanctuary
      </h1>
      <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-body)", marginBottom: "40px" }}>
        A soft space just for you.
      </p>

      {/* Affirmation — emotional context first */}
      <section className="flex justify-center" style={{ marginBottom: "48px" }}>
        <DailyAffirmation />
      </section>

      {/* Gratitude (left) + Self-Care (right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: "48px" }}>
        <section>
          <SectionTitle sub="Three things, however small.">Gratitude</SectionTitle>
          <GratitudeJournal uid={uid} />
        </section>

        <section>
          <SectionTitle sub="Little nudges, just for you.">Self-Care Reminders</SectionTitle>
          <SelfCareReminders uid={uid} />
        </section>
      </div>

      {/* Weekly summary */}
      <section className="flex justify-center">
        <WeeklyGardenSummary uid={uid} prominent={isSunday} />
      </section>
    </main>
  );
}
