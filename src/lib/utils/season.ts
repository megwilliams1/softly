export type Season = "spring" | "summer" | "fall" | "winter";

export function getSeason(): Season {
  const month = new Date().getMonth(); // 0 = January

  if (month >= 2 && month <= 4) return "spring";  // Mar–May
  if (month >= 5 && month <= 7) return "summer";  // Jun–Aug
  if (month >= 8 && month <= 10) return "fall";   // Sep–Nov
  return "winter";                                 // Dec–Feb
}

export const seasonLabels: Record<Season, string> = {
  spring: "🌸 Spring",
  summer: "☀️ Summer",
  fall: "🍂 Fall",
  winter: "❄️ Winter",
};
