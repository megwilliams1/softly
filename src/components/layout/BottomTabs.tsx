"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sprout, Sparkles, Flame, Leaf, User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

const TABS = [
  { href: "/home",      label: "Home",      icon: Home      },
  { href: "/garden",    label: "Garden",    icon: Sprout    },
  { href: "/sanctuary", label: "Sanctuary", icon: Sparkles  },
  { href: "/hearth",    label: "Hearth",    icon: Flame     },
  { href: "/grove",     label: "Grove",     icon: Leaf      },
  { href: "/account",   label: "Account",   icon: User      },
];

export default function BottomTabs() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <nav
      style={{
        height: "83px",
        backgroundColor: "var(--color-sidebar)",
        borderTop: "1px solid rgba(176,168,154,0.2)",
        display: "flex",
        alignItems: "flex-start",
        paddingTop: "10px",
        paddingLeft: "4px",
        paddingRight: "4px",
      }}
    >
      {TABS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href !== "/home" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              textDecoration: "none",
              padding: "0 4px",
            }}
          >
            <div
              style={{
                width: "46px",
                height: "32px",
                borderRadius: "16px",
                backgroundColor: isActive ? "rgba(92,107,80,0.13)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isActive ? "var(--color-moss)" : "var(--color-pebble)",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              <Icon size={20} />
            </div>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9.5px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--color-moss)" : "var(--color-pebble)",
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
