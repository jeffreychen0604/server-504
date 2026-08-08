#!/usr/bin/env bash
set -euo pipefail

fail=0
wiki_root="content/en/wiki"

report_matches() {
  local label="$1"
  local pattern="$2"
  shift 2
  local targets=("$@")

  if grep -RIniE -- "$pattern" "${targets[@]}"; then
    echo "::error::$label"
    fail=1
  fi
}

# Sources that must never be used by the public Server 504 Wiki.
report_matches \
  "Forbidden source domain detected: dark-war-survival.com" \
  'dark-war-survival\.com' \
  "$wiki_root" assets index.html README.md

# This historical community domain is no longer a dependable live source.
report_matches \
  "Retired source domain detected: darkwar.wiki" \
  'darkwar\.wiki' \
  "$wiki_root" assets index.html README.md

# Dark War: Survival must not inherit content or terminology from an unrelated game.
report_matches \
  "Unrelated game reference detected in public site content" \
  '(^|[^[:alnum:]])Last[[:space:]]+War([^[:alnum:]]|$)' \
  "$wiki_root" assets index.html README.md

# Seasonal Annex is intentionally not part of the public site IA.
report_matches \
  "Removed Seasonal Annex route/navigation detected" \
  'seasonal-annex|Seasonal Annex' \
  assets index.html README.md

# Minimal article-shape validation for every English Wiki reference.
# Three date markers are accepted because article families use different but
# equivalent metadata labels: general references, hero profiles and audit queues.
for file in "$wiki_root"/*.md; do
  if ! grep -q '^# ' "$file"; then
    echo "::error file=$file::Wiki article is missing an H1 title"
    fail=1
  fi

  if ! grep -qiE '(Last verified|Identity verified|Updated):' "$file"; then
    echo "::error file=$file::Wiki article is missing a verification/update date marker"
    fail=1
  fi
done

if [[ "$fail" -ne 0 ]]; then
  echo "Wiki validation failed. Fix the blocking issues above before deployment."
  exit 1
fi

echo "Wiki validation passed with zero blocking or metadata issues."
