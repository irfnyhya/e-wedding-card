// "Personalise preview" on the collection: one names field that every design thumbnail renders.
// Kept free of imports so it runs under `node --test` as well as in the app.

export type PreviewNames = { brideShort: string; groomShort: string };

export const NAMES_KEY = 'sanding-preview-names';

/** Splits "Aisyah & Aiman", "Aisyah dan Aiman", "Aisyah and Aiman" or "Aisyah, Aiman" into two cover names. */
export function parseNames(raw: string): PreviewNames | null {
  const s = String(raw || '').replace(/\s+/g, ' ').trim().slice(0, 81);
  if (!s) return null;
  const parts = s.split(/\s*(?:&|\+|,|\/|\s(?:dan|and|n)\s)\s*/i).map((x) => x.trim().slice(0, 40)).filter(Boolean);
  if (!parts.length) return null;
  return { brideShort: parts[0], groomShort: parts[1] || '' };
}

/** The sample-card fields to override so thumbnails and the full preview show the couple's names. */
export function namesOverride(n: PreviewNames | null): Record<string, string> {
  if (!n) return {};
  const o: Record<string, string> = { brideShort: n.brideShort, brideFull: n.brideShort };
  if (n.groomShort) { o.groomShort = n.groomShort; o.groomFull = n.groomShort; }
  return o;
}

/** Query string that carries the names into /create so the new draft starts with them. */
export function namesQuery(n: PreviewNames | null): string {
  if (!n) return '';
  const p = new URLSearchParams({ bride: n.brideShort });
  if (n.groomShort) p.set('groom', n.groomShort);
  return '&' + p.toString();
}
