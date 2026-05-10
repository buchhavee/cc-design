# Homepage Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-fidelity, client-ready Figma prototype of the CC Design A/S homepage on the Prototype page (node `27:27`) of file `K8F0YDISDigg8tQ0w3z7f3`, following the refined-narrative IA from the spec.

**Architecture:** Single 1440-wide vertical wrapper frame named `Forside · Homepage v1`. Built section-by-section (one task per section) via `use_figma` JS in the Plugin API. Each section is its own auto-layout child of the wrapper. CardNav is added last as an absolutely-positioned overlay on top of the Hero. All colours, typography, and spacing match the style tile (`10:970` → `13:2`). Visual validation after every section via `get_screenshot`.

**Tech Stack:** Figma Plugin API via `mcp__claude_ai_Figma__use_figma` and `mcp__claude_ai_Figma__get_screenshot`. Inter (Light/Regular/Medium/Light Italic) substituting for Open Sauce One. JetBrains Mono for labels and metadata.

---

## File Structure

This plan does not modify codebase files. All output lives in Figma. Node IDs are tracked here:

- **Page:** Prototype (`27:27`) — currently empty.
- **Wrapper:** `Forside · Homepage v1` — created in Task 1, ID returned and reused in every subsequent task.
- **Section frames:** one per task, appended to the wrapper.
- **Reference sources** (read-only):
  - Style tile: `10:970` → wrapper `13:2`
  - Sitemap: `5:504` → `5:505`
  - Wireframe: `5:679` → `5:680`
  - Copy frames on `23:2`: `23:5` (Hero), `23:7` (Home sektioner), `27:21` (Skræddersyede), `27:25` (Projektering), `27:23` (Process), `27:16` (Drift), `27:14` (Om os), `27:12` (Kontakt), `23:3` (Referencer)

The implementation produces no test files. "Tests" are visual screenshot inspections and structural metadata checks.

## Conventions used in every task

Every `use_figma` call assumes a fresh session. Each task's JS therefore re-loads required fonts and re-resolves the wrapper by ID. Helper functions (`rgb`, font preload list) are duplicated per task on purpose — sessions do not persist.

