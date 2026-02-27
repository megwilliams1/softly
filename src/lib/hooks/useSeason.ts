"use client";

import { getSeason, type Season } from "@/lib/utils/season";

export function useSeason(): Season {
  return getSeason();
}
