"use client";

import { useEffect, useState } from "react";

interface Props {
  displayName: string | null;
  onClose: () => void;
}

const SECTIONS = [
  { emoji: "🌱", title: "The Garden",       desc: "Plan meals, track kids' activities, and tend your week." },
  { emoji: "✨", title: "The Sanctuary",    desc: "Gratitude, mood check-ins, and gentle self-care reminders." },
  { emoji: "🔥", title: "The Hearth",       desc: "Save and share warm recipes with your people." },
  { emoji: "🌿", title: "Reflection Grove", desc: "A quiet space to journal, reflect, and grow." },
];

export default function WelcomeModal({ displayName, onClose }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function handleClose() {
    setVisible(false);
    localStorage.setItem("softly_welcomed", "true");
    setTimeout(onClose, 400);
  }

  const firstName = displayName?.split(" ")[0] ?? null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(61, 53, 48, 0.4)",
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
        onClick={(e) => e.stopPropagation()}
        className="animate-bloom-up"
        style={{
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lift)",
          padding: "40px 32px",
          width: "100%",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "2rem", marginBottom: "12px" }}>🌱</p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              color: "var(--color-soil)",
              fontWeight: 500,
              marginBottom: "8px",
            }}
          >
            {firstName ? `Welcome, ${firstName}.` : "Welcome to Softly."}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--color-stone)",
              lineHeight: 1.6,
            }}
          >
            Your garden is ready. Here&rsquo;s where to begin.
          </p>
        </div>

        {/* Section list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {SECTIONS.map(({ emoji, title, desc }) => (
            <div key={title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.3rem", lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    color: "var(--color-soil)",
                    fontWeight: 500,
                    marginBottom: "2px",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "var(--color-stone)",
                    lineHeight: 1.4,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleClose}
          style={{
            padding: "12px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--color-sage)",
            color: "var(--color-white)",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.15s ease",
          }}
        >
          Start exploring →
        </button>
      </div>
    </div>
  );
}
