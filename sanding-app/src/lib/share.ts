// Family access invites. No '@/' imports so it runs under `node --test`.
import { createHash, randomBytes } from 'node:crypto';

/** Invitees per card, besides the owner. */
export const MAX_MEMBERS = 10;

export const normEmail = (v: unknown) => (typeof v === 'string' ? v.trim().toLowerCase() : '');
export const validEmail = (e: string) => e.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

/** A new invite token (URL-safe) and the hash that is stored instead of it. */
export function newInviteToken() {
  const token = randomBytes(24).toString('base64url');
  return { token, hash: hashToken(token) };
}
export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');
/** Shape check before touching the database; tokens are 32 base64url characters. */
export const tokenShape = (t: string) => /^[A-Za-z0-9_-]{32}$/.test(t);

/** Turns a magic-link `next` (a path or a same-site absolute URL) into a safe local path. */
export function safeNext(next: string | null | undefined, siteOrigin: string, fallback = '/dashboard'): string {
  let n = String(next || '');
  if (n.startsWith(siteOrigin + '/')) n = n.slice(siteOrigin.length);
  return n.startsWith('/') && !n.startsWith('//') && !n.startsWith('/\\') ? n : fallback;
}
