"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sprout, Sparkles, Flame, Sun, Moon, LogOut, ShieldCheck, Leaf, RefreshCw, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { useIsAdmin } from "@/lib/hooks/useIsAdmin";
import UserAvatar from "@/components/shared/UserAvatar";

const links = [
  { href: "/garden",    label: "The Garden",       icon: Sprout    },
  { href: "/sanctuary", label: "The Sanctuary",    icon: Sparkles  },
  { href: "/hearth",    label: "The Hearth",       icon: Flame     },
  { href: "/grove",     label: "Reflection Grove", icon: Leaf      },
  { href: "/reset",     label: "Weekly Reset",     icon: RefreshCw },
];

const iconButtonStyle = {
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
} as const;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, loading, signOut } = useAuth();
  const { isAdmin } = useIsAdmin(user?.uid ?? null);
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    router.replace("/");
  }

  return (
    <nav
      style={{
        backgroundColor: "var(--color-white)",
        borderBottom: "1px solid rgba(176, 168, 154, 0.3)",
        boxShadow: "var(--shadow-soft)",
        position: "relative",
        zIndex: 40,
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

        {/* Desktop nav — hidden on mobile */}
        {!loading && user && (
          <div className="hidden md:flex items-center gap-2">
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
                    backgroundColor: isActive ? "var(--color-seasonal-primary)" : "transparent",
                    textDecoration: "none",
                  }}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: pathname.startsWith("/admin") ? 500 : 400,
                  color: pathname.startsWith("/admin") ? "var(--color-soil)" : "var(--color-stone)",
                  backgroundColor: pathname.startsWith("/admin") ? "var(--color-seasonal-primary)" : "transparent",
                  textDecoration: "none",
                }}
              >
                <ShieldCheck size={16} />
                <span>Admin</span>
              </Link>
            )}

            <Link
              href="/account"
              style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", marginLeft: "4px" }}
            >
              <UserAvatar photoURL={user.photoURL} displayName={user.displayName} size={28} />
              <span
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

            <button onClick={handleSignOut} aria-label="Sign out" title="Sign out" style={iconButtonStyle}>
              <LogOut size={16} />
            </button>
          </div>
        )}

        {/* Right controls — always visible */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{ ...iconButtonStyle, marginLeft: "4px" }}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Hamburger — mobile only */}
          {!loading && user && (
            <button
              className="md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={iconButtonStyle}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && user && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "var(--color-white)",
            borderBottom: "1px solid rgba(176, 168, 154, 0.3)",
            boxShadow: "var(--shadow-card)",
            padding: "12px 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isActive ? "var(--color-seasonal-primary)" : "transparent",
                  color: isActive ? "var(--color-soil)" : "var(--color-stone)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 500 : 400,
                  textDecoration: "none",
                  transition: "background-color 0.15s ease",
                }}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                backgroundColor: pathname.startsWith("/admin") ? "var(--color-seasonal-primary)" : "transparent",
                color: pathname.startsWith("/admin") ? "var(--color-soil)" : "var(--color-stone)",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              <ShieldCheck size={18} />
              Admin
            </Link>
          )}

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "rgba(176, 168, 154, 0.25)", margin: "8px 0" }} />

          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              color: "var(--color-stone)",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            <UserAvatar photoURL={user.photoURL} displayName={user.displayName} size={22} />
            <span>{user.displayName ?? user.email}</span>
          </Link>

          <button
            onClick={handleSignOut}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "transparent",
              border: "none",
              color: "var(--color-stone)",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}
