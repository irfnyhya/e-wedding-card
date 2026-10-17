import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, ipHash, json } from '@/lib/api';
import { rank } from '@/lib/card';

// GET: visible wishes for a live card (polled by the invitation). POST: anonymous wish, rate-limited.
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/i/[slug]/wishes'>) {
  const { slug } = await ctx.params;
  const admin = supabaseAdmin();
  const { data: o } = await admin.from('orders').select('id, package, content, valid_until').eq('slug', slug).eq('status', 'live').maybeSingle();
  if (!o || !o.content?.x_wishes || rank(o.package) < 1 || (o.valid_until && new Date(o.valid_until) < new Date())) return json({ wishes: [] });
  const { data } = await admin.from('wishes').select('id, name, msg, created_at').eq('order_id', o.id).eq('hidden', false)
    .order('created_at', { ascending: false }).limit(200);
  return json({ wishes: (data || []).map((w) => ({ id: w.id, name: w.name, msg: w.msg, at: w.created_at })) }, 200);
}

const MSG: Record<string, [string, number]> = {
  not_found: ['This card is no longer available.', 404],
  wishes_off: ['Wishes are not open for this card.', 403],
  rate: ['You have sent several wishes already. Please wait a few minutes.', 429],
};

export async function POST(req: NextRequest, ctx: RouteContext<'/api/i/[slug]/wishes'>) {
  const { slug } = await ctx.params;
  const b = await req.json().catch(() => null);
  if (!b || b.website) return json({ ok: true });
  const name = String(b.name || '').trim(), msg = String(b.msg || '').trim();
  if (!name || name.length > 60) return fail('Please enter your name.');
  if (!msg || msg.length > 400) return fail('Please write a wish of up to 400 characters.');
  const { data, error } = await supabaseAdmin().rpc('submit_wish', { p_slug: slug, p_name: name, p_msg: msg, p_ip_hash: ipHash(req) });
  if (error) { console.error(error); return fail('Could not save. Please try again.', 500); }
  if (data?.error) { const [m, s] = MSG[data.error] || ['Could not save.', 400]; return fail(m, s); }
  return json({ ok: true, wish: data.wish });
}
