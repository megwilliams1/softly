# Softly — Development Tickets

All work is done on feature branches off `dev`. Branch naming: `feature/ticket-XXX-short-description`.

---

## Phase 1 — Foundation

---

### TICKET-001 · Initialize Next.js Project

**Branch:** `feature/ticket-001-init`

**User Story:**
As a developer, I want a clean Next.js 14 project with all required dependencies installed so that I have a working foundation to build on.

**Acceptance Criteria:**
- [ ] `npx create-next-app@latest` run with TypeScript, Tailwind, App Router, `src/` disabled
- [ ] `framer-motion`, `lucide-react` installed
- [ ] Default boilerplate (page content, globals) cleared out
- [ ] `npm run dev` starts with no errors

---

### TICKET-002 · Design System Foundation

**Branch:** `feature/ticket-002-design-system`

**User Story:**
As a developer, I want the full design system (colors, fonts, spacing, animations) set up as CSS variables and utility classes so that every component I build is on-brand without guesswork.

**Acceptance Criteria:**
- [ ] Google Fonts import added (Cormorant Garamond + DM Sans)
- [ ] All CSS color, radius, and shadow variables defined in `globals.css`
- [ ] Seasonal CSS attribute selectors defined (`[data-season="spring"]` etc.)
- [ ] `animations.css` created with all 5 keyframes and utility classes
- [ ] `animations.css` imported in `globals.css`
- [ ] Font variables applied to `body` / `html`

---

### TICKET-003 · Navbar with Section Toggle

**Branch:** `feature/ticket-003-navbar`

**User Story:**
As a user, I want a navigation bar at the top of the app so that I can easily switch between The Garden and The Sanctuary.

**Acceptance Criteria:**
- [ ] Navbar component renders on all pages via root layout
- [ ] "The Garden" and "The Sanctuary" links displayed
- [ ] Active section is visually highlighted (bloom-pink underline or pill)
- [ ] App name "softly" displayed in Cormorant Garamond
- [ ] Mobile: nav is touch-friendly and doesn't overflow
- [ ] Uses `lucide-react` icons alongside labels

---

### TICKET-004 · Seasonal Theme Hook

**Branch:** `feature/ticket-004-seasonal-theme`

**User Story:**
As a user, I want the app to automatically reflect the current season in its colors so that it feels alive and connected to the time of year.

**Acceptance Criteria:**
- [ ] `useSeason()` hook created in `lib/hooks/useSeason.ts`
- [ ] Hook detects month and returns `"spring" | "summer" | "fall" | "winter"`
- [ ] Root layout calls `useSeason()` and sets `data-season` attribute on `<html>`
- [ ] Seasonal CSS variables apply correctly in browser for current season
- [ ] A `SeasonalBackground` component exists for subtle decorative background tints

---

## Phase 2 — The Garden

---

### TICKET-005 · Meal Planner — Weekly Grid

**Branch:** `feature/ticket-005-meal-planner-grid`

**User Story:**
As a mom, I want to see a 7-day meal planner grid so that I can plan the family's meals for the entire week at a glance.

**Acceptance Criteria:**
- [ ] 7-column grid displays days Mon–Sun
- [ ] Each day shows slots for Breakfast, Lunch, Dinner
- [ ] Empty slots display a soft placeholder ("+ Add meal")
- [ ] Meals saved to `localStorage` key `softly:garden:meals`
- [ ] Grid is scrollable on mobile (horizontal scroll or stacked view)
- [ ] Uses Garden section colors (`--color-mist`, `--color-sage`)
- [ ] Cards use `animate-bloom-up` on initial render

---

### TICKET-006 · Meal Planner — Add/Edit Modal

**Branch:** `feature/ticket-006-meal-modal`

**User Story:**
As a mom, I want to add or edit a meal by tapping a slot so that I can fill in the planner quickly without leaving the page.

**Acceptance Criteria:**
- [ ] Tapping an empty slot opens a modal
- [ ] Tapping an existing meal opens the same modal pre-filled
- [ ] Modal has a text input for meal name
- [ ] Save button writes to `localStorage` and closes modal
- [ ] Delete/clear option on existing meals
- [ ] Modal uses `rounded-[20px]`, `--shadow-lift`, and entrance animation
- [ ] Closes on backdrop click or ESC key

---

### TICKET-007 · Kids Activity Scheduler

**Branch:** `feature/ticket-007-activity-scheduler`

