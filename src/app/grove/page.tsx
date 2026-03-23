"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { getSeason, seasonGreetings } from "@/lib/utils/season";
import { useMood } from "@/lib/hooks/useMood";
import GroveShell from "@/components/grove/GroveShell";
import MoodCheckin from "@/components/sanctuary/MoodCheckin";
import JournalEditor from "@/components/grove/JournalEditor";
import SoftReset from "@/components/grove/SoftReset";
import PastEntries from "@/components/grove/PastEntries";
import StormTracker from "@/components/grove/StormTracker";
import FutureNoteSection from "@/components/grove/FutureNoteSection";
import TinyWinsVault from "@/components/grove/TinyWinsVault";

const greeting = seasonGreetings[getSeason()];

export default function GrovePage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;
  const { todayMood } = useMood(uid);

  const [confirmed, setConfirmed] = useState(false);
  const [showReset, setShowReset] = useState(false);

  if (loading || !user) return null;

  const shellMood = todayMood ?? "none";

  return (
    <GroveShell mood={shellMood}>
      <main className="px-6 py-10" style={{ maxWidth: "720px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontWeight: 600,
            color: "var(--color-lavender)",
            fontFamily: "var(--font-body)",
            marginBottom: "6px",
            filter: "brightness(0.75)",
          }}
        >
          {greeting}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.5rem",
            fontWeight: 500,
            color: "var(--color-soil)",
            lineHeight: 1.2,
            marginBottom: "6px",
          }}
        >
          Reflection Grove
        </h1>
        <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-body)", marginBottom: "40px" }}>
          A quiet place to land.
        </p>

        {!confirmed ? (
          <div
            className="animate-bloom-up"
            style={{
              backgroundColor: "var(--color-white)",
              borderRadius: "var(--radius-lg)",
              padding: "32px 28px",
              boxShadow: "var(--shadow-card)",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            {/* Mood check-in */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: "var(--color-soil)",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
              >
                How are you feeling today?
              </h2>
              <MoodCheckin uid={uid} />
            </div>

            {/* Enter button — only appears after mood is picked */}
            {todayMood && (
              <div className="animate-bloom-up" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <p style={{ fontSize: "0.95rem", color: "var(--color-stone)" }}>
                  This is your space for today. Ready to write?
                </p>
                <button
                  onClick={() => setConfirmed(true)}
                  style={{
                    alignSelf: "center",
                    padding: "11px 28px",
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
                  Enter the Grove →
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <JournalEditor
              uid={uid}
              mood={todayMood}
              onSaved={() => setShowReset(true)}
            />
            <PastEntries uid={uid} />
            <StormTracker uid={uid} />
            <FutureNoteSection uid={uid} />
            <TinyWinsVault uid={uid} />
          </div>
        )}

        {showReset && (
          <SoftReset onDone={() => setShowReset(false)} />
        )}
      </main>
    </GroveShell>
  );
}
