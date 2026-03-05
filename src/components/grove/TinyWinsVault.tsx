"use client";

import { useState } from "react";
import { useTinyWins } from "@/lib/hooks/useTinyWins";

const EMOJI_OPTIONS = [
  { emoji: "🌸", label: "Kid moment" },
  { emoji: "⭐", label: "Proud of myself" },
  { emoji: "🌿", label: "Peace" },
  { emoji: "💪", label: "Strength" },
  { emoji: "🥹", label: "Tender" },
];

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface Props {
  uid: string | null;
}

export default function TinyWinsVault({ uid }: Props) {
  const { wins, addWin, deleteWin } = useTinyWins(uid);
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState(EMOJI_OPTIONS[0].emoji);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  async function handleAdd() {
    if (!text.trim()) return;
    setAdding(true);
    await addWin(text.trim(), emoji);
    setText("");
    setAdding(false);
  }

  return (
    <div
      style={{
        backgroundColor: "var(--color-white)",
        borderRadius: "var(--radius-lg)",
        padding: "24px 28px",
        boxShadow: "var(--shadow-soft)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <p
        style={{
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "var(--color-sage)",
          fontWeight: 600,
        }}
      >
        Tiny Wins Vault
      </p>

      {/* Emoji selector */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {EMOJI_OPTIONS.map(({ emoji: e, label }) => (
          <button
            key={e}
            onClick={() => setEmoji(e)}
            title={label}
            style={{
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              backgroundColor: emoji === e ? "var(--color-mist)" : "transparent",
              border: emoji === e ? "2px solid var(--color-sage)" : "1.5px solid rgba(168,184,154,0.35)",
              cursor: "pointer",
              fontSize: "1.1rem",
              transition: "background-color 0.15s ease",
            }}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Add a tiny win..."
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
            backgroundColor: "var(--color-cream)",
            outline: "none",
          }}
        />
        <button
          onClick={handleAdd}
          disabled={!text.trim() || adding}
          style={{
            padding: "10px 18px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-sage)",
            color: "var(--color-white)",
            border: "none",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: text.trim() && !adding ? "pointer" : "default",
            opacity: text.trim() && !adding ? 1 : 0.5,
            transition: "opacity 0.15s ease",
          }}
        >
          Add
        </button>
      </div>

      {/* List */}
      {wins.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            maxHeight: "320px",
            overflowY: "auto",
          }}
        >
          {wins.map((win) => (
            <div
              key={win.id}
              onMouseEnter={() => setHoveredId(win.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "var(--color-white)",
                borderRadius: "var(--radius-md)",
                padding: "10px 14px",
                border: "1px solid rgba(168,184,154,0.2)",
                borderLeft: "3px solid var(--color-sage)",
                position: "relative",
                transition: "box-shadow 0.15s ease",
                boxShadow: hoveredId === win.id ? "var(--shadow-soft)" : "none",
              }}
            >
              <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{win.emoji}</span>
              <span
                style={{
                  flex: 1,
                  fontSize: "0.9rem",
                  color: "var(--color-soil)",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.5,
                }}
              >
                {win.text}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-pebble)",
                  fontFamily: "var(--font-body)",
                  flexShrink: 0,
                }}
              >
                {formatDate(win.createdAt)}
              </span>
              <button
                onClick={() => deleteWin(win.id)}
                title="Remove"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  color: "var(--color-pebble)",
                  padding: "0 2px",
                  fontFamily: "var(--font-body)",
                  opacity: hoveredId === win.id ? 1 : 0.25,
                  transition: "opacity 0.15s ease",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {wins.length === 0 && (
        <p style={{ fontSize: "0.85rem", color: "var(--color-pebble)", fontFamily: "var(--font-body)" }}>
          Your wins are waiting to be named. Start small.
        </p>
      )}
    </div>
  );
}
