"""Resize reviewed component PNGs for web, preserving composition and alpha."""
from pathlib import Path
import hashlib
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
output = ROOT / 'assets/season-5/relic-ui'
output.mkdir(parents=True, exist_ok=True)
records = []
for name, width in [('relic-frame', 768), ('relic-header', 640)]:
    source = ROOT / 'docs/season-5/masters/relic-ui' / (name + '.png')
    with Image.open(source) as original:
        assert original.mode == 'RGBA', f'Missing alpha: {name}'
        assert original.getchannel('A').getextrema() == (0, 255)
        size = (width, round(original.height * width / original.width))
        image = original.resize(size, Image.Resampling.LANCZOS)
        target = output / (name + '.webp')
        image.save(target, 'WEBP', quality=90, method=6)
        with Image.open(target) as check:
            assert 'A' in check.getbands() and check.getchannel('A').getextrema() == (0, 255)
        records.append({'file': target.relative_to(ROOT).as_posix(), 'width': image.width,
                        'height': image.height, 'bytes': target.stat().st_size,
                        'sha256': hashlib.sha256(target.read_bytes()).hexdigest(), 'hasAlpha': True})
        print(f'{name}: {original.size} -> {image.size}, {target.stat().st_size:,} bytes')
(output / 'manifest.json').write_text(json.dumps({'generator': 'built-in image_gen',
    'processing': 'Resize / format only; original composition and transparency preserved.',
    'variants': records}, indent=2) + '\n', encoding='utf-8')
