# Server 504 — Home Asset Integration Plan V1

**Project:** Dark War: Survival — Server 504 Public Portal  
**Target:** Home / Operations Dashboard  
**Season theme:** Season 4 — Sealed Island  
**Status:** Approved implementation plan  
**Date:** 2026-08-15

---

## 1. Purpose

This document turns the Decorative Asset Spec into an implementation plan for the Home page.

The goal is not simply to add more pictures. The goal is to make the Home page feel like a **Dark War: Survival operations interface living inside the Sealed Island season**, while keeping the current dashboard readable and stable.

The Home page must move away from:

- generic dark-dashboard styling;
- repeated use of the same large background art;
- generic fantasy crests and magic-circle motifs;
- decorative elements that do not communicate gameplay meaning.

It should move toward:

- post-apocalyptic survival UI;
- shrine / oni / sealed-island atmosphere;
- alliance warfare and server-operation language;
- supply, chest, reward and progression motifs familiar to Dark War: Survival players;
- decorative assets that also explain the type or state of information being shown.

---

## 2. Hard Rules

### 2.1 Crest deprecation

The circular Season Artifact crest previously used on Home is **deprecated**.

The following must be removed from production Home UI:

- `.season-artifact` visual;
- spinning outer ring;
- crest pulse animation;
- orbit / circular segmentation around that crest;
- `sealed-emblem.webp` as a central Home decorative device;
- `sealed-emblem.webp` as Capital / Shared Assets watermark;
- any new badge derived from the same circular crest language.

`sealed-emblem.webp` may remain in the repository temporarily for backward compatibility, but Home must have **zero visible dependency** on it after Batch 1.

### 2.2 No runtime architecture changes

Batch 1 is presentation-focused.

Do not modify:

- routing;
- `server-status.json` schema;
- fetch behavior;
- Wiki lazy-loading;
- language routing;
- dashboard data ownership.

DOM decoration may be added only when it is idempotent and optional.

### 2.3 Decorative asset ≠ wallpaper

A new asset is accepted only if it performs at least one of these roles:

1. identifies a content type;
2. communicates status / threat / hierarchy;
3. improves visual grouping;
4. strengthens Sealed Island environmental mood;
5. creates recognizable Dark War: Survival gameplay language.

---

## 3. Asset Folder Structure

Create and maintain the following structure:

```text
assets/
  decorative/
    frames/
    badges/
    overlays/
    events/
    operations/
    rewards/
```

Recommended naming convention:

```text
<group>-<purpose>-<variant>.webp
<group>-<purpose>-<variant>.svg
```

Examples:

```text
frames-panel-corner-01.webp
badges-ke-alert-01.webp
overlays-sealed-miasma-01.webp
events-pet-supplies-01.webp
operations-capital-transfer-01.webp
rewards-lucky-chest-01.webp
```

Prefer **WebP** for painted/raster artwork and **SVG/CSS** for simple geometric/tactical marks.

---

## 4. Batch 1 Asset Inventory

### 4.1 Required assets

| ID | Asset | Format target | Primary use | Status |
|---|---|---|---|---|
| A01 | Panel Corner Frame | WebP/SVG | Dashboard panels | Generate / curate |
| A02 | Sealed Divider | WebP/SVG | Section separation | Generate / curate |
| A03 | Limited Event Badge | CSS/SVG | Featured Events | Build from UI system |
| A04 | Big Event Badge | CSS/SVG | Featured Events | Build from UI system |
| A05 | Live Now Badge | CSS/SVG | Featured Events | Build from UI system |
| A06 | KE Alert Badge | CSS/SVG/WebP | Saturday KE | Generate / curate |
| A07 | Threat Marker Set | CSS/SVG | Saturday KE | Build from UI system |
| A08 | Capital Transfer Motif | WebP/SVG | Shared Assets | Generate / curate |
| A09 | Armory Slot Marker | CSS/SVG | Armory grid | Build from UI system |
| A10 | Shrine/Torii Environment | WebP | Hero / section atmosphere | Generate / curate |
| A11 | Oni Shadow | WebP | Hero only | Generate / curate |
| A12 | Miasma Overlay | WebP/CSS | Hero / panels | Generate / curate |
| A13 | Seal-paper Strip | WebP/SVG | warning / spoiler / headers | Generate / curate |
| A14 | Pet Supplies Illustration | WebP | Pet Supplies card | Generate / curate |
| A15 | Lucky Chest Illustration | WebP | Tech/Hero Lucky Chest | Generate / curate |
| A16 | Big Event Illustration | WebP | Summer Paradise | Generate / curate |

