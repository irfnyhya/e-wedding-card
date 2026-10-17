# Building a new design family

Sanding is a digital wedding-card (kad kahwin) platform for Malaysian couples. A **family** is one design idea with its own:

- **cover/opener**: what guests see first, and how it opens when they tap it;
- **front page**: the first screen after it opens;
- **skin**: how every section below looks as guests scroll (date and venue, countdown, programme, RSVP form, wishes, gifts, contacts);
- **8 colourways**.

The owner has rejected work three times for being "too simple", "AI-generated looking" and "too animated and cheap". **Read the quality bar twice.**

## Files: you write only these

- `src/fam/<key>.js`
- `src/fam/<key>.css`

Never edit anything else. Other people are writing other families at the same time.

`src/fam/wau.js` and `src/fam/wau.css` are a complete worked example. Copy their structure.

These are the newest and best designs in the old code; study them for the level of detail expected:

- `cv-kal2` (girih panels + lamp + star seal), `cv-gate3` / `pg-gate3` (fine-line foil gate), `cv-jub3` (zellige rosette medallion) and `pg-label2` (apothecary label board), in `src/3j-skins.js` and `src/3y-openers.html`.

## Contract

Each `.js` file runs inside its own `(()=>{ ... })()`. Your top-level consts are private, so never use `window.`. Register with one call:

```js
FAMILY({key, name, meaning, blurb, fonts:{d,s,b}, ms, page(o,th,L){}, cover(o,th,L,guest,tag,attr){}, skin(el,o,th,L,mode){}, themes:[...8]})
```

- **`key`** is lowercase a–z only and is also the file name.
- **`name`** is short, Malay where natural; **`meaning`** is 2–3 English words; **`blurb`** is one sentence describing what guests see.
- **`fonts`** holds CSS font-family strings: d = display caps, s = script/names, b = body.
  - Already loaded: Cormorant Garamond, Jost, Pinyon Script, Marcellus, IM Fell English (+SC), Amiri, Aref Ruqaa, Bodoni Moda, Poiret One, IBM Plex Mono, Homemade Apple, Special Elite, Cinzel, Abril Fatface, Bangers, Old Standard TT, UnifrakturMaguntia.
  - Need another Google Font? Call `needFont('Family+Name:wght@400;700')` at the top of your file.
- **`ms`** is when the page is revealed after the tap, 1000–1600.
- **`page(o,th,L)`** returns `<section class="page pg-<key>">…</section>`. It is the front page, a full first screen.
- **`cover(o,th,L,guest,tag,attr)`** returns `<div class="cover cv-<key>">…</div>`.
  - Exactly ONE element must be `<${tag} class="…" ${attr}>…</${tag}>`. That is the thing guests tap to open.
  - `tag` is `button` live and `span` in thumbnails.
- **`guest`** may be '' (empty); show it with `L.dear` (e.g. "Dengan hormatnya kepada" + name) when present.
- **Data you can use:**
  - `o.brideShort`, `o.groomShort`; or use `coverNames(o)` → `[n1, n2]` in the right order.
  - `o.date` (ISO); `fmtDate(o.date, o.lang)`, `fmtShort(o.date)`.
  - `o.start`, `o.end`; `fmtTime(o.start, o.lang)`.
  - `o.venue`, `o.address`, `o.hosts`, `o.hijri`, `o.jawi` (optional Jawi initials).
  - `ev(o, L)` gives "Walimatul Urus" / "The Wedding of".
  - `o.lang` is 'ms' or 'en'. Write any extra words for both, e.g. `en ? 'Open' : 'Buka'`.
  - **Always pass user text through `esc()`.**
- **Each theme in `themes`:** `{k:'merah', n:'Merah', desc:'Short description', c:{...}}`.
  - `c` needs: `ground` (outer/background), `sheet` (paper), `ink` (body text on sheet), `accent` (names, main colour), `gold` (metal/second colour).
  - `c` also needs `pagefg` (text colour on `ground`); it must contrast with `ground`.
  - `cover` is optional: the swatch dot, defaulting to accent.
  - You may add extra keys and read them as `th.c.<key>`.
  - Give the 8 colourways real variety (light and dark, warm and cool) and Malay names (merah, marun, zamrud, nila, gading, hitam, jambu, sage, emas, terakota, biru, ungu, krim, pic, kunyit, lumut, laut, senja…).
- **`skin(el,o,th,L,mode)`** runs after render. Use it to add classes, CSS variables or small decorations to the sections.
  - `K.cards(el)` turns every section into a separate card on the ground.
  - The section structure is `.sheet > section.sec[data-s=intro|when|count|sched|gallery|doa|rsvp|wishes|gift|wishlist|contact]`.
  - Each section has an `h2` heading.
  - Inside are `.info` (grid of `div > span + b`), `.ibtns > .ibtn`, `.count > div > b + span`, `ul.timeline > li > b + span`, forms (`input`, `select`, `textarea`, `.seg button`, `button.submit`), `.wish`, `.giftcard`, `.contact`, `.wl-item`, `.att`, `.epass`.
  - There is a sticky bottom `nav.dock`.
