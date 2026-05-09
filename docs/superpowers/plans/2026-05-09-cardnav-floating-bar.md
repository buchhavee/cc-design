# Floating CardNav Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing fixed top navigation with a floating, iOS-Safari-safe pill that expands into three category cards (Work / Studio / Contact).

**Architecture:** Single client component at `app/components/CardNav.tsx`, written in TypeScript using Tailwind v4 brand tokens. CSS-only animation via the `grid-template-rows: 0fr → 1fr` height technique and `transition-delay` stagger — no GSAP, no react-icons, no new runtime dependencies. The component owns scroll-state and open/close state internally. After it is verified working, the old `app/components/Nav.tsx` is deleted.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4 (`@theme` tokens), Lenis (already wired via `app/components/SmoothScroll.tsx`).

**Spec:** [`docs/superpowers/specs/2026-05-09-cardnav-floating-bar-design.md`](../specs/2026-05-09-cardnav-floating-bar-design.md)

**Verification approach:** This project has no test harness, and the spec explicitly excludes adding one. Each task ends with manual verification in the dev server (`npm run dev` → http://localhost:3000) plus `npm run lint` for static checks. Final task also runs `npm run build` to catch type errors and any Next.js 16 deprecation notices (per `AGENTS.md`).

---

## File map

- **Create:** `app/components/CardNav.tsx` — single client component, ~180 LOC
- **Modify:** `app/page.tsx` — swap `<Nav />` for `<CardNav />` (one import, one element)
- **Delete (final task):** `app/components/Nav.tsx` — after CardNav is verified

No other files change. The existing `globals.css` `prefers-reduced-motion` block already handles the reduced-motion case.

---

### Task 1: Scaffold static CardNav and mount it

Create the component with the floating geometry and a static top bar (logo, burger visual, EN/DA, CTA). No open/close logic yet. Mount it in `page.tsx` replacing `Nav`. Old `Nav.tsx` stays untouched until Task 8.

**Files:**
- Create: `app/components/CardNav.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the static component file**

Create `app/components/CardNav.tsx` with this content:

```tsx
"use client";

import { CCLogo } from "./CCLogo";

export function CardNav() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 px-(--gutter) pointer-events-none"
      style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto mx-auto w-full max-w-[920px] rounded-2xl border border-fg-inverse/15 bg-fg/35 backdrop-blur-[18px] backdrop-saturate-150 text-fg-inverse shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
      >
        <div className="relative flex h-15 items-center px-3 sm:px-4">
          {/* Burger (visual only for now) */}
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-9 w-9 flex-col items-center justify-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 text-current"
          >
            <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart)" />
            <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart)" />
          </button>

          {/* EN/DA toggle */}
          <button
            type="button"
            aria-label="Switch language"
            className="ml-2 hidden min-[480px]:inline-flex font-mono text-[10px] font-normal tracking-[0.2em] uppercase text-current/70 hover:text-current transition-colors duration-240 cursor-pointer bg-transparent border-0 p-0"
          >
            EN<span className="mx-1 opacity-40">/</span>DA
          </button>

          {/* Centered logo */}
          <a
            href="#top"
            aria-label="CC Design — back to top"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center text-current no-underline transition-opacity duration-240 hover:opacity-75"
          >
            <CCLogo size={22} layout="inline" color="currentColor" />
          </a>

          {/* Contact CTA, hidden on mobile */}
          <a
            href="#contact"
            className="ml-auto hidden md:inline-flex items-center gap-2 rounded-xl bg-fg-inverse px-4 py-2 text-fg font-body text-[11px] font-medium tracking-[0.18em] uppercase no-underline cursor-pointer transition-colors duration-240 ease-(--ease-out-quart) hover:bg-fg-inverse/90"
          >
            <span>Contact</span>
            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-accent-bright" />
          </a>
        </div>
      </nav>
    </div>
  );
}
```

- [ ] **Step 2: Mount CardNav in page.tsx**

Open `app/page.tsx` and swap the import and the JSX usage:

```tsx
import { CardNav } from "./components/CardNav";
import { Hero } from "./components/Hero";
// ...rest unchanged
```

Then in the returned JSX, replace `<Nav />` with `<CardNav />`. Keep the file `app/components/Nav.tsx` on disk — it just becomes unused.

- [ ] **Step 3: Run dev server and verify**

Run: `npm run dev`
Open: http://localhost:3000

Expected:
- A floating, glass-blur pill at the top, centered, with margin around all four sides — not flush to the top edge.
- Burger lines visible on the left, EN/DA next to it, CC logo centered, "Contact ●" pill on the right.
- Resize the window: bar narrows but stays centered. Below 768px the Contact CTA is hidden. Below 480px the EN/DA is hidden.
- Scrolling does nothing yet (color stays glass on dark hero).

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/components/CardNav.tsx app/page.tsx
git commit -m "feat(nav): scaffold floating CardNav over hero

Adds a static glass pill with logo, burger visual, EN/DA, and Contact
CTA, mounted in page.tsx in place of the existing Nav. No open/close
behavior yet; Nav.tsx kept around until CardNav is verified."
```

