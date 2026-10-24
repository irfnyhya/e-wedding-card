// Card content shape, packages and the rules both the editor and the server agree on.
// The server is the source of truth: prices, package gating and content sanitising all run here.
import { EFFECTS, LEGACY, THEMES } from '@/lib/invite/engine';
import { sanitizeEvents, type EventItem } from '@/lib/events';

export type { EventItem };

export type ScheduleItem = { time: string; label: string };
export type Contact = { name: string; role: string; phone: string };
export type GiftAccount = { bank: string; accName: string; accNo: string };
export type WishItem = { name: string; price: string; link: string };
export type Card = {
  template: string; lang: 'ms' | 'en'; jawi: string; bismillah: boolean; useAccent: boolean; accent: string;
  brideFull: string; brideShort: string; groomFull: string; groomShort: string;
  hosts: string; side: 'bride' | 'groom' | 'couple'; eventTitle: (typeof EVENT_TITLES)[number];
  date: string; hijri: string; start: string; end: string; venue: string; address: string; dress: string; livestream: string;
  /** More sessions after the main one, each with its own date, time and venue (Maps/Waze). */
  events: EventItem[];
  schedule: ScheduleItem[];
  x_rsvp: boolean; maxPax: number; deadline: string; x_counter: boolean; x_epass: boolean;
  x_wishes: boolean; x_music: boolean; music: string; ytMusic: string; ytStart: string;
  x_gallery: boolean; photos: string[];
  /** gifts[0] is mirrored into bank/accName/accNo for older renderers. */
  x_gift: boolean; gifts: GiftAccount[]; bank: string; accName: string; accNo: string; qr: string;
  x_wishlist: boolean; wishlist: WishItem[];
  x_contacts: boolean; contacts: Contact[];
  x_guestlinks: boolean;
  effect: string; ownDesign: string;
  /** Wedding tradition: sets greeting, wording, event titles and monogram script. */
  tradition: 'malay' | 'chinese' | 'indian' | 'general'; monoScript: 'jawi' | 'latin' | 'chinese' | 'tamil' | '';
  /** The couple's own wording; empty = the tradition's default. */
  txtSalam: string; txtIntro: string; txtDoaT: string; txtDoa: string;
  /** Content step: hidden sections, renamed headings and the couple's own sections. */
  hideSecs: string[]; secTitles: Record<string, string>; customSecs: { title: string; text: string }[];
  /** Custom image for the WhatsApp / social link preview (og:image), 1200×630. */
  ogImage: string;
  /** The couple's photo, framed at the top of the card. */
  couplePhoto: string;
  /** true once the couple has uploaded or removed a photo themselves; until then drafts show the sample */
  photoChosen?: boolean;
};
export const EVENT_TITLES = ['walimah', 'kahwin', 'bertandang', 'resepsi', 'tunang', 'nikah', 'banquet', 'tea', 'ceremony', 'mehndi'] as const;
export const SECTION_KEYS = ['when', 'count', 'sched', 'gallery', 'doa', 'rsvp', 'wishes', 'gift', 'wishlist', 'contact'];
/** Own-design front page add-on, on top of the package price. */
export const ADDON_OWN = 10;
export type PackageId = 'asas' | 'premium' | 'diraja';

