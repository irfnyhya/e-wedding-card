'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { coverNames, fmtDate, fmtTime, rsvpCode, swatchBg, T, themeOf, waNum } from '@/lib/invite/engine';
import { PKG, SITE_URL, displayLink, needPkg, needsPayment, type Card, type PackageId } from '@/lib/card';
import { supabaseBrowser } from '@/lib/supabase/client';
import QrScanner, { canScan } from './QrScanner';

export type DashOrder = {
  id: string; slug: string | null; status: 'draft' | 'live'; package: PackageId | null; addon_own: boolean; paid_cents: number; valid_until: string | null;
  created_at: string; updated_at: string; content: Card;
  /** True when a family member was given read access; the owner's controls are hidden. */
  shared: boolean;
};
type Rsvp = { id: string; name: string; phone: string; attending: boolean; pax: number; note: string; created_at: string; updated_at: string; guest_id: string | null };
type Reserve = { item_key: string; name: string; item: string; at: string };
type Tab = 'rsvp' | 'wishes' | 'wishlist' | 'checkin' | 'links' | 'family';
type Member = { id: string; email: string; created_at: string; accepted_at: string | null };
type Wish = { id: string; name: string; msg: string; hidden: boolean; created_at: string };
type Guest = { id: string; token: string; name: string; sort: number };

