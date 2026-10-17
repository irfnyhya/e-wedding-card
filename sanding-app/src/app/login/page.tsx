import { redirect } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { currentUser } from '@/lib/supabase/server';
import LoginForm from './LoginForm';

export const metadata = { title: 'Log in' };

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  const sp = await searchParams;
  const raw = typeof sp.next === 'string' ? sp.next : '/dashboard';
  const next = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/dashboard';
  const { user } = await currentUser();
  if (user) redirect(next);
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <div className="auth-card">
          <p className="eyebrow">Your account</p>
          <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', margin: '10px 0 8px' }}>Log in to Sanding</h1>
          <p className="muted" style={{ marginBottom: 20 }}>Your cards, RSVPs and ucapan are saved to your account so you can manage them from any phone.</p>
          <LoginForm next={next} />
        </div>
      </main>
    </>
  );
}
