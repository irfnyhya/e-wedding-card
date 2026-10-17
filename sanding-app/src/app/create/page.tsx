import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sanitizeCard, templateId } from '@/lib/card';
import { SAMPLE } from '@/lib/invite/engine';

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
  if (draft && (!sp.fresh || untouched)) {
    if (template) await admin.from('orders').update({ content: { ...draft.content, template } }).eq('id', draft.id);
    redirect(`/editor/${draft.id}`);
  }
  const content = sanitizeCard({ ...SAMPLE, ...(template ? { template } : {}) });
  const { data, error } = await admin.from('orders').insert({ owner_id: user.id, content }).select('id').single();
  if (error || !data) throw new Error(error?.message || 'Could not create a card.');
  redirect(`/editor/${data.id}`);
}
