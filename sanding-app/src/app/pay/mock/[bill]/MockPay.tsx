'use client';
import { useState } from 'react';

const BANKS = ['Maybank2u', 'CIMB Clicks', 'Bank Islam', 'RHB Now', 'PBe', 'Hong Leong Connect'];

export default function MockPay({ bill, done }: { bill: string; done: boolean }) {
  const [bank, setBank] = useState(BANKS[0]);
  const [busy, setBusy] = useState(false);
  async function finish(result: 'paid' | 'failed') {
    setBusy(true);
    const r = await fetch('/api/payments/mock', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ billCode: bill, result }) });
    const b = await r.json().catch(() => ({}));
    if (b.returnUrl) location.assign(b.returnUrl); else setBusy(false);
  }
  if (done) return <p className="muted">This bill is already closed.</p>;
  return (
    <>
      <div className="banks" role="group" aria-label="Bank">
        {BANKS.map((b) => <button key={b} type="button" aria-pressed={b === bank} onClick={() => setBank(b)}>{b}</button>)}
      </div>
      {busy ? <div className="processing"><div className="spinner" /><b>Connecting to {bank}…</b></div> : (
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={() => finish('paid')}>Approve payment</button>
          <button type="button" className="btn btn-ghost" onClick={() => finish('failed')}>Cancel</button>
        </div>
      )}
    </>
  );
}
