"use client";

import { useMeals, DayKey, MealTime } from "@/lib/hooks/useMeals";
import MealSlot from "./MealSlot";

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

export default function MealGrid() {
  const { meals } = useMeals();

  return (
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
              onClick={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
}
