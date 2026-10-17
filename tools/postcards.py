"""Crops public-domain postcard scans to the printed picture and saves web copies.
Usage: python -I tools/postcards.py name=path/to/scan.jpg[:l,t,r,b] ...
Box values are optional fractions; without them the scan is trimmed to its non-background area.
Writes assets/pc-<name>.jpg (720px wide).
"""
import os, sys
import numpy as np
from PIL import Image

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets')
for arg in sys.argv[1:]:
    name, rest = arg.split('=', 1)
    path, _, box = rest.partition('|')
    im = Image.open(path).convert('RGB')
    w, h = im.size
    if box:
        l, t, r, b = (float(x) for x in box.split(','))
        im = im.crop((int(l * w), int(t * h), int(r * w), int(b * h)))
    else:
        a = np.asarray(im).astype(float)
        corner = np.median(np.concatenate([a[:8, :8].reshape(-1, 3), a[-8:, -8:].reshape(-1, 3)]), axis=0)
        diff = np.abs(a - corner).sum(-1) > 60
        ys, xs = np.where(diff)
        im = im.crop((xs.min() + 4, ys.min() + 4, xs.max() - 4, ys.max() - 4))
    if im.width > 720:
        im = im.resize((720, round(im.height * 720 / im.width)), Image.LANCZOS)
    p = os.path.join(OUT, f'pc-{name}.jpg')
    im.save(p, quality=80, optimize=True)
    print(name, im.size, os.path.getsize(p) // 1024, 'KB')
