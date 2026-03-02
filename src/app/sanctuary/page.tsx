"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import DailyAffirmation from "@/components/sanctuary/DailyAffirmation";
import MoodCheckin from "@/components/sanctuary/MoodCheckin";
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
      {/* Header — left aligned */}
      <h1 className="text-4xl mb-1">The Sanctuary</h1>
      <p style={{ color: "var(--color-stone)", marginBottom: "48px" }}>
        Your personal space lives here.
      </p>

      {/* On Sundays, the weekly summary leads everything */}
      {isSunday && (
        <section style={{ marginBottom: "48px" }}>
          <WeeklyGardenSummary uid={uid} prominent />
        </section>
      )}

      {/* Affirmation — centered */}
      <section className="flex justify-center" style={{ marginBottom: "48px" }}>
        <DailyAffirmation />
      </section>

      {/* Mood, Gratitude, Self-Care — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section>
          <h2 className="text-2xl mb-2">How are you feeling?</h2>
          <MoodCheckin uid={uid} />
        </section>

        <section>
          <h2 className="text-2xl mb-1">Gratitude</h2>
          <p style={{ color: "var(--color-stone)", fontSize: "0.9rem", marginBottom: "20px" }}>
            Three things, however small.
          </p>
          <GratitudeJournal uid={uid} />
        </section>

        <section>
          <h2 className="text-2xl mb-1">Self-Care Reminders</h2>
          <p style={{ color: "var(--color-stone)", fontSize: "0.9rem", marginBottom: "20px" }}>
            Little nudges, just for you.
          </p>
          <SelfCareReminders uid={uid} />
        </section>

        {/* On non-Sundays, the weekly summary tucks in at the end of the grid */}
        {!isSunday && (
          <section>
            <WeeklyGardenSummary uid={uid} />
          </section>
        )}
      </div>
    </main>
  );
}
