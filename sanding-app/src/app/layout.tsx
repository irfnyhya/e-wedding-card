import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FONTS } from './fonts';

export const metadata: Metadata = {
  title: { default: 'Sanding · Kad kahwin digital', template: '%s · Sanding' },
  description: 'E-wedding cards for Malaysian weddings: RSVP, ucapan, salam kaut, Waze and one dashboard.',
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
