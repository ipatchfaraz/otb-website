import type { Metadata } from 'next';
import Cursor from '@/components/Cursor';
import { EdgeMeta, Scanlines } from '@/components/Overlays';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingSection from '@/components/BookingSection';
import WorkGrid from '@/components/WorkGrid';
import LogoVaultTeaser from '@/components/LogoVaultTeaser';

export const metadata: Metadata = {
  title: 'The Unboxed Archive — Outta The Box™',
  description: 'Every case file, declassified. Selected work from Outta The Box.'
};

export default function WorkPage() {
  return (
    <>
      <Cursor />
      <Scanlines />
      <EdgeMeta />
      <Header />
      <WorkGrid />
      <LogoVaultTeaser />
      <BookingSection />
      <Footer />
    </>
  );
}
