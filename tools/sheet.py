"""Contact sheets for tools/audit.sh: each family's cover and opened page side by side, 6 families per sheet.
usage: python tools/sheet.py <dir>"""
import os, sys
from PIL import Image, ImageDraw

d = sys.argv[1]
fams = []
for line in open('qa/fams.txt', encoding='utf8'):
    if line.strip():
        fams.append(line.split()[0])
W, H, cols = 195, 380, 3
for s in range(0, len(fams), 6):
    batch = fams[s:s + 6]
    sh = Image.new('RGB', (W * 2 * cols + (cols - 1) * 10, (H + 22) * 2), (255, 255, 255))
    dr = ImageDraw.Draw(sh)
    for i, f in enumerate(batch):
        x, y = (i % cols) * (W * 2 + 10), (i // cols) * (H + 22)
        dr.text((x + 4, y + 4), f, fill=(0, 0, 0))
        for j, at in enumerate(('cover', 'open')):
            p = os.path.join(d, f'{f}-{at}.png')
            if os.path.exists(p):
                im = Image.open(p).convert('RGB').resize((W, H))
                sh.paste(im, (x + j * W, y + 22))
    sh.save(os.path.join(d, f'sheet{s // 6:02d}.jpg'), quality=82)
print('sheets', (len(fams) + 5) // 6)
