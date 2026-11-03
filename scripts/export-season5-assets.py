"""Export the reviewed Season 5 artwork without changing its composition."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    'hero-desktop': 'exec-863491f5-512f-41d1-bcef-59bac54384e7.png',
    'hero-mobile': 'exec-cb6e7ad0-3511-4bd7-8a44-f6c74345ecb1.png',
    'wiki-sanctuary': 'exec-97285227-c7c1-4bdc-9190-d8798c2b1eae.png',
    'serpent-crest': 'exec-f037261c-7c19-4bd1-b7e1-3541d835690b.png',
}
VARIANTS = {
    'hero-desktop': [('hero-desktop.webp', 1760, 85), ('hero-desktop-960.webp', 960, 83)],
    'hero-mobile': [('hero-mobile.webp', 768, 85), ('hero-mobile-480.webp', 480, 83)],
    'wiki-sanctuary': [('wiki-sanctuary.webp', 1280, 85), ('wiki-sanctuary-640.webp', 640, 82)],
    'serpent-crest': [('serpent-crest.webp', 512, 88), ('serpent-crest-128.png', 128, None)],
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-dir', type=Path, required=True)
    args = parser.parse_args()
    output = ROOT / 'assets/season-5/draft-v1'
    masters = ROOT / 'docs/season-5/masters'
    output.mkdir(parents=True, exist_ok=True)
    masters.mkdir(parents=True, exist_ok=True)
    records = []
    for asset, filename in SOURCES.items():
        source = args.source_dir / f'{asset}.png'
        if not source.is_file():
            source = args.source_dir / filename
        destination = masters / f'{asset}.png'
        if source.resolve() != destination.resolve():
            shutil.copy2(source, destination)
        with Image.open(source) as image:
            for name, width, quality in VARIANTS[asset]:
                height = round(image.height * min(width / image.width, 1))
                size = (min(width, image.width), height)
                variant = image.resize(size, Image.Resampling.LANCZOS)
                target = output / name
                if quality is None:
                    variant.save(target, optimize=True)
                else:
                    variant.save(target, 'WEBP', quality=quality, method=6)
                record = {
                    'asset': asset, 'file': target.relative_to(ROOT).as_posix(),
                    'width': variant.width, 'height': variant.height,
                    'bytes': target.stat().st_size,
                    'sha256': hashlib.sha256(target.read_bytes()).hexdigest(),
                    'hasAlpha': 'A' in variant.getbands(),
                }
                records.append(record)
                print(f'{name}: {variant.width}x{variant.height}, {record["bytes"]:,} bytes')
    (output / 'manifest.json').write_text(json.dumps({
        'status': 'design-preview', 'created': '2026-11-03',
        'generator': 'built-in image_gen',
        'description': 'Reference-inspired concept artwork; not original game exports.',
        'variants': records,
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
