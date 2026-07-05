import HomeShell from '@/components/HomeShell';
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

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HomeShell />
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
