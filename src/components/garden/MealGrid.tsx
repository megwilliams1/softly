"use client";

import { useState, Fragment, forwardRef, useImperativeHandle } from "react";
import { useMeals, DayKey, MealTime } from "@/lib/hooks/useMeals";
import MealSlot from "./MealSlot";
import MealModal from "./MealModal";

const DAYS: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

const MEAL_TIMES: MealTime[] = ["breakfast", "lunch", "dinner"];

const DAY_KEYS_ORDERED: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function getTodayKey(): DayKey {
  return DAY_KEYS_ORDERED[new Date().getDay()];
}

type ModalState = { day: DayKey; time: MealTime } | null;

export interface MealGridHandle {
  openSlot: (day: DayKey, time: MealTime) => void;
}

const MealGrid = forwardRef<MealGridHandle, { uid: string | null }>(
  function MealGrid({ uid }, ref) {
  const { meals, setMeal } = useMeals(uid);
  const [modal, setModal] = useState<ModalState>(null);
  const todayKey = getTodayKey();

  useImperativeHandle(ref, () => ({
    openSlot: (day, time) => setModal({ day, time }),
  }));

  return (
    <>
      {/* Desktop: full-width table — hidden on mobile */}
      <div className="hidden md:block" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid rgba(176,168,154,0.18)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "90px repeat(7, 1fr)",
          }}
        >
          {/* Header row */}
          <div style={{ backgroundColor: "var(--color-white)", borderBottom: "1px solid rgba(176,168,154,0.18)" }} />
          {DAYS.map(({ key, label }) => {
            const isToday = key === todayKey;
            return (
              <div
                key={key}
                style={{
                  backgroundColor: isToday ? "var(--color-garden-tile)" : "var(--color-white)",
                  borderBottom: `2px solid ${isToday ? "var(--color-garden-accent)" : "rgba(176,168,154,0.18)"}`,
                  padding: "10px 8px 8px",
                  textAlign: "center",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  fontWeight: isToday ? 600 : 500,
                  color: isToday ? "var(--color-garden-accent)" : "var(--color-moss)",
                  borderLeft: "1px solid rgba(176,168,154,0.12)",
                }}
              >
                {label}
              </div>
            );
          })}

          {/* Meal rows */}
          {MEAL_TIMES.map((time, timeIndex) => (
            <Fragment key={`row-${time}`}>
              {/* Row label */}
              <div
                style={{
                  backgroundColor: "var(--color-white)",
                  borderTop: timeIndex > 0 ? "1px solid rgba(176,168,154,0.12)" : "none",
                  padding: "14px 12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-pebble)",
                  }}
                >
                  {time}
                </span>
              </div>

              {DAYS.map(({ key }, dayIndex) => {
                const isToday = key === todayKey;
                return (
                  <div
                    key={`${key}-${time}`}
                    onClick={() => setModal({ day: key, time })}
                    style={{
                      backgroundColor: isToday ? "var(--color-garden-tile)" : "var(--color-white)",
                      borderTop: timeIndex > 0 ? "1px solid rgba(176,168,154,0.12)" : "none",
                      borderLeft: "1px solid rgba(176,168,154,0.12)",
                      padding: "12px 10px",
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.backgroundColor = isToday
                        ? "rgba(228,237,223,0.8)"
                        : "rgba(248,246,242,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.backgroundColor = isToday
                        ? "var(--color-garden-tile)"
                        : "var(--color-white)";
                    }}
                  >
                    {meals[key]?.[time] ? (
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "12.5px",
                          color: isToday ? "var(--color-garden-accent)" : "var(--color-stone)",
                          lineHeight: 1.4,
                        }}
                      >
                        {meals[key][time]}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "12px",
                          color: "var(--color-pebble)",
                        }}
                      >
                        —
                      </span>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Mobile: horizontal scroll grid */}
      <div className="md:hidden" style={{ overflowX: "auto", paddingBottom: "8px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(120px, 1fr))",
            gap: "10px",
            minWidth: "700px",
          }}
        >
          {DAYS.map(({ key, label }) => (
            <div
              key={key}
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                fontWeight: key === todayKey ? 600 : 500,
                color: key === todayKey ? "var(--color-garden-accent)" : "var(--color-moss)",
                paddingBottom: "4px",
                borderBottom: `2px solid ${key === todayKey ? "var(--color-garden-accent)" : "rgba(168,184,154,0.4)"}`,
              }}
            >
              {label}
            </div>
          ))}

          {MEAL_TIMES.map((time, timeIndex) =>
            DAYS.map(({ key }, dayIndex) => (
              <MealSlot
                key={`${key}-${time}`}
                time={time}
                value={meals[key]?.[time] ?? ""}
                animDelay={dayIndex * 0.05 + timeIndex * 0.12}
                onClick={() => setModal({ day: key, time })}
              />
            ))
          )}
        </div>
      </div>

      {modal && (
        <MealModal
          day={modal.day}
          time={modal.time}
          initialValue={meals[modal.day]?.[modal.time] ?? ""}
          onSave={(value) => {
            setMeal(modal.day, modal.time, value);
            setModal(null);
          }}
          onDelete={() => {
            setMeal(modal.day, modal.time, "");
            setModal(null);
          }}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
});

export default MealGrid;
