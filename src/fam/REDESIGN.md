# Redesign brief (round 7): make every design look made by a good graphic designer

Read `README.md` in this folder first for the FAMILY() contract, data, helpers and rules. This brief overrides it where they differ.

The owner looked at the live site next to two Malaysian competitors and said our cards "look AI-generated, not smooth". Three pilot families fixed that and the owner approved them. They are the standard. Study them before you write anything:

- `warkah.js/.css` (Mohor Emas): a linen envelope with a lace-edged flap and a real wax-seal image, lying on satin, Redouté roses tucked *behind* it. The front page is a stationery flat-lay: letter, lace label, gilt RSVP oval and a linen location tag, each one a link to its section.
- `kolam.js/.css` (Kolam): Monet's *Water Lilies* full-bleed, a paper envelope standing open on it, and a lace doily card (SVG with evenodd eyelets) that rises out.
- `lukisan.js/.css` (Bingkai Emas): a photographed carved gilt frame (Met Museum, public domain) over a dark Jan van Huysum flower painting, names in foil script on velvet inside the oval. The opening moves into the frame.

## What the competitors do (reference only, never copy a layout, motif arrangement or artwork)

- jemputan.me: a plain envelope, a card that slides up, then a fixed arch frame with painted watercolour florals and the content scrolling inside it; an icon dock at the bottom.
- @customloveletter (TikTok): photographic stationery flat-lays. Velvet or linen envelopes, wax seals, lace doilies, silver and gilt baroque frames, dense real florals, oil-painting backgrounds, layered pieces that each say "Tekan sini / RSVP / Butiran Majlis / Lokasi".

What makes theirs read as designed, and ours as generated:

1. **Real material, not drawn shapes.** Paintings, photographed frames, seals, lace, paper and linen textures, with real drop shadows and overlap. Flat CSS shapes, flat gradients, thick even outlines and clip-art icons read as AI. Inline SVG is still right for fine ornament (lace eyelets, scallops, hairline borders, cutwork), but the *hero* of every cover should be real art or a convincingly lit physical object.
2. **One focal object, everything else quiet.** One envelope, frame, box or panel; text small and well set; lots of breathing room. No busy backgrounds behind small text.
3. **Typography like printed stationery.** Small spaced caps for the kicker, a script or a beautiful serif for the names, the date in spaced caps, the venue in italic. At most 2 typefaces per family (plus Amiri/Aref Ruqaa for Arabic or Jawi). No bold sans, no all-caps names in a heavy face, no emoji.
4. **One clear way in.** The cover has either the object itself as the button, or a pill/ghost button labelled exactly `Buka Jemputan` (`Open invitation` in English). Never "Sentuh X untuk …-nya".
5. **One elegant move** of 1.0–1.6 s (flap lifts, card slides out, doors part, curtain lifts, step into the frame, petals part). No bouncing, spinning, shaking or confetti. At most one very slow ambient motion (a painting drifting, a seal glowing).
6. **Composed front page.** It is the first screen after opening. Make it a composition (a flat-lay of pieces, a framed panel, an arch), not centred text on a colour. The `<p>` holding the event title (`ev(o,L)`) right above the names must have class `kicker` (the couple photo is inserted before it when the couple uploads one). Optional: tiles with `data-go="when|rsvp|loc"` handled in `skin()` like warkah does.
7. **Calm section cards (skin).** Cards on the family's ground with paper/velvet/linen texture, a refined heading (script or spaced serif caps), and *no boxed grids*: override `.info` and its children to drop borders/backgrounds and use one hairline between rows (see the `.fam-warkah .info` rules). Rounded pill buttons for `.ibtn`. Check text contrast on dark grounds, including inputs, the selected `Hadir` segment and the submit button (see `.fam-lukisan`).
8. **Wording.** Keep the formal Malay invitation text the engine provides. Anything you write yourself is short, warm, natural Malay as a Malaysian would say it (and simple English for `en`). No literal translations, no "-nya" constructions that sound machine-made.

## Assets

Only use files in `assets/`. Besides the textures, seals, flower cut-outs and engravings listed in README.md there are public-domain paintings, frames, textiles, illumination and objects named `pd-*` (see `assets/CREDITS.md` and the contact sheet `qa/pd-library.jpg`). You may crop/position them with CSS (`background-position`, `object-position`, masks). Don't add new image files; ask in your final report if you need one.

Flower cut-outs (`flower-*.webp`) have a faint white paper halo: only place them over light grounds or tuck them *under* an object; never over dark areas.

## Old families (defined in the big shared files, not in src/fam)

To redesign one, create `src/fam/<samekey>.js/.css` and call `FAMILY({key:'<samekey>', …})`. It replaces the old family. **You must keep exactly the same colourway keys** (`themes[].k`) as the old family, because live customer cards store ids like `sampul-merah`. Find the old ids with `grep -o "'<key>-[a-z0-9]*'" src/*.js` or by looking for the family's theme list. The old family's CSS still loads; use new class names for cover and page (`cv-<key>2`, `pg-<key>2`) and override any old `.fam-<key>` skin rule that conflicts.

## Testing (do it; look at every screenshot with the Read tool)

A static server runs on port 8767. Build a page with just your families, then shoot it with headless Edge:

```sh
FAMS="key1 key2" sh tools/build.sh qa-<you>.html
node tools/audit.mjs qa-<you>.html 8767 qa/<you> key1-<theme>:cover key1-<theme>:open key1-<theme>:when key1-<theme>:rsvp key1-<theme>:scroll
```

(For an old family you replace, build with `FAMS` too; the old one is still in the page and yours replaces it.) Check at least one light and one dark colourway, cover/open/when/rsvp, and the covers of all colourways once. Fix anything clipped, overlapping, unreadable, plain, or left on top of the page after opening. The build must print `built OK`.

## Files

Write only `src/fam/<key>.js` and `src/fam/<key>.css` for the families you were given (and your own `qa-<you>.html` / `qa/<you>/`). Never edit shared files, other families, assets or tools. Do not commit or push.