export const PKGS: { id: PackageId; name: string; price: number; days: number; feats: string[] }[] = [
  { id: 'asas', name: 'Asas', price: 19, days: 365, feats: [`Any of the ${THEMES.length} designs, each with its own opening`, 'Bahasa Melayu or English', 'Waze, Google Maps & livestream link', 'Countdown, Google, Apple & Outlook calendar', 'RSVP with pax limit, deadline and notes', 'Petal, gold dust or jasmine effect', 'Background music or your own YouTube song', 'Card opens counted in your dashboard', 'Online for 1 year, edit any time'] },
  { id: 'premium', name: 'Permata', price: 39, days: 365, feats: ['Everything in Asas', 'Ucapan wall with moderation', 'Personal guest links with names', 'Swipe gallery, up to 6 photos', 'Salam kaut: 3 accounts & DuitNow QR', 'Gift wishlist with reservations', 'Live attendance count on the card', 'Contacts with call & WhatsApp'] },
  { id: 'diraja', name: 'Diraja', price: 69, days: 365, feats: ['Everything in Permata', 'Guest e-pass with QR check-in on the day', 'WhatsApp reminders to every guest', 'Custom accent colour', 'Guest list CSV export'] },
];
export const PKG = Object.fromEntries(PKGS.map((p) => [p.id, p])) as Record<PackageId, (typeof PKGS)[number]>;
export const rank = (id: string | null | undefined) => PKGS.findIndex((p) => p.id === id); // -1 for none

export function needPkg(o: Partial<Card>): { id: PackageId; why: string[] } {
  const why = { diraja: [] as string[], premium: [] as string[] };
  if (o.useAccent) why.diraja.push('custom colour');
  if (o.x_epass) why.diraja.push('e-pass check-in');
  ([['x_guestlinks', 'guest links'], ['x_wishes', 'ucapan'], ['x_gallery', 'gallery'], ['x_gift', 'salam kaut'], ['x_contacts', 'contacts'], ['x_wishlist', 'wishlist'], ['x_counter', 'attendance count']] as const)
    .forEach(([k, l]) => o[k] && why.premium.push(l));
  const id: PackageId = why.diraja.length ? 'diraja' : why.premium.length ? 'premium' : 'asas';
  return { id, why: why.diraja.length ? why.diraja : why.premium };
}

/** Turns off the extras a paid package does not cover, so unpaid features never reach guests. */
export function gate(c: Card, pkg: string | null, addonOwn = false): Card {
  const r = rank(pkg);
  const out = { ...c };
  if (r < 1) { out.x_wishes = false; out.x_guestlinks = false; out.x_gallery = false; out.x_gift = false; out.x_contacts = false; out.x_wishlist = false; out.x_counter = false; }
  if (r < 2) { out.useAccent = false; out.x_epass = false; }
  if (!addonOwn) out.ownDesign = '';
  return out;
}

/** True when the card's content needs a bigger package or the unpaid own-design add-on. */
export const needsPayment = (c: Partial<Card>, pkg: string | null, addonOwn: boolean) =>
  rank(needPkg(c).id) > rank(pkg) || (!!c.ownDesign && !addonOwn);

export const PROMOS: Record<string, number> = { SANDING10: 0.1 };

/** Price in sen for moving an order from `paidPkg` to the package its content needs, plus the own-design add-on if due. */
export function quote(content: Partial<Card>, paidPkg: string | null, promoCode?: string, addonPaid = false) {
  const target = PKG[needPkg(content).id];
  const already = paidPkg && rank(paidPkg) >= 0 ? PKG[paidPkg as PackageId].price : 0;
  const pkg = rank(paidPkg) >= rank(target.id) ? PKG[paidPkg as PackageId] : target;
  const addon = !!content.ownDesign && !addonPaid;
  const sub = (Math.max(0, pkg.price - already) + (addon ? ADDON_OWN : 0)) * 100;
  const code = (promoCode || '').trim().toUpperCase();
  const rate = PROMOS[code] || 0;
  const discount = Math.round(sub * rate);
  return { pkg: pkg.id, priceCents: pkg.price * 100, alreadyCents: already * 100, addonOwn: addon, addonCents: addon ? ADDON_OWN * 100 : 0, discountCents: discount, totalCents: sub - discount, promo: rate ? code : null };
}

