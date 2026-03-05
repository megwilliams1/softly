"use client";

import { MoodKey } from "@/lib/hooks/useMood";
import { useTheme } from "@/lib/hooks/useTheme";
import GroveParticles from "./GroveParticles";

type ParticleType = "pollen" | "petals" | "wind" | "drops" | "fade" | null;

type ThemeEntry = { bg: string; accent: string; particleType: ParticleType };

export const MOOD_THEME: Record<MoodKey | "none", ThemeEntry> = {
  radiant: { bg: "#FFF9E6", accent: "#F5C842", particleType: "pollen" },
  content: { bg: "#FFF0F5", accent: "#F7B8CC", particleType: "petals" },
  okay:    { bg: "#F0F5F0", accent: "#A8B89A", particleType: "wind"   },
  low:     { bg: "#F0F3F7", accent: "#9BA8B5", particleType: "drops"  },
  drained: { bg: "#F5F0EE", accent: "#B09080", particleType: "fade"   },
  none:    { bg: "var(--color-cream)", accent: "var(--color-sage)", particleType: null },
};

const MOOD_THEME_DARK: Record<MoodKey | "none", ThemeEntry> = {
  radiant: { bg: "#2A2310", accent: "#C8A020", particleType: "pollen" },
  content: { bg: "#251520", accent: "#C47888", particleType: "petals" },
  okay:    { bg: "#1A201A", accent: "#7A9A6C", particleType: "wind"   },
  low:     { bg: "#1A1D20", accent: "#7080A0", particleType: "drops"  },
  drained: { bg: "#201A18", accent: "#9A7060", particleType: "fade"   },
  none:    { bg: "var(--color-cream)", accent: "var(--color-sage)", particleType: null },
};

interface Props {
  mood: MoodKey | "none";
  children: React.ReactNode;
}

export default function GroveShell({ mood, children }: Props) {
  const { theme } = useTheme();
  const activeTheme = theme === "dark" ? MOOD_THEME_DARK[mood] : MOOD_THEME[mood];
  return (
    <div
      style={{
        backgroundColor: activeTheme.bg,
        transition: "background-color 0.8s ease",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <GroveParticles type={activeTheme.particleType} />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
