# Dark War: Survival — Decorative Asset Spec V2

**Project:** Server 504 Public Portal  
**Primary target:** Home / Operations Dashboard  
**Season anchor:** Season 4 — Sealed Island  
**Source authority:** `Dark_War_Survival_Decorative_Asset_Audit_V2.md`  
**Document type:** Production asset specification  
**Status:** Approved production baseline  
**Date:** 2026-08-15

---

# 1. Purpose

This specification converts the V2 visual audit into a production-ready asset system.

It defines:

- which decorative assets the website actually needs;
- which assets should be CSS/SVG and which should be generated artwork;
- the visual role of every asset;
- source-game inspiration for each family;
- preferred aspect ratio and working dimensions;
- placement and crop rules;
- responsive behavior;
- localization constraints;
- asset dependencies;
- acceptance criteria;
- implementation priority.

The objective is not to reproduce Dark War: Survival screenshots literally. The objective is to create a website asset language that feels immediately familiar to Dark War: Survival players while remaining readable, responsive and maintainable on the web.

---

# 2. Non-negotiable Visual Rules

## 2.1 Learn UI structure first, mood art second

The website must inherit the game's structural language:

- soft / rounded panel shapes;
- thick tabs and labels;
- chunky physical objects;
- clear state hierarchy;
- reward-slot logic;
- banner and ranking language;
- strongly differentiated event centerpieces.

Atmospheric art is secondary and must never replace structural clarity.

## 2.2 Sealed Island is the shell, not the palette of every event

The Home environment remains Season 4 — Sealed Island.

The Home shell may use:

- midnight navy;
- desaturated indigo;
- blue-violet mist;
- shrine red;
- lantern amber;
- moonlit gray-blue;
- selective crimson miasma.

However individual events keep their own visual identities.

Examples:

- Pet Supplies may use copper orange, blue, purple and gold;
- Lucky Chest may use warm brown and gold;
- Summer Paradise may use bright tropical yellow and turquoise;
- Saturday KE may use blue versus red/pink;
- Armory may use battlefield steel and smoke orange.

## 2.3 Functional decoration only

Every decorative asset must do at least one of these:

1. identify content type;
2. identify state;
3. create hierarchy;
4. reinforce a recognizable in-game motif;
5. support grouping;
6. support season atmosphere.

Pure filler ornament is rejected.

## 2.4 No baked-in UI text

Generated production assets must normally be textless.

Do not bake into images:

- event title;
- `LIVE NOW`;
- `BIG EVENT`;
- `LIMITED EVENT`;
- alliance names;
- server numbers;
- duration;
- reward values;
- `OPEN CONTEST`;
- `VS` unless explicitly created as a reusable neutral emblem.

All translatable or dynamic text stays HTML/CSS.

## 2.5 Deprecated language

Do not create or reuse:

- circular fantasy crest / season emblem;
- occult magic-circle rings;
- random sci-fi corner brackets;
- thin circuit-board HUD lines;
- generic sun-and-wave event iconography;
- giant line-art watermark chests;
- unrelated mascot silhouettes;
- cyberpunk reticles;
- repeated decorative divider on every panel.

The deleted `sealed-emblem.webp` family must remain deprecated.

---

# 3. Production Asset Architecture

Recommended repository structure:

```text
assets/
  decorative-v2/
    structural/
    seasonal/
    events/
    warfare/
    alliance/
    armory/
    capital/
    states/
    textures/
```

Recommended naming:

```text
v2-<family>-<purpose>-<variant>.<ext>
```

Examples:

```text
v2-structural-panel-header.svg
v2-seasonal-torii-mist.webp
v2-event-pet-supplies.webp
v2-warfare-matchup-seam.svg
v2-armory-stronghold.webp
v2-state-open-contest.svg
```

Do not overwrite V1 assets until V2 passes visual QA. V1 can be removed in a dedicated cleanup pass afterward.

---

# 4. Format Decision Rules

## 4.1 CSS / SVG

Use CSS/SVG for assets that must be:

- recolored by state;
- resized fluidly;
- sharp at all densities;
- used repeatedly;
- localized around HTML text;
- under roughly 20–30 KB where practical.

