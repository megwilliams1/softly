"use client";

import { useState } from "react";
import { useReminders, todayKey } from "@/lib/hooks/useReminders";

export default function SelfCareReminders() {
  const { reminders, addReminder, toggleDone, deleteReminder } = useReminders();
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("");

  const today = todayKey();

  function handleAdd() {
    if (!text.trim()) return;
    addReminder(text.trim(), emoji.trim());
    setText("");
    setEmoji("");
  }

  const active = reminders.filter((r) => r.doneDate !== today);
  const done = reminders.filter((r) => r.doneDate === today);
  const sorted = [...active, ...done];

  return (
    <div style={{ maxWidth: "600px" }}>

      {/* Card grid */}
      {sorted.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {sorted.map((reminder, i) => {
            const isDone = reminder.doneDate === today;
            return (
              <div
                key={reminder.id}
                className="animate-bloom-up"
                style={{
                  animationDelay: `${i * 0.07}s`,
                  animationFillMode: "both",
                  backgroundColor: "var(--color-white)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-soft)",
                  padding: "18px 14px 14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  opacity: isDone ? 0.5 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                {/* Emoji */}
                {reminder.emoji && (
                  <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>
                    {reminder.emoji}
                  </span>
                )}

                {/* Text */}
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-soil)",
                    textAlign: "center",
                    lineHeight: 1.4,
                    textDecoration: isDone ? "line-through" : "none",
                    flex: 1,
                    margin: 0,
                  }}
                >
                  {reminder.text}
                </p>

                {/* Actions */}
                <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                  <button
                    onClick={() => toggleDone(reminder.id)}
                    aria-pressed={isDone}
                    aria-label={isDone ? `Mark "${reminder.text}" as not done` : `Mark "${reminder.text}" as done today`}
                    style={{
                      fontSize: "0.75rem",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: isDone
                        ? "transparent"
                        : "var(--color-bloom-pink)",
                      border: isDone
                        ? "1px solid rgba(176, 168, 154, 0.4)"
                        : "none",
                      color: "var(--color-soil)",
                      fontFamily: "var(--font-body)",
                      cursor: "pointer",
                    }}
                  >
                    {isDone ? "Undo" : "✓ Done"}
                  </button>

                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    aria-label={`Delete "${reminder.text}"`}
                    style={{
                      fontSize: "0.75rem",
                      padding: "4px 8px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "transparent",
                      border: "none",
                      color: "var(--color-pebble)",
                      fontFamily: "var(--font-body)",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {reminders.length === 0 && (
        <p style={{ fontSize: "0.875rem", color: "var(--color-pebble)", marginBottom: "20px" }}>
          Add a few reminders for small acts of care — just for you.
        </p>
      )}

      {/* Add form */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="🌿"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          style={{
            width: "52px",
            padding: "10px",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(176, 168, 154, 0.4)",
            fontSize: "1rem",
            textAlign: "center",
            fontFamily: "var(--font-body)",
            backgroundColor: "var(--color-white)",
            outline: "none",
            flexShrink: 0,
          }}
        />
        <input
          type="text"
          placeholder="e.g. Take a 10 minute walk"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(176, 168, 154, 0.4)",
            fontSize: "0.9rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-soil)",
            backgroundColor: "var(--color-white)",
            outline: "none",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "10px 16px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-bloom-pink)",
            color: "var(--color-soil)",
            border: "none",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
