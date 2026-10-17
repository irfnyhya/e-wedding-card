import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, json, sameOrigin } from '@/lib/api';
import { provider, settle } from '@/lib/payments';

// Local stand-in for the gateway's "customer paid / cancelled" step. Disabled unless PAYMENT_PROVIDER=mock.
export async function POST(req: NextRequest) {
  if (provider() !== 'mock') return fail('Mock payments are off.', 404);
  if (!sameOrigin(req)) return fail('Bad origin.', 403);
  const { billCode, result } = await req.json().catch(() => ({}));
  if (typeof billCode !== 'string' || !billCode.startsWith('MOCK')) return fail('Unknown bill.', 404);
  const admin = supabaseAdmin();
  const { data: pay } = await admin.from('payments').select('id, order_id, status').eq('bill_code', billCode).single();
  if (!pay) return fail('Unknown bill.', 404);
  if (pay.status === 'pending') {
    if (result === 'paid') {
      await admin.from('payments').update({ raw: { mock_result: 'paid', channel: 'FPX (mock)' } }).eq('id', pay.id);
      await settle(billCode);
    } else {
      await admin.from('payments').update({ status: 'failed', raw: { mock_result: 'failed' } }).eq('id', pay.id);
    }
  }
  return json({ returnUrl: `/checkout/${pay.order_id}/return?billcode=${billCode}&status_id=${result === 'paid' ? 1 : 3}` });
}