Examples:

- panel plates;
- badges;
- rank plates;
- matchup seam;
- armory state markers;
- capital transfer path;
- chips;
- small lantern icon;
- slot frames.

## 4.2 ImageGen → WebP

Use generated raster artwork for:

- event vignettes;
- atmospheric shrine scenes;
- organic mist;
- large physical objects;
- pet / chest compositions;
- tropical event compositions;
- Armory stronghold illustration;
- oni statue silhouette / shrine scene.

Preferred final format: **WebP**.

## 4.3 PNG

Use PNG only where alpha quality cannot be preserved acceptably in WebP or where tooling requires it.

PNG is not the default.

---

# 5. Priority Scale

- **P0 — Blocking:** must exist before V2 Home reintegration.
- **P1 — High:** required for the first polished Home release.
- **P2 — Medium:** improves fidelity but can ship later.
- **P3 — Future:** intended for later pages / broader asset system.

---

# 6. Structural UI Asset Family

The structural family translates the game's rounded, chunky mobile-game UI into a cleaner web form.

## STR-01 — Section Header Plate

**ID:** `STR-01`  
**File:** `v2-structural-section-header.svg`  
**Priority:** P0  
**Method:** SVG/CSS  
**Game inspiration:** Alliance panel headers, Alliance CP title bar, Sealed Island event headers  
**Target use:** Featured Events, Saturday KE, Active Alliances, Shared Assets, Announcements, Migration  
**Working size:** 1200 × 64 SVG viewBox  
**Aspect:** fluid horizontal

### Visual requirements

- softly beveled / rounded bar;
- subtle upper highlight;
- no cyber circuit corners;
- one optional small thematic notch or tab anchor;
- body color controlled through CSS variables;
- supports neutral, warning, event and season variants.

### Acceptance criteria

- still looks intentional with no background artwork;
- readable on dark shell;
- can be recolored without editing SVG paths;
- does not visually overpower section title.

---

## STR-02 — Compact Label Plate

**ID:** `STR-02`  
**File:** `v2-structural-label-plate.svg`  
**Priority:** P0  
**Method:** SVG/CSS  
**Game inspiration:** in-game timer chips, event tags, reward labels  
**Use:** LIVE / UPCOMING / LIMITED / BIG / SERVER / season meta / last-updated  
**Working size:** 240 × 48

### Rules

- HTML text sits above asset;
- rounded chunky silhouette;
- minimum 12 px horizontal padding around text;
- variants controlled via CSS variables;
- no baked text.

---

## STR-03 — Content Slot Frame

**ID:** `STR-03`  
**File:** `v2-structural-slot-frame.svg`  
**Priority:** P0  
**Method:** SVG/CSS  
**Game inspiration:** Alliance CP rows, Shadow Shop exchange rows, Season Pass reward rows  
**Use:** Armory slots, compact event states, migration rows where needed  
**Working size:** 640 × 112

### Requirements

- rounded rectangle;
- soft inner gradient;
- clearly visible selected / active state;
- supports icon area left, label center, state/value right;
- must remain readable without illustration.

---

## STR-04 — Tab / Segmented Header

**ID:** `STR-04`  
**File:** `v2-structural-tab.svg`  
**Priority:** P2  
**Method:** CSS/SVG  
**Game inspiration:** Supply Station / State Points, Alliance Duel tabs, Season Pass tabs  
**Use:** future Tips & Guides filtering, Wiki content filter, event sub-tabs  
**Working size:** flexible

Not required for current Home release.

---

## STR-05 — Soft Divider

**ID:** `STR-05`  
**File:** `v2-structural-soft-divider.svg`  
**Priority:** P1  
**Method:** SVG/CSS  
**Use:** only where real grouping is needed inside a panel  
**Working size:** 900 × 16

### Rule

Do not place this under every header. Use sparingly.

---

# 7. Season 4 — Sealed Island Asset Family

This family creates the Home shell atmosphere without forcing every card into a dark seasonal palette.

## SEA-01 — Torii + Shrine Mist Vignette

