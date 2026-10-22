'use client';
import { useEffect, useState } from 'react';
import { coverNames, fmtDate, swatchBg, themeOf } from '@/lib/invite/engine';
import { PKG, PROMOS, displayLink, quote, rm, slugProblem, slugify, type Card, type PackageId } from '@/lib/card';

type Props = { orderId: string; card: Card; paidPkg: PackageId | null; addonPaid: boolean; slug: string | null; gateway: 'toyyibpay' | 'mock'; sandbox: boolean };

export default function Checkout({ orderId, card, paidPkg, addonPaid, slug: fixedSlug, gateway, sandbox }: Props) {
  const [slug, setSlug] = useState(fixedSlug || slugify(coverNames(card).join('-')));
  const [promoIn, setPromoIn] = useState('');
  const [promo, setPromo] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ t: string; ok?: boolean }>({ t: 'Try SANDING10 for 10% off.' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [avail, setAvail] = useState<'idle' | 'checking' | 'ok' | 'taken'>('idle');
  const q = quote(card, paidPkg, promo, addonPaid);
  const problem = fixedSlug ? '' : slugProblem(slug);
  const t = themeOf(card.template);

  useEffect(() => {
    if (fixedSlug || problem) return;
    const tm = setTimeout(async () => {
      setAvail('checking');
      const r = await fetch(`/api/slug?s=${encodeURIComponent(slug)}&order=${orderId}`).then((x) => x.json()).catch(() => null);
      setAvail(r?.available ? 'ok' : 'taken');
    }, 350);
    return () => clearTimeout(tm);
  }, [slug, fixedSlug, problem, orderId]);

  async function pay() {
    setBusy(true); setErr('');
    const r = await fetch(`/api/orders/${orderId}/checkout`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ slug, promo }) });
    const b = await r.json().catch(() => ({}));
    if (!r.ok || !b.paymentUrl) { setErr(b.error || 'Could not start payment.'); setBusy(false); return; }
    location.assign(b.paymentUrl);
  }

  const slugMsg = fixedSlug ? { cls: 'ok-msg', t: 'Your link stays the same.' }
    : problem ? { cls: 'err-msg', t: problem }
    : avail === 'taken' ? { cls: 'err-msg', t: `That link is taken. Try adding the date, like ${slug}-1912.` }
    : avail === 'ok' ? { cls: 'ok-msg', t: `${displayLink(slug)} is available.` } : { cls: 'hint', t: 'Checking…' };
  const blocked = busy || !!problem || (!fixedSlug && avail !== 'ok');

  return (
    <div className="checkout">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="card">
          <h3 style={{ fontFamily: 'var(--f-body)', fontSize: 17, fontWeight: 700 }}>Your card link</h3>
          <div className="slug-input"><span>{displayLink('')}</span>
            <input type="text" aria-label="Card link name" value={slug} disabled={!!fixedSlug}
              onChange={(e) => { setAvail('idle'); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').slice(0, 40)); }} /></div>
          <span className={slugMsg.cls}>{slugMsg.t}</span>
        </div>
        <div className="card">
          <h3 style={{ fontFamily: 'var(--f-body)', fontSize: 17, fontWeight: 700 }}>Payment</h3>
          <p>You&apos;ll pay on {gateway === 'toyyibpay' ? 'ToyyibPay' : 'the payment page'} with <b>FPX online banking</b>: choose your bank there and approve the payment in your banking app.</p>
          {gateway === 'mock'
            ? <p className="demo-note">Local test mode: the payment page is a stand-in for the gateway and nothing is charged. Set PAYMENT_PROVIDER=toyyibpay to use the ToyyibPay sandbox.</p>
              : sandbox && <p className="demo-note">ToyyibPay sandbox: use the test bank on the FPX page. No real money moves.</p>}
          {err && <p className="err-msg">{err}</p>}
        </div>
      </div>
      <div className="card" style={{ position: 'sticky', top: 'calc(env(safe-area-inset-top, 0px) + 80px)' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 54, height: 70, flex: '0 0 54px', background: swatchBg(t) }} />
          <div style={{ minWidth: 0 }}><b style={{ display: 'block' }}>{coverNames(card).join(' & ')}</b><span className="muted" style={{ fontSize: 13 }}>{t.name} · {fmtDate(card.date, 'en')}</span></div>
        </div>
        <div className="line-items">
          <div><span>{PKG[q.pkg].name} package</span><span>{rm(q.priceCents)}</span></div>
          {q.alreadyCents > 0 && <div><span>Already paid ({PKG[paidPkg!].name})</span><span>−{rm(q.alreadyCents)}</span></div>}
          {q.addonCents > 0 && <div><span>Own design front page</span><span>{rm(q.addonCents)}</span></div>}
          {q.discountCents > 0 && <div><span>Promo {q.promo}</span><span>−{rm(q.discountCents)}</span></div>}
          <div className="total"><span>Total</span><span>{rm(q.totalCents)}</span></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input type="text" placeholder="Promo code" aria-label="Promo code" value={promoIn} onChange={(e) => setPromoIn(e.target.value)} />
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => {
            const code = promoIn.trim().toUpperCase();
            if (PROMOS[code]) { setPromo(code); setPromoMsg({ t: `${PROMOS[code] * 100}% off applied.`, ok: true }); }
            else { setPromo(''); setPromoMsg({ t: code ? 'That code isn’t valid.' : 'Try SANDING10 for 10% off.', ok: code ? false : undefined }); }
          }}>Apply</button>
        </div>
        <span className={promoMsg.ok === true ? 'ok-msg' : promoMsg.ok === false ? 'err-msg' : 'hint muted'} style={{ fontSize: 12 }}>{promoMsg.t}</span>
        <button type="button" className="btn btn-primary" style={{ width: '100%', padding: 13 }} disabled={blocked} onClick={pay}>
          {busy ? 'Connecting to payment…' : `Pay ${rm(q.totalCents)}`}
        </button>
      </div>
    </div>
  );
}
