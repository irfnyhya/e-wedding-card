# Sanding — kad kahwin digital

Next.js (App Router) + Supabase app for Malaysian e-wedding cards: 462 designs in 37 families (counts come from the generated engine), filterable by
family and colour, BM/EN, live editor,
package pricing (Asas RM29 / Premium RM59 / Diraja RM99), FPX checkout through ToyyibPay,
public invitation with RSVP, ucapan, salam kaut, countdown, Waze/Maps, synthesised music,
personal guest links, gift wishlist with reservations, up to 3 gift accounts, livestream link,
Apple/Outlook .ics, live attendance counter, particle effects, own-design front page (+RM10), and a Diraja
guest e-pass (QR) with day-of check-in. The owner dashboard has live updates, card-open counts, WhatsApp
reminders, a camera QR check-in tab and CSV export.

## Run locally

Needs Node 20+ and Docker Desktop (for the local Supabase stack).

```bash
npm install
npm run setup        # supabase start + writes .env.local from `supabase status`
npm run db:reset     # applies migrations and supabase/seed.sql
npm run dev          # http://localhost:3000
```

Seeded test login (local only): `demo@sanding.test` / `sanding-demo-123`.
It owns a live Diraja card at <http://localhost:3000/aisyah-aiman> (guest links
`/aisyah-aiman/paklong1`, `/aisyah-aiman/cikgu7r2`) with sample RSVPs and ucapan, plus one draft.
`/contoh` is the sample card. Supabase Studio: <http://127.0.0.1:54323>, test emails: <http://127.0.0.1:54324>.

## Test the whole flow

1. Log in, press **Create card**, edit, and on Review press **Continue to payment**.
2. Pick a link and pay. With `PAYMENT_PROVIDER=mock` you land on a local stand-in FPX page;
   press **Approve payment**. With `PAYMENT_PROVIDER=toyyibpay` you go to the ToyyibPay sandbox.
3. The return page verifies the bill with the gateway and publishes the card.
4. Open the card link in a private window (signed out), RSVP and send an ucapan.
5. The dashboard shows them live (Supabase Realtime, with a 30 s polling fallback).

## ToyyibPay sandbox

1. Register at <https://dev.toyyibpay.com>, create a category, copy the **User Secret Key** and **Category Code**.
2. In `.env.local` set `PAYMENT_PROVIDER=toyyibpay`, `TOYYIBPAY_SECRET_KEY`, `TOYYIBPAY_CATEGORY_CODE`, `TOYYIBPAY_SANDBOX=true`.
3. Restart `npm run dev` and pay; on the FPX page choose the sandbox test bank.

ToyyibPay cannot POST callbacks to localhost. That is fine: `/checkout/[id]/return` calls
`getBillTransactions` server-side before publishing. To exercise the callback too, expose the app
with a tunnel and set `PAYMENT_CALLBACK_BASE_URL` to the tunnel URL. Callbacks are checked with the
documented MD5 hash and re-verified with the gateway; amounts must match the stored payment.

## Updating the designs

The design system is generated from the single-file prototype (`../src`, `../assets`, `../tools/build.sh`):

```bash
npm run port:prototype
```

This rewrites `src/lib/invite/engine.js`, the generated part of `src/app/globals.css`, `src/app/fonts.ts` and
`public/assets/`, applying the app's fixes (asset base path, SSR-safe motion check, URL escaping). Page copy and
template validation read counts and ids from the engine, so new families or colourways need no other change.

## How it fits together

| Piece | Where |
| --- | --- |
| Schema, RLS, rate limits, payment finalisation, storage bucket | `supabase/migrations/20261016000000_init.sql` |
| Seed data | `supabase/seed.sql` |
| Design families, colourways, legacy id map, BM/EN copy, music, renderer (ported from prototype 3a–3f) | `src/lib/invite/engine.js` |
| Paper/linen/silk/velvet/foil/marble textures, wax seals, Redouté flowers, engraving masks, rococo frames, Malaya postcards (all public domain) | `public/assets/` |
| Site and invitation CSS (prototype `1-head.html` + `3s-inv.html` + `3t-inv2.html` + `3u-inv3.html`) | `src/app/globals.css` |
| Packages, pricing, content sanitising, feature gating | `src/lib/card.ts` |
| Gateway adapter (ToyyibPay + mock) | `src/lib/payments/index.ts` |
| Public card `/[slug]`, `/[slug]/[guest]` | `src/app/[slug]`, `src/lib/publicCard.ts` |
| Guest writes (anonymous, rate-limited) | `src/app/api/i/[slug]/{rsvp,wishes}` → `submit_rsvp()` / `submit_wish()` |
| Owner API (save, delete, checkout, guest links, CSV) | `src/app/api/orders/**` |
| Editor, checkout, dashboard | `src/app/editor`, `src/app/checkout`, `src/app/dashboard` |

Security notes:
- Guests never talk to Postgres directly. Their RSVP/ucapan go through route handlers that hash the IP
  and call `security definer` functions (granted to `service_role` only) which check the card is live,
  the deadline, the pax cap, and per-IP / per-card rate limits. A hidden honeypot field drops bots.
- One RSVP per phone number per card; replying again updates it.
- Wishlist reservations go through `submit_reserve()` / `cancel_reserve()`. The guest's browser keeps a random secret
  (only its SHA-256 is stored) so only that guest, or the owner, can release the item. Guests only see *that* an
  item is taken, never by whom. Card opens (`record_view()`) and reservations are rate-limited per IP like RSVPs.
- The e-pass QR is `SANDING:{slug}:{rsvpId}`; check-ins are owner-only rows (RLS) and the scanner rejects passes
  for other cards. The QR library is bundled from npm rather than loaded from a CDN at runtime.
- Paid extras are gated on the server: wishlist/counter (Premium), e-pass (Diraja) and the own-design image
  (only after its add-on is paid) are stripped before a card reaches guests.
- Owners read their own orders, RSVPs, wishes and guests under RLS; they may only flip `hidden` or delete
  wishes and delete RSVPs. Orders, payments and guest links are written by server routes only.
- Paid extras are enforced on the server: `gate()` switches off anything above the paid package before a
  card reaches guests, so editing in an extra without paying never shows it.
- Uploads go to the public `card-media` bucket under `<user id>/<order id>/`, resized in the browser,
  2 MB max, images only; owners can write only under their own folder.

Old template ids from the first collection (`songket`, `sage`, …) map to new designs (`LEGACY_TEMPLATES` in
`src/lib/card.ts`, `LEGACY` in the engine), so existing orders keep rendering. The seeded draft uses `sage` on purpose.

## Deploy

1. Create a Supabase project, then `npx supabase link` and `npx supabase db push`.
2. In Supabase Auth settings set the Site URL and add `https://your-domain/**` to redirect URLs.
3. Deploy to Vercel (or any Node host) with the env vars from `.env.example`, using live ToyyibPay keys
   and `TOYYIBPAY_SANDBOX=false` when ready.
