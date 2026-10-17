// Link-preview image (og:image) for a card shared on WhatsApp. Import-free for `node --test`.

type OgSource = { ogImage?: string; photos?: string[]; x_gallery?: boolean };

/** The couple's own preview image, else their first gallery photo shown to guests, else none (site default). */
export function ogImageOf(c: OgSource): string {
  if (c.ogImage) return c.ogImage;
  if (c.x_gallery && c.photos?.length) return c.photos[0];
  return '';
}
