# Dark War: Survival — Generator Prompt Pack V2

**Project:** Server 504 Public Portal  
**Primary target:** Home / Operations Dashboard  
**Season anchor:** Season 4 — Sealed Island  
**Source authority:** `Dark_War_Survival_Decorative_Asset_Audit_V2.md` + `Dark_War_Survival_Decorative_Asset_Spec_V2.md`  
**Document type:** Production prompt pack for generated decorative assets  
**Status:** Production baseline  
**Date:** 2026-08-15

---

# 1. Purpose

This document converts Decorative Asset Spec V2 into repeatable prompts for image generation.

The goal is **not** to generate posters or screenshots. The goal is to create compact, textless, reusable decorative artwork that can be integrated into web panels without competing with HTML content.

Every generated asset must feel grounded in Dark War: Survival's actual in-game visual language supplied through reference screenshots:

- chunky, readable mobile-game forms;
- physical event centerpieces;
- colorful localized event palettes;
- Sealed Island shrine / oni / lantern atmosphere;
- Alliance Duel blue-vs-red PvP language;
- Armory stronghold / occupation imagery;
- reward containers, roulette wheels, chests and tokens.

---

# 2. Global Generation Rules

Apply these rules to every generated asset unless a prompt explicitly overrides them.

## 2.1 Mandatory

- **Textless.** No event title, logo, button label, number, server tag or readable text baked into the image.
- **No Dark War: Survival logo.** The website provides its own HTML copy.
- **No fake alliance logos or fake hero portraits.**
- **No generic fantasy crest.**
- **No occult circle centerpiece.**
- **No cyberpunk HUD decoration.**
- **No random mascot.**
- Composition must support UI placement, not poster storytelling.
- One clear semantic object family per asset.
- Keep silhouettes readable at approximately 180–350 CSS px.
- Favor chunky game-like shapes over thin vector line art.
- Maintain controlled material detail: painted/mobile-game 3D illustration, not photorealism.

## 2.2 Output intent

Generated assets should normally be used as:

- card vignette;
- panel background accent;
- edge illustration;
- environmental layer;
- semantic visual identifier.

They should **not** be used as:

- full-screen wallpaper unless explicitly requested;
- replacement for text labels;
- screenshot replica;
- UI control containing baked-in text.

## 2.3 Negative vocabulary

Unless specifically required, avoid:

- sci-fi circuits;
- holographic reticles;
- futuristic spaceship UI;
- ornate European fantasy heraldry;
- magic runes;
- mandala geometry;
- chrome cyberpunk surfaces;
- realistic firearms as focal decorative objects;
- excessive gore;
- horror imagery that overwhelms readability;
- flat corporate vector illustration.

## 2.4 Style baseline

Use this style phrase as a starting point:

> Stylized premium mobile-game illustration, chunky readable forms, polished 3D-painted rendering, Dark War: Survival-inspired visual grammar, strong silhouette, controlled bloom, rich but readable materials, designed as a textless web UI decorative vignette rather than a poster.

---

# 3. Delivery Format Rules

## 3.1 Raster assets

Preferred production format after review:

- WebP;
- transparent background where possible;
- otherwise edge-faded background suitable for masking into dark panels.

Recommended working generation sizes:

- card vignette: **1536 × 1024** or equivalent 3:2 landscape;
- wide environmental layer: **1792 × 1024** or equivalent wide landscape;
- compact object vignette: **1024 × 1024**;
- vertical/edge prop: **1024 × 1536** where needed.

Final production assets should be cropped and compressed separately.

## 3.2 Transparent-background assets

Use transparent background for:

- isolated supply station / chest groups;
- roulette components;
- Armory stronghold vignette if clean isolation is possible;
- lantern / shrine prop clusters.

Use edge-faded painted background for:

- Sealed Island shrine environment;
- Summer Paradise event scene;
- battlefield smoke / Armory atmosphere.

---

# 4. Prompt Architecture