export const BANKS = ['Maybank', 'CIMB Bank', 'Bank Islam', 'Public Bank', 'RHB Bank', 'Hong Leong Bank', 'AmBank', 'Bank Rakyat', 'BSN', 'Bank Muamalat', 'Affin Bank', 'Alliance Bank', 'Touch ’n Go eWallet'];
/** Every colourway id, straight from the design engine. */
export const TEMPLATE_IDS = THEMES.map((t) => t.id);
/** Ids from the first collection; existing orders keep rendering through this map. */
export const LEGACY_TEMPLATES: Record<string, string> = LEGACY;
export const templateId = (v: unknown) => (typeof v === 'string' && TEMPLATE_IDS.includes(v) ? v : typeof v === 'string' && LEGACY_TEMPLATES[v] ? LEGACY_TEMPLATES[v] : null);
export const MUSIC_IDS = ['sax'];

export const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$/;
export const RESERVED_SLUGS = new Set(['contoh', 'api', 'auth', 'login', 'logout', 'dashboard', 'designs', 'create', 'editor', 'checkout', 'pay', 'admin', 'about', 'pricing', 'help', 'static', '_next', 'favicon.ico', 'robots.txt', 'sitemap.xml']);
export const slugify = (s: string) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
export function slugProblem(s: string): string {
  if (!SLUG_RE.test(s)) return 'Use 3 to 40 letters, numbers or dashes.';
  if (RESERVED_SLUGS.has(s)) return 'That link is reserved. Try another.';
  return '';
}

