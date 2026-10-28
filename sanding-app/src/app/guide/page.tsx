import Link from 'next/link';
import type { ReactNode } from 'react';
import SiteHeader from '@/components/SiteHeader';

export const metadata = { title: 'How to use My cards', description: 'Share your link, read RSVPs and ucapan, make guest links and check guests in on the day.' };

const WA = 'https://wa.me/60184090065?text=Hi%20Sanding%2C%20saya%20perlukan%20bantuan%20dengan%20kad%20saya.';

/** A look-alike of a dashboard button or tab, so the guide shows what to press. Not clickable. */
const B = ({ k = 'ghost', children }: { k?: 'primary' | 'ghost' | 'danger' | 'tab'; children: ReactNode }) =>
  k === 'tab' ? <span className="g-tab">{children}</span> : <span className={`btn btn-${k} btn-sm g-btn`}>{children}</span>;
const Pkg = ({ p }: { p: 'Permata' | 'Diraja' }) => <span className={`tag ${p === 'Diraja' ? 'brass' : ''}`}>{p}</span>;

const TOC: [string, string, ('Permata' | 'Diraja')?][] = [
  ['find', 'Find your card'],
  ['share', 'Send your link'],
  ['numbers', 'The six numbers'],
  ['rsvp', 'RSVP list'],
  ['ucapan', 'Ucapan', 'Permata'],
  ['links', 'Personal guest links', 'Permata'],
  ['wishlist', 'Gift wishlist', 'Permata'],
  ['checkin', 'Check-in on the day', 'Diraja'],
  ['family', 'Family access'],
  ['edit', 'Change your card'],
  ['help', 'Need help?'],
];

function Step({ id, n, title, pkg, children }: { id: string; n: number; title: string; pkg?: 'Permata' | 'Diraja'; children: ReactNode }) {
  return (
    <section id={id} className="g-sec">
      <div className="g-n" aria-hidden="true">{n}</div>
      <div className="g-body">
        <h2>{title} {pkg && <Pkg p={pkg} />}</h2>
        {children}
      </div>
    </section>
  );
}

