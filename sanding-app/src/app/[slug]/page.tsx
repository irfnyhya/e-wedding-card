import PublicCardView from '@/components/PublicCardView';
import { cardMetadata, loadPublicCard } from '@/lib/publicCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps<'/[slug]'>) {
  return cardMetadata(await loadPublicCard((await params).slug));
}

export default async function CardPage({ params }: PageProps<'/[slug]'>) {
  return <PublicCardView p={await loadPublicCard((await params).slug)} />;
}
