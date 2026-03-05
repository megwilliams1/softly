"use client";

import { useEffect, useState } from "react";
import { useFutureNotes, FutureNote } from "@/lib/hooks/useFutureNotes";

function maxDeliveryDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

function minDeliveryDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

interface Props {
  uid: string | null;
}

export default function FutureNoteSection({ uid }: Props) {
  const { notes, dueNotes, addNote, markDelivered, deleteNote } = useFutureNotes(uid);
  const [dueModal, setDueModal] = useState<FutureNote | null>(null);
  const [text, setText] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(minDeliveryDate());
  const [sending, setSending] = useState(false);

  // Show oldest due note on load
  useEffect(() => {
    if (dueNotes.length > 0 && !dueModal) {
      setDueModal(dueNotes[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dueNotes.length]);

  async function handleDismiss() {
    if (dueModal) await markDelivered(dueModal.id);
    setDueModal(null);
  }

  async function handleSend() {
    if (!text.trim() || !deliveryDate) return;
    setSending(true);
    await addNote(text.trim(), deliveryDate);
    setText("");
    setDeliveryDate(minDeliveryDate());
    setSending(false);
  }

  const pending = notes.filter((n) => !n.delivered);

  return (
    <>
      {/* Due note modal */}
      {dueModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(61, 53, 48, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "24px",
          }}
        >
          <div
            className="animate-bloom-up"
            style={{
              backgroundColor: "var(--color-white)",
              borderRadius: "var(--radius-lg)",
              padding: "36px 32px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "var(--shadow-lift)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-sage)",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              A letter from past you
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                color: "var(--color-soil)",
                lineHeight: 1.7,
                fontStyle: "italic",
                marginBottom: "28px",
                whiteSpace: "pre-wrap",
              }}
            >
              &ldquo;{dueModal.text}&rdquo;
            </p>
            <button
              onClick={handleDismiss}
              style={{
                padding: "10px 28px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-sage)",
                color: "var(--color-white)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
              }}
            >
              I received this
            </button>
          </div>
        </div>
      )}

      {/* Section */}
      <div
        style={{
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--radius-lg)",
          padding: "24px 28px",
          boxShadow: "var(--shadow-soft)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            color: "var(--color-sage)",
            fontWeight: 600,
          }}
        >
          Send to Future Me
        </p>

        <textarea
          placeholder="Write a note to your future self..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(176, 168, 154, 0.4)",
            fontSize: "0.95rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-soil)",
            backgroundColor: "var(--color-cream)",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
            lineHeight: 1.6,
          }}
        />

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <label
            style={{ fontSize: "0.8rem", color: "var(--color-stone)", fontFamily: "var(--font-body)" }}
          >
            Deliver on
          </label>
          <input
            type="date"
            value={deliveryDate}
            min={minDeliveryDate()}
            max={maxDeliveryDate()}
            onChange={(e) => setDeliveryDate(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(176, 168, 154, 0.4)",
              fontSize: "0.9rem",
              fontFamily: "var(--font-body)",
              color: "var(--color-soil)",
              backgroundColor: "var(--color-cream)",
              outline: "none",
            }}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || sending}
            style={{
              marginLeft: "auto",
              padding: "9px 22px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-sage)",
              color: "var(--color-white)",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 500,
              border: "none",
              cursor: text.trim() && !sending ? "pointer" : "default",
              opacity: text.trim() && !sending ? 1 : 0.5,
              transition: "opacity 0.15s ease",
            }}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>

        {/* Pending notes list */}
        {pending.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--color-stone)", fontFamily: "var(--font-body)" }}>
              Waiting to be opened
            </p>
            {pending.map((note) => (
              <div
                key={note.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "var(--color-white)",
                  borderRadius: "var(--radius-md)",
                  padding: "10px 14px",
                  border: "1px solid rgba(168,184,154,0.2)",
                }}
              >
                <span style={{ fontSize: "0.85rem", color: "var(--color-soil)", flex: 1, fontFamily: "var(--font-body)" }}>
                  Opens {formatDate(note.deliveryDate)}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  title="Delete"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    color: "var(--color-pebble)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
