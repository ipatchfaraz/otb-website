import type { Metadata } from 'next';
import './globals.css';
import GlitchReveals from '@/components/GlitchReveals';
import GoogleAnalytics from '@/components/GoogleAnalytics';

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

// JSON-LD structured data for Google to understand the agency as an
// Organization and the site as a searchable WebSite. Rendered as a raw
// <script> tag in <body> — safe because the JSON is generated at build
// time from constants.
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'OTB',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/otb-logomark.svg`,
  description:
    'Branding and design agency in Kuala Lumpur building purpose-driven, humanised brands.',
  foundingDate: '2016',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kuala Lumpur',
    addressCountry: 'MY'
  },
  sameAs: [
    // Add real social profile URLs when live
    'https://www.instagram.com/outtathebox.design/'
  ]
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/journal?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </body>
    </html>
  );
}
