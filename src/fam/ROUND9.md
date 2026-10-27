# Round 9: 30 new families from Pinterest

The owner wants 30 more designs, "beautiful only". Read `REDESIGN.md` and `README.md` in this folder, and study the approved families `warkah`, `kolam`, `lukisan`, `satin`, `renda2`, `lengkung`, `tulle`, `timbul`, `tasik` and `lili` (src/fam/<key>.js/.css). They are the bar.

## References

Pinterest reference sheets with numbered pins are in `references/pinterest2/sheet01.jpg` … `sheet11.jpg`; older ones are in `references/pinterest/`. Read them with the Read tool. Use them only for mood, palette, composition and material. Never trace or copy a specific card's layout, artwork, illustration or wording, and never draw people or faces (silhouettes are fine but avoid them).

Pin numbers by sheet, roughly:
- sheet01: pins 0–39
- sheet02: pins 60–99
- sheet03: pins 70–109
- sheet04: pins 110–139
- sheet05: pins 140–179
- sheet06: pins 180–209
- sheet07: pins 210–249
- sheet08: pins 250–279
- sheet09: pins 280–319
- sheet10: pins 320–349
- sheet11: pins 350–385

## Per family

- New files `src/fam/<key>.js` and `.css`, a NEW key, 8 colourways with Malay names (`k` lowercase a–z), `name` short and Malay where natural.
- **Class names:** pick a class prefix of 3–4 letters that no other family uses, then check with `grep -rn "\.inv \.<prefix>-" src/` that it's free. A shared prefix once disabled a card's open button.
- **Art:** only files in `assets/` (see `assets/CREDITS.md`): pd-* paintings, frames, textiles, illumination and objects; flower-* and eng-* cut-outs; textures; seals. Plus your own SVG and CSS. Flower cut-outs have a faint white halo, so use them only over light paper or with `mix-blend-mode:multiply`.
- **Cover:** one focal object, calm space, refined type (at most 2 faces, plus Amiri or Aref Ruqaa for Arabic/Jawi), and a `Buka Jemputan` / `Open invitation` pill or the object itself as the button.
- **Opening:** one elegant move of 1–1.6 s.
- **Front page:** a composition, with class `kicker` on the event-title `p` right above the names.
- **Skin:** calm, no boxed `.info` grid, pill buttons, readable dock, inputs and buttons on dark grounds.
- **Server safety:** no `document`, `window` or `Image` at load time, because the engine runs on the server. Do DOM work only in `skin()`. Use `position:fixed` only on `.scroller` pseudo-elements.

## Test

Your letter is `<L>`.
```sh
FAMS="k1 k2 k3 k4 k5" sh tools/build.sh qa-<L>.html
node tools/audit.mjs qa-<L>.html 8767 qa/<L> <id>:cover <id>:open <id>:when <id>:rsvp ...
```
Read every screenshot. For each family, check a light and a dark colourway (cover, open, when, rsvp) and every colourway's cover once. Iterate until each is genuinely beautiful next to the Pinterest sheets.

**Tap test.** Open `http://127.0.0.1:8767/qa-<L>.html?qa=<id>&at=cover` with headless Edge, or adapt tools/audit.mjs, and confirm that `document.elementFromPoint` at the centre of `#inv-root [data-open]` returns that element or a child of it.

**Server test.** Run `sh tools/build.sh && cd sanding-app && npm run port:prototype && node -e "import('./src/lib/invite/engine.js').then(m=>console.log(m.THEMES.filter(t=>[<your keys quoted>].includes(t.fam)).length))"`. It must print 40. This regenerates shared files, which is fine; don't commit them.

## Rules

Only write your own family files, `qa-<L>.html` and `qa/<L>/`. Never commit or push.

When you're done, report:
- each family's concept
- the art it uses
- issues left
- the paths of the final cover/open screenshots
