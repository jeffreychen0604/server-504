#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIKI_ROOT = ROOT / "content" / "en" / "wiki"
MANIFEST = ROOT / "content" / "wiki-manifest.json"
COVERAGE = ROOT / "content" / "wiki-coverage.json"

ALLOWED_STATUSES = {"covered", "covered-verify", "partial", "backlog"}
ALLOWED_PRIORITIES = {"maintain", "high", "medium", "low"}
STOP_WORDS = {
    "and", "the", "for", "with", "from", "into", "that", "this", "current",
    "overview", "reference", "system", "systems", "dark", "war", "survival",
    "server", "game", "wiki", "guide", "progression", "official", "community",
    "data", "hero", "heroes", "alliance", "season",
}


def normalize_group(value: str) -> str:
    group = str(value or "").strip().upper()
    if group.startswith("HERO PROFILE"):
        return "HERO PROFILE"
    if group.startswith("PET AGENT PROFILE"):
        return "PET AGENT PROFILE"
    return group


def tokens(value: str) -> set[str]:
    words = re.findall(r"[a-z0-9]+", value.lower())
    return {word for word in words if len(word) > 2 and word not in STOP_WORDS}


def warn(message: str, file: Path | None = None) -> None:
    prefix = f" file={file.relative_to(ROOT)}" if file else ""
    print(f"::warning{prefix}::{message}")


def error(message: str, file: Path | None = None) -> None:
    prefix = f" file={file.relative_to(ROOT)}" if file else ""
    print(f"::error{prefix}::{message}")


def main() -> int:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    coverage = json.loads(COVERAGE.read_text(encoding="utf-8"))

    articles = manifest.get("articles", [])
    categories = manifest.get("categories", [])
    domains = coverage.get("domains", [])
    article_by_slug = {article["slug"]: article for article in articles}
    valid_slugs = set(article_by_slug)
    failures: list[str] = []

    # Coverage contract integrity.
    domain_ids = [str(domain.get("id", "")).strip() for domain in domains]
    duplicates = sorted({value for value in domain_ids if value and domain_ids.count(value) > 1})
    if duplicates:
        failures.append(f"Duplicate coverage domain ids: {', '.join(duplicates)}")

    referenced_slugs: set[str] = set()
    status_counts: Counter[str] = Counter()
    for domain in domains:
        domain_id = str(domain.get("id", "")).strip() or "<missing>"
        status = str(domain.get("status", "")).strip()
        priority = str(domain.get("priority", "")).strip()
        refs = domain.get("articles", [])

        if status not in ALLOWED_STATUSES:
            failures.append(f"Coverage domain {domain_id} has invalid status: {status}")
        else:
            status_counts[status] += 1

        if priority not in ALLOWED_PRIORITIES:
            failures.append(f"Coverage domain {domain_id} has invalid priority: {priority}")

        if status in {"covered", "covered-verify", "partial"} and not refs:
            failures.append(f"Coverage domain {domain_id} is {status} but references no Wiki articles")

        for slug in refs:
            if slug not in valid_slugs:
                failures.append(f"Coverage domain {domain_id} references unknown Wiki slug: {slug}")
            else:
                referenced_slugs.add(slug)

    # Every public taxonomy category must be represented by at least one coverage domain.
    covered_groups = {normalize_group(article_by_slug[slug]["group"]) for slug in referenced_slugs}
    for category in categories:
        category_groups = {normalize_group(group) for group in category.get("groups", [])}
        if category_groups and not category_groups.intersection(covered_groups):
            failures.append(f"Taxonomy category has no coverage-contract reference: {category.get('title')}")

    # Validate explicit internal Wiki links in Markdown.
    internal_link_re = re.compile(r"\(#/wiki/([a-z0-9-]+)(?:[?#][^)]*)?\)")
    internal_links = 0
    linked_articles: set[str] = set()
    for path in sorted(WIKI_ROOT.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        for slug in internal_link_re.findall(text):
            internal_links += 1
            linked_articles.add(slug)
            if slug not in valid_slugs:
                failures.append(f"Broken internal Wiki link in {path.name}: {slug}")

        # Content-quality warnings: these are review prompts, not deployment blockers.
        lowered = text.lower()
        if "season 5" in lowered and "season 4" in lowered and not any(
            marker in lowered for marker in ("conflict", "third-party", "third party", "different numbering", "mislabel")
        ):
            warn("Article mentions both Season 4 and Season 5 without an obvious numbering-conflict explanation", path)

        legacy_names = ["capital shop", "arena shop", "black gold shop"]
        if any(name in lowered for name in legacy_names) and "legacy" not in lowered and "former" not in lowered and "histor" not in lowered:
            warn("Retired shop naming appears without an obvious legacy/historical label", path)

    # Heuristic overlap report. This never blocks deploy; it identifies review candidates.
    overlap_candidates: list[tuple[float, str, str]] = []
    for i, left in enumerate(articles):
        left_tokens = tokens(f"{left['title']} {left['description']}")
        if not left_tokens:
            continue
        for right in articles[i + 1 :]:
            right_tokens = tokens(f"{right['title']} {right['description']}")
            if not right_tokens:
                continue
            union = left_tokens | right_tokens
            score = len(left_tokens & right_tokens) / len(union) if union else 0
            if score >= 0.58:
                overlap_candidates.append((score, left["slug"], right["slug"]))

    overlap_candidates.sort(reverse=True)
    for score, left, right in overlap_candidates[:8]:
        warn(f"Possible content overlap ({score:.0%} token similarity): {left} ↔ {right}")

    # Unreferenced articles are not failures because coverage domains intentionally point to hubs
    # rather than duplicating all profile slugs, but the number is reported for maintenance context.
    unreferenced = sorted(valid_slugs - referenced_slugs)

    for message in failures:
        error(message, COVERAGE)

    print(
        "W19 content audit: "
        f"{len(articles)} articles / {len(domains)} coverage domains / "
        f"{internal_links} explicit internal links / {len(linked_articles)} linked target articles."
    )
    print(
        "Coverage status counts: "
        + ", ".join(f"{status}={status_counts.get(status, 0)}" for status in sorted(ALLOWED_STATUSES))
    )
    print(
        f"Coverage contract references {len(referenced_slugs)} unique article slugs; "
        f"{len(unreferenced)} profile/detail routes are represented indirectly through their domain hubs."
    )

    if failures:
        print("W19 content audit failed. Fix blocking coverage or cross-link issues above.")
        return 1

    print("W19 content audit passed; warnings above are editorial review candidates only.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
