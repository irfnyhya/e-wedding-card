#!/bin/sh
# Assembles sanding.html from src/ parts, then syntax-checks the scripts.
#   sh tools/build.sh                     -> sanding.html with every family
#   FAMS="wau sireh" sh tools/build.sh qa-a.html
#                                         -> qa-a.html with only those new families (for testing)
cd "$(dirname "$0")/../src" || exit 1
OUT="../${1:-sanding.html}"
TMP="../.build-$$"
mkdir -p "$TMP"

# new families: src/fam/<key>.js + src/fam/<key>.css, each script wrapped so one bad family can't stop the page
if [ -n "$FAMS" ]; then LIST="$FAMS"; else LIST=$(ls fam/*.js 2>/dev/null | sed 's#fam/##; s#\.js$##' | grep -v '^_'); fi
{ echo "<style>"; for k in $LIST; do [ -f "fam/$k.css" ] && cat "fam/$k.css"; done; echo "</style>"; } > "$TMP/fam.css.html"
{ echo "<script>"; cat fam/_kit.js
  for k in $LIST; do
    [ -f "fam/$k.js" ] || { echo "missing fam/$k.js" >&2; continue; }
    printf '\n/* ===== family: %s ===== */\ntry{(()=>{\n' "$k"; cat "fam/$k.js"; printf '\n})()}catch(e){console.error("family %s failed",e)}\n' "$k"
  done
  cat fam/_end.js; echo "</script>"; } > "$TMP/fam.js.html"

cat 1-head.html 2a-home.html 2b-views.html 3s-inv.html 3t-inv2.html 3u-inv3.html 3v-inv4.html 3w-inv5.html 3x-skins.html 3y-openers.html 3z-features.html "$TMP/fam.css.html" 3a-core.js 3b-designs.js 3c-copy.js 3d-render.js 3e-families2.js 3f-families3.js 3g-families4.js 3i-families5.js 3j-skins.js 3m-features.js "$TMP/fam.js.html" 4-app.js > "$OUT"
python -I -c "
import re,sys
s=open(sys.argv[1],encoding='utf8').read()
open(sys.argv[2],'w',encoding='utf8').write('\n'.join(re.findall(r'<script>(.*?)</script>',s,re.S)))" "$OUT" "$TMP/check.js"
if node --check "$TMP/check.js"; then rm -rf "$TMP"; echo "built OK -> ${OUT#../}"; else rm -rf "$TMP"; exit 1; fi
