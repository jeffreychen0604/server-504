# W19 — Wiki Content Quality & Coverage Audit

Updated: 8 Aug 2026

This document audits the Server 504 Game Wiki as a documentation system. It does not create gameplay rules.

The machine-readable source is `content/wiki-coverage.json`.

## Coverage statuses

- `covered` — a dedicated, usable reference layer exists.
- `covered-verify` — coverage exists, but exact values, unlocks, prices, limits or current Server 504 UI fields remain unresolved.
- `partial` — useful references exist, but the domain is not complete enough to call covered.
- `backlog` — no dedicated reference layer yet; research should begin only when player value justifies maintenance cost.

## Current coverage summary

The Wiki is already broad across foundation, combat, S-rarity heroes, APC, Pet Agents, progression, research, shelter, daily utility, alliance systems, recurring events, world/state systems, shops/currencies and Season 4 — Sealed Island.

The highest-value remaining work is mostly **verification**, not another wave of broad overview articles:

1. current shop inventory/prices/limits;
2. Chip Factory recipe screen;
3. current APC Parts upgrade costs;
4. disputed Watchtower/Industrial prerequisites;
5. advanced Research Center trees and second-queue evidence;
6. Pet Agent costs/training/event scoring;
7. Alliance Tech/Gifts/Armory UI;
8. current Sealed Island numeric rules.

Partial or low-priority areas currently include dedicated coverage for Arena, Trial, Total War, Black Gold Battlefield, Lost Lands, Origin Lands, VIP progression and low-strategy account/social utilities.

## Duplication rule

Two pages may mention the same mechanic without being duplicates when they have different maintenance lifecycles:

- **overview/hub** — stable system boundary;
- **mechanic reference** — one decision-relevant subsystem;
- **data audit** — disputed or patch-sensitive numeric claims;
- **verification queue** — evidence still needed from current Server 504 UI.

A new article should be rejected when it merely restates an existing mechanic reference with different wording.

## Current / legacy / season-specific rule

### Current

Use for mechanics supported by current official notes, current in-game evidence or sufficiently recent corroborated community evidence. Do not label a number as current when the evidence only proves that the system exists.

### Legacy

Legacy names/values should exist only when they help translate old guides into the current game. They must be explicitly labeled and must not be visually mixed with current values in a way that implies equivalence.

### Season-specific

Season mechanics, protection timers, map rules and event modifiers belong to the named season/event context. They must not be promoted into universal game rules simply because they are active on Server 504 today.

## Cross-link policy

W18 already provides automatically ranked Related References. W19 therefore avoids repetitive `See also` blocks across all articles.

Inline links are useful when a reader must understand another reference **before acting on the current sentence**. General discovery belongs to Related References and search.

All internal `#/wiki/<slug>` links are validated against the manifest during CI so broken cross-links cannot deploy.

## Publication gate for future breadth

Before creating a new gameplay article, answer:

1. Does the mechanic already have a stable reference page?
2. Is this genuinely a different maintenance lifecycle?
3. Can current facts be separated from legacy/community assumptions?
4. Will players make a different decision because the page exists?

If #4 is no, the content usually belongs in an existing article, the verification queue or the backlog instead of a new route.
