# QA — The Garden

---

## Feature: Meal Planner

### TC-GARDEN-001 · Meal grid renders all 7 days × 3 meal times
**Steps:** Navigate to `/garden` and scroll to Meal Planner.

**Expected:** Grid shows Mon–Sun columns, each with Breakfast, Lunch, Dinner slots. Empty slots show "+ Add meal" placeholder.

---

### TC-GARDEN-002 · Add a meal to an empty slot
**Steps:**
1. Click an empty meal slot
2. Type a meal name in the modal input
3. Click "Save"

**Expected:** Modal closes. Slot now shows the entered meal name. Data persists on page refresh.

---

### TC-GARDEN-003 · Edit an existing meal
**Steps:**
1. Click a slot that already has a meal
2. Edit the text in the modal
3. Click "Save"

**Expected:** Slot shows updated meal name.

---

### TC-GARDEN-004 · Clear a meal
**Steps:**
1. Click a slot with an existing meal
2. Click "Clear" in the modal

**Expected:** Slot returns to empty "+ Add meal" state.

---

### TC-GARDEN-005 · Close modal via backdrop click
**Steps:**
1. Open any meal modal
2. Click outside the modal panel

**Expected:** Modal closes. No changes saved.

---

### TC-GARDEN-006 · Close modal via ESC key
**Steps:**
1. Open any meal modal
2. Press Escape

**Expected:** Modal closes. No changes saved.

---

### TC-GARDEN-007 · Meal data is per-user (not shared)
**Steps:**
1. Sign in as User A, add a meal
2. Sign out, sign in as User B
3. Check meal planner

**Expected:** User B sees an empty planner. User A's meals are not visible.

---

### TC-GARDEN-008 · Meal data syncs across devices
**Steps:**
1. Sign in and add meals on device A
2. Open the app on device B (same account)

**Expected:** Meals appear on device B without refreshing.

---

## Feature: Kids' Activity Scheduler

### TC-GARDEN-009 · Add a child
**Steps:**
1. Click "+ Add child"
2. Enter a name, select a color
3. Click "Add child"

**Expected:** Child pill appears in the row. The activity grid becomes visible.

---

### TC-GARDEN-010 · Duplicate color is blocked
**Steps:**
1. Add a child with a color
2. Try to add a second child and click the same color

**Expected:** Already-taken color is dimmed and not selectable.

---

### TC-GARDEN-011 · Add an activity
**Steps:**
1. Click the "+" button under any day column
2. Select a child, select a day, enter an activity label, optionally enter a time
3. Click "Save"

**Expected:** Activity pill appears in the correct day column, styled with the child's color.

---

### TC-GARDEN-012 · Edit an activity
**Steps:**
1. Click an existing activity pill
2. Change the label or time
3. Click "Save"

**Expected:** Pill updates with the new information.

---

### TC-GARDEN-013 · Delete an activity
**Steps:**
1. Click an existing activity pill
2. Click "Delete" in the modal

**Expected:** Activity pill is removed from the grid.

---

### TC-GARDEN-014 · Activity data persists after refresh
**Steps:** Add an activity, then hard refresh.

**Expected:** Activity is still shown.

---

## Feature: Groceries & Errands Checklist

### TC-GARDEN-015 · Add a grocery item
**Steps:**
1. Select the "Groceries" tab
2. Type an item name in the input
3. Click "Add" or press Enter

**Expected:** Item appears in the groceries list, unchecked.

---

### TC-GARDEN-016 · Add an errands item
**Steps:**
1. Select the "Errands" tab
2. Type an item and click "Add"

**Expected:** Item appears in the errands list.

---

### TC-GARDEN-017 · Check off an item
**Steps:**
1. Click the circle checkbox next to an item

**Expected:** Item shows strikethrough and reduced opacity. The `animate-bloom-pop` animation fires briefly.

---

### TC-GARDEN-018 · Uncheck an item
**Steps:**
1. Click the circle on a checked item

**Expected:** Item returns to unchecked state.

---

### TC-GARDEN-019 · Clear completed items
**Steps:**
1. Check off at least one item
2. Click "Clear N completed"

**Expected:** All checked items are removed. Button disappears if no remaining checked items.

---

### TC-GARDEN-020 · Checklist data is tab-specific
**Steps:**
1. Add "Milk" to Groceries
2. Switch to Errands tab

**Expected:** "Milk" is not visible in Errands.

---

### TC-GARDEN-021 · Empty state message
**Steps:** Navigate to a fresh checklist with no items.

