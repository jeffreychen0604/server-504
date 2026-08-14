#!/usr/bin/env bash
set -euo pipefail

fail=0
wiki_root="content/en/wiki"
manifest="content/wiki-manifest.json"

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
  "$wiki_root" assets index.html README.md "$manifest"

# This historical community domain is no longer a dependable live source.
report_matches \
  "Retired source domain detected: darkwar.wiki" \
  'darkwar\.wiki' \
  "$wiki_root" assets index.html README.md "$manifest"

# Dark War: Survival must not inherit content or terminology from an unrelated game.
report_matches \
  "Unrelated game reference detected in public site content" \
  '(^|[^[:alnum:]])Last[[:space:]]+War([^[:alnum:]]|$)' \
  "$wiki_root" assets index.html README.md "$manifest"

# Seasonal Annex is intentionally not part of the public site IA.
report_matches \
  "Removed Seasonal Annex route/navigation detected" \
  'seasonal-annex|Seasonal Annex' \
  assets index.html README.md "$manifest"

# W17 architecture guard: the browser must use only the consolidated Wiki runtime.
legacy_scripts=(
  'wiki-research.js'
  'wiki-w12.js'
  'wiki-w13.js'
  'wiki-w14.js'
  'wiki-w15.js'
  'wiki-ia.js'
)
for legacy in "${legacy_scripts[@]}"; do
  if grep -q "$legacy" index.html; then
    echo "::error file=index.html::Retired Wiki runtime is referenced by the public entrypoint: $legacy"
    fail=1
  fi
done

if ! grep -q 'assets/wiki-runtime.js' index.html; then
  echo "::error file=index.html::Unified Wiki runtime is missing from the public entrypoint"
  fail=1
fi

# W18 discovery layer must stay attached to the same public entrypoint.
if ! grep -q 'assets/search-discovery.js' index.html; then
  echo "::error file=index.html::Search discovery runtime is missing from the public entrypoint"
  fail=1
fi
if ! grep -q 'assets/search-discovery.css' index.html; then
  echo "::error file=index.html::Search discovery stylesheet is missing from the public entrypoint"
  fail=1
fi

# Parse-check active public JavaScript before Pages deployment.
active_js=(
  assets/i18n.js
  assets/app.js
  assets/feedback.js
  assets/guides-runtime.js
  assets/lazy-wiki-loader.js
  assets/wiki-runtime.js
  assets/wiki-calculators.js
  assets/search-discovery.js
)
for script in "${active_js[@]}"; do
  if ! node --check "$script" >/dev/null; then
    echo "::error file=$script::Public runtime has a JavaScript syntax error"
    fail=1
  fi
done

# Six-locale UI/content contract: EN / FR / ES / PT / KO / VI.
if ! node scripts/validate-i18n.js; then
  fail=1
fi

# Wiki body localization contract: completed batches must exist in every declared locale.
if ! python3 scripts/validate-wiki-localization.py; then
  fail=1
fi

# Generated single-request search index must stay in sync with every localized body.
if ! python3 scripts/build-wiki-search-index.py --check; then
  fail=1
fi

# Linguistic QA is advisory because official in-game English terms are intentionally preserved.
python3 scripts/audit-wiki-linguistic.py

# Minimal article-shape validation for every English Wiki reference.
# Accepted date markers cover general references, hero profiles and audit queues.
for file in "$wiki_root"/*.md; do
  if ! grep -q '^# ' "$file"; then
    echo "::error file=$file::Wiki article is missing an H1 title"
    fail=1
  fi

  if ! head -n 16 "$file" | grep -qiE '\*\*(Last verified|Identity verified|Updated):\*\*'; then
    echo "MISSING_VERIFICATION_DATE: $file"
    echo "::error file=$file::Wiki article is missing a verification/update date marker near the top"
    fail=1
  fi
done

# The manifest is the single registry contract for routes, taxonomy and search.
python3 - <<'PY'
import json
from pathlib import Path
import sys

manifest_path = Path('content/wiki-manifest.json')
wiki_root = Path('content/en/wiki')
errors = []

try:
    data = json.loads(manifest_path.read_text(encoding='utf-8'))
except Exception as exc:
    print(f'::error file={manifest_path}::Invalid Wiki manifest JSON: {exc}')
    sys.exit(1)

articles = data.get('articles')
categories = data.get('categories')
if not isinstance(articles, list) or not articles:
    errors.append('Manifest must contain a non-empty articles array')
    articles = []
if not isinstance(categories, list) or not categories:
    errors.append('Manifest must contain a non-empty categories array')
    categories = []

slugs = [str(x.get('slug', '')).strip() for x in articles]
files = [str(x.get('file', '')).strip() for x in articles]

for label, values in [('slug', slugs), ('file', files)]:
    seen = set()
    duplicates = sorted({v for v in values if v and (v in seen or seen.add(v))})
    if duplicates:
        errors.append(f'Duplicate manifest {label}(s): {", ".join(duplicates)}')

for i, article in enumerate(articles, 1):
    for field in ('slug', 'file', 'group', 'title', 'description'):
        if not str(article.get(field, '')).strip():
            errors.append(f'Article #{i} missing required field: {field}')
    file_name = str(article.get('file', '')).strip()
    if file_name and not (wiki_root / file_name).is_file():
        errors.append(f'Manifest references missing file: {file_name}')

actual_files = {p.name for p in wiki_root.glob('*.md')}
manifest_files = {f for f in files if f}
for file_name in sorted(actual_files - manifest_files):
    errors.append(f'Unregistered Wiki file: {file_name}')
for file_name in sorted(manifest_files - actual_files):
    errors.append(f'Manifest file does not exist: {file_name}')

category_ids = [str(x.get('id', '')).strip() for x in categories]
if len(category_ids) != len(set(category_ids)):
    errors.append('Category ids must be unique')

def normalize_group(value):
    group = str(value or '').strip().upper()
    if group.startswith('HERO PROFILE'):
        return 'HERO PROFILE'
    if group.startswith('PET AGENT PROFILE'):
        return 'PET AGENT PROFILE'
    return group

mapped_groups = {
    normalize_group(group)
    for category in categories
    for group in category.get('groups', [])
}
for article in articles:
    group = normalize_group(article.get('group'))
    if group not in mapped_groups:
        errors.append(f'Article group is not mapped into taxonomy: {article.get("slug")} -> {article.get("group")}')

if errors:
    for error in errors:
        print(f'::error file={manifest_path}::{error}')
    sys.exit(1)

print(f'Wiki manifest validation passed: {len(articles)} routes / {len(actual_files)} Markdown files / {len(categories)} categories.')
PY

if [[ "$fail" -ne 0 ]]; then
  echo "Wiki validation failed. Fix the blocking issues above before deployment."
  exit 1
fi

echo "Wiki validation passed with zero blocking, registry, runtime, discovery or localization issues."
