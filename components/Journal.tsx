import Link from 'next/link';
import { colors, fonts } from '@/lib/tokens';
import CornerBrackets from './CornerBrackets';
import { getJournalList } from '@/lib/content';

export default async function Journal() {
  const entries = (await getJournalList()).slice(0, 3);

  return (
    <section
      id="journal"
      data-screen-label="Branding 101"
      style={{
        borderTop: `1px solid ${colors.line}`,
        padding: '88px 72px',
        maxWidth: 1440,
        margin: '0 auto'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 56
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
            [ THE JOURNAL ]
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 'clamp(34px, 5vw, 68px)',
              lineHeight: 1.02,
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            BRANDING 101.
          </h2>
        </div>
        <Link
          href="/journal"
          className="hover-yellow"
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: colors.fg,
            textDecoration: 'none',
            borderBottom: `1px solid ${colors.line}`,
            paddingBottom: 4
          }}
        >
          SEE ALL ENTRIES →
        </Link>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16
        }}
      >
        {entries.map((e) => (
          <Link
            key={e.slug}
            href={`/journal/${e.slug}`}
            className="hover-border"
            style={{
              border: `1px solid ${colors.line}`,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              position: 'relative',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <CornerBrackets outside corners={['tl', 'br']} />
            <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
              LOG_{e.log} // {e.category} // {e.readMin}
            </div>
            <h3
              style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 24,
                lineHeight: 1.2,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              {e.title}
            </h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: colors.muted }}>{e.dek}</p>
            <span
              className="hover-yellow"
              style={{
                marginTop: 'auto',
                fontFamily: fonts.mono,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: colors.yellow,
                textDecoration: 'none'
              }}
            >
              READ ENTRY →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
