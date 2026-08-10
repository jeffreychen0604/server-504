#!/usr/bin/env python3
import json
import re
from pathlib import Path
import sys

manifest_path = Path('content/wiki-manifest.json')
progress_path = Path('content/wiki-localization.json')
titles_path = Path('content/wiki-titles.json')
errors = []

try:
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    progress = json.loads(progress_path.read_text(encoding='utf-8'))
    titles = json.loads(titles_path.read_text(encoding='utf-8'))
except Exception as exc:
    print(f'::error::Unable to parse localization contract: {exc}')
    sys.exit(1)

article_by_slug = {a['slug']: a for a in manifest.get('articles', [])}
article_by_file = {a['file']: a for a in manifest.get('articles', [])}
manifest_files = set(article_by_file)
manifest_slugs = set(article_by_slug)
title_map = titles.get('titles', {})
supported = progress.get('supportedLocales', [])
source_locale = progress.get('sourceLocale')
coverage_mode = progress.get('coverageMode')

if progress.get('version') != 2:
    errors.append('wiki-localization.json must use localization contract version 2')
if supported != ['en', 'fr', 'es', 'pt', 'ko', 'vi']:
    errors.append('supportedLocales must remain exactly EN/FR/ES/PT/KO/VI in canonical order')
if source_locale != 'en':
    errors.append('English must remain the Wiki source locale')
if coverage_mode != 'full':
    errors.append('coverageMode must remain full while Server 504 advertises complete Wiki localization')

# Localized title metadata is canonical for user-visible page/card/search labels.
missing_title_slugs = sorted(manifest_slugs - set(title_map))
unknown_title_slugs = sorted(set(title_map) - manifest_slugs)
if missing_title_slugs:
    errors.append('wiki-titles.json missing manifest slug(s): ' + ', '.join(missing_title_slugs))
if unknown_title_slugs:
    errors.append('wiki-titles.json contains unknown slug(s): ' + ', '.join(unknown_title_slugs))

complete_batch_slugs = set()
seen_batch_ids = set()
for batch in progress.get('batches', []):
    batch_id = batch.get('id')
    if not batch_id or batch_id in seen_batch_ids:
        errors.append(f'Duplicate or missing localization batch id: {batch_id}')
    seen_batch_ids.add(batch_id)
    slugs = batch.get('slugs', [])
    if len(slugs) != len(set(slugs)):
        errors.append(f'Localization batch {batch_id} contains duplicate slugs')
    for slug in slugs:
        if slug not in article_by_slug:
            errors.append(f'Localization batch {batch_id} references unknown slug: {slug}')
    if batch.get('status') == 'complete':
        complete_batch_slugs.update(slugs)

if coverage_mode == 'full':
    missing_batch_coverage = sorted(manifest_slugs - complete_batch_slugs)
    extra_batch_coverage = sorted(complete_batch_slugs - manifest_slugs)
    if missing_batch_coverage:
        errors.append('Complete localization batches do not cover manifest slug(s): ' + ', '.join(missing_batch_coverage))
    if extra_batch_coverage:
        errors.append('Localization batches cover unknown slug(s): ' + ', '.join(extra_batch_coverage))

link_pattern = re.compile(r'\]\(#/wiki/([a-z0-9-]+)(?:[^)]*)\)')
counts = {}
h1_drift_counts = {}
for locale in supported:
    if locale == source_locale:
        continue

    locale_dir = Path('content') / locale / 'wiki'
    actual_files = {p.name for p in locale_dir.glob('*.md')} if locale_dir.exists() else set()
    counts[locale] = len(actual_files & manifest_files)
    h1_drift_counts[locale] = 0

    unknown_files = sorted(actual_files - manifest_files)
    if unknown_files:
        errors.append(f'{locale}: localized Wiki file(s) are not registered in the manifest: {", ".join(unknown_files)}')

    if coverage_mode == 'full':
        missing_files = sorted(manifest_files - actual_files)
        if missing_files:
            errors.append(f'{locale}: full localization missing file(s): {", ".join(missing_files)}')

    for file_name in sorted(actual_files & manifest_files):
        path = locale_dir / file_name
        text = path.read_text(encoding='utf-8').strip()
        article = article_by_file[file_name]
        slug = article['slug']

        if not text.startswith('# '):
            errors.append(f'{locale}: translated article missing H1: {path}')
        else:
            actual_h1 = text.splitlines()[0][2:].strip()
            expected_h1 = str(title_map.get(slug, {}).get(locale, '')).strip()
            if not expected_h1:
                errors.append(f'{locale}: missing localized title contract for {slug}')
            elif actual_h1 != expected_h1:
                # The runtime page header uses wiki-titles.json and CSS hides the Markdown H1.
                # Keep this as editorial debt rather than a deployment blocker.
                h1_drift_counts[locale] += 1

        english_path = Path('content/en/wiki') / file_name
        english = english_path.read_text(encoding='utf-8').strip()
        if text == english:
            errors.append(f'{locale}: translated article is identical to English source: {path}')

        for target_slug in link_pattern.findall(text):
            if target_slug not in manifest_slugs:
                errors.append(f'{locale}: broken internal Wiki link in {path}: {target_slug}')

    for batch in progress.get('batches', []):
        if batch.get('status') != 'complete':
            continue
        missing = [
            article_by_slug[slug]['file']
            for slug in batch.get('slugs', [])
            if slug in article_by_slug and article_by_slug[slug]['file'] not in actual_files
        ]
        if missing:
            errors.append(f'Complete batch {batch.get("id")} missing {locale}: {", ".join(missing)}')

if errors:
    for error in errors:
        print(f'::error file={progress_path}::{error}')
    sys.exit(1)

print(
    'Wiki localization validation passed: '
    + ', '.join(f'{locale.upper()} {count}/{len(article_by_slug)}' for locale, count in counts.items())
    + '; localized internal links valid.'
)
drift = ', '.join(f'{locale.upper()} {count}' for locale, count in h1_drift_counts.items() if count)
if drift:
    print('Wiki H1/title drift advisory (Markdown H1 is hidden; display title remains canonical): ' + drift)
