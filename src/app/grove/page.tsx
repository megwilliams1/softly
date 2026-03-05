"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { MoodKey } from "@/lib/hooks/useMood";
import GroveShell from "@/components/grove/GroveShell";
import MoodGate from "@/components/grove/MoodGate";
import JournalEditor from "@/components/grove/JournalEditor";
import SoftReset from "@/components/grove/SoftReset";
import PastEntries from "@/components/grove/PastEntries";
import StormTracker from "@/components/grove/StormTracker";
import FutureNoteSection from "@/components/grove/FutureNoteSection";
import TinyWinsVault from "@/components/grove/TinyWinsVault";

export default function GrovePage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;

  const [mood, setMood] = useState<MoodKey | "none">("none");
  const [confirmed, setConfirmed] = useState(false);
  const [showReset, setShowReset] = useState(false);

  if (loading || !user) return null;

  function handleMoodConfirmed(m: MoodKey) {
    setMood(m);
    setConfirmed(true);
  }

  return (
    <GroveShell mood={mood}>
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
          <MoodGate uid={uid} onMoodConfirmed={handleMoodConfirmed} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <JournalEditor
              uid={uid}
              mood={mood === "none" ? null : mood}
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