**ID:** `SEA-01`  
**File:** `v2-seasonal-torii-mist.webp`  
**Priority:** P0  
**Method:** ImageGen → WebP  
**Game inspiration:** Maple Isle Shrine, Season Weekly Pass  
**Use:** Home hero secondary atmosphere, possibly Shared Assets low-opacity support  
**Working generation size:** 1536 × 1024  
**Final crop:** approximately 3:2 or 16:9  
**Target final weight:** ≤ 350 KB

### Composition

- torii / shrine gate primarily right or lower-right;
- lantern warmth;
- blue-violet night mist;
- empty negative space left / center;
- no logo;
- no text;
- no crest;
- no giant character centerpiece.

---

## SEA-02 — Oni Statue Shadow

**ID:** `SEA-02`  
**File:** `v2-seasonal-oni-statue-shadow.webp`  
**Priority:** P1  
**Method:** ImageGen → WebP with transparency/soft mask  
**Game inspiration:** Sealed Island season hub giant oni statue  
**Use:** Hero depth layer only  
**Working size:** 1024 × 1024  
**Final crop:** transparent irregular silhouette  
**Target weight:** ≤ 220 KB

### Requirements

- reads as large stone oni statue, not glowing demon logo;
- moonlit blue/gray treatment;
- low detail at small size;
- no rings, sigils or emblem treatment.

---

## SEA-03 — Shrine Lantern Accent

**ID:** `SEA-03`  
**File:** `v2-seasonal-lantern-accent.webp`  
**Priority:** P2  
**Method:** ImageGen or hand vector  
**Game inspiration:** Maple Isle Shrine / Weekly Pass / Sealed Island environments  
**Use:** occasional panel edge accent, not repeated everywhere  
**Working size:** 512 × 768

---

## SEA-04 — Blue-Violet Miasma Strip

**ID:** `SEA-04`  
**File:** `v2-seasonal-miasma-strip.webp`  
**Priority:** P0  
**Method:** ImageGen → WebP  
**Use:** Hero and one or two large section transitions  
**Working size:** 1536 × 512  
**Target weight:** ≤ 220 KB

### Requirements

- organic fog;
- mostly blue-violet with selective crimson contamination;
- transparent / dark-safe edges;
- no decorative geometry;
- seamless enough for soft horizontal crop.

---

## SEA-05 — Maple / Petal Drift

**ID:** `SEA-05`  
**File:** `v2-seasonal-petal-drift.webp` or CSS particles  
**Priority:** P3  
**Method:** CSS or lightweight sprite  
**Use:** optional hero ambient motion only

Do not block V2 release.

---

# 8. Featured Event Asset Family

Important Featured Events receive one clear object-centered motif each.

## EVT-PET-01 — Pet Supplies Vignette

**ID:** `EVT-PET-01`  
**File:** `v2-event-pet-supplies.webp`  
**Priority:** P0  
**Method:** ImageGen → WebP  
**Reference:** Pet Supplies screenshot supplied by user  
**Use:** Pet Supplies card  
**Generation size:** 1024 × 1024 or 1152 × 768  
**Final crop:** approximately 4:3 / 1:1 depending card  
**Target weight:** ≤ 250 KB

### Required visual ingredients

- cropped orange/copper supply cabinet or station;
- 2–3 chest variants visible;
- blue / purple / gold rarity cues;
- paw emblem;
- partial dog/pet presence may appear at top edge;
- chunky rounded object treatment;
- soft warm highlight.

### Forbidden

- giant generic chest outline;
- full event screen recreation;
- event title baked in;
- fake reward numbers;
- fake UI buttons.

### Placement

- right 30–40% of Live card;
- gradient fade into text zone;
- artwork may extend slightly below card baseline for depth.

---

## EVT-LUCKY-BASE-01 — Lucky Chest Roulette Base

**ID:** `EVT-LUCKY-BASE-01`  
**File:** `v2-event-lucky-roulette-base.webp`  
**Priority:** P0  
**Method:** ImageGen → WebP  
**Reference:** Lucky Chest screenshot  
**Use:** shared visual family for Tech Lucky Chest and Hero Lucky Chest  
**Generation size:** 1024 × 1024  
**Final crop:** partial circular arc  
**Target weight:** ≤ 220 KB

