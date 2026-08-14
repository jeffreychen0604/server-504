# Server 504 — Home Reintegration Plan V2

**Project:** Dark War: Survival — Server 504 Public Portal  
**Target:** Home / Operations Dashboard  
**Season anchor:** Season 4 — Sealed Island  
**Source authority:** `Dark_War_Survival_Decorative_Asset_Audit_V2.md`, `Dark_War_Survival_Decorative_Asset_Spec_V2.md`, `Dark_War_Survival_Generator_Prompt_Pack_V2.md`  
**Status:** Production reintegration plan  
**Date:** 2026-08-15

---

## 1. Objective

Rebuild the Home decorative layer using V2 assets grounded in actual Dark War: Survival UI and event imagery.

The goal is not to add more decoration. The goal is to **replace the current generic cyber-fantasy decorative layer with a game-native asset system**.

Core rule:

> **Replace, not overlay.**

Whenever a V2 asset is integrated, the V1 decorative element serving the same visual role must be removed.

---

## 2. Batch G1 Review

### G1-01 — Sealed Island Shrine / Torii Environment
**Decision:** ACCEPT WITH PRODUCTION CROP

Strengths:
- immediately reads as Sealed Island;
- shrine / torii / lantern / blue-violet forest language matches supplied references;
- giant oni presence is grounded in the real season hub;
- moonlit composition fits Home hero.

Production use:
- Hero environment layer only;
- crop so title area remains readable;
- use dark gradient mask on the text side;
- do not reuse as generic background for every panel.

### G1-02 — Pet Supplies Vignette
**Decision:** ACCEPT

Strengths:
- physical orange supply station;
- pet mascot + paw motifs;
- blue / purple / gold chest identity;
- good negative space for web text;
- much closer to real event UI than previous line-art watermark.

Production use:
- Featured Events → Pet Supplies only;
- right-aligned visual with soft fade into card;
- no large opaque overlay over body copy.

### G1-03 — Summer Paradise Vignette
**Decision:** ACCEPT ART DIRECTION, REGENERATE PRODUCTION COMPOSITION

Strengths:
- correct tropical palette;
- surf / coconut / palm / bright beach identity;
- recognizable event mood.

Issue:
- hero subject currently occupies the left side while existing card copy is left-aligned.

Required production variant:
- subject / surfboard / coconut shifted to the right 35–45% of frame;
- left 50–60% kept calmer for HTML copy;
- retain turquoise sea, bright sky and yellow tropical identity.

### G1-04 — Lucky Chest Base Vignette
**Decision:** ACCEPT BASE FAMILY

Strengths:
- roulette-wheel centerpiece matches in-game Lucky Chest grammar;
- warm brown + gold framing is correct;
- reward nodes are readable at reduced scale.

Production use:
- derive two variants:
  - Tech Lucky Chest;
  - Hero Lucky Chest.

Do not reuse the exact same wheel illustration unchanged for both cards.

### G1-05 — Armory Stronghold Vignette
**Decision:** ACCEPT

Strengths:
- strong physical building identity;
- battlefield smoke / occupation mood;
- matches Armory Assault reference;
- can support Shared Assets without pretending Armory is an abstract magical slot.

Production use:
- Armory Registration section as a low-opacity environment/support asset;
- small stronghold state markers should still be CSS/SVG, not copies of this full artwork.

---

## 3. Reintegration Principles

### 3.1 Game UI structure before artwork

The hierarchy remains:
1. readable information;
2. structural UI frame;
3. semantic state;
4. decorative artwork.

Artwork must never become the first thing the user has to parse.

### 3.2 No universal dark recolor

The Home shell remains Sealed Island, but event cards retain local event palettes:
- Pet Supplies → orange/copper;
- Lucky Chest → warm brown/gold;
- Summer Paradise → yellow/turquoise/green;
- KE → blue vs red;
- Armory → battlefield blue-gray/orange.

### 3.3 One centerpiece per event

Each event card gets one recognizable object family, not multiple unrelated decorative layers.

### 3.4 Localization remains HTML

No production asset may contain:
- event title;
- badge copy;
- server number;
- duration;
- reward text;
- alliance name.

### 3.5 Remove V1 when V2 lands

Deprecated visual families:
- cyber corner brackets;
- thin circuit-like header dividers;
- generic line-art chest watermarks;
- generic sun/wave Summer Paradise watermark;
- random warning triangles;
- invented sci-fi tactical geometry;
- any surviving crest/ring language.

---

## 4. Implementation Order

