'use client';
import { useState } from 'react';
import BootLoader from '@/components/BootLoader';
import Cursor from '@/components/Cursor';
import { EdgeMeta, ScanBar, Scanlines } from '@/components/Overlays';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TrustedBy from '@/components/TrustedBy';
import FeaturedWork from '@/components/FeaturedWork';
import LogoVaultTeaser from '@/components/LogoVaultTeaser';
import Services from '@/components/Services';
import BurgerStrategy from '@/components/BurgerStrategy';
import Manifesto from '@/components/Manifesto';
import KitTeaser from '@/components/KitTeaser';
import AboutTeam from '@/components/AboutTeam';
import Journal from '@/components/Journal';
import ContactCta from '@/components/ContactCta';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import StickyMobileCta from '@/components/StickyMobileCta';

export default function HomePage() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <BootLoader onDone={() => setBooted(true)} />
      <Cursor />
      <Scanlines />
      <ScanBar />
      <EdgeMeta />
      <Header />
      <HeroSection started={booted} />
      <TrustedBy />
      <FeaturedWork />
      <LogoVaultTeaser />
      <Services />
      <BurgerStrategy />
      <Manifesto />
      <KitTeaser />
      <AboutTeam />
      <Journal />
      <ContactCta />
      <BookingSection />
      <Footer />
      <StickyMobileCta />
    </>
  );
}