Each prompt should contain five blocks conceptually:

1. **Role** — what asset is being created for the website.
2. **Subject** — the recognizable in-game-inspired centerpiece.
3. **Composition** — where visual weight and negative space go.
4. **Style/material/color** — local event identity.
5. **Hard exclusions** — no text/logo/crest/etc.

The generator should never be asked only to "make it Dark War style". Always specify the concrete gameplay object language.

---

# 5. P0 ImageGen Assets

These assets are highest priority because they correct the most visible failures on Home.

---

## GEN-P0-01 — Sealed Island Shrine / Torii Environment

**Asset ID:** `ENV-S4-SHRINE-01`  
**Suggested filename:** `assets/decorative/overlays/sealed-island-shrine-v2.webp`  
**Primary placement:** Home hero background / large section atmospheric edge  
**Working ratio:** 16:9 or 3:2 landscape  
**Background:** painted, edge-faded  
**Reference grounding:** Sealed Island main hub, Maple Isle Shrine, Season Weekly Pass.

### Prompt

Create a textless environmental decorative artwork for a Dark War: Survival Server 504 website hero section, inspired by the supplied Season 4 Sealed Island screenshots. Show a moonlit Japanese shrine approach with a large torii gate, layered shrine rooftops, stone steps, warm paper lanterns, blue-violet forest mist, subtle maple foliage, and distant monumental oni-statue shapes partly lost in fog. The environment should feel like a dangerous sealed island at night but still polished and adventurous rather than horror-heavy. Use indigo, moonlit blue, muted violet, shrine red, and warm amber lantern light. Composition must be strongly weighted to the right and upper-right, leaving the left 40–45% visually quiet and darker for large HTML dashboard text. Use atmospheric depth and soft edge fading so the artwork can blend into a dark website background. Stylized premium mobile-game 3D-painted illustration, chunky readable architecture, controlled bloom, strong silhouette, no poster framing.

### Hard exclusions

No text, no logo, no circular crest, no glowing occult rune circle, no cyberpunk UI, no mascot, no character portrait dominating the frame, no modern city.

### Acceptance criteria

- Still reads as Sealed Island when all website text is removed.
- Torii/shrine/lantern identity visible at thumbnail scale.
- Left side remains usable for title copy.
- Oni element is environmental, not a giant sticker-like foreground object.

---

## GEN-P0-02 — Pet Supplies Event Vignette

**Asset ID:** `EV-PET-SUPPLIES-01`  
**Suggested filename:** `assets/decorative/events/pet-supplies-v2.webp`  
**Primary placement:** Featured Events → Pet Supplies card  
**Working ratio:** 3:2 landscape  
**Background:** transparent preferred  
**Reference grounding:** Pet Supplies in-game Supply Station screenshot.

### Prompt

Create a textless reusable event-card vignette inspired by the Dark War: Survival Pet Supplies Supply Station screen. The centerpiece is a cropped warm orange/copper pet supply cabinet with rounded chunky construction, polished metal edges, and two or three visible pet-supply chests on shelves: one blue/steel rarity chest, one purple rarity chest, and one gold/orange rarity chest, each using a simple paw-emblem motif. A friendly husky-like pet may appear only partially at the upper edge — paws and head peeking over the station — as a secondary accent, not a full character portrait. Add warm gold highlights and subtle reward glow while preserving the physical supply-station feeling. Compose the object cluster on the right 40% of a landscape canvas with generous transparent/empty space on the left for HTML text. Premium mobile-game 3D-painted rendering, chunky readable shapes, playful but polished.

### Hard exclusions

No text, no event title, no buttons, no counters, no fake currencies, no generic fantasy treasure chest family unrelated to pet supplies, no dark cyberpunk recolor, no giant line-art watermark.

### Acceptance criteria

- Immediately recognizable as Pet Supplies / pet supply station.
- Copper-orange body is the dominant material language.
- Paw identity is readable without text.
- Works as a right-edge card vignette at roughly 300 px wide.