**User Story:**
As a mom, I want to add and view each child's activities for the week, color-coded per child, so that I can keep everyone's schedules organized.

**Acceptance Criteria:**
- [ ] User can add children by name, each assigned a color
- [ ] Activities can be added per child with a day, time, and label
- [ ] Each child's activities show in their assigned color
- [ ] Activities are stored in `localStorage` key `softly:garden:activities`
- [ ] Adding/editing activities uses a modal (same pattern as meal modal)
- [ ] Children list stored in `softly:garden:children`

---

### TICKET-008 · Grocery & Errands Checklist

**Branch:** `feature/ticket-008-checklist`

**User Story:**
As a mom, I want a simple checklist for groceries and errands so that I can check things off as I go without losing track.

**Acceptance Criteria:**
- [ ] Two tabs or sections: "Groceries" and "Errands"
- [ ] User can add items to either list
- [ ] Tap to check off an item (visual strikethrough + opacity)
- [ ] Checked items move to the bottom or are visually de-emphasized
- [ ] "Clear completed" button removes checked items
- [ ] Data stored in `softly:garden:checklist`
- [ ] Uses `animate-bloom-pop` when an item is checked off

---

## Phase 3 — The Sanctuary

---

### TICKET-009 · Daily Mood Check-in

**Branch:** `feature/ticket-009-mood-checkin`

**User Story:**
As a mom, I want to log how I'm feeling today using a visual mood picker so that I can track my emotional wellbeing over time without it feeling clinical.

**Acceptance Criteria:**
- [ ] Visual mood picker with 5 options (e.g. radiant, content, okay, low, drained)
- [ ] Each mood has an icon/illustration and a warm label (not just a number)
- [ ] Selected mood is highlighted and saved
- [ ] Today's mood stored in `softly:sanctuary:mood` with date key
- [ ] If already checked in today, show the saved mood with option to update
- [ ] Uses Sanctuary colors (`--color-cream`, `--color-bloom-pink`)
- [ ] Selection triggers `animate-bloom-pop`

---

### TICKET-010 · Gratitude Journal

**Branch:** `feature/ticket-010-gratitude-journal`

**User Story:**
As a mom, I want to write three things I'm grateful for each day so that I build a positive mindset habit without it feeling like homework.

