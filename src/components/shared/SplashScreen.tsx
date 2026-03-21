"use client";

import { useEffect, useState } from "react";
import { getSeason } from "@/lib/utils/season";

type Particle = { left: number; delay: number; duration: number; size: number };

const PARTICLES: Particle[] = [
  { left: 5,  delay: 0,   duration: 4,  size: 16 },
  { left: 15, delay: 0.8, duration: 5,  size: 13 },
  { left: 28, delay: 0.2, duration: 4,  size: 17 },
  { left: 42, delay: 1.2, duration: 5,  size: 14 },
  { left: 55, delay: 0.5, duration: 4,  size: 15 },
  { left: 67, delay: 1.5, duration: 5,  size: 13 },
  { left: 78, delay: 0.3, duration: 4,  size: 16 },
  { left: 90, delay: 1,   duration: 5,  size: 14 },
];

const PARTICLE_EMOJI: Record<string, string> = {
  spring: "🌸",
  summer: "✨",
  fall:   "🍂",
  winter: "❄️",
};

const PARTICLE_ANIMATION: Record<string, string> = {
  spring: "petal-fall",
  summer: "pollen-drift",
  fall:   "petal-fall",
  winter: "drop-fall",
};

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const season = getSeason();
  const particleEmoji = PARTICLE_EMOJI[season];
  const animation = PARTICLE_ANIMATION[season];

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("out"), 1600);
    const doneTimer = setTimeout(() => onComplete(), 2200);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(242, 196, 206, 0.55) 0%, transparent 55%),
          radial-gradient(ellipse at 75% 80%, rgba(168, 184, 154, 0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 30%, rgba(247, 230, 176, 0.4) 0%, transparent 45%),
          #faf6f0
        `,
        transition: "opacity 0.6s ease",
        opacity: phase === "out" ? 0 : 1,
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      {/* Seasonal particles */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
      >
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animation: `${animation} ${p.duration}s ease-in ${p.delay}s infinite`,
              opacity: 0,
            }}
          >
            {particleEmoji}
          </div>
        ))}
      </div>

      {/* Logo content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          animation: "bloom-up 0.8s ease-out forwards",
          textAlign: "center",
          padding: "0 32px",
        }}
      >
        {/* Leaf + S monogram */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "rgba(168, 184, 154, 0.2)",
            border: "1.5px solid rgba(168, 184, 154, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "28px", lineHeight: 1 }}>🌿</span>
        </div>

        {/* Softly wordmark */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 12vw, 5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-soil)",
            letterSpacing: "0.02em",
            lineHeight: 1,
            margin: 0,
          }}
        >
          Softly
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.85rem, 3vw, 1rem)",
            color: "var(--color-stone)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            margin: 0,
            marginTop: "4px",
          }}
        >
          A quiet little garden for your life.
        </p>
      </div>
    </div>
  );
}
