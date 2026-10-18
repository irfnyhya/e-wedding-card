import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sanitizeCard, templateId } from '@/lib/card';
import { SAMPLE } from '@/lib/invite/engine';
import { namesOverride, parseNames } from '@/lib/names';

// Opens the editor on the couple's latest unpublished draft, or a new one prefilled with the sample.
export default async function CreatePage({ searchParams }: PageProps<'/create'>) {
  const sp = await searchParams;
  const { user } = await currentUser();
  if (!user) redirect('/login?next=/create');
  const template = templateId(sp.template);
  const admin = supabaseAdmin();
  const { data: draft } = await admin.from('orders').select('id, content, created_at, updated_at').eq('owner_id', user.id).eq('status', 'draft')
    .order('updated_at', { ascending: false }).limit(1).maybeSingle();
  // "Create card" (fresh) starts a new draft, except when the latest draft was never edited.
  const untouched = draft && Date.parse(draft.updated_at) - Date.parse(draft.created_at) < 1000;
  // names typed in "Personalise preview" on the collection carry into the new draft
  const names = typeof sp.bride === 'string' ? parseNames(`${sp.bride} & ${typeof sp.groom === 'string' ? sp.groom : ''}`) : null;
  if (draft && (!sp.fresh || untouched)) {
    // drafts made before the couple photo existed get the sample photo, so the feature is visible
    const noPhotoYet = !('couplePhoto' in (draft.content || {}));
    if (template || names || noPhotoYet) await admin.from('orders').update({ content: sanitizeCard({ ...draft.content, ...(noPhotoYet ? { couplePhoto: SAMPLE.couplePhoto } : {}), ...(untouched ? namesOverride(names) : {}), ...(template ? { template } : {}) }) }).eq('id', draft.id);
    redirect(`/editor/${draft.id}`);
  }
  const content = sanitizeCard({ ...SAMPLE, ...namesOverride(names), ...(template ? { template } : {}) });
  const { data, error } = await admin.from('orders').insert({ owner_id: user.id, content }).select('id').single();
  if (error || !data) throw new Error(error?.message || 'Could not create a card.');
  redirect(`/editor/${data.id}`);
}