### 4.2 Optional assets

- alliance rank insignia;
- tactical dotted route overlay;
- reward token / currency medallion;
- generic cross-server occupation illustration.

These do not block Batch 1 completion.

---

## 5. Generated Asset Review Rule

ImageGen output must be treated as **candidate artwork**, not automatically production-ready.

Before integration, each generated asset must pass four checks:

- no accidental unrelated logo / text;
- no generic fantasy crest replacing the deprecated crest;
- composition still works after cropping to UI aspect ratio;
- enough negative space exists for readable UI text.

Assets with baked-in wording such as `LIMITED EVENT`, `BIG EVENT`, `LIVE NOW`, `KE ALERT` should normally **not** be used as the final UI label. Text should remain HTML/CSS so all six locales can translate correctly.

If a generated image contains useful framing but unusable text, crop or regenerate it as a **textless decorative asset**.

---

# 6. Home Integration Map

## 6.1 Cinematic Hero

### Existing selectors

```text
.ops-dashboard
.dashboard-season-bg
.dashboard-head
.dashboard-head .eyebrow
.dashboard-head h1
.dashboard-updated
.status-strip
```

### Remove

- `.season-artifact` insertion from `fancy-home.js`;
- all CSS rules for `.season-artifact`;
- `seasonArtifactSpin`;
- `seasonArtifactPulse`;
- any hero dependency on `sealed-emblem.webp`.

### New visual stack

Hero artwork should use four conceptual layers:

**Layer 1 — Environment**  
Sealed Island / ruined shrine / island cliff silhouette.

**Layer 2 — Threat**  
Large oni shadow or partial oni silhouette, deliberately off-center.

**Layer 3 — Atmosphere**  
Crimson + cyan miasma, drifting ash / sparse leaves.

**Layer 4 — Operations UI**  
Current title, eyebrow, last-updated chip and status strip.

### Composition target

- Text remains left-heavy.
- Oni remains primarily right / rear.
- Center remains visually quieter so text and background do not fight.
- No standalone circular emblem.
- Season identity becomes a small textual device:

```text
S4 · SEALED ISLAND
```

Use it as a metadata plate, not a logo.

### Acceptance test

If the `S4 · SEALED ISLAND` text is temporarily hidden, the remaining artwork should still feel like Sealed Island.

---

## 6.2 Featured Events

### Existing selectors

```text
.featured-panel
.featured-columns
.featured-column
.event-card
.event-card.live
.event-card.upcoming
.event-type
.event-rewards
```

### Layout rule

Keep current hierarchy:

- Live Now = primary column;
- Coming Up = secondary column;
- Big Event receives stronger visual weight than normal limited events.

### Asset mapping

#### Pet Supplies

Use:

```text
events-pet-supplies-01.webp
```

Visual vocabulary:

- supply crate;
- pet food / pet training items;
- rugged shelter gear;
- reward glow.

Do not use shrine art as the primary illustration for this card.

#### Tech Lucky Chest

Use:

```text
rewards-lucky-chest-tech-01.webp
```

Visual vocabulary:

- armored reward chest;
- research / technology plates;
- cool cyan highlights;
- mechanical Dark War survival feel.

#### Hero Lucky Chest

Use:

```text
rewards-lucky-chest-hero-01.webp
```

Visual vocabulary:

- hero recruitment/reward chest;
- fragment / medal hints;
- warmer gold + controlled red accents.

Do not embed portraits unless we have confirmed reusable hero artwork.

#### Summer Paradise

Use:

```text
events-summer-paradise-01.webp
```

This card is allowed to be visually brighter because it is an in-game summer event, but it must still feel like a **survival outpost festival**, not a generic tropical travel banner.

Target motifs:

- improvised coastal survivor outpost;
- beach rewards / treasure;
- watchtower / jeep / supply crates;
- sunset color;
- subtle Dark War metal framing.

### Card treatment

The artwork occupies roughly the rear 30–45% of the card.

Text remains HTML.

Use gradient masks to guarantee readability.

Do not reuse the same illustration for two unrelated events.

---

## 6.3 Saturday KE — Invasion Watch

### Existing selectors

```text
.ke-panel
.ke-explainer
.dashboard-table
.cp-meter
[data-threat]
```

### Visual direction

This section should read as **server invasion warning**, not a generic red table.

