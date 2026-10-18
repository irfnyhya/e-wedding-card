// Re-ports the single-file prototype's design system into the app.
//   node scripts/port-prototype.mjs [path-to-prototype]   (default: ..)
// Follows the prototype's tools/build.sh order and regenerates:
//   src/lib/invite/engine.js  - every src/3*.js part plus src/fam/* families, as one ES module, with the app's fixes applied
//   src/app/globals.css       - 1-head.html site CSS + every src/3*.html invitation sheet + the app's own additions
//   src/app/fonts.ts          - the Google Fonts links from 1-head.html
//   public/assets/            - textures, seals, flowers, postcards, maps
// Each fix must match exactly once (or the stated count), so a prototype change that breaks one fails loudly.
import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const proto = resolve(process.argv[2] || '..');
const app = resolve(import.meta.dirname, '..');
const read = (p) => readFileSync(p, 'utf8');
const order = read(join(proto, 'tools/build.sh')).match(/^cat (1-head\.html .+?) >/m)[1].split(/\s+/).map((f) => f.replace(/^"|"$/g, ''));
const srcFile = (f) => read(join(proto, 'src', f));

// ---- self-contained families (src/fam/<key>.js + .css), bundled the way build.sh does
const famDir = join(proto, 'src/fam');
const famKeys = existsSync(famDir) ? readdirSync(famDir).filter((f) => f.endsWith('.js') && !f.startsWith('_')).map((f) => f.slice(0, -3)).sort() : [];
const famRead = (f) => read(join(famDir, f));
function famEnd() {
  // _end.js: keep the THEME/CATS refresh. Drop the parts that touch document/location at load time (they break SSR):
  // the needFont <link> (fonts.ts loads those), the live counts in marketing copy (pages read counts from the engine)
  // and the ?qa= screenshot hook.
  let e = famRead('_end.js');
  const cut = e.indexOf('/* live counts');
  if (cut < 0) throw new Error('_end.js: "/* live counts" marker not found');
  e = e.slice(0, cut);
  const fontLine = /^if\(FAM_FONTS\.size\)\{.*$/m;
  if (!fontLine.test(e)) throw new Error('_end.js: FAM_FONTS link line not found');
  return e.replace(fontLine, '/* needFont() fonts are loaded by src/app/fonts.ts */');
}
function src(f) {
  if (f.endsWith('fam.css.html')) return famKeys.filter((k) => existsSync(join(famDir, k + '.css'))).map((k) => famRead(k + '.css')).join('\n');
  // each family in its own try/IIFE, as build.sh does, so one bad family can't stop the rest
  if (f.endsWith('fam.js.html')) return [famRead('_kit.js'),
    ...famKeys.map((k) => `\n/* ===== family: ${k} ===== */\ntry{(()=>{\n${famRead(k + '.js')}\n})()}catch(e){console.error("family ${k} failed",e)}\n`),
    famEnd()].join('\n');
  return srcFile(f);
}
const isEngine = (f) => (f.startsWith('3') && f.endsWith('.js')) || f.endsWith('fam.js.html');
const isSheet = (f) => /^3.*\.html$/.test(f) || f.endsWith('fam.css.html');

// ---- engine
const jsParts = order.filter(isEngine);
let js = jsParts.map(src).join('\n').split('\n').filter((l) => !/^\s*<\/?script>\s*$/.test(l)).join('\n');
if (/<\/?script>/.test(js)) throw new Error('inline <script> tag left in engine');

function fix(name, from, to, count = 1) {
  const n = js.split(from).length - 1;
  if (count === 'any' ? n < 1 : n !== count) throw new Error(`fix "${name}": expected ${count} match(es), found ${n}`);
  js = js.split(from).join(to);
}
fix('asset base', "const A='assets/';", "const A='/assets/';");
fix('ssr-safe reduced motion', "const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;",
  "const REDUCED=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;");
fix('wish timestamps from the API are ISO strings', 'const draw=list=>{const vis=list.filter(w=>!w.hidden).sort((a,b)=>b.at-a.at);',
  'const draw=list=>{const vis=list.filter(w=>!w.hidden).map(w=>({...w,at:new Date(w.at).getTime()})).sort((a,b)=>b.at-a.at);');
fix('escape gallery photo urls', 'photos.map(p=>`<img src="${p}" alt="">`)', 'photos.map(p=>`<img src="${esc(p)}" alt="" loading="lazy">`)');
fix('escape duitnow qr url', '${o.qr?`<img src="${o.qr}" alt="DuitNow QR">`', '${o.qr?`<img src="${esc(o.qr)}" alt="DuitNow QR">`');
fix('escape couple photo in css url()', 'url(${ph})', 'url(${esc(ph)})', 'any');
fix('escape gallery spread photo in css url()', 'url(${ph[i+1]||src})', 'url(${esc(ph[i+1]||src)})');
fix('escape lightbox image src', '<img src="${im.src}" alt="">', '<img src="${esc(im.src)}" alt="">');
fix('ssr-safe .ics click listener', "document.addEventListener('click',e=>{const b=e.target.closest('[data-ics]')",
  "typeof document!=='undefined'&&document.addEventListener('click',e=>{const b=e.target.closest('[data-ics]')");
// 3m-features.js uses ls and toast, which the prototype defines in 4-app.js (not ported). Provide small equivalents.
if (!/const ls=/.test(js)) js = `const ls={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
function toast(m){if(typeof document==='undefined')return;let t=document.getElementById('inv-toast');if(!t){t=document.createElement('div');t.id='inv-toast';t.className='toast';t.setAttribute('role','status');document.body.appendChild(t)}t.textContent=m;t.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('on'),2400)}
` + js;
// Inline CSS in quoted strings (e.g. 3j-skins.js label page) can't use ${A}; point those at the app's absolute path.
js = js.replace(/url\(assets\//g, 'url(/assets/');
// Some families write <img src="assets/…"> / <image href="assets/…"> directly; relative paths break on nested routes.
js = js.replace(/\b(src|href)="assets\//g, '$1="/assets/');
const literalAssets = js.match(/["'`(]assets\//g);
if (literalAssets) throw new Error(`asset paths not using A: ${literalAssets.length}`);

const EXPORTS = ['ALL_EVENTS', 'CARD_SECTIONS', 'TRADITIONS', 'TRAD_EVENTS', 'TRAD_DEFAULT', 'MONO_SCRIPTS', 'copyFor', 'defaultCopy', 'plainOf', 'greetingFor', '$', '$$', 'esc', 'ICON', 'A', 'ASP', 'FAMILIES', 'THEMES', 'THEME', 'LEGACY', 'themeOf', 'CATS', 'TONES', 'toneOf', 'dotColor',
  'swatchBg', 'swatchEl', 'T', 'DAYS', 'MONTHS', 'fmtDate', 'fmtShort', 'fmtTime', 'calUrl', 'mapsUrl', 'wazeUrl', 'coverNames', 'waNum',
  'Music', 'SAMPLE', 'SAMPLE_WISHES', 'frontPage', 'coverHTML', 'renderInvite', 'copyText',
  'EFFECTS', 'rsvpCode', 'giftList', 'safeUrl', 'icsText', 'saveFile', 'qrSvg'];
const header = `/* eslint-disable */
/* GENERATED by scripts/port-prototype.mjs from the Sanding prototype (${jsParts.join(', ')}).
   Do not edit by hand: change the prototype and re-run the script. Browser-only parts run lazily; assets live in public/assets. */\n`;
writeFileSync(join(app, 'src/lib/invite/engine.js'), header + js + `\n\nexport {${EXPORTS.join(',')}};\n`);

// ---- css
const head = src('1-head.html');
const site = head.match(/<style>([\s\S]*?)<\/style>/)[1].trim();
const sheetFiles = order.filter(isSheet);
const FONT_LINK = /<link[^>]+href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"[^>]*>/g;
const sheets = sheetFiles.map((f) => {
  const css = src(f).replace(FONT_LINK, '').replace(/<\/?style>/g, '').trim();
  if (/<[a-z]/i.test(css.replace(/<svg[\s\S]*?<\/svg>/g, ''))) throw new Error(`${f}: unexpected HTML left after stripping <style>/<link>`);
  return css;
});
const cssPath = join(app, 'src/app/globals.css');
const MARK = '/* ===== additions for the Next.js app ===== */';
const current = read(cssPath);
if (!current.includes(MARK)) throw new Error('globals.css lost its app additions block');
const css = [`/* GENERATED (except the additions block at the end) by scripts/port-prototype.mjs */`, site, ...sheets, current.slice(current.indexOf(MARK))]
  .join('\n\n').replace(/url\(assets\//g, 'url(/assets/');
writeFileSync(cssPath, css);

// ---- fonts
// Font links live in 1-head.html and, since round 5, at the top of some invitation sheets too.
const fonts = [head, ...sheetFiles.map(src)].flatMap((h) => [...h.matchAll(/href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&')));
// Families ask for extra Google Fonts with needFont('Family+Name:...'); load them all in one stylesheet link.
const famSrc = famKeys.map((k) => famRead(k + '.js')).join('\n');
const needFonts = [...new Set([...famSrc.matchAll(/needFont\(\s*['"]([^'"]+)['"]\s*\)/g)].map((m) => m[1]))];
const needCalls = (famSrc.match(/needFont\(/g) || []).length;
if (needCalls !== [...famSrc.matchAll(/needFont\(\s*['"][^'"]+['"]\s*\)/g)].length) throw new Error('needFont() called with a non-literal; add it to fonts by hand');
// One spec per family (several families ask for Jost / Bodoni Moda with different axes); keep the widest one.
const byFamily = new Map();
for (const spec of needFonts) { const fam = spec.split(':')[0]; if (!byFamily.has(fam) || spec.length > byFamily.get(fam).length) byFamily.set(fam, spec); }
needFonts.splice(0, needFonts.length, ...byFamily.values());
if (needFonts.length) fonts.push('https://fonts.googleapis.com/css2?' + needFonts.map((f) => 'family=' + f).join('&') + '&display=swap');
writeFileSync(join(app, 'src/app/fonts.ts'), `// GENERATED by scripts/port-prototype.mjs from the prototype's 1-head.html.\nexport const FONTS = ${JSON.stringify(fonts, null, 2)};\n`);

// ---- assets
if (!existsSync(join(proto, 'assets'))) throw new Error('prototype assets/ missing');
cpSync(join(proto, 'assets'), join(app, 'public/assets'), { recursive: true });

console.log(`engine: ${jsParts.length} parts (${famKeys.length} self-contained families) · css: ${sheets.length} sheets · fonts: ${fonts.length} links (${needFonts.length} via needFont) · assets copied`);
