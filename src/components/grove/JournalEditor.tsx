"use client";

import { useState } from "react";
import { MoodKey } from "@/lib/hooks/useMood";
import { useJournal } from "@/lib/hooks/useJournal";

const PROMPTS = [
  "What's taking up the most space in your mind today?",
  "What do you need to release?",
  "Where did you feel most yourself today?",
  "What small thing brought you unexpected comfort?",
  "What are you carrying that isn't yours to carry?",
  "If your body could speak right now, what would it say?",
  "What does rest mean to you today?",
  "What would feel like a gift to yourself right now?",
  "What moment today made you pause?",
  "What are you learning about yourself lately?",
  "What do you want to remember about this season of life?",
  "Where did you find beauty today, even in something small?",
  "What do you wish someone understood about how you're feeling?",
  "What does your younger self need to hear from you today?",
  "What would gentleness look like in your day tomorrow?",
];

interface Props {
  uid: string | null;
  mood: MoodKey | null;
  onSaved: () => void;
}

export default function JournalEditor({ uid, mood, onSaved }: Props) {
  const { todayEntry, saveEntry } = useJournal(uid);
  const [text, setText] = useState(todayEntry?.text ?? "");
  const [isPromptMode, setIsPromptMode] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(!todayEntry);
  const [saving, setSaving] = useState(false);

  const activePrompt = PROMPTS[promptIndex];

  function shufflePrompt() {
    const next = (promptIndex + 1) % PROMPTS.length;
    setPromptIndex(next);
  }

  async function handleSave() {
    if (!text.trim()) return;
    setSaving(true);
    await saveEntry(text.trim(), mood, isPromptMode ? activePrompt : null);
    setSaving(false);
    setIsEditing(false);
    onSaved();
  }

  if (!isEditing && todayEntry) {
    return (
      <div
        className="animate-bloom-up"
        style={{
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--radius-lg)",
          padding: "28px",
          boxShadow: "var(--shadow-card)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            color: "var(--color-lavender)",
            fontWeight: 600,
            filter: "brightness(0.75)",
          }}
        >
          Today&rsquo;s entry
        </p>
        {todayEntry.promptUsed && (
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-stone)",
              fontStyle: "italic",
            }}
          >
            &ldquo;{todayEntry.promptUsed}&rdquo;
          </p>
        )}
        <div
          style={{
            borderLeft: "3px solid var(--color-lavender)",
            paddingLeft: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--color-soil)",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
            }}
          >
            {todayEntry.text}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          style={{
            marginTop: "16px",
            alignSelf: "flex-start",
            fontSize: "0.8rem",
            color: "var(--color-moss)",
            background: "none",
            border: "1px solid rgba(92, 107, 80, 0.3)",
            borderRadius: "var(--radius-full)",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            padding: "5px 14px",
          }}
        >
          Edit entry
        </button>
      </div>
    );
  }

  return (
    <div
      className="animate-bloom-up"
      style={{
        backgroundColor: "var(--color-white)",
        borderRadius: "var(--radius-lg)",
        padding: "28px",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Mode toggle */}
      <div style={{ display: "flex", gap: "8px" }}>
        {["Write freely", "Give me a prompt"].map((label, i) => {
          const active = i === 0 ? !isPromptMode : isPromptMode;
          return (
            <button
              key={label}
              onClick={() => setIsPromptMode(i === 1)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                backgroundColor: active ? "var(--color-lavender)" : "transparent",
                color: active ? "var(--color-soil)" : "var(--color-stone)",
                border: active ? "none" : "1.5px solid rgba(212,197,226,0.5)",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "background-color 0.15s ease, color 0.15s ease",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Prompt display */}
      {isPromptMode && (
        <div
          style={{
            backgroundColor: "rgba(212,197,226,0.12)",
            borderLeft: "3px solid var(--color-lavender)",
            borderRadius: "var(--radius-md)",
            padding: "14px 16px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              color: "var(--color-soil)",
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            {activePrompt}
          </p>
          <button
            onClick={shufflePrompt}
            title="New prompt"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-moss)",
              fontSize: "1.1rem",
              flexShrink: 0,
              padding: "2px",
            }}
          >
            ↻
          </button>
        </div>
      )}

      {/* Textarea */}
      <textarea
        placeholder={isPromptMode ? activePrompt : "Write whatever is here for you..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "var(--radius-md)",
          border: "1px solid rgba(176, 168, 154, 0.4)",
          fontSize: "0.95rem",
          fontFamily: "var(--font-body)",
          color: "var(--color-soil)",
          backgroundColor: "var(--color-cream)",
          outline: "none",
          resize: "vertical",
          lineHeight: 1.7,
          boxSizing: "border-box",
        }}
      />

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={!text.trim() || saving}
        style={{
          alignSelf: "flex-end",
          padding: "10px 28px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--color-lavender)",
          color: "var(--color-soil)",
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          fontWeight: 500,
          border: "none",
          cursor: text.trim() && !saving ? "pointer" : "default",
          opacity: text.trim() && !saving ? 1 : 0.5,
          transition: "opacity 0.15s ease",
        }}
      >
        {saving ? "Saving..." : "Save entry"}
      </button>
    </div>
  );
}
