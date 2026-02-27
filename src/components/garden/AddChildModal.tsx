"use client";

import { useEffect, useState } from "react";
import { CHILD_COLORS } from "@/lib/hooks/useChildren";

interface Props {
  takenColors: string[];
  onAdd: (name: string, color: string) => void;
  onClose: () => void;
}

export default function AddChildModal({ takenColors, onAdd, onClose }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(
    CHILD_COLORS.find((c) => !takenColors.includes(c)) ?? CHILD_COLORS[0]
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const canSave = name.trim().length > 0;

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
          borderRadius: "20px",
          boxShadow: "var(--shadow-lift)",
          padding: "28px 24px",
          width: "100%",
          maxWidth: "360px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Header */}
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
            New child
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              color: "var(--color-soil)",
              fontWeight: 500,
            }}
          >
            Add a child
          </h2>
        </div>

        {/* Name input */}
        <input
          autoFocus
          type="text"
          placeholder="Child's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && canSave) onAdd(name.trim(), color);
          }}
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
            boxSizing: "border-box",
          }}
        />

        {/* Color swatches */}
        <div>
          <p
            style={{
              fontSize: "0.7rem",
              color: "var(--color-stone)",
              marginBottom: "10px",
            }}
          >
            Pick a color
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {CHILD_COLORS.map((c) => {
              const taken = takenColors.includes(c);
              const selected = color === c;
              return (
                <button
                  key={c}
                  onClick={() => { if (!taken) setColor(c); }}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: c,
                    border: selected
                      ? "3px solid var(--color-soil)"
                      : "3px solid transparent",
                    cursor: taken ? "not-allowed" : "pointer",
                    opacity: taken ? 0.3 : 1,
                    transition: "border 0.15s ease, opacity 0.15s ease",
                    padding: 0,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={() => { if (canSave) onAdd(name.trim(), color); }}
          disabled={!canSave}
          style={{
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
          Add child
        </button>
      </div>
    </div>
  );
}
