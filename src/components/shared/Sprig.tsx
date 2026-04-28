import React from "react";

export default function Sprig({
  color = "#a8b89a",
  opacity = 0.22,
  size = 90,
  flip = false,
  style,
}: {
  color?: string;
  opacity?: number;
  size?: number;
  flip?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size * 1.45}
      viewBox="0 0 60 87"
      fill="none"
      aria-hidden="true"
      style={{
        display: "block",
        transform: flip ? "scaleX(-1)" : "none",
        pointerEvents: "none",
        flexShrink: 0,
        ...style,
      }}
    >
      <path
        d="M30 85C30 72 29.5 48 30 8"
        stroke={color} strokeWidth="1.5" strokeLinecap="round"
        opacity={opacity}
      />
      <path
        d="M30 72Q14 65 9 69Q7 60 23 56Q30 58 30 72Z"
        fill={color} opacity={opacity * 0.9}
      />
      <path
        d="M30 72Q14 65 9 69"
        stroke={color} strokeWidth="0.9" strokeLinecap="round"
        opacity={opacity}
      />
      <path
        d="M30 55Q47 48 52 52Q54 43 39 39Q30 41 30 55Z"
        fill={color} opacity={opacity * 0.7}
      />
      <path
        d="M30 55Q47 48 52 52"
        stroke={color} strokeWidth="0.9" strokeLinecap="round"
        opacity={opacity}
      />
      <path
        d="M30 38Q14 31 10 35Q8 27 25 23Q30 25 30 38Z"
        fill={color} opacity={opacity * 0.55}
      />
      <path
        d="M30 38Q14 31 10 35"
        stroke={color} strokeWidth="0.7" strokeLinecap="round"
        opacity={opacity * 0.8}
      />
      <ellipse cx="30" cy="9" rx="4.5" ry="7"
        fill={color} opacity={opacity * 0.4}
      />
    </svg>
  );
}
