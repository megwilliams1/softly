# QA — The Hearth

---

## Feature: Browse Recipes

### TC-HEARTH-001 · Recipe grid renders
**Steps:** Navigate to `/hearth`.

**Expected:** Recipe cards render in a responsive auto-fill grid. Each card shows an image (or placeholder), title, and author avatar + name.

---

### TC-HEARTH-002 · Empty state when no recipes exist
**Steps:** (Test with a clean Firestore `recipes` collection.)

**Expected:** "No recipes yet. Be the first to share something warm." message appears.

---

### TC-HEARTH-003 · New recipes appear in real time
**Steps:**
1. Open `/hearth` in two browser tabs (same or different accounts)
2. Submit a recipe from one tab

**Expected:** The new recipe card appears in the other tab without refreshing.

---

### TC-HEARTH-004 · Linked recipe card badge
**Steps:** Add a linked recipe (URL mode). View the card.

**Expected:** Card shows an "External Link" badge.

---

### TC-HEARTH-005 · Original recipe card (no badge)
**Steps:** Add a written recipe. View the card.

**Expected:** Card does not show an "External Link" badge. Timing chips (prep/cook/servings) visible if data was entered.

---

### TC-HEARTH-006 · Recipe card hover animation
**Steps:** Hover over a recipe card on desktop.

**Expected:** Card lifts slightly (`translateY(-2px)`) with `--shadow-lift`.

---

### TC-HEARTH-007 · Image fallback for missing photo
**Steps:** Submit a recipe with no image URL. View the card.

**Expected:** A butter-colored placeholder with a 🍽️ emoji is shown instead of a broken image.

---

## Feature: Submit a Recipe

### TC-HEARTH-008 · Mode toggle works
**Steps:**
1. Click "Share a recipe" (or the submit button)
2. Click the "Link a recipe" mode toggle
3. Click the "Write my own" mode toggle

**Expected:** The form fields update correctly for each mode. No data carries over unexpectedly between modes.

---

### TC-HEARTH-009 · Submit a linked recipe (required fields only)
**Steps:**
1. Open the submit modal
2. Select "Link a recipe"
3. Enter a title and a valid URL
4. Click "Share Recipe"

**Expected:** Modal closes. New recipe card appears in the feed with the entered title and author info. Card shows "External Link" badge.

---

### TC-HEARTH-010 · Submit a written recipe (all fields)
**Steps:**
1. Open the submit modal
2. Select "Write my own"
3. Fill in title, image URL, ingredients (one per line), instructions (one step per line), prep time, cook time, servings
4. Click "Share Recipe"

**Expected:** Modal closes. Recipe card and detail modal show all entered data correctly.

---

### TC-HEARTH-011 · Submit button disabled without required fields
**Steps:**
1. Open submit modal in either mode
2. Leave the title blank (or URL blank for linked mode)
3. Observe the "Share Recipe" button

**Expected:** Button is disabled or cannot be clicked.

---

### TC-HEARTH-012 · Author name on recipe card
**Steps:** Submit a recipe while signed in as an email user (not Google).

**Expected:** The recipe card shows the user's display name as the author. Not "null" or blank.

---

### TC-HEARTH-013 · Google user author photo on recipe card
**Steps:** Submit a recipe while signed in via Google.

**Expected:** Recipe card shows the user's Google profile photo as the author avatar.

---

### TC-HEARTH-014 · Email user author avatar on recipe card
**Steps:** Submit a recipe while signed in via email (no Google photo).

**Expected:** Author avatar shows user's initials in a circle (not a broken image). (Requires TICKET-023.)

---

## Feature: Recipe Detail Modal

### TC-HEARTH-015 · Open recipe detail
**Steps:** Click any recipe card.

**Expected:** A full-screen modal opens showing: image, title, author attribution, and either a "View Recipe" link (linked type) or ingredients + instructions (written type).

---

### TC-HEARTH-016 · View Recipe link works
**Steps:**
1. Open a linked recipe's detail modal
2. Click "View Recipe"

**Expected:** Opens the URL in a new tab.

---

### TC-HEARTH-017 · Ingredients and instructions display correctly
**Steps:** Open a written recipe with multiple ingredients and steps.

**Expected:** Ingredients shown as a bulleted list. Instructions shown as a numbered list. Formatting is correct.

---

### TC-HEARTH-018 · Close modal via X button
**Steps:** Open any recipe detail. Click the X button in the top-right corner.

**Expected:** Modal closes.

---

### TC-HEARTH-019 · Close modal via Escape key
**Steps:** Open any recipe detail. Press Escape.

**Expected:** Modal closes.

---

## Feature: Delete a Recipe

### TC-HEARTH-020 · Author can delete their own recipe
**Steps:**
1. Submit a recipe while signed in
2. Open the detail modal for that recipe
3. Click "Delete recipe"

**Expected:** A confirmation prompt appears (browser confirm or inline). After confirming, the recipe is removed from the feed.

---

### TC-HEARTH-021 · Non-author cannot delete a recipe
**Steps:**
1. Sign in as User A, submit a recipe
2. Sign out, sign in as User B
3. Open User A's recipe detail

**Expected:** No "Delete recipe" button is visible to User B.

---

## Feature: Auth Gate

### TC-HEARTH-022 · Unauthenticated user redirected
**Steps:**
1. Sign out
2. Navigate to `/hearth`

**Expected:** Redirected to `/`.

---

### TC-HEARTH-023 · Submit requires sign-in
**Steps:** (This should be covered by the auth guard above — users must be signed in to reach `/hearth`.)

**Expected:** Any signed-in user can submit. All recipes they submit have their `authorId` stored.
