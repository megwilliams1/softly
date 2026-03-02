"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sprout, Sparkles, Flame, Sun, Moon, LogOut, ShieldCheck } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { useIsAdmin } from "@/lib/hooks/useIsAdmin";
import UserAvatar from "@/components/shared/UserAvatar";

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
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, loading, signOut } = useAuth();
  const { isAdmin } = useIsAdmin(user?.uid ?? null);

  async function handleSignOut() {
    await signOut();
    router.replace("/");
  }

  return (
    <nav
      style={{
        backgroundColor: "var(--color-white)",
        borderBottom: "1px solid rgba(176, 168, 154, 0.3)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* App name */}
        <Link
          href={user ? "/garden" : "/"}
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

        {/* Nav links + controls */}
        <div className="flex items-center gap-2">
          {/* Only show section links when signed in */}
          {!loading && user && (
            <>
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

              {/* Admin link — only for admins */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                  style={{
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: pathname.startsWith("/admin") ? 500 : 400,
                    color: pathname.startsWith("/admin") ? "var(--color-soil)" : "var(--color-stone)",
                    backgroundColor: pathname.startsWith("/admin")
                      ? "var(--color-seasonal-primary)"
                      : "transparent",
                    textDecoration: "none",
                  }}
                >
                  <ShieldCheck size={16} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}

              {/* User avatar → /account */}
              <Link
                href="/account"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                  marginLeft: "4px",
                }}
              >
                <UserAvatar photoURL={user.photoURL} displayName={user.displayName} size={28} />
                <span
                  className="hidden sm:inline"
                  style={{
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-body)",
                    color: "var(--color-stone)",
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.displayName ?? user.email}
                </span>
              </Link>

              {/* Sign out */}
              <button
                onClick={handleSignOut}
                aria-label="Sign out"
                title="Sign out"
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
                }}
              >
                <LogOut size={16} />
              </button>
            </>
          )}

          {/* Dark mode toggle — always visible */}
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