---

## GEN-P0-03 — Summer Paradise Event Vignette

**Asset ID:** `EV-SUMMER-PARADISE-01`  
**Suggested filename:** `assets/decorative/events/summer-paradise-v2.webp`  
**Primary placement:** Featured Events → Summer Paradise Big Event card  
**Working ratio:** 3:2 landscape  
**Background:** painted with soft edge fade  
**Reference grounding:** supplied Summer Paradise promotional splash.

### Prompt

Create a textless landscape event-card vignette inspired by the supplied Dark War: Survival Summer Paradise promotional splash. Show a muscular post-apocalyptic survivor enjoying a tropical island break, cropped to upper body or three-quarter figure on the right side, wearing a bright yellow floral beach shirt and holding a coconut drink, with a surfboard, palm leaves, turquoise ocean, sunlit sand, distant volcanic island, and bright blue summer sky as supporting motifs. The scene must feel like a special in-game summer event, not a generic travel advertisement. Use strong sun-yellow, turquoise, tropical green and warm sand colors. Keep the left 45% darker/cleaner or naturally faded for HTML text, while the right side carries the character and props. Stylized premium mobile-game illustration consistent with Dark War: Survival character rendering, vivid daylight, clear silhouettes, controlled detail.

### Hard exclusions

No logo, no readable beach signs, no ALOHA text, no event title, no travel-agency graphic design, no modern resort hotel, no photorealism, no cyberpunk overlay.

### Acceptance criteria

- Clearly tropical and visually brighter than the surrounding Sealed Island shell.
- Still feels like an event inside the same game universe.
- Character/props stay on the right and do not compromise card copy.
- No baked-in wording.

---

## GEN-P0-04 — Lucky Chest Base Vignette

**Asset ID:** `EV-LUCKY-CHEST-BASE-01`  
**Suggested filename:** `assets/decorative/events/lucky-chest-base-v2.webp`  
**Primary placement:** base artwork family for Tech Lucky Chest and Hero Lucky Chest  
**Working ratio:** 3:2 landscape  
**Background:** transparent preferred  
**Reference grounding:** supplied Lucky Chest roulette screenshot.

### Prompt

Create a textless reusable Dark War: Survival-style Lucky Chest event vignette based on a large physical roulette wheel rather than a treasure chest. Show the right half or lower-right arc of a chunky circular roulette wheel with a thick gold rim, dark warm brown segmented face, central gold hub, a clear pointer/needle, and several colorful circular reward-token sockets around the wheel. Add a few small milestone chest shapes along the lower edge as secondary details. The object should feel tactile, wooden/metallic, warm and game-like, with amber candlelight and controlled gold bloom. Compose the wheel mainly on the right side of a landscape canvas with transparent/empty space on the left for website copy. Premium polished mobile-game 3D-painted style, strong readable silhouette.

### Hard exclusions

No text, no numbers, no question-mark text symbol, no hero portrait, no event logo, no casino realism, no slot-machine aesthetic, no sci-fi wheel.

### Acceptance criteria

- Reads instantly as a reward roulette.
- Gold/brown shell matches the supplied Lucky Chest visual grammar.
- Reward sockets are abstract enough to support multiple variants.
- Can be reused as a common family base.

---

## GEN-P0-05 — Armory Stronghold Vignette

**Asset ID:** `OPS-ARMORY-STRONGHOLD-01`  
**Suggested filename:** `assets/decorative/operations/armory-stronghold-v2.webp`  
**Primary placement:** Shared Assets → Armory registration panel / optional Armory section header background  
**Working ratio:** 3:2 landscape or 1:1 isolated building  
**Background:** transparent or battlefield-edge fade  
**Reference grounding:** Armory Assault screenshot.

### Prompt

