# V3.3 command-room implementation — 2026-11-04

Implements the approved Image Gen mockup while preserving header/sidebar placement, section order, real alliance flags, server data, routes and six locales. Current game season is still data-driven; the artwork does not announce a Season 5 start date.

## Shipped visual changes

- Reusable dark stone/metal nine-slice surfaces for navigation, server pulse, KE team plates, Armory slots and knowledge cards.
- Generated forged-bronze nameplates, numbered medallions, distinct medal finishes/shapes and turquoise segmented CP gauges. Full CP values stay live and readable.
- Real alliance flags above generated Capital sculptures. Capital titles and ownership remain live text; supplementary rotation descriptions remain below the sculpture.
- Functional SVG navigation icons, turquoise selection/focus treatment, serif display headings, knowledge tiles and dialog surfaces in the same material family.
- Existing entrance, CP and category motion retained; button press feedback remains subtle. Sandstorm still spans the viewport with 780/300 desktop/mobile particles and 11/6 cached dust banks; reduced haze opacity improves reading. Dialog/reduced-motion/visibility pause behavior retained.
- Three new transparent WebP assets: 50,066 + 47,746 + 78,436 = **176,248 bytes**. No new JavaScript dependency, webfont or network service. The exporter only resizes/converts the Image Gen masters; prompts and hashes are versioned.

## Verification

- 36 route/viewport checks: Home, Wiki, Guides, Charter, Codex, APC Chips at 320, 390, 768, 1024, 1440 and 1920 px. No page overflow, clipped checked CP/Capital/Armory text, broken visible images or out-of-bounds primary controls/headings. No page JavaScript errors.
- 36 Home language/viewport checks: EN/FR/ES/PT/KO/VI at all six widths. Header/search/language controls did not overlap; checked labels and numeric values did not overflow.
- 12 Wiki locale checks at 320/1440 px: no overflow; exactly one selected category.
- 16 axe-core WCAG A/AA checks: eight routes at 390/1440 px, no reported violations. Additional form check at 320 px also reported none. Automated coverage does not constitute full accessibility certification.
- Wiki keyboard selection focuses the chosen panel; search returns 16 results for `precision parts`, filter keyboard focus is retained, and an unmatched query shows an empty-state message.
- Mobile menu closes on route selection, Escape and a click outside its visible box. Outside-click probe uses `documentElement.clientWidth - 5`, avoiding the desktop browser's scrollbar gutter.
- Contribution form: one modal at a time, required-title validation focuses its field, close restores focus, compact verification layout fits at 320 px, sandstorm pauses while the modal is open. Used a local verification-layout fixture; **no real contribution was submitted**.
- Reduced motion stops the storm; only one visible storm canvas is mounted.
- Entrypoint/cascade/asset-hash checks, changed-JS syntax checks and complete Wiki validation passed. Existing linguistic review advisories remain non-blocking and unrelated to this visual change.

Screenshots captured locally under `output/playwright/v33/`: Home/Wiki/Guides desktop and mobile plus Capital/Armory detail. Full-page captures freeze fixed-position weather at one viewport; this is not a limitation on weather coverage while scrolling.

## Scope and limits

This is a responsive implementation of the approved visual direction, not an embedded mockup image. Actual alliance banners, longer localized labels and all eight alliance records take precedence over illustrative screenshot data. Physical iOS/Android devices and GPU performance benchmarks were not run. The feedback backend, content, calculators and alliance data were not modified. The public preview still blocks submissions; production keeps the real feedback runtime.
