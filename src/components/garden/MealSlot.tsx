import { MealTime } from "@/lib/hooks/useMeals";

const timeLabels: Record<MealTime, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

interface Props {
  time: MealTime;
  value: string;
  animDelay: number;
  onClick: () => void;
}

export default function MealSlot({ time, value, animDelay, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={value ? `${timeLabels[time]}: ${value} — click to edit` : `${timeLabels[time]}: empty — click to add meal`}
      className="animate-bloom-up"
      style={{
        animationDelay: `${animDelay}s`,
        animationFillMode: "both",
        width: "100%",
        textAlign: "left",
        backgroundColor: "var(--color-white)",
        borderRadius: "var(--radius-md)",
        padding: "10px 12px",
        boxShadow: "var(--shadow-soft)",
        border: "1px solid rgba(176, 168, 154, 0.2)",
        cursor: "pointer",
        minHeight: "64px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <span
        style={{
          fontSize: "0.6rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--color-sage)",
        }}
      >
        {timeLabels[time]}
      </span>
      {value ? (
        <span style={{ fontSize: "0.85rem", color: "var(--color-soil)", lineHeight: 1.4 }}>
          {value}
        </span>
      ) : (
        <span style={{ fontSize: "0.85rem", color: "var(--color-pebble)" }}>
          + Add meal
        </span>
      )}
    </button>
  );
}