### Pass 0 — Inventory and cleanup map

Before integrating images:
- identify every V1 pseudo-element and background-image in `home-asset-language.css`;
- mark each as KEEP / REPLACE / REMOVE;
- do not add a new V2 layer until its old visual role has a removal path.

Expected output:
- no duplicate decorative systems after each section is migrated.

---

### Pass 1 — Hero / Season Shell

#### New asset
`assets/decorative/v2/season/sealed-island-shrine-hero.webp`

#### Target selectors
- `.ops-dashboard`
- `.dashboard-season-bg`
- `.dashboard-head`

#### Treatment
- use the generated shrine/torii scene as the main environmental layer;
- title remains left;
- artwork is biased right / center-right;
- dark navy-to-transparent text safety mask on left;
- lantern amber is allowed to remain warm;
- oni remains atmospheric, not a logo or mascot.

#### Remove
- existing generic Oni/Blood-Moon overlay if redundant;
- any random mascot / icon overlay;
- cyberline hero ornaments;
- redundant shrine/background art underneath the new hero image.

#### Acceptance
- the hero reads as Sealed Island even without the text `S4 · Sealed Island`;
- title is readable at 1366px and mobile widths;
- no standalone crest or centered emblem.

---

### Pass 2 — Featured Events

#### Pet Supplies
Asset:
`assets/decorative/v2/events/pet-supplies-vignette.webp`

Placement:
- right 35–45% of card;
- gradient fade toward text;
- preserve orange/copper station and pet chest colors.

Remove:
- current outline supply-box watermark.

#### Summer Paradise
Asset:
`assets/decorative/v2/events/summer-paradise-vignette.webp`

Required before integration:
- regenerate right-anchored production composition.

Placement:
- character/props on right;
- text remains left;
- this is intentionally the brightest event card.

Remove:
- generic sun/wave watermark.

#### Tech Lucky Chest
Asset:
`assets/decorative/v2/events/lucky-chest-tech.webp`

Derived from Lucky Chest base:
- partial gold roulette arc;
- material / tech reward tokens;
- cooler cyan/steel reward accents.

Remove:
- generic line-art tech chest.

#### Hero Lucky Chest
Asset:
`assets/decorative/v2/events/lucky-chest-hero.webp`

Derived from Lucky Chest base:
- partial gold roulette arc;
- three hero-token sockets;
- gold/purple rarity accents;
- no invented hero portraits.

Remove:
- current bubble/portrait-like generic watermark.

#### Acceptance
- all four cards are visually distinguishable before reading the title;
- no card illustration covers more than roughly 45% of its usable text area;
- no repeated generic decorative motif between unrelated events.

---

### Pass 3 — Saturday KE

V2 direction is primarily CSS/SVG, not ImageGen.

#### New structural assets
- `ke-matchup-split.svg`
- `ke-neutral-banner.svg`
- `ke-conflict-seam.svg`
- `ke-server-chip.svg`

#### Layout direction
Each opponent row becomes a compact matchup:

`504 alliance / blue side  ↔  opponent / red side`

Data remains the same:
- alliance;
- opponent alliance;
- opponent server;
- Total CP.

#### Remove
- generic warning triangle background;
- random tactical header lines;
- unrelated cyber geometry.

#### Keep
- CP visualization if readable;
- threat intensity only as comparative presentation, not official rating.

#### Acceptance
- visually resembles Alliance Duel opposition language without copying a game screenshot;
- AP3X vs UNTA and UIC vs LUMJ scan as matchups, not database rows.

---

### Pass 4 — Active Alliances

Mostly CSS/SVG refinement.

#### New assets
- `rank-plate-1.svg`
- `rank-plate-2.svg`
- `rank-plate-3.svg`
- `rank-plate-neutral.svg`

#### Treatment
- top 3 receive game-inspired rank color treatment;
- rank 4–8 remain clean and neutral;
- CP bars remain secondary;
- no large background illustration.

#### Remove
- generic decorative corner/header motifs if they do not support ranking hierarchy.

---

### Pass 5 — Shared Assets / Capital

#### Capital
No ImageGen Capital artwork until a direct Capital screenshot exists.

Use CSS/SVG:
- current node;
- transfer path;
- next node;
- small banner/occupation-inspired plates.

Keep semantics:
- Current Capital Owner = DUD;
- Next Capital Owner = CMRD.

Remove:
- any magical / ritual visual language;
- any leftover crest-dependent composition.

---

### Pass 6 — Armory Registration

