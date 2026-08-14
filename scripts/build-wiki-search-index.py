#!/usr/bin/env python3
"""Build the single runtime Wiki search index consumed by the browser."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "content" / "wiki-manifest.json"
TITLES_PATH = ROOT / "content" / "wiki-titles.json"
OUTPUT_PATH = ROOT / "content" / "wiki-search.json"
LOCALES = ("en", "fr", "es", "pt", "ko", "vi")


def clean_markdown(text: str) -> str:
    """Keep searchable prose while dropping front matter, URLs and markup noise."""

    text = re.sub(r"^---[\s\S]*?---", " ", text, count=1, flags=re.MULTILINE)
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"[#>*_`|\[\](){}]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def load_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:  # pragma: no cover - surfaced as a CI error
        raise RuntimeError(f"Unable to read {path}: {exc}") from exc


def build_payload() -> dict:
    manifest = load_json(MANIFEST_PATH)
    title_data = load_json(TITLES_PATH)
    title_map = title_data.get("titles", {})
    articles = manifest.get("articles", [])
    if not isinstance(articles, list) or not articles:
        raise RuntimeError("Wiki manifest has no articles")

    locales: dict[str, list[dict[str, str]]] = {}
    for locale in LOCALES:
        locale_entries = []
        for article in articles:
            slug = str(article.get("slug", "")).strip()
            filename = str(article.get("file", "")).strip()
            if not slug or not filename:
                raise RuntimeError("Wiki manifest contains an article without slug/file")

            source = ROOT / "content" / locale / "wiki" / filename
            if not source.is_file():
                raise RuntimeError(f"Missing localized Wiki body: {source}")

            heading = article.get("title", "") if locale == "en" else title_map.get(slug, {}).get(locale, article.get("title", ""))
            locale_entries.append(
                {
                    "slug": slug,
                    "heading": str(heading),
                    "body": clean_markdown(source.read_text(encoding="utf-8")),
                }
            )
        locales[locale] = locale_entries

    return {
        "version": 1,
        "updated": manifest.get("updated", ""),
        "locales": locales,
    }


def render_payload(payload: dict) -> str:
    return json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify the checked-in index is current")
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH)
    args = parser.parse_args()

    try:
        rendered = render_payload(build_payload())
    except RuntimeError as exc:
        print(f"::error::{exc}", file=sys.stderr)
        return 1

    output = args.output if args.output.is_absolute() else ROOT / args.output
    if args.check:
        if not output.is_file() or output.read_text(encoding="utf-8") != rendered:
            print(f"::error file={output}::Wiki search index is missing or stale; run scripts/build-wiki-search-index.py")
            return 1
        print(f"Wiki search index is current: {output}")
        return 0

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(rendered, encoding="utf-8")
    print(f"Wrote Wiki search index: {output} ({len(rendered.encode('utf-8')):,} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
