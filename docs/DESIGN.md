# Softly — Design System

## Concept

The visual metaphor is a **living garden**. The UI should feel like
stepping outside on a warm spring morning — alive, breathing, soft,
and intentional. Nothing harsh. Nothing corporate. Every interaction
should feel like a small moment of care.

---

## Color Palette

These are defined as CSS variables in `globals.css`.

```css
:root {
  /* Backgrounds */
  --color-cream: #faf6f0; /* main app background */
  --color-mist: #e8efe8; /* subtle section backgrounds */
  --color-white: #ffffff; /* card backgrounds */

  /* Primary Palette */
  --color-bloom-pink: #f2c4ce; /* soft rose — primary accent */
  --color-sage: #a8b89a; /* muted green — secondary accent */
  --color-butter: #f7e6b0; /* warm yellow — highlights */
  --color-lavender: #d4c5e2; /* soft purple — mood/sanctuary */

  /* Rich Tones */
  --color-soil: #6b4f3a; /* deep warm brown — headings */
  --color-moss: #5c6b50; /* deep green — body text */
  --color-blush-deep: #d4899a; /* deeper rose — active states */

  /* Neutrals */
  --color-pebble: #b0a89a; /* muted warm gray — borders */
  --color-stone: #7a7068; /* medium gray — secondary text */
  --color-shadow: #3d3530; /* near black — rare, for contrast */

  /* Semantic */
  --color-success: #a8c5a0; /* soft green */
  --color-warning: #f2d58a; /* warm amber */
  --color-error: #e8a0a0; /* soft red */
}
```

### Seasonal Overrides

The app detects the current season and overrides accent colors.
These swap out via a `data-season` attribute on `<html>`.

```css
/* Spring (default — March to May) */
[data-season="spring"] {
  --color-seasonal-primary: #f2c4ce; /* blush pink */
  --color-seasonal-secondary: #a8b89a; /* sage */
  --color-seasonal-accent: #f7e6b0; /* butter */
}

/* Summer (June to August) */
[data-season="summer"] {
  --color-seasonal-primary: #f9d56e; /* golden yellow */
  --color-seasonal-secondary: #7dbe8e; /* bright sage */
  --color-seasonal-accent: #ffb085; /* warm peach */
}

/* Fall (September to November) */
[data-season="fall"] {
  --color-seasonal-primary: #d4845a; /* terracotta */
  --color-seasonal-secondary: #c8a96e; /* amber */
  --color-seasonal-accent: #8b5e3c; /* rich brown */
}

/* Winter (December to February) */
[data-season="winter"] {
  --color-seasonal-primary: #a8bfd4; /* dusty blue */
  --color-seasonal-secondary: #c4d4e0; /* icy silver */
  --color-seasonal-accent: #7a9eb5; /* deeper blue */
}
```

---

## Typography

Import in `globals.css` from Google Fonts:

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap");
```

```css
:root {
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "DM Sans", system-ui, sans-serif;
}
```

### Usage Rules

| Element             | Font      | Weight | Size     |
| ------------------- | --------- | ------ | -------- |
| Page titles (H1)    | Cormorant | 500    | 2.5rem   |
| Section titles (H2) | Cormorant | 400    | 1.75rem  |
| Card titles (H3)    | Cormorant | 400    | 1.25rem  |
| Body text           | DM Sans   | 400    | 1rem     |
| Labels / captions   | DM Sans   | 300    | 0.875rem |
| Buttons             | DM Sans   | 500    | 0.9rem   |
| Nav items           | DM Sans   | 400    | 0.9rem   |

- Display font is for **headings and moments of delight only**
- Body font handles all interactive elements
- Never go below 0.8rem for readability
- Line height: 1.6 for body, 1.2 for headings

---

## Spacing

Uses Tailwind's default spacing scale. Key conventions:

```
Page padding:       px-6  (mobile) → px-12 (desktop)
Section gap:        gap-8
Card padding:       p-5 or p-6
Between sections:   mb-10 or mb-12
Small gaps:         gap-3 or gap-4
```

---

## Border Radius

```css
:root {
  --radius-sm: 8px; /* chips, badges */
  --radius-md: 14px; /* cards */
  --radius-lg: 20px; /* modals, panels */
  --radius-full: 9999px; /* pills, avatars */
}
```

In Tailwind: `rounded-lg` (cards), `rounded-2xl` (modals), `rounded-full` (pills)

---

## Shadows

Soft, warm shadows — never hard or cold.

```css
:root {
  --shadow-soft: 0 2px 12px rgba(107, 79, 58, 0.08);
  --shadow-card: 0 4px 20px rgba(107, 79, 58, 0.1);
  --shadow-lift: 0 8px 30px rgba(107, 79, 58, 0.14);
}
```

---

## Animations

Defined in `animations.css`. Keep motion soft — nothing snappy or jarring.

### Keyframes

```css
/* Cards and content blooming upward on entry */
@keyframes bloom-up {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Gentle pulse for reminders and highlights */
@keyframes soft-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.65;
  }
}

/* Petal drifting in from above */
@keyframes petal-drift {
  from {
    opacity: 0;
    transform: translateY(-20px) rotate(-8deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

/* Celebration bloom when task is completed */
@keyframes bloom-pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

/* Fade in gently */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### Utility Classes

```css
.animate-bloom-up {
  animation: bloom-up 0.4s ease-out forwards;
}
.animate-soft-pulse {
  animation: soft-pulse 2.5s ease-in-out infinite;
}
.animate-petal-drift {
  animation: petal-drift 0.5s ease-out forwards;
}
.animate-bloom-pop {
  animation: bloom-pop 0.3s ease-in-out;
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
```

### Staggered Entry (for lists/cards)

Use animation-delay on children to stagger their bloom-up:

```tsx
// Each card gets a delay based on its index
style={{ animationDelay: `${index * 80}ms` }}
```

### Rules

- Default duration: 300–500ms
- Easing: `ease-out` for entries, `ease-in-out` for loops
- Never animate color changes — use transitions instead
- Hover transitions: `transition-all duration-200`

---

## Component Patterns

### Card

```
bg-white rounded-[14px] p-5 shadow-[var(--shadow-card)]
border border-[var(--color-pebble)]/30
```

### Primary Button

```
bg-[var(--color-bloom-pink)] text-[var(--color-soil)]
font-medium rounded-full px-6 py-2.5
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

## Icons

Use `lucide-react` throughout. Keep icon size consistent:

- Nav icons: `size={20}`
- In-card icons: `size={16}`
- Decorative/hero icons: `size={28}`

---

## Two Sections — Visual Distinction

### 🌿 The Garden (Family Planning)

- Background tint: `var(--color-mist)`
- Accent: `var(--color-sage)`
- Feel: organized, grounded, rooted

### 🌸 The Sanctuary (Personal)

- Background tint: `var(--color-cream)`
- Accent: `var(--color-bloom-pink)`
- Feel: soft, intimate, personal

---

## Do's and Don'ts

### Do

- Use Cormorant for headings — it elevates everything
- Keep lots of white space — the app should breathe
- Use warm shadows, not cool ones
- Stagger animations for lists of cards
- Let the seasonal palette do the heavy lifting

### Don't

- Use pure black (#000000) — use `--color-shadow` instead
- Use harsh borders — keep them at 30% opacity or less
- Overcrowd cards — less is more
- Use jarring or fast animations
- Mix too many accent colors on one screen
