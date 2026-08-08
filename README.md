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

Before deployment, `scripts/validate-wiki.sh` checks the public Wiki for retired or forbidden source domains, unrelated-game contamination, removed navigation concepts and minimum article metadata.

## Current architecture

- static HTML/CSS/JavaScript
- Markdown Wiki content rendered client-side with `marked`
- original Wiki registry in `assets/wiki-research.js`
- modular Wiki expansion layers in `assets/wiki-w12.js` through `assets/wiki-w15.js`
- grouped Wiki information architecture in `assets/wiki-ia.js`
- Cloudflare Worker + D1 anonymous feedback backend
- GitHub Pages deployment through `.github/workflows/pages.yml`

## Status — August 2026

Public portal is operational. Wiki research waves W1–W15 cover foundation, combat/heroes, progression, APC, events, Sealed Island, economy, calculators/data audits, Pet Agents, alliance/state systems, research, shelter and daily utility systems.

W16 begins the audit/cleanup phase: taxonomy, source hygiene, CI validation and maintenance architecture take priority over adding more breadth.
