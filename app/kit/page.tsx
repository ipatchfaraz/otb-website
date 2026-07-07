import type { Metadata } from 'next';
import Link from 'next/link';
import Cursor from '@/components/Cursor';
import { EdgeMeta, ScanBar, Scanlines } from '@/components/Overlays';
import KitDownload from '@/components/KitDownload';
import { colors, fonts } from '@/lib/tokens';

export const metadata: Metadata = {
  title: 'Download the Kit Outta The Box™',
  description: 'The Brand Starter Kit a free field guide to unboxing your brand.'
};

export default function KitPage() {
  return (
    <>
      <Cursor />
      <Scanlines />
      <ScanBar />
      <EdgeMeta left="SECURE TRANSFER // NODE-04" />

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: colors.bg,
          borderBottom: `1px solid ${colors.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          padding: '0 48px',
          height: 68
        }}
      >
        <Link
          href="/"
          aria-label="Outta The Box home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 11,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            color: colors.fg
          }}
        >
          <img src="/assets/otb-logomark.svg" alt="" style={{ display: 'block', width: 28, height: 28 }} />
          <span
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 16,
              letterSpacing: '0.02em'
            }}
          >
            OUTTA THE BOX™
          </span>
        </Link>
        <Link
          href="/"
          className="hover-yellow"
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: colors.muted,
            textDecoration: 'none'
          }}
        >
          ← RETURN TO BASE
        </Link>
      </header>

      <KitDownload />

      <footer
        style={{
          borderTop: `1px solid ${colors.line}`,
          padding: '20px 48px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 12
        }}
      >
        <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
          © OUTTA THE BOX™ 2026. ALL RIGHTS RESERVED.
        </div>
        <Link
          href="/"
          className="hover-yellow"
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: '0.15em',
            color: colors.muted,
            textDecoration: 'none'
          }}
        >
          ← RETURN TO BASE
        </Link>
      </footer>
    </>
  );
}
