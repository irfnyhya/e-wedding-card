// Extra majlis sessions on one card: a second date (akad nikah, bertandang) and/or another venue.
// The card's own date/venue stay the main session; these follow it. Import-free for `node --test`.

export type EventItem = { label: string; date: string; start: string; end: string; venue: string; address: string };

/** The main session plus up to two more: three venues or dates per card. */
export const MAX_EXTRA_EVENTS = 2;

const str = (v: unknown, max: number) => (typeof v === 'string' ? v : v == null ? '' : String(v)).slice(0, max);
const isoDate = (v: unknown) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '');
const hhmm = (v: unknown) => (typeof v === 'string' && /^\d{2}:\d{2}$/.test(v) ? v : '');

export const blankEvent = (): EventItem => ({ label: '', date: '', start: '', end: '', venue: '', address: '' });

/** Cleans what the editor sends. Rows are kept while being typed, so an empty one survives until removed. */
export function sanitizeEvents(v: unknown): EventItem[] {
  return (Array.isArray(v) ? v : []).slice(0, MAX_EXTRA_EVENTS).map((e: Record<string, unknown>) => ({
    label: str(e?.label, 80), date: isoDate(e?.date), start: hhmm(e?.start), end: hhmm(e?.end),
    venue: str(e?.venue, 120), address: str(e?.address, 300),
  }));
}

/** Sessions guests should see: those with at least a date or a venue. */
export const shownEvents = (list: EventItem[] | undefined) => (list || []).filter((e) => e.date || e.venue.trim());
