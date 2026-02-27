# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Softly** is a mom's weekly companion app built with Next.js 14. It has two equal halves:
- **The Garden** — family planning (meals, kids' activities, errands)
- **The Sanctuary** — personal self-care (mood, gratitude, affirmations)

MVP stores all data in `localStorage`. No auth, no backend — just the browser.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| React 18 + TypeScript | UI |
| Tailwind CSS | Styling |
| Framer Motion | Bloom/grow animations |
| lucide-react | Icons |
| localStorage | Data persistence (MVP) |

---

## Commands

Once the project is initialized:

```bash
npm run dev       # start dev server at localhost:3000
npm run build     # production build
npm run lint      # ESLint
npm run type-check  # tsc --noEmit
```

---

## Folder Structure

```
app/
  layout.tsx           # root layout — sets data-season on <html>
  page.tsx             # home → redirects or shows dashboard
  garden/
    page.tsx           # The Garden section
  sanctuary/
    page.tsx           # The Sanctuary section
  reset/
    page.tsx           # Weekly reset flow (Sundays)

components/
  layout/
    Navbar.tsx         # Garden / Sanctuary toggle nav
  garden/
    MealPlanner.tsx
    ActivityScheduler.tsx
    Checklist.tsx
  sanctuary/
    MoodCheckin.tsx
    GratitudeJournal.tsx
    Affirmation.tsx
    SelfCareReminders.tsx
  shared/
    Card.tsx
    Button.tsx
    Modal.tsx
    SeasonalBackground.tsx

lib/
  hooks/
    useSeason.ts       # detects current season, sets data-season on <html>
    useLocalStorage.ts # typed wrapper around localStorage
  utils/
    dates.ts

data/
  affirmations.json    # curated list of daily affirmations

styles/
  globals.css          # CSS variables (colors, radii, shadows, fonts)
  animations.css       # bloom-up, soft-pulse, petal-drift, bloom-pop, fade-in
```

---

## Design System

All design tokens are CSS variables defined in `styles/globals.css`. **Do not hardcode colors or shadows — always use variables.**

### Key Colors

```css
--color-cream        /* main background */
--color-mist         /* section backgrounds */
--color-bloom-pink   /* primary accent */
--color-sage         /* secondary accent */
--color-soil         /* headings */
--color-moss         /* body text */
--color-pebble       /* borders (use at 30% opacity) */
```

### Seasonal Theming

`useSeason()` detects the month and sets `data-season="spring|summer|fall|winter"` on `<html>`. Seasonal accent colors are applied via CSS attribute selectors. This runs once in the root layout.

| Season | Months | Primary |
|---|---|---|
| spring | Mar–May | blush pink |
| summer | Jun–Aug | golden yellow |
| fall | Sep–Nov | terracotta |
| winter | Dec–Feb | dusty blue |

### Typography

- **Cormorant Garamond** — headings only (H1–H3), display moments
- **DM Sans** — everything else (body, buttons, nav, labels)
- Never go below `0.8rem`

### Component Patterns (Tailwind)

```
Card:           bg-white rounded-[14px] p-5 shadow-[var(--shadow-card)] border border-[var(--color-pebble)]/30
Primary Button: bg-[var(--color-bloom-pink)] text-[var(--color-soil)] font-medium rounded-full px-6 py-2.5 hover:bg-[var(--color-blush-deep)] transition-all duration-200
Ghost Button:   border border-[var(--color-pebble)] text-[var(--color-moss)] rounded-full px-6 py-2.5 hover:bg-[var(--color-mist)] transition-all duration-200
Input:          w-full bg-[var(--color-cream)] border border-[var(--color-pebble)] rounded-lg px-4 py-2.5 text-[var(--color-shadow)] focus:outline-none focus:border-[var(--color-sage)] transition-colors duration-200
Badge/Chip:     bg-[var(--color-mist)] text-[var(--color-moss)] text-xs font-medium rounded-full px-3 py-1
```

### Animations

Defined in `styles/animations.css`. Apply via utility class (e.g. `animate-bloom-up`).

- `animate-bloom-up` — cards/content entering (0.4s ease-out)
- `animate-soft-pulse` — reminders/highlights (2.5s loop)
- `animate-petal-drift` — decorative elements drifting in
- `animate-bloom-pop` — task completion celebration
- `animate-fade-in` — gentle fade (0.3s)

For staggered list entry: `style={{ animationDelay: \`${index * 80}ms\` }}`

Hover transitions: `transition-all duration-200`. Never animate color changes directly.

### Section Visual Identity

| Section | Background | Accent | Feel |
|---|---|---|---|
| The Garden | `--color-mist` | `--color-sage` | grounded, organized |
| The Sanctuary | `--color-cream` | `--color-bloom-pink` | soft, intimate |

### Icons

Use `lucide-react` only.
- Nav icons: `size={20}`
- In-card icons: `size={16}`
- Decorative/hero icons: `size={28}`

---

## Git Branching Strategy

- `main` — production-ready, deploys to Vercel
- `dev` — integration branch; all feature branches merge here first
- Feature branches: `feature/ticket-XXX-short-description`
- When a ticket is done: open PR from `feature/...` → `dev`, then `dev` → `main` for releases

---

## Data Persistence

All data is stored in `localStorage` via the typed `useLocalStorage` hook. Keys follow the pattern `softly:garden:meals`, `softly:sanctuary:mood`, etc. No backend in MVP.
