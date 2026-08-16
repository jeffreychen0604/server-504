#!/usr/bin/env python3
import json
import sys
from pathlib import Path

GUIDES_PATH = Path("content/guides.json")
CONTRACT_PATH = Path("content/guides-localization.json")
REQUIRED_FIELDS = ("title", "summary", "advice", "sourceNote")
EXPECTED_LOCALES = ["en", "fr", "es", "pt", "ko", "vi"]


def load_json(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        print(f"::error file={path}::Invalid JSON: {exc}")
        raise SystemExit(1)


def valid_copy(value, field):
    if field == "advice":
        return isinstance(value, list) and bool(value) and all(isinstance(x, str) and x.strip() for x in value)
    return isinstance(value, str) and bool(value.strip())


guides_data = load_json(GUIDES_PATH)
contract = load_json(CONTRACT_PATH)
errors = []

if contract.get("supportedLocales") != EXPECTED_LOCALES:
    errors.append(f"supportedLocales must be exactly {EXPECTED_LOCALES}")

guides = guides_data.get("guides")
if not isinstance(guides, list) or not guides:
    errors.append("guides.json must contain a non-empty guides array")
    guides = []

slugs = [str(g.get("slug", "")).strip() for g in guides]
if len(slugs) != len(set(slugs)):
    errors.append("Guide slugs must be unique")
slug_set = set(slugs)

base_locales = contract.get("baseLocales", [])
overlay_locales = contract.get("overlayLocales", {})
all_copy = {locale: {} for locale in EXPECTED_LOCALES}

for guide in guides:
    slug = str(guide.get("slug", "")).strip()
    if not slug:
        errors.append("Guide missing slug")
        continue
    locales = guide.get("locales") or {}
    for locale in base_locales:
        copy = locales.get(locale)
        if not isinstance(copy, dict):
            errors.append(f"{slug}: missing base locale {locale}")
            continue
        all_copy[locale][slug] = copy

for locale, raw_path in overlay_locales.items():
    path = Path(raw_path)
    if not path.is_file():
        errors.append(f"{locale}: overlay file missing: {path}")
        continue
    data = load_json(path)
    if data.get("locale") != locale:
        errors.append(f"{path}: locale field must be {locale}")
    localized = data.get("guides")
    if not isinstance(localized, dict):
        errors.append(f"{path}: guides must be an object keyed by slug")
        continue
    overlay_slugs = set(localized)
    missing = sorted(slug_set - overlay_slugs)
    extra = sorted(overlay_slugs - slug_set)
    if missing:
        errors.append(f"{locale}: missing localized guides: {', '.join(missing)}")
    if extra:
        errors.append(f"{locale}: unknown localized guides: {', '.join(extra)}")
    all_copy[locale] = localized

for locale in EXPECTED_LOCALES:
    localized = all_copy.get(locale) or {}
    for slug in slugs:
        copy = localized.get(slug)
        if not isinstance(copy, dict):
            errors.append(f"{slug}: missing localized copy for {locale}")
            continue
        for field in REQUIRED_FIELDS:
            if not valid_copy(copy.get(field), field):
                errors.append(f"{slug}: invalid {locale}.{field}")
        if locale != "en":
            en = all_copy.get("en", {}).get(slug, {})
            if copy.get("summary") == en.get("summary") and copy.get("sourceNote") == en.get("sourceNote"):
                errors.append(f"{slug}: {locale} appears to be untranslated English fallback")

if contract.get("coverageMode") == "full":
    for locale in EXPECTED_LOCALES:
        count = sum(1 for slug in slugs if isinstance((all_copy.get(locale) or {}).get(slug), dict))
        if count != len(slugs):
            errors.append(f"{locale}: full coverage expected {len(slugs)}/{len(slugs)}, found {count}/{len(slugs)}")

if errors:
    for error in errors:
        print(f"::error file={CONTRACT_PATH}::{error}")
    sys.exit(1)

counts = ", ".join(f"{locale.upper()} {len(all_copy[locale])}/{len(slugs)}" for locale in EXPECTED_LOCALES)
print(f"Guide localization validation passed: {counts}")
