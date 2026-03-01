# QA — The Sanctuary

---

## Feature: Daily Affirmation

### TC-SANC-001 · Affirmation displays on load
**Steps:** Navigate to `/sanctuary`.

**Expected:** An affirmation is shown in Cormorant Garamond, large and prominent. The same affirmation is shown all day (deterministic by day-of-year).

---

### TC-SANC-002 · Cycling to another affirmation
**Steps:** Click the "another one" button (or "Show me another" if TICKET-027 is complete) below the affirmation.

**Expected:** A different affirmation fades/animates in using `animate-petal-drift`. The button still works on subsequent clicks.

---

### TC-SANC-003 · Affirmation cycles without repeating immediately
**Steps:** Click the cycle button 5 or more times.

**Expected:** Affirmations cycle through the list without crashing. If it wraps around, that is acceptable.

---

### TC-SANC-004 · Page refresh resets to daily affirmation
**Steps:**
1. Cycle to a different affirmation
2. Refresh the page

**Expected:** The default daily affirmation is shown again (not the cycled one).

---

## Feature: Mood Check-in

### TC-SANC-005 · All 5 mood options render
**Steps:** Navigate to `/sanctuary` → "How are you feeling?" section.

**Expected:** Five mood options visible: Radiant (🌟), Content (🌸), Okay (🌿), Low (🌧️), Drained (🥀). Each shows label and subtext.

---

### TC-SANC-006 · Select a mood
**Steps:** Click any mood option.

**Expected:** Selected option shows `--color-bloom-pink` background and border. `animate-bloom-pop` fires briefly. Prompt text changes to "You've checked in today. You can always update it."

---

### TC-SANC-007 · Mood persists after refresh
**Steps:**
1. Select a mood
2. Hard refresh the page

**Expected:** The same mood is still selected.

---

### TC-SANC-008 · Mood can be changed
**Steps:**
1. Select "Radiant"
2. Click "Low"

**Expected:** "Low" becomes selected. "Radiant" deselects.

---

### TC-SANC-009 · Mood resets the next calendar day
**Steps:** (Test manually or wait until midnight)

**Expected:** Next day, no mood is pre-selected. Prompt returns to "Take a breath. How are you feeling right now?"

---

### TC-SANC-010 · Mood data is user-scoped
**Steps:**
1. Sign in as User A, select "Radiant"
2. Sign out, sign in as User B

**Expected:** User B sees no mood selected.

---

## Feature: Gratitude Journal

### TC-SANC-011 · Three input fields render
**Steps:** Navigate to `/sanctuary` → Gratitude section.

**Expected:** Three textarea inputs labeled "I'm grateful for..." are visible when no entry exists for today.

---

### TC-SANC-012 · Save a gratitude entry
**Steps:**
1. Fill in at least one of the three fields
2. Click "Save"

**Expected:** "Saved — beautifully done." confirmation appears for ~3 seconds. View switches to read-only mode showing the saved entries as quotes.

---

### TC-SANC-013 · Save is disabled when all fields are empty
**Steps:** Leave all three fields blank and observe the Save button.

**Expected:** Save button is disabled or grayed out. Cannot submit empty entries.

---

### TC-SANC-014 · Edit today's entry
**Steps:**
1. After saving, click "Edit today's entries"
2. Change one of the fields
3. Click "Save" again

**Expected:** Updated entry is saved. Read-only view shows the new content.

---

### TC-SANC-015 · Yesterday's entry is shown
**Steps:**
1. Save a gratitude entry today
2. (If testing cross-day: save an entry the previous calendar day and verify)

**Expected:** Yesterday's entry is shown in a separate "Yesterday" panel as read-only quoted text. If no yesterday entry exists, the panel is not shown.

---

### TC-SANC-016 · Gratitude data persists after refresh
**Steps:** Save an entry, then hard refresh.

**Expected:** Read-only view with today's saved entries is shown on reload.

---

### TC-SANC-017 · Gratitude data is user-scoped
**Steps:**
1. Save gratitude entries as User A
2. Sign out, sign in as User B

**Expected:** User B sees empty gratitude fields.

---

## Feature: Self-Care Reminders

### TC-SANC-018 · Empty state
**Steps:** Navigate to `/sanctuary` → Self-Care section on a fresh account.

**Expected:** "Add a few reminders for small acts of care — just for you." message is visible.

---

### TC-SANC-019 · Add a reminder
**Steps:**
1. Enter an emoji (optional) and reminder text in the inline form
2. Click "Add"

**Expected:** Reminder card appears in the grid with the emoji and text. Form clears.

---

### TC-SANC-020 · Mark a reminder as done
**Steps:** Click the "Done" button on a reminder card.

**Expected:** Card shows at half opacity with strikethrough text. Button changes to "Undo".

---

### TC-SANC-021 · Undo a done reminder
**Steps:** Click "Undo" on a done reminder.

**Expected:** Card returns to normal opacity and no strikethrough. Button returns to "Done".

---

### TC-SANC-022 · Delete a reminder
**Steps:** Click the ✕ button on any reminder card.

**Expected:** Card is removed from the grid. Data removed from Firestore.

---

### TC-SANC-023 · Done state resets the next calendar day
**Steps:** Mark a reminder as done, then revisit the next day.

**Expected:** Reminder appears undone (normal state). Done state only lasts for the current calendar day.

---

## Feature: Weekly Garden Health Summary

### TC-SANC-024 · Summary card renders every day
**Steps:** Navigate to `/sanctuary` on any day of the week.

**Expected:** The summary card is visible (after Gratitude on non-Sundays).

---

### TC-SANC-025 · Summary card appears first on Sundays
**Steps:** Navigate to `/sanctuary` on a Sunday.

**Expected:** The `WeeklyGardenSummary` card appears at the very top, above DailyAffirmation. It is larger (prominent mode).

---

### TC-SANC-026 · Summary reflects real data
**Steps:**
1. Log a mood today
2. Save a gratitude entry today
3. Navigate to `/sanctuary`

**Expected:** "You showed up" count is at least 1. Gratitude count reflects the entries saved.

---

### TC-SANC-027 · Zero data state
**Steps:** Check the summary on a fresh account with no mood, gratitude, or goal data.

**Expected:** "You did not log this week, and that is okay." or similar gentle zero-state message. No crash.

---

### TC-SANC-028 · Sunday label vs. weekday label
**Steps:** View the summary on a Sunday vs. any other day.

**Expected:**
- Sunday: label reads "Your week in the garden"
- Other days: label reads "This week so far"

---

### TC-SANC-029 · Mood-aware headline
**Steps:**
1. Log "Drained" as today's mood every day this week
2. Check the summary headline

**Expected:** Headline uses gentler, more validating language (from `GENTLE_HEADLINES` pool) — not the default wording.
