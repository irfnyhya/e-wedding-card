// Phone-size stills of designs through one headless Edge over CDP (reliable where --screenshot hangs).
//   node tools/audit.mjs <page.html> <port> <outDir> <id:at> [<id:at> ...]
//   node tools/audit.mjs <page.html> <port> <outDir> --fams qa/fams.txt     (cover + open of every family)
//   at = cover | open | <section> (when, rsvp, ...) | scroll (opens, then scrolls 900px to show sections unfolding)
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const [PAGE, SPORT, OUT, ...rest] = process.argv.slice(2);
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9400 + Math.floor(Math.random() * 500);
mkdirSync(OUT, { recursive: true });
let jobs = rest;
if (rest[0] === '--fams') jobs = readFileSync(rest[1], 'utf8').trim().split(/\r?\n/).flatMap((l) => { const [f, id] = l.split(' '); return [`${id}:cover:${f}`, `${id}:open:${f}`]; });
const prof = join(tmpdir(), 'edge-audit-' + Date.now());
const edge = spawn(EDGE, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, '--remote-allow-origins=*', '--hide-scrollbars', '--mute-audio', '--no-first-run', '--window-size=390,760', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map();
async function connect() {
  for (let i = 0; i < 60; i++) {
    try { const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); const pg = list.find((t) => t.type === 'page'); if (pg) return pg.webSocketDebuggerUrl; } catch {}
    await sleep(250);
  }
  throw new Error('Edge did not start');
}
const send = (method, params = {}) => new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method, params })); });
const evalJs = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.value;
async function go(url) { await send('Page.navigate', { url }); await sleep(500); for (let i = 0; i < 80 && (await evalJs('document.readyState')) !== 'complete'; i++) await sleep(100); }
async function shot(name) { const { data } = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(join(OUT, name), Buffer.from(data, 'base64')); }
try {
  ws = new WebSocket(await connect());
  await new Promise((r) => ws.addEventListener('open', r));
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 760, deviceScaleFactor: 1, mobile: true });
  for (const job of jobs) {
    const [qid, at, label] = job.split(':');
    const name = `${label || qid}-${at}.png`;
    try {
      if (at === 'scroll') {
        await go(`http://127.0.0.1:${SPORT}/${PAGE}?qa=${qid}&at=open`); await sleep(5000);
        await evalJs(`(()=>{const s=document.querySelector('#inv-root .scroller');s.scrollTop=900;s.dispatchEvent(new Event('scroll'));return 1})()`);
        await sleep(250); await shot(`${qid}-scroll-a.png`); await sleep(1600); await shot(`${qid}-scroll-b.png`);
      } else {
        await go(`http://127.0.0.1:${SPORT}/${PAGE}?qa=${qid}&at=${at}`);
        await sleep(at === 'cover' ? 1800 : 5500);
        await shot(name);
      }
      console.log('ok', name);
    } catch (e) { console.log('fail', name, e.message); }
  }
} finally { edge.kill(); await sleep(500); try { rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(0); }
