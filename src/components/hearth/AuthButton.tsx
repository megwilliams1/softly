"use client";

import { LogIn, LogOut } from "lucide-react";
import { type User } from "firebase/auth";

interface Props {
  user: User | null;
  loading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

export default function AuthButton({ user, loading, onSignIn, onSignOut }: Props) {
  if (loading) return null;

  if (!user) {
    return (
      <button
        onClick={onSignIn}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "9px 16px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--color-butter)",
          border: "1px solid rgba(176, 168, 154, 0.3)",
          color: "var(--color-soil)",
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          fontWeight: 500,
          cursor: "pointer",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <LogIn size={15} />
        Sign in with Google
      </button>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt={user.displayName ?? ""}
          width={28}
          height={28}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      )}
      <button
        onClick={onSignOut}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "7px 12px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "transparent",
          border: "1px solid rgba(176, 168, 154, 0.4)",
          color: "var(--color-stone)",
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          cursor: "pointer",
        }}
      >
        <LogOut size={13} />
        Sign out
      </button>
    </div>
  );
}
