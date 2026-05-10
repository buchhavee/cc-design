# Homepage Prototype — Design Spec

**Date:** 2026-05-10
**Target file:** Figma `K8F0YDISDigg8tQ0w3z7f3` → Prototype page (node `27:27`)
**Scope:** Forside (homepage) only · desktop only (1440 wide) · high-fidelity, client-ready · Danish copy

## Objective

Translate the existing wireframe + copy into a single client-ready homepage prototype on the Prototype page. Resolve the structural inconsistencies in the wireframe (Services-after-Process ordering, isolated stats trust bar, klientel as its own anti-climactic section, hero pills competing with the headline) by adopting the **refined narrative IA** (option B from brainstorming).

## Source material in the file

- **Sitemap** (`5:504` → `5:505`): primary navigation = Projektering · Services · Referencer · Om os · Kontakt; homepage scroll anchors enumerate the section order.
- **Wireframe** (`5:679` → `5:680`): 1440 × 4161 draft of the homepage with 7 sections + footer.
- **Copy** (`23:2`): Danish copy in 9 frames — Hero, Home sektioner, Skræddersyede projekter, three "Drift"-named frames (one is actually about Projektering, one is about the Process / "Fra idé til byggeri", one is the actual Drift content), Om os, Kontakt info, Referencer.
- **Style Tile** (`10:970` → `13:2`): finished. All colour, type, spacing, elevation, and motion tokens are documented and ready to apply.

## Key inconsistencies to fix

1. Three frames are named "Drift" but only one is about drift — the other two are Projektering and Process. We adopt: Drift = drift, Projektering = projektering, "Fra idé til byggeri" = process content.
2. Sitemap has both a "Projektering" subpage and a "Services" subpage with overlapping content. We treat **Services as the umbrella** (Projektering · Bygning · Drift) on the homepage; Projektering subpage deepens the projektering pillar.
3. Referencer copy is currently about "Marinetek" (a supplier). Replaced with CC Design's own project names from the Skræddersyede frame.
4. Hero pills (TOTAL ENTREPRENØR · MARINETEKNIK · 20+ ÅR) compete with the headline. Dropped — the lead paragraph already establishes 20+ years.

## Information Architecture (10 sections, top-to-bottom)

| # | Section | Surface | Source frame |
|---|---------|---------|--------------|
| 0 | CardNav floating bar (sticky) | Sand pill on transparent | — |
| 1 | Hero | Ink + maritime image + atmospheric overlay | Hero (`23:5`) |
| 2 | Manifesto / Statement | Paper | Skræddersyede (`27:21`) |
| 3 | Hvad vi tilbyder (Services) | Sand | Pillar 1 Projektering ← `27:25` · Pillar 2 Bygning ← `27:23` · Pillar 3 Drift ← `27:16` |
| 4 | Sådan arbejder vi (Process) | Paper | "Fra idé til byggeri" (`27:23`) |
| 5 | Udvalgte projekter (Referencer) | Paper | Skræddersyede project list (`27:21`) |
| 6 | Tal & klientel (Trust band) | Ink | New (combined stats + logos) |
| 7 | Testimonial | Sand | Placeholder copy |
| 8 | Kontakt | Ink | Kontakt info (`27:12`) |
| 9 | Footer | Stone | — |

## Section-level layout specs

### 0 · CardNav (sticky)
- Pattern from style tile: rounded-2xl Sand pill, 1px border at fg/10, soft shadow `0 4px 24px rgba(0,0,0,0.12)`.
- Left: hamburger + "MENU" label (mono).
- Right: "● KONTAKT" pill (Ink fill, accent-bright dot).
- Width capped at `max-w-[920px]`, sits 16px from top inside `--gutter`.
- Two visual states documented (this is a static composition, not an animated prototype):
  - **Default** (over Hero): Sand pill with soft shadow as described above.
  - **Scrolled** (over light sections): same pill, no shadow change. We do not draw a separate glass-over-dark state for v1 — the CardNav lives at the top of the page over Hero only in the static composition.

