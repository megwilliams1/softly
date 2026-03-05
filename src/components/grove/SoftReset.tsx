"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { label: "Breathe in...", sub: "4 counts", duration: 4000 },
  { label: "Hold...",       sub: "4 counts", duration: 4000 },
  { label: "Breathe out...", sub: "6 counts", duration: 6000 },
];

interface Props {
  onDone: () => void;
}

export default function SoftReset({ onDone }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = () => {
      setStepIndex((prev) => (prev + 1) % STEPS.length);
    };
    const timeout = setTimeout(cycle, STEPS[stepIndex].duration);
    return () => clearTimeout(timeout);
  }, [stepIndex]);

  // Auto-close after 2 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 120_000);
    return () => clearTimeout(timer);
  }, [onDone]);

  function handleReady() {
    setVisible(false);
    setTimeout(onDone, 400);
  }

  const step = STEPS[stepIndex];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(61, 53, 48, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        padding: "24px",
      }}
    >
      <div
        className="animate-bloom-up"
        style={{
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--radius-lg)",
          padding: "48px 40px",
          maxWidth: "380px",
          width: "100%",
          textAlign: "center",
          boxShadow: "var(--shadow-lift)",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--color-sage)",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          Soft reset
        </p>

        {/* Breathing circle */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "var(--color-mist)",
            border: "3px solid var(--color-sage)",
            margin: "0 auto 24px",
            animation: `soft-pulse ${step.duration / 1000}s ease-in-out infinite`,
          }}
        />

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            color: "var(--color-soil)",
            marginBottom: "6px",
            fontWeight: 400,
          }}
        >
          {step.label}
        </h2>
        <p style={{ color: "var(--color-stone)", fontSize: "1rem", marginBottom: "36px" }}>
          {step.sub}
        </p>

        <button
          onClick={handleReady}
          style={{
            padding: "10px 28px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "transparent",
            color: "var(--color-moss)",
            border: "1.5px solid rgba(168, 184, 154, 0.6)",
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          I&rsquo;m ready
        </button>
      </div>
    </div>
  );
}
