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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getCase(params.slug);
  if (!c) return { title: 'Case Study' };
  const cleanTitle = c.title.replace(/\.$/, '');
  return {
    title: `${cleanTitle} | Case File`,
    description: c.tagline,
    alternates: { canonical: `/work/${params.slug}` },
    openGraph: {
      type: 'article',
      title: `${cleanTitle} | Outta The Box`,
      description: c.tagline,
      url: `/work/${params.slug}`,
      images: c.coverImage
        ? [{ url: c.coverImage, alt: `${c.client} case study cover` }]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cleanTitle} | Outta The Box`,
      description: c.tagline,
      images: c.coverImage ? [c.coverImage] : undefined
    }
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const c = await getCase(params.slug);
  if (!c) notFound();

  const caseSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: c.title,
    headline: c.title,
    description: c.tagline,
    image: c.coverImage ? [c.coverImage] : undefined,
    creator: {
      '@type': 'Organization',
      name: 'Outta The Box',
      url: 'https://www.outtathebox.design'
    },
    about: c.client,
    keywords: [c.client, 'branding', 'case study', 'brand identity'].join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.outtathebox.design/work/${params.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
      />
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
