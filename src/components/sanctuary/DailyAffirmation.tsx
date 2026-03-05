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
        backgroundColor: "var(--color-white)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid rgba(168, 184, 154, 0.15)",
        padding: "48px 40px 36px",
        textAlign: "center",
        maxWidth: "600px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative quote mark */}
      <span
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "8rem",
          lineHeight: 0.7,
          color: "var(--color-bloom-pink)",
          opacity: 0.25,
          position: "absolute",
          top: "20px",
          left: "24px",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        &ldquo;
      </span>

      <div
        key={index}
        className="animate-petal-drift"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-moss)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
          }}
        >
          ✨ Today&rsquo;s Affirmation
        </span>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-soil)",
            lineHeight: 1.6,
            margin: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          {affirmations[index]}
        </p>

        <span style={{ fontSize: "0.9rem", opacity: 0.65, color: "var(--color-bloom-pink)", letterSpacing: "0.4em" }}>
          ✦ ✦ ✦
        </span>
      </div>

      <button
        onClick={handleNext}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={popping ? "animate-bloom-pop" : ""}
        style={{
          marginTop: "28px",
          padding: "9px 24px",
          borderRadius: "var(--radius-full)",
          border: "1.5px solid var(--color-sage)",
          backgroundColor: hovered ? "rgba(168, 184, 154, 0.15)" : "transparent",
          color: "var(--color-moss)",
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          cursor: "pointer",
        }}
      >
        Show me another
      </button>
    </div>
  );
}
