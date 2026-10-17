'use client';
import { useEffect, useMemo } from 'react';
import Invite from './Invite';
import type { Card } from '@/lib/card';
import type { GuestPass, InviteOptions, InviteWish, Reserve } from '@/lib/invite/engine';

const store = {
  get: <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set: (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } },
};

async function call(url: string, method: string, body: unknown) {
  const r = await fetch(url, { method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const b = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(b.error || 'Could not save. Check your connection and try again.');
  return b;
}

/** Polls a public endpoint while the card is open (and the tab visible), feeding the engine's subscribe hooks. */
function poll<T>(url: string, pick: (b: unknown) => T, cb: (v: T) => void, every = 20000) {
  let alive = true;
  const load = async () => {
    const b = await fetch(url, { cache: 'no-store' }).then((x) => x.json()).catch(() => null);
    if (alive && b) cb(pick(b));
  };
  load();
  const t = setInterval(() => { if (!document.hidden) load(); }, every);
  return { refresh: load, stop: () => { alive = false; clearInterval(t); } };
}

/** The guest-facing card, wired to the public RSVP, wishes, wishlist, counter and view endpoints. */
export default function LiveInvite({ card, slug, guest, sample }: { card: Card; slug: string; guest: { token: string; name: string } | null; sample?: boolean }) {
  // count one open per browser per day
  useEffect(() => {
    if (sample) return;
    const day = new Date().toISOString().slice(0, 10);
    const key = `sanding-view-${slug}-${day}`;
    if (store.get(key, false)) return;
    let visitor = store.get('sanding-visitor', '');
    if (!visitor) { visitor = Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => (b % 36).toString(36)).join(''); store.set('sanding-visitor', visitor); }
    store.set(key, true);
    fetch(`/api/i/${encodeURIComponent(slug)}/view`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ visitor, guest: guest?.token || '' }) }).catch(() => {});
  }, [slug, guest, sample]);

  // the engine keys "my reservations" in localStorage by card id; the slug identifies a live card
  const shown = useMemo(() => ({ ...card, id: sample ? 'contoh' : slug, slug }), [card, slug, sample]);

  const opts = useMemo<InviteOptions>(() => {
    if (sample) return { mode: 'live' };
    const base = `/api/i/${encodeURIComponent(slug)}`;
    const rsvpKey = `sanding-rsvp-${slug}`;
    const secretKey = (k: string) => `sanding-res-secret-${slug}-${k}`;
    let refreshWishes: (() => void) | undefined;
    let refreshReserves: (() => void) | undefined;
    return {
      mode: 'live',
      guest: guest?.name || '',
      rsvpDone: () => store.get<GuestPass | string | null>(rsvpKey, null),
      onRsvp: async (d) => {
        const b = await call(`${base}/rsvp`, 'POST', { ...d, guest: guest?.token || '' });
        const pass: GuestPass = b.pass;
        store.set(rsvpKey, d.attending ? pass : d.name);
        return pass;
      },
      onWish: async (d) => { await call(`${base}/wishes`, 'POST', d); refreshWishes?.(); },
      subscribeWishes: card.x_wishes ? (cb) => {
        const p = poll(`${base}/wishes`, (b) => (b as { wishes: InviteWish[] }).wishes || [], cb);
        refreshWishes = p.refresh;
        return p.stop;
      } : null,
      subscribeReserves: card.x_wishlist ? (cb) => {
        const p = poll(`${base}/reserves`, (b) => (b as { reserves: Reserve[] }).reserves || [], cb);
        refreshReserves = p.refresh;
        return p.stop;
      } : null,
      onReserve: async (key, d) => {
        try {
          const b = await call(`${base}/reserves`, 'POST', { key, name: d.name });
          if (b.secret) store.set(secretKey(key), b.secret);
        } finally { refreshReserves?.(); }
      },
      onUnreserve: async (key) => {
        const secret = store.get(secretKey(key), '');
        try { if (secret) await call(`${base}/reserves`, 'DELETE', { key, secret }); }
        finally { store.set(secretKey(key), ''); refreshReserves?.(); }
      },
      subscribeRsvps: card.x_counter ? (cb) => poll(`${base}/count`, (b) => {
        const { pax = 0, no = 0 } = b as { pax: number; no: number };
        return [{ attending: true, pax }, ...Array.from({ length: no }, () => ({ attending: false, pax: 0 }))];
      }, cb, 30000).stop : null,
    };
  }, [slug, guest, sample, card.x_wishes, card.x_wishlist, card.x_counter]);

  return (
    <div className="inv-page">
      <Invite className="inv-host" card={shown} opts={opts} />
    </div>
  );
}
