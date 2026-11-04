# UX/UI review — 4 November 2026

Scope: production entrypoint, existing Season 5 components and original page layout. Server data and alliance banners were not edited.

## Confirmed issues and fixes

- The ambient-layer stacking rule changed the topbar and mobile contribution button to normal flow. Restored fixed positioning, safe-area spacing and room above the floating button.
- The translated-offscreen mobile menu still exposed keyboard targets. Closed menus are now inert and hidden; opening moves focus into navigation, Escape restores it, outside clicks and route changes close the menu. Added current-page semantics and a localized skip link.
- Wiki category buttons used `aria-selected` inside a `tablist` without tab semantics. Kept the existing button interaction with `aria-pressed`, `aria-controls`, labeled content regions and keyboard focus transfer.
- Search filter buttons were replaced on selection, losing focus. Focus now returns to the selected filter and its pressed state is exposed.
- `/` could open search above the contribution dialog. Search now respects the active dialog and editable/modifier-key contexts.
- Verification container lacked a valid semantic role. Added a localized group name. The default 300px widget exceeded the 320px form; use the 150px compact variant, including after viewport resizing. Size reference: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/
- Long inline code in `hero-investment-framework` and the slash-separated Secretary positions in `wiki-verification-queue` overflowed at 320px. Article text now wraps long tokens. Data tables get independently scrollable, named, keyboard-accessible regions.
- The old global H1 hiding rule also hid Codex chapter titles. Omit the duplicate document title, nest chapter headings beneath the page H1, and leave documents already starting at H2 unchanged. Restore Charter/Codex section counters and dim the oversized 504 watermark that obscured text.

## Verification

- Main routes: Home, Wiki, Guides, Charter, Codex and APC Chips at 320, 390, 768, 1024, 1440 and 1920px: no page overflow, broken visible images, clipped CP numbers or out-of-bounds primary controls in the measured states.
- Wiki category browser: all six locales at 320 and 1440px; exactly one selected category, no horizontal page overflow.
- Keyboard/pointer flows: category activation, search (16 results for `precision parts`), empty results, filter focus, menu route/escape/outside dismissal, current-page state, contribution dialog focus restoration and required title validation.
- Contribution form: 320px, visible verification footprint fixture; no horizontal overflow, no nested search dialog, effect paused while modal open. No feedback POST was sent.
- Reduced motion: sandstorm stopped; regular dense full-page effect retained.
- Accessibility checks use axe-core WCAG 2 A/AA and 2.1 AA rules; see final review outcome below.

## Limits

Browser checks use Chromium emulation, not physical iOS/Android devices. Automated accessibility checks do not certify full WCAG compliance. Live human verification and moderation delivery require a real interaction; no submission was sent during this review. The local host is not authorized by the production Turnstile key, so its challenge errors are expected in local testing; layout was checked using a local fixture. No performance or all-weather contrast guarantee is implied.

## Final review outcome

- All 117 English Wiki articles rendered at 320px without page overflow or empty/error content after the fixes.
- Eight representative routes at 390 and 1440px: zero automated WCAG-rule violations in the tested states; one page H1.
- Full Wiki validation passed: 117 registered routes, six locales, 18 guides per locale, current search index, no blocking runtime/discovery/localization issues. Existing linguistic review advisories remain content-review work, not layout failures.
- Production entrypoint validation and JavaScript syntax checks passed.
- Dense sandstorm is intentionally preserved per the approved design; users can turn it off for reading.
- Direct cold loads of Charter/Codex could render `Markdown renderer unavailable` before the deferred Wiki loader initialized. The document renderer now waits for that loader. Both direct routes passed with an injected 800ms loader delay, visible chapter headings, one H1 and no horizontal overflow at 320px.
