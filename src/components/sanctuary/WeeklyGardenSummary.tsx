"use client";

import { useWeeklySummary } from "@/lib/hooks/useWeeklySummary";

interface Props {
  uid: string | null;
  prominent?: boolean; // true on Sundays — slightly larger presentation
}

export default function WeeklyGardenSummary({ uid, prominent = false }: Props) {
  const { summaryLines, isSunday } = useWeeklySummary(uid);
  const { headline, presence, gratitude, closing } = summaryLines;

  return (
    <div
      className="animate-bloom-up"
      style={{
        backgroundColor: "var(--color-white)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
        padding: prominent ? "36px 28px" : "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "520px",
      }}
    >
      {/* Icon + label row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>🌿</span>
        <p
          style={{
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            color: "var(--color-sage)",
            fontWeight: 600,
          }}
        >
          {isSunday ? "Your week in the garden" : "This week so far"}
        </p>
      </div>

      {/* The letter */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Headline — display font, larger */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: prominent ? "1.55rem" : "1.35rem",
            color: "var(--color-soil)",
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          {headline}
        </p>

        {/* Data lines — body font, stone color */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-stone)",
              fontFamily: "var(--font-body)",
              lineHeight: 1.5,
            }}
          >
            {presence}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-stone)",
              fontFamily: "var(--font-body)",
              lineHeight: 1.5,
            }}
          >
            {gratitude}
          </p>
        </div>

        {/* Closing — slightly set apart */}
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--color-soil)",
            fontFamily: "var(--font-body)",
            lineHeight: 1.5,
            marginTop: "4px",
            fontStyle: "italic",
          }}
        >
          {closing}
        </p>
      </div>
    </div>
  );
}
