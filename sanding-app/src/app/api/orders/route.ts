import type { NextRequest } from 'next/server';
import { currentUser } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { fail, json, sameOrigin } from '@/lib/api';
import { sanitizeCard, templateId } from '@/lib/card';
import { SAMPLE } from '@/lib/invite/engine';

// POST: create a draft card, prefilled with the sample so the preview is never empty.
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return fail('Bad origin.', 403);
  const { user } = await currentUser();
  if (!user) return fail('Sign in first.', 401);
  const body = await req.json().catch(() => ({}));
  const admin = supabaseAdmin();
  const { count } = await admin.from('orders').select('id', { count: 'exact', head: true }).eq('owner_id', user.id).eq('status', 'draft');
  if ((count || 0) >= 10) return fail('You have 10 unpublished drafts. Delete one from My cards first.', 429);
  const content = sanitizeCard({ ...SAMPLE, couplePhoto: '', ...(body.content || {}), ...(templateId(body.template) ? { template: templateId(body.template) } : {}) });
  const { data, error } = await admin.from('orders').insert({ owner_id: user.id, content }).select('id').single();
  if (error) return fail(error.message, 500);
  return json({ id: data.id }, 201);
}