### 1 · Hero
- Full-viewport (h-svh), Ink background.
- Background: maritime image (Sand greybox placeholder, 4:5 ratio inside the right column) + atmospheric gradient overlay (top 0–35% near-clear, bottom 65%+ rgba(14,14,13,0.65)).
- 12-column grid, content centred at `max-w-(--max-page)`.
- Left text column (`md:col-span-7`):
  - Eyebrow: `● 20+ ÅRS ERFARING I MARITIM DESIGN` (accent dot, mono 12, +14% tracking, fg-inverse/75).
  - Headline `<h1>`: **"Vi tænker i helheder"** — Open Sauce Light, `clamp(1.85rem, 7vw, 6.8rem)`, leading 1.02, tracking tight, fg-inverse. Italic emphasis on the closing word ("helheder.") — italic Light variant.
  - Lead `<p>`: full Hero copy paragraph, body-large 18/165, fg-inverse/80, max-w 460.
- Right image column (`md:col-span-5`):
  - 4:5 image well, Sand greybox, named `Hero image · drop photo here`.
  - Caption tag overlay (mono 11/8% UPPERCASE, dark 42%/blur backdrop): "ISLANDS BRYGGES HAVNEBAD · UDVALGT PROJEKT".
  - Drop shadow: hero-deep token (`0 24px 64px rgba(14,14,13,0.32)`).
- Scroll indicator: bottom centre, animated 1px segment, mono "SCROLL" label.

### 2 · Manifesto
- Paper surface, full-bleed.
- `--space-major` top/bottom padding.
- Eyebrow: `OM ARBEJDET / FILOSOFI`.
- Statement: **"Vi forstår havet — og de unikke udfordringer, der følger med vand, vind og vejr."** Open Sauce Light, 56–64 display, leading 1.25, tracking -1.5%, max-w-(--max-prose), fg.
- Sub-paragraph (16/170, fg-muted, max-w ~520): "Vi har arbejdet med strøm, tidevand, vind og bølglaster. Enhver havn er forskellig — og vi ved, hvordan man skaber den perfekte løsning."
- No imagery. Whitespace is the point.

### 3 · Hvad vi tilbyder (Services)
- Sand surface, `--space-major` padding.
- Section header (12-col grid):
  - Left (cols 1–6): eyebrow `01 / HVAD VI TILBYDER` + headline (Open Sauce Light 56) "Tre kompetencer, én partner."
  - Right (cols 8–12): body lead 16/170 — short paragraph from Home sektioner copy.
- 3-column card grid, equal heights, 24px gap:

| Card | Number | Title | 2-line description (paraphrased from copy) | Link |
|------|--------|-------|---------------------------------------------|------|
| 1 | 01 / PROJEKTERING | Projektering & rådgivning | "Tegninger, beregninger, myndighedsgodkendelser. Gennemtænkt fundament før byggeriet starter." | Læs mere → |
| 2 | 02 / BYGNING | Fra idé til færdig løsning | "Komplet entreprise — produktion, montering og aflevering. Én samarbejdspartner hele vejen." | Læs mere → |
| 3 | 03 / DRIFT | Drift & vedligehold | "Faste serviceaftaler eller enkeltstående eftersyn — over og under vand. Lang levetid, høj sikkerhed." | Læs mere → |

- Card style: Paper fill, 1px Ink/8% border, no radius, 32px padding. Mono number eyebrow at top, Open Sauce normal 28 title, body 15/165 description, "Læs mere →" link with bottom border at hover.

### 4 · Sådan arbejder vi (Process)
- Paper surface, `--space-major` padding.
- Section header same pattern as Services: eyebrow `02 / PROCES` + headline "Fra første samtale til færdigt anlæg." Lead paragraph right.
- 5 steps in a single horizontal row, equal columns, hairline above each:

| # | Title | Description |
|---|-------|-------------|
| 01 | Idé & rådgivning | Vi drøfter dine ønsker og finder løsningen ud fra placering, miljø og anvendelse. |
| 02 | Projektering | Tegninger, beregninger og myndighedsgodkendelser. |
| 03 | Produktion & bygning | Hele udførelsen, med fokus på kvalitet, sikkerhed og holdbarhed. |
| 04 | Montering & aflevering | Tryg proces fra start til slut — anlæg klar til brug. |
| 05 | Drift & vedligehold | Løbende eftersyn og service. Lang levetid år efter år. |

