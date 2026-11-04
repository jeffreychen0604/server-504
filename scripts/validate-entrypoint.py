"""Guard the shared UI dependencies and feedback DOM contract before publishing."""
from html.parser import HTMLParser
import hashlib
import json
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]


class EntryPoint(HTMLParser):
    def __init__(self):
        super().__init__()
        self.styles = []
        self.scripts = []
        self.ids = set()
        self.elements = {}
        self.dialog_closers = []
        self.body_classes = set()
        self.preview_markup = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'body':
            self.body_classes = set(attrs.get('class', '').split())
        if tag == 'base' or (tag == 'meta' and 'noindex' in attrs.get('content', '')):
            self.preview_markup = True
        if attrs.get('id'):
            self.ids.add(attrs['id'])
            self.elements[attrs['id']] = attrs
        if tag == 'button' and 'data-close-dialog' in attrs:
            self.dialog_closers.append(attrs)
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.styles.append(urlsplit(attrs.get('href', '')).path)
        if tag == 'script' and attrs.get('src'):
            self.scripts.append(urlsplit(attrs['src']).path)


def validate(html):
    page = EntryPoint()
    page.feed(html)
    errors = []
    # Explicit production contract: layout + functional tools + one Season 5 skin.
    required = [
        'season-5/tokens', 'season-5/layout', 'feedback', 'wiki-research',
        'wiki-calculators', 'search-discovery', 'guides',
        'season-5/ui-remake', 'season-5/sandstorm', 'alliance-banners',
    ]
    positions = []
    for name in required:
        path = f'./assets/{name}.css'
        if path not in page.styles:
            errors.append(f'Missing shared stylesheet: {path}')
        else:
            positions.append(page.styles.index(path))
    if positions != sorted(positions):
        errors.append('Shared stylesheet cascade order changed')
    if set(page.styles) != {f'./assets/{name}.css' for name in required} or len(page.styles) != len(required):
        errors.append('Unexpected / duplicate stylesheet; do not restore competing S4 presentation layers')
    if not {'s5-season', 's5-ui-remake'} <= page.body_classes or 's5-preview' in page.body_classes:
        errors.append('Production must mount the Season 5 theme without preview mode')
    if page.preview_markup or 'ui-preview-guard.js' in html or 'UI preview V3' in html:
        errors.append('Preview-only markup / form guard must not ship in the production entrypoint')
    for name in ('home-runtime', 'ui-remake', 'sandstorm'):
        if page.scripts.count(f'./assets/season-5/{name}.js') != 1:
            errors.append(f'Season 5 runtime must load exactly once: {name}')
    for path in page.scripts:
        if any(name in path for name in ('seasonal-sakura', 'fancy-home.js', 'lucky-magic-house-artwork', 'catherines-party')):
            errors.append(f'Retired presentation runtime must not compete with the Season 5 theme: {path}')
    for path in page.styles + page.scripts:
        if path.startswith('./') and not (ROOT / path).is_file():
            errors.append(f'Missing entrypoint asset: {path}')
    for path in page.styles:
        stylesheet = ROOT / path
        if not stylesheet.is_file():
            continue
        for raw in re.findall(r'url\(\s*[\'"]?([^\)\'"\s]+)', stylesheet.read_text(encoding='utf-8')):
            target = urlsplit(raw)
            if not target.scheme and target.path and not (stylesheet.parent / target.path).is_file():
                errors.append(f'Missing CSS resource: {path} -> {target.path}')
    for folder in ('draft-v1', 'relic-ui', 'command-ui'):
        manifest = ROOT / f'assets/season-5/{folder}/manifest.json'
        if not manifest.is_file():
            errors.append(f'Missing Season 5 asset manifest: {folder}')
            continue
        for item in json.loads(manifest.read_text(encoding='utf-8'))['variants']:
            file = ROOT / item['file']
            if not file.is_file() or file.stat().st_size != item['bytes'] or hashlib.sha256(file.read_bytes()).hexdigest() != item['sha256']:
                errors.append(f'Missing or altered reviewed artwork: {item["file"]}')
    feedback = (ROOT / 'assets/feedback.js').read_text(encoding='utf-8')
    for element_id in set(re.findall(r"getElementById\(['\"]([^'\"]+)['\"]\)", feedback)):
        if element_id not in page.ids:
            errors.append(f'Missing feedback element: #{element_id}')
    config, runtime = './assets/feedback-config.js', './assets/feedback.js'
    if config not in page.scripts or runtime not in page.scripts:
        errors.append('Feedback config/runtime must be included')
    elif page.scripts.index(config) > page.scripts.index(runtime):
        errors.append('Feedback config must precede the runtime')
    for element_id in ('searchDialog', 'contributeDialog', 'searchInput'):
        label_ids = page.elements.get(element_id, {}).get('aria-labelledby', '').split()
        if not label_ids or any(label_id not in page.ids for label_id in label_ids):
            errors.append(f'Missing accessible name reference: #{element_id}')
    for button in page.dialog_closers:
        if not button.get('aria-label', '').strip():
            errors.append(f'Missing close button name: #{button["data-close-dialog"]}')
    menu = page.elements.get('menuToggle', {})
    if menu.get('aria-controls') != 'sidebar' or menu.get('aria-expanded') not in ('true', 'false'):
        errors.append('Menu toggle must expose its target and expanded state')
    return errors


if __name__ == '__main__':
    problems = validate((ROOT / 'index.html').read_text(encoding='utf-8'))
    for problem in problems:
        print(f'::error file=index.html::{problem}')
    if problems:
        sys.exit(1)
    print('Entrypoint validation passed: UI styles, cascade, assets, feedback DOM and accessible names.')
