"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWeeklyReset } from "@/lib/hooks/useWeeklyReset";
import affirmations from "@/data/affirmations.json";

const TOTAL_STEPS = 5;

const WEEK_MOODS = [
  { label: "Restorative", emoji: "🌿" },
  { label: "Joyful",      emoji: "🌸" },
  { label: "Steady",      emoji: "🌱" },
  { label: "Busy",        emoji: "🌪️" },
  { label: "Heavy",       emoji: "🌧️" },
  { label: "Mixed",       emoji: "☁️" },
];

function getWeekAffirmation(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + 1) / 7);
  return affirmations[weekNum % affirmations.length];
}

function ProgressDots({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "40px" }}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? "20px" : "8px",
            height: "8px",
            borderRadius: "var(--radius-sm)",
            backgroundColor:
              i + 1 <= current
                ? "var(--color-lavender)"
                : "rgba(176, 168, 154, 0.3)",
            transition: "width 0.3s ease, background-color 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function StepShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="animate-bloom-up"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "24px",
        maxWidth: "480px",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export default function WeeklyReset({ uid }: { uid: string | null }) {
  const { thisWeekDone, saveReset } = useWeeklyReset(uid);
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  // Sync completion state when Firestore data loads
  useEffect(() => {
    if (thisWeekDone) setCompleted(true);
  }, [thisWeekDone]);
  const [weekMood, setWeekMood] = useState("");
  const [customMood, setCustomMood] = useState("");
  const [intention, setIntention] = useState("");

  const effectiveMood = weekMood || customMood;

  function handleComplete() {
    saveReset(effectiveMood, intention);
    setCompleted(true);
  }

  // ── Completion screen ──────────────────────────────────────
  if (completed) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textAlign: "center", maxWidth: "480px", width: "100%" }}>
        <span className="animate-bloom-pop" style={{ fontSize: "3rem" }}>🌸</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-soil)", fontWeight: 500 }}>
          You're ready for the week.
        </h2>
        <p style={{ color: "var(--color-stone)", fontSize: "0.95rem", lineHeight: 1.6 }}>
          You showed up for yourself. That matters.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
          <Link
            href="/garden"
            style={{
              padding: "11px 24px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-sage)",
              color: "var(--color-white)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Go to The Garden
          </Link>
          <button
            onClick={() => { setCompleted(false); setStep(1); setWeekMood(""); setCustomMood(""); setIntention(""); }}
            style={{
              padding: "11px 24px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "transparent",
              border: "1px solid rgba(176, 168, 154, 0.4)",
              color: "var(--color-stone)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Reset again
          </button>
        </div>
      </div>
    );
  }

  // ── Nav buttons ────────────────────────────────────────────
  const navButtons = (canAdvance: boolean, onNext?: () => void) => (
    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
      {step > 1 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          style={{
            padding: "11px 24px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "transparent",
            border: "1px solid rgba(176, 168, 154, 0.4)",
            color: "var(--color-stone)",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      )}
      <button
        onClick={onNext ?? (() => setStep((s) => s + 1))}
        disabled={!canAdvance}
        style={{
          padding: "11px 28px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--color-lavender)",
          color: "var(--color-soil)",
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          fontWeight: 500,
          border: "none",
          cursor: canAdvance ? "pointer" : "default",
          opacity: canAdvance ? 1 : 0.5,
          transition: "opacity 0.15s ease",
        }}
      >
        {step === TOTAL_STEPS ? "Complete" : "Next →"}
      </button>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <ProgressDots current={step} />

      {/* Step 1 — How was your week? */}
      {step === 1 && (
        <StepShell key={1}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", color: "var(--color-soil)", fontWeight: 500 }}>
            How was your week?
          </h2>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
            {WEEK_MOODS.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => { setWeekMood(label); setCustomMood(""); }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: weekMood === label ? "var(--color-lavender)" : "var(--color-white)",
                  border: weekMood === label ? "2px solid var(--color-lavender)" : "2px solid rgba(176, 168, 154, 0.3)",
                  color: "var(--color-soil)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-soft)",
                  transition: "background-color 0.15s ease",
                }}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Or use your own word..."
            value={customMood}
            onChange={(e) => { setCustomMood(e.target.value); setWeekMood(""); }}
            style={{
              width: "100%",
              maxWidth: "300px",
              padding: "11px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(176, 168, 154, 0.4)",
              fontSize: "0.95rem",
              fontFamily: "var(--font-body)",
              color: "var(--color-soil)",
              backgroundColor: "var(--color-white)",
              outline: "none",
              textAlign: "center",
            }}
          />
          {navButtons(effectiveMood.trim() !== "")}
        </StepShell>
      )}

      {/* Step 2 — Set your intention */}
      {step === 2 && (
        <StepShell key={2}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", color: "var(--color-soil)", fontWeight: 500 }}>
            What's your intention for this week?
          </h2>
          <p style={{ color: "var(--color-stone)", fontSize: "0.9rem" }}>
            One word, one sentence — whatever feels right.
          </p>
          <input
            autoFocus
            type="text"
            placeholder="e.g. Be present. Rest more. Choose joy."
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && intention.trim()) setStep(3); }}
            style={{
              width: "100%",
              maxWidth: "380px",
              padding: "12px 16px",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(176, 168, 154, 0.4)",
              fontSize: "1rem",
              fontFamily: "var(--font-body)",
              color: "var(--color-soil)",
              backgroundColor: "var(--color-white)",
              outline: "none",
              textAlign: "center",
            }}
          />
          {navButtons(intention.trim() !== "")}
        </StepShell>
      )}

      {/* Step 3 — Meal planner */}
      {step === 3 && (
        <StepShell key={3}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", color: "var(--color-soil)", fontWeight: 500 }}>
            Plan your meals for the week
          </h2>
          <p style={{ color: "var(--color-stone)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            A little planning here saves so much mental energy later.
          </p>
          <Link
            href="/garden#meals"
            style={{
              padding: "12px 28px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-mist)",
              color: "var(--color-moss)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid rgba(168, 184, 154, 0.4)",
            }}
          >
            🌿 Open Meal Planner
          </Link>
          <p style={{ fontSize: "0.8rem", color: "var(--color-pebble)" }}>
            Or skip for now and come back later.
          </p>
          {navButtons(true)}
        </StepShell>
      )}

      {/* Step 4 — Activities */}
      {step === 4 && (
        <StepShell key={4}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", color: "var(--color-soil)", fontWeight: 500 }}>
            Review your kids' activities
          </h2>
          <p style={{ color: "var(--color-stone)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            Make sure everyone's week is mapped out before it begins.
          </p>
          <Link
            href="/garden#activities"
            style={{
              padding: "12px 28px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-mist)",
              color: "var(--color-moss)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid rgba(168, 184, 154, 0.4)",
            }}
          >
            🌿 Open Activities
          </Link>
          <p style={{ fontSize: "0.8rem", color: "var(--color-pebble)" }}>
            Or skip for now and come back later.
          </p>
          {navButtons(true)}
        </StepShell>
      )}

      {/* Step 5 — Affirmation */}
      {step === 5 && (
        <StepShell key={5}>
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-lavender-label)", fontWeight: 600 }}>
            Your affirmation for this week
          </p>
          <span style={{ fontSize: "2rem" }}>🌸</span>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontStyle: "italic", color: "var(--color-soil)", lineHeight: 1.5 }}>
            {getWeekAffirmation()}
          </p>
          {navButtons(true, handleComplete)}
        </StepShell>
      )}
    </div>
  );
}
