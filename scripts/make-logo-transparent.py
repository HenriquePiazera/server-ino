"""Prepare logo asset with transparent background and tight crop."""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image


def sample_background_colors(pixels: np.ndarray) -> np.ndarray:
    height, width, _ = pixels.shape
    border = np.concatenate(
        [
            pixels[0, :, :3],
            pixels[height - 1, :, :3],
            pixels[1 : height - 1, 0, :3],
            pixels[1 : height - 1, width - 1, :3],
        ],
        axis=0,
    )
    step = max(1, len(border) // 256)
    return border[::step]


def make_transparent(image: Image.Image, tolerance: float = 42) -> Image.Image:
    pixels = np.array(image.convert('RGBA'), dtype=np.int16)
    samples = sample_background_colors(pixels).astype(np.float32)
    rgb = pixels[:, :, :3].astype(np.float32)

    distances = np.full(rgb.shape[:2], np.inf, dtype=np.float32)
    for sample in samples:
        dist = np.linalg.norm(rgb - sample, axis=2)
        distances = np.minimum(distances, dist)

    pixels[distances <= tolerance, 3] = 0
    return Image.fromarray(pixels.astype(np.uint8), mode='RGBA')


def crop_to_content(image: Image.Image, padding: int = 12) -> Image.Image:
    bbox = image.getbbox()
    if not bbox:
        return image

    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(image.width, right + padding)
    bottom = min(image.height, bottom + padding)
    return image.crop((left, top, right, bottom))


def prepare_logo(input_path: Path, output_path: Path) -> None:
    image = Image.open(input_path)
    image = make_transparent(image)
    image = crop_to_content(image)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    image.save(output_path, format='PNG', optimize=True)


if __name__ == '__main__':
    root = Path(__file__).resolve().parents[1]
    input_file = Path(sys.argv[1]) if len(sys.argv) > 1 else root / 'public' / 'server-ino-logo.png'
    output_file = Path(sys.argv[2]) if len(sys.argv) > 2 else input_file
    prepare_logo(input_file, output_file)
