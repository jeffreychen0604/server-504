"""Export V3.3 Image Gen masters; resize/format only, preserving generated alpha."""
from pathlib import Path
import hashlib
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
folder = ROOT / 'assets/season-5/command-ui'
folder.mkdir(parents=True, exist_ok=True)
records = []
for name, width in [('stone-slab', 768), ('capital-pedestal', 480), ('bronze-nameplate', 960)]:
    source = ROOT / 'docs/season-5/masters/command-ui' / (name + '.png')
    with Image.open(source) as original:
        assert original.mode == 'RGBA' and original.getchannel('A').getextrema()[0] == 0
        picture = original.resize((width, round(original.height * width / original.width)), Image.Resampling.LANCZOS)
        target = folder / (name + '.webp')
        picture.save(target, 'WEBP', quality=88, method=6)
        records.append({'file': target.relative_to(ROOT).as_posix(), 'width': picture.width,
                        'height': picture.height, 'bytes': target.stat().st_size,
                        'sha256': hashlib.sha256(target.read_bytes()).hexdigest(), 'hasAlpha': True})
        print(f'{name}: {picture.size}, {target.stat().st_size:,} bytes')
(folder / 'manifest.json').write_text(json.dumps({'generator': 'built-in image_gen',
    'processing': 'Resize / format only. Generated composition and alpha preserved.',
    'variants': records}, indent=2) + '\n', encoding='utf-8')
