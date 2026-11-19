import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Cursor from '@/components/Cursor';
import { EdgeMeta, Scanlines } from '@/components/Overlays';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingSection from '@/components/BookingSection';
import CaseStudy from '@/components/CaseStudy';
import { getAllCaseSlugs, getCase } from '@/lib/content';

type Props = { params: { slug: string } };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllCaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Per-case overrides let specific case studies declare extra SEO signals
// Google uses to connect them to a real-world entity (sameAs = Wikipedia /
// Wikidata / official site) and supplementary keyword long-tails that would
// otherwise never appear in the card metadata.
type CaseSeoOverride = {
  entityName?: string;      // Canonical full name of the subject
  titleSuffix?: string;     // Extra title words after the client name
  sameAs?: string[];        // Wikipedia / Wikidata / client site links
  extraKeywords?: string[]; // Long-tail search terms
};

const CASE_SEO: Record<string, CaseSeoOverride> = {
  'international-open-university': {
    entityName: 'International Open University (IOU)',
    titleSuffix: 'Rebrand Case Study',
    sameAs: [
      'https://www.iou.edu.gm',
      'https://en.wikipedia.org/wiki/International_Open_University'
    ],
    extraKeywords: [
      'International Open University rebrand',
      'IOU rebrand',
      'IOU logo',
      'Islamic university branding',
      'Islamic higher education branding',
      'online Islamic university design',
      'Islamic edutech branding'
    ]
  }
};

function titleCase(upper: string) {
  return upper
    .toLowerCase()
    .split(' ')
    .map((w) => (w === 'iou' ? 'IOU' : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getCase(params.slug);
  if (!c) return { title: 'Case Study' };
  const seo = CASE_SEO[params.slug] ?? {};
  const displayName = seo.entityName ?? titleCase(c.client);
  const suffix = seo.titleSuffix ?? 'Case Study';
  const pageTitle = `${displayName} — ${suffix}`;
  return {
    title: pageTitle,
    description: c.tagline,
    keywords: seo.extraKeywords,
    alternates: { canonical: `/work/${params.slug}` },
    openGraph: {
      type: 'article',
      title: `${displayName} — ${suffix} | Outta The Box`,
      description: c.tagline,
      url: `/work/${params.slug}`,
      images: c.coverImage
        ? [{ url: c.coverImage, alt: `${displayName} branding case study by Outta The Box` }]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} — ${suffix}`,
      description: c.tagline,
      images: c.coverImage ? [c.coverImage] : undefined
    }
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const c = await getCase(params.slug);
  if (!c) notFound();

  const seo = CASE_SEO[params.slug] ?? {};
  const displayName = seo.entityName ?? titleCase(c.client);
  const pageUrl = `https://www.outtathebox.design/work/${params.slug}`;

  // Article schema anchors the case study to a real entity (sameAs).
  // Google uses this to disambiguate acronyms and connect the page to the
  // Knowledge Graph — the single strongest signal for "who is this about".
  const caseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${displayName} — ${seo.titleSuffix ?? 'Case Study'}`,
    name: `${displayName} — ${seo.titleSuffix ?? 'Case Study'}`,
    description: c.tagline,
    image: c.coverImage ? [c.coverImage] : undefined,
    author: {
      '@type': 'Organization',
      name: 'Outta The Box',
      url: 'https://www.outtathebox.design'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Outta The Box',
      url: 'https://www.outtathebox.design',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.outtathebox.design/assets/otb-logo.svg'
      }
    },
    about: {
      '@type': 'Organization',
      name: displayName,
      ...(seo.sameAs ? { sameAs: seo.sameAs } : {})
    },
    keywords: [
      displayName,
      c.client,
      ...(seo.extraKeywords ?? []),
      'branding',
      'brand identity',
      'case study',
      'Outta The Box'
    ].join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl }
  };

  // Breadcrumb schema → rich snippet that eats SERP real estate and
  // tells Google the page's place in the site hierarchy.
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://www.outtathebox.design/' },
      { '@type': 'ListItem', position: 2, name: 'Work',  item: 'https://www.outtathebox.design/work' },
      { '@type': 'ListItem', position: 3, name: displayName, item: pageUrl }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Cursor />
      <Scanlines />
      <EdgeMeta />
      <Header />
      <CaseStudy slug={params.slug} />
      <BookingSection />
      <Footer />
    </>
  );
}
