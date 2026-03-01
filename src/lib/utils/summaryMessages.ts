import type { MoodKey } from "@/lib/hooks/useMood";

export type SummaryLines = {
  headline: string;
  presence: string;
  gratitude: string;
  closing: string;
};

type SummaryInput = {
  daysShown: number;
  gratitudeCount: number;
  dominantMood: MoodKey | null;
};

// Returns the same value all week, rotates each new week
function weekSeed(): number {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  return Math.floor((now.getTime() - jan1.getTime()) / (7 * 24 * 60 * 60 * 1000));
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function tier(daysShown: number): 0 | 1 | 2 | 3 {
  if (daysShown <= 1) return 0;
  if (daysShown <= 3) return 1;
  if (daysShown <= 5) return 2;
  return 3;
}

// Default headlines per tier — used when mood is neutral, okay, or absent
const DEFAULT_HEADLINES: Record<0 | 1 | 2 | 3, string[]> = {
  0: [
    "Even quiet weeks leave something behind.",
    "Some weeks are for rest, not recording.",
    "A week of stillness is still a week lived.",
    "Not every week needs to be tended.",
  ],
  1: [
    "Your garden is finding its footing.",
    "Small weeks are still weeks in the garden.",
    "You touched base with yourself a few times.",
    "Your garden got some attention this week.",
  ],
  2: [
    "This week your garden felt steady.",
    "You kept coming back to yourself this week.",
    "A consistent week. More than most.",
    "Your garden had a real presence this week.",
  ],
  3: [
    "Your garden was well-tended this week.",
    "You showed up for almost every day this week.",
    "A full week in the garden.",
    "This was a week of real consistency.",
  ],
};

// Gentle overrides for low and drained moods
const GENTLE_HEADLINES: Record<0 | 1 | 2 | 3, string[]> = {
  0: [
    "Rest is tending too.",
    "Hard weeks deserve gentleness, not pressure.",
    "Some weeks just need to be survived.",
    "It is okay to have a week that was just hard.",
  ],
  1: [
    "You showed up even when it was hard.",
    "Showing up on a hard week takes more than people know.",
    "A few hard days, and you still came back here.",
    "You kept a thread connected to yourself this week.",
  ],
  2: [
    "You kept going even on the hard days.",
    "You showed up tired, and that still counts.",
    "A hard week, and you stayed with it.",
    "Even when things felt heavy, you came back here.",
  ],
  3: [
    "You showed up through all of it.",
    "A hard week and you showed up every day. That is a lot.",
    "Even when it was heavy, you kept coming back.",
    "Showing up every day through a hard week is something.",
  ],
};

// Bright overrides for radiant and content moods
const BRIGHT_HEADLINES: Record<0 | 1 | 2 | 3, string[]> = {
  0: [
    "Even bright weeks have quiet corners.",
    "You had a gentle week, even if it felt good.",
    "Not every beautiful week needs to be logged.",
    "A soft week, even when your mood was light.",
  ],
  1: [
    "Your garden had some bright moments this week.",
    "A few good days and you showed up for them.",
    "Even a short week can have real warmth in it.",
    "Some of this week shone.",
  ],
  2: [
    "Your garden had a bright week.",
    "A lot of light in this week's garden.",
    "You brought real steadiness to this week.",
    "This week had warmth and you were here for it.",
  ],
  3: [
    "This was a radiant week in your garden.",
    "Your garden was in full bloom this week.",
    "A week of real light and real presence.",
    "You brought everything this week. It showed.",
  ],
};

function getHeadline(daysShown: number, mood: MoodKey | null, seed: number): string {
  const t = tier(daysShown);
  if (mood === "low" || mood === "drained") return pick(GENTLE_HEADLINES[t], seed);
  if (mood === "radiant" || mood === "content") return pick(BRIGHT_HEADLINES[t], seed);
  return pick(DEFAULT_HEADLINES[t], seed);
}

function getPresence(daysShown: number): string {
  if (daysShown === 0) return "You did not log this week, and that is okay.";
  if (daysShown === 1) return "You showed up once this week.";
  if (daysShown === 7) return "You showed up every day.";
  return `You showed up ${daysShown} days.`;
}

function getGratitude(count: number): string {
  if (count === 0) return "You did not write gratitudes this week — some weeks are like that.";
  if (count === 1) return "You found one thing to be grateful for.";
  if (count <= 3) return `You found ${count} things to be grateful for.`;
  if (count <= 8) return `You logged ${count} gratitudes.`;
  return `You logged ${count} gratitudes. That is a lot of noticing.`;
}

const CLOSINGS: Record<0 | 1 | 2 | 3, string[]> = {
  0: [
    "You are still here. That is enough.",
    "Being gentle with yourself counts as tending.",
    "There is always next week, and you will show up for it.",
    "Rest now. The garden will be here.",
  ],
  1: [
    "More happened this week than you might think.",
    "A few real moments are worth more than a full log.",
    "You were here. That is what matters.",
    "Small weeks build toward something.",
  ],
  2: [
    "You handled more than you realized.",
    "Steady is underrated.",
    "Most people would not have shown up this much. You did.",
    "That kind of consistency is quiet and real.",
  ],
  3: [
    "That kind of care — quiet, consistent — is rare.",
    "A week like this does not happen without effort. Yours shows.",
    "You gave this week your attention. That is not nothing.",
    "Remember this week when the next one feels hard.",
  ],
};

export function getSummaryLines(input: SummaryInput): SummaryLines {
  const { daysShown, gratitudeCount, dominantMood } = input;
  const seed = weekSeed();
  const t = tier(daysShown);

  return {
    headline: getHeadline(daysShown, dominantMood, seed),
    presence: getPresence(daysShown),
    gratitude: getGratitude(gratitudeCount),
    closing: pick(CLOSINGS[t], seed + 1),
  };
}
