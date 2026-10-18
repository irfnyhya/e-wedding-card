'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import InviteOverlay from '@/components/InviteOverlay';
import { families } from '@/components/HomeCards';
import { coverNames, EFFECTS, FAMILIES, Music, renderInvite, swatchEl, T, THEMES, themeOf, fmtDate, fmtTime } from '@/lib/invite/engine';
import JawiField from './JawiField';
import { ADDON_OWN, BANKS, PKG, displayLink, missingField, needPkg, needsPayment, type Card, type GiftAccount, type PackageId, type WishItem } from '@/lib/card';
import { supabaseBrowser } from '@/lib/supabase/client';
import { blankEvent, MAX_EXTRA_EVENTS, type EventItem } from '@/lib/events';

type Props = { orderId: string; userId: string; initial: Card; status: 'draft' | 'live'; paidPkg: PackageId | null; addonPaid: boolean; slug: string | null };
type Media = 'photo' | 'qr' | 'own' | 'og';
const MAX_PHOTOS = 6;
const TABS = ['Design', 'Couple', 'Majlis', 'Extras', 'Review'];
const sampleGuest = (c: Card) => (c.lang === 'en' ? 'Mr Ahmad & family' : 'Encik Ahmad & keluarga');

/** Resizes an image in the browser before upload so cards stay light on mobile data. */
function shrink(file: File, max: number, type: string, q?: number): Promise<Blob> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      const g = c.getContext('2d')!;
      g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
      c.toBlob((b) => (b ? res(b) : rej(new Error('Could not process that image.'))), type, q);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => rej(new Error('That file is not an image we can read.'));
    img.src = URL.createObjectURL(file);
  });
}

/** Centre-crops an image to the link-preview shape WhatsApp and Facebook show (1.91:1). */
function crop(file: File, w: number, h: number): Promise<Blob> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const k = Math.max(w / img.width, h / img.height);
      const sw = w / k, sh = h / k;
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const g = c.getContext('2d')!;
      g.fillStyle = '#fff'; g.fillRect(0, 0, w, h);
      g.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, w, h);
      c.toBlob((b) => (b ? res(b) : rej(new Error('Could not process that image.'))), 'image/jpeg', 0.82);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => rej(new Error('That file is not an image we can read.'));
    img.src = URL.createObjectURL(file);
  });
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return <label className="switch"><input type="checkbox" aria-label={label} checked={checked} onChange={(e) => onChange(e.target.checked)} /><span /></label>;
}

