"use client";

import { useState } from "react";
import { DayKey } from "@/lib/hooks/useMeals";
import { useChildren } from "@/lib/hooks/useChildren";
import { useActivities, Activity } from "@/lib/hooks/useActivities";
import ActivityModal from "./ActivityModal";
import AddChildModal from "./AddChildModal";

const DAYS: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

type ActivityModalState = { day: DayKey; activity?: Activity } | null;

export default function ActivityScheduler() {
  const { children, addChild } = useChildren();
  const { activities, addActivity, updateActivity, deleteActivity } = useActivities();

  const [activityModal, setActivityModal] = useState<ActivityModalState>(null);
  const [showAddChild, setShowAddChild] = useState(false);

  const takenColors = children.map((c) => c.color);

  return (
    <>
      {/* Children row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        {children.map((child) => (
          <div
            key={child.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px 6px 6px",
              borderRadius: "var(--radius-full)",
              backgroundColor: child.color,
              fontSize: "0.85rem",
              fontFamily: "var(--font-body)",
              color: "var(--color-soil)",
            }}
          >
            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
              }}
            >
              {child.name[0].toUpperCase()}
            </span>
            {child.name}
          </div>
        ))}

        <button
          onClick={() => setShowAddChild(true)}
          style={{
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "transparent",
            border: "1.5px dashed rgba(168, 184, 154, 0.6)",
            color: "var(--color-moss)",
            fontSize: "0.85rem",
            fontFamily: "var(--font-body)",
            cursor: "pointer",
          }}
        >
          + Add child
        </button>
      </div>

      {/* Empty state */}
      {children.length === 0 && (
        <p style={{ color: "var(--color-pebble)", fontSize: "0.9rem" }}>
          Add a child above to start scheduling activities.
        </p>
      )}

      {/* Activity grid */}
      {children.length > 0 && (
        <div style={{ overflowX: "auto", paddingBottom: "8px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(120px, 1fr))",
              gap: "10px",
              minWidth: "700px",
            }}
          >
            {DAYS.map(({ key, label }) => {
              const dayActivities = activities.filter((a) => a.day === key);

              return (
                <div
                  key={key}
                  style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  {/* Day header */}
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "var(--color-moss)",
                      paddingBottom: "4px",
                      borderBottom: "1px solid rgba(168, 184, 154, 0.4)",
                      marginBottom: "2px",
                    }}
                  >
                    {label}
                  </div>

                  {/* Activity pills */}
                  {dayActivities.map((activity) => {
                    const child = children.find((c) => c.id === activity.childId);
                    if (!child) return null;
                    return (
                      <button
                        key={activity.id}
                        onClick={() => setActivityModal({ day: key, activity })}
                        className="animate-bloom-up"
                        style={{
                          textAlign: "left",
                          padding: "8px 10px",
                          borderRadius: "var(--radius-sm)",
                          backgroundColor: child.color,
                          border: "none",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            color: "var(--color-soil)",
                            lineHeight: 1.3,
                          }}
                        >
                          {activity.label}
                        </div>
                        {activity.time && (
                          <div
                            style={{
                              fontSize: "0.7rem",
                              color: "var(--color-stone)",
                              marginTop: "2px",
                            }}
                          >
                            {activity.time}
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {/* Add button */}
                  <button
                    onClick={() => setActivityModal({ day: key })}
                    style={{
                      padding: "6px",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "transparent",
                      border: "1.5px dashed rgba(168, 184, 154, 0.5)",
                      color: "var(--color-pebble)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      marginTop: "2px",
                    }}
                  >
                    +
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Activity modal */}
      {activityModal && (
        <ActivityModal
          children={children}
          initialDay={activityModal.day}
          activity={activityModal.activity}
          onSave={(data) => {
            if (activityModal.activity) {
              updateActivity(activityModal.activity.id, data);
            } else {
              addActivity(data);
            }
            setActivityModal(null);
          }}
          onDelete={
            activityModal.activity
              ? () => {
                  deleteActivity(activityModal.activity!.id);
                  setActivityModal(null);
                }
              : undefined
          }
          onClose={() => setActivityModal(null)}
        />
      )}

      {/* Add child modal */}
      {showAddChild && (
        <AddChildModal
          takenColors={takenColors}
          onAdd={(name, color) => {
            addChild(name, color);
            setShowAddChild(false);
          }}
          onClose={() => setShowAddChild(false)}
        />
      )}
    </>
  );
}
