"""Bakes the texture and wax-seal assets for Sanding into ../assets.
Usage: python -I tools/bake.py
"""
import os
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'assets')
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def tile_noise(n, scales):
    """Tileable fractal noise built from wrapped Gaussian-smoothed white noise (FFT)."""
    acc = np.zeros((n, n))
    fx = np.fft.fftfreq(n)[:, None]
    fy = np.fft.fftfreq(n)[None, :]
    r2 = fx ** 2 + fy ** 2
    for s, amp in scales:
        w = rng.standard_normal((n, n))
        k = np.exp(-r2 * (2 * np.pi * s) ** 2 / 2)
        acc += amp * np.real(np.fft.ifft2(np.fft.fft2(w) * k)) * s
    acc -= acc.min()
    return acc / acc.max()


def shade(h, strength, az=135, el=50):
    gy, gx = np.gradient(h * strength)
    a, e = np.radians(az), np.radians(el)
    L = np.array([np.cos(a) * np.cos(e), np.sin(a) * np.cos(e), np.sin(e)])
    nz = 1 / np.sqrt(gx ** 2 + gy ** 2 + 1)
    return (-gx * nz * L[0] - gy * nz * L[1] + nz * L[2])


def save(img, name, **kw):
    p = os.path.join(OUT, name)
    img.save(p, **kw)
    print(name, os.path.getsize(p) // 1024, 'KB')


# Cotton paper: fibres + fine tooth, near-white, used with mix-blend-mode: multiply.
n = 512
h = tile_noise(n, [(1.2, 1.0), (3, .6), (9, .35)])
fib = np.zeros((n, n))
for _ in range(900):
    x, y = rng.integers(0, n, 2)
    ang = rng.uniform(0, np.pi)
    ln = rng.integers(8, 40)
    for t in range(ln):
        fib[int(y + t * np.sin(ang)) % n, int(x + t * np.cos(ang)) % n] += 1
h = h + .08 * fib
lum = shade(h, 6)
lum = (lum - lum.mean()) / lum.std()
paper = np.clip(245 + lum * 5, 215, 255).astype(np.uint8)
save(Image.fromarray(paper, 'L'), 'paper.jpg', quality=82)

# Woven linen (for velvet/linen grounds), mid-grey for mix-blend-mode: soft-light.
yy, xx = np.mgrid[0:n, 0:n]
weave = (np.sin(xx * 2 * np.pi / 4) * .5 + np.sin(yy * 2 * np.pi / 4) * .5)
weave += 1.4 * tile_noise(n, [(1, 1), (4, .5)])
lin = shade(weave, 3)
lin = (lin - lin.mean()) / lin.std()
save(Image.fromarray(np.clip(128 + lin * 22, 0, 255).astype(np.uint8), 'L'), 'linen.jpg', quality=80)

# Wax seals: irregular blob, poured rim, flat stamped centre. Rendered per colour.
S = 420
yy, xx = (np.mgrid[0:S, 0:S] - S / 2) / (S / 2)
r = np.sqrt(xx ** 2 + yy ** 2)
th = np.arctan2(yy, xx)
edge = .88 + sum(a * np.sin(th * k + ph) for k, a, ph in [(3, .03, .4), (5, .022, 2.1), (7, .02, 4.0), (11, .012, 1.3), (19, .006, 5.2)])
blob = np.clip((edge - r) * 40, 0, 1)
rim = np.exp(-((r - .74) / .07) ** 2) * .55
dome = np.clip(1 - (r / edge) ** 6, 0, 1)
ring = np.exp(-((r - .6) / .012) ** 2) * .18
lumpy = tile_noise(S, [(3, 1), (8, .4)])[:S, :S] * (.004 + .03 * (r > .62))
H = dome * .6 + rim - ring + lumpy
L = shade(H, 90, az=225, el=48)
spec = np.clip(L, 0, 1) ** 24
colours = {'merah': (128, 22, 34), 'emas': (176, 136, 58), 'sage': (122, 140, 110), 'gading': (232, 224, 205), 'biru': (64, 84, 120)}
for name, c in colours.items():
    base = np.array(c, float)
    lit = np.clip(L, 0, 1)[..., None]
    rgb = base * (.42 + .75 * lit) + 255 * spec[..., None] * (.55 if name != 'gading' else .35)
    rgba = np.dstack([np.clip(rgb, 0, 255), blob * 255]).astype(np.uint8)
    save(Image.fromarray(rgba, 'RGBA').resize((280, 280), Image.LANCZOS), f'seal-{name}.webp', quality=88)

# ---- round 2 materials ----
# Gold foil: brushed metallic streaks, grey-ish, used with background-blend-mode: overlay over a foil colour.
n = 384
base = tile_noise(n, [(1.5, 1.0), (4, .6)])
streak = np.zeros((n, n))
for _ in range(220):
    y = rng.integers(0, n); x = rng.integers(0, n); ln = rng.integers(30, 160); a = rng.uniform(.2, 1)
    for t in range(ln):
        streak[(y + t // 6) % n, (x + t) % n] += a
from PIL import ImageFilter
streak = np.asarray(Image.fromarray((np.clip(streak, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(float) / 255
foil = .55 * base + .45 * streak
lumf = shade(foil, 14, az=120, el=40)
lumf = (lumf - lumf.mean()) / lumf.std()
save(Image.fromarray(np.clip(140 + lumf * 38, 0, 255).astype(np.uint8), 'L'), 'foil.jpg', quality=82)

# Silk twill (songket cloth): diagonal weave + sheen, mid-grey for soft-light.
yy, xx = np.mgrid[0:n, 0:n]
tw = np.sin((xx + yy) * 2 * np.pi / 6) * .6 + np.sin((xx - yy) * 2 * np.pi / 12) * .2 + .8 * tile_noise(n, [(2, 1)])
lt = shade(tw, 2.5)
lt = (lt - lt.mean()) / lt.std()
save(Image.fromarray(np.clip(128 + lt * 26, 0, 255).astype(np.uint8), 'L'), 'silk.jpg', quality=80)

# Velvet: soft pile noise, mid-grey for soft-light; sheen comes from CSS gradients.
v = tile_noise(n, [(.8, 1), (2.5, .7), (6, .4)])
lv = shade(v, 3)
lv = (lv - lv.mean()) / lv.std()
save(Image.fromarray(np.clip(128 + lv * 30, 0, 255).astype(np.uint8), 'L'), 'velvet.jpg', quality=80)

# Deckled edge mask (white = paper) for handmade cotton sheets, used with mask-size:100% 100%.
W, H = 600, 900
m = np.zeros((H, W))
yy, xx = np.mgrid[0:H, 0:W]
edge_n = tile_noise(900, [(1.2, 1), (4, .6), (10, .4)])
d = np.minimum.reduce([xx, W - 1 - xx, yy, H - 1 - yy]).astype(float)
jag = 6 + 10 * edge_n[:H, :W]
m = np.clip((d - jag) / 2.5, 0, 1)
save(Image.fromarray((m * 255).astype(np.uint8), 'L'), 'deckle.png', optimize=True)

# ---- round 3 materials ----
# Marble: domain-warped veins, near-white, used with mix-blend-mode multiply over a stone colour.
n = 512
warp = tile_noise(n, [(64, 1), (24, .35), (8, .06)])
warp = (warp - warp.mean()) / warp.std()
yy, xx = np.mgrid[0:n, 0:n]
phase = (xx + yy * .4) * 2 * np.pi * 2 / n + warp * 1.3
phase2 = (xx * .6 - yy) * 2 * np.pi * 1 / n + warp * 1.7
vein = np.exp(-(np.sin(phase) / .06) ** 2) * .45 + np.exp(-(np.sin(phase) / .35) ** 2) * .1 + np.exp(-(np.sin(phase2) / .03) ** 2) * .28
cloud = tile_noise(n, [(30, 1), (8, .4)])
cloud = (cloud - cloud.min()) / (cloud.max() - cloud.min())
fade = tile_noise(n, [(48, 1), (16, .5)])
fade = (fade - fade.min()) / (fade.max() - fade.min())
m = np.clip(1 - vein * (.15 + .6 * fade) - .06 * cloud, 0, 1)
mi = Image.fromarray((m * 255).astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(.9))
save(mi, 'marble.jpg', quality=84)

# Batik crackle: thin wrapped Voronoi cracks, white lines on transparent, for mask use.
n = 384
pts = rng.uniform(0, n, (170, 2))
yy, xx = np.mgrid[0:n, 0:n].astype(float)
d1 = np.full((n, n), 1e9); d2 = np.full((n, n), 1e9)
for px, py in pts:
    dx = np.abs(xx - px); dx = np.minimum(dx, n - dx)
    dy = np.abs(yy - py); dy = np.minimum(dy, n - dy)
    d = np.sqrt(dx * dx + dy * dy)
    d2 = np.where(d < d1, d1, np.minimum(d2, d)); d1 = np.minimum(d1, d)
crack = np.clip(1 - (d2 - d1) / 1.6, 0, 1) * (.5 + .5 * tile_noise(n, [(3, 1)]))
save(Image.fromarray((np.dstack([np.zeros((n, n))] * 3 + [crack * 255])).astype(np.uint8), 'RGBA'), 'crackle.png', optimize=True)

# Marble veins as an alpha mask, for gold-leaf veins over the stone.
va = np.clip(vein * (.3 + .9 * fade) * 1.6, 0, 1)
vi = Image.fromarray((np.dstack([np.zeros_like(va)] * 3 + [va * 255])).astype(np.uint8), 'RGBA').filter(ImageFilter.GaussianBlur(.6))
save(vi, 'veins.png', optimize=True)

# ---- round 4 materials ----
def blob_wash(w, h, field, name):
    """Watercolour wash alpha: soft body, darker pooled edge, pigment granulation."""
    f = (field - field.min()) / (field.max() - field.min())
    body = np.clip((f - .5) * 6, 0, 1)
    edge = np.exp(-((f - .52) / .025) ** 2)
    gran = tile_noise(max(w, h), [(1, 1), (2.5, .5)])[:h, :w]
    a = np.clip(body * (.42 + .25 * gran) + edge * .5, 0, 1)
    img = Image.fromarray((np.dstack([np.zeros((h, w))] * 3 + [a * 255])).astype(np.uint8), 'RGBA').filter(ImageFilter.GaussianBlur(.8))
    save(img, name, optimize=True)

W, H = 600, 900
yy, xx = np.mgrid[0:H, 0:W] / np.array([H, W])[:, None, None] if False else np.mgrid[0:H, 0:W]
nz = tile_noise(900, [(40, 1), (14, .5), (5, .2)])[:H, :W]
nz = (nz - nz.mean()) / nz.std()
corner = 1.2 - np.sqrt((xx / W - 1.05) ** 2 + (yy / H + .02) ** 2) * 2.2 + nz * .16
blob_wash(W, H, corner, 'wash-corner.png')
band = (yy / H) * 2.4 - 1.55 + nz * .13 + .05 * np.sin(xx / W * 9)
blob_wash(W, H, band, 'wash-band.png')

# Torn paper strip: irregular top edge with a soft fibrous lip, for stacking coloured layers.
W, H = 900, 260
edge_y = 60 + 26 * tile_noise(900, [(30, 1), (8, .5), (2, .25)])[0, :W] * 2 - 26
edge_y = edge_y - edge_y.mean() + 60
yy, xx = np.mgrid[0:H, 0:W]
d = yy - edge_y[None, :]
fib = tile_noise(900, [(1, 1)])[:H, :W]
a = np.clip(d / 3 + .5, 0, 1)
lip = np.clip(1 - np.abs(d + 4) / 7, 0, 1) * (fib > .55)
a = np.maximum(a, lip * .7)
save(Image.fromarray((np.dstack([np.zeros((H, W))] * 3 + [a * 255])).astype(np.uint8), 'RGBA'), 'torn.png', optimize=True)