**Expected:** "Nothing here yet. Add something below." message is visible.

---

## Feature: Plant a Goal

### TC-GARDEN-022 · Empty state — no active goal
**Steps:** Navigate to `/garden` → "Your Plant" section on a fresh account.

**Expected:** Stage 0 plant (seed) shown. "Plant something" button visible. Encouraging subtext visible.

---

### TC-GARDEN-023 · Plant a new goal
**Steps:**
1. Click "Plant something"
2. Enter a goal in the modal textarea
3. Click "Plant it"

**Expected:** Modal closes. GoalCard now shows the goal text, the plant at stage 0, and the "Check in today" button.

---

### TC-GARDEN-024 · Check in on a goal
**Steps:**
1. With an active goal, click "Check in today"

**Expected:** Button is replaced by a "✓ Checked in today" confirmation badge. Check-in count increments.

---

### TC-GARDEN-025 · One check-in per day enforced
**Steps:**
1. Check in on a goal
2. Refresh the page
3. Observe the check-in button state

**Expected:** "Checked in today" badge is still shown. Cannot check in again the same day.

---

### TC-GARDEN-026 · Plant grows through stages
**Steps:**
1. Manually verify stage thresholds by observing the plant SVG at check-in counts: 0, 1, 3, 6, 11

**Expected:**
- 0 check-ins → Seed (stage 0, label: "Just planted.")
- 1–2 check-ins → Sprout (stage 1, label: "Something is stirring.")
- 3–5 check-ins → Seedling (stage 2, label: "It's taking root.")
- 6–10 check-ins → Growing (stage 3, label: "Growing steadily.")
- 11+ check-ins → Full Bloom (stage 4, label: "In full bloom.")

---

### TC-GARDEN-027 · Mark goal as complete
**Steps:**
1. With an active goal, click "Mark this goal as complete"

**Expected:** `animate-bloom-pop` fires on the card. The goal moves to the archived list. GoalCard returns to empty state (ready to plant a new goal).

---

### TC-GARDEN-028 · Past gardens list
**Steps:**
1. Complete at least one goal
2. Click "▸ 1 past garden" toggle

**Expected:** Archived goal(s) listed with a 🌸 icon, goal text, and check-in day count.

---

### TC-GARDEN-029 · Edit active goal text
**Steps:**
1. With an active goal, click "Edit"
2. Change the goal text
3. Click "Plant it"

**Expected:** Goal text updates. Check-in count and plant stage are unchanged.


---

## Feature: Multi-Kid Activities (TICKET-031 / multi-kid update)

### TC-GARDEN-030 · ActivityModal shows multi-select child buttons
**Steps:**
1. Add at least 2 children in the Activity Scheduler.
2. Click "+" to open the activity modal.

**Expected:** All children are shown as pill buttons in the "For" section. Multiple can be toggled — clicking one selects it (filled background), clicking again deselects it.

---

### TC-GARDEN-031 · Save button disabled until at least one child is selected
**Steps:** Open the activity modal, deselect all children (click the pre-selected one to remove it).

**Expected:** The Save button becomes semi-transparent and non-interactive. Filling in an activity name alone is not enough.

---

### TC-GARDEN-032 · Activity with 1 child shows solid color card
**Steps:** Add an activity assigned to exactly one child.

**Expected:** The activity pill on the calendar uses that child's color as the solid background. No dot row is shown.

---

### TC-GARDEN-033 · Activity with 2+ children shows colored dot row
**Steps:** Add an activity assigned to 2 or more children.

**Expected:**
- The activity pill background uses the first child's color
- A row of small colored dots (one per child) appears below the label
- Each dot matches the respective child's color

---

### TC-GARDEN-034 · Old single-child activities (migration) still display correctly
**Steps:** If any activities were saved before the multi-kid update (with a `childId` string field), navigate to the garden.

**Expected:** Those activities still display with the correct child's color. The migration logic (reading old `childId` and converting to `[childId]`) handles this transparently.

---

## Feature: Shopping List (renamed from Groceries)

### TC-GARDEN-035 · Shopping tab label is "Shopping"
**Steps:** Navigate to `/garden`, scroll to the Shopping List section.

**Expected:** The first tab reads "Shopping" (not "Groceries"). The second tab still reads "Errands". Firestore key is still `"groceries"` (no data migration needed).

---

### TC-GARDEN-036 · Shopping tab placeholder text
**Steps:** Click the "Shopping" tab. Focus the add-item input.

**Expected:** Placeholder reads "Add a shopping item..." (not "Add a grocery item...").
