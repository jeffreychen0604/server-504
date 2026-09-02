# Featured Event Asset Library

Canonical reusable artwork library for Server 504 Featured Events.

## Rules

- Reuse an existing approved asset before generating a new one.
- One folder per recurring event: `assets/event-library/<event-slug>/`.
- Use stable descriptive filenames (`base.webp`, `hero.webp`, `card.webp`, etc.).
- Keep event timing/content in `content/server-status.json`; artwork lives here and is not date-specific.
- `manifest.json` is the lookup/source-of-truth for event aliases, variants and rendering tier.
- Legacy assets may remain at old paths for compatibility, but new runtime references should use this library.

## Current library

- `lucky-chest/` — reusable Lucky Chest family artwork (base, Hero, Tech variants).
- `lucky-magic-house/` — approved generated 960×320 card artwork stored as validated chunks.
- `catherines-party/` — approved generated wide artwork stored as validated chunks.
- `summer-paradise/` — reusable Summer Paradise card/hero artwork.
- `pet-supplies/` — reusable Pet Supplies card artwork.

When an event repeats, reuse the matching library entry unless the in-game event visual identity has materially changed.