export default function GuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap guide">
        <div className="page-head">
          <p className="eyebrow">Guide</p>
          <h1 style={{ marginTop: 10, fontSize: 'clamp(30px,4.6vw,52px)' }}>Your card is live. Here is how to use it.</h1>
          <p className="muted g-lede">Everything after payment happens in <b>My cards</b>: your link, every RSVP and ucapan, guest links and check-in on the day. It works on your phone as well as a computer. Parts marked <Pkg p="Permata" /> or <Pkg p="Diraja" /> come with those packages.</p>
          <p style={{ marginTop: 18 }}><Link className="btn btn-primary" href="/dashboard">Go to My cards</Link></p>
        </div>

        <div className="g-grid">
          <nav className="g-toc" aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <ol>{TOC.map(([id, t, p]) => <li key={id}><a href={`#${id}`}>{t}</a>{p && <> <Pkg p={p} /></>}</li>)}</ol>
          </nav>

          <div className="g-steps">
            <Step id="find" n={1} title="Find your card">
              <ol>
                <li>Go to <b>kadkahwin.website</b> and log in with the <b>same email you paid with</b>.</li>
                <li>Press <B>My cards</B> at the top of the page.</li>
                <li>Your cards are listed on the left (on a phone, at the top). Press a card to see its replies.</li>
              </ol>
              <p className="g-tip">Bookmark My cards on your phone so you can open it in one tap on the wedding day.</p>
            </Step>

            <Step id="share" n={2} title="Send your link">
              <p>Your link sits under the couple&apos;s names, for example <code>kadkahwin.website/aesya-irfan</code>.</p>
              <ol>
                <li>Press <B k="primary">Open card</B> to see the card exactly as guests will.</li>
                <li>Copy the link from your browser&apos;s address bar and paste it into WhatsApp, Telegram, Instagram or Facebook.</li>
                <li>Guests open it straight in their phone browser. They don&apos;t install anything.</li>
              </ol>
              <p className="g-tip">Want each guest&apos;s name on the cover? Use personal guest links (step 6) instead of the shared link.</p>
            </Step>

            <Step id="numbers" n={3} title="The six numbers at the top">
              <div className="g-kpis">
                {[['Total pax attending', 'Everyone coming, counting each party’s pax. Use this for the caterer.'],
                  ['RSVPs attending', 'How many replies said yes.'],
                  ['Can’t attend', 'How many replies said no.'],
                  ['Card opens', 'How many times the card was opened.'],
                  ['Pax checked in / Gifts reserved', 'On the day: how many guests have arrived (Diraja). Otherwise: gifts reserved from your wishlist.'],
                  ['Days to the majlis', 'A countdown to the date on your card.']].map(([h, p]) => <div key={h}><b>{h}</b><span>{p}</span></div>)}
              </div>
              <p>Under the boxes you&apos;ll see the number of replies, your RSVP closing date, the pax limit per guest and the date your card goes offline. The green <b>Updates live</b> dot means new replies appear without refreshing the page.</p>
            </Step>

            <Step id="rsvp" n={4} title="RSVP list">
              <p>Open the <B k="tab">RSVP list</B> tab. Each reply shows the guest&apos;s name, phone, <b>Attending</b> or <b>Can&apos;t attend</b>, pax, any note, which guest link they used and when they replied. The newest replies are at the top.</p>
              <ul>
                <li><B>Export CSV</B> <Pkg p="Diraja" /> downloads the whole list as a spreadsheet for Excel or Google Sheets, ready for the caterer or the seating plan.</li>
                <li><B>Remind</B> <Pkg p="Diraja" /> opens WhatsApp with a ready-made reminder to that guest: the date, time, venue and their guest code.</li>
              </ul>
              <p className="g-tip">A guest who replies again with the same phone number updates their earlier reply instead of adding a new one, until the RSVP closing date.</p>
            </Step>

            <Step id="ucapan" n={5} title="Read and manage ucapan" pkg="Permata">
              <p>Open the <B k="tab">Ucapan</B> tab to read every wish guests left on the card.</p>
              <ul>
                <li><B>Hide</B> takes a message off the card but keeps it here for you. Press <B>Show</B> to put it back.</li>
                <li><B k="danger">Delete</B> removes it for good.</li>
              </ul>
              <p>If the ucapan wall isn&apos;t showing on your card, turn on <b>Ucapan</b> in <B>Edit</B>, then the <b>Extras</b> step.</p>
            </Step>

            <Step id="links" n={6} title="Personal guest links" pkg="Permata">
              <p>Each guest gets their own link, with <i>Kepada Pak Long Hashim &amp; keluarga</i> on the cover. Their reply shows in the RSVP list under <b>Via link</b>, so you know who has answered.</p>
              <ol>
                <li>First turn on <b>Guest links</b> in <B>Edit</B>, then the <b>Extras</b> step.</li>
                <li>Open the <B k="tab">Guest links</B> tab.</li>
                <li>Type one name per line, written the way it should appear on the card, for example <i>Cikgu Rohani</i> or <i>Keluarga Encik Ahmad</i>.</li>
                <li>Press <B k="primary">Save guest links</B>. A link appears for every name.</li>
                <li>Press <B>WhatsApp</B> next to a name to send that guest their card. <B>Preview</B> shows the card with their name on it.</li>
              </ol>
              <p className="g-tip">You can add names any time. Names already on the list keep the same link when you save again; if you change how a name is spelt, that guest gets a new link.</p>
            </Step>

            <Step id="wishlist" n={7} title="Gift wishlist" pkg="Permata">
              <ol>
                <li>Add the gifts you&apos;d like in <B>Edit</B>, then the <b>Extras</b> step, under <b>Wishlist</b>.</li>
                <li>Guests reserve a gift on the card so nobody buys the same one twice.</li>
                <li>The <B k="tab">Wishlist</B> tab shows who reserved what. <B>Release</B> makes an item available again, for example if a guest changed their mind.</li>
              </ol>
            </Step>

            <Step id="checkin" n={8} title="Check guests in on the day" pkg="Diraja">
              <p><b>Before the day:</b> in <B>Edit</B>, then the <b>Extras</b> step, tick <i>Give each attending guest an e-pass with a QR code</i>, then save. Every guest who replies <b>Attending</b> gets an e-pass on the card, with a QR code and a 6-letter code. Turn it on before you send the card out, so every guest gets a pass when they reply.</p>
              <p><b>At the reception desk:</b></p>
              <ol>
                <li>Log in on the phone at the desk with <b>your own email</b> and open the <B k="tab">Check-in</B> tab.</li>
                <li>Press <B k="primary">Scan QR</B> and allow the camera. Point it at the guest&apos;s e-pass. The page shows their name and pax and marks them <b>Arrived</b>.</li>
                <li>No pass with them? Search by name, phone or the 6-letter code and press <B k="primary">Check in</B>.</li>
                <li>Checked in the wrong guest? Press <B>Undo</B>.</li>
              </ol>
              <p>The numbers at the top count up as guests arrive, for example <b>86/120 pax checked in</b>.</p>
              <p className="g-tip">Family access can follow check-ins but can&apos;t check guests in. Whoever runs the desk needs to log in with your account. Test the camera the day before.</p>
            </Step>

            <Step id="family" n={9} title="Family access">
              <p>Let parents or siblings follow RSVPs, ucapan, the wishlist and check-ins from their own phone. They can only look. They can&apos;t edit the card, hide ucapan or delete replies.</p>
              <ol>
                <li>Open the <B k="tab">Family access</B> tab.</li>
                <li>Type their email and press <B k="primary">Send invite</B>.</li>
                <li>They get an email with a sign-in link. You can also press <B>Copy link</B> or <B>WhatsApp</B> and send it yourself. The link only works for that email.</li>
                <li>Their name shows <i>Joined</i> once they open it. <B>Resend</B> sends the invite again, and <B k="danger">Remove</B> takes their access away.</li>
              </ol>
            </Step>

            <Step id="edit" n={10} title="Change your card">
              <ol>
                <li>Press <B>Edit</B>. The editor has six steps: <b>Design, Couple, Majlis, Content, Extras, Review</b>.</li>
                <li>Change anything: the design, names, date, venue, aturcara, photos, music or wording.</li>
                <li>Press <B k="primary">Next</B> until the last step, then <B k="primary">Save changes</B>. Guests see the change the next time they open the card. The link stays the same.</li>
              </ol>
              <p>If you turn on something from a bigger package, the last button reads <B k="primary">Upgrade and pay</B>. You only pay the difference. Until then, that feature stays hidden from guests.</p>
              <p className="g-tip">Your card stays online for one year from payment, and you can edit it as often as you like.</p>
            </Step>

            <Step id="help" n={11} title="Need help?">
              <p>WhatsApp or call Irfan Hakimi at <a href={WA} target="_blank" rel="noopener">018-409 0065</a>. Tell us the couple&apos;s names or your card link and we&apos;ll sort it out.</p>
              <p style={{ marginTop: 16 }}><Link className="btn btn-primary" href="/dashboard">Go to My cards</Link></p>
            </Step>
          </div>
        </div>
      </main>
    </>
  );
}
