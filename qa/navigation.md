# QA — Navigation & Navbar

---

## Feature: Auth-Aware Navbar

### TC-NAV-001 · Signed-out state
**Steps:** Visit the app while signed out.

**Expected:** Only the "softly" wordmark is shown in the navbar. No section links (Garden, Sanctuary, Hearth, Reset) are visible. Dark mode toggle is visible.

---

### TC-NAV-002 · Signed-in state
**Steps:** Sign in to the app.

**Expected:** Section links appear: Garden (Sprout icon), Sanctuary (Heart icon), Hearth (Flame icon). Dark mode toggle still visible. Sign-out button (LogOut icon) visible.

---

### TC-NAV-003 · Wordmark links correctly
**Steps:**
- While signed in: click "softly" wordmark
- While signed out: click "softly" wordmark

**Expected:**
- Signed in → navigates to `/garden`
- Signed out → navigates to `/`

---

## Feature: Active Link Highlighting

### TC-NAV-004 · Garden link active on `/garden`
**Steps:** Navigate to `/garden`.

**Expected:** The Garden nav link has the active style (`--color-seasonal-primary` background pill).

---

### TC-NAV-005 · Sanctuary link active on `/sanctuary`
**Steps:** Navigate to `/sanctuary`.

**Expected:** Sanctuary link is highlighted. Garden link is not.

---

### TC-NAV-006 · Hearth link active on `/hearth`
**Steps:** Navigate to `/hearth`.

**Expected:** Hearth link is highlighted.

---

### TC-NAV-007 · No link active on `/reset`
**Steps:** Navigate to `/reset`.

**Expected:** No section link is highlighted (Reset is accessed via the Sunday prompt, not a persistent nav link).

---

## Feature: Sunday Reset Prompt

### TC-NAV-008 · "Time to reset 🌿" prompt appears on Sundays
**Steps:** Navigate to any page on a Sunday while signed in.

**Expected:** A "Time to reset 🌿" pill link appears in the Navbar, linking to `/reset`.

---

### TC-NAV-009 · Prompt is absent on non-Sundays
**Steps:** Navigate to any page on a non-Sunday while signed in.

**Expected:** No reset prompt in the Navbar.

---

## Feature: Dark Mode Toggle

### TC-NAV-010 · Toggle switches to dark mode
**Steps:** Click the Moon icon toggle in the Navbar.

**Expected:** `data-theme="dark"` is set on `<html>`. App colors shift to the dark palette. The icon changes to Sun.

---

### TC-NAV-011 · Toggle switches back to light mode
**Steps:** While in dark mode, click the Sun icon.

**Expected:** `data-theme` attribute is removed (or set to "light"). App returns to light mode. Moon icon reappears.

---

### TC-NAV-012 · Dark mode preference persists after refresh
**Steps:**
1. Enable dark mode
2. Hard refresh the page

**Expected:** App loads in dark mode with no flash of light mode (FOUC prevention working).

---

### TC-NAV-013 · Dark mode toggle available when signed out
**Steps:** Visit the app while signed out. Look for the toggle.

**Expected:** Dark mode toggle is visible even on the sign-in page.

---

## Feature: Mobile Layout

### TC-NAV-014 · Navbar is usable at 375px
**Steps:** Set browser DevTools to 375px viewport width. Navigate through all sections.

**Expected:** Navbar does not overflow horizontally. All buttons are tappable. Labels may be hidden (`hidden sm:inline`) but icons remain visible.

---

### TC-NAV-015 · No horizontal scroll from Navbar
**Steps:** At 375px viewport, check the Navbar.

**Expected:** No horizontal scroll bar appears. All nav content stays within the viewport.

---

## Feature: Seasonal Background

### TC-NAV-016 · Seasonal blobs render
**Steps:** Navigate to any page. Observe the background.

**Expected:** Two soft gradient blobs are visible in the top-right and bottom-left areas. They use the current season's colors.

---

### TC-NAV-017 · Seasonal blobs visible in dark mode
**Steps:** Enable dark mode and navigate to any page.

**Expected:** Background blobs are still visible (adapted to dark palette).

---

### TC-NAV-018 · Season changes with calendar month
**Steps:** Check the season attribution by looking at the tiny emoji in the bottom-right corner of the screen.

**Expected:**
- Spring (Mar–May): 🌸
- Summer (Jun–Aug): ☀️
- Fall (Sep–Nov): 🍂
- Winter (Dec–Feb): ❄️

(Verify against current month.)
