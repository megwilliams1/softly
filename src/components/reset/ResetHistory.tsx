"use client";

import { type ResetEntry } from "@/lib/hooks/useWeeklyReset";

interface Props {
  entries: ResetEntry[];
}

function formatWeekOf(weekKey: string): string {
  const d = new Date(weekKey + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function weeksAgo(weekKey: string): string {
  const then = new Date(weekKey + "T12:00:00");
  const now = new Date();
  const diff = Math.round((now.getTime() - then.getTime()) / (7 * 24 * 60 * 60 * 1000));
  if (diff === 0) return "This week";
  if (diff === 1) return "Last week";
  return `${diff} weeks ago`;
}

export default function ResetHistory({ entries }: Props) {
  if (entries.length === 0) return null;

  // Skip this week — it's shown in the main reset flow
  const past = entries.filter((_, i) => i !== 0 || entries[0].weekKey !== entries[0].weekKey);
  const toShow = entries;

  return (
    <div style={{ maxWidth: "480px", width: "100%", margin: "0 auto" }}>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "9.5px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--color-lavender-label)",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Past Resets
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {toShow.map((entry, i) => (
          <div
            key={entry.weekKey}
            className="animate-bloom-up"
            style={{
              animationDelay: `${i * 0.06}s`,
              animationFillMode: "both",
              backgroundColor: "var(--color-white)",
              borderRadius: "var(--radius-lg)",
              padding: "18px 20px",
              boxShadow: "var(--shadow-soft)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-lavender-label)",
                  margin: 0,
                }}
              >
                Week of {formatWeekOf(entry.weekKey)}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  color: "var(--color-pebble)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {weeksAgo(entry.weekKey)}
              </span>
            </div>

            {entry.weekMood && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    color: "var(--color-stone)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontWeight: 500,
                  }}
                >
                  Mood
                </span>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "rgba(176, 148, 210, 0.12)",
                    border: "1px solid rgba(176, 148, 210, 0.25)",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "var(--color-lavender-label)",
                  }}
                >
                  {entry.weekMood}
                </span>
              </div>
            )}

            {entry.intention && (
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "var(--color-soil)",
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                &ldquo;{entry.intention}&rdquo;
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
