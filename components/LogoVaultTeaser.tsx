import Link from 'next/link';
import { colors, fonts } from '@/lib/tokens';
import LogoVaultGrid from './LogoVaultGrid';

export default function LogoVaultTeaser() {
  return (
    <section
      data-screen-label="Logo vault"
      style={{
        borderTop: `1px solid ${colors.line}`,
        // Inline safety net — iOS Safari sometimes serves stale CSS
        // that lets the vault grid overflow horizontally. Inline styles
        // beat any cached CSS, so this can't fall out of sync with the
        // stylesheet.
        overflowX: 'hidden',
        maxWidth: '100%'
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: 72, boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 36
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
              [ MARKS ARCHIVE ]
            </div>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 'clamp(26px, 3.2vw, 44px)',
                lineHeight: 1.02,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              THE LOGO VAULT.
            </h2>
          </div>
          <Link
            href="/logo-vault"
            className="hover-yellow"
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: colors.yellow,
              textDecoration: 'none'
            }}
          >
            FULL ARCHIVE →
          </Link>
        </div>
        <LogoVaultGrid />
      </div>
    </section>
  );
}
