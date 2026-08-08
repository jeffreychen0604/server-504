# Wiki Coverage & Content Quality Audit

> **Updated:** 8 Aug 2026  
> **Scope:** Repository-level audit of the Server 504 Game Wiki  
> **Authority:** This page describes documentation coverage and maintenance state. It does not create gameplay rules.

The Server 504 Wiki is now broad enough that adding more articles without an explicit coverage model would create duplication faster than useful knowledge.

W19 therefore changes the question from **“What article should we add next?”** to **“Which player-facing system is already covered, which facts are still verification blockers, and which gaps are worth the maintenance cost?”**

The machine-readable source for this audit is `content/wiki-coverage.json`.

## Coverage status model

| Status | Meaning |
| --- | --- |
| **Covered** | A dedicated, usable reference layer exists. Routine maintenance matters more than adding another overview. |
| **Covered — Verify** | The system is documented, but exact values, unlocks, prices, limits or Server 504 UI fields remain unresolved. |
| **Partial** | Useful material exists, but there is not enough dedicated coverage to call the domain complete. |
| **Backlog** | No dedicated reference layer yet. Research should begin only when player value justifies the maintenance cost. |

## Current coverage matrix

| Domain | Status | Main remaining work |
| --- | --- | --- |
| Foundation & Game Orientation | **Covered** | Maintain current-era framing. |
| Combat, Formations & Reports | **Covered** | Keep Capital/defense exceptions versioned after patches. |
| Heroes, Factions & Investment | **Covered** | Preserve the deliberate S-rarity focus; resolve Lan Yan faction with Server 504 UI. |
| Hero Equipment & Exclusive Equipment | **Covered — Verify** | Current late-game/red-equipment resource tables. |
| Watchtower, Industrial & Troop Progression | **Covered — Verify** | Disputed prerequisites and exact Industrial/Precision Part tables. |
| Research Center & Technology Trees | **Covered — Verify** | Exact node costs, second research queue and advanced-tree values. |
| Shelter Buildings & Survivor Systems | **Covered — Verify** | Infirmary meaning plus several unlock/per-level conflicts. |
| Recruitment, Exploration & Daily Utility | **Covered — Verify** | Recruitment pools/pity, refresh ladders, idle cap and Energy schedule. |
| APC, Chips, Parts & Tactical Modification | **Covered — Verify** | Exact Chip Factory recipes and current Parts Lv.1–66 costs. |
| Pet Agents & Special Ops Outpost | **Covered — Verify** | Full unlock chain, costs, training ranges and event point values. |
| Alliance Administration, Territory & Shared Systems | **Covered — Verify** | Alliance Tech/Hall/Gifts tables, Armory UI and season-specific territory rules. |
| Recurring Alliance & State Events | **Covered** | Maintain current scoring/rules without freezing old event tuning into permanent truth. |
| World Map & State Systems | **Covered — Verify** | Shields, map-zone control rules, live Mutant Mine schedule and Presidential buffs. |
| Shops, Currencies & Resource Sources | **Covered — Verify** | Current Server 504 inventory, prices and purchase limits. |
| Season 4 — Sealed Island | **Covered — Verify** | Numeric thresholds, shop prices and seasonal contribution tables. |
| Calculators, Verification & Data Audits | **Covered** | Graduate formulas into calculators only after confidence is sufficient. |
| Competitive & Side-Mode Encyclopedic Coverage | **Partial** | Dedicated current references for Arena, Trial, Total War, Black Gold Battlefield, Lost Lands and Origin Lands if demand justifies them. |
| VIP & Store Progression | **Partial** | VIP progression/benefits are not yet a dedicated system reference. |
| Social, Account & Communication Utilities | **Backlog** | Mail, chat, profile/account utility and similar low-strategy systems. |

## What W19 treats as duplication

Two pages are not automatically duplicates because they mention the same mechanic.

The preferred information architecture is:

1. **Overview / hub** — explains the system boundary and points to deeper references.
2. **Mechanic reference** — explains one stable subsystem in enough detail to make decisions.
3. **Data audit** — isolates disputed or version-sensitive numeric claims.
4. **Verification queue** — records evidence still needed from current Server 504 UI.

A new article should be rejected when it merely restates an existing mechanic reference with different wording.

A separate article is justified when it has a different maintenance lifecycle. For example, an APC system overview and an APC current-cost audit should remain separate because one is conceptually stable while the numeric table can become stale after a patch.

## Current / legacy / season-specific rule

Every future edit should classify changing information mentally before it is written:

### Current

Use for mechanics supported by current official notes, current in-game evidence, or sufficiently recent corroborated community data.

Do not attach the word **current** to a number if the evidence only proves the system exists.

### Legacy

Legacy names and values are useful only when they help players translate old guides into the current game.

Examples include retired shop names or pre-overhaul APC material rules. Legacy data should be explicitly labeled and must not share a table column with current values in a way that implies equivalence.

### Season-specific

Season mechanics, protection timers, map rules and event modifiers belong to the named season/event context.

They must not be promoted into universal game rules simply because they are active on Server 504 today.

## Cross-link quality rule

W18 already provides automatically ranked **Related References**. W19 therefore does not add repetitive `See also` blocks to all 118 articles.

Inline links should be added only when the reader must understand another reference **before acting on the current sentence**. Examples:

- an exact resource term should point to the resource/source reference when acquisition matters;
- a season-specific exception should point to its season hub when the base mechanic differs;
- a data audit should point back to the stable mechanic reference whose numbers it audits.

This keeps article prose readable while the automatic related-reference layer handles general discovery.

## Highest-value verification work

The largest remaining quality gains are not new broad guides. They are current Server 504 captures that resolve multiple articles at once:

1. **Current shop screenshots** — inventory, prices and weekly limits.
2. **Chip Factory recipe screen** — Purple and Orange material costs.
3. **Current APC Parts upgrade screen** across representative levels.
4. **Watchtower / Industrial prerequisite screenshots** at disputed milestones.
5. **Research Center advanced-tree screenshots** including second-queue evidence if present.
6. **Pet Agent growth / training / event-scoring screens**.
7. **Alliance Tech, Alliance Gifts and Armory registration/reward screens**.
8. **Current Sealed Island rule pages** for numeric thresholds that public sources disagree on.

These captures have higher information value than adding low-priority pages about account utilities.

## Publication gate for future Wiki breadth

Before creating a new gameplay article, answer all four questions:

1. Does the mechanic already have a stable reference page?
2. Is the new content genuinely a different maintenance lifecycle rather than another explanation of the same thing?
3. Is there enough evidence to separate current facts from legacy/community assumptions?
4. Will players make a different decision because this page exists?

If the answer to #4 is **no**, the content usually belongs in an existing article, the verification queue, or the backlog rather than a new route.

## Related audit references

- [Wiki Verification Queue](#/wiki/wiki-verification-queue)
- [Resource Calculators](#/wiki/wiki-calculators)
- [Game Overview](#/wiki/game-overview)

## Maintenance source

This audit is derived from the Server 504 repository manifest, current article inventory and verification queue. External gameplay sources are intentionally not required because this page evaluates **documentation state**, not game mechanics.
