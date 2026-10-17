import Link from 'next/link';
import { currentUser } from '@/lib/supabase/server';

/** Centred masthead: collection and prices left, account right. */
export default async function SiteHeader({ current }: { current?: 'designs' | 'dashboard' | 'create' }) {
  const { user } = await currentUser();
  return (
    <header className="site-head">
      <div className="wrap">
        <nav className="nav nav-l" aria-label="Main">
          <Link href="/designs" aria-current={current === 'designs' ? 'page' : undefined}>Collection</Link>
          <Link href="/#pricing" className="hide-sm">Prices</Link>
        </nav>
        <Link className="brand" href="/" aria-label="Sanding home"><span className="wm">Sanding</span><span className="tag-line">kad kahwin digital</span></Link>
        <nav className="nav nav-r" aria-label="Account">
          <Link href="/dashboard" aria-current={current === 'dashboard' ? 'page' : undefined}>My cards</Link>
          {user
            ? <form action="/auth/signout" method="post" className="hide-sm"><button className="linklike" type="submit">Log out</button></form>
            : <Link href="/login" className="hide-sm">Log in</Link>}
          <Link href="/create?fresh=1" className="btn btn-primary btn-sm">Create a card</Link>
        </nav>
      </div>
    </header>
  );
}
