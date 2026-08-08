# Server 504 — Dark War: Survival

Community knowledge, governance and operations portal for Dark War: Survival Server 504.

## Public scope

- Game Wiki
- Server 504 Charter
- Operational Codex
- Global search
- Anonymous community contributions with moderation
- Multilingual UI: English, Français, Español, Português, 한국어, Tiếng Việt

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
- Wiki, calculator and search-discovery JavaScript syntax;
- manifest slug/file uniqueness;
- manifest ↔ Markdown file completeness in both directions;
- taxonomy coverage;
- accidental reintroduction of retired Wiki route modules;
- presence of the consolidated Wiki runtime and W18 discovery assets in the public entrypoint.

## Current architecture

- static HTML/CSS/JavaScript
- Markdown Wiki content rendered client-side with `marked`
- `content/wiki-manifest.json` as the single Wiki registry and taxonomy source
- `assets/wiki-runtime.js` as the single Wiki router, article loader, related-reference engine and Wiki search indexer
- `assets/search-discovery.js` for ranked global search, synonyms, lightweight typo tolerance and category filtering
- `assets/wiki-calculators.js` as a runtime-mounted utility hook, not a separate route observer
- 117 registered Wiki article routes as of 8 Aug 2026
- Cloudflare Worker + D1 anonymous feedback backend
- GitHub Pages deployment through `.github/workflows/pages.yml`

## Search & discovery behavior

Global search ranks exact titles and aliases above labels/body text, expands common Dark War abbreviations and synonyms such as `WT`, `APC`, `Frankenstein`, `EE`, `RSS` and `S4`, and applies lightweight typo tolerance against title/alias tokens only. Search results can be filtered by Wiki taxonomy category or governance/operations content.

Wiki article pages also render up to four related references derived from the same manifest using group, taxonomy category, title/description overlap and hub-page boosts.

## Status — August 2026

Public portal is operational. Wiki research waves W1–W15 cover foundation, combat/heroes, progression, APC, events, Sealed Island, economy, calculators/data audits, Pet Agents, alliance/state systems, research, shelter and daily utility systems.

W16 completed source hygiene and information-architecture cleanup. W17 consolidated the Wiki into one manifest-driven runtime and made registry consistency a deployment-blocking CI contract. W18 upgrades discovery quality with ranked synonym-aware search, category filters, lightweight typo tolerance and related-reference recommendations without changing existing article URLs.
