# Floating CardNav design

**Date:** 2026-05-09
**Owner:** buchhavee
**Replaces:** `app/components/Nav.tsx`

## Goal

Replace the existing fixed top navigation with a floating, pill-shaped bar containing a burger menu that expands into three category cards. The new bar must avoid the iOS Safari problem where a top-anchored solid color visibly conflicts with the Dynamic Island and the auto-hiding URL bar.

Source reference: React Bits `CardNav` (JS + CSS + GSAP). It is adapted, not copied — we port to TypeScript + Tailwind v4, drop GSAP and react-icons, and align colors/items to the cc-design brand tokens.

## Non-goals

- No localization wiring. The EN/DA button stays a visual stub matching the current site.
- No new global state. Open/close is local to the component.
- No CMS-driven nav items. Items are a const inside the component.
- No keyboard shortcuts beyond Esc-to-close and standard tab focus.

## Information architecture

Three cards. Items collapsed from the current 5-section + Contact nav into:

| Card | Background (Tailwind class → token) | Text | Links |
|---|---|---|---|
| **Work** | `bg-fg` → `#1c1c1a` | `text-fg-inverse` | Featured Projects → `#work`, Case Studies → `#work`, Journal → `#journal` |
| **Studio** | `bg-fg-muted` → `#3a3a38` | `text-fg-inverse` | About → `#studio`, Process → `#process`, Services → `#services` |
| **Contact** | `bg-accent` → `#00529f` | `text-fg-inverse` | Email → `#contact`, LinkedIn → `#contact`, Phone → `#contact` (placeholders until real targets exist) |

Each link is rendered with a leading 14px inline-SVG up-right arrow (`↗` stroke icon) replacing the source's `GoArrowUpRight` from react-icons.

## Floating geometry

This is the key part for iOS Safari compatibility.

- Outer wrapper: `fixed top-0 inset-x-0 z-50 px-(--gutter) pointer-events-none` with top padding of `max(env(safe-area-inset-top), 12px)`. Wrapper does not paint a background.
- Inner pill: `pointer-events-auto mx-auto max-w-[920px] rounded-2xl border` with the bar's background color. Margin around all four sides of the pill — never flush to the top edge.
- Mobile (<768px): same pattern, `max-w-[calc(100%-2rem)]`, slightly tighter top padding.
- Result: the Dynamic Island sits in the gap above the pill; Safari's URL bar reappearing/retracting changes the area above the pill but does not visibly clip or overlap a colored chrome strip.

## Color states

Reuse the `scrollY > 24` pattern from the current `Nav.tsx`.

| State | Bar bg | Bar text | Border | CTA bg | CTA text |
|---|---|---|---|---|---|
| Over hero (top) | `bg-fg/35 backdrop-blur-[18px] backdrop-saturate-150` | `text-fg-inverse` | `border-fg-inverse/15` | `bg-fg-inverse` | `text-fg` |
| Scrolled | `bg-bg-soft` (`#ebe8e3`) | `text-fg` | `border-fg/10` | `bg-fg` | `text-fg-inverse` |

Transition: `transition-[background-color,color,border-color] duration-320 ease-(--ease-out-quart)`. Logo (`<CCLogo color="currentColor" />`) flips automatically.

## Animation

CSS-only, no GSAP.

- **Bar height open/close:** wrap the cards container in a div with `display: grid; grid-template-rows: 0fr` collapsed and `1fr` expanded, transitioned. Inner element has `min-height: 0; overflow: hidden`. This animates between zero height and intrinsic content height. Supported in Safari 17.4+, Chrome 117+, Firefox 121+ — acceptable browser baseline for a 2026 launch.
- **Card stagger:** each of the three cards has its own `transition` on `opacity` and `transform` with `transition-delay: 0ms / 60ms / 120ms`. Collapsed: `opacity-0 translate-y-3`. Expanded: `opacity-100 translate-y-0`. Duration ~320ms.
- **Burger ↔ X:** two `<span>` lines, transformed via `rotate-45 translate-y-1` / `-rotate-45 -translate-y-1` toggled by `data-open="true"` attribute.
- **Reduced motion:** the global `prefers-reduced-motion: reduce` rule in `globals.css` already collapses transitions to ~instant. No additional handling needed.

## Component contract

```ts
// app/components/CardNav.tsx
"use client";

type CardLink = { label: string; href: string; ariaLabel?: string };
type CardItem = {
  label: string;
  bgClass: string;   // tailwind class, not raw color
  textClass: string;
  links: CardLink[];
};

// Items defined as a module-level const, not a prop. The component
// is bespoke to this site, not a reusable library piece.
export function CardNav(): JSX.Element;
```

No props. State is internal: `open: boolean`, `scrolled: boolean`. The component is self-contained and usable as `<CardNav />` from `page.tsx`.

## Top-bar layout

Left → right:

1. Burger button (3-line → X). Always visible.
2. EN/DA toggle. Hidden below 480px.
3. Centered logo (`<CCLogo size={28} layout="inline" color="currentColor" />`), absolute-positioned at the bar's centerline.
4. Contact CTA pill, anchored to `#contact`. Hidden on `max-md` (<768px), reachable inside the Contact card on mobile.

## Accessibility

- Burger is a `<button type="button">` with `aria-expanded` reflecting the open state and `aria-controls` pointing to the cards container id.
- Cards container has `aria-hidden="true"` when collapsed; links are also `tabindex="-1"` while collapsed so they aren't focusable through invisible content.
- `Escape` key closes the menu when open.
- Focus management: on open, focus the first link of the first card. On close (via Esc or burger), return focus to the burger.
- Each card link has its own `aria-label` when the visible text is ambiguous (e.g. the bare "Email" link gets `aria-label="Email CC Design"`).
- Skip link in `page.tsx` is preserved untouched.

## Smooth-scroll integration

Lenis is mounted via `app/components/SmoothScroll.tsx`. It already intercepts in-page anchor clicks. The component does not need to call any Lenis API directly — anchor `href="#x"` clicks will smooth-scroll. The component closes the menu via an `onClick` on each link before the navigation event proceeds.

## Files

- **New:** `app/components/CardNav.tsx`
- **Edit:** `app/page.tsx` — replace the `<Nav />` import and usage with `<CardNav />`.
- **Delete:** `app/components/Nav.tsx` — remove only after `CardNav` is verified working in dev.

## Out of scope

- Real localization (EN/DA stays a stub).
- Real Contact details. Email/LinkedIn/Phone all point to `#contact` until provided.
- Refactoring `CCLogo`, `Hero`, or any other component.
- Adding tests. The current project has no test harness; setting one up just for this is out of scope.

## Risks

- **`grid-template-rows: auto` baseline.** If we discover users on older Safari (<17.4), the menu won't animate height — it will pop instantly. Mitigation: acceptable degradation; fallback is a working but un-animated menu.
- **`backdrop-blur` on Android Chrome.** Some old devices ignore it; the bar will look like flat `bg-fg/35` (still readable, just less glassy). Acceptable.
- **Hero photo darkness drift.** The over-hero state assumes a dark image behind the nav. If the hero image is ever replaced with a light one, the white logo/text will lose contrast. Documented as a known coupling, not solved in this design.
