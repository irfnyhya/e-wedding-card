import { randomBytes } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, ipHash, json } from '@/lib/api';
import { rank } from '@/lib/card';

const MSG: Record<string, [string, number]> = {
  not_found: ['This card is no longer available.', 404],
  off: ['The wishlist is not open for this card.', 403],
  item: ['That item is no longer on the list.', 404],
  taken: ['Someone has just reserved that item.', 409],
  rate: ['Too many reservations from this connection. Please wait a few minutes.', 429],
  not_yours: ['Only the guest who reserved this item can cancel it.', 403],
};
const answer = (data: { error?: string } | null, ok: object) => {
  if (data?.error) { const [m, s] = MSG[data.error] || ['Could not save.', 400]; return fail(m, s); }
  return json(ok);
};

// GET: which wishlist items are taken. Guests see only that an item is taken, never by whom.
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/i/[slug]/reserves'>) {
  const { slug } = await ctx.params;
  const admin = supabaseAdmin();
  const { data: o } = await admin.from('orders').select('id, package, content').eq('slug', slug).eq('status', 'live').maybeSingle();
  if (!o || !o.content?.x_wishlist || rank(o.package) < 1) return json({ reserves: [] });
  const { data } = await admin.from('reserves').select('item_key').eq('order_id', o.id);
  return json({ reserves: (data || []).map((r) => ({ id: r.item_key })) });
}

// POST { key, name } -> reserves an item and returns the secret the guest's browser keeps to cancel it.
export async function POST(req: NextRequest, ctx: RouteContext<'/api/i/[slug]/reserves'>) {
  const { slug } = await ctx.params;
  const b = await req.json().catch(() => null);
  if (!b || b.website) return json({ ok: true });
  const name = String(b.name || '').trim();
  if (!name || name.length > 40) return fail('Please enter your name.');
  const secret = randomBytes(18).toString('base64url');
  const { data, error } = await supabaseAdmin().rpc('submit_reserve', { p_slug: slug, p_key: String(b.key || ''), p_name: name, p_secret: secret, p_ip_hash: ipHash(req) });
  if (error) { console.error(error); return fail('Could not save. Please try again.', 500); }
  return answer(data, { ok: true, secret });
}

// DELETE { key, secret } -> cancels the guest's own reservation.
export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/i/[slug]/reserves'>) {
  const { slug } = await ctx.params;
  const b = await req.json().catch(() => null);
  if (!b?.key || !b?.secret) return fail('Missing reservation.');
  const { data, error } = await supabaseAdmin().rpc('cancel_reserve', { p_slug: slug, p_key: String(b.key), p_secret: String(b.secret) });
  if (error) { console.error(error); return fail('Could not cancel. Please try again.', 500); }
  return answer(data, { ok: true });
}