Add:

- KE alert plate at section header;
- tactical route / signal lines as faint background;
- threat markers for each known opponent;
- narrow red warning rail on high-threat rows;
- amber warning rail on medium-threat rows.

### Threat marker rule

Threat visualization is comparative UI only. It must not claim an official game threat rating.

Label internally as visual intensity rather than gameplay fact.

### Candidate decorative vocabulary

- radio tower / transmission signal;
- torn hazard fabric;
- military warning plate;
- field map grid;
- server-number stamp.

Avoid occult circles here. KE is warfare/operations, not ritual magic.

---

## 6.4 Active Alliances

### Existing selectors

```text
.alliance-table-panel
.dashboard-table
.cp-cell-wrap
.cp-meter
```

### Batch 1 changes

Do not add large illustrations.

Use lightweight operations assets only:

- rank tick / small insignia;
- tactical underline;
- subtle top-three emphasis;
- existing CP meter remains.

Reason: this is a dense information block. Decorative artwork must not reduce scan speed.

### Top-three hierarchy

- Rank 1: ancient gold/cyan accent;
- Rank 2: cool steel/cyan;
- Rank 3: muted bronze/gold;
- rank 4–8 neutral.

Do not invent medals that imply official game ranks.

---

## 6.5 Shared Assets — Capital

### Existing selectors

```text
.shared-panel
.capital-rotation
.capital-node
.capital-node.next
.capital-arrow
```

### Remove

- `sealed-emblem.webp` watermark;
- circular crest-like background;
- ornamental ellipses around Current and Next.

### New concept

Treat Capital as an **operations handover**.

Layout stays:

```text
CURRENT CAPITAL OWNER  →  NEXT CAPITAL OWNER
DUD                       CMRD
```

But the central decorative object becomes a transfer path / strategic route rather than a crest.

Use:

```text
operations-capital-transfer-01.webp
```

or build with CSS/SVG:

- command node left;
- illuminated transfer path;
- command node right;
- small directional chevrons;
- faint battlefield / capital silhouette behind.

### Color logic

Current:
- cyan / cool command color.

Next:
- ancient gold / scheduled handover color.

The visual should say **rotation**, not ownership forever.

---

## 6.6 Shared Assets — Armory

### Existing selectors

```text
.armory-registration
.armory-grid
.armory-item
```

### New treatment

Each Armory row becomes a compact **registry slot**.

Add a reusable marker:

```text
operations-armory-slot-01.svg
```

States:

- Registered → illuminated cyan/green slot;
- Available → brighter open-slot state;
- Awaiting registration → desaturated / dormant slot.

Do not attach unique artwork to Armory 1–8 because their physical locations are stable and the dashboard is showing registration status, not a map.

---

## 6.7 Server Announcements

### Existing selectors

```text
.announcement-list
.announcement-item
.priority-tag
```

### Batch 1 treatment

Use the new plate/tag language:

- INFO → cool operations plate;
- IMPORTANT → crimson warning plate;
- ACTION REQUIRED → gold/red hazard plate.

Optional seal-paper strip can appear only on IMPORTANT / ACTION REQUIRED notices.

Do not turn every announcement into a fantasy scroll.

---

## 6.8 Migration & Recruitment

This section should remain comparatively restrained.

Allowed decorative motifs:

- seat / convoy / migration route line;
- alliance placement slots;
- subtle tactical map texture.

Do not add Season 4 oni artwork here because migration is an operational system that remains useful beyond the current season.

---

## 6.9 Quick Access

### Existing selectors

```text
.quick-access
.quick-access a
.quick-access button
```

Replace generic icon feeling over time with a small icon family:

- Wiki → field manual / archive plate;
- Charter → governance document / banner;
- Codex → command protocol plate;
- Contribute → radio / field report.

For Batch 1, keep current interaction and only add frame/divider consistency.

---

# 7. Decorative Layer Architecture

Create one final Home asset stylesheet:

```text
assets/home-asset-language.css
```

It must load after:

```text
sealed-island-theme.css
fancy-home.css
home-ui-refine.css
```

Its responsibilities:

- background-image assignment;
- frame/corner placement;
- asset masks;
- badge visual language;
- decorative pseudo-elements;
- responsive asset hiding;
- reduced-motion fallbacks.

It must **not** contain application logic.

Optional DOM enhancement logic, if unavoidable, goes into:

```text
assets/home-asset-language.js
```

Only use it for idempotent decoration that cannot be achieved through existing markup.

