# Round 10: redo the 30 round-9 families so a designer could have made them

The owner looked at the 30 families from round 9 (see `qa/new-30.jpg`, and ROUND9.md for how they were made) and said they still look AI-generated: not detailed enough, not designed. You are redoing five of them. Read `REDESIGN.md` and `README.md` first; this brief overrides them where they differ.

## Why they read as generated (fix all of these)

1. **One skeleton for all 30.** Almost every cover is the same thing: a cream rectangle centred on a background, "MAJLIS PERKAHWINAN" in tiny caps, two script names stacked with "&", a tiny date, then "DENGAN HORMATNYA KEPADA / Pak Long Hashim" and a pill at the bottom. Swap the background and it's the same card. A designer starts from the *object* and its construction, not from a panel template.
2. **Too thin, too small, too empty.** Hairline frames, 9px caps, tiny dates and a lot of blank cream inside the panel. It reads like a wireframe. Real printed stationery has confident type sizes, a clear hierarchy (names big, a date that is a design element in itself), and the space is *designed*, not left over.
3. **Flat vector illustration.** The SVG palace, glasshouse, swans, palm trees, lanterns and stained glass look like clip art: even strokes, flat fills, no light. Inline SVG is for fine ornament only. Heroes must be real art from `assets/` or a convincingly lit physical object (paper, foil, vellum, velvet, wax, ribbon, lace, pearls, pressed flowers) with real shadows and overlap.
4. **No craft detail.** Nothing shows how the card was made. Add the details that printed cards have, chosen to fit the concept, e.g.:
   - deckled or torn edges (`deckle.png`, `torn.png`), visible paper grain (`paper.jpg`), letterpress impression (inset shadow on type), blind emboss, foil with a moving sheen (`foil.jpg` + gradient), edge painting in a colour, vellum/tracing overlay with something showing through, belly band, ribbon tie or silk ribbon (`pd-obj-ribbon.webp`), wax seal (`seal-*.webp`), pressed flower (`pd-obj-pressed-flower.webp`), pearls, doily/lace (`pd-obj-doily.webp`, `pd-obj-lace-oval.webp`), a gilt key, a corner mount, a tag on string, a pocket fold, a layered stack of two or three cards slightly offset, a monogram roundel, a printed rule with a centre ornament, a small engraved border, a dated postmark.
   - Ornament with real drawing: corner flourishes, fine engraved borders, lettered monograms, illumination (`pd-illum-*`), textiles (`pd-textile-*`).
5. **The guest line and button are bolted on.** "DENGAN HORMATNYA KEPADA" + pill sits under every card the same way. Make it part of the object: written on the envelope, on a hanging tag, on the belly band, on a place card, on the pocket. The button can be the seal, the ribbon, the tab, or a pill that belongs to the composition. The label stays exactly `Buka Jemputan` / `Open invitation` wherever visible text is used.
6. **Same typeface feel everywhere.** Pick type per concept: a high-contrast Didone for the luxury set, an engraved roman or a copperplate for the classical ones, a calligraphic script with real swashes, a refined grotesk for the modern one. Names can be very large. Use numerals as ornament (a big "19" or "19·12"). Keep to two families plus Amiri/Aref Ruqaa when Arabic/Jawi is used.

## What to make instead

For each of your five families:
- Keep the **same key** and the **same 8 colourway keys** (`themes[].k`): these designs went live yesterday and customers may already use them. You may rename a colourway's display name, the family `name`, `meaning` and `blurb`. Keep your existing class prefix (it's unique); if you add new classes, keep the prefix.
- Rethink the concept so it is a **specific physical piece**, not a panel on a background. Before writing code, write one paragraph (in your final report) describing the object as a stationer would: paper, size, print method, finishes, what lies around it, what the guest touches to open it.
- Look again at the Pinterest sheets in `references/pinterest2/` and `references/pinterest/` (mood, materials and construction only; never copy a card's layout, artwork or wording). Look at what the best pins do with layering, detail and type.
- The **five covers in your set must look clearly different from each other** in construction and layout (not just colour). Not every cover should be centred and portrait-panel shaped: use full-bleed, off-centre, a tilted stack, a tall narrow card, an arch, a folded card, an envelope, a box lid, a framed painting.
- The **opening** is one elegant physical move of 1–1.6 s that follows from the object (band slides off, vellum lifts, seal breaks and the flap opens, the stack fans, the lid lifts).
- The **front page** after opening continues the object (a flat-lay of the pieces, the inside of the fold, the card out of the envelope) and must also be detailed. `kicker` class on the event-title `p`, as before.
- The **skin** (section pages) gets the same craft: textured paper, a real heading treatment (e.g. small ornament + spaced caps, or a script with a rule), detail in dividers, and readable inputs and buttons. No boxed `.info` grids.
- Check at full size: zoom in on your screenshots. Every edge, shadow, rule and ornament should hold up at 2×. Nothing clipped, overlapping, unreadable or low-contrast; nothing left on top after opening.

## Hard rules (unchanged)

- Only files in `assets/` plus your own SVG/CSS. Flower cut-outs (`flower-*`, `eng-*`) have a white halo: light grounds only, or `mix-blend-mode:multiply`.
- No people or faces. Muslim-appropriate: no alcohol, no church imagery, no readable Qur'anic text as decoration.
- No `document`, `window` or `Image` at load time; DOM work only in `skin()`. `position:fixed` only on `.scroller` pseudo-elements.
- Never edit shared files, other families, assets or tools. Never commit or push.

## Test

Your letter is `<L>`.
```sh
FAMS="k1 k2 k3 k4 k5" sh tools/build.sh qa-<L>.html
node tools/audit.mjs qa-<L>.html 8767 qa/<L>2 <id>:cover <id>:open <id>:when <id>:rsvp <id>:scroll ...
```
The static server is already running on port 8767; don't start another. Read every screenshot. For each family check a light and a dark colourway (cover, open, when, rsvp, scroll) and every colourway's cover once. Put your five covers side by side (`python tools/review.py qa/<L>2/side.jpg <pngs>`) and compare them with each other and with the Pinterest sheets; iterate until each is clearly richer than its round-9 version.

**Tap test:** `document.elementFromPoint` at the centre of `#inv-root [data-open]` must return that element or a child (see ROUND9.md).

**Server test:** `sh tools/build.sh && cd sanding-app && npm run port:prototype && node -e "import('./src/lib/invite/engine.js').then(m=>console.log(m.THEMES.filter(t=>[<your keys quoted>].includes(t.fam)).length))"` must print 40. Don't commit the regenerated files.

## Report

For each family: the stationer's paragraph, what changed from round 9, the art used, issues left, and paths to the final cover and open screenshots plus your side-by-side sheet.
