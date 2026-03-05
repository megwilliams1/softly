"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import DailyAffirmation from "@/components/sanctuary/DailyAffirmation";
import GratitudeJournal from "@/components/sanctuary/GratitudeJournal";
import SelfCareReminders from "@/components/sanctuary/SelfCareReminders";
import WeeklyGardenSummary from "@/components/sanctuary/WeeklyGardenSummary";

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
      <h1 className="text-4xl mb-1">The Sanctuary</h1>
      <p style={{ color: "var(--color-moss)", marginBottom: "40px" }}>
        Your personal space lives here.
      </p>

      {/* Affirmation — centered at top */}
      <section className="flex justify-center" style={{ marginBottom: "48px" }}>
        <DailyAffirmation />
      </section>

      {/* Gratitude (left) + Self-Care (right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: "48px" }}>
        <section>
          <h2 className="text-2xl mb-1">Gratitude</h2>
          <p style={{ color: "var(--color-moss)", fontSize: "0.9rem", marginBottom: "20px" }}>
            Three things, however small.
          </p>
          <GratitudeJournal uid={uid} />
        </section>

        <section>
          <h2 className="text-2xl mb-1">Self-Care Reminders</h2>
          <p style={{ color: "var(--color-moss)", fontSize: "0.9rem", marginBottom: "20px" }}>
            Little nudges, just for you.
          </p>
          <SelfCareReminders uid={uid} />
        </section>
      </div>

      {/* Weekly summary — centered below */}
      <section className="flex justify-center">
        <WeeklyGardenSummary uid={uid} prominent={isSunday} />
      </section>
    </main>
  );
}
