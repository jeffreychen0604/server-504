#!/usr/bin/env python3
"""Advisory linguistic QA for localized Wiki prose.

This audit intentionally never fails deployment for wording candidates. Dark War: Survival
uses many official English UI/system names, so heuristic language detection must remain a
review queue rather than a correctness gate.
"""

import json
import re
from collections import Counter
from pathlib import Path

manifest = json.loads(Path('content/wiki-manifest.json').read_text(encoding='utf-8'))
files = [article['file'] for article in manifest.get('articles', [])]
locales = ['fr', 'es', 'pt', 'ko', 'vi']

# Deliberately narrow: these are editorial English expressions, not protected game-system names.
PATTERNS = {
    'fr': [
        r'\boverview\b', r'\bframework\b', r'\bside events?\b', r'\breward tables?\b',
        r'\brequirements?\b', r'\bmechanics?\b', r'\bpolicy\b', r'\bmilestones?\b',
        r'\branking rewards?\b', r'\bstacks?\b', r'\bworld map\b',
    ],
    'es': [
        r'\boverview\b', r'\bframework\b', r'\bside events?\b', r'\breward tables?\b',
        r'\brequirements?\b', r'\bmechanics?\b', r'\bpolicy\b', r'\bmilestones?\b',
        r'\branking rewards?\b', r'\bstacks?\b', r'\bworld map\b',
    ],
    'pt': [
        r'\boverview\b', r'\bframework\b', r'\bside events?\b', r'\breward tables?\b',
        r'\brequirements?\b', r'\bmechanics?\b', r'\bpolicy\b', r'\bmilestones?\b',
        r'\branking rewards?\b', r'\bstacks?\b', r'\bworld map\b',
    ],
    'ko': [
        r'\boverview\b', r'\bframework\b', r'\bside events?\b', r'\breward tables?\b',
        r'\brequirements?\b', r'\bmechanics?\b', r'\bpolicy\b', r'\bmilestones?\b',
        r'\branking rewards?\b', r'\bstacks?\b', r'\bworld map\b', r'\breward\b',
    ],
    'vi': [
        r'\boverview\b', r'\bframework\b', r'\bside events?\b', r'\breward tables?\b',
        r'\brequirements?\b', r'\bmechanics?\b', r'\bpolicy\b', r'\bmilestones?\b',
        r'\branking rewards?\b', r'\bstacks?\b', r'\bworld map\b', r'\breward\b',
        r'\bcontent\b', r'\braw\b', r'\bbalance\b',
    ],
}

compiled = {locale: [(p, re.compile(p, re.I)) for p in patterns] for locale, patterns in PATTERNS.items()}


def prose_only(text: str) -> str:
    # External source names/titles are intentionally allowed to remain in their source language.
    text = re.split(r'^##\s+(?:Sources|Source|Nguồn|Fuentes|Fontes|출처)\s*$', text, flags=re.I | re.M)[0]
    # Remove URL targets, inline code and raw URLs before heuristic matching.
    text = re.sub(r'\]\([^)]*\)', ']', text)
    text = re.sub(r'`[^`]*`', '', text)
    text = re.sub(r'https?://\S+', '', text)
    return text


print('Wiki linguistic QA (advisory; official game terms are protected):')
for locale in locales:
    per_file = Counter()
    per_pattern = Counter()
    for file_name in files:
        path = Path('content') / locale / 'wiki' / file_name
        if not path.is_file():
            continue
        text = prose_only(path.read_text(encoding='utf-8'))
        for label, rx in compiled[locale]:
            matches = rx.findall(text)
            if matches:
                per_file[file_name] += len(matches)
                per_pattern[label] += len(matches)

    total = sum(per_file.values())
    if total == 0:
        print(f'  {locale.upper()}: 0 editorial code-switch candidates in curated audit patterns')
        continue

    top = ', '.join(f'{name} ({count})' for name, count in per_file.most_common(6))
    print(f'  {locale.upper()}: {total} review candidate(s) across {len(per_file)} article(s); top: {top}')

print('Linguistic QA is advisory: review candidates do not block deployment.')
