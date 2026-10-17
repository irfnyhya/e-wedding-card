import PublicCardView from '@/components/PublicCardView';
import { cardMetadata, loadPublicCard } from '@/lib/publicCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps<'/[slug]/[guest]'>) {
  const { slug, guest } = await params;
  return cardMetadata(await loadPublicCard(slug, guest));
}

// Personal guest link: same card, with the guest's name on the cover and on their RSVP.
export default async function GuestCardPage({ params }: PageProps<'/[slug]/[guest]'>) {
  const { slug, guest } = await params;
  return <PublicCardView p={await loadPublicCard(slug, guest)} />;
}
