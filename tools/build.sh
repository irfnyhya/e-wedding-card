#!/bin/sh
# Assembles sanding.html from src/ parts, then syntax-checks the scripts.
cd "$(dirname "$0")/../src" || exit 1
cat 1-head.html 2a-home.html 2b-views.html 3s-inv.html 3t-inv2.html 3u-inv3.html 3v-inv4.html 3w-inv5.html 3x-skins.html 3y-openers.html 3z-features.html 3a-core.js 3b-designs.js 3c-copy.js 3d-render.js 3e-families2.js 3f-families3.js 3g-families4.js 3i-families5.js 3j-skins.js 3m-features.js 4-app.js > ../sanding.html
python -I -c "
import re
s=open('../sanding.html',encoding='utf8').read()
open('../.check.js','w',encoding='utf8').write('\n'.join(re.findall(r'<script>(.*?)</script>',s,re.S)))"
node --check ../.check.js && rm ../.check.js && echo "built OK"
