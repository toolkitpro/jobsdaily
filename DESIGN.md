# Design Brief

## Overview
Professional job portal with public discovery + admin panel. Clean, modern aesthetic emphasizing trustworthiness and daily opportunity discovery. Semantic job type badges (Government/Private/Corporate) as primary visual differentiation.

## Tone & Aesthetic
Direct, professional, approachable. Not sterile corporate; not playful. Intentional, modern, minimal decoration. Search experience prioritizes discovery over complexity.

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | `oklch(0.42 0.18 254)` Navy | `oklch(0.68 0.2 254)` Light Navy | CTAs, admin panel, interactive elements |
| Secondary | `oklch(0.5 0.15 195)` Teal | `oklch(0.65 0.18 195)` Light Teal | Info, highlights |
| Accent | `oklch(0.62 0.22 28)` Warm Orange | `oklch(0.7 0.24 28)` Light Orange | Search bar focus, highlights, emphasis |
| Govt Badge | `oklch(0.35 0.12 255)` Deep Navy | `oklch(0.65 0.18 255)` Light Navy | Government job type |
| Private Badge | `oklch(0.5 0.15 195)` Teal | `oklch(0.65 0.18 195)` Light Teal | Private job type |
| Corporate Badge | `oklch(0.48 0.18 280)` Purple | `oklch(0.62 0.2 280)` Light Purple | Corporate job type |
| Neutral | `oklch(0.97 0.01 0)` Off-white | `oklch(0.12 0.01 0)` Deep charcoal | Background, cards, text |
| Muted | `oklch(0.92 0.01 0)` Light grey | `oklch(0.2 0.01 0)` Dark grey | Secondary text, borders |

## Typography
- **Display**: Bricolage Grotesque (bold, modern, distinctive) — headings, job titles
- **Body**: DM Sans (clean, readable, neutral) — descriptions, labels, body copy
- **Mono**: Geist Mono — code, errors, form inputs, timestamps

## Structural Zones

| Zone | Treatment | Note |
|------|-----------|------|
| Header | White/light bg, `border-b`, nav + logo + Admin Login | Elevated above content |
| Hero | Muted background, search bar with orange focus state | Entry point, prominent CTA |
| Sidebar + Grid | Sidebar left (filters), content right (job cards) | Desktop layout, responsive stacking |
| Job Cards | White/light card bg, semantic badges, subtle shadow | Hover: elevation increase |
| Admin Form | Minimal decoration, stacked inputs, form-forward | Task-focused, no distraction |
| Footer | Muted bg, `border-t`, centered copyright | Visual closure, grounded |

## Component Patterns
- **Job Type Badge**: Semantic OKLCH colors (Government navy, Private teal, Corporate purple) — instantly recognizable without text
- **Search Input**: Full-width, orange focus ring, rounded 4px
- **Job Card**: White card, 20px padding, subtle shadow, hover elevation
- **Filter Chips**: Rounded 4px, light backgrounds, active state via accent color
- **Buttons**: Orange accent (primary CTA), navy (secondary), rounded full for larger buttons, 4px for icon buttons

## Elevation & Depth
- **L0**: Content background `oklch(0.97 0.01 0)` light / `oklch(0.12 0.01 0)` dark
- **L1**: Cards, modals `oklch(0.99 0.01 0)` light / `oklch(0.16 0.01 0)` dark
- **L2**: Popovers `oklch(0.99 0.01 0)` light / `oklch(0.2 0.01 0)` dark
- **Shadows**: Subtle `shadow-sm` on cards, `shadow-md` on hover, no dramatic drops

## Spacing & Rhythm
- **Cards**: 20px padding internal, 16px gap between
- **Form inputs**: 16px padding, 12px gap
- **Hero section**: 40px top/bottom padding
- **Density variation**: Generous in discovery (cards), tight in forms (admin panel)

## Motion & Transitions
- **Default**: `transition-smooth` (0.3s cubic-bezier(0.4, 0, 0.2, 1)) on hover/focus
- **Card hover**: Elevation increase + shadow expand
- **Search focus**: Ring highlight, text remains visible
- **No flashiness**: Subtle, purposeful motion only

## Signature Detail
**Semantic Job Type Badges** — Each job category (Government/Private/Corporate) has its own OKLCH color value. Badges are compact (`px-3 py-1`), rounded slightly (`rounded-sm`), white text on colored background. Users recognize job type instantly by color pattern, not requiring text parsing.

## Constraints
- No purple/gradient sprawl; colors serve semantic purpose
- Avoid default Tailwind colors — all OKLCH custom
- No animation unless supporting interaction clarity
- Minimal decoration; information hierarchy via spacing and weight
- Responsive mobile-first: cards stack, sidebar becomes drawer/collapse on mobile