### Required ingredients

- warm dark brown backing;
- gold roulette rim;
- pointer / needle;
- several circular reward sockets;
- lower-right / right-side crop so text remains clear.

### Rule

This is the family base. Do not reuse the exact same final image on both event cards without variation.

---

## EVT-TECH-01 — Tech Lucky Chest Variant

**ID:** `EVT-TECH-01`  
**File:** `v2-event-tech-lucky-chest.webp`  
**Priority:** P0  
**Method:** ImageGen variation from Lucky Chest family  
**Use:** Tech Lucky Chest card  
**Target weight:** ≤ 220 KB

### Distinguishing cues

- cool cyan / steel reward sockets;
- technology / component silhouettes;
- restrained teal edge glow;
- retains warm gold roulette identity.

Do not invent specific reward icons if not confirmed.

---

## EVT-HERO-01 — Hero Lucky Chest Variant

**ID:** `EVT-HERO-01`  
**File:** `v2-event-hero-lucky-chest.webp`  
**Priority:** P0  
**Method:** ImageGen variation from Lucky Chest family  
**Use:** Hero Lucky Chest card  
**Target weight:** ≤ 220 KB

### Distinguishing cues

- three circular hero-token sockets;
- gold + purple rarity cues;
- abstract silhouettes / empty portrait frames allowed;
- do not fabricate Lan, Darian or Katrina likeness without approved source art.

If confirmed hero artwork is later available, it may replace the abstract token sockets.

---

## EVT-SUMMER-01 — Summer Paradise Vignette

**ID:** `EVT-SUMMER-01`  
**File:** `v2-event-summer-paradise.webp`  
**Priority:** P0  
**Method:** ImageGen → WebP  
**Reference:** supplied Summer Paradise splash  
**Use:** Summer Paradise Big Event card  
**Generation size:** 1536 × 1024  
**Final crop:** 3:2 or 16:10  
**Target weight:** ≤ 300 KB

### Required ingredients

- bright tropical daylight;
- yellow floral / vacation color language;
- turquoise ocean;
- palm foliage;
- coconut drink and/or surfboard;
- optional anonymous muscular survivor or partial character crop;
- island / volcanic horizon may appear;
- high-key event color compared with dark Home shell.

### Forbidden

- `ALOHA` text;
- Dark War logo;
- event name baked in;
- generic flat sun icon;
- recoloring into dark cyan/crimson.

### Placement

This should be the brightest Featured Event asset and visually signal a major event immediately.

---

# 9. Saturday KE / Alliance Duel Asset Family

Saturday KE should feel like a Dark War cross-server matchup board, not a red cybersecurity table.

## KE-01 — Matchup Split Background

**ID:** `KE-01`  
**File:** `v2-ke-matchup-split.svg`  
**Priority:** P0  
**Method:** SVG/CSS  
**Reference:** Alliance Duel Match Status / Enemy Buster  
**Use:** Saturday KE panel background/header  
**Working size:** 1200 × 400

### Visual structure

- 504 side blue zone;
- opponent side red/pink zone;
- diagonal or soft central seam;
- small gold tension point / VS anchor region;
- no alliance logo baked in;
- low opacity behind table/rows.

---

## KE-02 — Neutral Alliance Banner Plate

**ID:** `KE-02`  
**File:** `v2-ke-banner-plate.svg`  
**Priority:** P1  
**Method:** SVG/CSS  
**Reference:** hanging alliance banners in Duel UI  
**Use:** compact tag holder for `[AP3X]`, `[UIC]`, `UNTA`, `LUMJ`  
**Working size:** 180 × 240

### Rule

This is a neutral plate only. Do not invent official alliance emblems.

Alliance tag remains HTML text.

---

## KE-03 — VS / Conflict Seam

**ID:** `KE-03`  
**File:** `v2-ke-conflict-seam.svg`  
**Priority:** P0  
**Method:** SVG/CSS  
**Use:** header / matchup rows  
**Working size:** 220 × 80

### Requirements

