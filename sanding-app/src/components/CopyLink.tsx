'use client';
import { useState } from 'react';
import { copyText } from '@/lib/invite/engine';

export default function CopyLink({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="linkbox">
      <code>{label}</code>
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => copyText(text, () => { setDone(true); setTimeout(() => setDone(false), 1600); })}>{done ? 'Copied' : 'Copy'}</button>
    </div>
  );
}