const when = (s: string) => new Date(s).toLocaleString('en-MY', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

/** WhatsApp reminder with the guest's code, in the card's language. */
function remindUrl(o: DashOrder, r: Rsvp) {
  const c = o.content, L = T[c.lang] || T.ms, names = coverNames(c).join(' & '), link = `${SITE_URL}/${o.slug}`;
  const msg = c.lang === 'en'
    ? `Hi ${r.name}, a reminder for ${L.ev[c.eventTitle]} ${names} on ${fmtDate(c.date, 'en')} at ${c.venue}, ${fmtTime(c.start, 'en')}. Your guest code: ${rsvpCode(r.id)}. Card: ${link}`
    : `Assalamualaikum ${r.name}. Peringatan mesra untuk ${L.ev[c.eventTitle]} ${names} pada ${fmtDate(c.date, 'ms')}, ${fmtTime(c.start, 'ms')} di ${c.venue}. Kod tetamu anda: ${rsvpCode(r.id)}. Kad: ${link}`;
  return `https://wa.me/${waNum(r.phone)}?text=${encodeURIComponent(msg)}`;
}

export default function Dashboard({ orders: initial, initialId }: { orders: DashOrder[]; initialId: string | null }) {
  const router = useRouter();
  const [orders, setOrders] = useState(initial);
  const [sel, setSel] = useState(initialId && initial.some((o) => o.id === initialId) ? initialId : initial[0]?.id || null);
  const [tab, setTab] = useState<Tab>('rsvp');
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [checkins, setCheckins] = useState<Set<string>>(new Set());
  const [opens, setOpens] = useState(0);
  const [ciQuery, setCiQuery] = useState('');
  const [scanning, setScanning] = useState(false);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestText, setGuestText] = useState('');
  const [live, setLive] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLink, setInviteLink] = useState<{ email: string; link: string; emailed: boolean } | null>(null);
  const [toast, setToast] = useState('');
  const [now] = useState(() => Date.now());
  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2400); };
  const o = orders.find((x) => x.id === sel) || null;
  const ro = !!o?.shared; // family access is read only

  const load = useCallback(async (id: string) => {
    const sb = supabaseBrowser();
    const [r, w, g, res, ci, v] = await Promise.all([
      sb.from('rsvps').select('id, name, phone, attending, pax, note, created_at, updated_at, guest_id').eq('order_id', id).order('updated_at', { ascending: false }),
      sb.from('wishes').select('id, name, msg, hidden, created_at').eq('order_id', id).order('created_at', { ascending: false }),
      sb.from('guests').select('id, token, name, sort').eq('order_id', id).order('sort'),
      sb.from('reserves').select('item_key, name, item, at').eq('order_id', id),
      sb.from('checkins').select('rsvp_id').eq('order_id', id),
      sb.from('views').select('order_id', { count: 'exact', head: true }).eq('order_id', id),
    ]);
    setRsvps(r.data || []); setWishes(w.data || []); setGuests(g.data || []);
    setReserves(res.data || []); setCheckins(new Set((ci.data || []).map((x: { rsvp_id: string }) => x.rsvp_id))); setOpens(v.count || 0);
    setGuestText((g.data || []).map((x: Guest) => x.name).join('\n'));
  }, []);

  useEffect(() => {
    if (!sel || tab !== 'family' || orders.find((x) => x.id === sel)?.shared) return;
    let alive = true;
    fetch(`/api/orders/${sel}/members`).then((r) => r.json()).then((b) => { if (alive) setMembers(b.members || []); }).catch(() => {});
    return () => { alive = false; };
  }, [sel, tab, orders]);

  // live updates while the dashboard is open
  useEffect(() => {
    if (!sel) return;
    const first = setTimeout(() => load(sel), 0);
    const sb = supabaseBrowser();
    const ch = sb.channel(`order-${sel}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rsvps', filter: `order_id=eq.${sel}` }, () => load(sel))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wishes', filter: `order_id=eq.${sel}` }, () => load(sel))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reserves', filter: `order_id=eq.${sel}` }, () => load(sel))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'checkins', filter: `order_id=eq.${sel}` }, () => load(sel))
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'views', filter: `order_id=eq.${sel}` }, () => load(sel))
      .subscribe((s: string) => setLive(s === 'SUBSCRIBED'));
    const poll = setInterval(() => { if (!document.hidden) load(sel); }, 30000);
    return () => { clearTimeout(first); sb.removeChannel(ch); clearInterval(poll); };
  }, [sel, load]);

  if (!orders.length) {
    return (
      <div className="empty" style={{ marginBlock: '28px 80px' }}>
        <h2 style={{ fontSize: 28 }}>No cards yet</h2>
        <p className="muted" style={{ maxWidth: '46ch' }}>Create your first card and it shows up here with its RSVPs, total pax and ucapan, updating as guests reply.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link className="btn btn-primary" href="/create?fresh=1">Create a card</Link>
          <Link className="btn btn-ghost" href="/contoh">Open the sample card</Link>
        </div>
      </div>
    );
  }

  const yes = rsvps.filter((r) => r.attending), no = rsvps.filter((r) => !r.attending);
  const pax = yes.reduce((s, r) => s + (r.pax || 0), 0);
  const tot = rsvps.length || 1;
  const days = o ? Math.ceil((new Date(o.content.date + 'T00:00:00+08:00').getTime() - now) / 864e5) : 0;
  const diraja = o?.package === 'diraja';
  const guestName = (id: string | null) => guests.find((g) => g.id === id)?.name || '—';
  const needsUpgrade = o && o.status === 'live' && needsPayment(o.content, o.package, o.addon_own);
  const epass = diraja && !!o?.content.x_epass;
  const arrivedPax = yes.filter((r) => checkins.has(r.id)).reduce((s, r) => s + (r.pax || 0), 0);
  const q = ciQuery.trim().toLowerCase();
  const ciList = yes.filter((r) => !q || r.name.toLowerCase().includes(q) || rsvpCode(r.id).toLowerCase().includes(q) || r.phone.includes(q));
  const wl = o ? o.content.wishlist.filter((w) => w.name) : [];

  async function toggleCheckin(id: string, isIn: boolean) {
    if (!o) return;
    const sb = supabaseBrowser();
    const { error } = isIn ? await sb.from('checkins').delete().eq('rsvp_id', id) : await sb.from('checkins').insert({ rsvp_id: id, order_id: o.id });
    if (error) { flash(error.message); return; }
    setCheckins((s) => { const n = new Set(s); if (isIn) n.delete(id); else n.add(id); return n; });
    const r = rsvps.find((x) => x.id === id);
    if (r && !isIn) flash(`${r.name} checked in, ${r.pax} pax`);
  }
  function onScan(raw: string) {
    if (!o) return;
    const id = raw.split(':').pop() || '';
    const r = rsvps.find((x) => x.id === id);
    if (!r || !raw.startsWith(`SANDING:${o.slug}:`)) flash('That pass is not for this card');
    else if (checkins.has(id)) flash(`${r.name} is already checked in`);
    else toggleCheckin(id, false);
  }
  async function release(key: string) {
    if (!o) return;
    const { error } = await supabaseBrowser().from('reserves').delete().eq('order_id', o.id).eq('item_key', key);
    if (error) flash(error.message); else { setReserves((l) => l.filter((x) => x.item_key !== key)); flash('Item released'); }
  }

  async function setHidden(w: Wish) {
    const { error } = await supabaseBrowser().from('wishes').update({ hidden: !w.hidden }).eq('id', w.id);
    if (error) flash(error.message); else setWishes((l) => l.map((x) => (x.id === w.id ? { ...x, hidden: !w.hidden } : x)));
  }
  async function delWish(id: string) {
    const { error } = await supabaseBrowser().from('wishes').delete().eq('id', id);
    if (error) flash(error.message); else { setWishes((l) => l.filter((x) => x.id !== id)); flash('Ucapan deleted'); }
  }
  async function delCard() {
    if (!o) return;
    const r = await fetch(`/api/orders/${o.id}`, { method: 'DELETE' });
    if (!r.ok) { flash((await r.json().catch(() => ({}))).error || 'Could not delete.'); return; }
    const rest = orders.filter((x) => x.id !== o.id);
    setOrders(rest); setSel(rest[0]?.id || null); setConfirmDel(false); flash('Card deleted'); router.refresh();
  }
  async function invite(again?: string) {
    if (!o) return;
    const email = (again || inviteEmail).trim();
    const r = await fetch(`/api/orders/${o.id}/members`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email }) });
    const b = await r.json().catch(() => ({}));
    if (!r.ok) { flash(b.error || 'Could not send the invite.'); return; }
    setMembers((l) => [...l.filter((m) => m.id !== b.member.id), b.member]);
    setInviteLink({ email: b.member.email, link: b.link, emailed: b.emailed });
    if (!again) setInviteEmail('');
    flash(b.emailed ? 'Invite sent' : 'Invite link ready');
  }
  async function removeMember(m: Member) {
    if (!o) return;
    const r = await fetch(`/api/orders/${o.id}/members`, { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: m.id }) });
    if (!r.ok) { flash((await r.json().catch(() => ({}))).error || 'Could not remove.'); return; }
    setMembers((l) => l.filter((x) => x.id !== m.id)); flash(`${m.email} no longer has access`);
  }
  async function saveGuests() {
    if (!o) return;
    const r = await fetch(`/api/orders/${o.id}/guests`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ names: guestText.split('\n') }) });
    const b = await r.json().catch(() => ({}));
    if (!r.ok) { flash(b.error || 'Could not save.'); return; }
    setGuests(b.guests); flash('Guest links saved');
  }

  return (
    <div className="dash">
      <div>
        <div className="order-list">
          {orders.map((x) => {
            const t = themeOf(x.content.template);
            const unpaid = x.status === 'draft' && !x.shared;
            return (
              <div key={x.id} className="order-row">
                <button type="button" className="order-item" aria-current={x.id === sel} onClick={() => { setSel(x.id); setConfirmDel(false); }}>
                  <span className="sw" style={{ background: swatchBg(t) }} />
                  <span className="t"><b>{coverNames(x.content).join(' & ')}</b><span>{fmtDate(x.content.date, 'en', false)} · {x.shared ? 'Shared with you' : x.status === 'draft' ? <span className="unpaid">Unpaid draft · saved {when(x.updated_at)}</span> : PKG[x.package!]?.name}</span></span>
                </button>
                {unpaid && <Link className="btn btn-primary btn-sm pay-now" href={`/checkout/${x.id}`} aria-label={`Pay now for ${coverNames(x.content).join(' & ')}`}>Pay now</Link>}
              </div>
            );
          })}
        </div>
        <Link className="btn btn-ghost" href="/create?fresh=1" style={{ width: '100%', marginTop: 12 }}>New card</Link>
      </div>

      {o && <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'start', marginBottom: 18 }}>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: 32 }}>{coverNames(o.content).join(' & ')}</h2>
            <p className="muted" style={{ marginTop: 6 }}>{themeOf(o.content.template).name} · {fmtDate(o.content.date, 'en')} · <span className={`tag ${o.status === 'draft' ? 'brass' : ''}`}>{o.status === 'draft' ? 'Draft, not published' : PKG[o.package!]?.name}</span></p>
            {o.slug && <p style={{ marginTop: 6, fontSize: 13 }}><code>{displayLink(o.slug)}</code> <span className="conn" style={{ display: 'inline-flex', marginLeft: 8 }}><i style={{ background: live ? 'var(--ok)' : undefined }} /><span>{live ? 'Updates live' : 'Connecting…'}</span></span></p>}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {o.status === 'live'
              ? <Link className="btn btn-primary btn-sm" href={`/${o.slug}`} target="_blank">Open card</Link>
              : !ro && <Link className="btn btn-primary btn-sm" href={`/checkout/${o.id}`}>Pay & publish</Link>}
            {!ro && <Link className="btn btn-ghost btn-sm" href={`/editor/${o.id}`}>Edit</Link>}
            {!ro && <button className="btn btn-danger btn-sm" onClick={() => setConfirmDel(true)}>Delete</button>}
          </div>
        </div>
        {confirmDel && <div className="confirm-bar" style={{ marginBottom: 16 }}>
          <span>Delete this card and its {rsvps.length} RSVPs and {wishes.length} ucapan? Guests will no longer be able to open it.</span>
          <button className="btn btn-sm" style={{ background: 'var(--danger)', color: '#fff' }} onClick={delCard}>Delete card</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDel(false)}>Keep it</button>
        </div>}
        {ro && <p className="demo-note shared-note">The couple shared this card with you. You can follow RSVPs, ucapan, the wishlist and check-ins; only they can edit or moderate.</p>}
        {needsUpgrade && !ro && <p className="demo-note" style={{ marginBottom: 16 }}>Some things you turned on are not paid for yet ({PKG[needPkg(o.content).id].name} package{o.content.ownDesign && !o.addon_own ? ', own design' : ''}) and stay hidden from guests. <Link href={`/checkout/${o.id}`}>Pay the difference</Link></p>}

        <div className="kpis k6">
          <div className="kpi"><b>{pax}</b><span>Total pax attending</span></div>
          <div className="kpi"><b>{yes.length}</b><span>RSVPs attending</span></div>
          <div className="kpi"><b>{no.length}</b><span>Can’t attend</span></div>
          <div className="kpi"><b>{opens}</b><span>Card opens</span></div>
          <div className="kpi"><b>{epass ? `${arrivedPax}/${pax}` : reserves.length}</b><span>{epass ? 'Pax checked in' : 'Gifts reserved'}</span></div>
          <div className="kpi"><b>{days > 0 ? days : days === 0 ? 'Today' : 'Done'}</b><span>{days > 0 ? 'Days to the majlis' : 'Majlis day'}</span></div>
        </div>
        <div style={{ marginBlock: '14px 22px' }}>
          <div className="meter" role="img" aria-label={`${yes.length} attending, ${no.length} not attending`}>
            <i style={{ width: `${rsvps.length ? (yes.length / tot) * 100 : 0}%`, background: 'var(--ok)' }} /><i style={{ width: `${rsvps.length ? (no.length / tot) * 100 : 0}%`, background: 'var(--danger)' }} />
          </div>
          <p className="muted" style={{ fontSize: 12, marginTop: 6 }}>{rsvps.length} replies{o.content.deadline ? ` · RSVP closes ${fmtDate(o.content.deadline, 'en', false)}` : ''}{o.content.maxPax ? ` · up to ${o.content.maxPax} pax each` : ''}{o.valid_until ? ` · online until ${new Date(o.valid_until).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}</p>
        </div>

        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'rsvp'} onClick={() => setTab('rsvp')}>RSVP list</button>
          <button role="tab" aria-selected={tab === 'wishes'} onClick={() => setTab('wishes')}>Ucapan <span className="muted">{wishes.length}</span></button>
          <button role="tab" aria-selected={tab === 'wishlist'} onClick={() => setTab('wishlist')}>Wishlist <span className="muted">{reserves.length}</span></button>
          <button role="tab" aria-selected={tab === 'checkin'} onClick={() => setTab('checkin')}>Check-in</button>
          <button role="tab" aria-selected={tab === 'links'} onClick={() => setTab('links')}>Guest links</button>
          {!ro && <button role="tab" aria-selected={tab === 'family'} onClick={() => setTab('family')}>Family access</button>}
        </div>

        {tab === 'rsvp' && <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <span className="muted" style={{ fontSize: 13 }}>Newest first</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{!diraja && <span className="tag brass">Diraja</span>}
              {diraja && rsvps.length ? <a className="btn btn-ghost btn-sm" href={`/api/orders/${o.id}/rsvps.csv`} download>Export CSV</a> : <button className="btn btn-ghost btn-sm" disabled>Export CSV</button>}</span>
          </div>
          {rsvps.length ? <div className="tbl-wrap"><table>
            <thead><tr><th>Name</th><th>Phone</th><th>Reply</th><th style={{ textAlign: 'right' }}>Pax</th><th>Note</th><th>Via link</th><th>Received</th><th /></tr></thead>
            <tbody>{rsvps.map((r) => <tr key={r.id}><td>{r.name}</td><td>{r.phone}</td><td><span className={`pill ${r.attending ? 'yes' : 'no'}`}>{r.attending ? 'Attending' : 'Can’t attend'}</span></td><td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{r.attending ? r.pax : '—'}</td><td className="wrap-cell">{r.note || '—'}</td><td>{guestName(r.guest_id)}</td><td>{when(r.updated_at || r.created_at)}</td>
              <td>{diraja && r.attending && o.slug ? <a className="btn btn-ghost btn-sm" href={remindUrl(o, r)} target="_blank" rel="noopener">Remind</a> : null}</td></tr>)}</tbody>
          </table></div> : <div className="empty"><b>No replies yet</b><p className="muted" style={{ maxWidth: '44ch' }}>{o.status === 'live' ? 'Replies appear here as soon as guests send them from the card. Open the card and send a test reply to see it.' : 'Publish the card to start collecting replies.'}</p></div>}
        </>}

        {tab === 'wishes' && (wishes.length ? <div className="wish-admin">{wishes.map((w) => (
          <div key={w.id} className={`w ${w.hidden ? 'hidden-w' : ''}`}>
            <div style={{ minWidth: 0 }}><b>{w.name}</b> <span className="muted" style={{ fontSize: 12 }}>{new Date(w.created_at).toLocaleDateString('en-MY', { day: 'numeric', month: 'short' })}{w.hidden ? ' · hidden from guests' : ''}</span><p style={{ marginTop: 4, overflowWrap: 'anywhere' }}>{w.msg}</p></div>
            {!ro && <div style={{ display: 'flex', gap: 6, flex: '0 0 auto' }}><button className="btn btn-ghost btn-sm" onClick={() => setHidden(w)}>{w.hidden ? 'Show' : 'Hide'}</button><button className="btn btn-danger btn-sm" onClick={() => delWish(w.id)}>Delete</button></div>}
          </div>))}</div>
          : <div className="empty"><b>No ucapan yet</b><p className="muted">Wishes from guests appear here. Hide any message before others see it.</p></div>)}

        {tab === 'wishlist' && (o.content.x_wishlist && wl.length ? <div className="wish-admin">{wl.map((w, i) => {
          const r = reserves.find((x) => x.item_key === `i${i}`);
          return (
            <div key={i} className="w">
              <div style={{ minWidth: 0 }}><b>{w.name}</b> {w.price && <span className="muted" style={{ fontSize: 12 }}>{w.price}</span>}<p className="muted" style={{ marginTop: 4 }}>{r ? `Reserved by ${r.name} · ${when(r.at)}` : 'Not reserved yet'}</p></div>
              {r && !ro && <button className="btn btn-ghost btn-sm" onClick={() => release(r.item_key)}>Release</button>}
            </div>
          );
        })}</div> : <div className="empty"><span className="tag">Premium</span><b>Gift wishlist</b><p className="muted" style={{ maxWidth: '46ch' }}>List the gifts you would like; guests reserve one so nobody brings the same thing. Turn on Gift wishlist in Edit, then Extras.</p></div>)}

        {tab === 'checkin' && (epass ? <>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            <input type="search" aria-label="Search guests" placeholder="Search name, phone or 6-letter code" value={ciQuery} onChange={(e) => setCiQuery(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
            {canScan() && !ro && <button className="btn btn-primary btn-sm" onClick={() => setScanning((s) => !s)}>{scanning ? 'Stop camera' : 'Scan QR'}</button>}
          </div>
          {scanning && <QrScanner onCode={onScan} onError={(m) => { flash(m); setScanning(false); }} />}
          <p className="muted" style={{ fontSize: 13, marginBottom: 10 }}>{yes.filter((r) => checkins.has(r.id)).length} of {yes.length} parties arrived · {arrivedPax} of {pax} pax</p>
          {ciList.length ? <div className="tbl-wrap"><table>
            <thead><tr><th>Code</th><th>Name</th><th style={{ textAlign: 'right' }}>Pax</th><th>Status</th><th /></tr></thead>
            <tbody>{ciList.map((r) => { const isIn = checkins.has(r.id); return (
              <tr key={r.id}><td><code>{rsvpCode(r.id)}</code></td><td>{r.name}</td><td style={{ textAlign: 'right' }}>{r.pax}</td>
                <td>{isIn ? <span className="pill in">Arrived</span> : <span className="muted">Expected</span>}</td>
                <td>{!ro && <button className={`btn ${isIn ? 'btn-ghost' : 'btn-primary'} btn-sm`} onClick={() => toggleCheckin(r.id, isIn)}>{isIn ? 'Undo' : 'Check in'}</button>}</td></tr>); })}</tbody>
          </table></div> : <div className="empty"><b>{q ? 'No guest matches' : 'No attending guests yet'}</b></div>}
        </> : <div className="empty"><span className="tag brass">Diraja</span><b>Check guests in on the day</b><p className="muted" style={{ maxWidth: '48ch' }}>Every attending guest gets an e-pass with a QR code. At the reception desk, scan it with this page or search by name or code, and watch the pax count fill up. Turn on the e-pass in Edit, then Extras, then RSVP.</p></div>)}

        {tab === 'links' && (diraja ? <>
          {!ro && <><div className="field"><label htmlFor="d-guests">Guest names, one per line</label><textarea id="d-guests" rows={5} placeholder={'Pak Long Hashim & keluarga\nCikgu Rohani'} value={guestText} onChange={(e) => setGuestText(e.target.value)} /></div>
          <div style={{ marginTop: 10 }}><button className="btn btn-primary btn-sm" onClick={saveGuests}>Save guest links</button></div></>}
          <div className="rows" style={{ marginTop: 14 }}>
            {guests.length ? guests.map((g) => {
              const url = `${SITE_URL}/${o.slug}/${g.token}`;
              const wa = `https://wa.me/?text=${encodeURIComponent(`Kepada ${g.name}, dengan segala hormatnya kami menjemput anda ke majlis kami. Kad jemputan: ${url}`)}`;
              return <div className="order-item" style={{ cursor: 'default' }} key={g.id}><span className="t"><b>{g.name}</b><span>{displayLink(`${o.slug}/${g.token}`)}</span></span>
                <Link className="btn btn-ghost btn-sm" href={`/${o.slug}/${g.token}`} target="_blank">Preview</Link><a className="btn btn-ghost btn-sm" href={wa} target="_blank" rel="noopener">WhatsApp</a></div>;
            }) : <p className="muted" style={{ fontSize: 13 }}>Type names above and save to get a link for each guest.</p>}
          </div>
        </> : <div className="empty"><span className="tag brass">Diraja</span><b>Personal guest links</b><p className="muted" style={{ maxWidth: '46ch' }}>Put each guest&apos;s name on the cover of their card. Turn on Personal guest links in Edit, then Extras, and pay the upgrade.</p></div>)}

        {tab === 'family' && !ro && <>
          <p className="muted" style={{ maxWidth: '60ch', fontSize: 14 }}>Let parents or siblings follow RSVPs, ucapan, the wishlist and check-ins from their own phone. They get read-only access: they cannot edit the card, hide ucapan or delete replies.</p>
          <form style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }} onSubmit={(e) => { e.preventDefault(); invite(); }}>
            <input type="email" aria-label="Family member's email" placeholder="mak@example.com" required value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
            <button className="btn btn-primary btn-sm">Send invite</button>
          </form>
          {inviteLink && <div className="demo-note" style={{ marginTop: 12 }}>
            {inviteLink.emailed ? <>We emailed a sign-in link to <b>{inviteLink.email}</b>. </> : <>The email could not be sent. </>}You can also send them this link on WhatsApp; it only works for {inviteLink.email}.
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText(inviteLink.link).then(() => flash('Link copied'), () => flash(inviteLink.link))}>Copy link</button>
              <a className="btn btn-ghost btn-sm" target="_blank" rel="noopener" href={`https://wa.me/?text=${encodeURIComponent(`Saya kongsikan senarai RSVP majlis kami. Log masuk dengan ${inviteLink.email}: ${inviteLink.link}`)}`}>WhatsApp</a>
            </div>
          </div>}
          <div className="members">
            {members.length ? members.map((m) => <div className="order-item" style={{ cursor: 'default' }} key={m.id}><span className="t"><b>{m.email}</b><span>{m.accepted_at ? `Joined ${when(m.accepted_at)}` : `Invited ${when(m.created_at)}, not opened yet`}</span></span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => invite(m.email)}>Resend</button>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => removeMember(m)}>Remove</button></div>)
              : <p className="muted" style={{ fontSize: 13 }}>Nobody else has access yet.</p>}
          </div>
        </>}
      </div>}
      <div className={`toast ${toast ? 'on' : ''}`} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}
