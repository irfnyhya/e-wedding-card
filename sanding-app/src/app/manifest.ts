import type { MetadataRoute } from 'next';

/** Home-screen icon and name when the site is added to a phone. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sanding · Kad kahwin digital',
    short_name: 'Sanding',
    start_url: '/',
    display: 'browser',
    background_color: '#fbf6ee',
    theme_color: '#6e1a26',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
