"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import DailyAffirmation from "@/components/sanctuary/DailyAffirmation";
import MoodCheckin from "@/components/sanctuary/MoodCheckin";
import GratitudeJournal from "@/components/sanctuary/GratitudeJournal";
import SelfCareReminders from "@/components/sanctuary/SelfCareReminders";

export default function SanctuaryPage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;

  if (loading || !user) return null;

  return (
    <main
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <h1 className="text-4xl mb-1">The Sanctuary</h1>
      <p style={{ color: "var(--color-stone)", marginBottom: "32px" }}>
        Your personal space lives here.
      </p>

      <section style={{ marginBottom: "48px" }}>
        <DailyAffirmation />
      </section>

      <section style={{ marginBottom: "48px" }}>
        <h2 className="text-2xl mb-2">How are you feeling?</h2>
        <MoodCheckin uid={uid} />
      </section>

      <section style={{ marginBottom: "48px" }}>
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
    </main>
  );
}
