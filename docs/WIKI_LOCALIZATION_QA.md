# Wiki Localization QA — Server 504

> **Updated:** 10 Aug 2026  
> **Scope:** FR / ES / PT / KO / VI Wiki localization quality on top of the English gameplay source of truth.

## Current structural status

The public Wiki has **117 registered routes**, and every registered article body exists in every supported non-English locale:

- FR: 117/117
- ES: 117/117
- PT: 117/117
- KO: 117/117
- VI: 117/117

Structural localization is deployment-blocking. Missing localized files, unregistered localized files, missing display-title metadata or invalid localized internal Wiki links must fail CI.

## Canonical title contract

`content/wiki-titles.json` is the canonical localized display-title source for:

- Wiki page headers;
- Wiki cards;
- Wiki search results.

The Markdown files also contain an H1 for source readability, but `.markdown-body h1` is hidden by the public stylesheet and the visible page header is rendered from `wiki-titles.json`. Historical H1/title drift therefore does not create a user-visible title mismatch. `scripts/validate-wiki-localization.py` reports that drift as advisory source-maintenance debt rather than blocking deployment.

This separates two concerns cleanly:

1. `content/wiki-manifest.json` defines the route and English registry contract;
2. `content/wiki-titles.json` defines the user-visible display-title contract for FR/ES/PT/KO/VI;
3. localized Markdown H1 wording remains an editorial-maintenance concern and can be normalized gradually when a body is reviewed.

## Terminology policy

Localization should read naturally in the target language **without hiding the words players must search for in the Dark War: Survival UI**.

Preserve official names when they function as UI/system identifiers, including examples such as:

- Watchtower
- Alliance Duel
- Survival Preparedness
- Industrial Age
- Precision Parts
- Sealed Island
- Virus Resistance
- Miasma
- Oni Seal Hall
- Quartz Factory
- Blood Moon Shroud
- Rotting Oni
- Booze Brute
- Oni King
- Sacred Tree Blessing
- Float Parade
- Magatama / Omamori

Generic editorial language should normally be localized. Words such as “framework”, “reward table”, “side event”, “policy”, “requirement” or “milestone” are not protected merely because the game uses many English names.

External source names and source-page titles may stay in the source language.

## Review completed in this pass

### VI and KO — deep review

The following nine routes received sentence-level review, not just mechanical term replacement:

- `watchtower-and-industrial`
- `season-4-sealed-island`
- `sealed-island-season-buildings`
- `miasma-and-virus-resistance`
- `blood-moon-shroud`
- `rotting-oni-and-booze-brute`
- `oni-king`
- `sacred-tree-blessing`
- `float-parade`

The review focused on natural sentence structure, removing unnecessary editorial English and preserving official game identifiers.

### FR / ES / PT — targeted Season 4 review

The eight Season 4 routes received targeted cleanup of obvious editorial English, especially event/reward/ranking/requirement wording. This was deliberately narrower than the VI/KO sentence-level review.

## Advisory linguistic audit

`scripts/audit-wiki-linguistic.py` scans localized prose for a curated set of likely editorial English expressions. It excludes source sections, URLs and link destinations.

This audit is **advisory, not deployment-blocking**. Heuristic language detection cannot reliably distinguish all of the following without context:

- an official in-game name that should stay English;
- a familiar gaming loanword;
- an unnecessary English editorial word that should be localized.

The audit therefore prints a compact per-locale review queue and exits successfully. It is intended to prioritize future human/editorial cleanup, not to declare a translation invalid.

## Remaining editorial debt

Full file coverage does **not** mean every historical translation has completed native-speaker-level copy editing. Earlier localization batches still contain code-switching candidates, especially in VI and KO, and to a smaller extent FR/ES/PT.

Recommended maintenance order:

1. fix high-frequency editorial candidates in VI;
2. review KO sentences with unnecessary Latin generic terms;
3. clean remaining FR/ES/PT candidates where English is not an official game identifier;
4. verify title/body terminology against current in-game screenshots when Server 504 UI wording changes;
5. keep source-of-truth gameplay changes in English first, then update all locales in the same change set.

## CI boundary

**Blocking checks** protect structure and navigability:

- complete localized body coverage;
- manifest/title registry integrity;
- valid internal Wiki routes;
- non-identical localized body vs English source.

**Advisory checks** protect editorial/source quality without creating false failures:

- hidden Markdown H1/display-title drift;
- likely code-switching;
- naturalness/style review;
- preferred target-language connective wording.

This boundary keeps the site reliable while respecting Dark War: Survival's English-heavy in-game terminology.
