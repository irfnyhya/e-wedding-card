import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FONTS } from './fonts';
import { SITE_URL } from '@/lib/card';

const DESCRIPTION = 'E-wedding cards for Malaysian weddings: RSVP, ucapan, salam kaut, Waze and one dashboard.';
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Sanding · Kad kahwin digital', template: '%s · Sanding' },
  description: DESCRIPTION,
  // A card page sets its own openGraph, which replaces this one, so guests never see the Sanding image on a couple's link.
  openGraph: { title: 'Sanding · Kad kahwin digital', description: DESCRIPTION, type: 'website', siteName: 'Sanding', images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'Sanding, kad kahwin digital' }] },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {FONTS.map((f) => <link key={f} rel="stylesheet" href={f} />)}
      </head>
      <body>{children}</body>
    </html>
  );
}
