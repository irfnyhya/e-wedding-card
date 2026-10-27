"""Side-by-side review sheet of named screenshots: python tools/review.py <out.jpg> <png> [<png> ...] (4 per row)."""
import os, sys
from PIL import Image, ImageDraw

out, files = sys.argv[1], [f for f in sys.argv[2:] if os.path.exists(f)]
W, H, cols = 260, 507, 4
rows = (len(files) + cols - 1) // cols
sh = Image.new('RGB', (W * cols, (H + 18) * rows), (255, 255, 255))
d = ImageDraw.Draw(sh)
for i, f in enumerate(files):
    x, y = (i % cols) * W, (i // cols) * (H + 18)
    d.text((x + 3, y + 3), os.path.basename(f)[:40], fill=(0, 0, 0))
    sh.paste(Image.open(f).convert('RGB').resize((W, H)), (x, y + 18))
sh.save(out, quality=82)
