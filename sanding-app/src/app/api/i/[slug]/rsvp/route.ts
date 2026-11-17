import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, ipHash, json } from '@/lib/api';
import { rsvpCode } from '@/lib/invite/engine';

const MSG: Record<string, [string, number]> = {
  not_found: ['This card is no longer available.', 404],
  rsvp_off: ['RSVP is not open for this card.', 403],
  closed: ['RSVP is now closed.', 403],
  rate: ['Too many replies from this connection. Please wait a few minutes and try again.', 429],
  phone: ['Please enter a valid phone number.', 400],
};

// Anonymous guest RSVP. Validation, deadline, pax cap and rate limits run inside submit_rsvp().
// Returns the guest pass (code + QR text) the card shows when the couple turned on the e-pass.
export async function POST(req: NextRequest, ctx: RouteContext<'/api/i/[slug]/rsvp'>) {
  const { slug } = await ctx.params;
  const b = await req.json().catch(() => null);
  if (!b || b.website) return json({ ok: true }); // honeypot: bots fill hidden fields
  const name = String(b.name || '').trim(), phone = String(b.phone || '').trim();
  if (!name || name.length > 60) return fail('Please enter your name.');
  if (phone.length < 6 || phone.length > 20) return fail(MSG.phone[0]);
  const side = b.side === 'bride' || b.side === 'groom' ? b.side : '';
  // p_side only when the guest picked one, so cards without the question keep using the older function signature
  const args = {
    p_slug: slug, p_guest_token: String(b.guest || ''), p_name: name, p_phone: phone,
    p_attending: !!b.attending, p_pax: Number(b.pax) || 0, p_note: String(b.note || '').slice(0, 120), p_ip_hash: ipHash(req),
  };
  let { data, error } = await supabaseAdmin().rpc('submit_rsvp', side ? { ...args, p_side: side } : args);
  // Before the rsvp_side migration runs there is no p_side overload: save the reply without the side.
  if (error && side && error.code === 'PGRST202') ({ data, error } = await supabaseAdmin().rpc('submit_rsvp', args));
  if (error) { console.error(error); return fail('Could not save. Please try again.', 500); }
  if (data?.error) { const [m, s] = MSG[data.error] || ['Could not save.', 400]; return fail(m, s); }
  return json({ ok: true, pass: { name, pax: data.pax, code: rsvpCode(data.id), qr: `SANDING:${slug}:${data.id}` } });
}
