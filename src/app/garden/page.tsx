"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { getSeason, seasonGreetings } from "@/lib/utils/season";
import MealGrid from "@/components/garden/MealGrid";
import ActivityScheduler from "@/components/garden/ActivityScheduler";
import Checklist from "@/components/garden/Checklist";
import GoalCard from "@/components/garden/GoalCard";
import DueNotesBanner from "@/components/grove/DueNotesBanner";
import WelcomeModal from "@/components/shared/WelcomeModal";

const season = getSeason();
const greeting = seasonGreetings[season];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.75rem",
        fontWeight: 400,
        color: "var(--color-soil)",
        borderLeft: "3px solid var(--color-sage)",
        paddingLeft: "12px",
        marginBottom: "20px",
        lineHeight: 1.2,
      }}
    >
      {children}
    </h2>
  );
}

export default function GardenPage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user && !localStorage.getItem("softly_welcomed")) {
      setShowWelcome(true);
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <main
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--color-mist)" }}
    >
      {showWelcome && (
        <WelcomeModal
          displayName={user.displayName}
          onClose={() => setShowWelcome(false)}
        />
      )}

      <p
        style={{
          fontSize: "0.72rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontWeight: 600,
          color: "var(--color-seasonal-secondary)",
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
        The Garden
      </h1>
      <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-body)", marginBottom: "32px" }}>
        Plan, nourish, and care for your people.
      </p>

      <DueNotesBanner uid={uid} />

      <section style={{ marginBottom: "48px" }}>
        <SectionTitle>Meal Planner</SectionTitle>
        <MealGrid uid={uid} />
      </section>

      <section style={{ marginBottom: "48px" }}>
        <SectionTitle>Kids&rsquo; Activities</SectionTitle>
        <ActivityScheduler uid={uid} />
      </section>

      <section style={{ marginBottom: "48px" }}>
        <SectionTitle>Shopping List</SectionTitle>
        <Checklist uid={uid} />
      </section>

      <section>
        <SectionTitle>Your Plant</SectionTitle>
        <GoalCard uid={uid} />
      </section>
    </main>
  );
}
