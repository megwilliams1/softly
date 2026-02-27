# softly

A mom's weekly companion app. Softly is split into two halves: **The Garden** for family planning and **The Sanctuary** for personal self-care.

Built with love, designed to feel calm and intentional.

---

## Features

### 🌿 The Garden
- **Meal Planner** — 7-day weekly grid with add/edit modal, saved to localStorage
- **Kids' Activities** — Color-coded activity scheduler per child with a weekly grid
- **Groceries & Errands** — Tabbed checklist with check-off and clear completed

### 🌸 The Sanctuary
- **Daily Affirmation** — A new curated affirmation each day, tap for another
- **Mood Check-in** — 5 warm mood options to log how you're feeling today
- **Gratitude Journal** — Three prompted entries per day with yesterday's history
- **Self-Care Reminders** — Personal reminder cards that reset daily

### ✨ Extra
- **Weekly Reset** — A guided 5-step Sunday flow to reflect and set intentions
- **Seasonal Theming** — Colors shift automatically with the current season
- **Dark Mode** — Warm dark palette, toggled from the navbar, no flash on load
- **Fully responsive** — Works on mobile and desktop

---

## Tech Stack

- [Next.js 14](https://nextjs.org) (App Router)
- [React 18](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev)
- localStorage (MVP data persistence)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── garden/        # The Garden page
│   ├── sanctuary/     # The Sanctuary page
│   ├── reset/         # Weekly Reset flow
│   ├── globals.css    # Design system, seasonal + dark mode variables
│   └── layout.tsx     # Root layout with Navbar and SeasonalBackground
├── components/
│   ├── garden/        # Meal grid, activity scheduler, checklist
│   ├── sanctuary/     # Affirmation, mood, gratitude, reminders
│   ├── reset/         # Weekly reset flow
│   ├── layout/        # Navbar
│   └── shared/        # SeasonalBackground
├── lib/
│   └── hooks/         # useMeals, useChildren, useActivities, useMood,
│                      # useGratitude, useReminders, useWeeklyReset, useTheme
└── data/
    └── affirmations.json
```

---

## Design System

- **Display font:** Cormorant Garamond
- **Body font:** DM Sans
- **Palette:** Warm creams, sage greens, bloom pinks, earthy browns
- **Seasonal colors:** Spring 🌸 · Summer ☀️ · Fall 🍂 · Winter ❄️
- **Dark mode:** Warm dark browns, not harsh blacks

---

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` trigger automatic redeployment.
