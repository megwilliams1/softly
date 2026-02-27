"use client";

import { useState } from "react";
import affirmations from "@/data/affirmations.json";

function getDayIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return dayOfYear % affirmations.length;
}

export default function DailyAffirmation() {
  const [offset, setOffset] = useState(0);
  const index = (getDayIndex() + offset) % affirmations.length;

  return (
    <div
      style={{
        textAlign: "center",
        padding: "32px 24px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div
        key={index}
        className="animate-petal-drift"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
      >
        <span style={{ fontSize: "1.6rem" }}>🌸</span>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-soil)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {affirmations[index]}
        </p>

        <span style={{ fontSize: "1.2rem", opacity: 0.6 }}>✦</span>
      </div>

      <button
        onClick={() => setOffset((o) => o + 1)}
        style={{
          marginTop: "20px",
          fontSize: "0.75rem",
          color: "var(--color-pebble)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          letterSpacing: "0.04em",
        }}
      >
        another one
      </button>
    </div>
  );
}
