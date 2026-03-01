"use client";

import { useState } from "react";
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

type ModalState = { day: DayKey; time: MealTime } | null;

export default function MealGrid({ uid }: { uid: string | null }) {
  const { meals, setMeal } = useMeals(uid);
  const [modal, setModal] = useState<ModalState>(null);

  return (
    <>
      <div style={{ overflowX: "auto", paddingBottom: "8px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(120px, 1fr))",
            gap: "10px",
            minWidth: "700px",
          }}
        >
          {/* Day headers */}
          {DAYS.map(({ key, label }) => (
            <div
              key={key}
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "var(--color-moss)",
                paddingBottom: "4px",
                borderBottom: "1px solid rgba(168, 184, 154, 0.4)",
              }}
            >
              {label}
            </div>
          ))}

          {/* Meal rows */}
          {MEAL_TIMES.map((time, timeIndex) =>
            DAYS.map(({ key }, dayIndex) => (
              <MealSlot
                key={`${key}-${time}`}
                time={time}
                value={meals[key][time]}
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
          initialValue={meals[modal.day][modal.time]}
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
}
