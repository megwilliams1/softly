"use client";

import { useJournal } from "@/lib/hooks/useJournal";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MOOD_LABELS: Record<string, string> = {
  radiant: "radiant",
  content: "content",
  okay:    "steady",
  low:     "low",
  drained: "drained",
};

interface Props {
  uid: string | null;
}

export default function StormTracker({ uid }: Props) {
  const { fullHistory } = useJournal(uid);

  if (fullHistory.length < 7) return null;

  // Most common day of week
  const dayCounts: Record<number, number> = {};
  fullHistory.forEach(({ date }) => {
    const d = new Date(date + "T12:00:00").getDay();
    dayCounts[d] = (dayCounts[d] ?? 0) + 1;
  });
  const topDay = Number(Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0][0]);

  // Most common mood
  const moodCounts: Record<string, number> = {};
  fullHistory.forEach(({ mood }) => {
    if (mood) moodCounts[mood] = (moodCounts[mood] ?? 0) + 1;
  });
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  // Time of day pattern
  const timeCounts = { morning: 0, afternoon: 0, evening: 0 };
  fullHistory.forEach(({ updatedAt }) => {
    const h = new Date(updatedAt).getHours();
    if (h < 12) timeCounts.morning++;
    else if (h < 18) timeCounts.afternoon++;
    else timeCounts.evening++;
  });
  const topTime = (Object.entries(timeCounts).sort((a, b) => b[1] - a[1])[0][0]) as keyof typeof timeCounts;

  const insights = [
    `Storms tend to pass by ${DAY_NAMES[topDay]}.`,
    `You return here most in the ${topTime}.`,
    topMood ? `Your spirit leans ${MOOD_LABELS[topMood] ?? topMood} this season.` : null,
  ].filter(Boolean) as string[];

  return (
    <div
      style={{
        backgroundColor: "var(--color-white)",
        borderRadius: "var(--radius-lg)",
        padding: "24px 28px",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <p
        style={{
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "var(--color-lavender)",
          fontWeight: 600,
          marginBottom: "16px",
          filter: "brightness(0.75)",
        }}
      >
        Storm Tracker
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {insights.map((insight, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              color: "var(--color-soil)",
              fontStyle: "italic",
              lineHeight: 1.5,
            }}
          >
            {insight}
          </p>
        ))}
      </div>
    </div>
  );
}
