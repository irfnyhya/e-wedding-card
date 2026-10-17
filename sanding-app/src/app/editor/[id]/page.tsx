import { notFound, redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { currentUser } from '@/lib/supabase/server';
import { sanitizeCard, type PackageId } from '@/lib/card';
import Editor from './Editor';

export const metadata = { title: 'Editor' };

export default async function EditorPage({ params }: PageProps<'/editor/[id]'>) {
  const { id } = await params;
  const { sb, user } = await currentUser();
  if (!user) redirect(`/login?next=/editor/${id}`);
  const { data: o } = await sb.from('orders').select('id, status, package, addon_own, slug, content').eq('id', id).maybeSingle();
  if (!o) notFound();
  return (
    <>
      <SiteHeader current="create" />
      <main>
        <Editor orderId={o.id} userId={user.id} initial={sanitizeCard(o.content)} status={o.status} paidPkg={o.package as PackageId | null} addonPaid={o.addon_own} slug={o.slug} />
      </main>
    </>
  );
}
