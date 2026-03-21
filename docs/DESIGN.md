# 🌿 Softly — Design System

---

## 🌸 Concept

Softly is a calm, garden-themed app designed for moms to manage family life without feeling overwhelmed.

The visual metaphor is a **living garden**.

The UI should feel like:
- stepping outside on a warm spring morning
- alive, breathing, soft, and intentional

Nothing harsh. Nothing corporate. Every interaction should feel like a small moment of care.

**Softly is not a productivity app.**
It is an emotional support system disguised as a planner.

Every design decision should answer:
> "Does this reduce stress or add to it?"

If it adds stress → simplify or remove.

---

## 🚨 Strict Design Rules

- Never use more than 2 accent colors on a single screen
- Do not use pure black (#000000) — use `--color-shadow` instead
- Garden and Sanctuary must feel visually distinct
- Use soft spacing — avoid dense layouts
- All UI elements must use rounded corners (no sharp edges)
- Animations must be subtle and never distracting
- If a design feels busy, simplify it

**If any rule conflicts, prioritize calmness and clarity over feature density.**

---

## 🌿 Section Ownership

### Garden
- Scheduling, tasks (Sprouts), kids activities, shopping lists, plant growth
- Must feel structured, calm, and grounded
- Minimal animations — keep clean and focused
- Accent: sage tones

### Sanctuary
- Affirmations, gratitude, weekly emotional summaries, Reflection Grove entry point
- Must feel soft, personal, and spacious
- Slightly more motion allowed
- Accent: bloom pink and lavender

### Reflection Grove
- Journaling, emotional release, Tiny Wins Vault
- Gentle calming animations allowed
- Accent: lavender

### Hearth
- Recipes, meal inspiration
- Must feel cozy and simple
- Accent: warm neutrals (butter, sand)

---

## 🎨 Color Palette

```css
:root {
  /* Backgrounds */
  --color-cream: #faf6f0;      /* main app background */
  --color-mist: #e8efe8;       /* subtle section backgrounds */
  --color-white: #ffffff;      /* card backgrounds */

  /* Primary Palette */
  --color-bloom-pink: #f2c4ce; /* soft rose — primary accent */
  --color-sage: #a8b89a;       /* muted green — secondary accent */
  --color-butter: #f7e6b0;     /* warm yellow — highlights */
  --color-lavender: #d4c5e2;   /* soft purple — Sanctuary/Grove ONLY */

  /* Rich Tones */
  --color-soil: #6b4f3a;       /* deep warm brown — headings */
  --color-moss: #5c6b50;       /* deep green — body text */
  --color-blush-deep: #d4899a; /* deeper rose — active states */

  /* Neutrals */
  --color-pebble: #b0a89a;     /* muted warm gray — borders */
  --color-stone: #7a7068;      /* medium gray — secondary text */
  --color-shadow: #3d3530;     /* near black — rare, for contrast */

  /* Semantic */
  --color-success: #a8c5a0;
  --color-warning: #f2d58a;
  --color-error: #e8a0a0;
}
```

### Color Usage Rules

- Use only 1 primary accent and 1 secondary accent per screen
- Default accent = seasonal primary
- Garden uses sage tones
- Sanctuary uses bloom pink and lavender
- Hearth uses warm neutrals (butter, sand)
- **Lavender is reserved ONLY for:** Sanctuary, Reflection Grove, emotional UI
- Avoid mixing pink + lavender + yellow together on one screen

### Seasonal Overrides

```css
[data-season="spring"] {
  --color-seasonal-primary: #f2c4ce;
  --color-seasonal-secondary: #a8b89a;
  --color-seasonal-accent: #f7e6b0;
}

[data-season="summer"] {
  --color-seasonal-primary: #f9d56e;
  --color-seasonal-secondary: #7dbe8e;
  --color-seasonal-accent: #ffb085;
}

[data-season="fall"] {
  --color-seasonal-primary: #d4845a;
  --color-seasonal-secondary: #c8a96e;
  --color-seasonal-accent: #8b5e3c;
}

[data-season="winter"] {
  --color-seasonal-primary: #a8bfd4;
  --color-seasonal-secondary: #c4d4e0;
  --color-seasonal-accent: #7a9eb5;
}
```

---

## ✍️ Typography

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap");

:root {
  --font-display: "Cormorant Garamond", serif;
  --font-body: "DM Sans", sans-serif;
}
```

| Element             | Font      | Weight | Size     |
| ------------------- | --------- | ------ | -------- |
| Page titles (H1)    | Cormorant | 500    | 2.5rem   |
| Section titles (H2) | Cormorant | 400    | 1.75rem  |
| Card titles (H3)    | Cormorant | 400    | 1.25rem  |
| Body text           | DM Sans   | 400    | 1rem     |
| Labels / captions   | DM Sans   | 300    | 0.875rem |
| Buttons             | DM Sans   | 500    | 0.9rem   |
| Nav items           | DM Sans   | 400    | 0.9rem   |

### Rules
- Display font = headings and moments of delight only
- Body font = all UI text
- Never go below 0.8rem
- Line height: 1.6 for body, 1.2 for headings

---

## 📐 Spacing

```
Page padding:       px-6 (mobile) → px-12 (desktop)
Section gap:        gap-8
Card padding:       p-5 or p-6
Between sections:   mb-10 or mb-12
Small gaps:         gap-3 or gap-4
```

Always prioritize breathing room.

---

## 🔘 Border Radius

```css
:root {
  --radius-sm: 8px;      /* chips, badges */
  --radius-md: 16px;     /* cards */
  --radius-lg: 24px;     /* modals, panels */
  --radius-full: 9999px; /* pills, avatars */
}
```

---

## 🌫 Shadows

```css
:root {
  --shadow-soft: 0 2px 12px rgba(107, 79, 58, 0.08);
  --shadow-card: 0 4px 20px rgba(107, 79, 58, 0.1);
  --shadow-lift: 0 8px 30px rgba(107, 79, 58, 0.14);
}
```

---

## 🌬 Motion Philosophy

Motion should feel like nature: slow, gentle, organic.

Animations should:
- guide attention
- reward interaction
- create calm

Never:
- distract
- overwhelm
- feel mechanical

```css
@keyframes bloom-up {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes soft-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.65; }
}

