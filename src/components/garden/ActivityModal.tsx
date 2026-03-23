"use client";

import { useEffect, useState } from "react";
import { DayKey } from "@/lib/hooks/useMeals";
import { Child } from "@/lib/hooks/useChildren";
import { Activity } from "@/lib/hooks/useActivities";

const DAY_LABELS: Record<DayKey, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

const ALL_DAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

interface Props {
  children: Child[];
  initialDay: DayKey;
  activity?: Activity;
  onSave: (data: Omit<Activity, "id">) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export default function ActivityModal({
  children,
  initialDay,
  activity,
  onSave,
  onDelete,
  onClose,
}: Props) {
  const [childIds, setChildIds] = useState<string[]>(
    activity?.childIds ?? (children[0] ? [children[0].id] : [])
  );
  const [day, setDay] = useState<DayKey>(activity?.day ?? initialDay);
  const [time, setTime] = useState(activity?.time ?? "");
  const [label, setLabel] = useState(activity?.label ?? "");

  const isEditing = !!activity;
  const canSave = label.trim().length > 0 && childIds.length > 0;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function toggleChild(id: string) {
    setChildIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "var(--radius-md)",
    border: "1px solid rgba(176, 168, 154, 0.4)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-body)",
    color: "var(--color-soil)",
    backgroundColor: "var(--color-cream)",
    outline: "none",
    boxSizing: "border-box" as const,
  };

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
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lift)",
          padding: "28px 24px",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Header */}
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "var(--color-sage)",
              fontWeight: 600,
              marginBottom: "4px",
            }}
          >
            {isEditing ? "Edit activity" : "Add activity"}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              color: "var(--color-soil)",
              fontWeight: 500,
            }}
          >
            {DAY_LABELS[day]}
          </h2>
        </div>

        {/* Child selector — multi-select */}
        <div>
          <p style={{ fontSize: "0.7rem", color: "var(--color-stone)", marginBottom: "8px" }}>
            For (select one or more)
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {children.map((child) => {
              const selected = childIds.includes(child.id);
              return (
                <button
                  key={child.id}
                  onClick={() => toggleChild(child.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px 6px 8px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: selected ? child.color : "transparent",
                    border: `2px solid ${child.color}`,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-body)",
                    color: "var(--color-soil)",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: child.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "var(--color-soil)",
                      flexShrink: 0,
                    }}
                  >
                    {child.name[0].toUpperCase()}
                  </span>
                  {child.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day selector */}
        <div>
          <p style={{ fontSize: "0.7rem", color: "var(--color-stone)", marginBottom: "8px" }}>
            Day
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {ALL_DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: day === d ? "var(--color-sage)" : "transparent",
                  border: "1.5px solid var(--color-sage)",
                  color: day === d ? "var(--color-white)" : "var(--color-moss)",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease, color 0.15s ease",
                }}
              >
                {DAY_LABELS[d]}
              </button>
            ))}
          </div>
        </div>

        {/* Activity label */}
        <input
          autoFocus
          type="text"
          placeholder="Activity name (e.g. Soccer practice)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && canSave)
              onSave({ childIds, day, time, label: label.trim() });
          }}
          style={inputStyle}
        />

        {/* Time (optional) */}
        <input
          type="text"
          placeholder="Time (optional, e.g. 3:30pm)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={inputStyle}
        />

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              if (canSave) onSave({ childIds, day, time, label: label.trim() });
            }}
            disabled={!canSave}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-sage)",
              color: "var(--color-white)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              border: "none",
              cursor: canSave ? "pointer" : "default",
              opacity: canSave ? 1 : 0.5,
              transition: "opacity 0.15s ease",
            }}
          >
            Save
          </button>

          {isEditing && onDelete && (
            <button
              onClick={onDelete}
              style={{
                padding: "11px 18px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "transparent",
                color: "var(--color-error)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 400,
                border: "1px solid var(--color-error)",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
