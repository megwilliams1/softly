"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, Sparkles, Flame, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";

const links = [
  { href: "/garden",    label: "The Garden",    icon: Sprout   },
  { href: "/sanctuary", label: "The Sanctuary", icon: Sparkles },
  { href: "/hearth",    label: "The Hearth",    icon: Flame    },
];

function isSunday() {
  return new Date().getDay() === 0;
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        backgroundColor: "var(--color-white)",
        borderBottom: "1px solid rgba(176, 168, 154, 0.3)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* App name */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            fontWeight: 500,
            color: "var(--color-soil)",
            textDecoration: "none",
          }}
        >
          softly
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-2">
          {isSunday() && (
            <Link
              href="/reset"
              style={{
                fontSize: "0.8rem",
                fontFamily: "var(--font-body)",
                color: "var(--color-moss)",
                backgroundColor: "var(--color-mist)",
                padding: "5px 12px",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                border: "1px solid rgba(168, 184, 154, 0.4)",
              }}
            >
              Time to reset 🌿
            </Link>
          )}
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--color-soil)" : "var(--color-stone)",
                  backgroundColor: isActive
                    ? "var(--color-seasonal-primary)"
                    : "transparent",
                  textDecoration: "none",
                }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--color-stone)",
              marginLeft: "4px",
            }}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
