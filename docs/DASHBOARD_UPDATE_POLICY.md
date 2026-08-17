# Server 504 Dashboard Update Policy

This file defines the minimum completeness rules for live operational updates on the Server 504 home dashboard.

## Saturday KE / Alliance Invasion Watch

Every confirmed weekly matchup update should capture all available data from the source screenshot:

- Server 504 alliance
- Opponent alliance tag and name
- Opponent server
- Opponent Total CP
- Opponent in-game alliance banner
- Update date

A KE row is not considered visually complete when the source screenshot contains the opponent banner but the banner asset is omitted.

### Opponent banner asset convention

Server 504 alliance banners and a small set of legacy opponents use the shared sprite.

New weekly opponents should use:

`assets/opponent-banners/<normalized-tag>.webp.base64.txt`

Examples:

- `<E-PX>` → `assets/opponent-banners/epx.webp.base64.txt`
- `OML` → `assets/opponent-banners/oml.webp.base64.txt`
- `REN` → `assets/opponent-banners/ren.webp.base64.txt`

`assets/home-alliance-enhancer.js` automatically looks for this path when an opponent is not available in the shared sprite. The banner should be cropped from the supplied in-game screenshot, preserve the original emblem/colors, and use transparent background where practical.

If no banner source is available, keep the matchup data accurate and leave the banner unresolved rather than inventing an emblem.

## Update discipline

When changing weekly operational data:

1. Preserve unrelated confirmed dashboard data.
2. Update `content/server-status.json` only for fields supported by current evidence.
3. Update `lastUpdated` and the relevant section date.
4. Add or refresh required visual assets in the same update when source evidence is available.
5. Avoid placeholders that could be mistaken for the real in-game alliance banner.
