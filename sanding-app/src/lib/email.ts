import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { PKG, SITE_URL, displayLink, rank, sanitizeCard, type PackageId } from '@/lib/card';
import { coverNames, fmtDate } from '@/lib/invite/engine';
import { welcomeEmail } from '@/lib/welcome-email';

// Transactional email through Resend's HTTP API (https://resend.com/docs/api-reference/emails/send-email).
// Needs RESEND_API_KEY and EMAIL_FROM (an address on a domain verified in Resend). Without them nothing is
// sent and the app carries on: the guide is also linked from the success page and the dashboard.

async function send(to: string, subject: string, html: string, text: string) {
  const key = (process.env.RESEND_API_KEY || '').trim(), from = (process.env.EMAIL_FROM || '').trim();
  if (!key || !from) { console.warn('email skipped: RESEND_API_KEY or EMAIL_FROM not set'); return false; }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html, text, reply_to: process.env.EMAIL_REPLY_TO || undefined }),
    cache: 'no-store',
  });
  if (!res.ok) { console.error('email failed', res.status, (await res.text()).slice(0, 300)); return false; }
  return true;
}

/** "Your card is live" with the link, the dashboard steps and the guide. Sent once, when a card is first published. */
export async function sendWelcome(orderId: string) {
  const admin = supabaseAdmin();
  const { data: o } = await admin.from('orders').select('id, owner_id, slug, package, valid_until, content').eq('id', orderId).single();
  if (!o?.slug) return false;
  const { data: u } = await admin.auth.admin.getUserById(o.owner_id);
  const to = u?.user?.email;
  if (!to) return false;

  const card = sanitizeCard(o.content), names = coverNames(card).join(' & ');
  const pkg = o.package as PackageId, permata = rank(pkg) >= 1, diraja = pkg === 'diraja';
  const link = `${SITE_URL}/${o.slug}`, dash = `${SITE_URL}/dashboard?card=${o.id}`, guide = `${SITE_URL}/guide`;
  const until = o.valid_until ? new Date(o.valid_until).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  const { subject, html, text } = welcomeEmail({
    names, dateText: fmtDate(card.date, 'en'), venue: card.venue, pkgName: PKG[pkg]?.name || '', permata, diraja,
    link, linkText: displayLink(o.slug), dash, guide, until,
  });
  return send(to, subject, html, text);
}