Create a textless decorative stronghold vignette inspired by the Dark War: Survival Armory Assault screen. Show a compact fortified industrial Armory building with a central control tower, armored walls, antenna dishes, small defensive emplacements, gates, service structures and military outpost details. The structure should be stylized and chunky like a premium mobile strategy game building, viewed from a slightly elevated isometric angle. Add restrained battlefield smoke, warm distant explosions and cool blue-gray evening atmosphere if using a painted background. Keep the building clearly readable as the main object and suitable for use at small UI scale. Compose toward the right or center-right with negative space available for Armory registration text. Use steel gray, muted military green, blue-gray shadows and orange fire accents.

### Hard exclusions

No text, no TS lettering, no logo, no sci-fi spaceship tower, no modern real-world military insignia, no giant weapon as centerpiece, no cyber HUD.

### Acceptance criteria

- Reads as a fortified Armory/stronghold at thumbnail scale.
- Supports the semantic meaning of occupation/registration.
- Does not imply a particular alliance owner.
- Can sit behind or beside Armory state slots without dominating them.

---

# 6. P1 ImageGen Assets

---

## GEN-P1-01 — Oni Statue Shadow Layer

**Asset ID:** `ENV-S4-ONI-STATUE-01`  
**Format:** transparent/soft-fade WebP  
**Use:** Home hero secondary atmosphere  
**Reference:** Sealed Island main hub giant oni statue.

### Prompt

Create a textless atmospheric secondary overlay inspired by the monumental oni statue seen in Dark War: Survival Season 4 Sealed Island. Show only a large weathered stone oni guardian silhouette emerging through blue-violet fog, with horns and massive shoulders readable but facial detail subdued. It should feel like distant environmental architecture, not a character portrait. Use moonlit slate-blue stone, indigo haze and faint cold rim light. Keep edges soft and partially obscured so the asset can sit behind website content.

### Exclude

No crest, no glowing eyes dominating the frame, no demon sticker, no blood/gore, no text.

---

## GEN-P1-02 — Shrine Lantern Cluster

**Asset ID:** `ENV-S4-LANTERN-01`  
**Format:** transparent WebP  
**Use:** panel edges / section transitions  
**Reference:** Maple Isle Shrine and Season Weekly Pass.

### Prompt

Create a small transparent decorative cluster of Japanese shrine lanterns and a partial wooden shrine post inspired by Dark War: Survival Sealed Island. Warm amber paper lantern light, dark lacquered wood, subtle blue-violet mist around the base, premium stylized mobile-game 3D-painted rendering. Designed as an edge decoration for a dark website panel, compact silhouette, no full background.

---

## GEN-P1-03 — Miasma Fog Strip

**Asset ID:** `ENV-S4-MIASMA-01`  
**Format:** transparent WebP  
**Use:** hero / warning / spoiler backgrounds  
**Reference:** Miasma Bursts Alert / Sealed Island purple corruption.

### Prompt

Create a transparent horizontal atmospheric fog strip inspired by Dark War: Survival Sealed Island miasma. Layered rolling blue-violet and restrained crimson-purple vapor, soft luminous inner edges, occasional tiny pink petal-like particles, no characters, no symbols, no text. Designed to overlay the bottom or corner of website sections without obscuring content.

---

# 7. Lucky Chest Variants

These should share the same base visual family rather than being unrelated artworks.

---

## GEN-P1-04 — Tech Lucky Chest Variant

**Asset ID:** `EV-LUCKY-CHEST-TECH-01`  
**Base dependency:** `EV-LUCKY-CHEST-BASE-01`

### Prompt

Create a textless Tech Lucky Chest variant using the same warm brown and gold roulette-wheel visual family as the Dark War: Survival Lucky Chest reference. The wheel remains the main object on the right, but the circular reward sockets contain abstract technology/material motifs: metallic components, research chips, mechanical parts, blue energy cells and upgrade materials. Add cool cyan/steel highlights only inside reward tokens while preserving the warm gold/brown roulette shell. Leave the left side clean for HTML text.

### Exclude

No readable item text, no fabricated UI numbers, no futuristic spaceship technology, no full-screen laboratory.

