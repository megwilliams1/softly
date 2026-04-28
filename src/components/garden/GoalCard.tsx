"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGoals } from "@/lib/hooks/useGoals";
import PlantGoalModal from "./PlantGoalModal";

const PLANT_STAGES = ["🌰", "🌱", "🌿", "🌺", "🌸"];
const PLANT_LABELS = [
  "Just planted.",
  "Something's stirring.",
  "It's taking root.",
  "Growing steadily.",
  "In full bloom.",
];

function PlantDotTracker({ checkIns, total = 21 }: { checkIns: number; total?: number }) {
  const pct = Math.min(checkIns / total, 1);
  const stageIdx = Math.min(Math.floor(pct * 5), 4);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={stageIdx}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            style={{ fontSize: "44px", lineHeight: 1, display: "inline-block" }}
          >
            {PLANT_STAGES[stageIdx]}
          </motion.span>
        </AnimatePresence>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontStyle: "italic",
            color: "var(--color-garden-accent)",
          }}
        >
          {PLANT_LABELS[stageIdx]}
        </p>
      </div>

      <AnimatePresence initial={false}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {Array.from({ length: total }, (_, i) => {
            const filled = i < checkIns;
            return (
              <motion.div
                key={filled ? `f-${i}` : `e-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "5px",
                  backgroundColor: filled
                    ? "var(--color-garden-accent)"
                    : "rgba(255,255,255,0.55)",
                }}
              />
            );
          })}
        </div>
      </AnimatePresence>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "var(--color-stone)",
        }}
      >
        Day {checkIns}/{total}
      </p>
    </div>
  );
}

export default function GoalCard({ uid }: { uid: string | null }) {
  const { activeGoal, archivedGoals, checkedInToday, addGoal, checkIn, completeGoal } =
    useGoals(uid);

  const [showModal, setShowModal] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const checkInCount = activeGoal?.checkIns.length ?? 0;

  async function handleCheckIn() {
    await checkIn();
  }

  async function handleComplete() {
    setCelebrating(true);
    await completeGoal();
    setTimeout(() => setCelebrating(false), 1000);
  }

  return (
    <>
      <div
        className={celebrating ? "animate-bloom-pop" : ""}
        style={{
          backgroundColor: "var(--color-garden-tile)",
          borderRadius: "24px",
          padding: "26px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <p
              style={{
                fontSize: "9.5px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--color-garden-accent)",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                marginBottom: "4px",
              }}
            >
              Your plant
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                color: "var(--color-soil)",
                fontWeight: 400,
              }}
            >
              {activeGoal ? activeGoal.text : "Plant a goal"}
            </h2>
          </div>

          {activeGoal && (
            <button
              onClick={() => setShowModal(true)}
              style={{
                fontSize: "0.75rem",
                color: "var(--color-stone)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-body)",
              }}
            >
              Edit
            </button>
          )}
        </div>

        {/* Empty state */}
        {!activeGoal && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "12px 0" }}>
            <span style={{ fontSize: "52px" }}>🌰</span>
            <p style={{ color: "var(--color-stone)", fontSize: "0.9rem", textAlign: "center", lineHeight: 1.6, maxWidth: "260px", fontFamily: "var(--font-body)" }}>
              Choose something small to tend. Show up for it, one day at a time.
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "10px 24px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-garden-accent)",
                color: "var(--color-white)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
              }}
            >
              Plant something
            </button>
          </div>
        )}

        {/* Active goal — dot tracker */}
        {activeGoal && (
          <PlantDotTracker checkIns={checkInCount} total={21} />
        )}

        {/* Check-in button */}
        {activeGoal && (
          checkedInToday ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "rgba(255,255,255,0.65)",
                color: "var(--color-garden-accent)",
                fontSize: "0.85rem",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                alignSelf: "flex-start",
              }}
            >
              <span>✓</span>
              <span>Checked in today</span>
            </div>
          ) : (
            <button
              onClick={handleCheckIn}
              style={{
                padding: "10px 22px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-garden-accent)",
                color: "var(--color-white)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                alignSelf: "flex-start",
              }}
            >
              Check in today
            </button>
          )
        )}

        {activeGoal && (
          <button
            onClick={handleComplete}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "var(--color-stone)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              textAlign: "left",
              padding: 0,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Mark this goal as complete
          </button>
        )}

        {/* Past gardens */}
        {archivedGoals.length > 0 && (
          <div style={{ borderTop: "1px solid rgba(92,107,80,0.15)", paddingTop: "16px" }}>
            <button
              onClick={() => setShowArchive((v) => !v)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "var(--color-stone)",
                fontSize: "0.78rem",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>{showArchive ? "▾" : "▸"}</span>
              <span>{archivedGoals.length} past garden{archivedGoals.length === 1 ? "" : "s"}</span>
            </button>

            {showArchive && (
              <ul style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0 }}>
                {archivedGoals.map((g) => (
                  <li key={g.id} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "var(--color-stone)" }}>
                    <span style={{ fontSize: "0.9rem" }}>🌸</span>
                    <span>{g.text}</span>
                    <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: "var(--color-garden-accent)" }}>
                      {g.checkIns.length}d
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <PlantGoalModal
          existing={activeGoal?.text}
          onSave={(text) => {
            addGoal(text);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
