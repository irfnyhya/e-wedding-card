// Unit tests for the order-flow helpers (pure modules, run with Node's type stripping): npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { namesOverride, namesQuery, parseNames } from '../src/lib/names.ts';
import { MAX_EXTRA_EVENTS, sanitizeEvents, shownEvents } from '../src/lib/events.ts';
import { ogImageOf } from '../src/lib/og.ts';
import { hashToken, newInviteToken, normEmail, safeNext, tokenShape, validEmail } from '../src/lib/share.ts';

test('parseNames splits the common separators', () => {
  for (const s of ['Aisyah & Aiman', 'Aisyah dan Aiman', 'aisyah AND Aiman', 'Aisyah, Aiman', 'Aisyah + Aiman', '  Aisyah   &   Aiman ']) {
    const n = parseNames(s);
    assert.equal(n?.brideShort.toLowerCase(), 'aisyah', s);
    assert.equal(n?.groomShort, 'Aiman', s);
  }
  assert.deepEqual(parseNames('Aisyah'), { brideShort: 'Aisyah', groomShort: '' });
  assert.equal(parseNames('   '), null);
  assert.equal(parseNames('&'), null);
  assert.equal(parseNames('x'.repeat(200))?.brideShort.length, 40);
});

test('namesOverride leaves the sample groom when only one name is typed', () => {
  assert.deepEqual(namesOverride(null), {});
  assert.deepEqual(namesOverride({ brideShort: 'Siti', groomShort: '' }), { brideShort: 'Siti', brideFull: 'Siti' });
  assert.deepEqual(namesOverride({ brideShort: 'Siti', groomShort: 'Hakim' }), { brideShort: 'Siti', brideFull: 'Siti', groomShort: 'Hakim', groomFull: 'Hakim' });
});

test('namesQuery encodes names for /create', () => {
  assert.equal(namesQuery(null), '');
  const q = new URLSearchParams(namesQuery({ brideShort: 'Nur & Co', groomShort: 'Ali' }).slice(1));
  assert.equal(q.get('bride'), 'Nur & Co');
  assert.equal(q.get('groom'), 'Ali');
});

test('sanitizeEvents caps sessions and cleans fields', () => {
  const raw = [
    { label: 'Akad', date: '2026-12-18', start: '20:30', end: '22:00', venue: 'Masjid', address: 'Shah Alam' },
    { label: 'x'.repeat(200), date: '18/12/2026', start: '8pm', end: null, venue: 42, address: undefined },
    { label: 'third', date: '2026-12-20', venue: 'Dewan' },
  ];
  const ev = sanitizeEvents(raw);
  assert.equal(ev.length, MAX_EXTRA_EVENTS);
  assert.deepEqual(ev[0], raw[0]);
  assert.deepEqual(ev[1], { label: 'x'.repeat(80), date: '', start: '', end: '', venue: '42', address: '' });
  assert.deepEqual(sanitizeEvents('nope'), []);
  assert.deepEqual(sanitizeEvents(undefined), []);
});

test('shownEvents hides rows with neither date nor venue', () => {
  assert.deepEqual(shownEvents(sanitizeEvents([{ label: 'empty' }, { date: '2026-01-01' }])).map((e) => e.date), ['2026-01-01']);
  assert.deepEqual(shownEvents(sanitizeEvents([{ venue: '  ' }, { venue: 'Dewan' }])).map((e) => e.venue), ['Dewan']);
  assert.deepEqual(shownEvents(undefined), []);
});

test('ogImageOf prefers the custom image, then a shown gallery photo', () => {
  assert.equal(ogImageOf({ ogImage: 'https://x/og.jpg', photos: ['https://x/p.jpg'], x_gallery: true }), 'https://x/og.jpg');
  assert.equal(ogImageOf({ ogImage: '', photos: ['https://x/p.jpg'], x_gallery: true }), 'https://x/p.jpg');
  assert.equal(ogImageOf({ ogImage: '', photos: ['https://x/p.jpg'], x_gallery: false }), '');
  assert.equal(ogImageOf({}), '');
});

test('invite emails are normalised and validated', () => {
  assert.equal(normEmail('  Mak@Example.COM '), 'mak@example.com');
  assert.equal(normEmail(null), '');
  assert.ok(validEmail('mak@example.com'));
  for (const bad of ['', 'mak', 'mak@', '@x.com', 'a b@x.com', 'mak@example', `${'a'.repeat(250)}@x.com`]) assert.ok(!validEmail(bad), bad);
});

test('invite tokens are random, URL-safe and stored only as a hash', () => {
  const a = newInviteToken(), b = newInviteToken();
  assert.notEqual(a.token, b.token);
  assert.ok(tokenShape(a.token));
  assert.match(a.hash, /^[0-9a-f]{64}$/); // matches the order_members.token_hash check
  assert.equal(hashToken(a.token), a.hash);
  assert.notEqual(a.hash, a.token);
  assert.ok(!tokenShape('short'));
  assert.ok(!tokenShape('../'.repeat(11) + 'aa'));
});

test('safeNext only allows local paths', () => {
  const site = 'http://localhost:3000';
  assert.equal(safeNext('/share/abc', site), '/share/abc');
  assert.equal(safeNext('http://localhost:3000/share/abc', site), '/share/abc');
  assert.equal(safeNext('http://localhost:3000/auth/callback?next=/x', site), '/auth/callback?next=/x');
  assert.equal(safeNext('https://evil.example/x', site), '/dashboard');
  assert.equal(safeNext('//evil.example', site), '/dashboard');
  assert.equal(safeNext('/' + String.fromCharCode(92) + 'evil.example', site), '/dashboard');
  assert.equal(safeNext(null, site), '/dashboard');
  assert.equal(safeNext('http://localhost:3000.evil.example/x', site), '/dashboard');
});
