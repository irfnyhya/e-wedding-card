import Link from 'next/link';
import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { currentUser } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { hashToken, normEmail, tokenShape } from '@/lib/share';

export const metadata = { title: 'Family access', robots: { index: false } };
export const dynamic = 'force-dynamic';

// Accepts a family-access invite: the signed-in address must be the invited one.
export default async function SharePage({ params }: PageProps<'/share/[token]'>) {
  const { token } = await params;
  const { user } = await currentUser();
  if (!user) redirect(`/login?next=/share/${encodeURIComponent(token)}`);
  let problem = 'This invite link is not valid. Ask the couple to send a new one.';
  if (tokenShape(token)) {
    const admin = supabaseAdmin();
    const hash = hashToken(token);
    const { data: m } = await admin.from('order_members').select('email').eq('token_hash', hash).maybeSingle();
    if (m && m.email !== normEmail(user.email)) {
      problem = `This invite was sent to ${m.email}, but you are signed in as ${user.email}. Sign out and open the link again with that address.`;
    } else if (m) {
      const { data: orderId } = await admin.rpc('accept_invite', { p_token_hash: hash, p_user: user.id });
      if (orderId) redirect(`/dashboard?card=${orderId}`);
      problem = 'Someone else already used this invite. Ask the couple to invite you again.';
    }
  }
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <div className="empty" style={{ marginBlock: '48px 80px' }}>
          <h1 style={{ fontSize: 28 }}>Family access</h1>
          <p className="muted" style={{ maxWidth: '50ch' }}>{problem}</p>
          <Link className="btn btn-ghost" href="/dashboard">Go to My cards</Link>
        </div>
      </main>
    </>
  );
}
