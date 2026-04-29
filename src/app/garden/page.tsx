"use client";

import { useRef, useEffect } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import MealGrid, { MealGridHandle } from "@/components/garden/MealGrid";
import { DayKey } from "@/lib/hooks/useMeals";
import PageSkeleton from "@/components/shared/PageSkeleton";
import ActivityScheduler from "@/components/garden/ActivityScheduler";
import Checklist from "@/components/garden/Checklist";
import GoalCard from "@/components/garden/GoalCard";
import DueNotesBanner from "@/components/grove/DueNotesBanner";
import Sprig from "@/components/shared/Sprig";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.75rem",
        fontWeight: 400,
        color: "var(--color-soil)",
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
  const mealRef = useRef<HTMLElement>(null);
  const mealGridRef = useRef<MealGridHandle>(null);
  const activitiesRef = useRef<HTMLElement>(null);
  const checklistRef = useRef<HTMLElement>(null);

  const DAY_KEYS: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const todayKey = DAY_KEYS[new Date().getDay()];

  useEffect(() => {
    if (!user) return;
    const hash = window.location.hash.slice(1);
    const map: Record<string, React.RefObject<HTMLElement | null>> = {
      meals: mealRef,
      activities: activitiesRef,
      checklist: checklistRef,
    };
    const target = map[hash];
    if (target?.current) {
      setTimeout(() => target.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }
  }, [user]);

  if (loading) return <PageSkeleton />;
  if (!user) return null;

  return (
    <main
      className="min-h-full px-6 py-10"
      style={{ backgroundColor: "var(--color-cream)", position: "relative", overflow: "hidden" }}
    >
      {/* Botanical accent */}
      <Sprig
        color="var(--color-moss)"
        opacity={0.12}
        size={180}
        flip
        style={{ position: "absolute", right: -20, top: -10, zIndex: 0 }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
          <div>
            <p
              style={{
                fontSize: "9.5px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontWeight: 600,
                color: "var(--color-garden-accent)",
                fontFamily: "var(--font-body)",
                marginBottom: "6px",
              }}
            >
              Plan · Nourish · Care
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
              The Garden
            </h1>
            <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-body)", fontSize: "13px" }}>
              Your family&apos;s week, all in one place.
            </p>
          </div>
          <button
            onClick={() => {
              mealRef.current?.scrollIntoView({ behavior: "smooth" });
              mealGridRef.current?.openSlot(todayKey, "dinner");
            }}
            style={{
              marginTop: "8px",
              padding: "9px 20px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-soil)",
              color: "var(--color-white)",
              border: "none",
              fontFamily: "var(--font-body)",
              fontSize: "12.5px",
              fontWeight: 500,
              cursor: "pointer",
              flexShrink: 0,
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            + Add meal
          </button>
        </div>

        <DueNotesBanner uid={uid} />

        <section ref={mealRef} style={{ marginBottom: "48px" }}>
          <div style={{ marginBottom: "20px" }}>
            <SectionTitle>Meal Planner</SectionTitle>
          </div>
          <MealGrid ref={mealGridRef} uid={uid} />
        </section>

        <section ref={activitiesRef} style={{ marginBottom: "48px" }}>
          <SectionTitle>Kids&rsquo; Activities</SectionTitle>
          <ActivityScheduler uid={uid} />
        </section>

        <section ref={checklistRef} style={{ marginBottom: "48px" }}>
          <SectionTitle>Shopping &amp; Errands</SectionTitle>
          <Checklist uid={uid} />
        </section>

        <section style={{ marginBottom: "48px" }}>
          <GoalCard uid={uid} />
        </section>
      </div>
    </main>
  );
}