#### Environment asset
`assets/decorative/v2/operations/armory-stronghold.webp`

Use as:
- low-opacity section support art;
- background edge, not full-card wallpaper.

#### State assets
Build with CSS/SVG:
- `armory-state-registered.svg`
- `armory-state-open-contest.svg`
- `armory-state-available.svg`
- `armory-state-pending.svg`

Current state:
- Armory 1 — AP3X
- Armory 2 — LTNX
- Armory 3 — UIC
- Armory 4 — Open Contest: DUD · CMRD · IDS · iDGF
- Armory 5 — iDGF
- Armory 6 — DUD
- Armory 7 — CMRD
- Armory 8 — IDS

Counter:
- `7 / 8 registered`

Armory 4 must not be visually counted as owned/registered.

#### Acceptance
- Registered and Open Contest states are distinguishable at a glance;
- Armory feels like a military stronghold system rather than a generic hex-grid registry.

---

### Pass 7 — Announcements / Migration / Quick Access

Do not over-decorate.

Actions:
- remove repeated cyber corner ornament;
- use clean game-like label plates;
- keep announcement priority semantic;
- keep Migration functional and restrained;
- Quick Access gets consistent rounded/chunky plate treatment only.

---

## 5. Asset Processing Pipeline

For each accepted generated asset:

1. preserve high-resolution master outside runtime use;
2. crop to production composition;
3. remove unnecessary empty canvas;
4. export WebP;
5. create desktop and optional mobile crop only when necessary;
6. optimize before commit;
7. host locally in repo;
8. never introduce an external image CDN.

Target runtime sizes:
- event vignette: normally ≤ 220 KB;
- Armory vignette: ≤ 300 KB;
- hero environment: ≤ 450 KB;
- total immediately loaded V2 Home raster budget: target ≤ 1.4 MB.

---

## 6. Responsive Strategy

### Desktop ≥ 1180px
- full event vignettes;
- full Hero environment;
- Armory stronghold support visible.

### Tablet 760–1179px
- crop event artwork harder;
- reduce opacity;
- keep semantic object, remove secondary props.

### Mobile < 760px
- hero uses mobile crop or background-position override;
- event vignettes become smaller right/bottom objects;
- artwork never sits behind more than 2–3 lines of body copy;
- Armory environment may be hidden while state icons remain.

---

## 7. Migration Safety

The V2 reintegration must not modify:
- routing;
- fetch behavior;
- dashboard JSON schema unless separately approved;
- Wiki runtime;
- localization routing;
- contribution flow.

Changes should be limited to:
- decorative assets;
- CSS presentation;
- optional idempotent DOM classes if needed.

---

## 8. Rollout Sequence

Recommended production rollout:

### Release V2-A
- Hero
- Pet Supplies
- Summer Paradise
- Lucky Chest cards

### Release V2-B
- Saturday KE
- Active Alliances

### Release V2-C
- Capital
- Armory Registration

### Release V2-D
- Announcements
- Migration
- Quick Access
- final cleanup of V1 orphan styles/assets

Each release should visually replace the previous role rather than accumulate additional layers.

---

## 9. Final Acceptance Checklist

Home V2 passes only when:

- [ ] no deprecated crest/ring visual remains;
- [ ] no random mascot remains;
- [ ] no generic cyber-HUD corner family remains as the primary decorative language;
- [ ] Hero reads clearly as Sealed Island;
- [ ] Pet Supplies is recognizable from its supply-station/paw motif;
- [ ] Summer Paradise is recognizable from tropical event art;
- [ ] Lucky Chest cards use roulette language;
- [ ] KE reads as alliance-vs-alliance cross-server opposition;
- [ ] Active Alliances feels like a ranking board;
- [ ] Armory reads as a stronghold/occupation system;
- [ ] Armory 4 visibly reads Open Contest, not registered ownership;
- [ ] content remains readable at desktop/mobile sizes;
- [ ] asset payload remains within performance budget;
- [ ] every user-visible label remains HTML and localized;
- [ ] V1 decorative elements replaced by V2 are removed, not merely hidden under new layers.

---

## 10. Immediate Next Actions

1. Generate the right-anchored **Summer Paradise production variant**.
2. Derive **Tech Lucky Chest** and **Hero Lucky Chest** variants from G1-04.
3. Prepare production crops for Shrine, Pet Supplies and Armory.
4. Create the CSS/SVG structural kit for KE, ranking and Armory states.
5. Start Release V2-A integration only after these assets pass review.
