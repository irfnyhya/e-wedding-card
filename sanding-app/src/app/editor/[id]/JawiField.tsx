'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { JAWI_DIGITS, JAWI_KEYS, jawiInitial } from '@/lib/jawi';

const MAX = 12; // matches sanitizeCard's jawi limit

/** Jawi initials input with a toggleable on-screen letter pad that types at the caret, and "Fill from names". */
export default function JawiField({ value, onChange, names, flash, script = 'jawi', onScript, scripts }: {
  value: string; onChange: (v: string) => void; names: [string, string]; flash: (m: string) => void;
  script?: string; onScript?: (k: string) => void; scripts?: Record<string, string>;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const caret = useRef<number | null>(null);

  // restore the caret after React re-renders the controlled input
  useLayoutEffect(() => {
    if (caret.current == null || !input.current) return;
    input.current.setSelectionRange(caret.current, caret.current);
    caret.current = null;
  }, [value]);

  function press(k: string) {
    const el = input.current; if (!el) return;
    const v = el.value;
    let st = el.selectionStart ?? v.length;
    const en = el.selectionEnd ?? v.length;
    if (k === 'clr') { caret.current = 0; onChange(''); return; }
    if (k === 'del') {
      if (st === en && st > 0) st--;
      caret.current = st; onChange(v.slice(0, st) + v.slice(en)); return;
    }
    const next = (v.slice(0, st) + k + v.slice(en));
    if (next.length > MAX) { flash(`Jawi initials can be up to ${MAX} characters.`); return; }
    caret.current = st + k.length; onChange(next);
  }

  function fill() {
    if (script === 'latin') { const v = names.map((n) => (n || 'A').trim()[0] || 'A').join(' & '); caret.current = v.length; onChange(v); flash(`Filled in: ${v}.`); return; }
    if (script !== 'jawi') { flash(script === 'chinese' ? 'Type the Chinese characters with your phone keyboard, e.g. 囍 or your surnames 李 王.' : 'Type the letters with your phone keyboard, e.g. அ & அ.'); input.current?.focus(); return; }
    const letters = names.map(jawiInitial);
    const v = letters.filter(Boolean).join(' ');
    if (!v) { flash('Add both cover names first (step 2).'); return; }
    const how = names.map((n, i) => (n && letters[i] ? `${n.trim().split(/\s+/)[0]} → ${letters[i]}` : '')).filter(Boolean).join(', ');
    if (v === value.trim()) { flash(`Already filled: ${how}.`); input.current?.focus(); return; }
    caret.current = v.length; onChange(v);
    flash(`Filled in: ${how}. Check the letters before you publish.`);
  }

  return (
    <div className="field">
      <label htmlFor="f-jawi">Monogram initials (optional)</label>
      {scripts && onScript && <div className="chips" role="group" aria-label="Monogram script" style={{ marginBottom: 8 }}>{Object.entries(scripts).map(([k, l]) => <button key={k} type="button" className="chip" aria-pressed={script === k} onClick={() => { onScript(k); if (k !== 'jawi') setOpen(false); }}>{l}</button>)}</div>}
      <input ref={input} type="text" id="f-jawi" dir="auto" placeholder={({ jawi: 'ع ا', latin: 'A & A', chinese: '囍 or 李 王', tamil: 'அ & அ' } as Record<string, string>)[script] || 'ع ا'} maxLength={MAX} value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="jawi-tools">
        <button type="button" className="btn btn-ghost btn-sm" onClick={fill}>Fill from names</button>
        {script === 'jawi' && <button type="button" className="btn btn-ghost btn-sm" aria-expanded={open} aria-controls="jawi-kb" onClick={() => { setOpen((o) => !o); input.current?.focus(); }}>Jawi keyboard</button>}
      </div>
      {/* mousedown is cancelled so the input keeps focus and its caret while letters are tapped */}
      <div className="jawi-kb" id="jawi-kb" hidden={!open || script !== 'jawi'} role="group" aria-label="Jawi letters" onMouseDown={(e) => e.preventDefault()}>
        <div className="jawi-digits">{JAWI_DIGITS.map((k) => <button key={k} type="button" aria-label={k} onClick={() => press(k)}>{k}</button>)}</div>
        {JAWI_KEYS.map((k) => <button key={k} type="button" aria-label={k} onClick={() => press(k)}>{k}</button>)}
        <button type="button" className="wide" onClick={() => press(' ')}>Space</button>
        <button type="button" className="wide" onClick={() => press('del')}>Delete</button>
        <button type="button" className="wide" onClick={() => press('clr')}>Clear</button>
      </div>
      <span className="hint">Shown on the cover of designs with a monogram and as a small seal inside the card. On the Jawi keyboard, the top row is Jawi numbers.</span>
    </div>
  );
}
