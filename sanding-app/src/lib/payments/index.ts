import 'server-only';
import { createHash } from 'node:crypto';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { SITE_URL } from '@/lib/card';

// Payment gateway adapter. PAYMENT_PROVIDER=toyyibpay talks to ToyyibPay (dev.toyyibpay.com in sandbox);
// PAYMENT_PROVIDER=mock serves a local stand-in page so the full flow runs without gateway credentials.

export type Provider = 'toyyibpay' | 'mock';
export const provider = (): Provider => (process.env.PAYMENT_PROVIDER === 'toyyibpay' ? 'toyyibpay' : 'mock');

const tpBase = () => (process.env.TOYYIBPAY_SANDBOX === 'false' ? 'https://toyyibpay.com' : 'https://dev.toyyibpay.com');

export type BillInput = {
  paymentId: string; orderId: string; amountCents: number; name: string; description: string;
  email: string; phone?: string; payerName: string;
};

export async function createBill(b: BillInput): Promise<{ billCode: string; paymentUrl: string }> {
  const returnUrl = `${SITE_URL}/checkout/${b.orderId}/return`;
  if (provider() === 'mock') {
    const billCode = 'MOCK' + b.paymentId.replace(/-/g, '').slice(0, 10).toUpperCase();
    return { billCode, paymentUrl: `${SITE_URL}/pay/mock/${billCode}` };
  }
  const form = new URLSearchParams({
    userSecretKey: must('TOYYIBPAY_SECRET_KEY'),
    categoryCode: must('TOYYIBPAY_CATEGORY_CODE'),
    billName: b.name.replace(/[^A-Za-z0-9 _]/g, '').slice(0, 30) || 'Sanding card',
    billDescription: b.description.replace(/[^A-Za-z0-9 _]/g, '').slice(0, 100) || 'Sanding e-wedding card',
    billPriceSetting: '1',
    billPayorInfo: '1',
    billAmount: String(b.amountCents),
    billReturnUrl: returnUrl,
    billCallbackUrl: `${process.env.PAYMENT_CALLBACK_BASE_URL || SITE_URL}/api/payments/toyyibpay/callback`,
    billExternalReferenceNo: b.paymentId,
    billTo: b.payerName.slice(0, 60) || b.email,
    billEmail: b.email,
    billPhone: (b.phone || '0123456789').replace(/\D/g, ''),
    billSplitPayment: '0',
    billSplitPaymentArgs: '',
    billPaymentChannel: '0',
    billChargeToCustomer: '',
    billExpiryDays: '1',
  });
  const res = await fetch(`${tpBase()}/index.php/api/createBill`, { method: 'POST', body: form, cache: 'no-store' });
  const text = await res.text();
  let billCode = '';
  try { billCode = JSON.parse(text)?.[0]?.BillCode || ''; } catch { /* plain-text error code */ }
  if (!billCode) {
    // an empty reply says nothing, so record the HTTP status and whether the key can see the category (never the key itself)
    let cat = '';
    try {
      const r = await fetch(`${tpBase()}/index.php/api/getCategoryDetails`, { method: 'POST', body: new URLSearchParams({ userSecretKey: must('TOYYIBPAY_SECRET_KEY'), categoryCode: must('TOYYIBPAY_CATEGORY_CODE') }), cache: 'no-store' });
      cat = `category check ${r.status}: ${(await r.text()).trim().slice(0, 160)}`;
    } catch (e) { cat = `category check failed: ${String(e).slice(0, 100)}`; }
    throw new Error(`ToyyibPay createBill failed (HTTP ${res.status}, ${tpBase()}, category ${process.env.TOYYIBPAY_CATEGORY_CODE || 'missing'}, key ${(process.env.TOYYIBPAY_SECRET_KEY || '').trim().length} chars): ${text.trim().slice(0, 200) || 'empty reply'} | ${cat}`);
  }
  return { billCode, paymentUrl: `${tpBase()}/${billCode}` };
}

/** Asks the gateway whether a bill is paid. Never trusts the browser's return-URL parameters. */
export async function checkBill(billCode: string): Promise<{ paid: boolean; amountCents?: number; ref?: string; raw?: unknown }> {
  if (provider() === 'mock' || billCode.startsWith('MOCK')) {
    const { data } = await supabaseAdmin().from('payments').select('status, raw').eq('bill_code', billCode).single();
    const raw = (data?.raw || {}) as { mock_result?: string };
    return { paid: data?.status === 'paid' || raw.mock_result === 'paid', ref: `MOCK-${billCode.slice(4, 12)}`, raw };
  }
  const form = new URLSearchParams({ billCode, userSecretKey: must('TOYYIBPAY_SECRET_KEY') });
  const res = await fetch(`${tpBase()}/index.php/api/getBillTransactions`, { method: 'POST', body: form, cache: 'no-store' });
  let list: Record<string, string>[] = [];
  try { list = await res.json(); } catch { return { paid: false }; }
  const ok = Array.isArray(list) ? list.find((t) => String(t.billpaymentStatus) === '1') : undefined;
  if (!ok) return { paid: false, raw: list };
  return { paid: true, amountCents: Math.round(parseFloat(ok.billpaymentAmount) * 100), ref: ok.billpaymentInvoiceNo, raw: ok };
}

export function toyyibCallbackHashOk(p: Record<string, string>) {
  const secret = (process.env.TOYYIBPAY_SECRET_KEY || '').trim();
  if (!secret || !p.hash) return false;
  const h = createHash('md5').update(secret + p.status + p.order_id + p.refno + 'ok').digest('hex');
  return h === p.hash;
}

/** Verifies with the gateway, then publishes or upgrades the order. Safe to call repeatedly. */
export async function settle(billCode: string): Promise<'paid' | 'pending' | 'unknown'> {
  const admin = supabaseAdmin();
  const { data: pay } = await admin.from('payments').select('id, status, amount_cents').eq('bill_code', billCode).single();
  if (!pay) return 'unknown';
  if (pay.status === 'paid') return 'paid';
  const r = await checkBill(billCode);
  if (!r.paid) return 'pending';
  if (r.amountCents != null && r.amountCents !== pay.amount_cents) {
    console.error('payment amount mismatch', billCode, r.amountCents, pay.amount_cents);
    return 'pending';
  }
  await admin.rpc('finalize_payment', { p_payment: pay.id, p_ref: r.ref || billCode, p_raw: (r.raw ?? null) as object });
  return 'paid';
}

function must(k: string) {
  const v = (process.env[k] || '').trim();  // pasted keys often carry a stray space or line break
  if (!v) throw new Error(`${k} is not set`);
  return v;
}
