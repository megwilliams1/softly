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
  const [popping, setPopping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const index = (getDayIndex() + offset) % affirmations.length;

  function handleNext() {
    setOffset((o) => o + 1);
    setPopping(true);
    setTimeout(() => setPopping(false), 300);
  }

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
        onClick={handleNext}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={popping ? "animate-bloom-pop" : ""}
        style={{
          marginTop: "24px",
          padding: "9px 22px",
          borderRadius: "var(--radius-full)",
          border: "1.5px solid var(--color-sage)",
          backgroundColor: hovered ? "rgba(168, 184, 154, 0.15)" : "transparent",
          color: "var(--color-moss)",
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
        }}
      >
        Show me another
      </button>
    </div>
  );
}
