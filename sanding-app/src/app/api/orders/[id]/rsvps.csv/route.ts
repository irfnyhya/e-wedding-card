import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, ownOrder } from '@/lib/api';
import { rsvpCode } from '@/lib/invite/engine';

// GET -> guest list as CSV (Diraja), with notes, e-pass codes and check-ins.
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/orders/[id]/rsvps.csv'>) {
  const r = await ownOrder((await ctx.params).id);
  if ('res' in r) return r.res;
  if (r.order.package !== 'diraja') return fail('CSV export comes with the Diraja package.', 402);
  const admin = supabaseAdmin();
  const { data } = await admin.from('rsvps').select('id, name, phone, attending, pax, note, created_at, updated_at, guests(name)')
    .eq('order_id', r.order.id).order('created_at', { ascending: false });
  const { data: ci } = await admin.from('checkins').select('rsvp_id').eq('order_id', r.order.id);
  const arrived = new Set((ci || []).map((x) => x.rsvp_id));
  // Leading = + - @ would run as formulas in spreadsheets.
  const q = (s: unknown) => `"${String(s ?? '').replace(/^([=+\-@])/, "'$1").replace(/"/g, '""')}"`;
  const rows = (data || []).map((x) => [x.name, x.phone, x.attending ? 'Attending' : 'Not attending', x.attending ? x.pax : 0, x.note || '',
    rsvpCode(x.id), arrived.has(x.id) ? 'Yes' : '', (x.guests as unknown as { name: string } | null)?.name || '', x.updated_at || x.created_at].map(q).join(','));
  const csv = '﻿' + ['Name,Phone,Reply,Pax,Note,Code,Checked in,Guest link,Received', ...rows].join('\r\n');
  return new Response(csv, {
    headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="rsvp-${r.order.slug || r.order.id}.csv"` },
  });
}
