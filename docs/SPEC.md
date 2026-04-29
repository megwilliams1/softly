# Softly — Project Spec

## What It Is

Softly is a weekly companion app built for moms. It combines family planning and personal self-care in one calm, beautiful space. The visual metaphor is a living garden — seasonal, alive, and rewarding to use.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15, App Router |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties (design tokens) |
| Animation | Framer Motion (page transitions, micro-animations) |
| Auth | Firebase Auth (Google sign-in) |
| Database | Cloud Firestore (per-user subcollections) |
| Hosting | Firebase App Hosting |
| Containers | Docker + docker-compose |
| PWA | manifest.json, maskable icons, standalone display |

---

## Pages & Sections

### Home `/home`
The daily dashboard. Pulls real data from every section.

- Personalized time-of-day greeting
- Tonight's dinner preview (from meal planner)
- Today's kids' activities (up to 2, sorted by time)
- Today's affirmation
- Mood status badge (from Sanctuary)
- Plant goal progress card with inline daily check-in button
- Shopping + errands list preview (first 6 items)
- Weekly stats tile (days tended, gratitude count, weekly headline)
- Welcome modal on first visit (localStorage flag)
- Tile grid links to Garden, Sanctuary, Grove, Hearth, Reset

---

### The Garden `/garden`
Family planning tools.

**Meal Planner**
- 7-day grid (Sun–Sat), 3 meal slots per day (breakfast, lunch, dinner)
- MealModal to add/edit/delete meals
- `+ Add meal` button scrolls to grid and opens today's dinner slot directly

**Kids' Activity Scheduler**
- Per-child color-coded activities
- Add/edit/delete children (AddChildModal, EditChildModal)
- Add/edit/delete activities with day + time (ActivityModal)

**Grocery & Errands Checklist**
- Two separate lists: Groceries and Errands
- Add, check off, and delete items
- Preview on home dashboard

**Plant Goal Tracker**
- One active 21-day goal at a time
- 5 growth stages (🌰 → 🌱 → 🌿 → 🌺 → 🌸) based on check-in count
- Animated plant emoji and dot tracker (Framer Motion)
- Daily check-in button; progress bar
- PlantGoalModal to set or change goal

---

### The Sanctuary `/sanctuary`
Personal self-care space.

- **Mood check-in** — 5 visual options: Radiant / Content / Okay / Low / Drained
- **Gratitude journal** — 3 prompts per day, saves to Firestore
- **Daily affirmation** — rotates from a curated list keyed to day of year
- **Self-care reminders** — user sets their own recurring reminders
- **Weekly garden summary** — mood pattern + gratitude stats for the last 7 days

---

### Reflection Grove `/grove`
A quiet journaling and reflection space. Mood-gated (must check in first).

- **Daily journal** — free-write reflection entry
- **Past entries** — browse previous journal entries
- **Storm tracker** — log difficult days/emotions separately
- **Future notes** — write a letter to your future self with a delivery date; DueNotesBanner alerts when one is ready
- **Tiny wins vault** — collect small daily victories
- **Soft reset** — shown after saving a journal entry, encourages a moment of pause
- Ambient mood particles (GroveParticles, mood-responsive)

---

### The Hearth `/hearth`
Community recipe collection (shared across all users).

- Recipe card grid with category filter pills (All / Breakfast / Lunch / Dinner / Dessert / Snack / Drinks / Other)
- Submit recipe modal (any authenticated user)
- Recipe detail modal (ingredients, instructions, author)
- Edit recipe modal (author or admin only)
- Delete recipe (admin only)

---

### Weekly Reset `/reset`
A 5-step guided reflection flow, available any day of the week.

1. **How was your week?** — 6 mood options or write your own
2. **Set your intention** — one word or sentence for the week ahead
3. **Plan your meals** — links to Garden meal planner
4. **Review activities** — links to Garden activity scheduler
5. **Weekly affirmation** — rotating from curated list by week number

Saves week mood + intention to Firestore once per week. Completion state persists.

---

### Account `/account`
- Display name, email, profile photo
- Image upload for avatar
- Current season display (auto-detected)
- Dark / light mode toggle

---

### Admin `/admin`
Role-gated (Firestore `admins` collection).

- View all user profiles
- Clear individual user data
- Edit or delete any recipe in The Hearth

---

## Shared Systems

### Theming
- **Seasonal** — spring / summer / fall / winter, auto-detected from date
- **Dark mode** — `data-theme="dark"` on `<html>`, toggled via useTheme
- All colors via CSS custom properties (`var(--color-*)`)
- Seasonal particles render app-wide via SeasonalBackground (🌸 🍂 ❄️ ✨)

### Navigation
- **Desktop**: collapsible sidebar with nav links, user avatar, theme toggle, admin link
- **Mobile**: bottom tab bar (Home, Garden, Sanctuary, Hearth, Grove, Account)

### Auth
- Google sign-in only
- `useRequireAuth` redirects unauthenticated users to landing page
- In-app browser detection + warning (Instagram, Facebook WebView)

### Loading States
- `PageSkeleton` shimmer on every page while auth resolves
- Page transitions via Framer Motion `AnimatePresence` in ClientLayout

### Data
- All user data in Firestore: `/users/{uid}/meals`, `/users/{uid}/activities`, `/users/{uid}/goals`, etc.
- Recipes shared at `/recipes`
- Per-user data is locked via Firestore security rules
- `useWeeklySummary` aggregates last 7 days of mood + gratitude for stats

---

## Recently Shipped

- **Reminder notifications** — optional time field per reminder, browser notification fires at that time while the app is open
- **Due future note alerts on Home** — DueNotesBanner surfaces on dashboard, not just in Grove
- **Weekly Reset deep links** — steps 3/4 jump directly to `/garden#meals` and `/garden#activities`
- **Recipe image uploads** — ImagePicker + Firebase Storage upload in SubmitRecipeModal, OG image auto-fetch for linked recipes
- **Offline support** — Firestore IndexedDB persistence (reads/writes queue offline), service worker caches app shell
- **Weekly summary export** — "Share this week" button on home tile; Web Share API on mobile, clipboard copy on desktop
- **Insights dashboard** — "Your Patterns" in Sanctuary: 28-day mood calendar, streak counter, gratitude count, mood breakdown bars

## What's Next

- **True background push notifications** — current reminders only fire while the app tab is open. Real scheduled push (when app is closed) needs Firebase Cloud Messaging + a Firebase Function to trigger at the right time
- **Recipe search** — the Hearth has no search, only category filters; full-text search across titles would help as the collection grows
- **Past weekly resets** — users can't look back at previous intentions/moods they saved during Weekly Reset
- **Grove journal search** — no way to search or filter past journal entries
- **Meal planner history** — meals reset each week; there's no way to copy a previous week or see what was planned before
