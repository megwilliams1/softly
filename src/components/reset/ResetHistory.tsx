"use client";

import { type ResetEntry } from "@/lib/hooks/useWeeklyReset";

function formatWeekOf(weekKey: string): string {
  const [year, month, day] = weekKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function weeksAgo(weekKey: string): string {
  const [year, month, day] = weekKey.split("-").map(Number);
  const then = new Date(year, month - 1, day).getTime();
  const now = Date.now();
  const weeks = Math.round((now - then) / (7 * 24 * 60 * 60 * 1000));
  if (weeks === 0) return "This week";
  if (weeks === 1) return "1 week ago";
  return `${weeks} weeks ago`;
}

const MOOD_LABELS: Record<string, string> = {
  radiant: "Radiant",
  content: "Content",
  okay: "Okay",
  low: "Low",
  drained: "Drained",
  custom: "Custom",
};

export default function ResetHistory({ entries }: { entries: ResetEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <div style={{ marginTop: "48px", width: "100%", maxWidth: "560px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-lavender-soft, rgba(180,170,210,0.3))" }} />
        <p style={{
          fontSize: "9.5px",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          fontWeight: 600,
          color: "var(--color-reset-accent)",
          fontFamily: "var(--font-body)",
          whiteSpace: "nowrap",
        }}>
          Past Resets
        </p>
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-lavender-soft, rgba(180,170,210,0.3))" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {entries.map((entry, i) => (
          <div
            key={entry.weekKey}
            style={{
              backgroundColor: "var(--color-white)",
              borderRadius: "14px",
              padding: "16px 20px",
              boxShadow: "var(--shadow-soft)",
              opacity: 0,
              animation: "bloom-up 0.4s ease forwards",
              animationDelay: `${i * 0.06}s`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-reset-accent)",
                  marginBottom: "2px",
                }}>
                  Week of {formatWeekOf(entry.weekKey)}
                </p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  color: "var(--color-stone)",
                }}>
                  {weeksAgo(entry.weekKey)}
                </p>
              </div>
              <span style={{
                fontSize: "11px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color: "var(--color-reset-accent)",
                backgroundColor: "var(--color-lavender-tile, rgba(180,170,210,0.15))",
                padding: "4px 10px",
                borderRadius: "var(--radius-full)",
              }}>
                {MOOD_LABELS[entry.weekMood] ?? entry.weekMood}
              </span>
            </div>
            {entry.intention && (
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "15px",
                fontStyle: "italic",
                color: "var(--color-soil)",
                lineHeight: 1.4,
              }}>
                &ldquo;{entry.intention}&rdquo;
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
