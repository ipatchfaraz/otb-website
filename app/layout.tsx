import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Outta The Box™ — Branding & Design Agency, Kuala Lumpur',
  description:
    "Outta The Box is a branding agency that has spent 10+ years unboxing brands — using unconventional thinking and our Organic Intelligence approach to build purpose-driven, humanised brands.",
  metadataBase: new URL('https://outtathebox.design'),
  openGraph: {
    title: 'Outta The Box™',
    description: 'Ideas this good don’t stay in the box.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=block"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
