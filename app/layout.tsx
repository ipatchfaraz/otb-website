import type { Metadata } from 'next';
import './globals.css';
import GlitchReveals from '@/components/GlitchReveals';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SiteStructuredData from '@/components/SiteStructuredData';

const SITE_URL = 'https://www.outtathebox.design';
const SITE_NAME = 'Outta The Box';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Outta The Box™ | Branding & Design Agency, Kuala Lumpur',
    template: '%s | Outta The Box™'
  },
  description:
    'Outta The Box is a branding agency in Kuala Lumpur that has spent 10+ years unboxing brands using unconventional thinking and our Organic Intelligence approach to build purpose-driven, humanised brands.',
  applicationName: SITE_NAME,
  authors: [{ name: 'Outta The Box' }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    'branding agency',
    'brand strategy',
    'logo design',
    'brand identity',
    'design agency Kuala Lumpur',
    'branding Malaysia',
    'brand consultant',
    'visual identity',
    'graphic design',
    'brand positioning',
    'Outta The Box',
    'OTB'
  ],
  category: 'design',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Outta The Box™ | Branding & Design Agency, Kuala Lumpur',
    description:
      'Ideas this good don’t stay in the box. A branding agency in Kuala Lumpur building purpose-driven, humanised brands.',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Outta The Box™ branding & design agency'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outta The Box™ | Branding & Design Agency',
    description:
      'Ideas this good don’t stay in the box. A branding agency in Kuala Lumpur building purpose-driven, humanised brands.',
    images: ['/og']
  },
  // Point favicon at our custom /favicon route (route handler at
  // app/favicon/route.ts) so we control cache-control ourselves. The
  // built-in app/icon.svg convention got locked into a stale Vercel
  // CDN cache. Apple touch icon still uses the built-in convention.
  icons: {
    icon: [{ url: '/favicon', type: 'image/svg+xml' }]
  },
  verification: {
    // Populate GOOGLE_SITE_VERIFICATION in Vercel to prove ownership
    // to Google Search Console. Falls back to undefined if unset.
    google: process.env.GOOGLE_SITE_VERIFICATION
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
      <body>
        {children}
        <GlitchReveals />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''} />
        {/* Organization + LocalBusiness + WebSite JSON-LD. Richer local
            signals (Kuala Lumpur geo) help OTB surface in the Google
            Maps / local pack for "branding agency Kuala Lumpur". */}
        <SiteStructuredData />
      </body>
    </html>
  );
}
