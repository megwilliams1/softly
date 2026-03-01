# Softly — Project Wiki

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Routes & Pages](#3-routes--pages)
4. [Firestore Data Model](#4-firestore-data-model)
5. [Hook Reference](#5-hook-reference)
6. [Component Reference](#6-component-reference)
7. [Design System](#7-design-system)
8. [Authentication](#8-authentication)
9. [Environment Variables](#9-environment-variables)
10. [Development Workflow](#10-development-workflow)

---

## 1. Project Overview

**Softly** is a personal and family wellness planning app built for moms (and anyone managing a household). It lives at the intersection of emotional wellbeing and practical organization. It does not feel like a productivity app — it feels like a sanctuary.

**Core sections:**

| Section | Route | Purpose |
|---|---|---|
| The Garden | `/garden` | Family planning: meals, kids' activities, grocery list, personal goals |
| The Sanctuary | `/sanctuary` | Personal wellbeing: mood, gratitude, affirmations, self-care reminders, weekly summary |
| The Hearth | `/hearth` | Community recipe board — browse and share recipes |
| Weekly Reset | `/reset` | Guided 5-step Sunday ritual to close the week and open the next |
| Auth | `/` | Sign-in and sign-up. Redirects to `/garden` when already signed in. |

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom CSS variables |
| Icons | Lucide React |
| Auth | Firebase Authentication (email/password + Google OAuth) |
| Database | Cloud Firestore (real-time) |
| Fonts | Cormorant Garamond (display), DM Sans (body) — Google Fonts |
| Animations | Custom CSS keyframes (`animations.css`) |

**Key architectural decisions:**
- All pages are `"use client"` — no server components (real-time Firestore + auth state requires client-side rendering)
- No global state library — each page passes `uid` down to components; components own their Firestore subscriptions via hooks
- Seasonal themes and dark mode use CSS custom properties on `<html>` (`data-season`, `data-theme`) — no JS re-renders needed for theme changes
- FOUC prevention: an inline `<script>` in `layout.tsx` sets `data-theme` before hydration

---

## 3. Routes & Pages

### `/` — Auth Page
- **File:** `src/app/page.tsx`
- If user is already signed in → immediately redirects to `/garden`
- If not signed in → renders `<AuthPage />`

### `/garden` — The Garden
- **File:** `src/app/garden/page.tsx`
- **Guard:** `useRequireAuth()` — redirects to `/` if not signed in
- **Sections:** Meal Planner, Kids' Activities, Groceries & Errands, Your Plant (Goal)
- **Background:** `--color-mist`

### `/sanctuary` — The Sanctuary
- **File:** `src/app/sanctuary/page.tsx`
- **Guard:** `useRequireAuth()`
- **Sections (Sunday):** Weekly Garden Summary → Affirmation → Mood → Gratitude → Self-Care Reminders
- **Sections (other days):** Affirmation → Mood → Gratitude → Weekly Garden Summary → Self-Care Reminders
- **Background:** `--color-cream`

### `/hearth` — The Hearth
- **File:** `src/app/hearth/page.tsx`
- **Guard:** `useRequireAuth()`
- Anyone can browse. Must be signed in to submit.
- Real-time recipe feed from Firestore public `recipes` collection.

### `/reset` — Weekly Reset
- **File:** `src/app/reset/page.tsx`
- **Guard:** `useRequireAuth()`
- Hosts `<WeeklyReset />` — a 5-step guided flow
- If already completed this week, shows completion screen immediately

---

## 4. Firestore Data Model

All personal data is scoped under `users/{uid}/...`. Recipes are public.

```
users/{uid}/
  profile/                          ← single doc (displayName, email, photoURL, createdAt)
  meals/current                     ← single doc (7-day × 3-meal-time grid)
  checklist/current                 ← single doc ({ groceries: Item[], errands: Item[] })
  mood/current                      ← single doc (Record<YYYY-MM-DD, MoodKey>)
  gratitude/current                 ← single doc (Record<YYYY-MM-DD, [string, string, string]>)
  activities/{id}                   ← collection ({ childId, day, time, label })
  children/{id}                     ← collection ({ name, color })
  reminders/{id}                    ← collection ({ text, emoji, doneDate })
  goals/{id}                        ← collection ({ text, startDate, checkIns[], completed, createdAt })
  weeklyResets/{YYYY-MM-DD}         ← collection ({ weekMood, intention, completedAt })

recipes/{id}                        ← public collection
  { type, title, authorId, authorName, authorPhoto, url?, imageUrl?,
    ingredients?, instructions?, prepTime?, cookTime?, servings?, createdAt }

admins/{uid}                        ← admin identity collection ({ email })
```

**Single-doc pattern:** Used when data is always read/written as a whole unit and doesn't need to be queried individually (meals, checklist, mood, gratitude). `setDoc` with `{ merge: true }` for partial updates.

**Collection pattern:** Used when items are added/removed independently and may need individual queries (activities, children, reminders, goals, weeklyResets, recipes).

---

## 5. Hook Reference

All hooks live in `src/lib/hooks/`.

| Hook | Firestore path | Returns |
|---|---|---|
| `useAuth` | — (Firebase Auth) | `{ user, loading, signIn, signUpWithEmail, signInWithEmail, resetPassword, signOut }` |
| `useRequireAuth` | — | `{ user, loading }` — redirects to `/` if no user |
| `useMeals(uid)` | `users/{uid}/meals/current` | `{ meals, setMeal(day, time, value) }` |
| `useChecklist(uid)` | `users/{uid}/checklist/current` | `{ data, addItem, toggleItem, clearCompleted }` |
| `useActivities(uid)` | `users/{uid}/activities` | `{ activities, addActivity, updateActivity, deleteActivity }` |
| `useChildren(uid)` | `users/{uid}/children` | `{ children, addChild, removeChild }` |
| `useMood(uid)` | `users/{uid}/mood/current` | `{ todayMood, setMood }` |
| `useGratitude(uid)` | `users/{uid}/gratitude/current` | `{ todayEntry, yesterdayEntry, saveEntry }` |
| `useReminders(uid)` | `users/{uid}/reminders` | `{ reminders, addReminder, toggleDone, deleteReminder }` |
| `useGoals(uid)` | `users/{uid}/goals` | `{ activeGoal, archivedGoals, checkedInToday, addGoal, checkIn, completeGoal, deleteGoal }` |
| `useWeeklyReset(uid)` | `users/{uid}/weeklyResets` | `{ thisWeekDone, saveReset }` |
| `useWeeklySummary(uid)` | mood + gratitude + goals | `{ daysShown, gratitudeCount, dominantMood, summaryLines, isSunday }` |
| `useRecipes()` | `recipes` (public) | `{ recipes, loading, submitRecipe, deleteRecipe }` |
| `useTheme()` | localStorage | `{ theme, toggleTheme }` |
| `useSeason()` | — (date-based) | `Season` |

---

## 6. Component Reference

### Auth
| Component | Purpose |
|---|---|
| `auth/AuthPage` | Sign-in / sign-up form with Google option and forgot password flow |

### Layout
| Component | Purpose |
|---|---|
| `layout/Navbar` | Top nav — section links (auth-gated), dark mode toggle, Sunday reset prompt |
| `shared/SeasonalBackground` | Fixed decorative background blobs using seasonal CSS variables |

### Garden
| Component | Purpose |
|---|---|
| `garden/MealGrid` | 7×3 weekly meal planner grid |
| `garden/MealSlot` | Single meal cell — shows value or "+ Add meal" placeholder |
| `garden/MealModal` | Modal to add/edit/clear a meal |
| `garden/ActivityScheduler` | Kids' activity grid with child pills and per-day add buttons |
| `garden/ActivityModal` | Modal to add/edit an activity (child, day, time, label) |
| `garden/AddChildModal` | Modal to add a new child with name + color picker |
| `garden/Checklist` | Tabbed Groceries / Errands checklist with animated check-off |
| `garden/GoalCard` | Plant a Goal card — plant visual, check-in, archive |
| `garden/PlantStage` | Pure SVG plant in 5 growth stages (0–4) |
| `garden/PlantGoalModal` | Modal to set or edit a goal text |

### Sanctuary
| Component | Purpose |
|---|---|
| `sanctuary/DailyAffirmation` | Day-indexed affirmation with "another one" cycle button |
| `sanctuary/MoodCheckin` | 5-option mood picker with animated selection |
| `sanctuary/GratitudeJournal` | Three gratitude fields, today + yesterday panels |
| `sanctuary/SelfCareReminders` | Add/done/delete reminder cards |
| `sanctuary/WeeklyGardenSummary` | Weekly emotional summary card — mood-aware, week-seeded |

### Hearth
| Component | Purpose |
|---|---|
| `hearth/RecipeCard` | Recipe card with image, title, author avatar, timing chips |
| `hearth/RecipeDetailModal` | Full recipe detail modal — ingredients, instructions, external link |
| `hearth/SubmitRecipeModal` | Submit modal — linked vs. written recipe modes |
| `hearth/AuthButton` | Standalone auth UI (legacy, not currently used) |

### Reset
| Component | Purpose |
|---|---|
| `reset/WeeklyReset` | 5-step guided weekly reset flow with progress indicator |

---

## 7. Design System

All design tokens are CSS custom properties defined in `src/app/globals.css`.

### Colors

| Variable | Value | Usage |
|---|---|---|
| `--color-cream` | `#faf6f0` | Sanctuary background, card backgrounds |
| `--color-mist` | `#e8efe8` | Garden background |
| `--color-white` | `#ffffff` | Card backgrounds, modal panels |
| `--color-bloom-pink` | `#f2c4ce` | Selected states, mood picker, accents |
| `--color-sage` | `#a8b89a` | Primary action color, nav active state |
| `--color-butter` | `#f7e6b0` | Secondary accents, auth button, flower center |
| `--color-soil` | `#6b4f3a` | Headings, primary text |
| `--color-moss` | `#5c6b50` | Secondary text, nav icons |
| `--color-stone` | `#7a7068` | Tertiary text, labels |
| `--color-error` | `#e8a0a0` | Delete buttons, error states |

### Typography

| Variable | Font | Usage |
|---|---|---|
| `--font-display` | Cormorant Garamond | `h1`, `h2`, `h3`, card titles, affirmations |
| `--font-body` | DM Sans | All body text, labels, buttons |

### Border Radius

| Variable | Value |
|---|---|
| `--radius-sm` | `8px` |
| `--radius-md` | `14px` |
| `--radius-lg` | `20px` |
| `--radius-full` | `9999px` |

### Animations

| Class | Behavior |
|---|---|
| `animate-bloom-up` | Fade in + slide up 16px + scale from 0.97. Used on cards and modals entering. |
| `animate-bloom-pop` | Scale bounce 1→1.15→1. Used on check-off, mood select, goal complete. |
| `animate-petal-drift` | Fade in + slide down from -20px + rotate. Used on affirmation change. |
| `animate-soft-pulse` | Slow opacity pulse. Used on loading/ambient states. |
| `animate-fade-in` | Simple opacity 0→1. General transitions. |

### Seasonal Theming

The `<html>` element gets `data-season="spring|summer|fall|winter"` set at render time via `getSeason()`. CSS overrides `--color-seasonal-primary`, `--color-seasonal-secondary`, and `--color-seasonal-accent` per season. These are used in `SeasonalBackground` and the Navbar active-link highlight.

### Dark Mode

`[data-theme="dark"]` on `<html>` overrides all color variables to warm dark equivalents. Theme is persisted in `localStorage` under `softly:theme`. An inline script in `layout.tsx` reads this before hydration to prevent FOUC.

---

## 8. Authentication

Firebase Authentication handles all auth. Two providers are supported:

**Google OAuth:** `signInWithPopup` with `GoogleAuthProvider`. `displayName` and `photoURL` are populated automatically.

**Email/Password:** `createUserWithEmailAndPassword` for sign-up, then `updateProfile` to set `displayName`. `photoURL` is `null` until the user sets one via their account page.

**Auth flow:**
1. `/` renders `<AuthPage>` if not signed in
2. On successful auth, `router.replace("/garden")`
3. All protected pages call `useRequireAuth()` — if no user after loading resolves, redirects to `/`
4. Navbar hides section links when `user` is `null`

**Forgot password:** `sendPasswordResetEmail(auth, email)` — Firebase sends a reset link.

---

## 9. Environment Variables

All variables are prefixed `NEXT_PUBLIC_` (required for client-side Firebase access).

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

These live in `.env.local` (gitignored). In Vercel, set them under Project → Settings → Environment Variables.

---

## 10. Development Workflow

### Running the app
```bash
npm run dev
```
App runs at `http://localhost:3000`.

### Type checking
```bash
npx tsc --noEmit
```
Always run this before committing. (`npm run build` may fail on this machine due to OneDrive EPERM errors on `.next/` — `tsc --noEmit` is the reliable alternative.)

### Branching convention
```
main                          ← production branch
feature/ticket-XXX-description ← all feature work
```
All feature branches come off `main`. When done:
1. `git push -u origin feature/ticket-XXX-description`
2. Open PR on GitHub → base: `main`
3. Merge via GitHub UI
4. `git checkout main && git pull origin main` to stay current

### Ticket convention
- All tickets live in `docs/TICKETS.md`
- Format: `TICKET-XXX · Short Title`
- Each ticket has: Branch name, User Story, Background (if needed), Acceptance Criteria checklist
- New feature work always has a ticket before code is written

### File naming
- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utils: `camelCase.ts`
- Pages: `page.tsx` (Next.js App Router convention)
- All paths via `@/` alias pointing to `src/`
