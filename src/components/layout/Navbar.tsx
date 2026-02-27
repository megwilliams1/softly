"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, Sparkles } from "lucide-react";

const links = [
  { href: "/garden", label: "The Garden", icon: Sprout },
  { href: "/sanctuary", label: "The Sanctuary", icon: Sparkles },
];

export default function Navbar() {
  const pathname = usePathname();

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
                    ? "var(--color-bloom-pink)"
                    : "transparent",
                  textDecoration: "none",
                }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
