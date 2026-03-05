# Softly — QA Documentation

This directory contains manual test cases for every feature in Softly. All test cases are written for manual verification — no automated test runner is required.

---

## How to Use This Document

1. Before merging any feature branch, run through the relevant test file(s)
2. Check off each passing test case
3. If a test fails, open a bug ticket before merging
4. After a deploy, run the full suite on production

---

## Test Files

| File | Coverage |
|---|---|
| `auth.md` | Sign-up, sign-in, Google auth, forgot password, sign-out, auth guards |
| `garden.md` | Meal Planner, Kids' Activities (incl. multi-kid), Checklist/Shopping, Plant a Goal |
| `sanctuary.md` | Mood Check-in, Gratitude Journal, Daily Affirmation, Self-Care Reminders, Weekly Summary |
| `hearth.md` | Browse recipes, submit recipe (linked + written), recipe detail, delete, auth gate |
| `reset.md` | Weekly Reset 5-step flow, completion state, revisit |
| `navigation.md` | Navbar auth state, active links, Sunday prompt, dark mode toggle, mobile layout |
| `grove.md` | MoodGate, Journal Editor, Soft Reset, Past Entries, Storm Tracker, Future Notes, Tiny Wins, dark mode, mobile |

---

## Test Environment Setup

- Use a test Firebase account (not your personal one) for destructive tests
- Test on desktop (Chrome) and mobile (375px viewport via DevTools)
- Test in both light mode and dark mode
- Test on a Sunday and a non-Sunday (or mock the date in DevTools if needed)
- Clear Firestore test data between full suite runs

---

## Severity Levels

| Level | Meaning |
|---|---|
| **Critical** | App is broken or data is lost — block merge |
| **Major** | Feature doesn't work as expected — fix before merge |
| **Minor** | Visual or UX issue — fix before next release |
| **Cosmetic** | Small polish issue — can be deferred |
