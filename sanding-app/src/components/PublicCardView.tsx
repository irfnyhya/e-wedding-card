import Link from 'next/link';
import LiveInvite from './LiveInvite';
import type { PublicCard } from '@/lib/publicCard';

export default function PublicCardView({ p }: { p: PublicCard }) {
  if (p.kind !== 'ok') {
    return (
      <div className="inv-page" style={{ alignItems: 'center', padding: 24 }}>
        <div className="card" style={{ maxWidth: 380, textAlign: 'center' }}>
          <h1 style={{ fontSize: 26 }}>{p.kind === 'expired' ? 'This card has ended' : 'Card not found'}</h1>
          <p className="muted">{p.kind === 'expired'
            ? 'The couple’s card is no longer online. Thank you for your prayers and wishes.'
            : <>No card uses the link <b>{p.slug}</b>. Check the spelling, or ask the couple to send it again.</>}</p>
          <Link className="btn btn-primary" href="/">Go to Sanding</Link>
        </div>
      </div>
    );
  }
  return <LiveInvite card={p.card} slug={p.slug} guest={p.guest} sample={p.sample} />;
}
