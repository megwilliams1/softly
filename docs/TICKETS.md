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