- Each column: 1px hairline at top (Ink/15%), accent-blue active state (matches current site `Process.tsx`), mono accent number `01`, Open Sauce Light 24/110 title, body 15/165 description.

### 5 · Udvalgte projekter (Referencer)
- Paper surface, `--space-major` padding.
- Section header: left = eyebrow `03 / REFERENCER` + headline "Udvalgte projekter."; right = "Se alle referencer →" link aligned to bottom (border-b underline).
- 3-column grid, 24px gap, **3 featured projects:**

| # | Image well | Mono caption | Title |
|---|------------|--------------|-------|
| 1 | 4:3, Sand greybox `Project 01 · Islands Brygges Havnebad` | KBH · 2024 · KONSTRUERET | Islands Brygges Havnebad |
| 2 | 4:3, Sand greybox `Project 02 · Aarhus Havnebad` | AARHUS · 2023 | Aarhus Havnebad |
| 3 | 4:3, Sand greybox `Project 03 · Den flydende kirke` | KBH · 2022 | Den flydende kirke |

- Card style: image-well height `clamp(180px, 26vh, 320px)` Sand fill; below image — mono caption (eyebrow style, fg-subtle), title Open Sauce normal 28, hover lifts title to accent.
- **Filter pills (Alle / Danmark / International) NOT in homepage** — they live on the Referencer subpage.

### 6 · Tal & klientel (Trust band)
- Ink surface, `--space-major` padding.
- Single eyebrow: `04 / TILLID — TAL & KLIENTEL` (fg-inverse/55).
- **Top row:** 4 stats in equal columns:
  - `30+` Open Sauce Light 80, fg-inverse · mono label "ÅRS ERFARING"
  - `200+` · "PROJEKTER LEVERET"
  - `12+` · "MEDARBEJDERE"
  - `Total` · "ENTREPRENØR"
- 56px vertical gap.
- **Bottom row:** centred logo strip, 6–8 client logo greyboxes (Sand fill at 8% opacity for now, named `Klientlogo 1` etc.), monochrome treatment intended at 70% opacity. Hairline `Ink/30` above the logo strip.

### 7 · Testimonial
- Sand surface, `--space-major` padding.
- Centred, single quote.
- Eyebrow: `KLIENTORD`.
- Pull quote (Open Sauce Light, `clamp(1.75rem, 3vw, 2.6rem)`, leading 1.3, tracking -1.5%, max-w-(--max-prose)): placeholder copy — "C.C. Design er den eneste partner vi har mødt, der reelt forstår havet og hvordan vi bygger langtidsholdbare anlæg."
- Below quote: 32px hairline (8px wide × 1px Ink/40%) + attribution mono 12 UPPERCASE (fg-muted): "— [NAVN], [STILLING], [FIRMA]".

### 8 · Kontakt
- Ink surface, `--space-major` padding.
- Two-column layout (50/50 at lg, stacked at md):
  - **Left column:**
    - Eyebrow `05 / KONTAKT`.
    - Headline (Open Sauce Light, `clamp(2.5rem, 6vw, 5.5rem)`, fg-inverse, balance): **"Lad os tale sammen."**
    - Lead (18/165, fg-inverse/70, max-w-130): "God kontakt er den bedste forudsætning — og den får du her. Skriv et par ord om dit projekt, så vender vi tilbage."
    - Solid CTA "● SEND FORESPØRGSEL →" (Ink/Paper inverted on Ink — see below).
    - Direct contact block: telephone link `+45 65 32 33 96` and email `mk@ccdesign.dk` underlined, fg-inverse, hover → accent-bright.
  - **Right column:**
    - Form on Ink. Inputs are **bottom-line only** (1px Ink/30% baseline, no boxed inputs).
    - Fields: Navn · Virksomhed · Email · Beskrivelse af projekt (textarea, 4 rows).
    - Submit: full-width "Send →" — Paper fill on dark, hover slides accent.
    - Field labels: mono 11 UPPERCASE +14% tracking, fg-inverse/55, above each input.

