"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import PageSkeleton from "@/components/shared/PageSkeleton";
import { useMood } from "@/lib/hooks/useMood";
import GroveShell from "@/components/grove/GroveShell";
import MoodCheckin from "@/components/sanctuary/MoodCheckin";
import JournalEditor from "@/components/grove/JournalEditor";
import SoftReset from "@/components/grove/SoftReset";
import PastEntries from "@/components/grove/PastEntries";
import StormTracker from "@/components/grove/StormTracker";
import FutureNoteSection from "@/components/grove/FutureNoteSection";
import TinyWinsVault from "@/components/grove/TinyWinsVault";
import PetalRain from "@/components/grove/PetalRain";
import Sprig from "@/components/shared/Sprig";

export default function GrovePage() {
  const { user, loading } = useRequireAuth();
  const uid = user?.uid ?? null;
  const { todayMood } = useMood(uid);

  const [confirmed, setConfirmed] = useState(false);
  const [showReset, setShowReset] = useState(false);

  if (loading) return <PageSkeleton />;
  if (!user) return null;

  const shellMood = todayMood ?? "none";

  return (
    <GroveShell mood={shellMood}>
      <PetalRain />

      <main className="px-6 py-10" style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
        {/* Botanical sprig — top left */}
        <Sprig
          color="var(--color-grove-accent)"
          opacity={0.10}
          size={170}
          style={{ position: "absolute", left: -18, top: -10, zIndex: 0 }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: "9.5px",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 600,
              color: "var(--color-grove-accent)",
              fontFamily: "var(--font-body)",
              marginBottom: "6px",
            }}
          >
            Be still. Be honest. Be here.
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 42px)",
              fontWeight: 400,
              color: "var(--color-soil)",
              lineHeight: 1.2,
              marginBottom: "6px",
            }}
          >
            Reflection Grove
          </h1>
          <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-body)", fontSize: "13px", marginBottom: "40px" }}>
            A quiet place to land.
          </p>

          {!confirmed ? (
            <div
              className="animate-bloom-up"
              style={{
                backgroundColor: "rgba(255,255,255,0.75)",
                borderRadius: "var(--radius-xl)",
                padding: "32px 28px",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
                backdropFilter: "blur(4px)",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    color: "var(--color-soil)",
                    fontWeight: 400,
                    marginBottom: "16px",
                  }}
                >
                  Take a breath. How are you feeling right now?
                </h2>
                <MoodCheckin uid={uid} />
              </div>

              {todayMood && (
                <div className="animate-bloom-up" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ fontSize: "0.95rem", color: "var(--color-stone)", fontFamily: "var(--font-body)" }}>
                    This is your space for today. Ready to write?
                  </p>
                  <button
                    onClick={() => setConfirmed(true)}
                    style={{
                      alignSelf: "flex-start",
                      padding: "11px 28px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "var(--color-grove-accent)",
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
              <JournalEditor uid={uid} mood={todayMood} onSaved={() => setShowReset(true)} />
              <PastEntries uid={uid} />
              <StormTracker uid={uid} />
              <FutureNoteSection uid={uid} />
              <TinyWinsVault uid={uid} />
            </div>
          )}

          {showReset && <SoftReset onDone={() => setShowReset(false)} />}
        </div>
      </main>
    </GroveShell>
  );
}
