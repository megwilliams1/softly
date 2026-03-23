"use client";

import { useState } from "react";
import { useMood, MoodKey } from "@/lib/hooks/useMood";

const MOODS: { key: MoodKey; emoji: string; label: string; subtext: string }[] = [
  { key: "radiant",  emoji: "🌟", label: "Radiant",  subtext: "Glowing today" },
  { key: "content",  emoji: "🌸", label: "Content",  subtext: "Peacefully okay" },
  { key: "okay",     emoji: "🌿", label: "Okay",     subtext: "Getting through" },
  { key: "low",      emoji: "🌧️", label: "Low",      subtext: "A little heavy" },
  { key: "drained",  emoji: "🥀", label: "Drained",  subtext: "Running on empty" },
];

export default function MoodCheckin({ uid }: { uid: string | null }) {
  const { todayMood, setMood } = useMood(uid);
  const [lastSelected, setLastSelected] = useState<MoodKey | null>(null);

  function handleSelect(key: MoodKey) {
    setMood(key);
    setLastSelected(key);
    setTimeout(() => setLastSelected(null), 350);
  }

  return (
    <div>
      <p style={{ fontSize: "0.9rem", color: "var(--color-stone)", marginBottom: "20px" }}>
        {todayMood
          ? "You've checked in today. You can always update it."
          : "Take a breath. How are you feeling right now?"}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {MOODS.map(({ key, emoji, label, subtext }) => {
          const isSelected = todayMood === key;
          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={lastSelected === key ? "animate-bloom-pop" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                padding: "16px 12px",
                borderRadius: "var(--radius-lg)",
                backgroundColor: isSelected
                  ? "var(--color-lavender)"
                  : "var(--color-white)",
                border: isSelected
                  ? "2px solid var(--color-lavender)"
                  : "2px solid transparent",
                boxShadow: isSelected ? "var(--shadow-card)" : "var(--shadow-soft)",
                cursor: "pointer",
                minWidth: "88px",
                flex: "1 1 88px",
                maxWidth: "120px",
                transition: "background-color 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{emoji}</span>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--color-soil)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-stone)",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {subtext}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
