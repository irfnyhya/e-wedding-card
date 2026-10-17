"""Cuts public-domain botanical plates out of their paper so they sit on any background.
Usage: python -I tools/cutout.py <raw_dir>
Writes assets/flower-<name>.webp (full colour, transparent) and assets/eng-<name>.webp
(ink-only alpha mask, tinted at runtime with CSS mask-image).
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'assets')
RAW = sys.argv[1]

# name: (source file, crop box as fractions l,t,r,b of the plate, max output height)
PLATES = {
    'cabbage-rose': ('rose01.jpg', (.08, .02, .95, .86), 760),
    'white-roses': ('rose00.jpg', (.05, .02, .97, .86), 760),
    'anemones': ('fleur00.jpg', (.05, .04, .98, .86), 760),
    'iris': ('fleur01.jpg', (.08, .02, .95, .86), 760),
    'forget-me-not': ('fleur02.jpg', (.05, .04, .97, .85), 760),
    'red-rose': ('rose06.jpg', (.08, .06, .95, .87), 760),
    'pink-rose': ('rose09.jpg', (.08, .1, .95, .86), 760),
    'wild-rose': ('rose03.jpg', (.02, .04, .95, .86), 760),
}
EXTRA = [a for a in sys.argv[2:]]


def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def cut(name, src, box, maxh):
    im = Image.open(os.path.join(RAW, src)).convert('RGB')
    w, h = im.size
    im = im.crop((int(box[0] * w), int(box[1] * h), int(box[2] * w), int(box[3] * h)))
    a = np.asarray(im).astype(float)
    border = np.concatenate([a[:12].reshape(-1, 3), a[-12:].reshape(-1, 3), a[:, :12].reshape(-1, 3), a[:, -12:].reshape(-1, 3)])
    paper = np.median(border, axis=0)
    # paper varies across old plates: estimate it locally from a heavily blurred small copy
    small = im.resize((max(1, im.width // 8), max(1, im.height // 8))).filter(ImageFilter.GaussianBlur(8))
    bg = np.asarray(small.resize(im.size, Image.BILINEAR)).astype(float)
    bg = .5 * bg + .5 * paper
    d = np.sqrt(((a - bg) ** 2).sum(-1))
    dark = np.clip((bg.mean(-1) - a.mean(-1)), 0, None)
    sat = a.max(-1) - a.min(-1) - (paper.max() - paper.min())
    score = np.maximum(d * .9, np.maximum(dark * 1.4, sat * 1.6))
    soft = smooth(14, 48, score)
    # flowers are only ever placed on light paper, so a soft matte reads as printing
    alpha = soft
    # un-mix the paper colour from semi-transparent edges
    al = np.clip(alpha, .02, 1)[..., None]
    rgb = np.clip((a - (1 - al) * paper) / al, 0, 255)
    ys, xs = np.where(alpha > .25)
    t, b, l, r = ys.min(), ys.max(), xs.min(), xs.max()
    pad = 6
    sl = (slice(max(0, t - pad), b + pad), slice(max(0, l - pad), r + pad))
    rgba = np.dstack([rgb, alpha * 255])[sl].astype(np.uint8)
    out = Image.fromarray(rgba, 'RGBA')
    if out.height > maxh:
        out = out.resize((round(out.width * maxh / out.height), maxh), Image.LANCZOS)
    p = os.path.join(OUT, f'flower-{name}.webp')
    out.save(p, quality=72, method=4)
    # engraving: luminance-only ink, stronger contrast
    lum = (a[..., 0] * .3 + a[..., 1] * .59 + a[..., 2] * .11)
    ink = smooth(10, 120, bg.mean(-1) - lum) * alpha
    ink = np.clip(ink * 1.15, 0, 1)
    e = Image.fromarray(np.dstack([np.zeros_like(ink), np.zeros_like(ink), np.zeros_like(ink), ink * 255])[sl].astype(np.uint8), 'RGBA')
    if e.height > maxh:
        e = e.resize((round(e.width * maxh / e.height), maxh), Image.LANCZOS)
    pe = os.path.join(OUT, f'eng-{name}.webp')
    e.save(pe, quality=70, method=4)
    print(name, out.size, os.path.getsize(p) // 1024, 'KB', os.path.getsize(pe) // 1024, 'KB')


for name, (src, box, maxh) in PLATES.items():
    if os.path.exists(os.path.join(RAW, src)):
        cut(name, src, box, maxh)
for spec in EXTRA:  # name=file:l,t,r,b
    name, rest = spec.split('=')
    f, b = rest.split(':')
    cut(name, f, tuple(float(x) for x in b.split(',')), 760)
