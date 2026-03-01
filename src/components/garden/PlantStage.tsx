"use client";

interface PlantStageProps {
  stage: 0 | 1 | 2 | 3 | 4;
  size?: number;
}

export default function PlantStage({ stage, size = 100 }: PlantStageProps) {
  const height = size * 1.2;

  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      height={height}
      aria-label={`Plant growth stage ${stage + 1} of 5`}
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Soil mound — shared across all stages */}
      <ellipse
        cx="50"
        cy="112"
        rx="36"
        ry="10"
        style={{ fill: "var(--color-soil)", opacity: 0.2 }}
      />

      {stage === 0 && (
        /* Seed — a small dome peeking above the soil */
        <path
          d="M43 110 Q50 101 57 110 Z"
          style={{ fill: "var(--color-soil)", opacity: 0.45 }}
        />
      )}

      {stage === 1 && (
        /* Sprout — a single curled shoot just emerging */
        <>
          <path
            d="M50 108 C49 98 51 93 50 87"
            stroke="var(--color-sage)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M50 87 C57 83 63 88 58 95 C54 98 50 92 50 87 Z"
            style={{ fill: "var(--color-sage)", opacity: 0.85 }}
          />
        </>
      )}

      {stage === 2 && (
        /* Seedling — upright stem, two rounded leaves */
        <>
          <line
            x1="50" y1="108" x2="50" y2="69"
            stroke="var(--color-sage)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Left leaf */}
          <path
            d="M50 88 C40 81 34 90 40 97 C44 100 50 94 50 88 Z"
            style={{ fill: "var(--color-moss)" }}
          />
          {/* Right leaf */}
          <path
            d="M50 82 C60 75 66 84 60 91 C56 94 50 88 50 82 Z"
            style={{ fill: "var(--color-moss)" }}
          />
          {/* Small bud tip */}
          <ellipse
            cx="50" cy="66"
            rx="5" ry="7"
            style={{ fill: "var(--color-sage)" }}
          />
        </>
      )}

      {stage === 3 && (
        /* Growing — taller stem, multiple leaf pairs, a bud forming */
        <>
          <line
            x1="50" y1="108" x2="50" y2="50"
            stroke="var(--color-sage)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Lower left */}
          <path
            d="M50 95 C38 87 33 96 39 104 C44 107 50 101 50 95 Z"
            style={{ fill: "var(--color-moss)" }}
          />
          {/* Lower right */}
          <path
            d="M50 88 C62 80 67 89 61 97 C57 100 50 94 50 88 Z"
            style={{ fill: "var(--color-moss)" }}
          />
          {/* Upper left */}
          <path
            d="M50 74 C40 66 35 75 41 83 C45 86 50 80 50 74 Z"
            style={{ fill: "var(--color-sage)", opacity: 0.9 }}
          />
          {/* Upper right */}
          <path
            d="M50 68 C60 60 65 69 59 77 C55 80 50 74 50 68 Z"
            style={{ fill: "var(--color-sage)", opacity: 0.9 }}
          />
          {/* Closed bud */}
          <ellipse
            cx="50" cy="46"
            rx="7" ry="10"
            style={{ fill: "var(--color-sage)" }}
          />
          <ellipse
            cx="50" cy="43"
            rx="5" ry="6"
            style={{ fill: "var(--color-moss)" }}
          />
        </>
      )}

      {stage === 4 && (
        /* Full Bloom — leaves, 6 petals, golden center */
        <>
          <line
            x1="50" y1="108" x2="50" y2="58"
            stroke="var(--color-sage)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Left leaf */}
          <path
            d="M50 92 C37 83 32 93 39 101 C44 104 50 98 50 92 Z"
            style={{ fill: "var(--color-moss)" }}
          />
          {/* Right leaf */}
          <path
            d="M50 82 C63 73 68 83 61 91 C57 94 50 88 50 82 Z"
            style={{ fill: "var(--color-moss)" }}
          />
          {/* 6 petals rotated around center point (50, 43) */}
          {([0, 60, 120, 180, 240, 300] as const).map((angle) => (
            <ellipse
              key={angle}
              cx="50"
              cy="30"
              rx="7"
              ry="12"
              transform={`rotate(${angle} 50 43)`}
              style={{ fill: "var(--color-bloom-pink)", opacity: 0.85 }}
            />
          ))}
          {/* Center */}
          <circle
            cx="50" cy="43" r="9"
            style={{ fill: "var(--color-butter)" }}
          />
          <circle
            cx="50" cy="43" r="5"
            style={{ fill: "var(--color-butter)", opacity: 0.6 }}
          />
        </>
      )}
    </svg>
  );
}
