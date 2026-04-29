"use client";

import { useEffect } from "react";
import { type Reminder, todayKey } from "./useReminders";

export function useReminderNotifications(reminders: Reminder[]) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "denied") return;

    const today = todayKey();

    // Only schedule reminders that have a time and aren't already done today
    const pending = reminders.filter(
      (r) => r.time && r.doneDate !== today
    );
    if (pending.length === 0) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (const reminder of pending) {
      const [hh, mm] = (reminder.time as string).split(":").map(Number);
      const now = new Date();
      const fireAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0, 0);
      const msUntilFire = fireAt.getTime() - now.getTime();

      if (msUntilFire <= 0) continue; // already passed today

      const timer = setTimeout(async () => {
        if (Notification.permission !== "granted") {
          const result = await Notification.requestPermission();
          if (result !== "granted") return;
        }
        new Notification(`${reminder.emoji || "🌸"} Softly reminder`, {
          body: reminder.text,
          icon: "/icons/icon.svg",
          tag: `reminder-${reminder.id}`,
        });
      }, msUntilFire);

      timers.push(timer);
    }

    return () => timers.forEach(clearTimeout);
  }, [reminders]);
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}
