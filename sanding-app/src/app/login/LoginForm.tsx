'use client';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function LoginForm({ next }: { next: string }) {
  const [mode, setMode] = useState<'in' | 'up' | 'link'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState<{ ok?: string; err?: string }>({});
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const callback = `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    setBusy(true); setMsg({});
    const sb = supabaseBrowser();
    try {
      if (mode === 'link') {
        const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: callback } });
        if (error) throw error;
        setMsg({ ok: 'Check your email for a sign-in link.' });
      } else if (mode === 'up') {
        if (password !== confirm) { setMsg({ err: 'The two passwords do not match.' }); return; }
        const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: callback } });
        if (error) throw error;
        if (data.session) location.assign(next); else setMsg({ ok: 'Account created. Confirm your email, then log in.' });
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        location.assign(next);
      }
    } catch (err) {
      setMsg({ err: (err as Error).message || 'Could not sign in.' });
    } finally { setBusy(false); }
  }

  return (
    <div className="card">
      <div className="pay-methods" role="group" aria-label="Sign-in method">
        <button type="button" aria-pressed={mode === 'in'} onClick={() => setMode('in')}>Log in</button>
        <button type="button" aria-pressed={mode === 'up'} onClick={() => setMode('up')}>Create account</button>
        <button type="button" aria-pressed={mode === 'link'} onClick={() => setMode('link')}>Email link</button>
      </div>
      <form onSubmit={submit}>
        <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        {mode !== 'link' && (
          <div className="field"><label htmlFor="pw">Password</label>
            <div className="pw-wrap"><input id="pw" type={show ? 'text' : 'password'} required minLength={8} autoComplete={mode === 'up' ? 'new-password' : 'current-password'} value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="pw-eye" onClick={() => setShow((v) => !v)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show}>{show ? 'Hide' : 'Show'}</button></div>
            {mode === 'up' && <span className="hint">At least 8 characters.</span>}</div>
        )}
        {mode === 'up' && (
          <div className="field"><label htmlFor="pw2">Confirm password</label>
            <input id="pw2" type={show ? 'text' : 'password'} required minLength={8} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
              aria-invalid={confirm !== '' && confirm !== password} />
            {confirm !== '' && confirm !== password && <span className="err-msg">Passwords do not match.</span>}</div>
        )}
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Please wait…' : mode === 'in' ? 'Log in' : mode === 'up' ? 'Create account' : 'Send link'}</button>
        {msg.ok && <p className="ok-msg">{msg.ok}</p>}
        {msg.err && <p className="err-msg">{msg.err}</p>}
      </form>
    </div>
  );
}
