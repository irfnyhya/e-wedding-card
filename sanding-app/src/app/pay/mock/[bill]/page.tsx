import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { provider } from '@/lib/payments';
import { PKG, rm, type PackageId } from '@/lib/card';
import MockPay from './MockPay';

export const metadata = { title: 'Test payment' };

// Stand-in for the gateway's hosted FPX page. Only exists when PAYMENT_PROVIDER=mock.
export default async function MockGateway({ params }: PageProps<'/pay/mock/[bill]'>) {
  if (provider() !== 'mock') notFound();
  const { bill } = await params;
  const { data: pay } = await supabaseAdmin().from('payments').select('bill_code, amount_cents, package, slug, status').eq('bill_code', bill).maybeSingle();
  if (!pay) notFound();
  return (
    <main className="wrap">
      <div className="mock-gw card">
        <div className="brandbar"><b>FPX · Test gateway</b><span className="tag brass">Test mode</span></div>
        <p className="muted" style={{ fontSize: 13 }}>Bill {pay.bill_code} · Sanding {PKG[pay.package as PackageId].name} · {pay.slug}</p>
        <div className="line-items"><div className="total"><span>Amount</span><span>{rm(pay.amount_cents)}</span></div></div>
        <MockPay bill={pay.bill_code} done={pay.status !== 'pending'} />
        <p className="demo-note">This page stands in for ToyyibPay&apos;s FPX page during local development. Nothing is charged.</p>
      </div>
    </main>
  );
}
