import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { json } from '@/lib/api';
import { rank } from '@/lib/card';

// GET -> { pax, no } for the live attendance counter (Premium). Totals only, no names.
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/i/[slug]/count'>) {
  const { slug } = await ctx.params;
  const admin = supabaseAdmin();
  const { data: o } = await admin.from('orders').select('id, package, content').eq('slug', slug).eq('status', 'live').maybeSingle();
  if (!o || !o.content?.x_counter || rank(o.package) < 1) return json({ pax: 0, no: 0 });
  const { data } = await admin.from('rsvps').select('attending, pax').eq('order_id', o.id);
  const list = data || [];
  return json({ pax: list.filter((r) => r.attending).reduce((s, r) => s + (r.pax || 0), 0), no: list.filter((r) => !r.attending).length });
}
