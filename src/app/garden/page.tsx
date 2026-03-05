"use client";

import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import MealGrid from "@/components/garden/MealGrid";
import ActivityScheduler from "@/components/garden/ActivityScheduler";
import Checklist from "@/components/garden/Checklist";
import GoalCard from "@/components/garden/GoalCard";
import DueNotesBanner from "@/components/grove/DueNotesBanner";

export default function GardenPage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;

  if (loading || !user) return null;

  return (
    <main
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--color-mist)" }}
    >
      <h1 className="text-4xl mb-1">The Garden</h1>
      <p style={{ color: "var(--color-stone)", marginBottom: "32px" }}>
        Family planning lives here.
      </p>

      <DueNotesBanner uid={uid} />

      <section style={{ marginBottom: "48px" }}>
        <h2 className="text-2xl mb-6">Meal Planner</h2>
        <MealGrid uid={uid} />
      </section>

      <section style={{ marginBottom: "48px" }}>
        <h2 className="text-2xl mb-6">Kids' Activities</h2>
        <ActivityScheduler uid={uid} />
      </section>

      <section style={{ marginBottom: "48px" }}>
        <h2 className="text-2xl mb-6">Shopping List</h2>
        <Checklist uid={uid} />
      </section>

      <section>
        <h2 className="text-2xl mb-6">Your Plant</h2>
        <GoalCard uid={uid} />
      </section>
    </main>
  );
}
