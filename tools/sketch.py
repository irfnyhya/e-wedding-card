"""Turns postcard photos into pen-and-ink sketches (XDoG edges) saved as alpha masks.
Usage: python -I tools/sketch.py name ...   (reads assets/pc-<name>.jpg, writes assets/sk-<name>.webp)
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter, ImageOps

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets')
for name in sys.argv[1:]:
    im = Image.open(os.path.join(OUT, f'pc-{name}.jpg')).convert('L')
    im = ImageOps.autocontrast(im, cutoff=2)
    if im.width > 900:
        im = im.resize((900, round(im.height * 900 / im.width)), Image.LANCZOS)
    g1 = np.asarray(im.filter(ImageFilter.GaussianBlur(1.1))).astype(float) / 255
    g2 = np.asarray(im.filter(ImageFilter.GaussianBlur(1.8))).astype(float) / 255
    d = g1 - .985 * g2
    eps, phi = -.004, 120
    e = np.where(d > eps, 1.0, 1 + np.tanh(phi * (d - eps)))
    ink = np.clip(1 - e, 0, 1)
    # light hatching in the darkest areas so masses read as shading, not empty outlines
    dark = np.clip((.38 - g2) / .38, 0, 1)
    yy, xx = np.mgrid[0:ink.shape[0], 0:ink.shape[1]]
    hatch = ((xx + yy) % 5 == 0) * dark * .7
    a = np.clip(np.maximum(ink * 1.1, hatch), 0, 1)
    # fade the edges like a vignette sketch
    h, w = a.shape
    fy = np.clip(np.minimum(yy, h - 1 - yy) / (h * .12), 0, 1)
    fx = np.clip(np.minimum(xx, w - 1 - xx) / (w * .1), 0, 1)
    a = a * np.minimum(fx, fy)
    out = Image.fromarray((np.dstack([np.zeros_like(a)] * 3 + [a * 255])).astype(np.uint8), 'RGBA')
    p = os.path.join(OUT, f'sk-{name}.webp')
    out.save(p, quality=72, method=4)
    print(name, out.size, os.path.getsize(p) // 1024, 'KB')
