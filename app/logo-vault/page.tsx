import type { Metadata } from 'next';
import Cursor from '@/components/Cursor';
import { EdgeMeta, Scanlines } from '@/components/Overlays';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LogoVaultGrid from '@/components/LogoVaultGrid';
import BookingSection from '@/components/BookingSection';
import { colors, fonts } from '@/lib/tokens';

export const metadata: Metadata = {
  title: 'The Logo Vault — Outta The Box™',
  description: 'Marks archive. Every logo drawn, refined and shipped by the studio.'
};

export default function LogoVaultPage() {
  return (
    <>
      <Cursor />
      <Scanlines />
      <EdgeMeta />
      <Header />
      <section
        data-screen-label="Archive hero"
        style={{
          padding: '96px 72px 40px 72px',
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          backgroundImage: 'radial-gradient(#242414 1.5px, transparent 1.5px)',
          backgroundSize: '34px 34px'
        }}
      >
        <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.15em', color: colors.yellow }}>
          [ MARKS ARCHIVE ]
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            lineHeight: 1,
            margin: 0,
            textTransform: 'uppercase'
          }}
        >
          THE LOGO VAULT.
        </h1>
        <p style={{ margin: 0, maxWidth: '58ch', fontSize: 16, lineHeight: 1.65, color: colors.muted }}>
          Every brand starts with a mark. A selection of logos drawn, refined and shipped by the studio over the years.
        </p>
        <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
          RECORDS: 63 // FORMAT: VECTOR // STATUS: SHIPPED
        </div>
      </section>
      <section
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 72px 88px 72px'
        }}
      >
        <LogoVaultGrid />
      </section>
      <BookingSection />
      <Footer />
    </>
  );
}
