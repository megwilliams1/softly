"use client";

import { MoodKey, useMood } from "@/lib/hooks/useMood";

const MOODS: { key: MoodKey; label: string; emoji: string }[] = [
  { key: "radiant", label: "Radiant",  emoji: "🌟" },
  { key: "content", label: "Content",  emoji: "🌸" },
  { key: "okay",    label: "Okay",     emoji: "🍃" },
  { key: "low",     label: "Low",      emoji: "🌧️" },
  { key: "drained", label: "Drained",  emoji: "🕯️" },
];

interface Props {
  uid: string | null;
  onMoodConfirmed: (mood: MoodKey) => void;
}

export default function MoodGate({ uid, onMoodConfirmed }: Props) {
  const { todayMood, setMood } = useMood(uid);

  async function handleSelect(key: MoodKey) {
    await setMood(key);
    onMoodConfirmed(key);
  }

  if (todayMood) {
    const match = MOODS.find((m) => m.key === todayMood);
    return (
      <div
        className="animate-bloom-up"
        style={{
          textAlign: "center",
          padding: "48px 24px",
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "12px" }}>{match?.emoji}</div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            color: "var(--color-soil)",
            marginBottom: "8px",
          }}
        >
          You&rsquo;re feeling {match?.label.toLowerCase()} today.
        </h2>
        <p style={{ color: "var(--color-stone)", marginBottom: "32px", fontSize: "1rem" }}>
          This is your space for today. Ready to write?
        </p>
        <button
          onClick={() => onMoodConfirmed(todayMood)}
          style={{
            padding: "12px 32px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--color-sage)",
            color: "var(--color-white)",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
          }}
        >
          Enter the grove
        </button>
      </div>
    );
  }

  return (
    <div
      className="animate-bloom-up"
      style={{
        textAlign: "center",
        padding: "48px 24px",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          color: "var(--color-soil)",
          marginBottom: "8px",
        }}
      >
        How are you feeling today?
      </h2>
      <p style={{ color: "var(--color-stone)", marginBottom: "36px", fontSize: "0.95rem" }}>
        Your grove will grow around you.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
        {MOODS.map(({ key, label, emoji }) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              padding: "16px 20px",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--color-white)",
              border: "1.5px solid rgba(168, 184, 154, 0.4)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "var(--color-soil)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              minWidth: "70px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "var(--shadow-card)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <span style={{ fontSize: "1.8rem" }}>{emoji}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