export default function Editor({ orderId, userId, initial, status, paidPkg, addonPaid, slug }: Props) {
  const router = useRouter();
  const [c, setC] = useState<Card>(initial);
  const [tab, setTab] = useState(0);
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'error'>('saved');
  const [toast, setToast] = useState('');
  const [full, setFull] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const dirty = useRef(false);
  const latest = useRef(c);
  useEffect(() => { latest.current = c; });

  const flash = useCallback((m: string) => { setToast(m); setTimeout(() => setToast(''), 2400); }, []);
  const set = <K extends keyof Card>(k: K, v: Card[K]) => { dirty.current = true; setC((o) => ({ ...o, [k]: v })); };

  const save = useCallback(async () => {
    setSaveState('saving');
    const r = await fetch(`/api/orders/${orderId}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ content: latest.current }) });
    if (!r.ok) { setSaveState('error'); throw new Error((await r.json().catch(() => ({}))).error || 'Could not save.'); }
    dirty.current = false; setSaveState('saved');
    return r.json();
  }, [orderId]);

  // autosave
  useEffect(() => {
    if (!dirty.current) return;
    const t = setTimeout(() => { save().catch(() => {}); }, 900);
    return () => clearTimeout(t);
  }, [c, save]);
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty.current) e.preventDefault(); };
    addEventListener('beforeunload', warn);
    return () => { removeEventListener('beforeunload', warn); Music.stop(); };
  }, []);

  // live preview: keeps the cover state and scroll position between repaints
  useEffect(() => {
    const t = setTimeout(() => {
      const host = preview.current; if (!host) return;
      const st = host.querySelector('.scroller')?.scrollTop || 0;
      const opened = host.querySelector('.inv')?.classList.contains('opened') || false;
      renderInvite(host, c, { mode: 'preview', opened, guest: c.x_guestlinks ? sampleGuest(c) : '' });
      const sc = host.querySelector('.scroller'); if (sc) sc.scrollTop = st;
    }, 220);
    return () => clearTimeout(t);
  }, [c]);

  async function upload(file: File, kind: Media) {
    setUploading(kind);
    try {
      const blob = kind === 'qr' ? await shrink(file, 480, 'image/png') : kind === 'own' ? await shrink(file, 1600, 'image/jpeg', 0.8) : kind === 'og' ? await crop(file, 1200, 630) : await shrink(file, 1080, 'image/jpeg', 0.75);
      const path = `${userId}/${orderId}/${kind}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}.${kind === 'qr' ? 'png' : 'jpg'}`;
      const sb = supabaseBrowser();
      const { error } = await sb.storage.from('card-media').upload(path, blob, { contentType: blob.type, cacheControl: '31536000' });
      if (error) throw error;
      const url = sb.storage.from('card-media').getPublicUrl(path).data.publicUrl;
      dirty.current = true;
      setC((o) => (kind === 'qr' ? { ...o, qr: url } : kind === 'own' ? { ...o, ownDesign: url } : kind === 'og' ? { ...o, ogImage: url } : { ...o, photos: [...o.photos, url].slice(0, MAX_PHOTOS), x_gallery: true }));
    } catch (e) { flash((e as Error).message || 'Upload failed.'); } finally { setUploading(null); }
  }
  async function removeMedia(url: string, kind: Media) {
    dirty.current = true;
    setC((o) => (kind === 'qr' ? { ...o, qr: '' } : kind === 'own' ? { ...o, ownDesign: '' } : kind === 'og' ? { ...o, ogImage: '' } : { ...o, photos: o.photos.filter((p) => p !== url) }));
    const m = url.match(/\/card-media\/(.+)$/);
    if (m) supabaseBrowser().storage.from('card-media').remove([decodeURIComponent(m[1])]).catch(() => {});
  }

  const pk = needPkg(c);
  const live = status === 'live';
  const covered = live && !needsPayment(c, paidPkg, addonPaid);
  const addonDue = !!c.ownDesign && !addonPaid;
  const setGifts = (gifts: GiftAccount[]) => { dirty.current = true; setC((o) => ({ ...o, gifts, bank: gifts[0]?.bank || 'Maybank', accName: gifts[0]?.accName || '', accNo: gifts[0]?.accNo || '' })); };
  const setWish = (wishlist: WishItem[]) => set('wishlist', wishlist);
  const setEv = (i: number, k: keyof EventItem, v: string) => set('events', c.events.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const L = T[c.lang];

  async function proceed() {
    const miss = missingField(c);
    if (miss) { setTab(miss[1]); flash(`Add ${miss[2]} first.`); return; }
    try { await save(); } catch (e) { flash((e as Error).message); return; }
    if (covered) { flash('Changes saved'); router.push(`/dashboard?card=${orderId}`); return; }
    router.push(`/checkout/${orderId}`);
  }

  async function laterPay() {
    try { await save(); } catch (e) { flash((e as Error).message); return; }
    router.push(`/dashboard?card=${orderId}`);
  }

  const dim = (on: boolean) => ({ opacity: on ? 1 : 0.45 });
  const tag = (p: 'Asas' | 'Premium' | 'Diraja') => <span className={`tag ${p === 'Diraja' ? 'brass' : ''}`}>{p}</span>;

  return (
    <div className="wrap">
      <div className="editor">
        <div>
          <p className="eyebrow">{live ? `Editing ${displayLink(slug || '')}` : 'New card · filled with example details, replace them with yours'}</p>
          <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', margin: '8px 0 6px' }}>{live ? 'Edit card' : 'Create your card'}</h1>
          <p className="status-note" style={{ marginBottom: 16 }} aria-live="polite">{saveState === 'saving' ? 'Saving…' : saveState === 'error' ? 'Not saved. Check your connection.' : (live ? 'All changes saved' : 'Draft saved to your account')}</p>
          <div className="tabs" role="tablist">
            {TABS.map((t, i) => <button key={t} role="tab" aria-selected={tab === i} onClick={() => setTab(i)}><span className="ix">{i + 1}</span>{t}</button>)}
          </div>
          <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            {tab === 0 && <div className="panel on">
              <div className="section-title"><h3>Design</h3><span className="muted">{themeOf(c.template).desc}</span></div>
              <div className="tpl-groups">
                {families().map(([k, f]) => (
                  <div className="tpl-group" key={k}>
                    <h4>{f.name}<small>{f.meaning}</small></h4>
                    <div className="tpl-pick">
                      {THEMES.filter((t) => t.fam === k).map((t) => (
                        <button key={t.id} type="button" aria-pressed={themeOf(c.template).id === t.id} onClick={() => set('template', t.id)}>
                          <div dangerouslySetInnerHTML={{ __html: swatchEl(t) }} />
                          <div className="nm">{t.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="fieldset">
                <div className="field"><label htmlFor="f-lang">Card language</label><select id="f-lang" value={c.lang} onChange={(e) => set('lang', e.target.value as Card['lang'])}><option value="ms">Bahasa Melayu</option><option value="en">English</option></select></div>
                <JawiField value={c.jawi} onChange={(v) => set('jawi', v)} names={coverNames(c)} flash={flash} />
              </div>
              <div className="toggle-row"><Toggle label="Show Bismillah and doa" checked={c.bismillah} onChange={(v) => set('bismillah', v)} /><div className="body"><div className="top"><b>Show Bismillah and doa</b></div><p className="muted" style={{ fontSize: 13 }}>Adds the Bismillah at the top of the card and a short doa section near the end.</p></div></div>
              <div className="toggle-row"><Toggle label="Custom accent colour" checked={c.useAccent} onChange={(v) => set('useAccent', v)} /><div className="body"><div className="top"><b>Custom accent colour</b>{tag('Diraja')}</div><p className="muted" style={{ fontSize: 13 }}>Match the card to your wedding colours.</p>
                <input type="color" aria-label="Accent colour" value={c.accent} onChange={(e) => set('accent', e.target.value)} style={{ width: 64, height: 36, border: '1px solid var(--line)', borderRadius: 8, background: 'none', ...dim(c.useAccent) }} /></div></div>
              <div className="toggle-row"><span className="switch-sp" /><div className="body"><div className="top"><b>Effect</b>{tag('Asas')}</div><p className="muted" style={{ fontSize: 13 }}>A light layer that drifts over the card. Kept slow and sparse so it never fights the design.</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{Object.entries(EFFECTS).map(([k, f]) => <button key={k} type="button" className="chip" aria-pressed={(c.effect || 'none') === k} onClick={() => set('effect', k)}>{f.label}</button>)}</div></div></div>
              <div className="toggle-row"><span className="switch-sp" /><div className="body"><div className="top"><b>Use your own design</b><span className="tag brass">+RM{ADDON_OWN}</span></div><p className="muted" style={{ fontSize: 13 }}>Upload your own artwork as the front of the card. The opening animation, RSVP and every other feature still work. Portrait image, at least 1080 px tall.</p>
                <div className="uploads">
                  {c.ownDesign ? <div className="ph tall"><img src={c.ownDesign} alt="Your design" /><button type="button" aria-label="Remove your design" onClick={() => removeMedia(c.ownDesign, 'own')}>✕</button></div>
                    : <label className="add" style={{ height: 150 }}>{uploading === 'own' ? 'Uploading…' : 'Upload design'}<input type="file" accept="image/*" disabled={!!uploading} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) upload(f, 'own'); }} /></label>}
                </div></div></div>
              <div className="toggle-row"><span className="switch-sp" /><div className="body"><div className="top"><b>WhatsApp link preview</b>{tag('Asas')}</div><p className="muted" style={{ fontSize: 13 }}>The picture shown when you share your link on WhatsApp, Telegram or Facebook. Landscape works best; it is cropped to 1200×630. Without one, your first gallery photo is used.</p>
                <div className="og-prev">
                  {c.ogImage ? <><img src={c.ogImage} alt="Link preview" /><button type="button" className="icon-btn" aria-label="Remove link preview image" onClick={() => removeMedia(c.ogImage, 'og')}>✕</button></>
                    : <label className="add" style={{ height: '100%', width: '100%' }}>{uploading === 'og' ? 'Uploading…' : 'Upload preview image'}<input type="file" accept="image/*" disabled={!!uploading} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) upload(f, 'og'); }} /></label>}
                </div></div></div>
            </div>}

            {tab === 1 && <div className="panel on">
              <div className="section-title"><h3>Bride</h3></div>
              <div className="fieldset">
                <div className="field"><label htmlFor="f-bf">Full name</label><input type="text" id="f-bf" value={c.brideFull} maxLength={120} onChange={(e) => set('brideFull', e.target.value)} /></div>
                <div className="field"><label htmlFor="f-bs">Name on cover</label><input type="text" id="f-bs" value={c.brideShort} maxLength={40} onChange={(e) => set('brideShort', e.target.value)} /></div>
              </div>
              <div className="section-title"><h3>Groom</h3></div>
              <div className="fieldset">
                <div className="field"><label htmlFor="f-gf">Full name</label><input type="text" id="f-gf" value={c.groomFull} maxLength={120} onChange={(e) => set('groomFull', e.target.value)} /></div>
                <div className="field"><label htmlFor="f-gs">Name on cover</label><input type="text" id="f-gs" value={c.groomShort} maxLength={40} onChange={(e) => set('groomShort', e.target.value)} /></div>
              </div>
              <div className="section-title"><h3>Hosts</h3></div>
              <div className="fieldset">
                <div className="field full"><label htmlFor="f-hosts">Host names (usually the parents)</label><input type="text" id="f-hosts" value={c.hosts} maxLength={200} onChange={(e) => set('hosts', e.target.value)} /><span className="hint">Shown in the invitation: &ldquo;Dengan penuh kesyukuran, kami …&rdquo;</span></div>
                <div className="field"><label htmlFor="f-side">Whose majlis is this?</label><select id="f-side" value={c.side} onChange={(e) => set('side', e.target.value as Card['side'])}><option value="bride">Bride&apos;s family</option><option value="groom">Groom&apos;s family</option><option value="couple">The couple</option></select></div>
                <div className="field"><label htmlFor="f-ev">Event title</label><select id="f-ev" value={c.eventTitle} onChange={(e) => set('eventTitle', e.target.value as Card['eventTitle'])}><option value="walimah">Walimatul Urus</option><option value="kahwin">Majlis Perkahwinan</option><option value="bertandang">Majlis Bertandang</option><option value="resepsi">Majlis Resepsi</option><option value="tunang">Majlis Pertunangan</option><option value="nikah">Majlis Akad Nikah</option></select></div>
              </div>
            </div>}

            {tab === 2 && <div className="panel on">
              <div className="fieldset">
                <div className="field"><label htmlFor="f-date">Date</label><input type="date" id="f-date" value={c.date} onChange={(e) => set('date', e.target.value)} /></div>
                <div className="field"><label htmlFor="f-hijri">Hijri date (optional)</label><input type="text" id="f-hijri" placeholder="18 Jamadilakhir 1448H" value={c.hijri} maxLength={60} onChange={(e) => set('hijri', e.target.value)} /></div>
                <div className="field"><label htmlFor="f-start">Starts</label><input type="time" id="f-start" value={c.start} onChange={(e) => set('start', e.target.value)} /></div>
                <div className="field"><label htmlFor="f-end">Ends</label><input type="time" id="f-end" value={c.end} onChange={(e) => set('end', e.target.value)} /></div>
                <div className="field full"><label htmlFor="f-venue">Venue</label><input type="text" id="f-venue" value={c.venue} maxLength={120} onChange={(e) => set('venue', e.target.value)} /></div>
                <div className="field full"><label htmlFor="f-addr">Address</label><textarea id="f-addr" style={{ minHeight: 64 }} value={c.address} maxLength={300} onChange={(e) => set('address', e.target.value)} /><span className="hint">Used for the Google Maps and Waze buttons.</span></div>
                <div className="field full"><label htmlFor="f-dress">Dress code (optional)</label><input type="text" id="f-dress" placeholder="Sage green & cream" value={c.dress} maxLength={80} onChange={(e) => set('dress', e.target.value)} /></div>
                <div className="field full"><label htmlFor="f-live">Livestream link (optional)</label><input type="url" id="f-live" placeholder="https://youtube.com/live/…" value={c.livestream} maxLength={300} onChange={(e) => set('livestream', e.target.value)} /><span className="hint">YouTube, Facebook or Zoom. Guests who can’t come get a Watch live button.</span></div>
              </div>
              <div className="section-title"><h3>More dates or venues</h3><button type="button" className="btn btn-ghost btn-sm" disabled={c.events.length >= MAX_EXTRA_EVENTS} onClick={() => set('events', [...c.events, blankEvent()])}>Add date or venue</button></div>
              <p className="muted" style={{ fontSize: 13, marginBottom: 10 }}>For an akad nikah the night before, a bertandang at the groom&apos;s side, or a second hall. Up to {MAX_EXTRA_EVENTS + 1} sessions on one card, each with its own Google Maps and Waze buttons.</p>
              <div className="rows">
                {c.events.map((ev, i) => (
                  <div className="ev-card" key={i}>
                    <div className="top"><b>Session {i + 2}</b><button type="button" className="icon-btn" aria-label={`Remove session ${i + 2}`} onClick={() => set('events', c.events.filter((_, j) => j !== i))}>✕</button></div>
                    <div className="fieldset">
                      <div className="field full"><label htmlFor={`ev-l${i}`}>Title</label><input type="text" id={`ev-l${i}`} placeholder="Majlis Akad Nikah" value={ev.label} maxLength={80} onChange={(e) => setEv(i, 'label', e.target.value)} /></div>
                      <div className="field"><label htmlFor={`ev-d${i}`}>Date</label><input type="date" id={`ev-d${i}`} value={ev.date} onChange={(e) => setEv(i, 'date', e.target.value)} /></div>
                      <div className="field"><label htmlFor={`ev-s${i}`}>Starts</label><input type="time" id={`ev-s${i}`} value={ev.start} onChange={(e) => setEv(i, 'start', e.target.value)} /></div>
                      <div className="field"><label htmlFor={`ev-e${i}`}>Ends</label><input type="time" id={`ev-e${i}`} value={ev.end} onChange={(e) => setEv(i, 'end', e.target.value)} /></div>
                      <div className="field full"><label htmlFor={`ev-v${i}`}>Venue</label><input type="text" id={`ev-v${i}`} placeholder="Masjid Al-Hidayah" value={ev.venue} maxLength={120} onChange={(e) => setEv(i, 'venue', e.target.value)} /></div>
                      <div className="field full"><label htmlFor={`ev-a${i}`}>Address</label><textarea id={`ev-a${i}`} style={{ minHeight: 56 }} value={ev.address} maxLength={300} onChange={(e) => setEv(i, 'address', e.target.value)} /></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-title"><h3>Aturcara majlis</h3><button type="button" className="btn btn-ghost btn-sm" disabled={c.schedule.length >= 12} onClick={() => set('schedule', [...c.schedule, { time: '', label: '' }])}>Add item</button></div>
              <div className="rows">
                {c.schedule.length ? c.schedule.map((s, i) => (
                  <div className="row-line" key={i}>
                    <input type="time" aria-label="Time" value={s.time} onChange={(e) => set('schedule', c.schedule.map((x, j) => (j === i ? { ...x, time: e.target.value } : x)))} />
                    <input type="text" aria-label="Item" value={s.label} maxLength={80} onChange={(e) => set('schedule', c.schedule.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
                    <button type="button" className="icon-btn" aria-label="Remove item" onClick={() => set('schedule', c.schedule.filter((_, j) => j !== i))}>✕</button>
                  </div>
                )) : <p className="muted" style={{ fontSize: 13 }}>No items yet.</p>}
              </div>
            </div>}

            {tab === 3 && <div className="panel on">
              <p className="muted">Turn on what you need. The package updates to the smallest one that covers your choices.</p>
              <div className="toggle-row"><Toggle label="RSVP" checked={c.x_rsvp} onChange={(v) => set('x_rsvp', v)} /><div className="body"><div className="top"><b>RSVP</b>{tag('Asas')}</div>
                <div className="fieldset" style={dim(c.x_rsvp)}>
                  <div className="field"><label htmlFor="f-pax">Max pax per RSVP</label><input type="number" id="f-pax" min={1} max={20} value={c.maxPax} onChange={(e) => set('maxPax', Math.max(1, Math.min(20, +e.target.value || 1)))} /></div>
                  <div className="field"><label htmlFor="f-dl">RSVP closes on</label><input type="date" id="f-dl" value={c.deadline} onChange={(e) => set('deadline', e.target.value)} /></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...dim(c.x_rsvp) }}>
                  <label className="check"><input type="checkbox" checked={c.x_counter} onChange={(e) => set('x_counter', e.target.checked)} /> Show the live count of guests attending on the card {tag('Premium')}</label>
                  <label className="check"><input type="checkbox" checked={c.x_epass} onChange={(e) => set('x_epass', e.target.checked)} /> Give each attending guest an e-pass with a QR code for check-in {tag('Diraja')}</label>
                </div></div></div>
              <div className="toggle-row"><Toggle label="Ucapan" checked={c.x_wishes} onChange={(v) => set('x_wishes', v)} /><div className="body"><div className="top"><b>Ucapan (wishes wall)</b>{tag('Premium')}</div></div></div>
              <div className="toggle-row"><Toggle label="Background music" checked={c.x_music} onChange={(v) => { set('x_music', v); if (!v) { Music.stop(); setPlaying(false); } }} /><div className="body"><div className="top"><b>Background music</b>{tag('Premium')}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', ...dim(c.x_music) }}>
                  {Object.entries(Music.tracks).map(([k, t]) => <button key={k} type="button" className="chip" aria-pressed={c.music === k} onClick={() => { setC((o) => ({ ...o, music: k, x_music: true })); dirty.current = true; if (Music.playing()) Music.play(k); }}>{t.label}</button>)}
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => { if (Music.playing()) { Music.stop(); setPlaying(false); } else { Music.play(c.music || 'musicbox'); setPlaying(true); } }}>{playing ? 'Stop' : 'Play'}</button>
                </div></div></div>
              <div className="toggle-row"><Toggle label="Photo gallery" checked={c.x_gallery} onChange={(v) => set('x_gallery', v)} /><div className="body"><div className="top"><b>Photo gallery</b>{tag('Premium')}<span className="muted" style={{ fontSize: 12 }}>Up to {MAX_PHOTOS} photos</span></div>
                <div className="uploads" style={dim(c.x_gallery)}>
                  {c.photos.map((p, i) => <div className="ph" key={p}><img src={p} alt={`Photo ${i + 1}`} /><button type="button" aria-label="Remove photo" onClick={() => removeMedia(p, 'photo')}>✕</button></div>)}
                  {c.photos.length < MAX_PHOTOS && <label className="add">{uploading === 'photo' ? 'Uploading…' : 'Add photo'}<input type="file" accept="image/*" disabled={!!uploading} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) upload(f, 'photo'); }} /></label>}
                </div></div></div>
              <div className="toggle-row"><Toggle label="Salam kaut" checked={c.x_gift} onChange={(v) => set('x_gift', v)} /><div className="body"><div className="top"><b>Salam kaut (money gift)</b>{tag('Premium')}</div>
                <div className="fieldset" style={dim(c.x_gift)}>
                  <div className="field full"><span className="lbl">Accounts (up to 3)</span>
                    <div className="rows">
                      {c.gifts.map((g, i) => (
                        <div className="row-line c4" key={i}>
                          <select aria-label="Bank" value={g.bank} onChange={(e) => setGifts(c.gifts.map((x, j) => (j === i ? { ...x, bank: e.target.value } : x)))}>{BANKS.map((b) => <option key={b}>{b}</option>)}</select>
                          <input type="text" aria-label="Account holder" placeholder="Account holder" value={g.accName} maxLength={80} onChange={(e) => setGifts(c.gifts.map((x, j) => (j === i ? { ...x, accName: e.target.value } : x)))} />
                          <input type="text" aria-label="Account number" placeholder="Account number" inputMode="numeric" value={g.accNo} maxLength={40} onChange={(e) => setGifts(c.gifts.map((x, j) => (j === i ? { ...x, accNo: e.target.value } : x)))} />
                          <button type="button" className="icon-btn" aria-label="Remove account" disabled={c.gifts.length <= 1} onClick={() => setGifts(c.gifts.filter((_, j) => j !== i))}>✕</button>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', marginTop: 8 }} disabled={c.gifts.length >= 3} onClick={() => setGifts([...c.gifts, { bank: 'Touch ’n Go eWallet', accName: '', accNo: '' }])}>Add account</button>
                  </div>
                  <div className="field full"><span className="lbl">DuitNow QR (optional)</span><div className="uploads">
                    {c.qr ? <div className="ph"><img src={c.qr} alt="DuitNow QR" /><button type="button" aria-label="Remove QR" onClick={() => removeMedia(c.qr, 'qr')}>✕</button></div>
                      : <label className="add">{uploading === 'qr' ? 'Uploading…' : 'Upload QR'}<input type="file" accept="image/*" disabled={!!uploading} onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) upload(f, 'qr'); }} /></label>}
                  </div></div>
                </div></div></div>
              <div className="toggle-row"><Toggle label="Gift wishlist" checked={c.x_wishlist} onChange={(v) => set('x_wishlist', v)} /><div className="body"><div className="top"><b>Gift wishlist</b>{tag('Premium')}<button type="button" className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} disabled={c.wishlist.length >= 12} onClick={() => { setC((o) => ({ ...o, x_wishlist: true, wishlist: [...o.wishlist, { name: '', price: '', link: '' }] })); dirty.current = true; }}>Add item</button></div>
                <p className="muted" style={{ fontSize: 13 }}>Guests reserve an item so nobody brings the same gift. You see who reserved what in the dashboard.</p>
                <div className="rows" style={dim(c.x_wishlist)}>
                  {c.wishlist.map((w, i) => (
                    <div className="row-line wl" key={i}>
                      <input type="text" aria-label="Item" placeholder="Item, e.g. Periuk nasi" value={w.name} maxLength={80} onChange={(e) => setWish(c.wishlist.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
                      <input type="text" aria-label="Price" placeholder="RM120" value={w.price} maxLength={20} onChange={(e) => setWish(c.wishlist.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))} />
                      <input type="url" aria-label="Shop link" placeholder="https://shopee.com.my/…" value={w.link} maxLength={300} onChange={(e) => setWish(c.wishlist.map((x, j) => (j === i ? { ...x, link: e.target.value } : x)))} />
                      <button type="button" className="icon-btn" aria-label="Remove item" onClick={() => setWish(c.wishlist.filter((_, j) => j !== i))}>✕</button>
                    </div>
                  ))}
                </div></div></div>
              <div className="toggle-row"><Toggle label="Contacts" checked={c.x_contacts} onChange={(v) => set('x_contacts', v)} /><div className="body"><div className="top"><b>Contacts for guests</b>{tag('Premium')}<button type="button" className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} disabled={c.contacts.length >= 3} onClick={() => set('contacts', [...c.contacts, { name: '', role: '', phone: '' }])}>Add contact</button></div>
                <div className="rows" style={dim(c.x_contacts)}>
                  {c.contacts.map((ct, i) => (
                    <div className="row-line c3" key={i}>
                      {(['name', 'role', 'phone'] as const).map((k) => <input key={k} type={k === 'phone' ? 'tel' : 'text'} aria-label={`Contact ${k}`} placeholder={k === 'name' ? 'Name' : k === 'role' ? 'Role, e.g. Bapa pengantin' : '012-345 6789'} value={ct[k]} maxLength={k === 'phone' ? 20 : 60}
                        onChange={(e) => set('contacts', c.contacts.map((x, j) => (j === i ? { ...x, [k]: e.target.value } : x)))} />)}
                      <button type="button" className="icon-btn" aria-label="Remove contact" onClick={() => set('contacts', c.contacts.filter((_, j) => j !== i))}>✕</button>
                    </div>
                  ))}
                </div></div></div>
              <div className="toggle-row"><Toggle label="Personal guest links" checked={c.x_guestlinks} onChange={(v) => set('x_guestlinks', v)} /><div className="body"><div className="top"><b>Personal guest links</b>{tag('Diraja')}</div><p className="muted" style={{ fontSize: 13 }}>Put each guest&apos;s name on the cover. Also unlocks CSV export.</p></div></div>
            </div>}

            {tab === 4 && <div className="panel on">
              <div className="summary"><dl>
                {([['Design', `${FAMILIES[themeOf(c.template).fam].name} · ${themeOf(c.template).name}`], ['Couple', `${c.brideShort || '—'} & ${c.groomShort || '—'}`], ['Event', L.ev[c.eventTitle]], ['Date', fmtDate(c.date, c.lang) || '—'],
                  ['Time', `${fmtTime(c.start, c.lang)} – ${fmtTime(c.end, c.lang)}`], ['Venue', c.venue || '—'], ...(c.events.length ? [['More sessions', c.events.map((e) => [e.label, e.date && fmtDate(e.date, c.lang), e.venue].filter(Boolean).join(', ')).join(' · ')]] : []), ['Language', c.lang === 'en' ? 'English' : 'Bahasa Melayu'],
                  ['Extras', ([['x_rsvp', 'RSVP'], ['x_counter', 'Attendance count'], ['x_epass', 'E-pass'], ['x_wishes', 'Ucapan'], ['x_music', 'Music'], ['x_gallery', 'Gallery'], ['x_gift', 'Salam kaut'], ['x_wishlist', 'Wishlist'], ['x_contacts', 'Contacts'], ['x_guestlinks', 'Guest links']] as const).filter(([k]) => c[k]).map(([, l]) => l).join(', ') || 'None']] as [string, string][])
                  .map(([a, b]) => <div key={a} style={{ display: 'contents' }}><dt>{a}</dt><dd>{b}</dd></div>)}
              </dl></div>
              <div className="pkg-bar">
                <div><span className="muted" style={{ fontSize: 13 }}>Your package</span><br /><b>{covered ? PKG[paidPkg!].name : PKG[pk.id].name}</b></div>
                <div style={{ textAlign: 'right' }}>
                  <b>{covered ? 'Paid' : live && paidPkg ? `+RM${Math.max(0, PKG[pk.id].price - PKG[paidPkg].price) + (addonDue ? ADDON_OWN : 0)}` : `RM${PKG[pk.id].price + (addonDue ? ADDON_OWN : 0)}`}</b><br />
                  <span className="muted" style={{ fontSize: 12 }}>{covered ? `Your ${PKG[paidPkg!].name} package covers these changes.` : live ? `Payment needed for ${[...(needPkg(c).id !== paidPkg && pk.why.length ? pk.why : []), ...(addonDue ? ['your own design'] : [])].join(', ')}. Until then it stays hidden from guests.` : `${pk.why.length ? `Needed for ${pk.why.join(', ')}` : 'Covers everything you turned on'}${addonDue ? ` · includes RM${ADDON_OWN} own design` : ''}`}</span>
                </div>
              </div>
            </div>}

            {tab === 4 && !live && <p className="muted" style={{ fontSize: 13, marginTop: 14 }}>Your draft is saved to your account as you type. Previewing is free; the card goes live at its link only after payment. <button type="button" style={{ textDecoration: 'underline', padding: 0, border: 0, background: 'none', color: 'var(--fg)', cursor: 'pointer', font: 'inherit' }} onClick={laterPay}>Save and pay later</button></p>}
            <div className="foot-nav">
              <button type="button" className="btn btn-ghost" style={{ visibility: tab ? 'visible' : 'hidden' }} onClick={() => { setTab(tab - 1); scrollTo({ top: 0 }); }}>Back</button>
              <button type="button" className="btn btn-primary" onClick={() => { if (tab < 4) { setTab(tab + 1); scrollTo({ top: 0 }); } else proceed(); }}>
                {tab < 4 ? 'Next' : covered ? 'Save changes' : live ? 'Upgrade and pay' : 'Continue to payment'}
              </button>
            </div>
          </form>
        </div>
        <aside className="preview-col" aria-label="Live preview">
          <div className="phone"><div className="screen" ref={preview} /><div className="notch" /></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => (preview.current?.querySelector('.inv') as (HTMLElement & { reopen?: () => void }) | null)?.reopen?.()}>Show cover</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFull(true)}>Full screen</button>
          </div>
        </aside>
      </div>
      <button type="button" className="btn btn-primary mobile-preview on" onClick={() => setFull(true)}>Preview card</button>
      {full && <InviteOverlay card={c} opts={{ guest: c.x_guestlinks ? sampleGuest(c) : '' }} closeLabel="← Back to editor" onClose={() => setFull(false)} />}
      <div className={`toast ${toast ? 'on' : ''}`} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}