- compact central gold seam;
- subtle lightning / tension line;
- can render without literal `VS` text if desired;
- no cyber HUD geometry.

---

## KE-04 — Server Number Chip

**ID:** `KE-04`  
**File:** `v2-ke-server-chip.svg`  
**Priority:** P1  
**Method:** SVG/CSS  
**Use:** `#515`, `#498`  
**Working size:** 120 × 40

---

## KE-05 — Threat / CP Bar Skin

**ID:** `KE-05`  
**File:** CSS only  
**Priority:** P0  
**Method:** CSS  
**Use:** comparative CP visualization  
**Reference:** Alliance Duel percentage / progress bar

### Rule

This is comparative UI, not an official threat rating.

Suggested visual intensity:

- cool blue/cyan baseline;
- amber for stronger comparative opponent;
- red reserved for explicit warning state, not automatically highest CP.

---

# 10. Active Alliances Asset Family

This panel stays data-first.

## ALL-01 — Rank Plate Set

**ID:** `ALL-01`  
**File:** `v2-alliance-rank-plates.svg`  
**Priority:** P1  
**Method:** SVG/CSS  
**Reference:** Alliance CP rank list / Soulstone Rankings  
**Use:** Rank 1–3 and neutral 4–8  
**Working size:** 64 × 64 each

### Visual states

- Rank 1 → gold;
- Rank 2 → silver / cool blue;
- Rank 3 → bronze / muted red-gold;
- Rank 4–8 → neutral dark plate.

### Rule

Do not imitate official medal graphics exactly.

---

## ALL-02 — Alliance Banner Accent

**ID:** `ALL-02`  
**File:** `v2-alliance-banner-accent.svg`  
**Priority:** P2  
**Method:** SVG  
**Use:** optional left-side accent behind alliance tag

Must remain subtle; this panel must not become illustration-heavy.

---

# 11. Armory Asset Family

The Armory family is based on the real Armory Assault building and state semantics.

## ARM-01 — Armory Stronghold Vignette

**ID:** `ARM-01`  
**File:** `v2-armory-stronghold.webp`  
**Priority:** P0  
**Method:** ImageGen → WebP  
**Reference:** Armory Assault screenshot  
**Use:** Shared Assets / Armory section background anchor  
**Generation size:** 1024 × 1024  
**Final crop:** right-side 4:3 vignette  
**Target weight:** ≤ 280 KB

### Required ingredients

- fortified military stronghold / tower;
- steel and concrete;
- battlefield smoke;
- warm blast glow in distance;
- no text;
- no timer;
- no fake troop labels;
- no logo.

### Placement

Low-opacity right or lower-right background for Armory section, not repeated per row.

---

## ARM-02 — Armory Slot Frame

**ID:** `ARM-02`  
**File:** `v2-armory-slot-frame.svg`  
**Priority:** P0  
**Method:** SVG/CSS  
**Use:** Armory 1–8 rows / cards  
**Working size:** 520 × 96

### Layout zones

- left: number / stronghold icon;
- center: alliance / state;
- right: optional compact status chip.

---

## ARM-03 — Registered State

**ID:** `ARM-03`  
**File:** `v2-state-armory-registered.svg`  
**Priority:** P0  
**Method:** SVG/CSS

### Visual

- stable cool-blue / green illumination;
- small building glyph;
- no ownership crown.

Use for:

- Armory 1 — AP3X
- Armory 2 — LTNX
- Armory 3 — UIC
- Armory 5 — iDGF
- Armory 6 — DUD
- Armory 7 — CMRD
- Armory 8 — IDS

---

## ARM-04 — Open Contest State

**ID:** `ARM-04`  
**File:** `v2-state-armory-open-contest.svg`  
**Priority:** P0  
**Method:** SVG/CSS  
**Use:** Armory 4

### Required visual language

- amber / red competitive accent;
- opposing chevrons or crossed conflict marks;
- noticeably different from Registered and Available;
- no implied winner;
- contenders remain HTML text.

Current state text:

```text
Open Contest
DUD · CMRD · IDS · iDGF
```

### Important

Armory 4 is intentionally open for these alliances to fight over. It must not be counted as registered.

---

