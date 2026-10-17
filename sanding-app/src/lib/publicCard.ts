import 'server-only';
import { cache } from 'react';
import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { gate, sanitizeCard, SLUG_RE, type Card } from '@/lib/card';
import { coverNames, fmtDate, SAMPLE, T } from '@/lib/invite/engine';
import { ogImageOf } from '@/lib/og';

export type PublicCard =
  | { kind: 'ok'; card: Card; slug: string; guest: { token: string; name: string } | null; sample?: boolean }
  | { kind: 'missing' | 'expired'; slug: string };

/** Loads what a guest may see: live, unexpired, with unpaid extras switched off. */
export const loadPublicCard = cache(async (slug: string, guestToken?: string): Promise<PublicCard> => {
  if (slug === 'contoh') return { kind: 'ok', card: sanitizeCard(SAMPLE), slug, guest: null, sample: true };
  if (!SLUG_RE.test(slug)) return { kind: 'missing', slug };
  const admin = supabaseAdmin();
  const { data: o } = await admin.from('orders').select('id, package, addon_own, content, valid_until').eq('slug', slug).eq('status', 'live').maybeSingle();
  if (!o) return { kind: 'missing', slug };
  if (o.valid_until && new Date(o.valid_until) < new Date()) return { kind: 'expired', slug };
  const card = gate(sanitizeCard(o.content), o.package, o.addon_own);
  let guest = null;
  if (guestToken && card.x_guestlinks && /^[a-z0-9]{4,16}$/.test(guestToken)) {
    const { data: g } = await admin.from('guests').select('token, name').eq('order_id', o.id).eq('token', guestToken).maybeSingle();
    guest = g;
  }
  return { kind: 'ok', card, slug, guest };
});

export function cardMetadata(p: PublicCard): Metadata {
  if (p.kind !== 'ok') return { title: 'Card not found', robots: { index: false } };
  const c = p.card;
  const names = coverNames(c).join(' & ');
  const title = `${T[c.lang].ev[c.eventTitle]} · ${names}`;
  const description = [fmtDate(c.date, c.lang), c.venue].filter(Boolean).join(' · ');
  const image = ogImageOf(c);
  return {
    title: { absolute: title }, description, robots: { index: false },
    openGraph: { title, description, type: 'website', ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: names }] } : {}) },
    twitter: image ? { card: 'summary_large_image', title, description, images: [image] } : { card: 'summary', title, description },
  };
}
