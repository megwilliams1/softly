# 🌿 Softly

> A quiet little garden for your life.

Softly is a calm, garden-themed family planning app for moms. It combines scheduling, meal planning, journaling, and emotional wellness in one soft, intentional space.

---

## Features

### 🌿 The Garden
- **Meal Planner** — 7-day weekly grid with add/edit modal
- **Kids' Activities** — Color-coded activity scheduler per child
- **Groceries & Errands** — Tabbed checklist with check-off and clear completed

### 🌸 The Sanctuary
- **Daily Affirmation** — A new curated affirmation each day
- **Mood Check-in** — Warm mood options to log how you're feeling
- **Gratitude Journal** — Three prompted entries per day
- **Self-Care Reminders** — Personal reminder cards

### 🔥 The Hearth
- **Recipe Collection** — Share, browse, and save recipes by category
- **Admin Controls** — Admins can edit or delete any recipe

### 🌸 Reflection Grove
- **Journaling** — Free-form journal entries
- **Tiny Wins** — Celebrate small daily victories
- **Future Notes** — Leave notes for your future self

### ✨ Extra
- **Weekly Reset** — A guided Sunday flow to reflect and set intentions
- **Seasonal Theming** — Colors and particles shift automatically with the season
- **Splash Screen** — A calm branded entry experience on every new session
- **Dark Mode** — Warm dark palette, toggled from the navbar
- **Fully responsive** — Works on mobile and desktop

---

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Firebase](https://firebase.google.com) (Auth, Firestore, Storage)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide React](https://lucide.dev)
- Hosted on [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

---

## Getting Started (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/megwilliams1/softly.git
cd softly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_UIDS=uid1,uid2
```

> Find these values in Firebase Console → Project Settings → Your Apps.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Running with Docker

Docker gives every developer a consistent environment regardless of their machine setup.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### 1. Set up your environment variables

Create a `.env.local` file with your Firebase values (see above).

### 2. Build and run

```bash
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Stop the container

```bash
docker-compose down
```

### Building the image manually

```bash
docker build \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=your_value \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=your_value \
  --build-arg NEXT_PUBLIC_ADMIN_UIDS=your_value \
  -t softly .
```

---

## Firebase Setup

This app requires a Firebase project with the following enabled:

1. **Authentication** — enable Email/Password and Google providers
2. **Firestore** — create a database in production mode
3. **Storage** — for recipe image uploads

### Firestore Rules

Deploy the included rules:

```bash
firebase deploy --only firestore:rules
```

### Admin Access

Admin users can edit and delete any public recipe. Add admin UIDs as a comma-separated list:

```env
NEXT_PUBLIC_ADMIN_UIDS=uid1,uid2
```

Find a user's UID in Firebase Console → Authentication → Users.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── hearth/           # Recipe section
│   ├── garden/           # Family planning
│   ├── sanctuary/        # Personal wellness
│   ├── grove/            # Journaling & reflection
│   └── reset/            # Weekly reset
├── components/
│   ├── hearth/           # Recipe components
│   ├── layout/           # Navbar
│   └── shared/           # Splash screen, seasonal background
└── lib/
    ├── hooks/            # Firebase data hooks
    └── utils/            # Helpers (season detection, storage, admin)
```

---

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Branch Strategy

- `dev` — all feature branches merge here first
- `main` — production branch, auto-deploys to Firebase App Hosting

---

## Design System

See [`docs/DESIGN.md`](docs/DESIGN.md) for the full design system including colors, typography, spacing, animations, and component patterns.
