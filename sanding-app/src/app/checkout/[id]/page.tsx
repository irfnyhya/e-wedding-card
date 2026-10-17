import { notFound, redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { currentUser } from '@/lib/supabase/server';
import { missingField, needsPayment, sanitizeCard, type PackageId } from '@/lib/card';
import { provider } from '@/lib/payments';
import Checkout from './Checkout';

export const metadata = { title: 'Checkout' };

export default async function CheckoutPage({ params }: PageProps<'/checkout/[id]'>) {
  const { id } = await params;
  const { sb, user } = await currentUser();
  if (!user) redirect(`/login?next=/checkout/${id}`);
  const { data: o } = await sb.from('orders').select('id, status, package, addon_own, slug, content').eq('id', id).maybeSingle();
  if (!o) notFound();
  const card = sanitizeCard(o.content);
  if (missingField(card)) redirect(`/editor/${id}`);
  if (o.status === 'live' && !needsPayment(card, o.package, o.addon_own)) redirect(`/dashboard?card=${id}`);
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <div className="page-head" style={{ paddingBottom: 0 }}>
          <p className="eyebrow">Checkout</p>
          <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4vw,40px)' }}>{o.status === 'live' ? 'Upgrade your card' : 'Publish your card'}</h1>
        </div>
        <Checkout orderId={o.id} card={card} paidPkg={o.package as PackageId | null} addonPaid={o.addon_own} slug={o.slug} gateway={provider()} />
      </main>
    </>
  );
}
