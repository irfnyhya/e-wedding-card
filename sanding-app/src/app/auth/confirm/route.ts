import { NextResponse, type NextRequest } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { supabaseServer } from '@/lib/supabase/server';
import { safeNext } from '@/lib/share';

// Email-link landing for the token_hash flow (supabase/templates/*.html). Unlike /auth/callback it
// needs no PKCE verifier in this browser, so links sent from the server (family invites) work too.
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const tokenHash = sp.get('token_hash');
  const type = (sp.get('type') || 'email') as EmailOtpType;
  const next = safeNext(sp.get('next'), req.nextUrl.origin);
  if (tokenHash) {
    const sb = await supabaseServer();
    const { error } = await sb.auth.verifyOtp({ token_hash: tokenHash, type });
    if (error) return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(next)}&expired=1`, req.url));
  }
  return NextResponse.redirect(new URL(next, req.url));
}
