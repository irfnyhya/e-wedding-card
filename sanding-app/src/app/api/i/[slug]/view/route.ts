import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { ipHash, json } from '@/lib/api';

// POST { visitor, guest } -> counts one card open per browser per day for the dashboard.
export async function POST(req: NextRequest, ctx: RouteContext<'/api/i/[slug]/view'>) {
  const { slug } = await ctx.params;
  const b = await req.json().catch(() => null);
  if (!b) return json({ ok: true });
  await supabaseAdmin().rpc('record_view', {
    p_slug: slug, p_visitor: String(b.visitor || '').toLowerCase().slice(0, 40), p_guest_token: String(b.guest || ''), p_ip_hash: ipHash(req),
  });
  return json({ ok: true });
}
