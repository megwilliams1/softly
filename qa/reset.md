# QA — Weekly Reset

---

## Feature: 5-Step Weekly Reset Flow

### TC-RESET-001 · Reset page loads
**Steps:** Navigate to `/reset`.

**Expected:** Page shows "Weekly Reset" header and "A few quiet minutes to close the week and open the next." The WeeklyReset component renders. Step 1 is shown.

---

### TC-RESET-002 · Step 1 — Mood selection
**Steps:** On Step 1, click one of the 6 mood pills (e.g., "Steady", "Joyful", etc.).

**Expected:** The selected mood pill is highlighted. The "Next →" button becomes enabled.

---

### TC-RESET-003 · Step 1 — Custom mood input
**Steps:**
1. On Step 1, type something in the free-text "custom mood" input
2. Observe the Next button

**Expected:** The typed text is accepted. "Next →" button is available.

---

### TC-RESET-004 · Step 1 — Next button disabled with no selection
**Steps:** On Step 1, do not click any mood pill and do not type a custom mood. Observe the "Next →" button.

**Expected:** Button is disabled or clicking has no effect.

---

### TC-RESET-005 · Progress dots update on each step
**Steps:** Advance through Steps 1 → 2 → 3.

**Expected:** The progress dot indicator at the top updates to reflect the current step. Current step dot is highlighted/active.

---

### TC-RESET-006 · Step 2 — Intention input
**Steps:**
1. Advance to Step 2
2. Type an intention in the text input

**Expected:** Text is accepted. "Next →" button is available.

---

### TC-RESET-007 · Back navigation works
**Steps:**
1. Advance to Step 2
2. Click "Back"

**Expected:** Returns to Step 1. Previously selected mood is still shown/selected.

---

### TC-RESET-008 · Step 3 — Meal planner link
**Steps:** Advance to Step 3.

**Expected:** A link/shortcut to the Garden Meal Planner is shown. Clicking it navigates to `/garden`. (Step 3 is skippable — "Next →" is available regardless.)

---

### TC-RESET-009 · Step 4 — Activities link
**Steps:** Advance to Step 4.

**Expected:** A link/shortcut to Kids' Activities is shown. Clicking it navigates to `/garden`. "Next →" available regardless.

---

### TC-RESET-010 · Step 5 — Weekly affirmation
**Steps:** Advance to Step 5.

**Expected:** An affirmation is shown (week-number indexed, different from the daily one if in a different week). A "Complete" button is visible instead of "Next →".

---

### TC-RESET-011 · Completing the reset flow
**Steps:**
1. Complete all 5 steps
2. Click "Complete" on Step 5

**Expected:** `animate-bloom-pop` fires. Completion screen appears: "You're ready for the week." with links to Garden and a "Reset again" option.

---

### TC-RESET-012 · Reset is saved to Firestore
**Steps:** After completing the reset, check Firebase console → Firestore → `users/{uid}/weeklyResets`.

**Expected:** A new doc exists with the current week's Sunday date as the key, containing `weekMood`, `intention`, and `completedAt`.

---

## Feature: Already-Completed State

### TC-RESET-013 · Revisiting `/reset` after completion
**Steps:**
1. Complete the reset for the current week
2. Navigate away and return to `/reset`

**Expected:** The completion screen ("You're ready for the week.") is shown immediately. The 5-step flow does not repeat.

---

### TC-RESET-014 · "Reset again" resets the local state
**Steps:**
1. On the completion screen, click "Reset again"

**Expected:** The 5-step flow starts again from Step 1. Note: whether this overwrites Firestore depends on implementation — verify that saving again updates the existing doc rather than creating a duplicate.

---

### TC-RESET-015 · New week clears completed state
**Steps:** (Test after the calendar rolls past Sunday.)

**Expected:** `/reset` shows Step 1 again for the new week. The previous week's completion does not block the new week's reset.

---

## Feature: Auth Guard

### TC-RESET-016 · Unauthenticated user redirected
**Steps:**
1. Sign out
2. Navigate to `/reset`

**Expected:** Redirected to `/`.
