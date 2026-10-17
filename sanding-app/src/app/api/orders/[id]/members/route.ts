import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, json, ownOrder, sameOrigin } from '@/lib/api';
import { SITE_URL } from '@/lib/card';
import { MAX_MEMBERS, newInviteToken, normEmail, validEmail } from '@/lib/share';

const COLS = 'id, email, created_at, accepted_at';

// GET -> who has family access to this card (owner only).
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/orders/[id]/members'>) {
  const r = await ownOrder((await ctx.params).id);
  if ('res' in r) return r.res;
  const { data } = await supabaseAdmin().from('order_members').select(COLS).eq('order_id', r.order.id).order('created_at');
  return json({ members: data || [] });
}

// POST { email } -> invites a relative. Emails a sign-in link that lands on /share/<token>, and returns
// the same link so the couple can also send it on WhatsApp. A repeat invite replaces the old token.
export async function POST(req: NextRequest, ctx: RouteContext<'/api/orders/[id]/members'>) {
  if (!sameOrigin(req)) return fail('Bad origin.', 403);
  const r = await ownOrder((await ctx.params).id);
  if ('res' in r) return r.res;
  const body = await req.json().catch(() => ({}));
  const email = normEmail(body.email);
  if (!validEmail(email)) return fail('Enter a valid email address.');
  if (email === normEmail(r.user.email)) return fail('That is your own email. You already have access.');
  const admin = supabaseAdmin();
  const { data: ok } = await admin.rpc('rate_hit', { p_key: `invite:${r.user.id}`, max_hits: 20, window_s: 3600 });
  if (ok === false) return fail('Too many invites. Try again in an hour.', 429);
  const { data: existing } = await admin.from('order_members').select('id, user_id').eq('order_id', r.order.id).eq('email', email).maybeSingle();
  if (!existing) {
    const { count } = await admin.from('order_members').select('id', { count: 'exact', head: true }).eq('order_id', r.order.id);
    if ((count || 0) >= MAX_MEMBERS) return fail(`A card can be shared with up to ${MAX_MEMBERS} people. Remove someone first.`, 409);
  }
  const { token, hash } = newInviteToken();
  const row = existing
    ? await admin.from('order_members').update({ token_hash: hash }).eq('id', existing.id).select(COLS).single()
    : await admin.from('order_members').insert({ order_id: r.order.id, email, token_hash: hash, invited_by: r.user.id }).select(COLS).single();
  if (row.error || !row.data) return fail(row.error?.message || 'Could not save the invite.', 500);
  const link = `${SITE_URL}/share/${token}`;

  // Supabase Auth sends the email (Inbucket locally). Its magic-link template points at /auth/confirm,
  // which signs them in and continues to the invite link. Failure here still leaves the copyable link.
  let emailed = true;
  try {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await anon.auth.signInWithOtp({ email, options: { emailRedirectTo: link, shouldCreateUser: true } });
    if (error) throw error;
  } catch (e) { emailed = false; console.error('invite email', e); }
  return json({ member: row.data, link, emailed }, existing ? 200 : 201);
}

// DELETE { id } -> removes someone's access.
export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/orders/[id]/members'>) {
  if (!sameOrigin(req)) return fail('Bad origin.', 403);
  const r = await ownOrder((await ctx.params).id);
  if ('res' in r) return r.res;
  const body = await req.json().catch(() => ({}));
  if (typeof body.id !== 'string' || !/^[0-9a-f-]{36}$/.test(body.id)) return fail('Unknown invite.');
  const { error } = await supabaseAdmin().from('order_members').delete().eq('id', body.id).eq('order_id', r.order.id);
  if (error) return fail(error.message, 500);
  return json({ ok: true });
}
