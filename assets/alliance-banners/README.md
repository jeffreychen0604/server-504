# Alliance roster banners

The November 3, 2026 user-provided alliance-power screenshot confirms these identities:

- A§T → existing `cmrd` sprite tile (black banner, white wings, UN flag).
- ONE → existing `dud` sprite tile (gold shield, Korean flag).
- ÀSU → existing `ids` sprite tile (red DNA emblem, UN flag).
- H3IL → `h3il.png` (cyan banner, white wings, Indian flag).

H3IL was prepared with built-in imagegen from the row-8 screenshot reference on November 3, 2026 and exported as a transparent 128×128 PNG. It is a reference-derived cutout, not an original game asset export.

Extraction prompt: isolate the row-8 H3IL banner; retain the cyan fabric, gold rod, white wing emblem and attached Indian flag; transparent background, no text or other rows, no redesign.

Tag normalization handles the section-sign S in A§T and the accented A in ÀSU. Historical sprite identities remain available for older dashboard sections.

## Original game layers — November 4, 2026

DUD (also ONE/0NE) and UIC now use the untouched PNG sprite exports in `original/` instead of enlarged screenshot tiles. The browser assembles and tints these layers; the emblem and country images are not generated or repainted. Other alliances retain their existing sources.

Source: the user's locally installed Dark War game, `StreamingAssets/AssetBundles/`:

- `gameres_main_file_atlas__ui_uiallianceflag_dd5462bfc19625fb79f8809798a0b84d.bundle`
- `gameres_main_file_atlas__countryflag_6912e89820a198e358c53d34bd12f099.bundle`

Exported with UnityPy from each bundle's UnityFS payload (after the 8-byte `UnityRaw` prefix), using `Sprite.read().image.save(...)`. No resizing, sharpening, or image generation was applied.

| Export | Original sprite | Pixels |
| --- | --- | --- |
| cloth.png | UIalliance_img_flagsurface | 191 × 219 |
| trim.png | UIalliance_img_flagframe | 146 × 160 |
| rod.png | alliance_flag_gan | 192 × 27 |
| shield.png | UIalliance_img_flagpattern7_big | 132 × 132 |
| star.png | UIalliance_img_flagpattern5_big | 132 × 132 |
| kr.png | KR | 116 × 85 |
| un.png | UN | 116 × 85 |

The largest visible cloth is 95.2 × 109.2 CSS pixels in a 140px Capital slot, providing approximately 2× pixel density. The same component is shared by the roster and KE. The original layers total 61,349 bytes before HTTP compression.