---

### Task 2: Add scroll-driven color states

Bar transitions from glass (over hero) to paper (`bg-bg-soft`, ink text) once `window.scrollY > 24`, mirroring the existing `Nav.tsx` behavior.

**Files:**
- Modify: `app/components/CardNav.tsx`

- [ ] **Step 1: Add scroll state and apply conditional classes**

Replace the entire `CardNav` function body with the following. The key changes: import `useEffect` and `useState`, track `scrolled`, and split classes into glass-state vs scrolled-state.

```tsx
"use client";

import { useEffect, useState } from "react";
import { CCLogo } from "./CCLogo";

export function CardNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClasses = scrolled
    ? "border-fg/10 bg-bg-soft text-fg"
    : "border-fg-inverse/15 bg-fg/35 backdrop-blur-[18px] backdrop-saturate-150 text-fg-inverse";

  const ctaClasses = scrolled
    ? "bg-fg text-fg-inverse hover:bg-fg/90"
    : "bg-fg-inverse text-fg hover:bg-fg-inverse/90";

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 px-(--gutter) pointer-events-none"
      style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}
    >
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto w-full max-w-[920px] rounded-2xl border shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-[background-color,color,border-color] duration-320 ease-(--ease-out-quart) ${navClasses}`}
      >
        <div className="relative flex h-15 items-center px-3 sm:px-4">
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-9 w-9 flex-col items-center justify-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 text-current"
          >
            <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart)" />
            <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart)" />
          </button>

          <button
            type="button"
            aria-label="Switch language"
            className="ml-2 hidden min-[480px]:inline-flex font-mono text-[10px] font-normal tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-240 cursor-pointer bg-transparent border-0 p-0"
          >
            EN<span className="mx-1 opacity-40">/</span>DA
          </button>

          <a
            href="#top"
            aria-label="CC Design — back to top"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center text-current no-underline transition-opacity duration-240 hover:opacity-75"
          >
            <CCLogo size={22} layout="inline" color="currentColor" />
          </a>

          <a
            href="#contact"
            className={`ml-auto hidden md:inline-flex items-center gap-2 rounded-xl px-4 py-2 font-body text-[11px] font-medium tracking-[0.18em] uppercase no-underline cursor-pointer transition-colors duration-240 ease-(--ease-out-quart) ${ctaClasses}`}
          >
            <span>Contact</span>
            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-accent-bright" />
          </a>
        </div>
      </nav>
    </div>
  );
}
```

Note: the EN/DA `text-current/70` was replaced with `opacity-70` because `text-current/70` is not valid Tailwind syntax (opacity modifier requires a known color, not `current`).

- [ ] **Step 2: Verify scroll transition**

Run: `npm run dev` (if not already running)
Open: http://localhost:3000

Expected:
- At top of page: glass blur, white text, white CTA pill with dark text.
- Scroll down ~30px: bar transitions smoothly to warm paper (`#ebe8e3`) with ink text and a dark CTA pill.
- Scroll back up: transitions back to glass.
- Transition is ~320ms with the same easing the rest of the site uses.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/components/CardNav.tsx
git commit -m "feat(nav): scroll-driven color states for CardNav

