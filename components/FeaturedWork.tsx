import Link from 'next/link';
import { colors, fonts } from '@/lib/tokens';
import CornerBrackets from './CornerBrackets';
import { getFeaturedProjects } from '@/lib/content';

export default async function FeaturedWork() {
  const projects = await getFeaturedProjects();
  const cards = projects.map((p, i) => ({
    slug: p.slug,
    file: `FILE_${String(i + 1).padStart(2, '0')}`,
    cover: p.coverImage,
    meta: p.caseLabel.replace('[ CASE_FILE: ', '').replace(' ]', ''),
    tagline: p.tagline,
    alt: `${p.client} case study cover`
  }));

  return (
    <section
      id="work"
      data-screen-label="Selected work"
      style={{
        borderTop: `1px solid ${colors.line}`,
        position: 'relative'
      }}
    >
      <div style={{ padding: '84px 0 40px 0' }}>
        <div
          data-work-head
          style={{
            padding: '0 72px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 36
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
              [ SELECTED WORK ]
            </div>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 'clamp(30px, 4vw, 56px)',
                lineHeight: 1.02,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              FRESH OUT OF THE BOX.
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, fontFamily: fonts.mono, letterSpacing: '0.15em' }}>
            <span style={{ fontSize: 10, color: colors.muted }}>SCROLL → TO PAN</span>
            <span style={{ fontSize: 13, color: colors.yellow }}>
              <span style={{ color: colors.muted }}> / 0{cards.length}</span>
            </span>
          </div>
        </div>

        <div
          data-work-track
          style={{
            display: 'flex',
            gap: 24,
            padding: '0 72px 4px 72px',
            overflowX: 'auto',
            scrollSnapType: 'x proximity',
            alignItems: 'stretch'
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.slug}
              href={`/work/${card.slug}`}
              className="hover-border"
              style={{
                scrollSnapAlign: 'start',
                width: 'clamp(300px, 27vw, 400px)',
                height: 'min(60vh, 600px)',
                flex: 'none',
                border: `1px solid ${colors.line}`,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                textDecoration: 'none',
                color: colors.fg,
                background: colors.bg
              }}
            >
              <div
                role="img"
                aria-label={card.alt}
                style={{
                  flex: 1,
                  margin: 16,
                  backgroundImage: `url('${card.cover}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: `1px solid ${colors.line}`,
                  position: 'relative'
                }}
              >
                <CornerBrackets />
                <span
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 18,
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    color: colors.muted
                  }}
                >
                  {card.file}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '6px 22px 22px 22px' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
                  {card.meta}
                </div>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5 }}>{card.tagline}</p>
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: colors.yellow
                  }}
                >
                  UNBOX THE CASE →
                </span>
              </div>
            </Link>
          ))}
          <Link
            href="/work"
            className="hover-border"
            style={{
              scrollSnapAlign: 'start',
              width: 'clamp(300px, 27vw, 400px)',
              height: 'min(60vh, 600px)',
              flex: 'none',
              border: `1px solid ${colors.yellow}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              textDecoration: 'none',
              color: colors.fg,
              position: 'relative'
            }}
          >
            <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.2em', color: colors.muted }}>
              FILE_{String(cards.length + 1).padStart(2, '0')} // INDEX
            </span>
            <span
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 32,
                textTransform: 'uppercase',
                textAlign: 'center',
                lineHeight: 1.1
              }}
            >
              SEE ALL
              <br />
              WORK
            </span>
            <span style={{ fontFamily: fonts.mono, fontSize: 20, color: colors.yellow }}>→</span>
            <CornerBrackets outside corners={['tl', 'br']} />
          </Link>
        </div>
      </div>
    </section>
  );
}
