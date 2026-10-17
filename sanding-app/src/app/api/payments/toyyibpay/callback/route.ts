import type { NextRequest } from 'next/server';
import { settle, toyyibCallbackHashOk } from '@/lib/payments';

// ToyyibPay server-to-server notification. The hash is checked when present, and the bill is
// re-verified with getBillTransactions before anything is published.
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  if (!form) return new Response('bad request', { status: 400 });
  const p = Object.fromEntries([...form.entries()].map(([k, v]) => [k, String(v)]));
  if (p.hash && !toyyibCallbackHashOk(p)) return new Response('bad hash', { status: 400 });
  if (!p.billcode) return new Response('missing billcode', { status: 400 });
  if (p.status === '1') await settle(p.billcode);
  return new Response('OK');
}
