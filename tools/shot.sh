#!/bin/sh
# Screenshot one card at phone size with headless Edge (needs the preview server on :8766).
#   sh tools/shot.sh <page.html> <template-id> <at> <out.png>
#   at = cover | open | intro | when | count | sched | rsvp | wishes | gift | contact
PAGE="$1"; ID="$2"; AT="${3:-cover}"; OUT="$4"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
OUTW=$(cygpath -w "$OUT" 2>/dev/null || echo "$OUT")
PROF=$(mktemp -d)
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --mute-audio --no-first-run --user-data-dir="$(cygpath -w "$PROF" 2>/dev/null || echo "$PROF")" \
  --window-size=390,760 --virtual-time-budget=9000 --screenshot="$OUTW" \
  "http://localhost:8766/$PAGE?qa=$ID&at=$AT" >/dev/null 2>&1
rm -rf "$PROF"
[ -f "$OUT" ] && echo "saved $OUT" || echo "no screenshot"
