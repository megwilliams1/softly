# Softly — Project Spec

## Overview

Softly is a mom's weekly companion app with two equal halves:

- The Garden: family planning (meals, kids' activities, errands)
- The Sanctuary: personal self-care (mood, gratitude, affirmations)

The visual metaphor is a living garden — the UI feels
seasonal, alive, and rewarding to use.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (bloom/grow animations)
- localStorage for data persistence (MVP)

## Two Core Sections

### 🌿 The Garden (Family)

- Weekly meal planner (7-day grid, add/edit meals)
- Kids' activity scheduler (per child, color coded)
- Grocery & errands checklist (check off as done)

### 🌸 The Sanctuary (Personal)

- Daily mood check-in (visual, not just a number)
- Gratitude journal (3 entries per day prompt)
- Daily affirmation (rotates from a curated list)
- Self-care reminders (user sets their own)

## Weekly Reset

Every Sunday, a gentle reset flow walks mom through:

1. Reflecting on last week (one word / mood)
2. Setting intentions for the new week
3. Filling in the meal planner
4. Adding kids' activities
5. A new affirmation for the week

## Data

MVP uses localStorage. No login required.
Future: Supabase auth + database for multi-device.

## Seasonal Theming

- Spring: blush pinks, soft greens, petal animations
- Summer: warm yellows, bright sage, butterfly motifs
- Fall: terracotta, amber, leaf animations
- Winter: dusty blue, silver, snowflake motifs
  App detects current season automatically.