---

## GEN-P1-05 — Hero Lucky Chest Variant

**Asset ID:** `EV-LUCKY-CHEST-HERO-01`  
**Base dependency:** `EV-LUCKY-CHEST-BASE-01`

### Prompt

Create a textless Hero Lucky Chest variant using the same gold-rimmed warm brown roulette-wheel visual family as the supplied Dark War: Survival Lucky Chest. Place three prominent circular hero-selection sockets around the visible wheel arc, represented by tasteful anonymous silhouette medallions or empty portrait frames rather than invented hero faces. Use gold, purple and controlled red rarity accents. Keep the wheel on the right with clean negative space on the left. Premium mobile-game 3D-painted rendering.

### Exclude

No fake Lan, Darian or Katrina portraits, no readable names, no logo, no character faces unless exact reusable official art is later supplied.

---

# 8. Structural Assets — Do Not Use ImageGen by Default

The following assets should be built as SVG/CSS first because they require precise alignment, resizing and localization-safe behavior.

| Asset ID | Name | Recommended implementation |
|---|---|---|
| `UI-HEADER-PLATE-01` | Section header plate | CSS/SVG |
| `UI-TAB-PLATE-01` | Thick game-like tab | CSS/SVG |
| `UI-LABEL-CHIP-01` | Metadata / status chip | CSS/SVG |
| `UI-SLOT-FRAME-01` | Generic data slot frame | CSS/SVG |
| `UI-RANK-PLATE-01` | Rank 1/2/3 plate family | CSS/SVG |
| `OPS-KE-SERVER-CHIP-01` | Server number chip | CSS/SVG |
| `OPS-KE-CP-METER-01` | CP comparison bar | CSS |
| `OPS-ARMORY-STATE-01` | Armory state frame family | CSS/SVG |
| `OPS-CAPITAL-NODE-01` | Capital current/next node | CSS/SVG |
| `OPS-CAPITAL-PATH-01` | Capital transfer path | SVG/CSS |

These should visually borrow from the game but must remain deterministic UI components.

---

# 9. P1/P2 Operational Generator Assets

---

## GEN-P1-06 — KE Matchup Background

**Asset ID:** `OPS-KE-MATCHUP-BG-01`  
**Suggested filename:** `assets/decorative/operations/ke-matchup-bg-v2.webp`  
**Reference:** Alliance Duel Match Status / Enemy Buster.

### Prompt

Create a textless wide background vignette for a Dark War: Survival cross-server Alliance Duel / Saturday KE matchup panel. Divide the composition softly into a cool alliance-blue left side and a warm enemy red/pink right side, blending through a bright gold-white conflict seam in the center. Include two neutral hanging banner silhouettes facing each other at the outer left and right edges, with subtle electric tension/lightning connecting toward the center. Keep the middle and lower center relatively clean for HTML matchup data. Premium mobile-game competitive screen aesthetic, soft gradients, chunky banner forms, no cyberpunk HUD.

### Hard exclusions

No alliance logos, no server numbers, no VS text baked in, no characters, no weapons, no scoreboard numbers.

---

## GEN-P2-01 — Armory Contest Atmosphere

**Asset ID:** `OPS-ARMORY-CONTEST-01`  
**Use:** Armory 4 Open Contest visual state accent.

### Prompt

Create a compact textless battle-state vignette for an open Armory contest in a stylized mobile strategy game. Show the fortified Armory stronghold in the background with two or more opposing colored directional banners/chevrons converging toward it, small smoke plumes and restrained warm battle glow. The image must communicate contested occupation without showing a winner or owner. Neutral alliance identities only, no logos, no readable text. Designed as a subtle web UI panel accent rather than a battle poster.

---

# 10. Generator Review Checklist

Every generated candidate must be reviewed before entering the repo.

## 10.1 Semantic check

Ask:

- Can a Dark War player identify the gameplay/event family without reading text?
- Does the asset communicate the correct object/state?
- Is it tied to the supplied game references rather than generic genre imagery?

