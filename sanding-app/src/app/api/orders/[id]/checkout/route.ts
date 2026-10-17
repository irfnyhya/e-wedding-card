import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, json, ownOrder, sameOrigin } from '@/lib/api';
import { missingField, needsPayment, quote, slugProblem, PKG } from '@/lib/card';
import { coverNames } from '@/lib/invite/engine';
import { createBill, provider } from '@/lib/payments';

// POST { slug, promo } -> creates a payment and a gateway bill, returns the URL to send the couple to.
export async function POST(req: NextRequest, ctx: RouteContext<'/api/orders/[id]/checkout'>) {
  if (!sameOrigin(req)) return fail('Bad origin.', 403);
  const r = await ownOrder((await ctx.params).id);
  if ('res' in r) return r.res;
  const { order, user } = r;
  const body = await req.json().catch(() => ({}));
  const admin = supabaseAdmin();

  const miss = missingField(order.content);
  if (miss) return fail(`Add ${miss[2]} first.`);

  let slug = order.slug;
  if (!slug) {
    slug = String(body.slug || '').toLowerCase();
    const problem = slugProblem(slug);
    if (problem) return fail(problem);
    const { data: taken } = await admin.from('orders').select('id').eq('slug', slug).neq('id', order.id).maybeSingle();
    const { data: held } = await admin.from('payments').select('order_id').eq('slug', slug).eq('status', 'pending')
      .neq('order_id', order.id).gt('created_at', new Date(Date.now() - 30 * 60e3).toISOString()).maybeSingle();
    if (taken || held) return fail(`That link is taken. Try adding the date, like ${slug}-1912.`, 409);
  }

  const q = quote(order.content, order.package, body.promo, order.addon_own);
  if (order.status === 'live' && !needsPayment(order.content, order.package, order.addon_own)) return fail('Your package already covers this card.');
  if (q.totalCents < 100) return fail('Nothing to pay.');

  const { data: pay, error } = await admin.from('payments').insert({
    order_id: order.id, owner_id: user.id, provider: provider(), package: q.pkg, addon_own: q.addonOwn, slug, amount_cents: q.totalCents, promo: q.promo,
  }).select('id').single();
  if (error || !pay) return fail(error?.message || 'Could not start payment.', 500);

  try {
    const names = coverNames(order.content).join(' & ');
    const bill = await createBill({
      paymentId: pay.id, orderId: order.id, amountCents: q.totalCents,
      name: `Sanding ${PKG[q.pkg].name}${q.addonOwn ? ' plus design' : ''}`, description: `Kad kahwin digital ${names} ${slug}`,
      email: user.email || 'customer@example.com', payerName: names,
    });
    await admin.from('payments').update({ bill_code: bill.billCode }).eq('id', pay.id);
    return json({ paymentUrl: bill.paymentUrl, billCode: bill.billCode });
  } catch (e) {
    await admin.from('payments').update({ status: 'failed', raw: { error: String(e) } }).eq('id', pay.id);
    console.error(e);
    return fail('The payment gateway did not respond. Try again in a moment.', 502);
  }
}