---

# 8. Responsive Rules

## Desktop ≥ 1180px

Use full decorative treatment.

- Hero can show full Oni/environment composition.
- Event artwork can occupy 35–45% of card.
- Tactical backgrounds allowed.

## Tablet 760–1179px

Reduce decoration by roughly 25%.

- crop secondary props;
- lower background opacity;
- no complex corner artwork if it crowds content.

## Mobile < 760px

Content clarity wins.

- hide large frame corners;
- remove nonessential background props;
- keep one atmospheric layer per section;
- event art becomes a top/right thumbnail or low-opacity background;
- no parallax-dependent information.

---

# 9. Performance Budget

Home must not regress into the earlier loading problem.

Batch 1 target:

- individual decorative WebP normally ≤ 250 KB;
- hero/environment asset normally ≤ 450 KB;
- total new immediately loaded Home decorative payload target ≤ 1.5 MB;
- secondary below-the-fold event art may use `loading` / lazy background strategy where practical;
- no third-party image CDN dependency;
- all production assets hosted locally in the repo.

Prefer one optimized asset over multiple overlapping large transparent PNGs.

---

# 10. Accessibility Rules

Decorative imagery must be non-semantic.

- CSS background or `aria-hidden="true"` where appropriate;
- status must remain readable in text;
- threat colors must not be the only differentiator;
- animated effects respect `prefers-reduced-motion`;
- badge text remains selectable/translatable HTML.

---

# 11. Implementation Sequence

## Pass 0 — Cleanup

1. Remove `.season-artifact` DOM insertion.
2. Remove crest animation CSS.
3. Remove `sealed-emblem.webp` from Home and Shared Assets.
4. Verify no crest remains visible at desktop/tablet/mobile.

## Pass 1 — Asset infrastructure

1. Create decorative folders.
2. Add `home-asset-language.css`.
3. Establish common asset variables / masks.
4. Optimize selected ImageGen candidates to WebP.

## Pass 2 — Hero

1. Integrate shrine/island environment.
2. Integrate oni shadow.
3. Add miasma overlay.
4. Replace crest with text metadata plate.
5. Validate title readability.

## Pass 3 — Featured Events

1. Pet Supplies unique illustration.
2. Tech Lucky Chest unique illustration.
3. Hero Lucky Chest unique illustration.
4. Summer Paradise Big Event artwork.
5. Replace generic event badges with new plate system.

## Pass 4 — KE + Alliance operations

1. Add KE warning visual system.
2. Add threat markers.
3. Add lightweight rank accents.
4. Keep tables fully readable.

## Pass 5 — Shared Assets

1. Replace Capital crest/watermark with transfer motif.
2. Implement Armory registry markers.
3. Verify wording remains Current/Next Capital Owner.

## Pass 6 — Supporting sections

1. Announcement plate system.
2. Migration subtle tactical texture.
3. Quick Access frame/divider consistency.

## Pass 7 — Responsive + performance audit

1. Desktop visual audit.
2. Tablet visual audit.
3. Mobile visual audit.
4. Check reduced motion.
5. Check total asset weight.
6. Check Home interaction and loading.

---

# 12. Acceptance Criteria — Batch 1

Batch 1 is complete only when all conditions below pass:

- No deprecated circular crest is visible anywhere on Home.
- No `sealed-emblem.webp` is visually used on Home.
- Hero communicates Sealed Island through environment, Oni and miasma rather than a logo.
- Pet Supplies, Tech Lucky Chest, Hero Lucky Chest and Summer Paradise no longer share generic reused background treatment.
- Summer Paradise visually reads as a Big Event.
- Saturday KE reads as an invasion / operations alert.
- Capital visually reads as Current → Next rotation.
- Armory entries read as registry slots.
- Decorative assets do not obstruct text at mobile size.
- Home remains interactive with no routing or fetch regression.
- New asset payload stays within the defined performance budget.
- All text-bearing UI remains localizable across the six supported languages.

---

# 13. Source-of-Truth Decision

After this plan is approved, future Home decorative changes should follow this order of authority:

1. **Home Asset Integration Plan V1** — integration and UI rules;
2. **Decorative Asset Spec V1** — asset language and visual direction;
3. **Current Season 4 / Sealed Island theme** — environmental mood;
4. **Current operational dashboard requirements** — data accuracy and readability.

A decorative idea should be rejected when it is visually impressive but conflicts with operational clarity or the Dark War: Survival identity.
