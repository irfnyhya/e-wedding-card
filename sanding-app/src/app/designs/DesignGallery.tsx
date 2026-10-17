'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Mini from '@/components/Mini';
import InviteOverlay from '@/components/InviteOverlay';
import { families } from '@/components/HomeCards';
import { CATS, SAMPLE, THEMES, TONES, toneOf, type Theme } from '@/lib/invite/engine';
import { NAMES_KEY, namesOverride, namesQuery, parseNames } from '@/lib/names';

const TONE_DOT: Record<string, string> = { merah: '#a3263a', coklat: '#a8834a', hijau: '#3c6a4a', biru: '#2d4b78', ungu: '#5d3a6a', gelap: '#1b1b1b', cerah: '#f3eee5', neutral: '#9b948a' };

export default function DesignGallery() {
  const [filter, setFilter] = useState('all');
  const [tone, setTone] = useState('all');
  const [open, setOpen] = useState<string | null>(null);
  // "Personalise preview": typed once, shown on every design, remembered on this device
  const [namesText, setNamesText] = useState('');
  const [applied, setApplied] = useState('');
  useEffect(() => {
    let v = '';
    try { v = localStorage.getItem(NAMES_KEY) || ''; } catch { /* private mode */ }
    if (!v) return;
    const t = setTimeout(() => { setNamesText(v); setApplied(v); }, 0);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    // repainting hundreds of thumbnails per keystroke is heavy, so wait for a pause in typing
    const t = setTimeout(() => {
      setApplied(namesText);
      try { if (namesText.trim()) localStorage.setItem(NAMES_KEY, namesText.trim()); else localStorage.removeItem(NAMES_KEY); } catch { /* private mode */ }
    }, 350);
    return () => clearTimeout(t);
  }, [namesText]);
  const names = useMemo(() => parseNames(applied), [applied]);
  const extra = useMemo(() => namesOverride(names), [names]);
  const pick = (t: Theme) => (filter === 'all' || t.fam === filter) && (tone === 'all' || toneOf(t) === tone);
  const shown = THEMES.filter(pick).length;
  return (
    <>
      <div className="personalise">
        <label htmlFor="pv-names">Personalise preview</label>
        <div className="row-line">
          <input id="pv-names" type="text" placeholder="Your names, e.g. Aisyah & Aiman" maxLength={81} autoComplete="off" value={namesText} onChange={(e) => setNamesText(e.target.value)} />
          {namesText && <button type="button" className="btn btn-ghost btn-sm" onClick={() => setNamesText('')}>Clear</button>}
        </div>
        <span className="hint">Every design below shows your names. Saved on this device only.</span>
      </div>
      <div className="filters" role="group" aria-label="Filter designs">
        {CATS.map(([k, l]) => <button key={k} type="button" className="chip" aria-pressed={k === filter} onClick={() => setFilter(k)}>{l}</button>)}
      </div>
      <div className="filters" role="group" aria-label="Filter by colour" style={{ marginTop: 10 }}>
        {TONES.map(([k, l]) => <button key={k} type="button" className="chip" aria-pressed={k === tone} onClick={() => setTone(k)}>
          {k !== 'all' && <i style={{ width: 10, height: 10, borderRadius: '50%', display: 'inline-block', background: TONE_DOT[k], border: '1px solid var(--line)' }} />}{l}</button>)}
      </div>
      <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>{shown} of {THEMES.length} designs</p>
      <div className="design-grid" style={{ marginTop: 28 }}>
        {families().filter(([k]) => THEMES.some((t) => t.fam === k && pick(t))).map(([k, f]) => (
          <section className="fam-block" key={k}>
            <div className="about"><p className="eyebrow">{f.meaning}</p><h2>{f.name}</h2><p className="muted">{f.blurb}</p></div>
            <div className="row">
              {THEMES.filter((t) => t.fam === k && pick(t)).map((t) => (
                <article className="dcard" key={t.id}>
                  <div className="slot">
                    <Mini template={t.id} face={k === 'sampul' ? 'cover' : 'page'} label={`Preview ${t.name}`} onOpen={() => setOpen(t.id)} extra={extra}>
                      <div className="hover"><span className="btn btn-sm" style={{ background: '#fbf8f2', color: '#221b17' }}>Open card</span></div>
                    </Mini>
                  </div>
                  <div className="meta">
                    <div style={{ minWidth: 0 }}><h3>{t.name}</h3><p>{t.desc}</p></div>
                    <Link className="btn btn-ghost btn-sm" href={`/create?fresh=1&template=${t.id}${namesQuery(names)}`}>Use</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      {open && <InviteOverlay card={{ ...SAMPLE, ...extra, template: open }} closeLabel="← Back to the collection" onClose={() => setOpen(null)} />}
    </>
  );
}