@keyframes petal-drift {
  from { opacity: 0; transform: translateY(-20px) rotate(-8deg); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes bloom-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
```

### Animation Rules by Section

| Section          | Animation Level |
|------------------|----------------|
| Splash           | Seasonal particles + bloom-up |
| Garden           | Minimal — no particles |
| Sanctuary        | Minimal soft motion |
| Reflection Grove | Gentle calming animations allowed |
| Hearth           | Minimal |

- Duration: 300–500ms
- Easing: ease-out or ease-in-out
- No bouncing or aggressive motion

---

## 🧩 Component Patterns

### Card
```
bg-white rounded-[16px] p-5 shadow-[var(--shadow-card)]
border border-[var(--color-pebble)]/30
```

### Primary Button
```
bg-[var(--color-bloom-pink)] text-[var(--color-soil)]
rounded-full px-6 py-2.5
hover:bg-[var(--color-blush-deep)] transition-all duration-200
```

### Ghost Button
```
border border-[var(--color-pebble)] text-[var(--color-moss)]
rounded-full px-6 py-2.5
hover:bg-[var(--color-mist)] transition-all duration-200
```

### Badge / Chip
```
bg-[var(--color-mist)] text-[var(--color-moss)]
text-xs font-medium rounded-full px-3 py-1
```

### Input
```
w-full bg-[var(--color-cream)] border border-[var(--color-pebble)]
rounded-lg px-4 py-2.5 text-[var(--color-shadow)]
focus:outline-none focus:border-[var(--color-sage)]
transition-colors duration-200
```

---

## 📱 Layout Pattern (Mobile-First)

Every screen should follow this order:

1. **Header** — title or greeting
2. **Emotional context** — affirmation, seasonal message
3. **Functional content** — tasks, schedule, recipes
4. **Supporting content**

**Always show emotional context BEFORE tasks.**

---

## 🖼 Icons

Use `lucide-react` throughout.

- Nav icons: `size={20}`
- In-card icons: `size={16}`
- Decorative/hero icons: `size={28}`

---

## 🌿 Section Visual Distinction

### Garden
- Background tint: `var(--color-mist)`
- Accent: `var(--color-sage)`
- Feel: organized, grounded, rooted

### Sanctuary
- Background tint: `var(--color-cream)`
- Accent: `var(--color-bloom-pink)`
- Feel: soft, intimate, personal

### Reflection Grove
- Background tint: `var(--color-cream)`
- Accent: `var(--color-lavender)`
- Feel: quiet, releasing, safe

### Hearth
- Background tint: `var(--color-cream)`
- Accent: `var(--color-butter)`
- Feel: cozy, warm, nourishing

---

## ✅ Do's and Don'ts

### Do
- Use Cormorant for headings — it elevates everything
- Keep lots of white space — the app should breathe
- Use warm shadows, not cool ones
- Stagger animations for lists of cards
- Let the seasonal palette do the heavy lifting
- Show emotional context before tasks on every screen
- Reuse card component everywhere

### Don't
- Use pure black (#000000) — use `--color-shadow`
- Use harsh borders — keep them at 30% opacity or less
- Overcrowd cards — less is more
- Use jarring or fast animations
- Mix too many accent colors on one screen
- Use lavender outside of Sanctuary/Grove
- Invent new UI patterns unnecessarily
