"use client";

import { useState } from "react";
import Link from "next/link";
import { useFutureNotes } from "@/lib/hooks/useFutureNotes";

interface Props {
  uid: string | null;
}

export default function DueNotesBanner({ uid }: Props) {
  const { dueNotes } = useFutureNotes(uid);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || dueNotes.length === 0) return null;

  const count = dueNotes.length;

  return (
    <div
      className="animate-bloom-up"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        backgroundColor: "var(--color-white)",
        border: "1.5px solid var(--color-sage)",
        borderRadius: "var(--radius-md)",
        padding: "12px 16px",
        marginBottom: "28px",
        boxShadow: "var(--shadow-soft)",
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--color-soil)",
        }}
      >
        📬{" "}
        {count === 1
          ? "You have a letter from past you."
          : `You have ${count} letters from past you.`}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link
          href="/grove"
          style={{
            fontSize: "0.85rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-moss)",
            fontWeight: 500,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Open in the Grove →
        </Link>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.85rem",
            color: "var(--color-pebble)",
            padding: "0 2px",
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
