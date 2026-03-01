"use client";

import { useState, useEffect } from "react";
import { useGratitude, GratitudeEntry } from "@/lib/hooks/useGratitude";

const PLACEHOLDERS = [
  "Something that made you smile today...",
  "A person who showed up for you...",
  "A small moment worth holding onto...",
];

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "var(--radius-md)",
  border: "1px solid rgba(176, 168, 154, 0.4)",
  fontSize: "0.95rem",
  fontFamily: "var(--font-body)",
  color: "var(--color-soil)",
  backgroundColor: "var(--color-white)",
  outline: "none",
  boxSizing: "border-box" as const,
  resize: "none" as const,
};

export default function GratitudeJournal({ uid }: { uid: string | null }) {
  const { todayEntry, yesterdayEntry, saveEntry } = useGratitude(uid);
  const [isEditing, setIsEditing] = useState(true);
  const [values, setValues] = useState<GratitudeEntry>(["", "", ""]);
  const [saved, setSaved] = useState(false);

  // Sync state when Firestore data loads
  useEffect(() => {
    if (todayEntry) {
      setIsEditing(false);
      setValues(todayEntry);
    }
  }, [todayEntry]);

  function handleSave() {
    const trimmed = values.map((v) => v.trim()) as GratitudeEntry;
    if (trimmed.every((v) => v === "")) return;
    saveEntry(trimmed);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleEdit() {
    setIsEditing(true);
    setSaved(false);
  }

  return (
    <div style={{ maxWidth: "520px", display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Today's card */}
      <div
        style={{
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-card)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {isEditing ? (
          <>
            {values.map((val, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontWeight: 600,
                    color: "var(--color-bloom-pink)" ,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  I'm grateful for...
                </label>
                <textarea
                  rows={2}
                  placeholder={PLACEHOLDERS[i]}
                  value={val}
                  onChange={(e) => {
                    const next = [...values] as GratitudeEntry;
                    next[i] = e.target.value;
                    setValues(next);
                  }}
                  style={inputStyle}
                />
              </div>
            ))}

            <button
              onClick={handleSave}
              disabled={values.every((v) => v.trim() === "")}
              style={{
                padding: "11px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-bloom-pink)",
                color: "var(--color-soil)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                border: "none",
                cursor: values.every((v) => v.trim() === "") ? "default" : "pointer",
                opacity: values.every((v) => v.trim() === "") ? 0.5 : 1,
                transition: "opacity 0.15s ease",
              }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            {/* Saved confirmation */}
            {saved && (
              <p
                className="animate-bloom-up"
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-sage)",
                  fontWeight: 500,
                }}
              >
                ✓ Saved — beautifully done.
              </p>
            )}

            {/* Read-only entries */}
            {(todayEntry ?? values).map((entry, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontWeight: 600,
                    color: "var(--color-bloom-pink)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  I'm grateful for...
                </span>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: entry ? "var(--color-soil)" : "var(--color-pebble)",
                    fontStyle: entry ? "normal" : "italic",
                    lineHeight: 1.5,
                  }}
                >
                  {entry || "Not filled in"}
                </p>
              </div>
            ))}

            <button
              onClick={handleEdit}
              style={{
                alignSelf: "flex-start",
                fontSize: "0.8rem",
                color: "var(--color-pebble)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "var(--font-body)",
              }}
            >
              Edit today's entries
            </button>
          </>
        )}
      </div>

      {/* Yesterday's entries */}
      {yesterdayEntry && (
        <div
          style={{
            backgroundColor: "transparent",
            borderRadius: "var(--radius-lg)",
            border: "1px solid rgba(176, 168, 154, 0.3)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: 600,
              color: "var(--color-pebble)",
              fontFamily: "var(--font-body)",
            }}
          >
            Yesterday
          </p>
          {yesterdayEntry.map((entry, i) => (
            <p
              key={i}
              style={{
                fontSize: "0.875rem",
                color: "var(--color-stone)",
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              "{entry}"
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
