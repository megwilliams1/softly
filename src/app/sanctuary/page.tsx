"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import PageSkeleton from "@/components/shared/PageSkeleton";
import DailyAffirmation from "@/components/sanctuary/DailyAffirmation";
import GratitudeJournal from "@/components/sanctuary/GratitudeJournal";
import MoodCheckin from "@/components/sanctuary/MoodCheckin";
import SelfCareReminders from "@/components/sanctuary/SelfCareReminders";
import WeeklyGardenSummary from "@/components/sanctuary/WeeklyGardenSummary";
import InsightsDashboard from "@/components/sanctuary/InsightsDashboard";
import Sprig from "@/components/shared/Sprig";

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
        <p style={{ color: "var(--color-sanctuary-accent)", fontFamily: "var(--font-body)", fontSize: "0.875rem", opacity: 0.8 }}>
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

  if (loading) return <PageSkeleton />;
  if (!user) return null;

  return (
    <main
      className="min-h-full px-6 py-10"
      style={{ backgroundColor: "var(--color-cream)", position: "relative", overflow: "hidden" }}
    >
      {/* Botanical sprig — bottom right */}
      <Sprig
        color="var(--color-blush-deep)"
        opacity={0.11}
        size={200}
        flip
        style={{ position: "absolute", right: -24, bottom: 60, zIndex: 0 }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        <p
          style={{
            fontSize: "9.5px",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontWeight: 600,
            color: "var(--color-sanctuary-accent)",
            fontFamily: "var(--font-body)",
            marginBottom: "6px",
          }}
        >
          Breathe · Feel · Bloom
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
          The Sanctuary
        </h1>
        <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-body)", fontSize: "13px", marginBottom: "40px" }}>
          A soft space just for you.
        </p>

        {/* Affirmation — full width, emotional anchor at top */}
        <section style={{ marginBottom: "48px" }}>
          <DailyAffirmation />
        </section>

        {/* Mood check-in + self-care side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginBottom: "48px" }}>
          <section>
            <SectionTitle sub="Take a breath. Right now.">How are you feeling?</SectionTitle>
            <MoodCheckin uid={uid} />
          </section>

          <section>
            <SectionTitle sub="Little nudges, just for you.">Self-Care Reminders</SectionTitle>
            <SelfCareReminders uid={uid} />
          </section>
        </div>

        {/* Gratitude */}
        <section style={{ marginBottom: "48px" }}>
          <SectionTitle sub="Three things, however small.">Gratitude</SectionTitle>
          <GratitudeJournal uid={uid} />
        </section>

        {/* Weekly summary */}
        <section style={{ marginBottom: "48px" }}>
          <WeeklyGardenSummary uid={uid} prominent={isSunday} />
        </section>

        {/* Insights */}
        <section>
          <InsightsDashboard uid={uid} />
        </section>
      </div>
    </main>
  );
}
