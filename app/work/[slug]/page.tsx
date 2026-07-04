import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Cursor from '@/components/Cursor';
import { EdgeMeta, Scanlines } from '@/components/Overlays';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingSection from '@/components/BookingSection';
import CaseStudy from '@/components/CaseStudy';
import { CASES, ORDER, type CaseSlug } from '@/lib/case-studies';

type Props = { params: { slug: string } };

const isCaseSlug = (s: string): s is CaseSlug =>
  (ORDER as readonly string[]).includes(s);

export function generateStaticParams() {
  return ORDER.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isCaseSlug(params.slug)) return { title: 'Case Study — Outta The Box™' };
  const c = CASES[params.slug];
  return {
    title: `${c.title.replace(/\.$/, '')} — Case File // Outta The Box™`,
    description: c.tagline
  };
}

export default function CaseStudyPage({ params }: Props) {
  if (!isCaseSlug(params.slug)) notFound();
  return (
    <>
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
