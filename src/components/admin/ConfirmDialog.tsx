"use client";

import { useEffect } from "react";

interface Props {
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onClose,
}: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(61, 53, 48, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-bloom-up"
        style={{
          backgroundColor: "var(--color-white)",
          borderRadius: "20px",
          boxShadow: "var(--shadow-lift)",
          padding: "28px 24px",
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <p
          style={{
            fontSize: "1rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-soil)",
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-error)",
              color: "var(--color-white)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            {confirmLabel}
          </button>

          <button
            onClick={onClose}
            style={{
              padding: "11px 18px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "transparent",
              color: "var(--color-stone)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              border: "1px solid rgba(176, 168, 154, 0.4)",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
