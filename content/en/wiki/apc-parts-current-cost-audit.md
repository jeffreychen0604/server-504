# APC Parts — Current Cost Audit

> **Last verified:** 8 Aug 2026  
> **Status:** Legacy tables exist, but they are not safe to use as a current Lv.1–66 calculator.

Several public APC tables were created before the late-2025 Modified Vehicle overhaul. They are useful for historical structure, but not as current canonical costs.

## Why the old table is outdated

A legacy DarkWarData chart records Parts only to **Lv.42** and includes **Gears** in the upgrade cost.

Official patch notes later changed the system:

- introduced **Parts Set** bonuses for upgrading all six parts to specified levels;
- removed **Gears** from Parts upgrade costs and refunded previously spent Gears;
- raised Modified Vehicle `Modify` maximum from 300 to **500**;
- later Tactical Modification recognizes **all six Parts at Lv.66** as one unlock path.

Therefore an old `Gears + Titanium Alloy + Design Blueprint` row cannot be used unchanged for the current game.

## What remains useful from legacy data

Community data still helps establish the material relationship:

- early Parts progression uses **Titanium Alloy**;
- **Design Blueprints** enter the advanced Parts path after the early levels;
- Design Blueprint is an APC/Parts resource, not the same item as DX Blueprint.

## Current canonical dependency model

| Progression layer | Current reliable statement |
| --- | --- |
| Modified Vehicle | Current official cap has been raised to Lv.500 |
| Parts | Six-part system with Parts Set milestones |
| Gears | **No longer consumed for Parts upgrades** |
| Titanium Alloy | Current Parts/APC material |
| Design Blueprint | Advanced Parts/APC material |
| Lv.66 Parts | One Tactical Modification unlock condition when all parts reach it |

## What is still missing

The Wiki does **not** currently have a verified Server 504 table for:

- Titanium Alloy cost per Parts level;
- Design Blueprint cost per Parts level;
- all levels beyond the legacy Lv.42 dataset up to Lv.66;
- Parts Set milestone thresholds and exact bonuses.

Until those are captured in-game, the Wiki will not generate a false precision calculator.

## Recommended capture method

When a Server 504 player upgrades a part, record:

`Current level → next level | Titanium Alloy | Design Blueprint | other material | CP/stat gain`

Six screenshots at milestone levels are more useful than copying an old full table that no longer matches the game.

## Sources

- DarkWarData legacy APC chart: https://darkwardata.com/charts/apc-modified-garage/
- DarkWarData Design Blueprint: https://darkwardata.com/items/design-blueprint/
- Apple App Store version history — Parts Set, Gear removal, Modify 500, Tactical Modification: https://apps.apple.com/app/dark-war-survival/id6670441558
