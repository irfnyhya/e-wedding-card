import 'server-only';
import { createHash } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { currentUser } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sanitizeCard, type Card } from '@/lib/card';

export const json = (body: unknown, status = 200) => NextResponse.json(body, { status });
export const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

/** Salted hash of the caller's IP, so rate limits work without storing addresses. */
export function ipHash(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'local';
  return createHash('sha256').update((process.env.RATE_LIMIT_SALT || 'sanding') + ip).digest('hex').slice(0, 32);
}

export type OrderRow = {
  id: string; owner_id: string; slug: string | null; status: 'draft' | 'live'; package: string | null; addon_own: boolean;
  paid_cents: number; content: Card; published_at: string | null; valid_until: string | null; created_at: string; updated_at: string;
};

/** Loads an order the signed-in user owns, or returns an error response. */
export async function ownOrder(id: string): Promise<{ order: OrderRow; user: { id: string; email?: string } } | { res: NextResponse }> {
  const { user } = await currentUser();
  if (!user) return { res: fail('Sign in first.', 401) };
  if (!/^[0-9a-f-]{36}$/.test(id)) return { res: fail('Card not found.', 404) };
  const { data } = await supabaseAdmin().from('orders').select('*').eq('id', id).single();
  if (!data || data.owner_id !== user.id) return { res: fail('Card not found.', 404) };
  return { order: { ...data, content: sanitizeCard(data.content) } as OrderRow, user };
}

/** Same-origin check for browser POSTs that change data. */
export function sameOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  return !origin || origin === req.nextUrl.origin;
}
