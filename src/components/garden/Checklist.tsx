"use client";

import { useState } from "react";
import { useChecklist, ChecklistTab } from "@/lib/hooks/useChecklist";

const TABS: { key: ChecklistTab; label: string }[] = [
  { key: "groceries", label: "Groceries" },
  { key: "errands", label: "Errands" },
];

export default function Checklist({ uid }: { uid: string | null }) {
  const { data, addItem, toggleItem, clearCompleted } = useChecklist(uid);
  const [activeTab, setActiveTab] = useState<ChecklistTab>("groceries");
  const [input, setInput] = useState("");
  const [lastToggledId, setLastToggledId] = useState<string | null>(null);

  const items = data[activeTab];
  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);
  const sorted = [...unchecked, ...checked];

  function handleToggle(id: string) {
    toggleItem(activeTab, id);
    setLastToggledId(id);
    setTimeout(() => setLastToggledId(null), 350);
  }

  function handleAdd() {
    if (!input.trim()) return;
    addItem(activeTab, input.trim());
    setInput("");
  }

  return (
    <div
      style={{
        backgroundColor: "var(--color-white)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
        padding: "24px",
        maxWidth: "480px",
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: "7px 18px",
              borderRadius: "var(--radius-full)",
              backgroundColor:
                activeTab === key ? "var(--color-sage)" : "transparent",
              color:
                activeTab === key ? "var(--color-white)" : "var(--color-stone)",
              border:
                activeTab === key
                  ? "none"
                  : "1.5px solid rgba(168, 184, 154, 0.5)",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: activeTab === key ? 500 : 400,
              cursor: "pointer",
              transition: "background-color 0.15s ease, color 0.15s ease",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" }}>
        {sorted.length === 0 && (
          <p style={{ fontSize: "0.875rem", color: "var(--color-pebble)", padding: "8px 0" }}>
            Nothing here yet. Add something below.
          </p>
        )}

        {sorted.map((item) => (
          <button
            key={item.id}
            onClick={() => handleToggle(item.id)}
            aria-label={item.checked ? `Uncheck ${item.label}` : `Check off ${item.label}`}
            aria-pressed={item.checked}
            className={lastToggledId === item.id ? "animate-bloom-pop" : ""}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "var(--radius-md)",
              backgroundColor: item.checked
                ? "rgba(176, 168, 154, 0.08)"
                : "var(--color-cream)",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              opacity: item.checked ? 0.5 : 1,
              transition: "opacity 0.2s ease, background-color 0.2s ease",
            }}
          >
            {/* Circle checkbox */}
            <span
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: item.checked
                  ? "none"
                  : "2px solid rgba(168, 184, 154, 0.7)",
                backgroundColor: item.checked ? "var(--color-sage)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background-color 0.2s ease",
              }}
            >
              {item.checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>

            {/* Label */}
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--color-soil)",
                textDecoration: item.checked ? "line-through" : "none",
                transition: "text-decoration 0.15s ease",
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Add input */}
      <div style={{ display: "flex", gap: "8px", marginBottom: checked.length > 0 ? "12px" : "0" }}>
        <input
          type="text"
          placeholder={activeTab === "groceries" ? "Add a grocery item..." : "Add an errand..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          style={{
            flex: 1,
            padding: "10px 14px",
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
          onClick={handleAdd}
          style={{
            padding: "10px 16px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-sage)",
            color: "var(--color-white)",
            border: "none",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Clear completed */}
      {checked.length > 0 && (
        <button
          onClick={() => clearCompleted(activeTab)}
          style={{
            fontSize: "0.8rem",
            color: "var(--color-pebble)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            fontFamily: "var(--font-body)",
          }}
        >
          Clear {checked.length} completed
        </button>
      )}
    </div>
  );
}
