"use client";

import { useState, useEffect } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useMeals, DayKey } from "@/lib/hooks/useMeals";
import { useActivities } from "@/lib/hooks/useActivities";
import { useGoals } from "@/lib/hooks/useGoals";
import { useChecklist } from "@/lib/hooks/useChecklist";
import { useWeeklySummary } from "@/lib/hooks/useWeeklySummary";
import { useMood } from "@/lib/hooks/useMood";
import { useJournal } from "@/lib/hooks/useJournal";
import affirmations from "@/data/affirmations.json";
import Link from "next/link";
import WelcomeModal from "@/components/shared/WelcomeModal";
import PageSkeleton from "@/components/shared/PageSkeleton";

const DAY_KEYS: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const PLANT_STAGES = ["🌰", "🌱", "🌿", "🌺", "🌸"];
const PLANT_LABELS = [
  "Just planted.", "Something's stirring.", "It's taking root.",
  "Growing steadily.", "In full bloom.",
];

const MOOD_LABELS: Record<string, string> = {
  radiant: "✨ Radiant",
  content: "🌸 Content",
  okay: "🌿 Okay",
  low: "💧 Low",
  drained: "🍂 Drained",
};

function getTodayKey(): DayKey {
  return DAY_KEYS[new Date().getDay()];
}

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatDateFull(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
}

const SECTION_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "9.5px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  marginBottom: "8px",
};

function TileShell({
  href,
  bg,
  accent,
  label,
  children,
}: {
  href: string;
  bg: string;
  accent: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        backgroundColor: bg,
        borderRadius: "var(--radius-xl)",
        padding: "22px 24px",
        textDecoration: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-lift)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
      }}
    >
      <p style={{ ...SECTION_LABEL, color: accent }}>{label}</p>
      {children}
    </Link>
  );
}

