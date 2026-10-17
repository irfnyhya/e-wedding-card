'use client';
import { useRef, useState } from 'react';
import Mini from './Mini';
import Invite from './Invite';
import InviteOverlay from './InviteOverlay';
import { A, dotColor, FAMILIES, Music, SAMPLE, THEMES, themeOf, type FamilyId } from '@/lib/invite/engine';

const faceOf = (fam: FamilyId) => (fam === 'sampul' ? 'cover' : 'page');
/** Families that have at least one colourway, in collection order. */
export const families = () => (Object.entries(FAMILIES) as [FamilyId, (typeof FAMILIES)[FamilyId]][]).filter(([k]) => THEMES.some((t) => t.fam === k));

/** Flat-lay of three real cards, a loose wax seal and a cut rose on a linen table. */
export function HeroTable() {
  return (
    <div className="table" aria-label="Three Sanding cards on a table">
      <Mini template="mihrab-zamrud" face="page" style={{ width: '40%', left: '52%', top: '5%', transform: 'rotate(7deg)' }} />
      <Mini template="sampul-gading" face="cover" style={{ width: '42%', left: '6%', top: '9%', transform: 'rotate(-8deg)' }} />
      <Mini template="ukiran-sepia" face="page" style={{ width: '40%', left: '31%', top: '40%', transform: 'rotate(2deg)', zIndex: 2 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="prop" src={`${A}flower-cabbage-rose.webp`} alt="" style={{ width: '38%', right: '-9%', bottom: '-6%', transform: 'rotate(-28deg)', zIndex: 3, filter: 'drop-shadow(0 10px 10px rgba(30,18,10,.35))' }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="prop" src={`${A}seal-merah.webp`} alt="" style={{ width: '15%', left: '9%', bottom: '8%', zIndex: 3, transform: 'rotate(18deg)', filter: 'drop-shadow(0 4px 4px rgba(30,18,10,.4))' }} />
    </div>
  );
}

/** One column per family, with colourway dots that swap the card shown. */
export function Families() {
  const [pick, setPick] = useState<Record<string, string>>(() =>
    Object.fromEntries(families().map(([k]) => [k, THEMES.find((t) => t.fam === k)!.id])));
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="families">
      {families().map(([k, f]) => {
        const list = THEMES.filter((t) => t.fam === k);
        const id = pick[k];
        return (
          <article className="fam" key={k}>
            <div className="slot"><Mini key={id} template={id} face={faceOf(k)} label={`Open ${themeOf(id).name}`} onOpen={() => setOpen(id)} /></div>
            <div><p className="mean">{f.meaning}</p><h3>{f.name}</h3></div>
            <p>{f.blurb}</p>
            <div className="dots" role="group" aria-label={`${f.name} colourways`}>
              {list.map((t) => (
                <button key={t.id} type="button" aria-pressed={t.id === id} aria-label={t.name} onClick={() => setPick((p) => ({ ...p, [k]: t.id }))}
                  style={{ background: dotColor(t) }} />
              ))}
              <span>{themeOf(id).name}</span>
            </div>
          </article>
        );
      })}
      {open && <InviteOverlay card={{ ...SAMPLE, template: open }} closeLabel="← Back" onClose={() => setOpen(null)} />}
    </div>
  );
}

/** A working card in a phone, one tab per family. */
export function Demo() {
  const [fam, setFam] = useState<FamilyId>('sampul');
  const screen = useRef<HTMLDivElement>(null);
  const id = THEMES.find((t) => t.fam === fam)!.id;
  return (
    <div className="wrap demo">
      <div className="demo-copy">
        <p className="eyebrow">Try it</p>
        <h2>Open a card the way your guests will</h2>
        <p className="lead">This is a working card with sample details. Open it, scroll through, try the RSVP form and the Waze button.</p>
        <div className="demo-tabs" role="group" aria-label="Choose a family">
          {families().map(([k, f]) => (
            <button key={k} type="button" aria-pressed={k === fam} onClick={() => { Music.stop(); setFam(k); }}>{f.name}</button>
          ))}
        </div>
        <button type="button" className="btn btn-ghost-light btn-sm" onClick={() => { Music.stop(); (screen.current?.querySelector('.inv') as (HTMLElement & { reopen?: () => void }) | null)?.reopen?.(); }}>Close the card again</button>
      </div>
      <div className="phone" ref={screen}><Invite className="screen" card={{ ...SAMPLE, template: id }} opts={{ mode: 'preview' }} /><div className="notch" /></div>
    </div>
  );
}
