'use client';
import { useEffect, useRef } from 'react';
import { Music, renderInvite } from '@/lib/invite/engine';
import type { InviteOptions } from '@/lib/invite/engine';
import type { Card } from '@/lib/card';
import qrcode from 'qrcode-generator';

// The engine's e-pass looks for window.qrcode before fetching it from a CDN; bundle it instead.
if (typeof window !== 'undefined') (window as unknown as { qrcode?: unknown }).qrcode ??= qrcode;

/** Mounts the vanilla invitation renderer into a React-managed host element. */
export default function Invite({ card, opts, className, style }: { card: Partial<Card>; opts?: InviteOptions; className?: string; style?: React.CSSProperties }) {
  const host = useRef<HTMLDivElement>(null);
  const optsRef = useRef(opts);
  useEffect(() => { optsRef.current = opts; });
  const key = JSON.stringify(card) + '|' + (opts?.mode || '') + '|' + (opts?.face || '') + '|' + (opts?.guest || '');
  useEffect(() => {
    if (!host.current) return;
    renderInvite(host.current, card, optsRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => () => { if (opts?.mode !== 'thumb') Music.stop(); }, [opts?.mode]);
  return <div ref={host} className={className} style={style} />;
}
