"use client";

import { useEffect, useState } from "react";
import { DayKey, MealTime } from "@/lib/hooks/useMeals";

const DAY_LABELS: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

const TIME_LABELS: Record<MealTime, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

const PLACEHOLDERS: Record<MealTime, string> = {
  breakfast: "e.g. Avocado toast",
  lunch: "e.g. Tomato soup",
  dinner: "e.g. Roast chicken",
};

interface Props {
  day: DayKey;
  time: MealTime;
  initialValue: string;
  onSave: (value: string) => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function MealModal({
  day,
  time,
  initialValue,
  onSave,
  onDelete,
  onClose,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const isEditing = initialValue !== "";

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
          maxWidth: "380px",
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
            {TIME_LABELS[time]}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              color: "var(--color-soil)",
              fontWeight: 500,
            }}
          >
            {DAY_LABELS[day]}
          </h2>
        </div>

        {/* Input */}
        <input
          autoFocus
          type="text"
          placeholder={PLACEHOLDERS[time]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) onSave(value.trim());
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

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              if (value.trim()) onSave(value.trim());
            }}
            disabled={!value.trim()}
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
              cursor: value.trim() ? "pointer" : "default",
              opacity: value.trim() ? 1 : 0.5,
              transition: "opacity 0.15s ease",
            }}
          >
            Save
          </button>

          {isEditing && (
            <button
              onClick={onDelete}
              style={{
                padding: "11px 18px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "transparent",
                color: "var(--color-error)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 400,
                border: "1px solid var(--color-error)",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
