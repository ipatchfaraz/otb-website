// Site-wide JSON-LD mounted once in the root layout. Gives Google
// three signals every page benefits from:
//   1. Organization — who OTB is, logo, social profiles (sameAs)
//   2. LocalBusiness — Kuala Lumpur geo for Google Maps / local pack
//   3. WebSite — enables the SERP sitelinks search box
//
// Static server component — rendered once, zero runtime cost.

const SITE = 'https://www.outtathebox.design';

export default function SiteStructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}#organization`,
    name: 'Outta The Box',
    legalName: 'Outta The Box Design',
    alternateName: ['OTB', 'Outta The Box Design'],
    url: SITE,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE}/assets/otb-logo.svg`,
      width: 1617,
      height: 639
    },
    image: `${SITE}/og`,
    description:
      'Outta The Box is an independent branding and design agency in Kuala Lumpur building purpose-driven, humanised brands for mission-led companies, Islamic organisations and edutech platforms.',
    foundingDate: '2019',
    founder: { '@type': 'Person', name: 'Muhammed Faraz Faizal' },
    areaServed: ['Malaysia', 'Southeast Asia', 'Middle East', 'Worldwide'],
    knowsAbout: [
      'brand strategy',
      'brand identity',
      'naming',
      'logo design',
      'edutech branding',
      'Islamic branding',
      'nonprofit branding',
      'rebrand',
      'brand guidelines'
    ],
    sameAs: [
      'https://www.linkedin.com/company/outta-the-box-design',
      'https://www.instagram.com/outtathebox.design'
    ]
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE}#localbusiness`,
    name: 'Outta The Box — Branding & Design Agency',
    image: `${SITE}/og`,
    url: SITE,
    telephone: '',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kuala Lumpur',
      addressRegion: 'Federal Territory of Kuala Lumpur',
      addressCountry: 'MY'
    },
    areaServed: [
      { '@type': 'Country', name: 'Malaysia' },
      { '@type': 'AdministrativeArea', name: 'Southeast Asia' },
      { '@type': 'Place', name: 'Worldwide' }
    ],
    serviceType: [
      'Branding Agency',
      'Brand Strategy',
      'Brand Identity Design',
      'Naming',
      'Logo Design',
      'Rebrand',
      'Edutech Branding',
      'Islamic Branding'
    ]
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}#website`,
    name: 'Outta The Box',
    url: SITE,
    publisher: { '@id': `${SITE}#organization` },
    inLanguage: 'en-MY'
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
