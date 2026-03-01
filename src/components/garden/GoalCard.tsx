"use client";

import { useState } from "react";
import { useGoals, getPlantStage } from "@/lib/hooks/useGoals";
import PlantStage from "./PlantStage";
import PlantGoalModal from "./PlantGoalModal";

const STAGE_LABELS = [
  "Just planted.",
  "Something is stirring.",
  "It's taking root.",
  "Growing steadily.",
  "In full bloom.",
];

export default function GoalCard({ uid }: { uid: string | null }) {
  const { activeGoal, archivedGoals, checkedInToday, addGoal, checkIn, completeGoal } =
    useGoals(uid);

  const [showModal, setShowModal] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const stage = activeGoal ? getPlantStage(activeGoal.checkIns) : 0;
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
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-card)",
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: "var(--color-sage)",
                fontWeight: 600,
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
                fontWeight: 500,
              }}
            >
              {activeGoal ? "Growing" : "Plant a goal"}
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

        {/* No active goal — empty state */}
        {!activeGoal && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              padding: "12px 0",
            }}
          >
            <PlantStage stage={0} size={90} />
            <p
              style={{
                color: "var(--color-stone)",
                fontSize: "0.9rem",
                textAlign: "center",
                lineHeight: 1.6,
                maxWidth: "260px",
              }}
            >
              Choose something small to tend. Show up for it, one day at a time.
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "10px 24px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-sage)",
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

        {/* Active goal */}
        {activeGoal && (
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* Plant visual */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
              }}
            >
              <PlantStage stage={stage} size={90} />
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--color-stone)",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {STAGE_LABELS[stage]}
              </p>
            </div>

            {/* Goal info + actions */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                flex: 1,
                minWidth: "160px",
              }}
            >
              {/* Goal text */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  color: "var(--color-soil)",
                  lineHeight: 1.4,
                }}
              >
                {activeGoal.text}
              </p>

              {/* Check-in count */}
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-stone)",
                }}
              >
                {checkInCount === 0
                  ? "No check-ins yet — show up today."
                  : `${checkInCount} day${checkInCount === 1 ? "" : "s"} shown up`}
              </p>

              {/* Check-in button */}
              {checkedInToday ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "rgba(122, 158, 126, 0.12)",
                    color: "var(--color-moss)",
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span>✓</span>
                  <span>Checked in today</span>
                </div>
              ) : (
                <button
                  onClick={handleCheckIn}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--color-sage)",
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
              )}

              {/* Complete goal */}
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
            </div>
          </div>
        )}

        {/* Past gardens */}
        {archivedGoals.length > 0 && (
          <div style={{ borderTop: "1px solid rgba(176, 168, 154, 0.25)", paddingTop: "16px" }}>
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
              <span>
                {archivedGoals.length} past garden{archivedGoals.length === 1 ? "" : "s"}
              </span>
            </button>

            {showArchive && (
              <ul
                style={{
                  marginTop: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {archivedGoals.map((g) => (
                  <li
                    key={g.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.85rem",
                      color: "var(--color-stone)",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem" }}>🌸</span>
                    <span>{g.text}</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "0.72rem",
                        color: "var(--color-sage)",
                      }}
                    >
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
