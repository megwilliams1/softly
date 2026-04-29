"use client";

import { type MealWeek } from "@/lib/hooks/useMealHistory";
import { type MealsData } from "@/lib/hooks/useMeals";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const DAY_LABELS: Record<string, string> = {
  mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu",
  fri: "Fri", sat: "Sat", sun: "Sun",
};
const MEAL_TIMES = ["breakfast", "lunch", "dinner"] as const;

function formatWeekOf(weekKey: string): string {
  const d = new Date(weekKey + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function weeksAgo(weekKey: string): string {
  const then = new Date(weekKey + "T12:00:00");
  const diff = Math.round((Date.now() - then.getTime()) / (7 * 24 * 60 * 60 * 1000));
  if (diff === 0) return "This week";
  if (diff === 1) return "Last week";
  return `${diff} weeks ago`;
}

function hasMeals(meals: MealsData): boolean {
  return DAYS.some((d) => MEAL_TIMES.some((t) => meals[d][t].trim() !== ""));
}

interface Props {
  history: MealWeek[];
  onCopy: (meals: MealsData) => void;
  onClose: () => void;
}

export default function MealHistoryModal({ history, onCopy, onClose }: Props) {
  const filled = history.filter((w) => hasMeals(w.meals));

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--color-cream)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "640px",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "32px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <p style={{
              fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "0.14em",
              fontWeight: 600, color: "var(--color-garden-accent)", fontFamily: "var(--font-body)", marginBottom: "4px",
            }}>
              Meal Planner
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 400, color: "var(--color-soil)", margin: 0 }}>
              Past Weeks
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "20px", color: "var(--color-stone)", lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {filled.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-stone)", fontFamily: "var(--font-body)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🍽️</div>
            <p style={{ fontSize: "14px" }}>No past weeks yet. Start adding meals and they&rsquo;ll save automatically.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {filled.map((week) => (
              <div
                key={week.weekKey}
                style={{
                  backgroundColor: "var(--color-white)",
                  borderRadius: "14px",
                  padding: "20px",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      color: "var(--color-garden-accent)", margin: 0, marginBottom: "2px",
                    }}>
                      Week of {formatWeekOf(week.weekKey)}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)", margin: 0 }}>
                      {weeksAgo(week.weekKey)}
                    </p>
                  </div>
                  <button
                    onClick={() => { onCopy(week.meals); onClose(); }}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "var(--radius-full)",
                      border: "none",
                      backgroundColor: "var(--color-soil)",
                      color: "var(--color-white)",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Use this week
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)", fontSize: "12px" }}>
                    <thead>
                      <tr>
                        <td style={{ width: "72px" }} />
                        {DAYS.map((d) => (
                          <th key={d} style={{
                            padding: "4px 6px", textAlign: "center", fontWeight: 600,
                            color: "var(--color-stone)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em",
                          }}>
                            {DAY_LABELS[d]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MEAL_TIMES.map((time) => (
                        <tr key={time}>
                          <td style={{
                            padding: "6px 8px 6px 0", fontWeight: 600, fontSize: "10px",
                            textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-stone)",
                            verticalAlign: "top",
                          }}>
                            {time.charAt(0).toUpperCase() + time.slice(1)}
                          </td>
                          {DAYS.map((day) => (
                            <td key={day} style={{
                              padding: "4px 6px", textAlign: "center", color: "var(--color-soil)",
                              verticalAlign: "top", lineHeight: 1.3,
                            }}>
                              {week.meals[day][time] || <span style={{ color: "var(--color-pebble)" }}>—</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
