'use client';
import { useMemo, useState } from 'react';
import { PKG, type PackageId } from '@/lib/card';

export type AdminOrder = {
  id: string; slug: string | null; status: string; package: string | null; paidCents: number;
  names: string; date: string; venue: string; template: string; email: string;
  createdAt: string; updatedAt: string; publishedAt: string | null; validUntil: string | null;
};
export type AdminPayment = {
  id: string; orderId: string; provider: string; billCode: string | null; package: string; slug: string;
  amountCents: number; promo: string | null; status: string; refNo: string | null; email: string; createdAt: string; paidAt: string | null;
};

// ToyyibPay ran in sandbox until 22 Oct 2026 ~3pm MYT; payments before that moved no real money
const LIVE_SINCE = Date.parse('2026-10-22T07:30:00Z');
const isSandbox = (p: AdminPayment) => p.provider !== 'toyyibpay' || Date.parse(p.createdAt) < LIVE_SINCE;
const rm = (cents: number) => `RM${(cents / 100).toFixed(2)}`;
const when = (iso: string | null) => (iso ? new Date(iso).toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '');
const pkgName = (p: string | null) => (p && p in PKG ? PKG[p as PackageId].name : '');
const matches = (q: string, ...fields: (string | number | null | undefined)[]) => fields.some((f) => String(f ?? '').toLowerCase().includes(q));

export default function Admin({ orders, payments, users }: { orders: AdminOrder[]; payments: AdminPayment[]; users: number }) {
  const [tab, setTab] = useState<'cards' | 'payments'>('cards');
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'all' | 'live' | 'draft' | 'paid' | 'pending' | 'failed'>('all');
  const query = q.trim().toLowerCase();

  // real money only: sandbox and mock payments have no bank behind them
  const paid = payments.filter((p) => p.status === 'paid' && !isSandbox(p));
  const stats = [
    ['Revenue (paid)', rm(paid.reduce((s, p) => s + p.amountCents, 0))],
    ['Paid orders', String(paid.length)],
    ['Live cards', String(orders.filter((o) => o.status === 'live').length)],
    ['Drafts', String(orders.filter((o) => o.status === 'draft').length)],
    ['Accounts', String(users)],
  ];

  const cardRows = useMemo(() => orders.filter((o) =>
    (filter === 'all' || o.status === filter) && (!query || matches(query, o.names, o.slug, o.email, o.venue, o.template, o.date, pkgName(o.package)))), [orders, filter, query]);
  const payRows = useMemo(() => payments.filter((p) =>
    (filter === 'all' || p.status === filter) && (!query || matches(query, p.slug, p.email, p.billCode, p.refNo, p.promo, pkgName(p.package), p.provider))), [payments, filter, query]);

  const filters = tab === 'cards' ? (['all', 'live', 'draft'] as const) : (['all', 'paid', 'pending', 'failed'] as const);

  return (
    <div style={{ padding: '24px 0 60px' }}>
      <div className="admin-stats">
        {stats.map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}
      </div>

      <div className="tabs" role="tablist" style={{ marginTop: 28 }}>
        <button role="tab" aria-selected={tab === 'cards'} onClick={() => { setTab('cards'); setFilter('all'); }}>Cards &amp; orders ({orders.length})</button>
        <button role="tab" aria-selected={tab === 'payments'} onClick={() => { setTab('payments'); setFilter('all'); }}>Payments ({payments.length})</button>
      </div>

      <div className="admin-tools">
        <input type="search" placeholder={tab === 'cards' ? 'Search names, link, email, venue…' : 'Search link, email, bill code, ref, promo…'} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
        <div style={{ display: 'flex', gap: 6 }}>
          {filters.map((f) => <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
      </div>

      {tab === 'cards' ? (
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Couple</th><th>Status</th><th>Package</th><th>Paid</th><th>Wedding</th><th>Customer</th><th>Created</th><th>Online until</th><th>Design</th></tr></thead>
            <tbody>
              {cardRows.map((o) => (
                <tr key={o.id}>
                  <td><b>{o.names}</b>{o.slug && <><br /><a href={`/${o.slug}`} target="_blank" rel="noopener" className="muted" style={{ fontSize: 12 }}>/{o.slug}</a></>}</td>
                  <td><span className={`pill ${o.status === 'live' ? 'yes' : ''}`}>{o.status}</span></td>
                  <td>{pkgName(o.package)}</td>
                  <td>{o.paidCents ? rm(o.paidCents) : ''}</td>
                  <td>{o.date}{o.venue && <><br /><span className="muted" style={{ fontSize: 12 }}>{o.venue}</span></>}</td>
                  <td>{o.email}</td>
                  <td>{when(o.createdAt)}</td>
                  <td>{o.validUntil ? when(o.validUntil).split(',')[0] : ''}</td>
                  <td className="muted">{o.template}</td>
                </tr>
              ))}
              {!cardRows.length && <tr><td colSpan={9} className="muted">No cards match.</td></tr>}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Started</th><th>Status</th><th>Amount</th><th>Package</th><th>Card</th><th>Customer</th><th>Promo</th><th>Bill / ref</th><th>Paid at</th></tr></thead>
            <tbody>
              {payRows.map((p) => (
                <tr key={p.id}>
                  <td>{when(p.createdAt)}</td>
                  <td><span className={`pill ${p.status === 'paid' ? 'yes' : p.status === 'failed' ? 'no' : ''}`}>{p.status}</span>{isSandbox(p) && <span className="muted" style={{ fontSize: 12 }}> test</span>}</td>
                  <td>{rm(p.amountCents)}</td>
                  <td>{pkgName(p.package)}</td>
                  <td><a href={`/${p.slug}`} target="_blank" rel="noopener">/{p.slug}</a></td>
                  <td>{p.email}</td>
                  <td>{p.promo || ''}</td>
                  <td className="muted" style={{ fontSize: 12 }}>{p.billCode || ''}{p.refNo && <><br />{p.refNo}</>}</td>
                  <td>{when(p.paidAt)}</td>
                </tr>
              ))}
              {!payRows.length && <tr><td colSpan={9} className="muted">No payments match.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      <p className="muted" style={{ fontSize: 12, marginTop: 12 }}>Revenue counts real ToyyibPay payments only. Payments marked &ldquo;test&rdquo; went through the sandbox before 22 Oct 2026 and moved no money.</p>
    </div>
  );
}
