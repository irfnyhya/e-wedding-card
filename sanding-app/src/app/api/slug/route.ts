import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { json } from '@/lib/api';
import { slugProblem } from '@/lib/card';

// GET ?s=slug&order=id -> { available } for the checkout link field.
export async function GET(req: NextRequest) {
  const s = (req.nextUrl.searchParams.get('s') || '').toLowerCase();
  const order = req.nextUrl.searchParams.get('order') || '';
  if (slugProblem(s)) return json({ available: false });
  const { data } = await supabaseAdmin().from('orders').select('id').eq('slug', s).maybeSingle();
  return json({ available: !data || data.id === order });
}
