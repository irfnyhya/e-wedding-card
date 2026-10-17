/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Card } from '../card';

/** Family ids come from the generated engine; keep this open so new families need no type change. */
export type FamilyId = string;
export type Family = { name: string; meaning: string; blurb: string; f: { d: string; s: string; b: string } };
export type Theme = {
  id: string; fam: FamilyId; name: string; desc: string; seal?: string; fl?: string[]; eng?: string[]; emb?: string;
  c: Record<string, string>;
};
export type InviteWish = { id?: string; name: string; msg: string; at: number | string; hidden?: boolean };
export type RsvpInput = { name: string; phone: string; attending: boolean; pax: number; note: string; guestLink: string; at: number };
/** What onRsvp resolves with; the engine shows it as the guest's e-pass. */
export type GuestPass = { name: string; pax: number; code: string; qr: string };
export type Reserve = { id: string; name?: string };
export type InviteOptions = {
  mode?: 'thumb' | 'preview' | 'live';
  face?: 'cover' | 'page';
  guest?: string;
  opened?: boolean;
  autoplay?: boolean;
  rsvpDone?: () => unknown;
  onRsvp?: (d: RsvpInput) => Promise<GuestPass | void>;
  subscribeReserves?: ((cb: (list: Reserve[]) => void) => () => void) | null;
  onReserve?: (key: string, d: { name: string; item: string; at: number }) => Promise<void>;
  onUnreserve?: (key: string) => Promise<void>;
  subscribeRsvps?: ((cb: (list: { attending: boolean; pax: number }[]) => void) => () => void) | null;
  onWish?: (d: { name: string; msg: string }) => Promise<void>;
  subscribeWishes?: ((cb: (list: InviteWish[]) => void) => () => void) | null;
};

export const $: (s: string, r?: ParentNode) => any;
export const $$: (s: string, r?: ParentNode) => any[];
export const esc: (s: unknown) => string;
export const ICON: Record<string, string>;
export const THEMES: Theme[];
export const THEME: Record<string, Theme>;
export const FAMILIES: Record<FamilyId, Family>;
export const LEGACY: Record<string, string>;
export function themeOf(id: string): Theme;
export const A: string;
export const ASP: Record<string, number>;
export const swatchEl: (t: Theme) => string;
export const dotColor: (t: Theme) => string;
export function toneOf(t: Theme): string;
export const TONES: [string, string][];
export const CATS: [string, string][];
export const swatchBg: (t: Theme) => string;
export const T: Record<'ms' | 'en', any>;
export const DAYS: Record<'ms' | 'en', string[]>;
export const MONTHS: Record<'ms' | 'en', string[]>;
export function fmtDate(iso: string, lang: string, withDay?: boolean): string;
export function fmtShort(iso: string): string;
export function fmtTime(t: string, lang: string): string;
export function calUrl(o: Partial<Card>): string;
export const mapsUrl: (o: Partial<Card>) => string;
export const wazeUrl: (o: Partial<Card>) => string;
export const coverNames: (o: Partial<Card>) => [string, string];
export const waNum: (p: string) => string;
export const Music: {
  tracks: Record<string, { label: string }>;
  current: () => string | null;
  play(id: string): void;
  stop(quick?: boolean): void;
  playing: () => boolean;
};
export const SAMPLE: Card & { id: string; slug: string };
export const SAMPLE_WISHES: InviteWish[];
export function renderInvite(host: Element, o: Partial<Card>, opts?: InviteOptions): HTMLElement & { reopen?: () => void };
export function copyText(text: string, ok?: () => void): void;
export const EFFECTS: Record<string, { label: string }>;
export const rsvpCode: (id: string) => string;
export const giftList: (o: Partial<Card>) => { bank: string; accName: string; accNo: string }[];
export const safeUrl: (u: unknown) => string;
export function icsText(o: Partial<Card> & { slug?: string }): string;
export function saveFile(filename: string, data: string, type: string): Promise<boolean>;
export function qrSvg(text: string, dark?: string): Promise<string>;