**Acceptance Criteria:**
- [ ] Three prompted input fields: "I'm grateful for..."
- [ ] Prompt text is soft and encouraging
- [ ] Entries are saved per day to `softly:sanctuary:gratitude`
- [ ] Past entries are accessible (at minimum yesterday's)
- [ ] Saving plays a gentle success animation
- [ ] Inputs styled with the standard Input pattern from design system

---

### TICKET-011 · Daily Affirmation

**Branch:** `feature/ticket-011-affirmation`

**User Story:**
As a mom, I want to see a beautiful daily affirmation when I open the Sanctuary so that I start my self-care time with something uplifting.

**Acceptance Criteria:**
- [ ] `data/affirmations.json` contains at least 30 curated affirmations
- [ ] One affirmation is shown per day (deterministic — same affirmation all day)
- [ ] Displayed in Cormorant Garamond, large and prominent
- [ ] Soft decorative element (flower emoji or SVG) flanks the text
- [ ] Uses `animate-petal-drift` on entry
- [ ] Optional: user can tap to get a new one (updates for the session only)

---

### TICKET-012 · Self-Care Reminders

**Branch:** `feature/ticket-012-selfcare-reminders`

**User Story:**
As a mom, I want to create personal self-care reminder cards so that I'm nudged toward small acts of care throughout the week.

**Acceptance Criteria:**
- [ ] User can add reminder cards (text + optional emoji)
- [ ] Cards displayed in a soft grid in the Sanctuary
- [ ] User can mark a reminder as "done for today"
- [ ] Done state resets daily
- [ ] User can delete reminders
- [ ] Data stored in `softly:sanctuary:reminders`
- [ ] Cards use `animate-bloom-up` with staggered delay

---

## Phase 4 — Weekly Reset Flow

---

### TICKET-013 · Weekly Reset Flow

**Branch:** `feature/ticket-013-weekly-reset`

**User Story:**
As a mom, I want a guided weekly reset experience every Sunday so that I can reflect on the past week, set intentions, and prepare for the week ahead — all in one soft, intentional flow.

**Acceptance Criteria:**
- [ ] Reset flow is accessible via `/reset` route and via a Sunday prompt
- [ ] Step 1: "How was your week?" — single word or mood selection
- [ ] Step 2: "Set your intention for this week" — short text input
- [ ] Step 3: Prompt to fill the meal planner (link/shortcut to meal grid)
- [ ] Step 4: Review/add kids' activities
- [ ] Step 5: Display a new affirmation for the week
- [ ] Progress through steps via "Next" / "Back" navigation
- [ ] On Sunday, a gentle prompt appears in the Navbar ("Time to reset 🌿")
- [ ] Completion triggers a celebration animation (`animate-bloom-pop`)
- [ ] Reset data stored in `softly:reset:history`

---

## Phase 5 — Polish

---

### TICKET-014 · Responsive Layout & Accessibility

**Branch:** `feature/ticket-014-polish`

**User Story:**
As a user on any device, I want the app to look and work beautifully on mobile and be accessible so that I can use it on my phone while in the kitchen.

**Acceptance Criteria:**
- [ ] All pages tested and working on 375px (iPhone SE) viewport
- [ ] No horizontal scroll on any mobile page
- [ ] All interactive elements have visible focus states
- [ ] Images/icons have `aria-label` or `alt` text where needed
- [ ] Loading states shown for any async operations
- [ ] Empty states have friendly, on-brand messages

---

## Phase 6 — Deploy

---

### TICKET-015 · Deploy to Vercel

**Branch:** `feature/ticket-015-deploy`

**User Story:**
As a user, I want the app live on the internet so that I can access it from any device.

**Acceptance Criteria:**
- [ ] Repository pushed to GitHub (`main` branch)
- [ ] Project connected to Vercel
- [ ] Production build passes (`npm run build` with zero errors)
- [ ] Live URL tested on mobile browser
- [ ] Environment is clean (no console errors on production build)

---

## Phase 7 — Enhancements

---

### TICKET-016 · Dark Mode Toggle

**Branch:** `feature/ticket-016-dark-mode`

**User Story:**
As a user, I want to switch the app to a dark, warm theme so that I can use it comfortably at night without harsh light.

**Acceptance Criteria:**
- [ ] Dark mode CSS variables defined under `[data-theme="dark"]` on `<html>`
- [ ] Dark palette is warm and cozy — dark browns, not harsh blacks
- [ ] A sun/moon toggle button lives in the Navbar
- [ ] Theme preference persisted in `localStorage` under `softly:theme`
- [ ] No flash of unstyled content on page load (inline script sets theme before hydration)
- [ ] All pages look correct in both light and dark mode
- [ ] Seasonal background blobs visible in dark mode

---

## Phase 8 — Community

---

### TICKET-017 · The Hearth — Public Recipe Forum

**Branch:** `feature/ticket-017-the-hearth`

**User Story:**
As a user, I want to browse and share recipes with the Softly community so that I can discover new meal ideas and contribute my own favorites.

**Acceptance Criteria:**
- [ ] New `/hearth` route exists and loads correctly
- [ ] "The Hearth" with Flame icon added to Navbar, active state works
- [ ] Anyone can browse recipes without signing in
- [ ] Google sign-in (Firebase Auth) required to post
- [ ] "Link a recipe" mode: title, URL, optional image URL
- [ ] "Write my own" mode: title, ingredients, instructions, prep/cook time, servings, optional image URL
- [ ] Recipe cards display in a responsive grid with image, title, author avatar
- [ ] Clicking a card opens a detail modal (full recipe or link-out for linked type)
- [ ] Author can delete their own recipes; others cannot
- [ ] Real-time updates: new recipes appear without page refresh
- [ ] Firestore security rules: public read, auth-required write, owner-only delete
- [ ] All components match existing design system (CSS variables, animations, modal pattern)
- [ ] Dark mode compatible
- [ ] Mobile responsive (375px+)

---

## Phase 9 — Auth & Cloud Sync

### TICKET-018 · Full Authentication + Firestore Migration

**Branch:** `feature/ticket-018-auth-and-firestore`

**User Story:**
As a user, I want to sign in to Softly so that my data is saved to the cloud and available on any device.

**Acceptance Criteria:**
- [ ] Home page `/` is a sign-in / sign-up page
- [ ] Sign-up: display name, email, password, confirm password
- [ ] Sign-in: email + password, forgot password link
- [ ] Google sign-in available on both forms
- [ ] All protected pages redirect to `/` if not signed in
- [ ] Navbar hides Garden/Sanctuary/Hearth/Reset links when signed out
- [ ] All personal data (meals, activities, children, checklist, mood, gratitude, reminders, weekly reset) stored in Firestore per user
- [ ] Data syncs across devices when signed in to same account
- [ ] Firestore security rules protect all user data

---

## Phase 10 — Emotional Core

---

### TICKET-019 · Plant a Goal

**Branch:** `feature/ticket-019-plant-a-goal`

**User Story:**
As a user, I want to plant a personal goal and watch it grow into a flower over time so that I feel motivated to show up consistently and have something beautiful to tend.

**Background:**
Each day the user checks in on their goal, the plant advances through a growth stage. The visual — from a tiny seed to a full bloom — mirrors their real effort. It lives in The Garden as its own card, small and intentional. It is not gamified. It is just honest.

**Growth Stages (based on total check-in days):**
- **0 days** — Seed (just planted, a small mound of soil)
- **1–2 days** — Sprout (a tiny green curl pushing up)
- **3–5 days** — Seedling (a stem with two small leaves)
- **6–10 days** — Growing (fuller plant, reaching upward)
- **11+ days** — Full Bloom (flowering, complete)

**Acceptance Criteria:**
- [ ] User can create a goal with a short intention (e.g. "drink more water", "walk daily")
- [ ] One active goal at a time; completed goals are archived
- [ ] A "Check in today" button appears once per day; after checking in, it shows a confirmation
- [ ] Plant visual advances through 5 growth stages based on total check-in count
- [ ] Plant is rendered as inline SVG or CSS-animated component (no external images)
- [ ] Goal card lives in `/garden` below the meal grid
- [ ] Completing a goal (user marks it done) triggers `animate-bloom-pop` celebration
- [ ] Archived goals are viewable in a simple list ("past gardens")
- [ ] Firestore path: `users/{uid}/goals/{id}` with fields: `text`, `startDate`, `checkIns` (string[] of date keys), `completed`, `createdAt`
- [ ] New hook: `src/lib/hooks/useGoals.ts` — CRUD + check-in logic
- [ ] New components:
  - `src/components/garden/PlantStage.tsx` — SVG plant that accepts a `stage: 0–4` prop
  - `src/components/garden/GoalCard.tsx` — full card: plant visual + goal text + check-in button
  - `src/components/garden/PlantGoalModal.tsx` — modal to set/edit goal text
- [ ] Uses existing design system CSS variables and modal pattern
- [ ] Mobile responsive (375px+)
- [ ] Dark mode compatible

---

### TICKET-020 · Mood + Weekly Garden Health Summary

**Branch:** `feature/ticket-020-weekly-garden-summary`

**User Story:**
As a user, I want to receive a warm, personal summary of my week every Sunday so that I feel seen, validated, and emotionally grounded — not just organized.

**Background:**
This is the emotional glue of Softly. Not a dashboard. Not metrics. A letter from your garden back to you.

The summary reads like this:

> 🌿 This week your garden felt steady.
> You showed up 4 days.
> You logged 9 gratitudes.
> You handled more than you realized.

The language is procedurally generated from real data but always feels human. Different moods, different show-up counts, different gratitude counts produce different messages. The tone never judges. It always witnesses.

**Presence Tracking:**
To count "days shown up," write a lightweight presence doc to Firestore any time the user logs a mood, saves a gratitude, or checks in on a goal. Path: `users/{uid}/presences/{YYYY-MM-DD}`.

**Summary Data Sources (past 7 days):**
- Mood entries → dominant mood + consistency
- Gratitude entries → total entries logged
- Presence docs → days shown up count
- Goal check-ins (if TICKET-019 is complete) → optional mention

**Message Template System:**
- `src/lib/utils/summaryMessages.ts` — pure functions that accept `{ daysShown, gratitudeCount, dominantMood }` and return a 3–4 line summary string
- At minimum 4 message variants per "show-up tier" (0–1 days, 2–3 days, 4–5 days, 6–7 days)
- Mood-aware: if dominant mood was "low" or "drained," the message is gentler and more validating; if "radiant," it celebrates

**Acceptance Criteria:**
- [ ] Presence doc written to Firestore on: mood save, gratitude save, goal check-in
- [ ] New hook: `src/lib/hooks/useWeeklySummary.ts` — collects last 7 days of presence, mood, gratitude data and returns `{ daysShown, gratitudeCount, dominantMood, summaryText }`
- [ ] `summaryMessages.ts` utility with tiered, mood-aware message templates (warm, plain-English, no emojis in the generated text itself — only the garden icon above)
- [ ] New component: `src/components/sanctuary/WeeklyGardenSummary.tsx` — renders the summary card with a 🌿 icon, the generated message, and a soft closing line
- [ ] Summary card appears in `/sanctuary` every day (past 7 days data is always valid)
- [ ] On Sundays specifically, the summary is surfaced prominently — as the first card in `/sanctuary` above MoodCheckin
- [ ] Summary card uses `animate-bloom-up` on entry
- [ ] Summary card is not dismissible (it is always there as a reflection)
- [ ] Uses existing design system CSS variables (`--color-cream`, `--color-bloom-pink`, `--font-display`)
- [ ] Mobile responsive (375px+)
- [ ] Dark mode compatible

---

## Phase 11 — Documentation & Quality

---

### TICKET-021 · Wiki & QA Documentation

**Branch:** `feature/ticket-021-wiki-and-qa`

**User Story:**
As a developer (and anyone who joins the project), I want a complete wiki and QA test case library so that I always know how the app works and how to verify it works correctly.

**Acceptance Criteria:**
- [ ] `docs/WIKI.md` created — covers project overview, stack, routes, Firestore data model, hook reference, design system, and dev workflow
- [ ] `qa/` directory created at project root
- [ ] `qa/README.md` — overview of QA process and test suite structure
- [ ] `qa/auth.md` — test cases for sign-up, sign-in, Google auth, forgot password, sign-out, auth guards
- [ ] `qa/garden.md` — test cases for Meal Planner, Activity Scheduler, Checklist, Plant a Goal
- [ ] `qa/sanctuary.md` — test cases for Mood Check-in, Gratitude Journal, Daily Affirmation, Self-Care Reminders, Weekly Garden Summary
- [ ] `qa/hearth.md` — test cases for browsing recipes, submitting (linked + written), recipe detail, delete, auth gate
- [ ] `qa/reset.md` — test cases for Weekly Reset 5-step flow, completion state, repeat visit
- [ ] `qa/navigation.md` — test cases for Navbar auth state, active links, Sunday prompt, dark mode toggle, mobile layout

---

## Phase 12 — Fixes & Enhancements

---

### TICKET-022 · Admin Panel

**Branch:** `feature/ticket-022-admin-panel`

**User Story:**
As an admin, I want a protected admin panel where I can view all user accounts and clear a user's data if something goes wrong, so that I can maintain the health of the app without needing to go into the Firebase console for every issue.

**Background:**
Admin identity is stored in Firestore under `admins/{uid}`. When a user signs up, their profile is written to `users/{uid}/profile`. The admin panel reads from these profile docs. Actual Firebase Auth account deletion requires the Admin SDK — this panel handles data-level operations and links out to Firebase console for Auth-level actions.

**Acceptance Criteria:**
- [ ] `useAuth` writes a profile doc to `users/{uid}/profile` on sign-up (displayName, email, photoURL, createdAt)
- [ ] Firestore `admins/{uid}` collection used to identify admins (manually seeded in Firebase console)
- [ ] New hook `useIsAdmin(uid)` — checks if `admins/{uid}` doc exists, returns `isAdmin: boolean`
- [ ] New route `/admin` — redirects to `/garden` if not signed in or not admin
- [ ] Admin page shows a list of all user profiles (from `users/{uid}/profile` docs)
- [ ] Each row shows: avatar, display name, email, joined date, and a "Clear data" button
- [ ] "Clear data" deletes the user's personal Firestore subcollections but does NOT delete their Auth account
- [ ] A confirmation dialog appears before any destructive action
- [ ] A note on the page links to Firebase console for Auth account deletion
- [ ] Navbar shows an "Admin" link only when `isAdmin` is true
- [ ] Firestore security rules updated accordingly
- [ ] Mobile responsive, dark mode compatible

---

### TICKET-023 · Email User Avatar + Display Name on Recipe Cards

**Branch:** `feature/ticket-023-email-user-display`

**User Story:**
As a user who signed up with email, I want my name and an avatar to appear on recipes I share, just like Google sign-in users get their Google photo and name, so that my contributions feel personal and attributed correctly.

**Background:**
Google sign-in users automatically have `user.displayName` and `user.photoURL` populated. Email sign-up users have `user.displayName` set but `user.photoURL` is null. `RecipeCard` and `RecipeDetailModal` render `authorPhoto` directly as an `<img>` src — if that's null, the avatar breaks.

**Acceptance Criteria:**
- [ ] A shared `<UserAvatar>` component created at `src/components/shared/UserAvatar.tsx`
  - Props: `photoURL: string | null`, `displayName: string | null`, `size?: number`
  - If `photoURL` present: renders circular `<img>`
  - If not: renders a circle with initials (first + last initial), `--color-sage` background, `--color-white` text
- [ ] `RecipeCard` updated to use `<UserAvatar>` instead of a raw `<img>`
- [ ] `RecipeDetailModal` updated to use `<UserAvatar>` for the author line
- [ ] `<UserAvatar>` is reusable for Navbar (TICKET-025) and Account page (TICKET-024)
- [ ] Existing Google sign-in recipe cards unaffected
- [ ] Dark mode compatible

---

### TICKET-024 · Account / Profile Page

**Branch:** `feature/ticket-024-account-page`

**User Story:**
As a user, I want an account page where I can see my profile info and update my display name and profile photo URL so that my identity feels personal across the app.

**Acceptance Criteria:**
- [ ] New protected route `/account` using `useRequireAuth`
- [ ] Page shows current avatar (`<UserAvatar>`), display name, and email (read-only)
- [ ] User can edit their display name (calls Firebase `updateProfile`)
- [ ] User can enter a photo URL (calls Firebase `updateProfile` with `photoURL`)
- [ ] Save button disabled until a change is made; shows "Saving..." while pending
- [ ] Success confirmation: "Profile updated." shown for 3 seconds
- [ ] "Change password" section sends reset email via `sendPasswordResetEmail`; hidden for Google sign-in users
- [ ] Page updates `users/{uid}/profile` in Firestore to stay in sync
- [ ] Uses `--color-cream` background, matches Sanctuary palette
- [ ] Mobile responsive, dark mode compatible

---

### TICKET-025 · Show Signed-In User in Navbar

**Branch:** `feature/ticket-025-nav-user`

**User Story:**
As a signed-in user, I want to see my avatar and name in the navigation bar so that I always know whose account I'm in and can quickly access my profile.

**Acceptance Criteria:**
- [ ] When signed in, Navbar shows `<UserAvatar>` at the right end of the nav bar
- [ ] Display name shown beside the avatar (truncated if long) — hidden on very small screens
- [ ] Clicking the avatar or name navigates to `/account`
- [ ] Initials fallback works for email users with no photo (uses `<UserAvatar>`)
- [ ] Signed-out state unchanged
- [ ] Does not crowd existing nav links on mobile
- [ ] Dark mode compatible

---

### TICKET-026 · Edit Child

**Branch:** `feature/ticket-026-edit-child`

**User Story:**
As a user, I want to edit a child's name or color after adding them so that I can fix mistakes without deleting and re-adding them (which would lose all their activities).

**Background:**
`useChildren` currently only has `addChild` and `removeChild`. There is no `updateChild`. Child pills in `ActivityScheduler` have no edit affordance.

**Acceptance Criteria:**
- [ ] `useChildren` gains `updateChild(id, updates: Partial<{name, color}>)` that calls `updateDoc`
- [ ] Each child pill in `ActivityScheduler` shows a small Lucide `Pencil` icon (12px) on hover
- [ ] Clicking the pencil opens an edit modal pre-filled with current name and color
- [ ] Edit modal has "Save changes" button and a "Remove child" button
- [ ] Taken colors exclude all children except the one being edited
- [ ] Existing activities for a removed child are orphaned (not deleted) — acceptable for now
- [ ] Mobile responsive, dark mode compatible

---

### TICKET-027 · "Another One" → Styled CTA Button

**Branch:** `feature/ticket-027-affirmation-cta`

**User Story:**
As a user reading my daily affirmation, I want the option to see another affirmation to be clearly presented as a real button so that I notice it and feel invited to use it.

**Background:**
In `DailyAffirmation.tsx`, the button that cycles affirmations renders as unstyled lowercase text `"another one"`. It is invisible to most users.

**Acceptance Criteria:**
- [ ] `"another one"` button replaced with a styled pill button reading `"Show me another"`
- [ ] Style: outlined pill, `border: 1.5px solid var(--color-sage)`, transparent background, `--color-moss` text, `--radius-full`
- [ ] Hover: subtle sage fill (`rgba(168, 184, 154, 0.15)`)
- [ ] `animate-bloom-pop` on click (brief scale pulse via class toggle with timeout)
- [ ] Existing cycling behavior unchanged
- [ ] Dark mode compatible