- **Available helpers:**
  - `$`, `$$`, `esc`, `NS` (the svg xmlns attribute string), `svgUriSq(svgString)` / `K.uri` (svg → `url('data:…')`, safe inside style="").
  - `K.ring(n, r, cx, cy)`, `K.star(points, R, r, cx, cy)` (path d), `K.scallop(n, R, depth, cx, cy)` (path d).
  - `K.initials(o)`, `rng(seed)`.
  - `ENG(name, style, cls)` gives an engraved flower `<i>` used as a mask (set its background colour; for gold foil use `background:url(assets/foil.jpg) 0 0/220px,var(--gold);background-blend-mode:overlay`). `FL(name, style)` gives a colour flower cut-out `<img>`.
- **Assets** (in `assets/`), the only images allowed:
  - `paper.jpg`, `linen.jpg`, `silk.jpg`, `velvet.jpg`, `marble.jpg`, `foil.jpg`, `crackle.png`, `deckle.png`, `torn.png`, `veins.png`, `wash-band.png`, `wash-corner.png`;
  - `seal-{merah,emas,biru,gading,sage}.webp`;
  - engravings `eng-<n>.webp` and colour flowers `flower-<n>.webp`, where n is one of anemones, blush-rose, cabbage-rose, forget-me-not, hibiscus, iris, jasmine, lotus, pink-rose, red-rose, white-roses, wild-rose;
  - `eng-frame-{a,b,c}.webp`;
  - `map-{carta,straits,hindia}.jpg`;
  - postcards `pc-*.jpg`, sketches `sk-*.webp`.
  - Everything else is drawn by you in inline SVG/CSS, procedurally. No external images, and no emoji as decoration.
- **CSS rules:**
  - Every selector starts with `.inv .<key>-…`, `.inv .cv-<key>`, `.inv .pg-<key>` or `.fam-<key> …` (the skin).
  - Never style bare tags globally.
  - Colours come only from the theme vars: `var(--ground)`, `--sheet`, `--ink`, `--accent`, `--gold`, `--pagefg`, plus your extras.
  - The card is a container: use `cqi` for sizes that scale with width. Design for 360–430 px wide phones; test at 390×760.
  - `.inv.opening` is added on tap and `.inv.opened` after `ms`. The cover must end fully transparent or moved away, so nothing of it stays on top of the page.
  - Add a `prefers-reduced-motion` block.

## Quality bar (this is what the owner judges)

1. **Rich and layered, not a box with text.** Every cover needs:
   - a real object or scene with depth (layers, borders inside borders, ornament, texture via paper/linen/foil, shadow);
   - fine detail drawn in SVG (thin strokes 0.6–1.5 px, repeated motifs, rosettes, scallops, cutwork, patterns);
   - clear typographic hierarchy: small spaced caps, script names, a date/venue detail.
   The front page must be just as composed, not centred text on a flat colour.
2. **Looks like premium stationery, not clip-art.** Avoid thick flat cartoon shapes, default rounded rectangles, or big plain circles. Use real metallic gradients or foil, layered paper and fine linework.
3. **Restrained motion.** The opening is one elegant move of 0.9–1.5 s (slide, part, lift, unfold, rotate a little, fade).
   - No bouncing, no shaking, no constant spinning.
   - At most one very subtle ambient motion on the cover (e.g. a slow sway or glow).
4. **Distinct.** It must not look or open like any existing family: envelope, mosque doors, vellum, tissue, songket, boarding pass, herbarium, typography, art-deco lift, velvet box, frame, postcard, batik, shutters, polaroid, hongbao, marble, calligraphy, lace, torn paper, watercolour, map, stained glass, newspaper, vinyl, book, cross-stitch, tiles, cinema ticket, scroll, iron gate, sketch, telegram, matchbox, woven mat, embroidery wreath, label, kite.
   The skin must also differ from the others: its own section frames, heading treatment and dividers.
5. **Legible.** Text contrast must be good on every colourway, and names must fit on two lines at 390 px.
6. **Respectful.** The audience is Malay Muslim. No alcohol, no gambling or occult imagery, no human faces (silhouettes are fine), no religious symbols of other faiths.

## How to test (do it; look at every screenshot)

The preview server is already running on :8766. Build your own test page with only your families (use your agent letter):

```sh
FAMS="key1 key2" sh tools/build.sh qa-<letter>.html
```

Then screenshot each state with PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File tools/shot.ps1 -Page qa-<letter>.html -Id <key>-<k> -At cover -Out qa/<key>-cover.png
```

- **`-At` values:** `cover`, `open` (front page after opening), and section names such as `when`, `rsvp` or `gift` for the skin.
- **Use the Read tool on each png to look at it.** Check:
  - the cover, open and when/rsvp states for 2 colourways (one light, one dark);
  - all 8 colourways' covers at least once.
- **Fix anything that is:** clipped, overlapping, unreadable, plain, or leaving cover parts on top of the opened page.
- **Iterate** until it meets the quality bar.
- **The build runs `node --check`;** it must say `built OK`.
- **Do not open the in-app browser pane.**
