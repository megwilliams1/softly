"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Sprout, Sparkles, Flame, Leaf, RefreshCw, User, Sun, Moon, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useIsAdmin } from "@/lib/hooks/useIsAdmin";
import { useSeason } from "@/lib/hooks/useSeason";
import { useTheme } from "@/lib/hooks/useTheme";
import UserAvatar from "@/components/shared/UserAvatar";
import Sprig from "@/components/shared/Sprig";

const NAV_LINKS = [
  { href: "/home",      label: "Home",             icon: Home      },
  { href: "/garden",    label: "The Garden",       icon: Sprout    },
  { href: "/sanctuary", label: "The Sanctuary",    icon: Sparkles  },
  { href: "/hearth",    label: "The Hearth",       icon: Flame     },
  { href: "/grove",     label: "Reflection Grove", icon: Leaf      },
  { href: "/reset",     label: "Weekly Reset",     icon: RefreshCw },
  { href: "/account",   label: "My Account",       icon: User      },
];

const SEASON_EMOJI: Record<string, string> = {
  spring: "🌸", summer: "🌻", fall: "🍂", winter: "❄️",
};
const SEASON_LABEL: Record<string, string> = {
  spring: "Spring", summer: "Summer", fall: "Fall", winter: "Winter",
};
const SEASON_GREETING: Record<string, string> = {
  spring: "Happy Spring, mama",
  summer: "Happy Summer, mama",
  fall:   "Happy Fall, mama",
  winter: "Happy Winter, mama",
};

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const season = useSeason();
  const { theme, toggleTheme } = useTheme();
  const { isAdmin } = useIsAdmin(user?.uid ?? null);

  if (!user) return null;

  async function handleSignOut() {
    await signOut();
    router.replace("/");
  }

  return (
    <aside
      style={{
        width: "232px",
        height: "100vh",
        backgroundColor: "var(--color-sidebar)",
        borderRight: "1px solid rgba(176,168,154,0.18)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Decorative botanical sprigs */}
      <Sprig
        color="var(--color-sage)"
        opacity={0.13}
        size={170}
        style={{ position: "absolute", bottom: -30, left: -30, zIndex: 0 }}
      />
      <Sprig
        color="var(--color-blush-deep)"
        opacity={0.08}
        size={120}
        flip
        style={{ position: "absolute", top: 140, right: -50, zIndex: 0 }}
      />

      {/* Nav content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "28px 16px 24px",
          overflowY: "auto",
        }}
      >
        {/* Logo + date */}
        <div style={{ paddingLeft: "8px", marginBottom: "20px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "34px",
              fontWeight: 400,
              color: "var(--color-soil)",
              lineHeight: 1,
              marginBottom: "4px",
            }}
          >
            softly
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-pebble)" }}>
            {formatDate()}
          </div>
        </div>

        <div style={{ height: "1px", backgroundColor: "rgba(176,168,154,0.22)", marginBottom: "16px" }} />

        {/* Season badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "var(--color-white)",
            borderRadius: "var(--radius-full)",
            padding: "8px 14px",
            marginBottom: "20px",
          }}
        >
          <span style={{ fontSize: "15px" }}>{SEASON_EMOJI[season] ?? "🌸"}</span>
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9.5px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-garden-accent)",
              }}
            >
              {SEASON_LABEL[season] ?? "Spring"}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-stone)" }}>
              {SEASON_GREETING[season] ?? "Happy Spring, mama"}
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/home" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--color-moss)" : "var(--color-stone)",
                  backgroundColor: isActive ? "var(--color-white)" : "transparent",
                  boxShadow: isActive ? "var(--shadow-soft)" : "none",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.45)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={16} />
                  <span>{label}</span>
                </div>
                {isActive && (
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-moss)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: pathname.startsWith("/admin") ? 500 : 400,
                color: pathname.startsWith("/admin") ? "var(--color-moss)" : "var(--color-stone)",
                backgroundColor: pathname.startsWith("/admin") ? "var(--color-white)" : "transparent",
                boxShadow: pathname.startsWith("/admin") ? "var(--shadow-soft)" : "none",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!pathname.startsWith("/admin")) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.45)";
              }}
              onMouseLeave={(e) => {
                if (!pathname.startsWith("/admin")) (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShieldCheck size={16} />
                <span>Admin</span>
              </div>
              {pathname.startsWith("/admin") && (
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--color-moss)", flexShrink: 0 }} />
              )}
            </Link>
          )}
        </nav>

        <div style={{ height: "1px", backgroundColor: "rgba(176,168,154,0.22)", margin: "16px 0" }} />

        {/* User row + theme toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Avatar link — takes remaining space */}
          <Link
            href="/account"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "var(--radius-md)",
              textDecoration: "none",
              flex: 1,
              minWidth: 0,
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <UserAvatar photoURL={user.photoURL} displayName={user.displayName} size={32} />
            </div>
            <div style={{ overflow: "hidden", minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12.5px",
                  fontWeight: 500,
                  color: "var(--color-soil)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.displayName ?? "My Account"}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10.5px",
                  color: "var(--color-pebble)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.email}
              </div>
            </div>
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            style={{
              flexShrink: 0,
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "var(--color-white)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-stone)",
              transition: "background 0.15s ease, color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-white)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-soil)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-stone)";
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
