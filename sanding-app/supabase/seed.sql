-- Local seed data. Test login (local only): demo@sanding.test / sanding-demo-123
do $$
declare
  uid uuid := '11111111-1111-4111-8111-111111111111';
  live_id uuid := '22222222-2222-4222-8222-222222222222';
  draft_id uuid := '33333333-3333-4333-8333-333333333333';
  g1 uuid := gen_random_uuid();
  g2 uuid := gen_random_uuid();
  card jsonb := '{
    "template":"sampul-merah","lang":"ms","jawi":"ع ا","bismillah":true,"useAccent":false,"accent":"#7a1b29",
    "brideFull":"Nur Aisyah Humaira binti Ahmad Faizal","brideShort":"Aisyah",
    "groomFull":"Muhammad Aiman Hakimi bin Rahman","groomShort":"Aiman",
    "hosts":"Ahmad Faizal bin Yusof & Siti Khadijah binti Ismail","side":"bride","eventTitle":"walimah",
    "date":"2026-12-19","hijri":"8 Rejab 1448H","start":"11:00","end":"16:00",
    "venue":"Dewan Seri Melati","address":"Jalan Kristal 7/62, Seksyen 7, 40000 Shah Alam, Selangor","dress":"Maroon & gading",
    "schedule":[{"time":"11:00","label":"Ketibaan tetamu"},{"time":"12:30","label":"Ketibaan pengantin"},{"time":"13:00","label":"Makan beradab & bacaan doa"},{"time":"16:00","label":"Majlis bersurai"}],
    "x_rsvp":true,"maxPax":5,"deadline":"2026-12-05","x_wishes":true,"x_music":true,"music":"piano",
    "x_gallery":false,"photos":[],"x_gift":true,"bank":"Maybank","accName":"Nur Aisyah Humaira","accNo":"1621 8840 3317","qr":"",
    "x_contacts":true,"contacts":[{"name":"Ahmad Faizal","role":"Bapa pengantin","phone":"012-345 6789"},{"name":"Hafiz","role":"Abang pengantin","phone":"019-876 5432"}],
    "x_guestlinks":true,
    "x_counter":true,"x_epass":true,"effect":"kelopak","livestream":"https://youtube.com/live/sanding-demo",
    "gifts":[{"bank":"Maybank","accName":"Nur Aisyah Humaira","accNo":"1621 8840 3317"},{"bank":"Touch ’n Go eWallet","accName":"Muhammad Aiman Hakimi","accNo":"012-345 6789"}],
    "x_wishlist":true,"wishlist":[{"name":"Periuk nasi Philips HD3119","price":"RM189","link":"https://shopee.com.my"},{"name":"Set cadar king, warna krim","price":"RM120","link":""},{"name":"Cerek elektrik keluli","price":"RM99","link":"https://lazada.com.my"},{"name":"Baucar IKEA","price":"RM100","link":"https://ikea.com.my"}]}'::jsonb;
begin
  insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token)
  values ('00000000-0000-0000-0000-000000000000', uid, 'authenticated', 'authenticated', 'demo@sanding.test',
    extensions.crypt('sanding-demo-123', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{"name":"Demo couple"}', now(), now(), '', '', '', '');
  insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  values (gen_random_uuid(), uid, uid::text,
    jsonb_build_object('sub', uid::text, 'email', 'demo@sanding.test', 'email_verified', true), 'email', now(), now(), now());

  insert into orders (id, owner_id, slug, status, package, paid_cents, content, published_at, valid_until, created_at)
  values (live_id, uid, 'aisyah-aiman', 'live', 'diraja', 9900, card, now() - interval '3 days', now() + interval '362 days', now() - interval '3 days');

  insert into payments (order_id, owner_id, provider, bill_code, package, slug, amount_cents, status, ref_no, paid_at)
  values (live_id, uid, 'mock', 'SEED0001', 'diraja', 'aisyah-aiman', 9900, 'paid', 'TP-SEED-0001', now() - interval '3 days');

  insert into orders (id, owner_id, status, content)
  -- legacy template id "sage" on purpose: it must still render (as sampul-sage)
  values (draft_id, uid, 'draft', card || '{"template":"sage","brideShort":"Hana","groomShort":"Danial","brideFull":"Nurul Hana binti Kamal","groomFull":"Danial Iskandar bin Roslan","x_guestlinks":false,"date":"2027-02-13"}'::jsonb);

  insert into guests (id, order_id, token, name, sort) values
    (g1, live_id, 'paklong1', 'Pak Long Hashim & keluarga', 0),
    (g2, live_id, 'cikgu7r2', 'Cikgu Rohani', 1);

  insert into rsvps (order_id, guest_id, name, phone, phone_norm, attending, pax, note, created_at) values
    (live_id, g1, 'Pak Long Hashim', '013-222 1111', '0132221111', true, 4, 'Satu kerusi roda', now() - interval '30 hours'),
    (live_id, null, 'Farah Hanim', '017-555 0101', '0175550101', true, 2, '', now() - interval '20 hours'),
    (live_id, null, 'Encik Zulkifli', '019-333 4444', '0193334444', false, 0, '', now() - interval '5 hours');

  insert into wishes (order_id, name, msg, created_at) values
    (live_id, 'Mak Ngah Rosnah', 'Selamat pengantin baru Aisyah & Aiman. Semoga berkekalan hingga ke jannah.', now() - interval '26 hours'),
    (live_id, 'Farah (rakan sekolah)', 'Tahniah! Tak sabar nak datang. Semoga bahagia selalu.', now() - interval '20 hours'),
    (live_id, 'Keluarga Encik Zul', 'Barakallahu lakuma. Semoga dimurahkan rezeki.', now() - interval '4 hours');

  -- v9: one reserved gift, one guest already checked in, a few card opens
  insert into reserves (order_id, item_key, name, item, secret_hash)
  values (live_id, 'i1', 'Mak Ngah', 'Set cadar king, warna krim', encode(extensions.digest('seed-secret', 'sha256'), 'hex'));
  insert into checkins (rsvp_id, order_id) select id, live_id from rsvps where order_id = live_id and phone_norm = '0175550101';
  insert into views (order_id, day, visitor) values
    (live_id, current_date - 2, 'seedvisitor01'), (live_id, current_date - 1, 'seedvisitor01'),
    (live_id, current_date - 1, 'seedvisitor02'), (live_id, current_date, 'seedvisitor03');
end $$;
