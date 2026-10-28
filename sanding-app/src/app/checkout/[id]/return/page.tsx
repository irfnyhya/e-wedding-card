import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import CopyLink from '@/components/CopyLink';
import { currentUser } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { settle } from '@/lib/payments';
import { PKG, SITE_URL, displayLink, rm, sanitizeCard, type PackageId } from '@/lib/card';
import { coverNames, fmtDate, greetingFor, T } from '@/lib/invite/engine';

export const metadata = { title: 'Payment' };
export const dynamic = 'force-dynamic';

// The gateway sends the couple back here. Whatever the query string says, the bill is verified
// server-side with the gateway before the card goes live (callbacks cannot reach localhost).
export default async function ReturnPage({ params, searchParams }: PageProps<'/checkout/[id]/return'>) {
  const { id } = await params;
  const sp = await searchParams;
  const { user } = await currentUser();
  if (!user) redirect(`/login?next=/checkout/${id}`);
  const admin = supabaseAdmin();
  const billcode = typeof sp.billcode === 'string' ? sp.billcode : '';
  const { data: pay } = await admin.from('payments').select('id, order_id, owner_id, bill_code, status, amount_cents')
    .eq('bill_code', billcode).maybeSingle();
  if (!pay || pay.order_id !== id || pay.owner_id !== user.id) notFound();

  const state = pay.status === 'failed' ? 'failed' : await settle(billcode);
  const { data: o } = await admin.from('orders').select('slug, package, paid_cents, valid_until, content').eq('id', id).single();
  const card = sanitizeCard(o!.content);
  const names = coverNames(card).join(' & ');

  if (state !== 'paid') {
    const gaveUp = state === 'failed' || sp.status_id === '3';
    return (
      <>
        <SiteHeader />
        <main className="wrap"><div className="success">
          <h1 style={{ fontSize: 'clamp(28px,4vw,40px)' }}>{gaveUp ? 'Payment not completed' : 'Waiting for your bank'}</h1>
          <p className="muted" style={{ maxWidth: '52ch' }}>{gaveUp ? 'No money was taken and your card is saved. You can try paying again.' : 'Your bank has not confirmed the payment yet. This page checks again when you refresh it.'}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {gaveUp ? <Link className="btn btn-primary" href={`/checkout/${id}`}>Try again</Link> : <Link className="btn btn-primary" href={`/checkout/${id}/return?billcode=${billcode}`}>Check again</Link>}
            <Link className="btn btn-ghost" href="/dashboard">Go to dashboard</Link>
          </div>
        </div></main>
      </>
    );
  }

  const url = `${SITE_URL}/${o!.slug}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(`${greetingFor(card)}. Dengan segala hormatnya kami menjemput anda ke ${T[card.lang].ev[card.eventTitle]} ${names} pada ${fmtDate(card.date, 'ms')}. Kad jemputan: ${url}`)}`;
  return (
    <>
      <SiteHeader />
      <main className="wrap"><div className="success">
        <div className="seal" aria-hidden="true" />
        <h1 style={{ fontSize: 'clamp(30px,5vw,46px)' }}>{names}, your card is live</h1>
        <p className="muted" style={{ maxWidth: '52ch' }}>{PKG[o!.package as PackageId].name} package, paid {rm(o!.paid_cents)} in total. Your card stays online until {new Date(o!.valid_until!).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
        <CopyLink text={url} label={displayLink(o!.slug!)} />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link className="btn btn-primary" href={`/${o!.slug}`}>Open card</Link>
          <a className="btn btn-ghost" href={wa} target="_blank" rel="noopener">Share on WhatsApp</a>
          <Link className="btn btn-ghost" href={`/dashboard?card=${id}`}>Go to dashboard</Link>
        </div>
        <p className="muted" style={{ fontSize: 14 }}>RSVPs, ucapan, guest links and check-in all live in your dashboard. <Link href="/guide" style={{ color: 'var(--accent)' }}>Read the guide</Link>{process.env.RESEND_API_KEY ? <>; we&apos;ve emailed you the main steps too</> : null}.</p>
      </div></main>
    </>
  );
}
