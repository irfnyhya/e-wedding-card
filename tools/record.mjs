// Records marketing footage of the live site with headless Edge over CDP.
//   node tools/record.mjs <outDir>
// Writes home.png, cover.png, opened.png, card-*.png and frames/ + frames.txt (ffmpeg concat list).
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const OUT = process.argv[2] || 'marketing';
const SITE = 'https://kadkahwin.website';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const W = 405, H = 720, DPR = 1080 / 405; // 1080 x 1920 portrait, phone-shaped
const PORT = 9333;
mkdirSync(join(OUT, 'frames'), { recursive: true });
const prof = join(tmpdir(), 'edge-rec-' + Date.now());
const edge = spawn(EDGE, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, '--hide-scrollbars', '--mute-audio', '--no-first-run', '--window-size=420,760', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws, id = 0; const pending = new Map(), handlers = [];
async function connect() {
  for (let i = 0; i < 40; i++) {
    try { const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); const pg = list.find((t) => t.type === 'page'); if (pg) return pg.webSocketDebuggerUrl; } catch {}
    await sleep(250);
  }
  throw new Error('Edge did not start');
}
const send = (method, params = {}) => new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method, params })); });
const evalJs = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.value;
async function go(url) { await send('Page.navigate', { url }); await sleep(800); for (let i = 0; i < 60 && (await evalJs('document.readyState')) !== 'complete'; i++) await sleep(250); await evalJs('document.fonts.ready.then(()=>1)'); await sleep(1500); }
async function shot(name) { const { data } = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(join(OUT, name), Buffer.from(data, 'base64')); console.log('saved', name); }

// screencast frames with their timestamps, for a constant-speed video later
const frames = []; let recording = false;
handlers.push(async (m) => {
  if (m.method !== 'Page.screencastFrame') return;
  const { data, sessionId, metadata } = m.params;
  send('Page.screencastFrameAck', { sessionId });
  if (!recording) return;
  const f = `frames/f${String(frames.length).padStart(5, '0')}.jpg`;
  writeFileSync(join(OUT, f), Buffer.from(data, 'base64'));
  frames.push({ f, t: metadata.timestamp });
});
async function smoothScroll(px, ms) { await evalJs(`new Promise(r=>{const s=document.querySelector('.inv .scroller')||document.scrollingElement;const y0=s.scrollTop,t0=performance.now();const step=t=>{const k=Math.min(1,(t-t0)/${ms});const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;s.scrollTop=y0+${px}*e;k<1?requestAnimationFrame(step):r(1)};requestAnimationFrame(step)})`); }

try {
  ws = new WebSocket(await connect());
  await new Promise((r) => ws.addEventListener('open', r));
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); } else handlers.forEach((h) => h(m)); });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: DPR, mobile: true });
  await send('Emulation.setTouchEmulationEnabled', { enabled: true });

  if (process.argv[3] === 'shots') {
    // phone-size stills of the prototype's ?qa= view (needs the local server on :8766): "<id>:<at>" pairs
    for (const pair of process.argv.slice(4)) {
      const [qid, at] = pair.split(':');
      await go(`http://127.0.0.1:8766/sanding.html?qa=${qid}&at=${at}`);
      await sleep(at === 'cover' ? 1500 : 4500);
      await shot(`${qid}-${at}.png`);
    }
    edge.kill(); await sleep(500); try { rmSync(prof, { recursive: true, force: true }); } catch {}
    process.exit(0);
  }
  if (process.argv[3] === 'designs') {
    // the whole collection, top to bottom at a steady speed (designs load as they come into view)
    await go(SITE + '/designs');
    await evalJs("(document.head.insertAdjacentHTML('beforeend','<style>.dcard .hover{opacity:0!important}</style>'),1)"); // footage shows the designs, not the tap overlay
    const hRaw = await evalJs('document.scrollingElement.scrollHeight - innerHeight');
    const secs = Number(process.argv[4] || 45);
    await send('Page.startScreencast', { format: 'jpeg', quality: 85, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
    await sleep(600); recording = true; await sleep(2000);
    const steps = secs * 10;
    for (let i = 1; i <= steps; i++) {
      const h = await evalJs('document.scrollingElement.scrollHeight - innerHeight');
      await evalJs(`(document.scrollingElement.scrollTop=${Math.round((i / steps) * Math.max(h, hRaw))},1)`);
      await sleep(100);
    }
    await sleep(1500); recording = false; await send('Page.stopScreencast');
    const lines = [];
    frames.forEach((fr, i) => { const d = i < frames.length - 1 ? Math.max(0.01, frames[i + 1].t - fr.t) : 1; lines.push(`file '${fr.f}'`, `duration ${d.toFixed(3)}`); });
    lines.push(`file '${frames.at(-1).f}'`);
    writeFileSync(join(OUT, 'frames.txt'), lines.join('\n'));
    console.log('page height', hRaw, 'frames', frames.length, 'seconds', (frames.at(-1).t - frames[0].t).toFixed(1));
    edge.kill(); await sleep(500); try { rmSync(prof, { recursive: true, force: true }); } catch {}
    process.exit(0);
  }

  // stills
  await go(SITE + '/'); await shot('home.png');
  await evalJs("document.getElementById('pricing')?.scrollIntoView({block:'start'}),1"); await sleep(800); await shot('prices.png');

  // the sample card: cover, open, scroll through
  await go(SITE + '/contoh');
  await send('Page.startScreencast', { format: 'jpeg', quality: 88, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
  await sleep(600); recording = true;
  await sleep(2600);                                       // linger on the cover
  await evalJs("(document.querySelector('[data-open]')?.click(),1)");
  await sleep(4200);                                       // the opening animation
  const total = await evalJs("(()=>{const s=document.querySelector('.inv .scroller')||document.scrollingElement;return s.scrollHeight-s.clientHeight})()") || 3000;
  const stops = 6, seg = Math.min(total, 5200) / stops;
  for (let i = 0; i < stops; i++) { await smoothScroll(seg, 1700); await sleep(900); }
  recording = false; await send('Page.stopScreencast');

  // stills of the same card
  await go(SITE + '/contoh'); await shot('cover.png');
  await evalJs("(document.querySelector('[data-open]')?.click(),1)"); await sleep(4500); await shot('opened.png');
  for (const [i, k] of ['when', 'gallery', 'rsvp'].entries()) {
    const ok = await evalJs(`(()=>{const s=document.querySelector('[data-s="${k}"]');if(!s)return 0;s.scrollIntoView({block:'start'});return 1})()`);
    if (ok) { await sleep(1200); await shot(`card-${i + 1}-${k}.png`); }
  }

  // ffmpeg concat list with each frame's real duration, so motion keeps its speed
  const lines = [];
  frames.forEach((fr, i) => { const d = i < frames.length - 1 ? Math.max(0.01, frames[i + 1].t - fr.t) : 1.5; lines.push(`file '${fr.f}'`, `duration ${d.toFixed(3)}`); });
  lines.push(`file '${frames.at(-1).f}'`);
  writeFileSync(join(OUT, 'frames.txt'), lines.join('\n'));
  console.log('frames', frames.length, 'seconds', (frames.at(-1).t - frames[0].t).toFixed(1));
} finally {
  try { ws?.close(); } catch {}
  edge.kill(); await sleep(500);
  try { rmSync(prof, { recursive: true, force: true }); } catch {}
}
