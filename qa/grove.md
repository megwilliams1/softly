# QA — Reflection Grove

---

## Feature: MoodGate

### TC-GROVE-001 · MoodGate shows mood picker when no mood set today
**Steps:** Sign in. Navigate to `/grove`. Ensure no mood has been logged today (clear Firestore `mood/current` for today's date key if needed).

**Expected:** The MoodGate mood picker is displayed with 5 mood buttons (Radiant, Content, Okay, Low, Drained). No "confirmed" state is shown.

---

### TC-GROVE-002 · MoodGate shows confirmed state when mood already set today
**Steps:** Log a mood in the Sanctuary, then navigate to `/grove`.

**Expected:** MoodGate shows the confirmed view: the mood emoji, label, the text "This is your space for today. Ready to write?", and an "Enter the grove" button. The mood picker is NOT shown.

---

### TC-GROVE-003 · Selecting a mood changes background and particles
**Steps:** Navigate to `/grove` with no mood set. Select "Radiant".

**Expected:**
- The page background transitions to a warm yellow (`#FFF9E6` in light mode, `#2A2310` in dark mode)
- Golden pollen particle dots drift upward
- Mood is now saved (visible in Sanctuary MoodCheckin)

---

## Feature: Journal Editor

### TC-GROVE-004 · Free write mode — save entry, view read-only, edit
**Steps:**
1. Navigate to `/grove`, confirm mood.
2. Ensure "Write freely" is selected (default).
3. Type text in the textarea.
4. Click "Save entry".

**Expected:**
- After save, the SoftReset overlay appears
- After dismissing SoftReset, the JournalEditor shows the saved text in read-only mode
- An "Edit" button is visible
- Clicking "Edit" returns to the textarea with the saved text pre-filled

---

### TC-GROVE-005 · Prompt mode — shuffle, save with prompt recorded
**Steps:**
1. Navigate to `/grove`, confirm mood.
2. Click "Give me a prompt".
3. Note the displayed prompt. Click the ↻ shuffle button.
4. Verify the prompt changes.
5. Type a response and click "Save entry".

**Expected:**
- Prompt changes on shuffle
- After save, the saved entry shows the prompt text in italics above the response
- `todayEntry.promptUsed` is non-null in Firestore

---

## Feature: Soft Reset

### TC-GROVE-006 · SoftReset overlay appears after save; dismisses on button click
**Steps:** Save a journal entry. The SoftReset overlay should appear automatically.

**Expected:**
- Fixed dark overlay covers the page
- A breathing circle pulses
- Steps cycle: "Breathe in... 4 counts" → "Hold... 4 counts" → "Breathe out... 6 counts"
- Clicking "I'm ready" fades and dismisses the overlay
- After dismissal, the JournalEditor shows the read-only saved entry

---

## Feature: Past Entries

### TC-GROVE-007 · PastEntries behavior
**Steps (no past entries):** Navigate to `/grove` on an account with only today's entry or no entries.

**Expected:** The PastEntries section is NOT rendered (no heading, no toggle).

**Steps (with past entries):**
1. Have at least 1 journal entry from a previous day.
2. Navigate to `/grove`.

**Expected:**
- "Look back at your grove ↓" heading is visible with entry count
- Clicking it expands the list, sorted newest first
- Each entry shows date, mood emoji (if any), and a text snippet
- Clicking an entry toggles the full text

---

## Feature: Storm Tracker

### TC-GROVE-008 · StormTracker visibility and content
**Steps (fewer than 7 entries):** Navigate to `/grove` with fewer than 7 journal entries total.

**Expected:** The StormTracker section is NOT rendered.

**Steps (7+ entries):**
1. Have 7 or more journal entries across different days.
2. Navigate to `/grove`.

**Expected:**
- StormTracker card appears with 2–3 poetic insight lines
- Lines reference a day of the week, time of day, and/or mood
- Text is italicized in display font

---

## Feature: Future Note Section

### TC-GROVE-009 · Write a note, see pending list, delete
**Steps:**
1. Navigate to `/grove`, confirm mood.
2. In "Send to Future Me", write a note and set a delivery date at least 1 day out.
3. Click "Send".

**Expected:**
- Note appears in the "Waiting to be opened" list with its delivery date
- Clicking ✕ on a pending note deletes it
- Textarea clears after sending

---

### TC-GROVE-010 · Due note modal appears; "I received this" marks delivered
**Steps:** In Firestore, manually set a note's `deliveryDate` to today or yesterday and `delivered: false`. Navigate to `/grove`.

**Expected:**
- A fixed modal overlay appears: "A letter from past you"
- The note's text is shown in italics
- Clicking "I received this" dismisses the modal and marks the note `delivered: true` in Firestore
- The note no longer appears in the pending list

---

## Feature: Tiny Wins Vault

### TC-GROVE-011 · Add win, appears in list, delete on hover
**Steps:**
1. Select an emoji tag (e.g. ⭐).
2. Type a win in the input field.
3. Click "Add" or press Enter.

**Expected:**
- Win appears at the top of the scrollable list with the chosen emoji, text, and today's date
- Hovering over a win shows a ✕ button
- Clicking ✕ removes the win from Firestore and the list

---

## Cross-Cutting: Dark Mode

### TC-GROVE-012 · Dark mode adapts mood backgrounds and card panels
**Steps:**
1. Toggle dark mode in the Navbar.
2. Navigate to `/grove`.
3. Select a mood (e.g. "Radiant").

**Expected:**
- Page background is dark (`#2A2310` for Radiant, not the light `#FFF9E6`)
- All card panels (JournalEditor, PastEntries, StormTracker, FutureNoteSection, TinyWinsVault) show the dark `--color-white` (`#2c2723`) — not harsh bright white
- Text remains readable (soil → light `#e8ddd4` in dark mode)

---

## Cross-Cutting: Mobile Layout

### TC-GROVE-013 · Mobile 375px — mood buttons wrap, no horizontal overflow
**Steps:** Open DevTools, set viewport to 375px wide. Navigate to `/grove`.

**Expected:**
- Mood picker buttons wrap into 2–3 rows cleanly
- No horizontal scrollbar on the page
- Textarea and input fields fill the available width
- "Deliver on [date] [Send]" row in FutureNoteSection wraps without overflow

---

## Cross-Cutting: Due Notes Banner

### TC-GROVE-014 · Due notes banner appears on Garden page
**Steps:**
1. Have at least one future note with `deliveryDate ≤ today` and `delivered: false`.
2. Navigate to `/garden`.

**Expected:**
- A banner appears above the Meal Planner section: "📬 You have a letter from past you."
- "Open in the Grove →" link navigates to `/grove`
- ✕ button dismisses the banner for the session

---

## Cross-Cutting: Presence Tracking

### TC-GROVE-015 · Grove journal entry counts toward weekly presence
**Steps:**
1. Log NO mood, gratitude, or goal check-in for today.
2. Write and save a journal entry in the Grove.
3. Navigate to `/sanctuary`.

**Expected:** The Weekly Garden Summary counts today as a "shown up" day.
