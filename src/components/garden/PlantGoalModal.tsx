"use client";

import { useEffect, useState } from "react";

interface Props {
  existing?: string;
  onSave: (text: string) => void;
  onClose: () => void;
}

export default function PlantGoalModal({ existing, onSave, onClose }: Props) {
  const [text, setText] = useState(existing ?? "");

  const canSave = text.trim().length > 0;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(61, 53, 48, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
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
          padding: "28px 24px",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "var(--color-sage)",
              fontWeight: 600,
              marginBottom: "4px",
            }}
          >
            {existing ? "Edit your goal" : "Plant a goal"}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              color: "var(--color-soil)",
              fontWeight: 500,
            }}
          >
            What are you tending?
          </h2>
        </div>

        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--color-stone)",
            lineHeight: 1.6,
            marginTop: "-8px",
          }}
        >
          Keep it small and honest. Something you want to show up for, one day at a time.
        </p>

        <textarea
          autoFocus
          rows={3}
          placeholder="e.g. drink more water, walk every morning, read before bed..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(176, 168, 154, 0.4)",
            fontSize: "0.95rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-soil)",
            backgroundColor: "var(--color-cream)",
            outline: "none",
            resize: "none",
            lineHeight: 1.6,
            boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              if (canSave) onSave(text.trim());
            }}
            disabled={!canSave}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-sage)",
              color: "var(--color-white)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              border: "none",
              cursor: canSave ? "pointer" : "default",
              opacity: canSave ? 1 : 0.5,
              transition: "opacity 0.15s ease",
            }}
          >
            Plant it
          </button>

          <button
            onClick={onClose}
            style={{
              padding: "11px 18px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "transparent",
              color: "var(--color-stone)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              border: "1px solid rgba(176, 168, 154, 0.4)",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
