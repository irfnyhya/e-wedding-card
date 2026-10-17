import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, json, ownOrder, sameOrigin } from '@/lib/api';
import { needPkg, needsPayment, sanitizeCard } from '@/lib/card';

// PATCH: save card content. Live cards keep their slug and package; extras above the paid
// package are stored but stay hidden from guests until the upgrade is paid.
export async function PATCH(req: NextRequest, ctx: RouteContext<'/api/orders/[id]'>) {
  if (!sameOrigin(req)) return fail('Bad origin.', 403);
  const r = await ownOrder((await ctx.params).id);
  if ('res' in r) return r.res;
  const body = await req.json().catch(() => null);
  if (!body?.content) return fail('Nothing to save.');
  const content = sanitizeCard(body.content);
  const { error } = await supabaseAdmin().from('orders').update({ content, updated_at: new Date().toISOString() }).eq('id', r.order.id);
  if (error) return fail(error.message, 500);
  const need = needPkg(content).id;
  return json({ ok: true, needsUpgrade: r.order.status === 'live' && needsPayment(content, r.order.package, r.order.addon_own), need });
}

// DELETE: remove the card, its replies, wishes, guest links and uploaded media.
export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/orders/[id]'>) {
  if (!sameOrigin(req)) return fail('Bad origin.', 403);
  const r = await ownOrder((await ctx.params).id);
  if ('res' in r) return r.res;
  const admin = supabaseAdmin();
  const folder = `${r.user.id}/${r.order.id}`;
  const { data: files } = await admin.storage.from('card-media').list(folder, { limit: 100 });
  if (files?.length) await admin.storage.from('card-media').remove(files.map((f) => `${folder}/${f.name}`));
  const { error } = await admin.from('orders').delete().eq('id', r.order.id);
  if (error) return fail(error.message, 500);
  return json({ ok: true });
}
