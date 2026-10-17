import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { currentUser } from '@/lib/supabase/server';
import { sanitizeCard } from '@/lib/card';
import Dashboard, { type DashOrder } from './Dashboard';

export const metadata = { title: 'My cards' };
export const dynamic = 'force-dynamic';

export default async function DashboardPage({ searchParams }: PageProps<'/dashboard'>) {
  const sp = await searchParams;
  const { sb, user } = await currentUser();
  if (!user) redirect('/login?next=/dashboard');
  // RLS returns the user's own cards plus any a family member shared with them (read only)
  const { data } = await sb.from('orders').select('id, owner_id, slug, status, package, addon_own, paid_cents, valid_until, created_at, updated_at, content').order('created_at', { ascending: false });
  const orders: DashOrder[] = (data || [])
    .map(({ owner_id, ...o }) => ({ ...o, content: sanitizeCard(o.content), shared: owner_id !== user.id }));
  return (
    <>
      <SiteHeader current="dashboard" />
      <main className="wrap">
        <div className="page-head" style={{ paddingBottom: 0 }}>
          <p className="eyebrow">Dashboard</p>
          <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4vw,40px)' }}>My cards</h1>
        </div>
        <Dashboard orders={orders} initialId={typeof sp.card === 'string' ? sp.card : null} />
      </main>
    </>
  );
}
