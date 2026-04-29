"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { MoodKey, MoodHistory } from "@/lib/hooks/useMood";
import type { GratitudeHistory } from "@/lib/hooks/useGratitude";

const MOOD_COLOR: Record<MoodKey, string> = {
  radiant: "#f6c94e",
  content: "#e8a0b0",
  okay:    "#a8b89a",
  low:     "#9bb8c9",
  drained: "#b8b0a8",
};

const MOOD_LABEL: Record<MoodKey, string> = {
  radiant: "Radiant",
  content: "Content",
  okay:    "Okay",
  low:     "Low",
  drained: "Drained",
};

const ALL_MOODS: MoodKey[] = ["radiant", "content", "okay", "low", "drained"];

function getLast28Keys(): string[] {
  const keys: string[] = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    keys.push(d.toISOString().split("T")[0]);
  }
  return keys;
}

function getStreak(history: MoodHistory, gratitudeHistory: GratitudeHistory): number {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const hasMood = !!history[key];
    const hasGratitude = gratitudeHistory[key]?.some((s) => s.trim().length > 0);
    if (hasMood || hasGratitude) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getDayLabel(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
}

function getMonthLabel(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function InsightsDashboard({ uid }: { uid: string | null }) {
  const [moodHistory, setMoodHistory] = useState<MoodHistory>({});
  const [gratitudeHistory, setGratitudeHistory] = useState<GratitudeHistory>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(doc(db, "users", uid, "mood", "current"), (snap) => {
      if (snap.exists()) setMoodHistory(snap.data() as MoodHistory);
    });
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(doc(db, "users", uid, "gratitude", "current"), (snap) => {
      if (snap.exists()) setGratitudeHistory(snap.data() as GratitudeHistory);
    });
  }, [uid]);

  const last28 = getLast28Keys();
  const streak = getStreak(moodHistory, gratitudeHistory);

  const moodCounts = ALL_MOODS.reduce<Record<MoodKey, number>>((acc, m) => {
    acc[m] = last28.filter((k) => moodHistory[k] === m).length;
    return acc;
  }, {} as Record<MoodKey, number>);
  const totalMoodDays = Object.values(moodCounts).reduce((a, b) => a + b, 0);

  const gratitudeCount28 = last28.reduce((count, k) => {
    return count + (gratitudeHistory[k]?.filter((s) => s.trim().length > 0).length ?? 0);
  }, 0);

  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: "600px" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          background: "none",
          border: "none",
          padding: "0 0 12px",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            fontWeight: 400,
            color: "var(--color-soil)",
          }}
        >
          Your Patterns
        </span>
        <span style={{ fontSize: "1rem", color: "var(--color-pebble)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
          ↓
        </span>
      </button>

      {open && (
        <div className="animate-bloom-up" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Streak + gratitude count */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--radius-lg)",
                padding: "18px 20px",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "var(--color-soil)", lineHeight: 1, marginBottom: "4px" }}>
                {streak}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)" }}>
                Day streak{streak !== 1 ? "s" : ""}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "var(--color-pebble)", marginTop: "2px" }}>
                Mood or gratitude logged
              </p>
            </div>
            <div
              style={{
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--radius-lg)",
                padding: "18px 20px",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "var(--color-soil)", lineHeight: 1, marginBottom: "4px" }}>
                {gratitudeCount28}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)" }}>
                Gratitudes
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "var(--color-pebble)", marginTop: "2px" }}>
                Last 28 days
              </p>
            </div>
          </div>

          {/* 28-day mood calendar */}
          <div
            style={{
              backgroundColor: "var(--color-white)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-stone)", marginBottom: "14px" }}>
              Last 28 days
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
              {/* Day-of-week headers */}
              {["S","M","T","W","T","F","S"].map((d, i) => (
                <div key={i} style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "9px", color: "var(--color-pebble)", paddingBottom: "2px" }}>
                  {d}
                </div>
              ))}
              {last28.map((dateStr) => {
                const mood = moodHistory[dateStr] as MoodKey | undefined;
                const isToday = dateStr === last28[27];
                return (
                  <div
                    key={dateStr}
                    onMouseEnter={() => setHoveredDay(dateStr)}
                    onMouseLeave={() => setHoveredDay(null)}
                    title={`${getMonthLabel(dateStr)}${mood ? ` · ${MOOD_LABEL[mood]}` : " · No check-in"}`}
                    style={{
                      aspectRatio: "1",
                      borderRadius: "50%",
                      backgroundColor: mood ? MOOD_COLOR[mood] : "rgba(176,168,154,0.15)",
                      border: isToday ? "2px solid var(--color-stone)" : "2px solid transparent",
                      cursor: "default",
                      transition: "transform 0.1s ease",
                      transform: hoveredDay === dateStr ? "scale(1.25)" : "scale(1)",
                    }}
                  />
                );
              })}
            </div>
            {hoveredDay && (
              <p style={{ marginTop: "10px", fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)", textAlign: "center" }}>
                {getMonthLabel(hoveredDay)}
                {moodHistory[hoveredDay] ? ` · ${MOOD_LABEL[moodHistory[hoveredDay] as MoodKey]}` : " · No check-in"}
              </p>
            )}
          </div>

          {/* Mood breakdown */}
          {totalMoodDays > 0 && (
            <div
              style={{
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--radius-lg)",
                padding: "20px",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-stone)", marginBottom: "14px" }}>
                Mood breakdown
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {ALL_MOODS.filter((m) => moodCounts[m] > 0).map((mood) => {
                  const pct = Math.round((moodCounts[mood] / totalMoodDays) * 100);
                  return (
                    <div key={mood} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: MOOD_COLOR[mood], flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-stone)", width: "60px" }}>{MOOD_LABEL[mood]}</span>
                      <div style={{ flex: 1, height: "6px", borderRadius: "var(--radius-full)", backgroundColor: "rgba(176,168,154,0.2)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, backgroundColor: MOOD_COLOR[mood], borderRadius: "var(--radius-full)", transition: "width 0.4s ease" }} />
                      </div>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-pebble)", width: "30px", textAlign: "right" }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
