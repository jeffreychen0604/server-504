"""Build a guarded local review copy of the production entrypoint."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
source = (root / 'index.html').read_text(encoding='utf-8')
source = source.replace('<head>', '<head>\n  <base href="../../">\n  <meta name="robots" content="noindex,nofollow">')
source = source.replace('class="s5-season s5-ui-remake"', 'class="s5-season s5-ui-remake s5-preview"', 1)
source = source.replace('<body class="s5-season s5-ui-remake s5-preview">', '<body class="s5-season s5-ui-remake s5-preview">\n<a class="s5-skip" href="docs/season-5/preview.html#/home">Season 5 · UI preview V3.2</a>')
source = re.sub(r'  <script[^>]+src="[^"]+"[^>]*></script>\n', lambda match: '' if any('/' + name in match[0] for name in ('feedback-config.js', 'feedback.js')) else match[0], source)
source = source.replace('  <script src="./assets/i18n.js', '  <script src="assets/season-5/ui-preview-guard.js"></script>\n  <script src="./assets/i18n.js')
(root / 'docs/season-5/preview.html').write_text(source, encoding='utf-8')
print('Built guarded local preview from production; production files unchanged.')