Reject if the answer is no.

## 10.2 Composition check

Reject if:

- the focal object sits underneath planned text;
- artwork fills 100% of the card with no breathing room;
- important silhouette disappears at 250 px width;
- crop requires cutting through the centerpiece;
- full-screen poster composition is required to make sense.

## 10.3 Authenticity check

Reject if it introduces:

- generic cyber HUD;
- ornate magical crest;
- random decorative mascot;
- fake alliance logo;
- fake hero portrait;
- unrelated fantasy iconography;
- text-like glyphs that resemble accidental labels.

## 10.4 Localization check

Reject any final production candidate containing readable baked-in words.

All:

- titles;
- badges;
- event names;
- dates;
- server numbers;
- status labels;
- reward wording

remain HTML/CSS.

## 10.5 Performance check

After conversion to production WebP:

- normal card vignette target: ≤ 220 KB;
- large hero environment target: ≤ 450 KB;
- compact overlay target: ≤ 140 KB;
- no production PNG unless alpha quality cannot be retained in WebP;
- no third-party runtime image dependency.

---

# 11. Generation Order

Generate and review in this order.

## Batch G1 — Fix the most visible Home failures

1. `ENV-S4-SHRINE-01`
2. `EV-PET-SUPPLIES-01`
3. `EV-SUMMER-PARADISE-01`
4. `EV-LUCKY-CHEST-BASE-01`
5. `OPS-ARMORY-STRONGHOLD-01`

Do **not** integrate any of them until all five have been reviewed as one visual family.

## Batch G2 — Variants and atmosphere

6. `EV-LUCKY-CHEST-TECH-01`
7. `EV-LUCKY-CHEST-HERO-01`
8. `ENV-S4-ONI-STATUE-01`
9. `ENV-S4-LANTERN-01`
10. `ENV-S4-MIASMA-01`

## Batch G3 — Operations

11. `OPS-KE-MATCHUP-BG-01`
12. `OPS-ARMORY-CONTEST-01`

Structural SVG/CSS assets should be built alongside G1/G2 but do not require generator output.

---

# 12. Batch G1 Contact Sheet Review Criteria

Before Home integration, view all five G1 assets together.

They pass only if:

- they look like they belong to the **same game universe**;
- they do **not** all use the same palette;
- Sealed Island artwork is atmospheric, while event artwork is object-centered;
- Pet Supplies and Lucky Chest are instantly distinguishable;
- Summer Paradise is intentionally brighter;
- Armory is clearly operational/military rather than shrine/fantasy;
- none rely on abstract cyber line art to provide identity.

If one asset feels like stock fantasy or generic mobile art, regenerate that asset rather than tinting it in CSS.

---

# 13. Home Integration Principle After Generation

Generated artwork is only one layer.

The final component composition should be:

```text
Game-inspired structural frame (CSS/SVG)
        +
HTML content / localized labels
        +
Event- or operation-specific generated vignette
        +
Minimal state animation / hover polish
```

Never use:

```text
Generic dark card
        +
Huge generated watermark
        +
More glow
```

That is the exact V1 failure pattern this prompt pack is designed to prevent.

---

# 14. Production Handoff

After Batch G1 is approved:

1. crop candidates to final UI-safe compositions;
2. convert/optimize to WebP;
3. store in `assets/decorative/...`;
4. remove replaced V1 SVG/watermark assets;
5. update `home-asset-language.css` with V2 artwork mapping;
6. keep text and badges in HTML/CSS;
7. QA desktop/tablet/mobile;
8. verify total Home asset payload;
9. only then deploy to `main`.

---

# 15. Next Document / Execution Artifact

The next implementation artifact should be:

`Dark_War_Survival_Home_Reintegration_Plan_V2.md`

However, it should be written **after Batch G1 artwork has been generated and reviewed**, because actual crop behavior and negative-space quality will determine final card layouts.
