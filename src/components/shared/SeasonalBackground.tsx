"use client";

import { getSeason, type Season } from "@/lib/utils/season";

const seasonalStyles = {
  spring: { emoji: "🌸", label: "Spring" },
  summer: { emoji: "🌻", label: "Summer" },
  fall:   { emoji: "🍂", label: "Fall"   },
  winter: { emoji: "❄️", label: "Winter" },
};

// Pre-defined particle configs per season (deterministic — no random, SSR-safe)
type Particle = { left: number; delay: number; duration: number; size: number };

const PARTICLES: Record<Season, Particle[]> = {
  spring: [
    { left: 5,  delay: 0,   duration: 9,  size: 14 },
    { left: 15, delay: 2,   duration: 11, size: 12 },
    { left: 28, delay: 0.5, duration: 8,  size: 16 },
    { left: 42, delay: 3.5, duration: 10, size: 13 },
    { left: 55, delay: 1,   duration: 12, size: 11 },
    { left: 67, delay: 4,   duration: 9,  size: 15 },
    { left: 78, delay: 2.5, duration: 10, size: 12 },
    { left: 90, delay: 1.5, duration: 8,  size: 14 },
  ],
  summer: [
    { left: 8,  delay: 0,   duration: 7,  size: 12 },
    { left: 20, delay: 1.5, duration: 9,  size: 10 },
    { left: 33, delay: 3,   duration: 8,  size: 13 },
    { left: 47, delay: 0.5, duration: 10, size: 11 },
    { left: 60, delay: 2,   duration: 7,  size: 12 },
    { left: 72, delay: 4,   duration: 9,  size: 10 },
    { left: 83, delay: 1,   duration: 8,  size: 13 },
    { left: 93, delay: 3.5, duration: 7,  size: 11 },
  ],
  fall: [
    { left: 6,  delay: 0,   duration: 8,  size: 16 },
    { left: 17, delay: 2,   duration: 10, size: 14 },
    { left: 30, delay: 1,   duration: 9,  size: 15 },
    { left: 44, delay: 3,   duration: 11, size: 13 },
    { left: 57, delay: 0.5, duration: 8,  size: 16 },
    { left: 69, delay: 4,   duration: 10, size: 14 },
    { left: 80, delay: 2.5, duration: 9,  size: 15 },
    { left: 91, delay: 1.5, duration: 8,  size: 13 },
  ],
  winter: [
    { left: 7,  delay: 0,   duration: 10, size: 13 },
    { left: 18, delay: 2.5, duration: 12, size: 11 },
    { left: 31, delay: 1,   duration: 9,  size: 14 },
    { left: 45, delay: 3.5, duration: 11, size: 12 },
    { left: 58, delay: 0.5, duration: 10, size: 13 },
    { left: 70, delay: 2,   duration: 12, size: 11 },
    { left: 81, delay: 4,   duration: 9,  size: 14 },
    { left: 92, delay: 1.5, duration: 11, size: 12 },
  ],
};

const PARTICLE_EMOJI: Record<Season, string> = {
  spring: "🌸",
  summer: "✨",
  fall:   "🍂",
  winter: "❄️",
};

const PARTICLE_ANIMATION: Record<Season, string> = {
  spring: "petal-fall",
  summer: "pollen-drift",
  fall:   "petal-fall",
  winter: "drop-fall",
};

export default function SeasonalBackground() {
  const season = getSeason();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: seasonalStyles[season] ? `var(--color-seasonal-primary)` : undefined }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: `var(--color-seasonal-secondary)` }}
      />
    </div>
  );
}