export default function HomePage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user && !localStorage.getItem("softly_welcomed")) {
      setShowWelcome(true);
    }
  }, [user]);

  const { meals } = useMeals(uid);
  const { activities } = useActivities(uid);
  const { activeGoal, checkedInToday, checkIn } = useGoals(uid);
  const { data: checklist } = useChecklist(uid);
  const { daysShown, gratitudeCount, summaryLines } = useWeeklySummary(uid);
  const { todayMood } = useMood(uid);
  const { todayEntry } = useJournal(uid);

  if (loading) return <PageSkeleton />;
  if (!user) return null;

  const todayKey = getTodayKey();
  const tonightDinner = meals[todayKey]?.dinner ?? "";

  const todayActivities = activities
    .filter((a) => a.day === todayKey)
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 2);

  const affirmation = affirmations[getDayOfYear() % affirmations.length];

  const firstName = user.displayName?.split(" ")[0] ?? "mama";
  const checkInCount = activeGoal?.checkIns.length ?? 0;
  const plantStageIdx = Math.min(Math.floor(Math.min(checkInCount / 21, 1) * 5), 4);

  const allItems = [...checklist.groceries, ...checklist.errands].slice(0, 6);

  const weekNum = Math.ceil(getDayOfYear() / 7);

  return (
    <div
      style={{
        backgroundColor: "var(--color-cream)",
        minHeight: "100%",
        padding: "36px 32px 48px",
      }}
    >
      {showWelcome && (
        <WelcomeModal
          displayName={user.displayName}
          onClose={() => setShowWelcome(false)}
        />
      )}
      {/* Greeting header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 54px)",
            fontWeight: 400,
            color: "var(--color-soil)",
            lineHeight: 1.1,
            marginBottom: "6px",
          }}
        >
          {getGreeting()},{" "}
          <em>{firstName}.</em>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "var(--color-stone)",
          }}
        >
          {formatDateFull()} · Your garden is growing beautifully.
        </p>
      </div>

      {/* Main grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        {/* THE GARDEN tile */}
        <TileShell
          href="/garden"
          bg="var(--color-garden-tile)"
          accent="var(--color-garden-accent)"
          label="The Garden"
        >
          {tonightDinner ? (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                color: "var(--color-soil)",
                marginBottom: "12px",
              }}
            >
              {tonightDinner} tonight
            </p>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                color: "var(--color-soil)",
                marginBottom: "12px",
                fontStyle: "italic",
              }}
            >
              No dinner planned yet
            </p>
          )}
          {todayActivities.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <p style={{ ...SECTION_LABEL, color: "var(--color-garden-accent)", marginBottom: "4px" }}>
                Today&apos;s activities
              </p>
              {todayActivities.map((a) => (
                <div
                  key={a.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--color-stone)",
                  }}
                >
                  <span>{a.label}</span>
                  <span>{a.time}</span>
                </div>
              ))}
            </div>
          )}
        </TileShell>

        {/* THE SANCTUARY tile */}
        <TileShell
          href="/sanctuary"
          bg="var(--color-sanctuary-tile)"
          accent="var(--color-sanctuary-accent)"
          label="The Sanctuary"
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontStyle: "italic",
              color: "var(--color-soil)",
              lineHeight: 1.4,
              marginBottom: "16px",
            }}
          >
            &ldquo;{affirmation}&rdquo;
          </p>
          {todayMood ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  padding: "6px 16px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(196,120,138,0.12)",
                  border: "1px solid rgba(196,120,138,0.25)",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "var(--color-sanctuary-accent)",
                }}
              >
                {MOOD_LABELS[todayMood]}
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)" }}>
                today
              </span>
            </div>
          ) : (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-pebble)", fontStyle: "italic" }}>
              How are you feeling? →
            </p>
          )}
        </TileShell>

        {/* Right column: Plant + Hearth + Grove */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* YOUR PLANT card */}
          <div
            style={{
              backgroundColor: "var(--color-white)",
              borderRadius: "var(--radius-xl)",
              padding: "18px 20px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p style={{ ...SECTION_LABEL, color: "var(--color-garden-accent)" }}>Your plant</p>
            {activeGoal ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "20px",
                      color: "var(--color-soil)",
                    }}
                  >
                    {activeGoal.text}
                  </p>
                  <span style={{ fontSize: "22px" }}>{PLANT_STAGES[plantStageIdx]}</span>
                </div>
                <div
                  style={{
                    height: "5px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "rgba(92,107,80,0.15)",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min((checkInCount / 21) * 100, 100)}%`,
                      backgroundColor: "var(--color-garden-accent)",
                      borderRadius: "var(--radius-full)",
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)", fontStyle: "italic" }}>
                    {PLANT_LABELS[plantStageIdx]}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)" }}>
                    Day {checkInCount}/21
                  </p>
                </div>
                {!checkedInToday && (
                  <button
                    onClick={(e) => { e.preventDefault(); checkIn(); }}
                    style={{
                      marginTop: "10px",
                      padding: "7px 16px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--color-garden-accent)",
                      color: "var(--color-white)",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Check in today
                  </button>
                )}
              </>
            ) : (
              <Link href="/garden" style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--color-stone)", textDecoration: "none" }}>
                Plant a goal →
              </Link>
            )}
          </div>

          {/* THE HEARTH tile */}
          <TileShell
            href="/hearth"
            bg="var(--color-hearth-tile)"
            accent="var(--color-hearth-accent)"
            label="The Hearth"
          >
            <p style={{ fontFamily: "var(--font-display)", fontSize: "17px", color: "var(--color-soil)" }}>
              Your recipe collection
            </p>
          </TileShell>

          {/* REFLECTION GROVE tile */}
          <TileShell
            href="/grove"
            bg="var(--color-grove-tile)"
            accent="var(--color-grove-accent)"
            label="Reflection Grove"
          >
            <p style={{ fontFamily: "var(--font-display)", fontSize: "17px", color: "var(--color-soil)" }}>
              {todayEntry ? "You reflected today." : "How are you feeling today?"}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: todayEntry ? "var(--color-grove-accent)" : "var(--color-stone)", marginTop: "4px" }}>
              {todayEntry ? "✓ Entry saved" : "Tap to reflect."}
            </p>
          </TileShell>
        </div>
      </div>

      {/* Bottom row: Shopping + Weekly Reset */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {/* Shopping list */}
        <div
          style={{
            backgroundColor: "var(--color-white)",
            borderRadius: "var(--radius-xl)",
            padding: "22px 24px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <p style={{ ...SECTION_LABEL, color: "var(--color-stone)", marginBottom: 0 }}>Shopping list</p>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                color: "var(--color-sage)",
                backgroundColor: "rgba(168,184,154,0.15)",
                borderRadius: "var(--radius-full)",
                padding: "2px 10px",
              }}
            >
              {allItems.filter((i) => i.checked).length} of {allItems.length}
            </span>
          </div>
          {allItems.length === 0 ? (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--color-pebble)" }}>
              Nothing on the list yet.
            </p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {allItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: item.checked ? "var(--color-pebble)" : "var(--color-stone)",
                    textDecoration: item.checked ? "line-through" : "none",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: `1.5px solid ${item.checked ? "var(--color-sage)" : "var(--color-pebble)"}`,
                      backgroundColor: item.checked ? "var(--color-sage)" : "transparent",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.checked && <span style={{ color: "#fff", fontSize: "9px" }}>✓</span>}
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Reset stats */}
        <Link
          href="/reset"
          style={{
            display: "block",
            backgroundColor: "var(--color-reset-tile)",
            borderRadius: "var(--radius-xl)",
            padding: "22px 24px",
            textDecoration: "none",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-lift)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          <p style={{ ...SECTION_LABEL, color: "var(--color-reset-accent)" }}>
            Weekly reset · Week {weekNum}
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              color: "var(--color-soil)",
              marginBottom: "16px",
            }}
          >
            {summaryLines.headline}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--color-soil)", lineHeight: 1 }}>
                {daysShown}/7
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)" }}>
                Days tended
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--color-soil)", lineHeight: 1 }}>
                {gratitudeCount}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)" }}>
                Gratitudes
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
