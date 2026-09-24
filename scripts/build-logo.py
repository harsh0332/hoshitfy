"""Build the horizontal logo lockup (H mark + HOSTEDITIFY wordmark) from assets/brand/logo-source.png.

The source is bright artwork on a near-black background, so brightness is used as the
alpha matte ("unpremultiply from black"). Output: public/brand/logo-horizontal.png (@2x of 48px).
"""
from PIL import Image
import numpy as np

SRC = "assets/brand/logo-source.png"
OUT = "public/brand/logo-horizontal.png"
TARGET_H = 96  # 2x of the 48px desktop navbar height
BG_LEVEL = 10.0  # near-black background value in the source

rgb = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float64)


def matte(region):
    """Turn bright-on-black pixels into RGBA with a clean alpha edge."""
    lifted = np.clip(region - BG_LEVEL, 0, None) / (255.0 - BG_LEVEL)
    alpha = lifted.max(axis=2)
    alpha = np.clip((alpha - 0.04) / 0.96, 0, 1)  # drop the faint background glow
    safe = np.where(alpha > 0, alpha, 1)[..., None]
    color = np.clip(lifted / safe, 0, 1)
    out = np.dstack([color, alpha[..., None]])
    return Image.fromarray((out * 255).round().astype(np.uint8), "RGBA")


def trim(img, threshold=24):
    a = np.asarray(img)[..., 3]
    ys, xs = np.where(a > threshold)
    return img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


# Bounds found by scanning rows for bright pixels (mark: rows 260-725, wordmark: rows 766-871)
mark = trim(matte(rgb[240:745, 390:960]))
word = trim(matte(rgb[750:890, 150:1105]))

mark_h = TARGET_H
mark = mark.resize((round(mark.width * mark_h / mark.height), mark_h), Image.LANCZOS)
word_h = round(TARGET_H * 0.40)
word = word.resize((round(word.width * word_h / word.height), word_h), Image.LANCZOS)

gap = round(TARGET_H * 0.22)
canvas = Image.new("RGBA", (mark.width + gap + word.width, TARGET_H), (0, 0, 0, 0))
canvas.alpha_composite(mark, (0, 0))
canvas.alpha_composite(word, (mark.width + gap, (TARGET_H - word_h) // 2))
canvas.save(OUT, optimize=True)
print(OUT, canvas.size)

# Square app icon / favicon from the H mark (512x512, transparent)
ICON = "public/brand/icon.png"
full_mark = trim(matte(rgb[240:745, 390:960]))
side = 512
pad = 40
scale = (side - 2 * pad) / max(full_mark.size)
m = full_mark.resize((round(full_mark.width * scale), round(full_mark.height * scale)), Image.LANCZOS)
icon = Image.new("RGBA", (side, side), (10, 10, 15, 255))
icon.alpha_composite(m, ((side - m.width) // 2, (side - m.height) // 2))
icon.save(ICON, optimize=True)
print(ICON, icon.size)
