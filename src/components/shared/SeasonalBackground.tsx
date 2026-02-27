import { getSeason } from "@/lib/utils/season";

const seasonalStyles = {
  spring: { emoji: "🌸", label: "Spring" },
  summer: { emoji: "🌻", label: "Summer" },
  fall:   { emoji: "🍂", label: "Fall" },
  winter: { emoji: "❄️", label: "Winter" },
};

export default function SeasonalBackground() {
  const season = getSeason();
  const { emoji } = seasonalStyles[season];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Subtle seasonal tint in the top corner */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-60 blur-3xl"
        style={{ backgroundColor: "var(--color-seasonal-primary)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-50 blur-3xl"
        style={{ backgroundColor: "var(--color-seasonal-secondary)" }}
      />
      {/* Season indicator — very subtle, bottom right */}
      <div
        className="absolute bottom-6 right-6 text-xs flex items-center gap-1"
        style={{ color: "var(--color-pebble)" }}
      >
        <span>{emoji}</span>
      </div>
    </div>
  );
}