## ARM-05 — Available State

**ID:** `ARM-05`  
**File:** `v2-state-armory-available.svg`  
**Priority:** P2  
**Method:** SVG/CSS

Reserved for future state where a slot is confirmed open with no defined contest group.

---

## ARM-06 — Pending / Unknown State

**ID:** `ARM-06`  
**File:** `v2-state-armory-pending.svg`  
**Priority:** P2  
**Method:** SVG/CSS

Dormant/desaturated visual.

---

# 12. Capital Asset Family

No direct Capital screenshot has yet been provided, so this family remains conservative and functional.

## CAP-01 — Rotation Node Plate

**ID:** `CAP-01`  
**File:** `v2-capital-rotation-node.svg`  
**Priority:** P0  
**Method:** SVG/CSS  
**Use:** Current / Next Capital Owner

### Variants

- current → cool blue/cyan;
- next → warm gold.

### Requirements

- banner / command-post inspired;
- no crest;
- no magic circle;
- no permanent ownership symbolism.

---

## CAP-02 — Transfer Path

**ID:** `CAP-02`  
**File:** `v2-capital-transfer-path.svg`  
**Priority:** P0  
**Method:** SVG/CSS  
**Use:** `DUD → CMRD`

### Requirements

- simple directional handover path;
- optional moving light dot under normal motion settings;
- static under `prefers-reduced-motion`;
- no ritual motif.

---

## CAP-03 — Capital Background Support

**ID:** `CAP-03`  
**Priority:** P3  
**Method:** none until real Capital reference is available.

Do not generate speculative Capital architecture yet.

---

# 13. Announcement / Status Assets

## STA-01 — Info Chip

**ID:** `STA-01`  
**File:** CSS/SVG  
**Priority:** P1  
**Use:** INFO

Cool blue, understated.

## STA-02 — Important Chip

**ID:** `STA-02`  
**Priority:** P1  
**Method:** CSS/SVG  
**Use:** IMPORTANT

Amber/red, no fantasy seal.

## STA-03 — Action Required Chip

**ID:** `STA-03`  
**Priority:** P1  
**Method:** CSS/SVG

Strong warning state, but still game-panel style.

## STA-04 — Spoiler Alert Chip

**ID:** `STA-04`  
**Priority:** P1  
**Method:** CSS/SVG  
**Use:** Season 5–6 content

### Visual direction

- sealed / restricted information feeling;
- purple-crimson / warning amber;
- no deprecated crest;
- may use a tiny paper-tag / restricted-tab cue inspired by Season UI, not occult symbolism.

---

# 14. Home Hero Composition Assets

The hero needs fewer, better assets.

## HERO-01 — Sealed Island Environment Layer

Uses `SEA-01` Torii + Shrine Mist.

## HERO-02 — Oni Depth Layer

Uses `SEA-02` Oni Statue Shadow.

## HERO-03 — Miasma Layer

Uses `SEA-04` Miasma Strip.

## HERO-04 — Season Metadata Plate

Uses `STR-02` label plate with HTML text:

```text
S4 · SEALED ISLAND · SERVER 504
```

### Hero acceptance criteria

- no crest;
- no mascot;
- no circular centerpiece;
- no more than three raster layers;
- title remains dominant;
- hero still reads as Sealed Island even when metadata plate is hidden;
- right side has visual interest without blocking Last Updated.

---

# 15. Card Artwork Placement Standard

Generated event artwork must follow this common placement system.

## Desktop

- art occupies 30–45% of card width;
- anchor right or lower-right;
- text zone left remains clean;
- artwork can reach edge of card;
- gradient mask between copy and artwork.

## Tablet

- art occupies 25–35%;
- lower opacity where needed;
- crop secondary props first.

## Mobile

Preferred options:

1. small top-right vignette;
2. low-opacity bottom-right crop;
3. narrow 88–120 px illustration column.

Never let illustration push event copy below the fold unnecessarily.

---

# 16. Generator Output Rules

Every generated asset must pass these checks before integration.

## 16.1 Content checks

