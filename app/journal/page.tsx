import type { Metadata } from 'next';
import Link from 'next/link';
import Cursor from '@/components/Cursor';
import { EdgeMeta, ScanBar, Scanlines } from '@/components/Overlays';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CornerBrackets from '@/components/CornerBrackets';
import { colors, fonts } from '@/lib/tokens';
import { getJournalList } from '@/lib/content';

export const metadata: Metadata = {
  title: 'The Journal Branding 101 // Outta The Box™',
  description:
    'Field notes from the studio strategy, identity and naming, written the way we actually work.'
};

// Revalidate every 60s so CMS edits show up quickly without full rebuild
export const revalidate = 60;

export default async function JournalPage() {
  const entries = await getJournalList();

  return (
    <>
      <Cursor />
      <Scanlines />
      <ScanBar />
      <EdgeMeta left="THE JOURNAL // NODE-04" />
      <Header />

      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '72px 48px 96px 48px',
          display: 'flex',
          flexDirection: 'column',
          gap: 48
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.18em', color: colors.yellow }}>
            [ THE JOURNAL ]
          </div>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 'clamp(44px, 7vw, 96px)',
              lineHeight: 0.96,
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            BRANDING 101.
          </h1>
          <p style={{ margin: 0, maxWidth: '60ch', fontSize: 17, lineHeight: 1.6, color: colors.muted }}>
            Field notes from the studio strategy, identity and naming, written the way we actually work. No jargon, no filler.
          </p>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.16em', color: '#6A6A6A' }}>
            {String(entries.length).padStart(2, '0')} ENTRIES // ARCHIVE OPEN
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 18
          }}
        >
          {entries.map((e) => (
            <Link
              key={e.slug}
              href={`/journal/${e.slug}`}
              className="hover-border"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                border: `1px solid ${colors.line}`,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'border-color 0.2s'
              }}
            >
              <CornerBrackets outside corners={['tl', 'br']} />
              <div
                style={{
                  height: 200,
                  borderBottom: `1px solid ${colors.line}`,
                  overflow: 'hidden',
                  background:
                    'repeating-linear-gradient(45deg, #1A1A1A 0px, #1A1A1A 10px, #161616 10px, #161616 20px)'
                }}
              >
                {e.thumb && (
                  <img
                    src={e.thumb}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </div>
              <div
                style={{
                  padding: '26px 28px 30px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  flex: 1
                }}
              >
                <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
                  LOG_{e.log} // {e.category} // {e.readMin}
                </div>
                <h3
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 800,
                    fontSize: 23,
                    lineHeight: 1.18,
                    margin: 0,
                    textTransform: 'uppercase'
                  }}
                >
                  {e.title}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: colors.muted }}>{e.dek}</p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 10
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: colors.yellow
                    }}
                  >
                    READ ENTRY →
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      color: '#6A6A6A'
                    }}
                  >
                    {e.date}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          style={{
            borderTop: `1px solid ${colors.line}`,
            paddingTop: 40,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
              [ MORE INCOMING ]
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 22,
                textTransform: 'uppercase'
              }}
            >
              NEW ENTRIES DROP MONTHLY.
            </div>
          </div>
          <Link href="/#guide" className="cta-y" style={{ fontSize: 12, padding: '16px 28px' }}>
            GET THE FREE KIT →
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
