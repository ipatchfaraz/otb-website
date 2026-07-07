import type { Metadata } from 'next';
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
  if (!c) return { title: 'Case Study Outta The Box™' };
  return {
    title: `${c.title.replace(/\.$/, '')} Case File // Outta The Box™`,
    description: c.tagline
  };
}

export default async function CaseStudyPage({ params }: Props) {
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