- no random text;
- no random logo;
- no fake currency count;
- no fake server number;
- no fake alliance emblem;
- no unrequested UI button;
- no unrelated mascot;
- no visible watermark;
- no accidental real-world brand.

## 16.2 Composition checks

- recognizable at 220–320 px width;
- clear silhouette;
- enough negative space;
- works after crop;
- no key detail at extreme edge that gets cut on mobile;
- foreground/background separation remains clear after dark overlay.

## 16.3 Style checks

- Dark War-inspired, not generic fantasy;
- chunky / tactile where appropriate;
- event-local palette preserved;
- not photorealistic if it conflicts with game rendering language;
- no cyberpunk HUD language unless source reference clearly supports it.

---

# 17. Performance Budgets

## P0/P1 raster assets

Target final weights:

- large seasonal environment: ≤ 350 KB;
- event vignette: ≤ 250–300 KB;
- small overlay: ≤ 150–220 KB.

## Initial Home decorative payload

Target:

- above-the-fold decorative raster payload ≤ 750 KB;
- complete Home decorative payload ≤ 1.8 MB;
- below-the-fold event images may lazy-load where implementation permits.

## Technical rules

- local repository hosting only;
- WebP preferred;
- no third-party image CDN dependency;
- avoid stacking three large transparent PNGs;
- SVGs should be minified before production.

---

# 18. Accessibility / Localization Requirements

All decorative art is non-semantic.

Use:

- CSS backgrounds;
- `aria-hidden="true"` for decorative inline elements;
- HTML for all status text;
- non-color state indicators;
- `prefers-reduced-motion` for animated transfer / mist / pulse effects.

All six site locales must remain functional without image-text dependencies.

---

# 19. V2 Production Batches

## Batch A — Structural Foundation

**Goal:** remove the current cyber-fantasy UI garnish before adding richer art.

Required:

- STR-01 Section Header Plate
- STR-02 Compact Label Plate
- STR-03 Content Slot Frame
- STR-05 Soft Divider
- ALL-01 Rank Plate Set
- STA-01 / 02 / 03 / 04 status chips

**Method:** SVG/CSS only.

**Dependency:** none.

---

## Batch B — Season Shell

Required:

- SEA-01 Torii + Shrine Mist
- SEA-02 Oni Statue Shadow
- SEA-04 Miasma Strip

**Method:** ImageGen → WebP.

**Dependency:** Batch A should define final panel spacing before crop decisions.

---

## Batch C — Featured Events

Required:

- EVT-PET-01 Pet Supplies
- EVT-TECH-01 Tech Lucky Chest
- EVT-HERO-01 Hero Lucky Chest
- EVT-SUMMER-01 Summer Paradise

**Method:** ImageGen → WebP.

**Dependency:** final card dimensions from Home layout.

---

## Batch D — Operations / Warfare

Required:

- KE-01 Matchup Split Background
- KE-03 Conflict Seam
- KE-04 Server Chip
- KE-05 CP Bar Skin
- ARM-01 Armory Stronghold
- ARM-02 Armory Slot Frame
- ARM-03 Registered State
- ARM-04 Open Contest State
- CAP-01 Rotation Node
- CAP-02 Transfer Path

**Method:** mixed SVG/CSS + ImageGen for ARM-01.

---

## Batch E — Polish

Optional:

- SEA-03 Lantern Accent
- SEA-05 Petal Drift
- ALL-02 Alliance Banner Accent
- STR-04 Tab family
- future Capital environment once real reference exists.

---

# 20. Recommended Generator Order

Generate in this order to minimize wasted iterations:

1. **SEA-01 Torii + Shrine Mist** — establishes Season shell rendering language.
2. **EVT-PET-01 Pet Supplies** — tests object-centered event approach.
3. **EVT-SUMMER-01 Summer Paradise** — tests controlled multi-palette rule.
4. **EVT-LUCKY-BASE-01 Lucky Chest family base**.
5. **EVT-TECH-01** and **EVT-HERO-01** as controlled variations.
6. **ARM-01 Armory Stronghold**.
7. **SEA-02 Oni Statue Shadow**.
8. **SEA-04 Miasma Strip**.

Do not generate all assets in one broad prompt. Each family should be reviewed before generating the next.

