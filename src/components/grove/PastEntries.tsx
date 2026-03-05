"use client";

import { useState } from "react";
import { useJournal } from "@/lib/hooks/useJournal";

const MOOD_EMOJI: Record<string, string> = {
  radiant: "🌟",
  content: "🌸",
  okay:    "🍃",
  low:     "🌧️",
  drained: "🕯️",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

interface Props {
  uid: string | null;
}

export default function PastEntries({ uid }: Props) {
  const { fullHistory } = useJournal(uid);
  const [expanded, setExpanded] = useState(false);
  const [openEntry, setOpenEntry] = useState<string | null>(null);

  // Exclude today
  const today = new Date().toISOString().split("T")[0];
  const past = fullHistory.filter((e) => e.date !== today);

  if (past.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--color-white)",
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontSize: "1.2rem",
          color: "var(--color-soil)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: 0,
          width: "100%",
          textAlign: "left",
        }}
      >
        Look back at your grove {expanded ? "↑" : "↓"}
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.75rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-stone)",
          }}
        >
          {past.length} {past.length === 1 ? "entry" : "entries"}
        </span>
      </button>

      {expanded && (
        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {past.map((entry) => (
            <div
              key={entry.date}
              onClick={() => setOpenEntry(openEntry === entry.date ? null : entry.date)}
              style={{
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--radius-md)",
                padding: "14px 16px",
                cursor: "pointer",
                border: "1px solid rgba(168, 184, 154, 0.2)",
                transition: "box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-soft)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                {entry.mood && (
                  <span style={{ fontSize: "0.95rem" }}>{MOOD_EMOJI[entry.mood]}</span>
                )}
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "var(--color-moss)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {formatDate(entry.date)}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-soil)",
                  lineHeight: 1.6,
                  whiteSpace: openEntry === entry.date ? "pre-wrap" : "nowrap",
                  overflow: openEntry === entry.date ? "visible" : "hidden",
                  textOverflow: openEntry === entry.date ? "unset" : "ellipsis",
                }}
              >
                {entry.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