**Helper boilerplate** (paste verbatim at the top of every task's JS where indicated):

```js
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Light Italic" },
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "Inter", style: "Semi Bold" },
  { family: "JetBrains Mono", style: "Regular" },
  { family: "JetBrains Mono", style: "Medium" },
];
for (const f of fonts) await figma.loadFontAsync(f);

const rgb = (h) => {
  const s = h.replace("#", "");
  return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 };
};

const C = {
  bg:        "#fbfaf8", // Paper
  bgSoft:    "#ebe8e3", // Sand
  bgMuted:   "#8e8e8b", // Stone
  bgInverse: "#1c1c1a", // Ink
  fg:        "#1c1c1a",
  fgMuted:   "#3a3a38",
  fgSubtle:  "#8a8a87",
  fgInverse: "#fbfaf8",
  accent:    "#00529f",
  accentBright: "#2e86e0",
};
```

`fileKey` for every `use_figma` and `get_screenshot` call is `K8F0YDISDigg8tQ0w3z7f3`. `skillNames` for every `use_figma` call is `figma-use,figma-generate-design`.

---

### Task 1: Foundation — wrapper frame on Prototype page

**Files:**
- Create on Figma page `27:27`: a new auto-layout frame `Forside · Homepage v1`.

- [ ] **Step 1: Verify the Prototype page is empty**

Run `use_figma` with this code (no helper boilerplate needed):

```js
const page = figma.root.children.find(p => p.id === "27:27");
await figma.setCurrentPageAsync(page);
return { name: page.name, count: page.children.length };
```

Expected: `{ "name": "Prototype", "count": 0 }`. If `count > 0`, stop and ask the user — there is unexpected content.

- [ ] **Step 2: Create the wrapper frame**

Run `use_figma` with this code:

```js
const fonts = [{ family: "Inter", style: "Regular" }];
for (const f of fonts) await figma.loadFontAsync(f);

const rgb = (h) => {
  const s = h.replace("#", "");
  return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 };
};

const page = figma.root.children.find(p => p.id === "27:27");
await figma.setCurrentPageAsync(page);

const wrapper = figma.createAutoLayout("VERTICAL");
wrapper.name = "Forside · Homepage v1";
wrapper.fills = [{ type: "SOLID", color: rgb("#fbfaf8") }];
wrapper.itemSpacing = 0;
wrapper.paddingTop = 0;
wrapper.paddingBottom = 0;
wrapper.paddingLeft = 0;
wrapper.paddingRight = 0;
wrapper.primaryAxisSizingMode = "AUTO";
wrapper.counterAxisSizingMode = "FIXED";
wrapper.resize(1440, 100);
wrapper.layoutSizingHorizontal = "FIXED";
wrapper.x = 0;
wrapper.y = 0;
page.appendChild(wrapper);
wrapper.clipsContent = false;

return { wrapperId: wrapper.id };
```

Expected: a JSON response of the form `{ "wrapperId": "<id>" }`. **Record this ID — every later task uses it.**

- [ ] **Step 3: Visually verify the wrapper is in place**

Run `get_screenshot` with `nodeId = <wrapperId>`, `maxDimension = 800`. Expected: a 1440×100 Paper-coloured rectangle with no content. Acceptance: the screenshot is a flat off-white rectangle.

- [ ] **Step 4: No commit needed**

The wrapper is stored in Figma. No git changes.

---

### Task 2: Hero section

**Files:**
- Create section frame inside the wrapper (Task 1 ID).

**Section spec** (from design doc §1):
- Full-viewport (`h-svh` ≈ 900px), Ink background, atmospheric overlay.
- 12-column grid, content max-width 1440 minus gutters.
- Left text column (cols 1–7): eyebrow with accent dot, 96px display headline ("Vi tænker i helheder"), italic emphasis on "helheder.", lead paragraph.
- Right image column (cols 8–12): 4:5 image-well greybox + caption tag overlay.
- Scroll indicator at bottom centre.

- [ ] **Step 1: Visually verify the section is absent**

Run `get_screenshot` with `nodeId = <wrapperId>`, `maxDimension = 800`. Expected: the wrapper is still a flat off-white rectangle. If a hero is already there, stop — Task 2 has been run before.

- [ ] **Step 2: Build the hero section**

Run `use_figma` with this code (replace `WRAPPER_ID` with the ID from Task 1):

```js
// PASTE HELPER BOILERPLATE HERE (fonts + rgb + C)
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Light Italic" },
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
  { family: "JetBrains Mono", style: "Medium" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bg:"#fbfaf8", bgSoft:"#ebe8e3", bgInverse:"#1c1c1a", fg:"#1c1c1a", fgInverse:"#fbfaf8", accent:"#00529f", accentBright:"#2e86e0" };

const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");

// Section frame (use plain frame so we can layer absolutely-positioned overlays + grid content)
const hero = figma.createFrame();
hero.name = "01 · Hero";
hero.layoutMode = "NONE";
hero.fills = [{ type: "SOLID", color: rgb(C.bgInverse) }];
hero.resize(1440, 900);
hero.clipsContent = true;
wrapper.appendChild(hero);
hero.layoutPositioning = "AUTO";

// Background image-well (greybox, full bleed)
const bgImg = figma.createRectangle();
bgImg.name = "Hero background · drop photo here";
bgImg.fills = [{ type: "SOLID", color: rgb(C.bgSoft), opacity: 0.18 }];
bgImg.resize(1440, 900);
bgImg.x = 0; bgImg.y = 0;
hero.appendChild(bgImg);

// Atmospheric overlay (dark gradient bottom)
const overlay = figma.createRectangle();
overlay.name = "Atmospheric overlay";
overlay.resize(1440, 900);
overlay.x = 0; overlay.y = 0;
overlay.fills = [{
  type: "GRADIENT_LINEAR",
  gradientTransform: [[0,1,0],[-1,0,1]],
  gradientStops: [
    { position: 0,    color: { r: 14/255, g: 14/255, b: 13/255, a: 0.20 } },
    { position: 0.35, color: { r: 14/255, g: 14/255, b: 13/255, a: 0.05 } },
    { position: 1,    color: { r: 14/255, g: 14/255, b: 13/255, a: 0.65 } },
  ]
}];
hero.appendChild(overlay);

// Content container (auto-layout horizontal with text + image columns)
const content = figma.createAutoLayout("HORIZONTAL");
content.name = "Hero content";
content.fills = [];
content.itemSpacing = 64;
content.counterAxisAlignItems = "CENTER";
content.paddingLeft = 80;
content.paddingRight = 80;
content.resize(1440, 900);
content.x = 0; content.y = 0;
hero.appendChild(content);

// LEFT — text column (cols 1–7 ≈ 7/12 of 1280 = ~747)
const left = figma.createAutoLayout("VERTICAL");
left.name = "Hero text";
left.fills = [];
left.itemSpacing = 40;
left.primaryAxisAlignItems = "CENTER";
content.appendChild(left);
left.layoutSizingHorizontal = "FIXED";
left.resize(720, left.height);
left.layoutSizingVertical = "FILL";

// Eyebrow
const eb = figma.createAutoLayout("HORIZONTAL");
eb.fills = [];
eb.itemSpacing = 10;
eb.counterAxisAlignItems = "CENTER";
left.appendChild(eb);
const ebDot = figma.createEllipse();
ebDot.resize(7, 7);
ebDot.fills = [{ type: "SOLID", color: rgb(C.accent) }];
eb.appendChild(ebDot);
const ebText = figma.createText();
ebText.fontName = { family: "Inter", style: "Medium" };
ebText.fontSize = 12;
ebText.letterSpacing = { unit: "PERCENT", value: 14 };
ebText.characters = "20+ ÅRS ERFARING I MARITIM DESIGN";
ebText.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.75 }];
eb.appendChild(ebText);

// Headline
const h1 = figma.createText();
h1.fontName = { family: "Inter", style: "Light" };
h1.fontSize = 96;
h1.lineHeight = { unit: "PERCENT", value: 102 };
h1.letterSpacing = { unit: "PERCENT", value: -2.5 };
h1.characters = "Vi tænker\ni helheder.";
h1.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
// Italic emphasis on "helheder."
const idx = h1.characters.lastIndexOf("helheder.");
if (idx >= 0) h1.setRangeFontName(idx, idx + "helheder.".length, { family: "Inter", style: "Light Italic" });
left.appendChild(h1);
h1.layoutSizingHorizontal = "FILL";

// Lead
const lead = figma.createText();
lead.fontName = { family: "Inter", style: "Regular" };
lead.fontSize = 18;
lead.lineHeight = { unit: "PERCENT", value: 165 };
lead.characters = "Med mere end 20 års erfaring kombinerer vi teknisk ekspertise og nordisk kvalitet i hver eneste løsning. Vi skaber sikre, funktionelle og fremtidssikrede projekter, hvor alle detaljer er gennemtænkt fra projektering til drift.";
lead.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.80 }];
left.appendChild(lead);
lead.resize(460, lead.height);
lead.textAutoResize = "HEIGHT";

// RIGHT — image well (cols 8–12)
const right = figma.createAutoLayout("VERTICAL");
right.name = "Hero image column";
right.fills = [];
right.primaryAxisAlignItems = "CENTER";
right.counterAxisAlignItems = "MAX";
content.appendChild(right);
right.layoutSizingHorizontal = "FILL";
right.layoutSizingVertical = "FILL";

const imgWell = figma.createFrame();
imgWell.name = "Hero image · drop photo here";
imgWell.fills = [{ type: "SOLID", color: rgb(C.bgSoft) }];
imgWell.resize(420, 525); // 4:5 ratio
imgWell.clipsContent = true;
imgWell.effects = [{
  type: "DROP_SHADOW",
  color: { r: 14/255, g: 14/255, b: 13/255, a: 0.32 },
  offset: { x: 0, y: 24 }, radius: 64, spread: 0,
  visible: true, blendMode: "NORMAL"
}];
right.appendChild(imgWell);

// Caption tag inside the image well, bottom-left
const caption = figma.createFrame();
caption.name = "Hero caption tag";
caption.layoutMode = "HORIZONTAL";
caption.fills = [{ type: "SOLID", color: { r: 14/255, g: 14/255, b: 13/255 }, opacity: 0.42 }];
caption.paddingLeft = 12; caption.paddingRight = 12;
caption.paddingTop = 6; caption.paddingBottom = 6;
caption.primaryAxisSizingMode = "AUTO";
caption.counterAxisSizingMode = "AUTO";
caption.effects = [{ type: "BACKGROUND_BLUR", radius: 18, visible: true }];
const capText = figma.createText();
capText.fontName = { family: "JetBrains Mono", style: "Regular" };
capText.fontSize = 11;
capText.letterSpacing = { unit: "PERCENT", value: 8 };
capText.characters = "ISLANDS BRYGGES HAVNEBAD · UDVALGT PROJEKT";
capText.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.9 }];
caption.appendChild(capText);
imgWell.appendChild(caption);
caption.x = 12;
caption.y = 525 - caption.height - 12;

// Scroll indicator at bottom centre
const scroll = figma.createAutoLayout("VERTICAL");
scroll.name = "Scroll indicator";
scroll.fills = [];
scroll.itemSpacing = 12;
scroll.counterAxisAlignItems = "CENTER";
hero.appendChild(scroll);
const scrollLabel = figma.createText();
scrollLabel.fontName = { family: "Inter", style: "Regular" };
scrollLabel.fontSize = 10;
scrollLabel.letterSpacing = { unit: "PERCENT", value: 28 };
scrollLabel.characters = "SCROLL";
scrollLabel.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.55 }];
scroll.appendChild(scrollLabel);
const scrollLine = figma.createRectangle();
scrollLine.resize(1, 44);
scrollLine.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.20 }];
scroll.appendChild(scrollLine);
scroll.x = 1440 / 2 - scroll.width / 2;
scroll.y = 900 - scroll.height - 36;

return { heroId: hero.id };
```

- [ ] **Step 3: Verify the hero rendered correctly**

Run `get_screenshot` with `nodeId = <heroId>`, `maxDimension = 1440`.

Expected:
- Dark Ink background fills the frame.
- Atmospheric gradient visible top-to-bottom.
- "Vi tænker / i helheder." headline left, with italic "helheder." (lighter weight, italic glyphs).
- Lead paragraph below the headline, max 460px wide, slightly transparent.
- Sand-coloured 4:5 image-well on the right with drop shadow.
- Mono caption tag in the bottom-left of the image-well, dark backdrop.
- Centered "SCROLL" indicator at the bottom.

If anything is missing or mis-positioned, fix with a targeted `use_figma` patch — do not rebuild.

- [ ] **Step 4: No commit needed**

---

### Task 3: Manifesto section

**Section spec** (design doc §2): Paper surface, full-bleed `--space-major` padding, eyebrow + statement headline + sub-paragraph centred at max-prose width.

- [ ] **Step 1: Verify section is absent**

Run `get_screenshot` with `nodeId = <wrapperId>`, `maxDimension = 1440`. Expected: only Hero is visible. The frame below Hero is empty Paper.

- [ ] **Step 2: Build the manifesto**

Run `use_figma`. Replace `WRAPPER_ID` with Task 1 wrapper ID:

```js
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bg:"#fbfaf8", fg:"#1c1c1a", fgMuted:"#3a3a38", fgSubtle:"#8a8a87", accent:"#00529f" };

const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");

const sec = figma.createAutoLayout("VERTICAL");
sec.name = "02 · Manifesto";
sec.fills = [{ type: "SOLID", color: rgb(C.bg) }];
sec.paddingLeft = 80; sec.paddingRight = 80;
sec.paddingTop = 144; sec.paddingBottom = 144;
sec.itemSpacing = 32;
sec.primaryAxisAlignItems = "MIN";
wrapper.appendChild(sec);
sec.layoutSizingHorizontal = "FILL";

// Eyebrow
const eb = figma.createText();
eb.fontName = { family: "JetBrains Mono", style: "Regular" };
eb.fontSize = 11;
eb.letterSpacing = { unit: "PERCENT", value: 18 };
eb.characters = "OM ARBEJDET / FILOSOFI";
eb.fills = [{ type: "SOLID", color: rgb(C.fgSubtle) }];
sec.appendChild(eb);

// Statement
const stmt = figma.createText();
stmt.fontName = { family: "Inter", style: "Light" };
stmt.fontSize = 64;
stmt.lineHeight = { unit: "PERCENT", value: 120 };
stmt.letterSpacing = { unit: "PERCENT", value: -1.5 };
stmt.characters = "Vi forstår havet — og de unikke udfordringer, der følger med vand, vind og vejr.";
stmt.fills = [{ type: "SOLID", color: rgb(C.fg) }];
sec.appendChild(stmt);
stmt.resize(1024, stmt.height);
stmt.textAutoResize = "HEIGHT";

// Sub
const sub = figma.createText();
sub.fontName = { family: "Inter", style: "Regular" };
sub.fontSize = 18;
sub.lineHeight = { unit: "PERCENT", value: 165 };
sub.characters = "Vi har arbejdet med strøm, tidevand, vind og bølglaster. Enhver havn er forskellig — og vi ved, hvordan man skaber den perfekte løsning.";
sub.fills = [{ type: "SOLID", color: rgb(C.fgMuted) }];
sec.appendChild(sub);
sub.resize(560, sub.height);
sub.textAutoResize = "HEIGHT";

return { manifestoId: sec.id };
```

- [ ] **Step 3: Verify the manifesto rendered correctly**

Run `get_screenshot` with `nodeId = <manifestoId>`, `maxDimension = 1440`.

Expected: Paper-coloured section, mono uppercase eyebrow at top-left, very large statement spanning ~1024px wide in two/three lines, sub-paragraph below at ~560px wide. Whitespace dominates. No images.

- [ ] **Step 4: No commit needed**

---

### Task 4: Hvad vi tilbyder (Services) — 3 cards

**Section spec** (design doc §3): Sand surface, two-row header (left = eyebrow + headline, right = lead), three equal-height cards (Projektering, Bygning, Drift) below.

- [ ] **Step 1: Build the services section**

Run `use_figma`. Replace `WRAPPER_ID`:

```js
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
  { family: "JetBrains Mono", style: "Medium" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bg:"#fbfaf8", bgSoft:"#ebe8e3", fg:"#1c1c1a", fgMuted:"#3a3a38", fgSubtle:"#8a8a87", accent:"#00529f" };

const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");

const sec = figma.createAutoLayout("VERTICAL");
sec.name = "03 · Hvad vi tilbyder";
sec.fills = [{ type: "SOLID", color: rgb(C.bgSoft) }];
sec.paddingLeft = 80; sec.paddingRight = 80;
sec.paddingTop = 144; sec.paddingBottom = 144;
sec.itemSpacing = 80;
wrapper.appendChild(sec);
sec.layoutSizingHorizontal = "FILL";

// Section header (two-column)
const head = figma.createAutoLayout("HORIZONTAL");
head.fills = [];
head.itemSpacing = 80;
head.counterAxisAlignItems = "MIN";
sec.appendChild(head);
head.layoutSizingHorizontal = "FILL";

const headLeft = figma.createAutoLayout("VERTICAL");
headLeft.fills = [];
headLeft.itemSpacing = 24;
head.appendChild(headLeft);
headLeft.resize(620, headLeft.height);
headLeft.layoutSizingVertical = "HUG";

const eb = figma.createText();
eb.fontName = { family: "JetBrains Mono", style: "Medium" };
eb.fontSize = 11;
eb.letterSpacing = { unit: "PERCENT", value: 14 };
eb.characters = "01 / HVAD VI TILBYDER";
eb.fills = [{ type: "SOLID", color: rgb(C.fgSubtle) }];
headLeft.appendChild(eb);

const title = figma.createText();
title.fontName = { family: "Inter", style: "Light" };
title.fontSize = 56;
title.lineHeight = { unit: "PERCENT", value: 105 };
title.letterSpacing = { unit: "PERCENT", value: -2 };
title.characters = "Tre kompetencer,\nén partner.";
title.fills = [{ type: "SOLID", color: rgb(C.fg) }];
headLeft.appendChild(title);
title.layoutSizingHorizontal = "FILL";

const headLead = figma.createText();
headLead.fontName = { family: "Inter", style: "Regular" };
headLead.fontSize = 16;
headLead.lineHeight = { unit: "PERCENT", value: 170 };
headLead.characters = "Hos C.C. Design tilbyder vi komplette løsninger inden for broer, marinaer og flydende konstruktioner. Fra idé til bygning – vi tager hånd om hele processen, så du får en tryg og samlet løsning på ét sted.";
headLead.fills = [{ type: "SOLID", color: rgb(C.fgMuted) }];
head.appendChild(headLead);
headLead.resize(440, headLead.height);
headLead.textAutoResize = "HEIGHT";

// Cards row
const row = figma.createAutoLayout("HORIZONTAL");
row.fills = [];
row.itemSpacing = 24;
sec.appendChild(row);
row.layoutSizingHorizontal = "FILL";

function makeCard(num, eyebrow, titleStr, desc, link) {
  const card = figma.createAutoLayout("VERTICAL");
  card.name = `Service · ${eyebrow}`;
  card.fills = [{ type: "SOLID", color: rgb(C.bg) }];
  card.strokes = [{ type: "SOLID", color: rgb(C.fg), opacity: 0.08 }];
  card.strokeWeight = 1;
  card.paddingLeft = 32; card.paddingRight = 32;
  card.paddingTop = 32; card.paddingBottom = 32;
  card.itemSpacing = 24;
  card.primaryAxisAlignItems = "MIN";

  const ebT = figma.createText();
  ebT.fontName = { family: "JetBrains Mono", style: "Medium" };
  ebT.fontSize = 11;
  ebT.letterSpacing = { unit: "PERCENT", value: 14 };
  ebT.characters = `${num} / ${eyebrow.toUpperCase()}`;
  ebT.fills = [{ type: "SOLID", color: rgb(C.fgSubtle) }];
  card.appendChild(ebT);

  const tT = figma.createText();
  tT.fontName = { family: "Inter", style: "Regular" };
  tT.fontSize = 28;
  tT.lineHeight = { unit: "PERCENT", value: 110 };
  tT.letterSpacing = { unit: "PERCENT", value: -1 };
  tT.characters = titleStr;
  tT.fills = [{ type: "SOLID", color: rgb(C.fg) }];
  card.appendChild(tT);
  tT.layoutSizingHorizontal = "FILL";

  const dT = figma.createText();
  dT.fontName = { family: "Inter", style: "Regular" };
  dT.fontSize = 15;
  dT.lineHeight = { unit: "PERCENT", value: 165 };
  dT.characters = desc;
  dT.fills = [{ type: "SOLID", color: rgb(C.fgMuted) }];
  card.appendChild(dT);
  dT.layoutSizingHorizontal = "FILL";

  // Spacer push
  const spacer = figma.createFrame();
  spacer.fills = [];
  spacer.resize(1, 1);
  card.appendChild(spacer);
  spacer.layoutGrow = 1;

  // Link
  const linkRow = figma.createAutoLayout("HORIZONTAL");
  linkRow.fills = [];
  linkRow.itemSpacing = 12;
  linkRow.counterAxisAlignItems = "CENTER";
  card.appendChild(linkRow);
  const linkText = figma.createText();
  linkText.fontName = { family: "Inter", style: "Medium" };
  linkText.fontSize = 13;
  linkText.letterSpacing = { unit: "PERCENT", value: 18 };
  linkText.characters = link.toUpperCase();
  linkText.fills = [{ type: "SOLID", color: rgb(C.fg) }];
  linkRow.appendChild(linkText);
  const linkArrow = figma.createText();
  linkArrow.fontName = { family: "Inter", style: "Regular" };
  linkArrow.fontSize = 14;
  linkArrow.characters = "→";
  linkArrow.fills = [{ type: "SOLID", color: rgb(C.fg) }];
  linkRow.appendChild(linkArrow);

  return card;
}

const cards = [
  makeCard("01", "PROJEKTERING", "Projektering & rådgivning",
    "Tegninger, beregninger og myndighedsgodkendelser. Et gennemtænkt fundament før byggeriet starter — så uforudsete udgifter minimeres.",
    "Læs mere"),
  makeCard("02", "BYGNING", "Fra idé til færdig løsning",
    "Komplet entreprise — produktion, montering og aflevering. Én samarbejdspartner hele vejen, med fokus på kvalitet og holdbarhed.",
    "Læs mere"),
  makeCard("03", "DRIFT", "Drift & vedligehold",
    "Faste serviceaftaler eller enkeltstående eftersyn — over og under vand. Vi sikrer lang levetid og høj sikkerhed år efter år.",
    "Læs mere"),
];
for (const c of cards) {
  row.appendChild(c);
  c.layoutSizingHorizontal = "FILL";
  c.layoutSizingVertical = "FIXED";
  c.resize(c.width, 380);
}

return { servicesId: sec.id };
```

- [ ] **Step 2: Verify rendering**

Run `get_screenshot` with `nodeId = <servicesId>`, `maxDimension = 1440`.

Expected: Sand-coloured section, two-row header (left: eyebrow + 56px headline "Tre kompetencer, én partner.", right: lead at 440px wide), three equal-height Paper cards below with Ink/8% borders, mono eyebrow at top of each card, 28px title, 15px description, "LÆS MERE →" link at bottom.

- [ ] **Step 3: No commit needed**

---

### Task 5: Sådan arbejder vi (Process) — 5 horizontal steps

**Section spec** (design doc §4): Paper surface, section header, 5 columns each with hairline-on-top, mono accent number, Open Sauce Light step title, body description.

- [ ] **Step 1: Build the process section**

Run `use_figma`. Replace `WRAPPER_ID`:

```js
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
  { family: "JetBrains Mono", style: "Medium" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bg:"#fbfaf8", fg:"#1c1c1a", fgMuted:"#3a3a38", fgSubtle:"#8a8a87", accent:"#00529f" };

const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");

const sec = figma.createAutoLayout("VERTICAL");
sec.name = "04 · Sådan arbejder vi";
sec.fills = [{ type: "SOLID", color: rgb(C.bg) }];
sec.paddingLeft = 80; sec.paddingRight = 80;
sec.paddingTop = 144; sec.paddingBottom = 144;
sec.itemSpacing = 80;
wrapper.appendChild(sec);
sec.layoutSizingHorizontal = "FILL";

// Header
const head = figma.createAutoLayout("HORIZONTAL");
head.fills = []; head.itemSpacing = 80; head.counterAxisAlignItems = "MIN";
sec.appendChild(head); head.layoutSizingHorizontal = "FILL";

const headLeft = figma.createAutoLayout("VERTICAL");
headLeft.fills = []; headLeft.itemSpacing = 24;
head.appendChild(headLeft);
headLeft.resize(620, headLeft.height);
headLeft.layoutSizingVertical = "HUG";

const eb = figma.createText();
eb.fontName = { family: "JetBrains Mono", style: "Medium" };
eb.fontSize = 11; eb.letterSpacing = { unit: "PERCENT", value: 14 };
eb.characters = "02 / PROCES";
eb.fills = [{ type: "SOLID", color: rgb(C.fgSubtle) }];
headLeft.appendChild(eb);

const title = figma.createText();
title.fontName = { family: "Inter", style: "Light" };
title.fontSize = 56; title.lineHeight = { unit: "PERCENT", value: 105 };
title.letterSpacing = { unit: "PERCENT", value: -2 };
title.characters = "Fra første samtale\ntil færdigt anlæg.";
title.fills = [{ type: "SOLID", color: rgb(C.fg) }];
headLeft.appendChild(title);
title.layoutSizingHorizontal = "FILL";

const lead = figma.createText();
lead.fontName = { family: "Inter", style: "Regular" };
lead.fontSize = 16; lead.lineHeight = { unit: "PERCENT", value: 170 };
lead.characters = "Hos os får du én samlet samarbejdspartner, der følger projektet hele vejen — så du slipper for besvær og kan være tryg gennem hele forløbet. Vi tænker i helheder.";
lead.fills = [{ type: "SOLID", color: rgb(C.fgMuted) }];
head.appendChild(lead);
lead.resize(440, lead.height);
lead.textAutoResize = "HEIGHT";

// Steps row
const row = figma.createAutoLayout("HORIZONTAL");
row.fills = []; row.itemSpacing = 24;
sec.appendChild(row); row.layoutSizingHorizontal = "FILL";

const steps = [
  ["01", "Idé & rådgivning",       "Vi drøfter dine ønsker og finder den bedste løsning ud fra placering, miljø og anvendelse."],
  ["02", "Projektering",           "Tegninger, beregninger og myndighedsgodkendelser — alt klar inden første spadestik."],
  ["03", "Produktion & bygning",   "Hele udførelsen, med fokus på kvalitet, sikkerhed og holdbarhed."],
  ["04", "Montering & aflevering", "Tryg proces fra start til slut. Vi afleverer et anlæg, der er klar til brug."],
  ["05", "Drift & vedligehold",    "Løbende eftersyn og service. Lang levetid år efter år."],
];

for (const [num, t, d] of steps) {
  const col = figma.createAutoLayout("VERTICAL");
  col.fills = [];
  col.itemSpacing = 18;
  col.paddingTop = 24;

  // Hairline at top
  const line = figma.createRectangle();
  line.resize(100, 1);
  line.fills = [{ type: "SOLID", color: rgb(C.fg), opacity: 0.15 }];

  // accent stub on top of line (left aligned)
  const accentStub = figma.createRectangle();
  accentStub.resize(36, 1);
  accentStub.fills = [{ type: "SOLID", color: rgb(C.accent) }];

  // Wrap line in its own container so we can layer the accent
  const lineWrap = figma.createFrame();
  lineWrap.fills = []; lineWrap.layoutMode = "NONE";
  lineWrap.resize(100, 1);
  lineWrap.appendChild(line);
  lineWrap.appendChild(accentStub);
  line.x = 0; line.y = 0;
  accentStub.x = 0; accentStub.y = 0;
  col.insertChild(0, lineWrap);
  lineWrap.layoutSizingHorizontal = "FILL";
  line.layoutSizingHorizontal = undefined; // line is non-autolayout child of frame
  // Fall back: resize line to lineWrap width via post-step below

  const numT = figma.createText();
  numT.fontName = { family: "JetBrains Mono", style: "Medium" };
  numT.fontSize = 12;
  numT.letterSpacing = { unit: "PERCENT", value: 14 };
  numT.characters = num;
  numT.fills = [{ type: "SOLID", color: rgb(C.accent) }];
  col.appendChild(numT);

  const titleT = figma.createText();
  titleT.fontName = { family: "Inter", style: "Light" };
  titleT.fontSize = 24;
  titleT.lineHeight = { unit: "PERCENT", value: 110 };
  titleT.letterSpacing = { unit: "PERCENT", value: -1 };
  titleT.characters = t;
  titleT.fills = [{ type: "SOLID", color: rgb(C.fg) }];
  col.appendChild(titleT);
  titleT.layoutSizingHorizontal = "FILL";

  const descT = figma.createText();
  descT.fontName = { family: "Inter", style: "Regular" };
  descT.fontSize = 15;
  descT.lineHeight = { unit: "PERCENT", value: 165 };
  descT.characters = d;
  descT.fills = [{ type: "SOLID", color: rgb(C.fgMuted) }];
  col.appendChild(descT);
  descT.layoutSizingHorizontal = "FILL";

  row.appendChild(col);
  col.layoutSizingHorizontal = "FILL";
  // Now lineWrap fills, and line+accent inside need their widths set:
  line.resize(lineWrap.width, 1);
  // accentStub stays 36px
}

return { processId: sec.id };
```

- [ ] **Step 2: Verify rendering**

Run `get_screenshot` with `nodeId = <processId>`, `maxDimension = 1440`.

Expected: Paper section, header same pattern as Services, 5 equal-width columns each with: a hairline at top with a short accent-blue stub left, mono accent number ("01"…"05"), Open Sauce Light 24px step title, body 15/165 description.

- [ ] **Step 3: No commit needed**

---

### Task 6: Udvalgte projekter (Referencer) — 3 project cards

**Section spec** (design doc §5): Paper surface, header with right-aligned "Se alle referencer →" link, 3-column grid of project cards (image well + mono caption + title).

- [ ] **Step 1: Build the projects section**

Run `use_figma`. Replace `WRAPPER_ID`:

```js
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
  { family: "JetBrains Mono", style: "Medium" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bg:"#fbfaf8", bgSoft:"#ebe8e3", fg:"#1c1c1a", fgMuted:"#3a3a38", fgSubtle:"#8a8a87", accent:"#00529f" };

const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");

const sec = figma.createAutoLayout("VERTICAL");
sec.name = "05 · Udvalgte projekter";
sec.fills = [{ type: "SOLID", color: rgb(C.bg) }];
sec.paddingLeft = 80; sec.paddingRight = 80;
sec.paddingTop = 144; sec.paddingBottom = 144;
sec.itemSpacing = 64;
wrapper.appendChild(sec);
sec.layoutSizingHorizontal = "FILL";

// Header (eyebrow + headline left, link right)
const head = figma.createAutoLayout("HORIZONTAL");
head.fills = []; head.itemSpacing = 80;
head.primaryAxisAlignItems = "SPACE_BETWEEN";
head.counterAxisAlignItems = "MAX";
sec.appendChild(head); head.layoutSizingHorizontal = "FILL";

const headLeft = figma.createAutoLayout("VERTICAL");
headLeft.fills = []; headLeft.itemSpacing = 24;
head.appendChild(headLeft);

const eb = figma.createText();
eb.fontName = { family: "JetBrains Mono", style: "Medium" };
eb.fontSize = 11; eb.letterSpacing = { unit: "PERCENT", value: 14 };
eb.characters = "03 / REFERENCER";
eb.fills = [{ type: "SOLID", color: rgb(C.fgSubtle) }];
headLeft.appendChild(eb);

const title = figma.createText();
title.fontName = { family: "Inter", style: "Light" };
title.fontSize = 56; title.lineHeight = { unit: "PERCENT", value: 105 };
title.letterSpacing = { unit: "PERCENT", value: -2 };
title.characters = "Udvalgte projekter.";
title.fills = [{ type: "SOLID", color: rgb(C.fg) }];
headLeft.appendChild(title);

// Right link
const linkWrap = figma.createAutoLayout("VERTICAL");
linkWrap.fills = []; linkWrap.itemSpacing = 6;
head.appendChild(linkWrap);

const linkRow = figma.createAutoLayout("HORIZONTAL");
linkRow.fills = []; linkRow.itemSpacing = 12; linkRow.counterAxisAlignItems = "CENTER";
linkRow.paddingBottom = 6;
linkWrap.appendChild(linkRow);
const linkT = figma.createText();
linkT.fontName = { family: "Inter", style: "Medium" };
linkT.fontSize = 13; linkT.letterSpacing = { unit: "PERCENT", value: 18 };
linkT.characters = "SE ALLE REFERENCER";
linkT.fills = [{ type: "SOLID", color: rgb(C.fg) }];
linkRow.appendChild(linkT);
const linkA = figma.createText();
linkA.fontName = { family: "Inter", style: "Regular" };
linkA.fontSize = 14; linkA.characters = "→";
linkA.fills = [{ type: "SOLID", color: rgb(C.fg) }];
linkRow.appendChild(linkA);
const linkLine = figma.createRectangle();
linkLine.resize(220, 1);
linkLine.fills = [{ type: "SOLID", color: rgb(C.fg) }];
linkWrap.appendChild(linkLine);

// Project cards row
const row = figma.createAutoLayout("HORIZONTAL");
row.fills = []; row.itemSpacing = 24;
sec.appendChild(row); row.layoutSizingHorizontal = "FILL";

function makeProject(num, capLoc, capYear, capStatus, titleStr, descStr) {
  const card = figma.createAutoLayout("VERTICAL");
  card.name = `Project ${num} · ${titleStr}`;
  card.fills = [];
  card.itemSpacing = 20;

  const img = figma.createFrame();
  img.name = `Project ${num} · ${titleStr} · drop photo here`;
  img.fills = [{ type: "SOLID", color: rgb(C.bgSoft) }];
  img.resize(400, 300); // 4:3 placeholder; FILL handles real size
  img.clipsContent = true;
  card.appendChild(img);
  img.layoutSizingHorizontal = "FILL";

  const meta = figma.createAutoLayout("VERTICAL");
  meta.fills = []; meta.itemSpacing = 8;
  card.appendChild(meta);
  meta.layoutSizingHorizontal = "FILL";

  const cap = figma.createText();
  cap.fontName = { family: "JetBrains Mono", style: "Regular" };
  cap.fontSize = 11; cap.letterSpacing = { unit: "PERCENT", value: 12 };
  const parts = [capLoc, capYear, capStatus].filter(Boolean);
  cap.characters = parts.join(" · ").toUpperCase();
  cap.fills = [{ type: "SOLID", color: rgb(C.fgSubtle) }];
  meta.appendChild(cap);

  const tT = figma.createText();
  tT.fontName = { family: "Inter", style: "Regular" };
  tT.fontSize = 28; tT.lineHeight = { unit: "PERCENT", value: 110 };
  tT.letterSpacing = { unit: "PERCENT", value: -1 };
  tT.characters = titleStr;
  tT.fills = [{ type: "SOLID", color: rgb(C.fg) }];
  meta.appendChild(tT);
  tT.layoutSizingHorizontal = "FILL";

  const dT = figma.createText();
  dT.fontName = { family: "Inter", style: "Regular" };
  dT.fontSize = 15; dT.lineHeight = { unit: "PERCENT", value: 165 };
  dT.characters = descStr;
  dT.fills = [{ type: "SOLID", color: rgb(C.fgMuted) }];
  meta.appendChild(dT);
  dT.layoutSizingHorizontal = "FILL";

  return card;
}

const projects = [
  makeProject("01", "København", "2024", "Konstrueret", "Islands Brygges Havnebad",
    "Renovering og udvidelse af et af Københavns mest brugte havnebade. Total entreprise."),
  makeProject("02", "Aarhus", "2023", "", "Aarhus Havnebad",
    "Nyt havnebadsanlæg på Aarhus havn — fra projektering til montering."),
  makeProject("03", "København", "2022", "", "Den flydende kirke",
    "Specialdesignet flydende konstruktion til kirkelige formål i indre havn."),
];
for (const p of projects) {
  row.appendChild(p);
  p.layoutSizingHorizontal = "FILL";
}

// Image-well height — set after layout so they're consistent
for (const p of projects) {
  const img = p.children[0];
  img.resize(img.width, 320);
}

return { projectsId: sec.id };
```

- [ ] **Step 2: Verify rendering**

Run `get_screenshot` with `nodeId = <projectsId>`, `maxDimension = 1440`.

Expected: Paper section. Header has eyebrow + 56px "Udvalgte projekter." headline on the left and "SE ALLE REFERENCER →" link with bottom underline on the right (right-aligned, baseline-aligned with headline). Three equal-width project cards: each with a Sand image-well (4:3-ish), mono uppercase caption "KØBENHAVN · 2024 · KONSTRUERET", 28px title, body description.

- [ ] **Step 3: No commit needed**

---

### Task 7: Tal & klientel (Trust band)

**Section spec** (design doc §6): Ink surface, single eyebrow, top row of 4 stats with huge numerals + mono labels, bottom row centred logo strip with hairline above.

- [ ] **Step 1: Build the trust band**

Run `use_figma`. Replace `WRAPPER_ID`:

```js
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bgInverse:"#1c1c1a", bgSoft:"#ebe8e3", fgInverse:"#fbfaf8" };

const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");

const sec = figma.createAutoLayout("VERTICAL");
sec.name = "06 · Tal & klientel";
sec.fills = [{ type: "SOLID", color: rgb(C.bgInverse) }];
sec.paddingLeft = 80; sec.paddingRight = 80;
sec.paddingTop = 144; sec.paddingBottom = 144;
sec.itemSpacing = 64;
wrapper.appendChild(sec);
sec.layoutSizingHorizontal = "FILL";

// Eyebrow
const eb = figma.createText();
eb.fontName = { family: "JetBrains Mono", style: "Regular" };
eb.fontSize = 11;
eb.letterSpacing = { unit: "PERCENT", value: 18 };
eb.characters = "04 / TILLID — TAL & KLIENTEL";
eb.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.55 }];
sec.appendChild(eb);

// Stats row
const statsRow = figma.createAutoLayout("HORIZONTAL");
statsRow.fills = []; statsRow.itemSpacing = 24;
sec.appendChild(statsRow); statsRow.layoutSizingHorizontal = "FILL";

const stats = [
  ["30+",   "ÅRS ERFARING"],
  ["200+",  "PROJEKTER LEVERET"],
  ["12+",   "MEDARBEJDERE"],
  ["Total", "ENTREPRENØR"],
];
for (const [n, l] of stats) {
  const col = figma.createAutoLayout("VERTICAL");
  col.fills = []; col.itemSpacing = 16;
  const num = figma.createText();
  num.fontName = { family: "Inter", style: "Light" };
  num.fontSize = 80; num.lineHeight = { unit: "PERCENT", value: 100 };
  num.letterSpacing = { unit: "PERCENT", value: -2 };
  num.characters = n;
  num.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
  col.appendChild(num);
  const lbl = figma.createText();
  lbl.fontName = { family: "JetBrains Mono", style: "Regular" };
  lbl.fontSize = 11; lbl.letterSpacing = { unit: "PERCENT", value: 18 };
  lbl.characters = l;
  lbl.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.55 }];
  col.appendChild(lbl);
  statsRow.appendChild(col);
  col.layoutSizingHorizontal = "FILL";
}

// Hairline divider
const hairline = figma.createRectangle();
hairline.resize(1, 1);
hairline.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.15 }];
const hairlineWrap = figma.createAutoLayout("VERTICAL");
hairlineWrap.fills = [];
hairlineWrap.appendChild(hairline);
sec.appendChild(hairlineWrap);
hairlineWrap.layoutSizingHorizontal = "FILL";
hairline.layoutSizingHorizontal = "FILL";

// Logos row
const logos = figma.createAutoLayout("HORIZONTAL");
logos.fills = []; logos.itemSpacing = 32;
logos.primaryAxisAlignItems = "CENTER";
logos.counterAxisAlignItems = "CENTER";
sec.appendChild(logos); logos.layoutSizingHorizontal = "FILL";

for (let i = 1; i <= 7; i++) {
  const logoBox = figma.createFrame();
  logoBox.name = `Klientlogo ${i}`;
  logoBox.fills = [{ type: "SOLID", color: rgb(C.bgSoft), opacity: 0.08 }];
  logoBox.resize(140, 56);
  logos.appendChild(logoBox);
}

return { trustId: sec.id };
```

- [ ] **Step 2: Verify rendering**

Run `get_screenshot` with `nodeId = <trustId>`, `maxDimension = 1440`.

Expected: Ink section. Mono uppercase eyebrow at top. Four stats (30+, 200+, 12+, Total) in equal columns at 80px Open Sauce Light, mono labels below. Hairline divider. Centred row of 7 dim logo greyboxes (140×56 each).

- [ ] **Step 3: No commit needed**

---

### Task 8: Testimonial

**Section spec** (design doc §7): Sand surface, centred eyebrow, large pull quote, attribution.

- [ ] **Step 1: Build the testimonial**

Run `use_figma`. Replace `WRAPPER_ID`:

```js
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bgSoft:"#ebe8e3", fg:"#1c1c1a", fgMuted:"#3a3a38", fgSubtle:"#8a8a87" };

const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");

const sec = figma.createAutoLayout("VERTICAL");
sec.name = "07 · Testimonial";
sec.fills = [{ type: "SOLID", color: rgb(C.bgSoft) }];
sec.paddingLeft = 80; sec.paddingRight = 80;
sec.paddingTop = 144; sec.paddingBottom = 144;
sec.itemSpacing = 40;
sec.counterAxisAlignItems = "MIN";
wrapper.appendChild(sec);
sec.layoutSizingHorizontal = "FILL";

const eb = figma.createText();
eb.fontName = { family: "JetBrains Mono", style: "Regular" };
eb.fontSize = 11; eb.letterSpacing = { unit: "PERCENT", value: 18 };
eb.characters = "KLIENTORD";
eb.fills = [{ type: "SOLID", color: rgb(C.fgSubtle) }];
sec.appendChild(eb);

const quote = figma.createText();
quote.fontName = { family: "Inter", style: "Light" };
quote.fontSize = 40;
quote.lineHeight = { unit: "PERCENT", value: 130 };
quote.letterSpacing = { unit: "PERCENT", value: -1.5 };
quote.characters = "C.C. Design er den eneste partner vi har mødt, der reelt forstår havet — og hvordan man bygger anlæg der holder.";
quote.fills = [{ type: "SOLID", color: rgb(C.fg) }];
sec.appendChild(quote);
quote.resize(1024, quote.height);
quote.textAutoResize = "HEIGHT";

const attribRow = figma.createAutoLayout("HORIZONTAL");
attribRow.fills = []; attribRow.itemSpacing = 16;
attribRow.counterAxisAlignItems = "CENTER";
sec.appendChild(attribRow);

const stub = figma.createRectangle();
stub.resize(32, 1);
stub.fills = [{ type: "SOLID", color: rgb(C.fgMuted) }];
attribRow.appendChild(stub);

const attrib = figma.createText();
attrib.fontName = { family: "JetBrains Mono", style: "Regular" };
attrib.fontSize = 12; attrib.letterSpacing = { unit: "PERCENT", value: 12 };
attrib.characters = "[NAVN], [STILLING], [FIRMA]";
attrib.fills = [{ type: "SOLID", color: rgb(C.fgMuted) }];
attribRow.appendChild(attrib);

return { testimonialId: sec.id };
```

- [ ] **Step 2: Verify rendering**

Run `get_screenshot` with `nodeId = <testimonialId>`, `maxDimension = 1440`.

Expected: Sand section. Mono "KLIENTORD" eyebrow top-left. Large 40px Open Sauce Light pull quote at ~1024px wide. Below it: a 32px hairline + mono uppercase attribution placeholder "[NAVN], [STILLING], [FIRMA]".

- [ ] **Step 3: No commit needed**

---

### Task 9: Kontakt section

**Section spec** (design doc §8): Ink surface, two-column layout (left = headline + CTA + direct contact, right = form with bottom-line-only inputs).

- [ ] **Step 1: Build the kontakt section**

Run `use_figma`. Replace `WRAPPER_ID`:

```js
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bgInverse:"#1c1c1a", fgInverse:"#fbfaf8", fg:"#1c1c1a", accent:"#00529f", accentBright:"#2e86e0" };

const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");

const sec = figma.createAutoLayout("HORIZONTAL");
sec.name = "08 · Kontakt";
sec.fills = [{ type: "SOLID", color: rgb(C.bgInverse) }];
sec.paddingLeft = 80; sec.paddingRight = 80;
sec.paddingTop = 144; sec.paddingBottom = 144;
sec.itemSpacing = 80;
sec.counterAxisAlignItems = "MIN";
wrapper.appendChild(sec);
sec.layoutSizingHorizontal = "FILL";

// LEFT
const left = figma.createAutoLayout("VERTICAL");
left.fills = []; left.itemSpacing = 32;
sec.appendChild(left); left.layoutSizingHorizontal = "FILL";

const eb = figma.createText();
eb.fontName = { family: "JetBrains Mono", style: "Regular" };
eb.fontSize = 11; eb.letterSpacing = { unit: "PERCENT", value: 18 };
eb.characters = "05 / KONTAKT";
eb.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.55 }];
left.appendChild(eb);

const headline = figma.createText();
headline.fontName = { family: "Inter", style: "Light" };
headline.fontSize = 80;
headline.lineHeight = { unit: "PERCENT", value: 102 };
headline.letterSpacing = { unit: "PERCENT", value: -2.5 };
headline.characters = "Lad os tale\nsammen.";
headline.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
left.appendChild(headline);
headline.layoutSizingHorizontal = "FILL";

const lead = figma.createText();
lead.fontName = { family: "Inter", style: "Regular" };
lead.fontSize = 18; lead.lineHeight = { unit: "PERCENT", value: 165 };
lead.characters = "God kontakt er den bedste forudsætning — og den får du her. Skriv et par ord om dit projekt, så vender vi tilbage.";
lead.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.7 }];
left.appendChild(lead);
lead.resize(440, lead.height);
lead.textAutoResize = "HEIGHT";

// CTA (outlined on dark)
const cta = figma.createAutoLayout("HORIZONTAL");
cta.fills = [];
cta.strokes = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.45 }];
cta.strokeWeight = 1;
cta.paddingLeft = 20; cta.paddingRight = 16;
cta.paddingTop = 16; cta.paddingBottom = 16;
cta.itemSpacing = 14;
cta.counterAxisAlignItems = "CENTER";
left.appendChild(cta);

const ctaDot = figma.createEllipse();
ctaDot.resize(7, 7);
ctaDot.fills = [{ type: "SOLID", color: rgb(C.accentBright) }];
cta.appendChild(ctaDot);

const ctaT = figma.createText();
ctaT.fontName = { family: "Inter", style: "Medium" };
ctaT.fontSize = 13; ctaT.letterSpacing = { unit: "PERCENT", value: 20 };
ctaT.characters = "SEND FORESPØRGSEL";
ctaT.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
cta.appendChild(ctaT);

const ctaArrow = figma.createText();
ctaArrow.fontName = { family: "Inter", style: "Regular" };
ctaArrow.fontSize = 14;
ctaArrow.characters = "→";
ctaArrow.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
cta.appendChild(ctaArrow);

// Direct contact block
const contact = figma.createAutoLayout("VERTICAL");
contact.fills = []; contact.itemSpacing = 8;
contact.paddingTop = 32;
left.appendChild(contact); contact.layoutSizingHorizontal = "FILL";

const contactLbl = figma.createText();
contactLbl.fontName = { family: "JetBrains Mono", style: "Regular" };
contactLbl.fontSize = 11; contactLbl.letterSpacing = { unit: "PERCENT", value: 18 };
contactLbl.characters = "ELLER RING DIREKTE";
contactLbl.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.55 }];
contact.appendChild(contactLbl);

const phone = figma.createText();
phone.fontName = { family: "Inter", style: "Regular" };
phone.fontSize = 18;
phone.characters = "+45 65 32 33 96";
phone.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
contact.appendChild(phone);

const email = figma.createText();
email.fontName = { family: "Inter", style: "Regular" };
email.fontSize = 18;
email.characters = "mk@ccdesign.dk";
email.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
contact.appendChild(email);

// RIGHT — form
const right = figma.createAutoLayout("VERTICAL");
right.fills = []; right.itemSpacing = 32;
sec.appendChild(right); right.layoutSizingHorizontal = "FILL";

function makeField(label, isTextarea) {
  const f = figma.createAutoLayout("VERTICAL");
  f.fills = []; f.itemSpacing = 12;
  const lbl = figma.createText();
  lbl.fontName = { family: "JetBrains Mono", style: "Regular" };
  lbl.fontSize = 11; lbl.letterSpacing = { unit: "PERCENT", value: 14 };
  lbl.characters = label.toUpperCase();
  lbl.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.55 }];
  f.appendChild(lbl);

  const inp = figma.createAutoLayout("VERTICAL");
  inp.fills = []; inp.itemSpacing = 12;
  inp.paddingBottom = 12;
  f.appendChild(inp); inp.layoutSizingHorizontal = "FILL";

  // Placeholder text (greyed)
  const ph = figma.createText();
  ph.fontName = { family: "Inter", style: "Regular" };
  ph.fontSize = 18;
  ph.characters = isTextarea ? "Fortæl kort om dit projekt…" : "";
  ph.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.30 }];
  inp.appendChild(ph);
  if (isTextarea) ph.resize(420, 96);
  ph.textAutoResize = "HEIGHT";
  ph.layoutSizingHorizontal = "FILL";

  // Bottom line
  const line = figma.createRectangle();
  line.resize(1, 1);
  line.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.30 }];
  inp.appendChild(line);
  line.layoutSizingHorizontal = "FILL";

  return f;
}

right.appendChild(makeField("Navn", false));
right.children[right.children.length - 1].layoutSizingHorizontal = "FILL";
right.appendChild(makeField("Virksomhed", false));
right.children[right.children.length - 1].layoutSizingHorizontal = "FILL";
right.appendChild(makeField("Email", false));
right.children[right.children.length - 1].layoutSizingHorizontal = "FILL";
right.appendChild(makeField("Beskrivelse af projekt", true));
right.children[right.children.length - 1].layoutSizingHorizontal = "FILL";

// Submit
const submit = figma.createAutoLayout("HORIZONTAL");
submit.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
submit.paddingLeft = 24; submit.paddingRight = 24;
submit.paddingTop = 16; submit.paddingBottom = 16;
submit.itemSpacing = 12;
submit.counterAxisAlignItems = "CENTER";
submit.primaryAxisAlignItems = "CENTER";
right.appendChild(submit);
submit.layoutSizingHorizontal = "FILL";
const sT = figma.createText();
sT.fontName = { family: "Inter", style: "Medium" };
sT.fontSize = 13; sT.letterSpacing = { unit: "PERCENT", value: 18 };
sT.characters = "SEND →";
sT.fills = [{ type: "SOLID", color: rgb(C.fg) }];
submit.appendChild(sT);

return { kontaktId: sec.id };
```

- [ ] **Step 2: Verify rendering**

Run `get_screenshot` with `nodeId = <kontaktId>`, `maxDimension = 1440`.

Expected: Ink section, two-column. Left: eyebrow → 80px "Lad os tale sammen." headline (italic-feeling restraint, but no italics here) → lead → outlined CTA "● SEND FORESPØRGSEL →" → "ELLER RING DIREKTE" mono label + phone + email. Right: 4 form fields (Navn, Virksomhed, Email, Beskrivelse) each with mono uppercase label and bottom hairline only — no boxed inputs. Beskrivelse field is taller (placeholder "Fortæl kort om dit projekt…"). Below fields: full-width Paper-fill "SEND →" button with Ink text.

- [ ] **Step 3: No commit needed**

---

### Task 10: Footer

**Section spec** (design doc §9): Stone surface, 4 columns (brand, navigation, services, kontakt), bottom strip with copyright and links.

- [ ] **Step 1: Build the footer**

Run `use_figma`. Replace `WRAPPER_ID`:

```js
const fonts = [
  { family: "Inter", style: "Light" },
  { family: "Inter", style: "Regular" },
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bgMuted:"#8e8e8b", fgInverse:"#fbfaf8" };

const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");

const sec = figma.createAutoLayout("VERTICAL");
sec.name = "09 · Footer";
sec.fills = [{ type: "SOLID", color: rgb(C.bgMuted) }];
sec.paddingLeft = 80; sec.paddingRight = 80;
sec.paddingTop = 96; sec.paddingBottom = 40;
sec.itemSpacing = 64;
wrapper.appendChild(sec);
sec.layoutSizingHorizontal = "FILL";

// Top — 4 columns
const cols = figma.createAutoLayout("HORIZONTAL");
cols.fills = []; cols.itemSpacing = 80;
cols.counterAxisAlignItems = "MIN";
sec.appendChild(cols); cols.layoutSizingHorizontal = "FILL";

// Col 1: Brand
const c1 = figma.createAutoLayout("VERTICAL");
c1.fills = []; c1.itemSpacing = 16;
cols.appendChild(c1); c1.layoutSizingHorizontal = "FILL";
const brand = figma.createText();
brand.fontName = { family: "Inter", style: "Light" };
brand.fontSize = 22; brand.letterSpacing = { unit: "PERCENT", value: -1 };
brand.characters = "CC Design A/S";
brand.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
c1.appendChild(brand);
const tag = figma.createText();
tag.fontName = { family: "Inter", style: "Regular" };
tag.fontSize = 14; tag.lineHeight = { unit: "PERCENT", value: 165 };
tag.characters = "Maritime løsninger lokaliseret i Danmark.";
tag.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.7 }];
c1.appendChild(tag);
tag.resize(220, tag.height);
tag.textAutoResize = "HEIGHT";

function makeColumn(label, items) {
  const col = figma.createAutoLayout("VERTICAL");
  col.fills = []; col.itemSpacing = 14;
  const lbl = figma.createText();
  lbl.fontName = { family: "JetBrains Mono", style: "Regular" };
  lbl.fontSize = 11; lbl.letterSpacing = { unit: "PERCENT", value: 14 };
  lbl.characters = label;
  lbl.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.55 }];
  col.appendChild(lbl);
  const list = figma.createAutoLayout("VERTICAL");
  list.fills = []; list.itemSpacing = 6;
  col.appendChild(list); list.layoutSizingHorizontal = "FILL";
  for (const it of items) {
    const t = figma.createText();
    t.fontName = { family: "Inter", style: "Regular" };
    t.fontSize = 14;
    t.characters = it;
    t.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.85 }];
    list.appendChild(t);
  }
  return col;
}

const c2 = makeColumn("NAVIGATION", ["Forside", "Projektering", "Services", "Referencer", "Om os", "Kontakt"]);
cols.appendChild(c2); c2.layoutSizingHorizontal = "FILL";

const c3 = makeColumn("SERVICES", ["Projektering", "Bygning", "Drift"]);
cols.appendChild(c3); c3.layoutSizingHorizontal = "FILL";

const c4 = makeColumn("KONTAKT", [
  "Kohaven 15, DK-5300 Kerteminde",
  "+45 65 32 33 96",
  "mk@ccdesign.dk",
  "CVR: 10092825",
  "Byggeriets Ankenævn ↗",
]);
cols.appendChild(c4); c4.layoutSizingHorizontal = "FILL";

// Hairline + bottom strip
const hr = figma.createRectangle();
hr.resize(1, 1);
hr.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.15 }];
const hrWrap = figma.createAutoLayout("VERTICAL");
hrWrap.fills = [];
hrWrap.appendChild(hr);
sec.appendChild(hrWrap);
hrWrap.layoutSizingHorizontal = "FILL";
hr.layoutSizingHorizontal = "FILL";

const bottom = figma.createAutoLayout("HORIZONTAL");
bottom.fills = []; bottom.itemSpacing = 32;
bottom.primaryAxisAlignItems = "SPACE_BETWEEN";
bottom.counterAxisAlignItems = "CENTER";
sec.appendChild(bottom); bottom.layoutSizingHorizontal = "FILL";

const cp = figma.createText();
cp.fontName = { family: "JetBrains Mono", style: "Regular" };
cp.fontSize = 11; cp.letterSpacing = { unit: "PERCENT", value: 8 };
cp.characters = "© 2026 CC DESIGN A/S";
cp.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.55 }];
bottom.appendChild(cp);

const legal = figma.createText();
legal.fontName = { family: "JetBrains Mono", style: "Regular" };
legal.fontSize = 11; legal.letterSpacing = { unit: "PERCENT", value: 14 };
legal.characters = "PRIVATLIVSPOLITIK · COOKIES";
legal.fills = [{ type: "SOLID", color: rgb(C.fgInverse), opacity: 0.55 }];
bottom.appendChild(legal);

return { footerId: sec.id };
```

- [ ] **Step 2: Verify rendering**

Run `get_screenshot` with `nodeId = <footerId>`, `maxDimension = 1440`.

Expected: Stone-coloured section. Top row: 4 columns (Brand+tag, NAVIGATION list, SERVICES list, KONTAKT list with address/phone/email/CVR/Ankenævn link). Hairline. Bottom row: copyright left, "PRIVATLIVSPOLITIK · COOKIES" right.

- [ ] **Step 3: No commit needed**

---

### Task 11: CardNav (sticky overlay on Hero)

CardNav is built last and positioned absolutely on top of the Hero so it appears over the dark background like the live site. We do NOT make it sticky (Figma static prototype) — it sits as a single layered overlay at the top of the Hero region.

- [ ] **Step 1: Build the CardNav**

Run `use_figma`. Replace `HERO_ID` with the ID returned in Task 2:

```js
const fonts = [
  { family: "Inter", style: "Medium" },
  { family: "JetBrains Mono", style: "Regular" },
];
for (const f of fonts) await figma.loadFontAsync(f);
const rgb = (h) => { const s = h.replace("#",""); return { r: parseInt(s.slice(0,2),16)/255, g: parseInt(s.slice(2,4),16)/255, b: parseInt(s.slice(4,6),16)/255 }; };
const C = { bgSoft:"#ebe8e3", bgInverse:"#1c1c1a", fg:"#1c1c1a", fgInverse:"#fbfaf8", accentBright:"#2e86e0" };

const hero = await figma.getNodeByIdAsync("HERO_ID");

// Bar — rounded pill, layered on Hero, capped at 920 wide
const bar = figma.createAutoLayout("HORIZONTAL");
bar.name = "CardNav";
bar.fills = [{ type: "SOLID", color: rgb(C.bgSoft) }];
bar.strokes = [{ type: "SOLID", color: rgb(C.fg), opacity: 0.10 }];
bar.strokeWeight = 1;
bar.cornerRadius = 16;
bar.paddingLeft = 16; bar.paddingRight = 16;
bar.paddingTop = 12;  bar.paddingBottom = 12;
bar.itemSpacing = 16;
bar.counterAxisAlignItems = "CENTER";
bar.effects = [{
  type: "DROP_SHADOW",
  color: { r: 0, g: 0, b: 0, a: 0.12 },
  offset: { x: 0, y: 4 }, radius: 24, spread: 0, visible: true, blendMode: "NORMAL"
}];
hero.appendChild(bar);

// Hamburger
const burger = figma.createAutoLayout("VERTICAL");
burger.fills = []; burger.itemSpacing = 6;
burger.paddingLeft = 8; burger.paddingRight = 8;
burger.paddingTop = 8;  burger.paddingBottom = 8;
for (let i = 0; i < 2; i++) {
  const r = figma.createRectangle();
  r.resize(20, 1);
  r.fills = [{ type: "SOLID", color: rgb(C.fg) }];
  burger.appendChild(r);
}
bar.appendChild(burger);

// Menu label
const menu = figma.createText();
menu.fontName = { family: "JetBrains Mono", style: "Regular" };
menu.fontSize = 10; menu.letterSpacing = { unit: "PERCENT", value: 20 };
menu.characters = "MENU";
menu.fills = [{ type: "SOLID", color: rgb(C.fg), opacity: 0.7 }];
bar.appendChild(menu);

// Spacer (push CTA to right)
const spacer = figma.createFrame();
spacer.fills = []; spacer.resize(1, 1);
bar.appendChild(spacer);
spacer.layoutGrow = 1;

// CTA pill
const cta = figma.createAutoLayout("HORIZONTAL");
cta.fills = [{ type: "SOLID", color: rgb(C.bgInverse) }];
cta.cornerRadius = 12;
cta.paddingLeft = 16; cta.paddingRight = 16;
cta.paddingTop = 8;   cta.paddingBottom = 8;
cta.itemSpacing = 8;
cta.counterAxisAlignItems = "CENTER";

const dot = figma.createEllipse();
dot.resize(6, 6);
dot.fills = [{ type: "SOLID", color: rgb(C.accentBright) }];
cta.appendChild(dot);

const lbl = figma.createText();
lbl.fontName = { family: "Inter", style: "Medium" };
lbl.fontSize = 11; lbl.letterSpacing = { unit: "PERCENT", value: 18 };
lbl.characters = "KONTAKT";
lbl.fills = [{ type: "SOLID", color: rgb(C.fgInverse) }];
cta.appendChild(lbl);

bar.appendChild(cta);

// Position bar: centred horizontally, 24px from top
bar.resize(920, bar.height);
bar.x = (1440 - 920) / 2;
bar.y = 24;

return { cardnavId: bar.id };
```

- [ ] **Step 2: Verify rendering**

Run `get_screenshot` with `nodeId = <heroId>`, `maxDimension = 1440`.

Expected: Hero now has a Sand-coloured rounded pill at the top centre (24px from top), 920px wide, with a hamburger + "MENU" label on the left and a dark "● KONTAKT" CTA pill on the right. Soft drop shadow visible. Pill sits cleanly over the dark hero background.

- [ ] **Step 3: No commit needed**

---

### Task 12: Final QA + screenshot of full prototype

- [ ] **Step 1: Verify section count and order**

Run `use_figma`:

```js
const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");
const list = wrapper.children.map(c => ({ id: c.id, name: c.name, type: c.type, h: Math.round(c.height) }));
return { count: wrapper.children.length, list, totalHeight: Math.round(wrapper.height) };
```

Expected: 9 immediate children of the wrapper in this exact order:
1. `01 · Hero`
2. `02 · Manifesto`
3. `03 · Hvad vi tilbyder`
4. `04 · Sådan arbejder vi`
5. `05 · Udvalgte projekter`
6. `06 · Tal & klientel`
7. `07 · Testimonial`
8. `08 · Kontakt`
9. `09 · Footer`

`totalHeight` should be roughly 6500–8000px.

- [ ] **Step 2: Verify all named image wells exist**

Run `use_figma`:

```js
const wrapper = await figma.getNodeByIdAsync("WRAPPER_ID");
const wells = [];
wrapper.findAll(n => {
  if (n.name && n.name.toLowerCase().includes("drop photo here")) wells.push(n.name);
  if (n.name && n.name.startsWith("Klientlogo ")) wells.push(n.name);
  return false;
});
return { count: wells.length, wells };
```

Expected at minimum:
- 1× `Hero image · drop photo here` (or `Hero background · drop photo here` + the inset well)
- 3× `Project N · <Project name> · drop photo here`
- 7× `Klientlogo 1` … `Klientlogo 7`

If anything is missing or named wrong, fix with a targeted `use_figma` patch.

- [ ] **Step 3: Take a full-prototype screenshot**

Run `get_screenshot` with `nodeId = <wrapperId>`, `maxDimension = 2400`. Save the URL — this is the artifact you can hand the user. Visually verify:
- Top dark hero with CardNav pill
- Light manifesto with breathing room
- Sand services with 3 equal cards
- Light process with 5 stepped columns
- Light projects with 3 cards
- Dark trust band with stats + logos
- Sand testimonial
- Dark kontakt with form
- Stone footer

- [ ] **Step 4: Commit the plan and any working notes**

```bash
git add docs/superpowers/plans/2026-05-10-homepage-prototype.md
git commit -m "$(cat <<'EOF'
docs: add homepage prototype implementation plan

Section-by-section plan for the Forside hi-fi prototype on the
Prototype page in Figma, following the refined-narrative IA from
the spec.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

**Spec coverage:** Each spec section maps to a task:
- §0 CardNav → Task 11
- §1 Hero → Task 2
- §2 Manifesto → Task 3
- §3 Services → Task 4
- §4 Process → Task 5
- §5 Projects → Task 6
- §6 Trust band → Task 7
- §7 Testimonial → Task 8
- §8 Kontakt → Task 9
- §9 Footer → Task 10
- Foundation wrapper → Task 1
- Acceptance criteria check → Task 12

**Placeholder scan:** Each task has full JS code, no TBDs. Image-well names are explicit. Copy strings are final (Danish).

**Type consistency:** Wrapper ID flows from Task 1 → all tasks. Hero ID flows from Task 2 → Task 11. All tasks use the same `rgb` helper, the same `C` colour map, and the same font preload list.

**Known caveats:**
- `figma.createText()` italic emphasis in Task 2 (Hero) requires the "Inter Light Italic" font to be loaded — done.
- The hairline accent stub in Task 5 (Process) uses a non-auto-layout sub-frame so the full hairline can fill while the accent stays 36px. The line has its width set explicitly after the column is appended.
- The CardNav in Task 11 is appended to the Hero section, not the wrapper, so it visually overlays the dark hero. This is intentional.