// ---- sanitising whatever the editor sends
const str = (v: unknown, max: number) => (typeof v === 'string' ? v : v == null ? '' : String(v)).slice(0, max);
const bool = (v: unknown) => v === true || v === 'true';
const oneOf = <T extends string>(v: unknown, list: readonly T[], d: T): T => (list.includes(v as T) ? (v as T) : d);
const isoDate = (v: unknown) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '');
const hhmm = (v: unknown) => (typeof v === 'string' && /^\d{2}:\d{2}$/.test(v) ? v : '');
// the couple's own song: only real YouTube video links are kept
const ytLink = (v: unknown) => { const s = String(v ?? '').trim().slice(0, 200); return /^https:\/\/(www\.|m\.|music\.)?(youtube\.com|youtu\.be)\//i.test(s) && /(?:youtu\.be\/|v=|shorts\/|embed\/|live\/)[\w-]{11}/.test(s) ? s : ''; };
const linkUrl = (v: unknown) => {
  const s = str(v, 300).trim();
  return /^https?:\/\/[^\s"'<>]+$/i.test(s) ? s : '';
};
const mediaUrl = (v: unknown) => {
  const s = str(v, 600);
  return /^https?:\/\//.test(s) && !/["'<>\s()\\;]/.test(s) ? s : ''; // also lands inside CSS url()
};

export function sanitizeCard(input: unknown): Card {
  const o = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const arr = (v: unknown) => (Array.isArray(v) ? v : []);
  const gift = (g: Record<string, unknown>): GiftAccount => ({ bank: oneOf(g?.bank, BANKS, 'Maybank'), accName: str(g?.accName, 80), accNo: str(g?.accNo, 40) });
  const gifts = (arr(o.gifts).length ? arr(o.gifts) : [{ bank: o.bank, accName: o.accName, accNo: o.accNo }]).slice(0, 3).map(gift);
  return {
    template: templateId(o.template) || 'sampul-merah',
    lang: oneOf(o.lang, ['ms', 'en'] as const, 'ms'),
    jawi: str(o.jawi, 12).trim(),
    bismillah: bool(o.bismillah),
    useAccent: bool(o.useAccent),
    accent: typeof o.accent === 'string' && /^#[0-9a-fA-F]{6}$/.test(o.accent) ? o.accent : '#7a1b29',
    brideFull: str(o.brideFull, 120), brideShort: str(o.brideShort, 40),
    groomFull: str(o.groomFull, 120), groomShort: str(o.groomShort, 40),
    hosts: str(o.hosts, 200),
    side: oneOf(o.side, ['bride', 'groom', 'couple'] as const, 'bride'),
    eventTitle: oneOf(o.eventTitle, EVENT_TITLES, 'walimah'),
    date: isoDate(o.date), hijri: str(o.hijri, 60), start: hhmm(o.start), end: hhmm(o.end),
    venue: str(o.venue, 120), address: str(o.address, 300), dress: str(o.dress, 80), livestream: linkUrl(o.livestream),
    events: sanitizeEvents(o.events),
    schedule: arr(o.schedule).slice(0, 12).map((s: Record<string, unknown>) => ({ time: hhmm(s?.time), label: str(s?.label, 80) })),
    x_rsvp: bool(o.x_rsvp), maxPax: Math.max(1, Math.min(20, Math.round(Number(o.maxPax) || 1))), deadline: isoDate(o.deadline),
    x_counter: bool(o.x_counter), x_epass: bool(o.x_epass),
    x_wishes: bool(o.x_wishes), x_music: bool(o.x_music), music: oneOf(o.music, MUSIC_IDS, 'sax'), ytMusic: ytLink(o.ytMusic), ytStart: str(o.ytStart, 8).replace(/[^\d:ms]/g, ''),
    x_gallery: bool(o.x_gallery), photos: arr(o.photos).map(mediaUrl).filter(Boolean).slice(0, 6),
    x_gift: bool(o.x_gift), gifts, bank: gifts[0]?.bank || 'Maybank', accName: gifts[0]?.accName || '', accNo: gifts[0]?.accNo || '', qr: mediaUrl(o.qr),
    x_wishlist: bool(o.x_wishlist),
    wishlist: arr(o.wishlist).slice(0, 12).map((w: Record<string, unknown>) => ({ name: str(w?.name, 80), price: str(w?.price, 20), link: linkUrl(w?.link) })),
    x_contacts: bool(o.x_contacts),
    contacts: arr(o.contacts).slice(0, 3).map((c: Record<string, unknown>) => ({ name: str(c?.name, 60), role: str(c?.role, 60), phone: str(c?.phone, 20) })),
    x_guestlinks: bool(o.x_guestlinks),
    effect: oneOf(o.effect, Object.keys(EFFECTS), 'none'),
    tradition: oneOf(o.tradition, ['malay', 'chinese', 'indian', 'general'] as const, 'malay'),
    monoScript: oneOf(o.monoScript, ['', 'jawi', 'latin', 'chinese', 'tamil'] as const, ''),
    txtSalam: str(o.txtSalam, 120), txtIntro: str(o.txtIntro, 600), txtDoaT: str(o.txtDoaT, 60), txtDoa: str(o.txtDoa, 500),
    hideSecs: arr(o.hideSecs).filter((k): k is string => typeof k === 'string' && SECTION_KEYS.includes(k)),
    secTitles: Object.fromEntries(SECTION_KEYS.map((k) => [k, str((o.secTitles as Record<string, unknown> | undefined)?.[k], 60)]).filter(([, v]) => v)),
    customSecs: arr(o.customSecs).slice(0, 6).map((x: Record<string, unknown>) => ({ title: str(x?.title, 60), text: str(x?.text, 600) })),
    ownDesign: mediaUrl(o.ownDesign),
    photoChosen: o.photoChosen === true,
    couplePhoto: mediaUrl(o.couplePhoto) || (/^\/?assets\/[\w.-]+$/.test(String(o.couplePhoto ?? '')) ? String(o.couplePhoto) : ''),
    ogImage: mediaUrl(o.ogImage),
  };
}

export const MISSING: [keyof Card, number, string][] = [
  ['brideShort', 1, 'the bride’s cover name'], ['groomShort', 1, 'the groom’s cover name'], ['date', 2, 'the date'], ['venue', 2, 'the venue'],
];
export const missingField = (c: Partial<Card>) => MISSING.find(([k]) => !String(c[k] ?? '').trim()) || null;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
export const displayLink = (slug: string) => `${SITE_URL.replace(/^https?:\/\//, '')}/${slug}`;
export const rm = (cents: number) => `RM${(cents / 100).toFixed(2)}`;
