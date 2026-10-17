import { randomBytes } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, json, ownOrder, sameOrigin } from '@/lib/api';

const token = () => Array.from(randomBytes(8), (b) => 'abcdefghjkmnpqrstuvwxyz23456789'[b % 31]).join('');

// PUT { names: string[] } -> keeps existing links for names still on the list, adds new ones, removes the rest.
export async function PUT(req: NextRequest, ctx: RouteContext<'/api/orders/[id]/guests'>) {
  if (!sameOrigin(req)) return fail('Bad origin.', 403);
  const r = await ownOrder((await ctx.params).id);
  if ('res' in r) return r.res;
  if (r.order.package !== 'diraja') return fail('Personal guest links come with the Diraja package.', 402);
  const body = await req.json().catch(() => ({}));
  const names: string[] = Array.isArray(body.names) ? [...new Set<string>(body.names.map((n: unknown) => String(n).trim().slice(0, 80)).filter(Boolean))].slice(0, 1000) : [];
  const admin = supabaseAdmin();
  const { data: existing } = await admin.from('guests').select('id, name').eq('order_id', r.order.id);
  const byName = new Map((existing || []).map((g) => [g.name, g.id]));
  const keep = new Set<string>();
  const inserts: { order_id: string; token: string; name: string; sort: number }[] = [];
  const updates: { id: string; sort: number }[] = [];
  names.forEach((name, sort) => {
    const id = byName.get(name);
    if (id) { keep.add(id); updates.push({ id, sort }); } else inserts.push({ order_id: r.order.id, token: token(), name, sort });
  });
  const remove = (existing || []).filter((g) => !keep.has(g.id)).map((g) => g.id);
  if (remove.length) await admin.from('guests').delete().in('id', remove);
  for (const u of updates) await admin.from('guests').update({ sort: u.sort }).eq('id', u.id);
  if (inserts.length) {
    const { error } = await admin.from('guests').insert(inserts);
    if (error) return fail(error.message, 500);
  }
  const { data } = await admin.from('guests').select('id, token, name, sort').eq('order_id', r.order.id).order('sort');
  return json({ guests: data || [] });
}
