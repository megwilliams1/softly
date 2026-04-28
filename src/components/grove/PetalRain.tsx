"use client";

const PETALS = [
  { left: "8%",  duration: 9,  delay: 0   },
  { left: "15%", duration: 11, delay: 1.2 },
  { left: "24%", duration: 8,  delay: 3.0 },
  { left: "31%", duration: 13, delay: 0.5 },
  { left: "40%", duration: 10, delay: 2.1 },
  { left: "48%", duration: 7,  delay: 4.0 },
  { left: "55%", duration: 12, delay: 1.7 },
  { left: "63%", duration: 9,  delay: 0.9 },
  { left: "70%", duration: 14, delay: 3.5 },
  { left: "77%", duration: 8,  delay: 2.8 },
  { left: "83%", duration: 11, delay: 5.0 },
  { left: "89%", duration: 10, delay: 1.4 },
  { left: "94%", duration: 9,  delay: 6.2 },
  { left: "5%",  duration: 13, delay: 7.0 },
];

export default function PetalRain() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {PETALS.map((p, i) => (
        <svg
          key={i}
          width="10"
          height="13"
          viewBox="0 0 10 13"
          fill="none"
          style={{
            position: "absolute",
            top: 0,
            left: p.left,
            animation: `petalDrift ${p.duration}s ${p.delay}s infinite ease-in-out`,
          }}
        >
          <path
            d="M5 12C5 12 1 9 1 5.5C1 3 2.8 1 5 1C7.2 1 9 3 9 5.5C9 9 5 12 5 12Z"
            fill="#f2c4ce"
            opacity="0.7"
          />
        </svg>
      ))}
    </div>
  );
}
