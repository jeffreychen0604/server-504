#!/usr/bin/env python3
import json
from pathlib import Path
import sys

manifest_path = Path('content/wiki-manifest.json')
progress_path = Path('content/wiki-localization.json')
errors = []

try:
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    progress = json.loads(progress_path.read_text(encoding='utf-8'))
except Exception as exc:
    print(f'::error::Unable to parse localization contract: {exc}')
    sys.exit(1)

article_by_slug = {a['slug']: a for a in manifest.get('articles', [])}
supported = progress.get('supportedLocales', [])
source_locale = progress.get('sourceLocale')
translated = progress.get('translated', {})

if supported != ['en', 'fr', 'es', 'pt', 'ko', 'vi']:
    errors.append('supportedLocales must remain exactly EN/FR/ES/PT/KO/VI in canonical order')
if source_locale != 'en':
    errors.append('English must remain the Wiki source locale')

for locale in supported:
    if locale == source_locale:
        continue
    declared = translated.get(locale)
    if not isinstance(declared, list):
        errors.append(f'Missing translated slug list for locale: {locale}')
        declared = []
    if len(declared) != len(set(declared)):
        errors.append(f'Duplicate translated slugs in locale: {locale}')

    declared_set = set(declared)
    locale_dir = Path('content') / locale / 'wiki'
    actual_files = {p.name for p in locale_dir.glob('*.md')} if locale_dir.exists() else set()
    expected_files = set()

    for slug in declared:
        article = article_by_slug.get(slug)
        if not article:
            errors.append(f'{locale}: unknown translated slug: {slug}')
            continue
        file_name = article['file']
        expected_files.add(file_name)
        path = locale_dir / file_name
        if not path.is_file():
            errors.append(f'{locale}: declared translation file missing: {path}')
            continue
        text = path.read_text(encoding='utf-8').strip()
        if not text.startswith('# '):
            errors.append(f'{locale}: translated article missing H1: {path}')
        english = (Path('content/en/wiki') / file_name).read_text(encoding='utf-8').strip()
        if text == english:
            errors.append(f'{locale}: translated article is identical to English source: {path}')

    for orphan in sorted(actual_files - expected_files):
        errors.append(f'{locale}: localized Wiki file is not tracked in wiki-localization.json: {orphan}')

for batch in progress.get('batches', []):
    slugs = batch.get('slugs', [])
    for slug in slugs:
        if slug not in article_by_slug:
            errors.append(f'Localization batch {batch.get("id")} references unknown slug: {slug}')
    if batch.get('status') == 'complete':
        for locale in supported:
            if locale == source_locale:
                continue
            missing = [slug for slug in slugs if slug not in set(translated.get(locale, []))]
            if missing:
                errors.append(f'Complete batch {batch.get("id")} missing {locale}: {", ".join(missing)}')

if errors:
    for error in errors:
        print(f'::error file={progress_path}::{error}')
    sys.exit(1)

counts = {locale: len(translated.get(locale, [])) for locale in supported if locale != source_locale}
print('Wiki localization validation passed: ' + ', '.join(f'{locale.upper()} {count}/{len(article_by_slug)}' for locale, count in counts.items()))
