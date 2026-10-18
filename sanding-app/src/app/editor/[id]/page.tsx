import { notFound, redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { currentUser } from '@/lib/supabase/server';
import { sanitizeCard, type PackageId } from '@/lib/card';
import { SAMPLE } from '@/lib/invite/engine';
import Editor from './Editor';

export const metadata = { title: 'Editor' };


export default async function EditorPage({ params }: PageProps<'/editor/[id]'>) {
  const { id } = await params;
  const { sb, user } = await currentUser();
  if (!user) redirect(`/login?next=/editor/${id}`);
  const { data: o } = await sb.from('orders').select('id, status, package, addon_own, slug, content').eq('id', id).maybeSingle();
  if (!o) notFound();
  let content = sanitizeCard(o.content);
  // unpublished drafts show the sample photo until the couple uploads or removes one themselves
  if (o.status === 'draft' && !content.couplePhoto && !content.photoChosen) {
    content = sanitizeCard({ ...content, couplePhoto: SAMPLE.couplePhoto });
    await sb.from('orders').update({ content }).eq('id', o.id);
  }
  return (
    <>
      <SiteHeader current="create" />
      <main>
        <Editor orderId={o.id} userId={user.id} initial={content} status={o.status} paidPkg={o.package as PackageId | null} addonPaid={o.addon_own} slug={o.slug} />
      </main>
    </>
  );
}
