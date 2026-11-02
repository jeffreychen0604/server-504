"""Guard the shared UI dependencies and feedback DOM contract before publishing."""
from html.parser import HTMLParser
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

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
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
    # These layers supply layout and components across all public routes.
    required = [
        'styles', 'art-overrides', 'layout-simplify', 'pages-fancy',
        'layout-refine', 'feedback', 'wiki-research', 'wiki-calculators',
        'wiki-ia', 'search-discovery', 'language-switcher', 'dashboard',
        'guides', 'sealed-island-theme', 'fancy-home', 'home-v2-recovery',
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
    for path in page.styles + page.scripts:
        if path.startswith('./') and not (ROOT / path).is_file():
            errors.append(f'Missing entrypoint asset: {path}')
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
