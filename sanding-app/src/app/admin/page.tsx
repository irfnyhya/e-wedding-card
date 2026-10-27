import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { currentUser } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/admin';
import Admin, { type AdminOrder, type AdminPayment } from './Admin';

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

type Content = { brideShort?: string; groomShort?: string; side?: string; date?: string; template?: string; venue?: string };

export default async function AdminPage() {
  const { user } = await currentUser();
  if (!user) redirect('/login?next=/admin');
  if (!isAdmin(user.email)) {
    return (
      <>
        <SiteHeader />
        <main className="wrap" style={{ padding: '80px 0' }}>
          <h1 style={{ fontSize: 32 }}>Not available</h1>
          <p className="muted" style={{ marginTop: 10 }}>This page is only for the site owner. You are signed in as {user.email}.</p>
        </main>
      </>
    );
  }

  // service role on purpose: the owner sees every customer's records, which RLS would hide
  const db = supabaseAdmin();
  const [{ data: orders }, { data: payments }, users] = await Promise.all([
    db.from('orders').select('id, owner_id, slug, status, package, paid_cents, content, published_at, valid_until, created_at, updated_at').order('created_at', { ascending: false }).limit(2000),
    db.from('payments').select('id, order_id, owner_id, provider, bill_code, package, slug, amount_cents, promo, status, ref_no, created_at, paid_at').order('created_at', { ascending: false }).limit(2000),
    db.auth.admin.listUsers({ perPage: 1000 }),
  ]);
  const emailOf = new Map((users.data?.users || []).map((u) => [u.id, u.email || '']));

  const rows: AdminOrder[] = (orders || []).map((o) => {
    const c = (o.content || {}) as Content;
    const names = c.side === 'groom' ? [c.groomShort, c.brideShort] : [c.brideShort, c.groomShort];
    return {
      id: o.id, slug: o.slug, status: o.status, package: o.package, paidCents: o.paid_cents,
      names: names.filter(Boolean).join(' & ') || '(no names)', date: c.date || '', venue: c.venue || '', template: c.template || '',
      email: emailOf.get(o.owner_id) || '', createdAt: o.created_at, updatedAt: o.updated_at, publishedAt: o.published_at, validUntil: o.valid_until,
    };
  });
  const pays: AdminPayment[] = (payments || []).map((p) => ({
    id: p.id, orderId: p.order_id, provider: p.provider, billCode: p.bill_code, package: p.package, slug: p.slug,
    amountCents: p.amount_cents, promo: p.promo, status: p.status, refNo: p.ref_no,
    email: emailOf.get(p.owner_id) || '', createdAt: p.created_at, paidAt: p.paid_at,
  }));

  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <div className="page-head" style={{ paddingBottom: 0 }}>
          <p className="eyebrow">Owner only</p>
          <h1 style={{ marginTop: 10, fontSize: 'clamp(28px,4vw,40px)' }}>Admin</h1>
        </div>
        <Admin orders={rows} payments={pays} users={users.data?.users.length || 0} />
      </main>
    </>
  );
}
