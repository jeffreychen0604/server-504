"""Package the Season 5 concept kit with its standalone preview dependencies."""
import hashlib
import json
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'docs/season-5'
for manifest_path in ('assets/season-5/draft-v1/manifest.json', 'assets/season-5/relic-ui/manifest.json'):
    manifest = json.loads((ROOT / manifest_path).read_text(encoding='utf-8'))
    for item in manifest['variants']:
        file = ROOT / item['file']
        assert file.stat().st_size == item['bytes'], f'Size mismatch: {file}'
        assert hashlib.sha256(file.read_bytes()).hexdigest() == item['sha256'], f'Hash mismatch: {file}'

files = set()
for directory in (ROOT / 'assets', ROOT / 'content', KIT):
    files.update(path for path in directory.rglob('*') if path.is_file() and path.suffix not in ('.zip', '.pyc'))
for filename in (
    'assets/home-alliance-enhancer.js', 'assets/alliance-banners.css',
    'assets/alliance-banners-sprite.webp.base64.txt', 'assets/alliance-banners/h3il.png',
    'content/server-status.json', 'content/wiki-manifest.json',
    'scripts/preview-season5.cjs', 'scripts/export-season5-assets.py', 'scripts/package-season5.py',
    'scripts/build-season5-ui-preview.py', 'scripts/export-season5-relic-ui.py', 'index.html',
):
    file = ROOT / filename
    assert file.is_file(), f'Missing dependency: {file}'
    files.add(file)
target = KIT / 'season5-design-kit-v3.2.zip'
with zipfile.ZipFile(target, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
    for file in sorted(files):
        archive.write(file, file.relative_to(ROOT).as_posix())
with zipfile.ZipFile(target) as archive:
    assert archive.testzip() is None, 'Archive CRC failed'
print(f'Kit packaged: {target} ({len(files)} files, {target.stat().st_size:,} bytes)')
