# Server 504 — Dark War: Survival

Community knowledge, governance and operations portal for Dark War: Survival Server 504.

## Public scope

- Game Wiki
- Server 504 Charter
- Operational Codex
- Global search
- Anonymous community contributions with moderation
- Multilingual UI: English, Français, Español, Português, 한국어, Tiếng Việt

## Localization policy

The public language contract is exactly six locales: `en`, `fr`, `es`, `pt`, `ko`, `vi`.

Localization is intentionally split by content lifecycle:

- UI chrome, Home, navigation, search, contribution flow, Wiki taxonomy, confidence labels and category browsing are localized for all six locales through `assets/i18n.js`.
- Server Charter and Operational Codex have complete Markdown variants under `content/<locale>/` for all six locales.
- `content/wiki-titles.json` is the canonical localized display-title contract for Wiki page headers, cards and search results. Markdown article H1 headings are hidden by the runtime stylesheet; historical H1/title drift is tracked as editorial debt rather than a deployment failure. Official in-game names and established game terms remain unchanged where translation would make them harder to match against the game UI.
- The 117 English Wiki article bodies remain the gameplay source-of-truth dataset, and all 117 bodies now exist in every supported non-English locale. The runtime keeps its English fallback as a safety path, but `coverageMode: full` and CI block deployment if any registered localized body is missing.
- Search normalization is Unicode-aware so Korean and accented French, Spanish, Portuguese and Vietnamese queries are preserved.
- Contribution type display labels are localized, while the underlying values remain stable English API enums so the Cloudflare Worker allowlist does not change with UI language.

`scripts/validate-i18n.js` makes the six-locale UI/title contract deployment-blocking. `scripts/validate-wiki-localization.py` additionally enforces 117/117 body coverage, manifest/title completeness and localized internal-link integrity while reporting hidden Markdown H1/title drift as advisory source-maintenance debt. `scripts/audit-wiki-linguistic.py` reports likely editorial code-switching as non-blocking review candidates because official English game terms are intentionally protected.

## Wiki data policy

The Wiki separates:

1. official/current evidence;
2. community/cross-checked guidance;
3. values that still require current Server 504 in-game verification.

Version-sensitive numbers must not be silently promoted into permanent facts. The central verification queue is maintained at `content/en/wiki/wiki-verification-queue.md`.

## Repository safeguards

`main` is the source of truth. GitHub Pages deploys directly from this repository.

Before deployment, `scripts/validate-wiki.sh` checks:

- retired or forbidden source domains;
- unrelated-game contamination;
- removed navigation concepts;
- article H1 and verification/update metadata;
- syntax of active public JavaScript, including i18n, app, feedback, Wiki, calculators and search discovery;
- the six-locale localization contract through `scripts/validate-i18n.js` and `scripts/validate-wiki-localization.py`;
- localized display-title metadata completeness and localized internal-link integrity;
- advisory hidden Markdown H1 ↔ display-title drift reporting;
- advisory linguistic QA for likely editorial code-switching without penalizing protected official game terms;
- manifest slug/file uniqueness;
- manifest ↔ Markdown file completeness in both directions;
- taxonomy coverage;
- accidental reintroduction of retired Wiki route modules;
- presence of the consolidated Wiki runtime and discovery assets in the public entrypoint.

W19 adds `scripts/audit-wiki-content.py`, which separately checks the documentation layer for:

- coverage-contract status and priority integrity;
- coverage references that point to unknown Wiki slugs;
- taxonomy categories with no represented coverage domain;
- broken explicit `#/wiki/<slug>` cross-links;
- editorial warnings for suspicious Season-number mixing or retired shop naming without legacy context;
- high-similarity article pairs that may deserve overlap review.

## Current architecture

- static HTML/CSS/JavaScript
- Markdown Wiki content rendered client-side with `marked`
- `assets/i18n.js` as the shared six-locale UI/taxonomy copy contract
- `content/wiki-titles.json` as localized Wiki-title metadata
- `content/wiki-manifest.json` as the single Wiki registry and taxonomy source
- `content/wiki-coverage.json` as the machine-readable content coverage/backlog contract
- `assets/wiki-runtime.js` as the single Wiki router, article loader, related-reference engine and Wiki search indexer
- `assets/search-discovery.js` for ranked global search, synonyms, lightweight typo tolerance and category filtering
- `assets/wiki-calculators.js` as a runtime-mounted utility hook, not a separate route observer
- `docs/WIKI_CONTENT_AUDIT.md` as the human-readable W19 maintenance/audit policy
- `docs/WIKI_LOCALIZATION_QA.md` as the localization terminology and linguistic-QA policy
- 117 registered Wiki article routes as of 8 Aug 2026
- Cloudflare Worker + D1 anonymous feedback backend
- GitHub Pages deployment through `.github/workflows/pages.yml`

## Search & discovery behavior

Global search ranks exact titles and aliases above labels/body text, expands common Dark War abbreviations and synonyms such as `WT`, `APC`, `Frankenstein`, `EE`, `RSS` and `S4`, and applies lightweight typo tolerance against title/alias tokens only. Search results can be filtered by localized Wiki taxonomy category or governance/operations content.

Search text normalization uses Unicode letters and numbers rather than ASCII-only matching, so Korean and accented Latin-language input remains searchable.

Wiki article pages also render up to four related references derived from the same manifest using group, taxonomy category, title/description overlap and hub-page boosts.

## Content coverage behavior

W19 tracks documentation domains as `covered`, `covered-verify`, `partial` or `backlog` instead of equating article count with completeness.

The current high-value backlog is mostly verification work: current shop screens, Chip Factory recipes, APC Parts costs, disputed Watchtower/Industrial prerequisites, advanced Research Center values, Pet Agent numeric data, Alliance Tech/Gifts/Armory UI and current Sealed Island numeric rules.

Lower-priority breadth includes dedicated encyclopedic pages for some side modes, VIP progression and low-strategy account/social utilities. New gameplay routes should be created only when they represent a genuinely different maintenance lifecycle and change a player decision.

## Status — August 2026

Public portal is operational. Wiki research waves W1–W15 cover foundation, combat/heroes, progression, APC, events, Sealed Island, economy, calculators/data audits, Pet Agents, alliance/state systems, research, shelter and daily utility systems.

W16 completed source hygiene and information-architecture cleanup. W17 consolidated the Wiki into one manifest-driven runtime and made registry consistency a deployment-blocking CI contract. W18 upgraded discovery quality with ranked synonym-aware search, category filters, lightweight typo tolerance and related-reference recommendations without changing existing article URLs. W19 adds a formal coverage/backlog contract plus content-quality and cross-link auditing so future work prioritizes verification and decision value over raw article count.

The August 2026 localization pass standardizes EN/FR/ES/PT/KO/VI across the site, adds complete six-language Charter/Codex variants and 117/117 Wiki bodies in every supported locale, makes search Unicode-aware, keeps canonical localized display-title metadata complete and promotes structural locale completeness into the deployment-blocking CI contract. Linguistic QA remains an ongoing editorial process: recent Season 4 content has received focused review, while the advisory audit keeps older code-switching candidates visible without treating official game terminology as an error.