CTA on dark uses outlined-CTA pattern from style tile inverted: Paper border + fg-inverse text → fills Paper with Ink text on hover.

### 9 · Footer
- Stone surface, 96px top padding, 40px bottom.
- 4 columns inside `max-w-(--max-page)`:
  - **Col 1:** Brand mark `CC Design A/S` (Open Sauce Light 22) + tagline "Maritime løsninger lokaliseret i Danmark." (fg-inverse/70, body 14/165).
  - **Col 2:** NAVIGATION mono label + links: Forside, Projektering, Services, Referencer, Om os, Kontakt.
  - **Col 3:** SERVICES mono label + links: Projektering, Bygning, Drift.
  - **Col 4:** KONTAKT mono label + address (Kohaven 15, DK-5300 Kerteminde, linked to Maps), telefon, email, CVR 10092825, "Byggeriets Ankenævn ↗" link.
- Bottom strip (above 1px Ink-on-Stone hairline at 15%):
  - Mono "© 2026 CC DESIGN A/S" left.
  - Mono "PRIVATLIVSPOLITIK · COOKIES" right.

## Imagery handling

All image slots are Sand-filled rectangles with **explicit names** so you can drag photos onto them on the Maria page:
- `Hero image · drop photo here` (4:5)
- `Project 01 · Islands Brygges Havnebad` (4:3)
- `Project 02 · Aarhus Havnebad` (4:3)
- `Project 03 · Den flydende kirke` (4:3)
- `Klientlogo 1`–`Klientlogo 8` (square, ~120×60 effective)

Greyboxes use Sand `#ebe8e3` so they don't read as "broken" — they read as design surface ready to be filled.

## Tokens to apply (from style tile)

- **Colours:** Paper #fbfaf8 · Sand #ebe8e3 · Stone #8e8e8b · Ink #1c1c1a · Slate #3a3a38 · Mist #8a8a87 · Harbour #00529f · Harbour Bright #2e86e0
- **Type families:** Open Sauce One (display + body) — substituted with Inter inside Figma. JetBrains Mono for labels/metadata.
- **Spacing:** `--gutter` clamp(20, 5vw, 80) horizontal · `--space-major` clamp(96, 12vw, 160) vertical.
- **Elevation:** Hero shadow `0 24 64 rgba(14,14,13,0.32)` · CardNav `0 4 24 rgba(0,0,0,0.12)`.
- **Eyebrow pattern:** mono 12, +14% tracking, UPPERCASE, optional accent dot.

## What this prototype does NOT include (out of scope)

- Mobile breakpoint
- Subpages (Projektering, Services, Referencer, Om os, Kontakt detail)
- Real client logos (greyboxes only)
- Real photography (Sand greyboxes only — Maria page workflow used post-prototype)
- Click-through interactions / Figma prototype connections (static composition first; we wire interactions after layout is approved)
- Filter pills on Referencer (deferred to subpage)

## Acceptance criteria

The prototype is complete when, on the Prototype page (node `27:27`), there is a single 1440-wide vertical frame named `Forside · Homepage v1` containing the 10 sections in order, each section using style-tile tokens, all Danish copy in place per the source frames, all image wells named for drop-in, no remaining "Drift"-frame copy ambiguity, and the visual rhythm reads top-to-bottom as: dark hero → light manifesto → sand services → light process → light projects → dark trust band → sand testimonial → dark kontakt → stone footer.

## Open questions for client review

These don't block the prototype but should be flagged when sending to the client:
1. **Testimonial copy** is placeholder — needs a real quote and attribution.
2. **Trust band stat values** (30+, 200+, 12+) need verification with the client.
3. **Featured projects selection** (Islands Brygges Havnebad, Aarhus Havnebad, Den flydende kirke) is my pick — client may have other priorities.
4. **CTA wording** (`Send forespørgsel`, `Læs mere`, `Se alle referencer`) is conventional — confirm with brand voice.
