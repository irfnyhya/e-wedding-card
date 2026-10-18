import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { Demo, Families, HeroTable } from '@/components/HomeCards';
import { PKGS } from '@/lib/card';
import { FAMILIES, THEMES } from '@/lib/invite/engine';

const DESIGNS = THEMES.length;
const FAMILY_COUNT = Object.keys(FAMILIES).filter((k) => THEMES.some((t) => t.fam === k)).length;

const DEFS: [string, string][] = [
  ['RSVP', 'Attending or not, with a pax limit per reply and a closing date. You see the total pax for the caterer.'],
  ['Ucapan', 'A wall of wishes on the card. Hide any message before other guests see it.'],
  ['Lokasi', 'Google Maps and Waze buttons, plus add to Google Calendar.'],
  ['Salam kaut', 'Bank account with one-tap copy and your DuitNow QR.'],
  ['Aturcara', 'The programme of the day, from ketibaan tetamu to bersurai.'],
  ['Pautan peribadi', 'A link for each guest with their name on the envelope: "Dengan hormatnya kepada Pak Long Hashim".'],
  ['Muzik', 'Four original tracks that start when the card is opened: soft swing jazz, piano, music box or gamelan.'],
  ['Dua bahasa', 'The whole card in Bahasa Melayu or English, with Bismillah and doa if you want them.'],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow">Koleksi 2026 · Kad kahwin digital</p>
            <h1>Invitations your guests <em>open</em>, not scroll&nbsp;past.</h1>
            <p className="lead">{DESIGNS} designs in {FAMILY_COUNT} families, on real paper, silk and velvet, with flowers from Redouté&apos;s botanical plates. Guests break a wax seal, open carved doors, unwrap songket or turn over an old postcard of Malaya. Then they RSVP, leave an ucapan and find the venue on the same card.</p>
            <div className="ctas"><Link className="btn btn-primary" href="/create?fresh=1">Create your card</Link><Link className="btn btn-link" href="/designs">See the collection &rarr;</Link></div>
            <p className="fine">From RM29 &middot; Bahasa Melayu or English &middot; ready in five minutes</p>
          </div>
          <HeroTable />
        </div>

        <section className="band">
          <div className="wrap">
            <div className="band-head"><div><p className="eyebrow">The collection</p><h2>{FAMILY_COUNT} families, each opens its own way</h2></div><p>Pick a family for how the card opens, then one of its colourways. Every design includes RSVP, ucapan, directions and music.</p></div>
            <Families />
          </div>
        </section>

        <section className="band dark"><Demo /></section>

        <section className="band">
          <div className="wrap two">
            <div><p className="eyebrow">On every card</p><h2>What your guests can do</h2><p className="muted" style={{ marginTop: 14, maxWidth: '36ch' }}>And what comes back to you, in the dashboard, while the cards are still going out on WhatsApp.</p></div>
            <dl className="defs">{DEFS.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
          </div>
        </section>

        <section className="band sunk" id="pricing">
          <div className="wrap two">
            <div><p className="eyebrow">Prices</p><h2>One payment, no subscription</h2><p className="muted" style={{ marginTop: 14, maxWidth: '36ch' }}>The package sets itself from the features you turn on. Upgrade later and pay only the difference.</p></div>
            <div className="pricelist">
              {PKGS.map((p, i) => (
                <div className="price-row" key={p.id}>
                  <div className="top"><h3>{p.name}</h3><span className="lead-dots" /><b>RM{p.price}</b></div>
                  <p>{p.feats.join(' · ')}</p>
                  <div className="row-cta"><Link href="/create?fresh=1" className={`btn ${i === 1 ? 'btn-primary' : 'btn-ghost'} btn-sm`}>Start with {p.name}</Link></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="wrap two">
            <div><p className="eyebrow">Soalan</p><h2>Questions couples ask</h2></div>
            <div className="faq">
              <details><summary>Can I change details after paying?</summary><p>Yes. Open My cards, choose Edit and save. Guests see the change the next time they open the card. A bigger package charges only the difference.</p></details>
              <details><summary>Do guests need to install anything?</summary><p>No. The card opens in any phone browser, straight from WhatsApp, Telegram or Instagram.</p></details>
              <details><summary>Can we have two cards, for nikah and bertandang?</summary><p>Yes. Each card has its own date, venue and RSVP list.</p></details>
              <details><summary>Where do the flowers come from?</summary><p>They are hand-coloured botanical plates by Pierre-Joseph Redouté and his contemporaries, printed in the early 1800s and now in the public domain.</p></details>
            </div>
          </div>
        </section>
        <footer className="site-foot"><div className="wrap"><span className="wm-small">Sanding</span><span>Botanical plates courtesy of the Cleveland Museum of Art and Wikimedia Commons; Malaya postcards c.1906–1930. All public domain. <Link href="/contoh">See a sample card</Link></span></div></footer>
      </main>
    </>
  );
}
