"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useMood } from "@/lib/hooks/useMood";
import GroveShell from "@/components/grove/GroveShell";
import MoodCheckin from "@/components/sanctuary/MoodCheckin";
import JournalEditor from "@/components/grove/JournalEditor";
import SoftReset from "@/components/grove/SoftReset";
import PastEntries from "@/components/grove/PastEntries";
import StormTracker from "@/components/grove/StormTracker";
import FutureNoteSection from "@/components/grove/FutureNoteSection";
import TinyWinsVault from "@/components/grove/TinyWinsVault";

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
        <h1
          className="text-4xl mb-1"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-soil)" }}
        >
          Reflection Grove
        </h1>
        <p style={{ color: "var(--color-stone)", marginBottom: "40px" }}>
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