Bar swaps between dark glass over the hero and warm paper once
scrolled past 24px, mirroring the previous Nav behaviour."
```

---

### Task 3: Open/close state with burger-to-X animation

Add `open` state, click handler on the burger, and the burger lines transform into an X when open. Cards container is added but stays empty for now.

**Files:**
- Modify: `app/components/CardNav.tsx`

- [ ] **Step 1: Add open state and burger transform**

Inside the component, after the `scrolled` state, add:

```tsx
const [open, setOpen] = useState(false);
```

Replace the burger `<button>` block with:

```tsx
<button
  type="button"
  aria-label={open ? "Close menu" : "Open menu"}
  aria-expanded={open}
  aria-controls="cardnav-cards"
  onClick={() => setOpen((v) => !v)}
  data-open={open || undefined}
  className="group inline-flex h-9 w-9 flex-col items-center justify-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 text-current"
>
  <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart) origin-center group-data-[open]:translate-y-[3px] group-data-[open]:rotate-45" />
  <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart) origin-center group-data-[open]:-translate-y-[3px] group-data-[open]:-rotate-45" />
</button>
```

- [ ] **Step 2: Add the cards container (empty body, animating height)**

Inside the `<nav>` element, _after_ the `<div className="relative flex h-15 ...">` top-bar block, add:

```tsx
<div
  id="cardnav-cards"
  aria-hidden={!open}
  className={`grid transition-[grid-template-rows] duration-400 ease-(--ease-out-quart) ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
>
  <div className="overflow-hidden min-h-0">
    <div className="flex flex-col gap-2 p-2 md:flex-row md:gap-3">
      {/* Cards will be added in Task 4 */}
    </div>
  </div>
</div>
```

- [ ] **Step 3: Verify burger toggle**

Run: `npm run dev`
Open: http://localhost:3000

Expected:
- Click burger: lines animate into an X.
- Click again: X animates back to two lines.
- The bar's height does not change yet (cards container has zero content) but the transition is wired (verify by adding any content temporarily if you like).
- `aria-expanded` flips between `true` and `false` (inspect the DOM).

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/components/CardNav.tsx
git commit -m "feat(nav): toggle open state with burger-to-X transition

Adds open state, click handler, and an empty grid-rows-animated cards
container. Burger lines rotate into an X via group-data-[open]
selectors."
```

---

### Task 4: Render the three cards with their links

Add the static `CARDS` data and an inline `ArrowIcon` SVG. Render three cards inside the cards container.

**Files:**
- Modify: `app/components/CardNav.tsx`

- [ ] **Step 1: Add types, data, and the arrow icon**

At the top of `app/components/CardNav.tsx`, _below_ the `import` lines and _above_ the `export function CardNav`, add:

```tsx
type CardLink = { label: string; href: string; ariaLabel: string };

type CardItem = {
  label: string;
  bgClass: string;
  textClass: string;
  links: CardLink[];
};

const CARDS: CardItem[] = [
  {
    label: "Work",
    bgClass: "bg-fg",
    textClass: "text-fg-inverse",
    links: [
      { label: "Featured Projects", href: "#work", ariaLabel: "Featured projects" },
      { label: "Case Studies", href: "#work", ariaLabel: "Case studies" },
      { label: "Journal", href: "#journal", ariaLabel: "Journal" },
    ],
  },
  {
    label: "Studio",
    bgClass: "bg-fg-muted",
    textClass: "text-fg-inverse",
    links: [
      { label: "About", href: "#studio", ariaLabel: "About the studio" },
      { label: "Process", href: "#process", ariaLabel: "Our process" },
      { label: "Services", href: "#services", ariaLabel: "Services" },
    ],
  },
  {
    label: "Contact",
    bgClass: "bg-accent",
    textClass: "text-fg-inverse",
    links: [
      { label: "Email", href: "#contact", ariaLabel: "Email CC Design" },
      { label: "LinkedIn", href: "#contact", ariaLabel: "CC Design on LinkedIn" },
      { label: "Phone", href: "#contact", ariaLabel: "Call CC Design" },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.5 10.5 L10.5 3.5 M5 3.5 H10.5 V9"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Render the cards inside the container**

Replace the empty cards-container inner content with:

```tsx
<div
  id="cardnav-cards"
  aria-hidden={!open}
  className={`grid transition-[grid-template-rows] duration-400 ease-(--ease-out-quart) ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
>
  <div className="overflow-hidden min-h-0">
    <div className="flex flex-col gap-2 p-2 md:flex-row md:gap-3">
      {CARDS.map((card) => (
        <div
          key={card.label}
          className={`flex flex-1 flex-col rounded-xl px-5 py-4 ${card.bgClass} ${card.textClass} min-h-[140px]`}
        >
          <div className="font-display text-[22px] font-normal tracking-[-0.01em]">
            {card.label}
          </div>
          <div className="mt-auto flex flex-col gap-1.5 pt-4">
            {card.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.ariaLabel}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 font-body text-[15px] no-underline opacity-90 hover:opacity-100 transition-opacity duration-240"
              >
                <ArrowIcon />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
```

- [ ] **Step 3: Verify cards render and links work**

Run: `npm run dev`
Open: http://localhost:3000

Expected:
- Click burger: bar expands smoothly downward, three colored cards appear (ink, charcoal, blue), each with a label and three links.
- Each link has a small `↗` arrow on the left.
- Click a link: menu closes (`setOpen(false)`) and Lenis smooth-scrolls to the section.
- On mobile (≤768px): cards stack vertically; bar grows tall.
- On desktop: cards sit in a 3-column row.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/components/CardNav.tsx
git commit -m "feat(nav): render Work / Studio / Contact cards in CardNav

Adds the three category cards with inline arrow-icon links. Clicking a
link closes the menu before Lenis smooth-scrolls to the target."
```

---

### Task 5: Card stagger reveal animation

Each card fades and translates up into place with a 60ms stagger when opening. Reverses on close.

**Files:**
- Modify: `app/components/CardNav.tsx`

- [ ] **Step 1: Apply per-card transition with delays**

Update the card-rendering loop to add reveal classes and per-card `transitionDelay`. Replace the existing card `<div>` with this version:

```tsx
{CARDS.map((card, idx) => (
  <div
    key={card.label}
    className={`flex flex-1 flex-col rounded-xl px-5 py-4 ${card.bgClass} ${card.textClass} min-h-[140px] transition-[opacity,transform] duration-320 ease-(--ease-out-quart) ${
      open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
    }`}
    style={{ transitionDelay: open ? `${idx * 60}ms` : "0ms" }}
  >
    <div className="font-display text-[22px] font-normal tracking-[-0.01em]">
      {card.label}
    </div>
    <div className="mt-auto flex flex-col gap-1.5 pt-4">
      {card.links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.ariaLabel}
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="inline-flex items-center gap-2 font-body text-[15px] no-underline opacity-90 hover:opacity-100 transition-opacity duration-240"
        >
          <ArrowIcon />
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  </div>
))}
```

The `style={{ transitionDelay }}` is set inline because Tailwind v4 cannot generate per-instance arbitrary delay values from a runtime index without a config plugin. Inline style is appropriate for this kind of dynamic value.

- [ ] **Step 2: Verify stagger**

Run: `npm run dev`
Open: http://localhost:3000

Expected:
- Click burger to open: bar height animates first, then Work card fades up, Studio follows ~60ms later, Contact ~60ms after that.
- Click burger to close: cards fade out together (delays reset to 0ms when closing), then bar collapses.
- With macOS "Reduce Motion" enabled: transitions collapse to ~instant (handled by the existing `prefers-reduced-motion` rule in `globals.css`).

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/components/CardNav.tsx
git commit -m "feat(nav): stagger reveal of CardNav cards

Each card fades and translates up with a 60ms cascade when the menu
opens, collapsing in sync when closing."
```

---

### Task 6: Accessibility — Esc to close, focus management

Pressing `Escape` while the menu is open closes it and returns focus to the burger. Opening the menu moves focus to the first link of the first card.

**Files:**
- Modify: `app/components/CardNav.tsx`

- [ ] **Step 1: Add refs and keyboard / focus effects**

Update the imports at the top of the file to add `useRef`:

```tsx
import { useEffect, useRef, useState } from "react";
```

Inside the component, _after_ the `open` state, add the refs and the effect:

```tsx
const burgerRef = useRef<HTMLButtonElement>(null);
const firstLinkRef = useRef<HTMLAnchorElement>(null);

useEffect(() => {
  if (!open) return;
  firstLinkRef.current?.focus();
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      burgerRef.current?.focus();
    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [open]);
```

- [ ] **Step 2: Wire the refs**

On the burger `<button>`, add `ref={burgerRef}`.

On the link inside the cards loop, attach `firstLinkRef` only to the very first link (card index 0, link index 0). Update the inner link `<a>` to:

```tsx
{card.links.map((link, linkIdx) => (
  <a
    key={link.label}
    ref={idx === 0 && linkIdx === 0 ? firstLinkRef : undefined}
    href={link.href}
    aria-label={link.ariaLabel}
    tabIndex={open ? 0 : -1}
    onClick={() => setOpen(false)}
    className="inline-flex items-center gap-2 font-body text-[15px] no-underline opacity-90 hover:opacity-100 transition-opacity duration-240"
  >
    <ArrowIcon />
    <span>{link.label}</span>
  </a>
))}
```

(Note `linkIdx` added to the inner `.map`. The outer `.map` already has `idx`.)

- [ ] **Step 3: Verify keyboard behaviour**

Run: `npm run dev`
Open: http://localhost:3000

Expected manual checks:
- Click burger to open. Focus jumps to "Featured Projects" link. Tab through the cards — focus order is Work links → Studio links → Contact links → Contact CTA.
- Press `Escape` while open. Menu closes, focus returns to the burger button (visible via the focus ring).
- While closed, `Tab` should skip the card links entirely (`tabIndex={-1}`).

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/components/CardNav.tsx
git commit -m "feat(nav): keyboard a11y for CardNav

Esc closes the menu and returns focus to the burger; opening focuses
the first card link. Closed cards are not tab-focusable."
```

---

### Task 7: Delete the obsolete Nav component

After CardNav has been verified end-to-end, remove the old file and its imports.

**Files:**
- Delete: `app/components/Nav.tsx`

- [ ] **Step 1: Verify Nav is unreferenced**

Run: `grep -RIn "from.*components/Nav['\"]\|import.*\bNav\b" app/`
Expected: no matches in any file other than the import line you already removed in Task 1 (which should not appear). If you see a stray reference, fix it before deleting.

- [ ] **Step 2: Delete the file**

```bash
git rm app/components/Nav.tsx
```

- [ ] **Step 3: Build to catch any leftover references**

Run: `npm run build`
Expected: build succeeds. Read any deprecation notices in the output (per `AGENTS.md`, this Next.js version may differ from training data — heed any printed guidance).

- [ ] **Step 4: Final dev-server smoke test**

Run: `npm run dev`
Open: http://localhost:3000

Walk through the page top-to-bottom:
- Glass nav over hero, paper nav once scrolled.
- Open menu, click a Work link → menu closes, page smooth-scrolls to `#work` section.
- Open menu, hit Esc → closes, focus returns.
- On a phone-sized viewport: bar narrows, EN/DA hides at <480px, CTA hides at <768px, cards stack.
- iOS check (if available): bar floats clear of the Dynamic Island and does not visually clip when Safari's URL bar shows/hides.

- [ ] **Step 5: Commit**

```bash
git commit -m "chore(nav): remove obsolete Nav component

CardNav has fully replaced the previous fixed top navigation."
```

---

## Self-review

**Spec coverage:**
- Floating geometry with safe-area inset → Task 1 ✓
- Two color states (glass / paper) → Task 2 ✓
- Burger-to-X transition → Task 3 ✓
- Three cards (Work / Studio / Contact) with link IA → Task 4 ✓
- Stagger reveal, no GSAP → Task 5 ✓
- Esc + focus management + ARIA → Tasks 3, 4, 6 ✓
- Lenis integration via plain anchor links → Task 4 ✓
- CCLogo with `currentColor` → Task 1 ✓
- Old Nav.tsx deletion → Task 7 ✓
- No new runtime dependencies → confirmed across all tasks ✓

**Placeholder scan:** No "TBD"/"TODO"/"add validation" steps. Each code-touching step contains the actual code. Verification steps name specific commands and expected behavior.

**Type/identifier consistency:**
- `CardItem`, `CardLink`, `CARDS` defined in Task 4, reused unchanged in Task 5.
- `burgerRef`, `firstLinkRef` defined and wired in Task 6.
- DOM id `cardnav-cards` set in Task 3, referenced by `aria-controls` (also in Task 3).
- `idx` parameter in Task 4's outer `.map` is the same `idx` referenced in Tasks 5 and 6.

**Scope:** Single component swap, one plan, one feature. No decomposition needed.