---

# 21. Visual QA Checklist

Before any V2 asset is merged into Home, answer yes to all relevant items.

## Structural

- Does it look like game UI rather than generic SaaS?
- Is it chunky/clear rather than cyber-thin?
- Does it communicate grouping/state?
- Is HTML text still dominant?

## Event

- Can the event be recognized without reading the title?
- Does the artwork have one clear centerpiece?
- Is the event-local palette preserved?
- Is the illustration subordinate to information?

## Sealed Island

- Does the environment reference shrine / torii / lantern / oni statue / mist language?
- Does it avoid falling back to crest / occult-circle language?
- Is the blue-violet + warm lantern balance present?

## Warfare

- Does KE read as matchup rather than security dashboard?
- Is the 504 side / opponent side visually clear?
- Are alliance/server facts still HTML data rather than baked art?

## Armory

- Does the Armory read as a military stronghold?
- Is Open Contest visually distinct from Registered?
- Does Open Contest avoid implying a winner?

---

# 22. V1 Replacement Map

The following current V1 decorative assets should be replaced after their V2 equivalents are accepted.

| Current V1 asset / behavior | V2 replacement |
|---|---|
| generic panel corner SVG | STR-01 / structural panel treatment |
| repeated sealed-line divider | STR-05 used selectively |
| Pet Supplies line-art chest | EVT-PET-01 |
| Tech Lucky Chest line-art box | EVT-TECH-01 |
| Hero Lucky Chest generic circles | EVT-HERO-01 |
| Summer Paradise generic sun/waves | EVT-SUMMER-01 |
| KE warning triangle / cyber lines | KE-01 + KE-03 + KE-05 |
| tiny generic Armory hex marker | ARM-02 + ARM-03/04 |
| generic capital transfer ornament | CAP-01 + CAP-02 |
| repeated cyber corner decoration on all panels | structural plate system + reduced ornament density |

Do not delete V1 files until visual QA confirms all mapped V2 replacements are live and stable.

---

# 23. Current Home Data Considerations

The asset system must support current Server 504 operational data without hardcoding it into images.

## Saturday KE

Current known matchups:

- AP3X → UNTA → Server #515;
- UIC → LUMJ → Server #498.

The asset system must also support unknown future matchups without regeneration.

## Capital

Current:

- Current Capital Owner: DUD;
- Next Capital Owner: CMRD.

These values remain HTML data.

## Armory

Current registration:

- Armory 1 — AP3X;
- Armory 2 — LTNX;
- Armory 3 — UIC;
- Armory 4 — Open Contest: DUD / CMRD / IDS / iDGF;
- Armory 5 — iDGF;
- Armory 6 — DUD;
- Armory 7 — CMRD;
- Armory 8 — IDS.

Asset states must support these values without creating alliance-specific raster art.

---

# 24. Acceptance Criteria for Asset Spec V2 Completion

The V2 asset phase is ready for Home reintegration when:

1. all P0 structural SVG/CSS assets exist;
2. Pet Supplies, Summer Paradise and Lucky Chest family have approved generated vignettes;
3. KE has a game-native blue-vs-red matchup system;
4. Armory has a real stronghold motif plus Registered / Open Contest state system;
5. Capital uses functional handover visuals only;
6. no V2 asset uses the deprecated crest language;
7. no event is represented by a generic line-art watermark;
8. all generated production art is textless;
9. Home remains within the performance budget;
10. mobile crops are approved before merge.

---

# 25. Next Document

The next production artifact should be:

**`Dark_War_Survival_Generator_Prompt_Pack_V2.md`**

It should contain one generator-ready prompt per raster asset family, beginning with:

1. SEA-01 Torii + Shrine Mist;
2. EVT-PET-01 Pet Supplies;
3. EVT-SUMMER-01 Summer Paradise;
4. EVT-LUCKY-BASE-01 Lucky Chest;
5. ARM-01 Armory Stronghold.

Each prompt should define:

- composition;
- game reference traits;
- negative space;
- forbidden elements;
- output format intent;
- crop target;
- transparency requirement where relevant;
- acceptance checklist.
