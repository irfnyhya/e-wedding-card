import { notFound, redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { currentUser } from '@/lib/supabase/server';
import { sanitizeCard, type PackageId } from '@/lib/card';
import { SAMPLE } from '@/lib/invite/engine';
import Editor from './Editor';

export const metadata = { title: 'Editor' };

// when new cards started getting the sample couple photo; drafts last saved before this never saw it
const SAMPLE_PHOTO_SINCE = Date.parse('2026-10-18T11:25:40Z');

export default async function EditorPage({ params }: PageProps<'/editor/[id]'>) {
  const { id } = await params;
  const { sb, user } = await currentUser();
  if (!user) redirect(`/login?next=/editor/${id}`);
  const { data: o } = await sb.from('orders').select('id, status, package, addon_own, slug, content, updated_at').eq('id', id).maybeSingle();
  if (!o) notFound();
  let content = sanitizeCard(o.content);
  // give older unpublished drafts the sample photo once (saving it moves updated_at past the cut-off, so a later removal sticks)
  if (o.status === 'draft' && !content.couplePhoto && Date.parse(o.updated_at) < SAMPLE_PHOTO_SINCE) {
    content = sanitizeCard({ ...content, couplePhoto: SAMPLE.couplePhoto });
    await sb.from('orders').update({ content, updated_at: new Date().toISOString() }).eq('id', o.id);
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
