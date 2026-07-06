import Link from 'next/link';
import { notFound } from 'next/navigation';
import { colors, fonts } from '@/lib/tokens';
import { getCase, getNextCase, type PublicCase } from '@/lib/content';
import CornerBrackets from './CornerBrackets';

export default async function CaseStudy({ slug }: { slug: string }) {
  const c: PublicCase | null = await getCase(slug);
  if (!c) notFound();
  const nx = (await getNextCase(slug)) ?? c;
  const nextMeta = nx.caseLabel.replace('[ CASE_FILE: ', '').replace(' ]', '');
  const nextSlug = nx.slug;

  const chapterRow = (label: string, sub: string) => (
    <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
        {label}
      </div>
      <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
        {sub}
      </div>
      <div style={{ flex: 1, width: 1, background: `linear-gradient(${colors.line}, transparent)`, marginLeft: 2, minHeight: 60 }} />
    </div>
  );

  return (
    <>
      <section
        data-screen-label="Case hero"
        style={{
          padding: '96px 72px 56px 72px',
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          backgroundImage: 'radial-gradient(#242414 1.5px, transparent 1.5px)',
          backgroundSize: '34px 34px'
        }}
      >
        <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.15em', color: colors.yellow }}>
          {c.caseLabel}
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
          {c.title}
        </h1>
        <p style={{ margin: 0, maxWidth: '58ch', fontSize: 17, lineHeight: 1.65, color: colors.muted }}>
          {c.tagline}
        </p>
      </section>

      <section
        data-screen-label="Case hero image"
        style={{ borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}` }}
      >
        <div style={{ position: 'relative', maxWidth: 1440, margin: '0 auto', padding: '24px 72px' }}>
          <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', border: `1px solid ${colors.line}` }}>
            <div
              role="img"
              aria-label={`${c.title} case study hero image`}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${c.heroImg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <CornerBrackets size={16} inset={10} />
          </div>
        </div>
      </section>

      <section
        data-screen-label="Case overview"
        style={{ padding: '56px 72px', maxWidth: 1440, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48 }}
      >
        <div
          style={{
            flex: '1 1 320px',
            minWidth: 260,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
            background: colors.line,
            border: `1px solid ${colors.line}`,
            alignSelf: 'flex-start'
          }}
        >
          {[
            ['CLIENT', c.client],
            ['SECTOR', c.sector],
            ['SCOPE', c.scope],
            ['YEAR', c.year]
          ].map(([label, val]) => (
            <div key={label} style={{ background: colors.bg, padding: 20 }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.25em', color: colors.muted, marginBottom: 8 }}>
                {label}
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 13, letterSpacing: '0.1em' }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: '2 1 480px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
            [ THE STORY IN ONE LINE ]
          </div>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, maxWidth: '58ch' }}>{c.brief}</p>
        </div>
      </section>

      {/* CH.01 */}
      <section data-screen-label="Ch1 Problem" style={{ borderTop: `1px solid ${colors.line}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '88px 72px', display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          {chapterRow('CH.01 // THE PROBLEM', 'WHAT THEY WALKED IN WITH')}
          <div style={{ flex: '1 1 480px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 'clamp(28px, 3.6vw, 48px)',
                lineHeight: 1.05,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              {c.problemHead}
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: colors.muted, maxWidth: '62ch' }}>
              {c.problemBody}
            </p>
          </div>
        </div>
      </section>

      {/* CH.02 */}
      <section data-screen-label="Ch2 Discovery" style={{ borderTop: `1px solid ${colors.line}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '88px 72px 64px 72px', display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          {chapterRow('CH.02 // THE DIG', 'WHAT WE UNCOVERED')}
          <div style={{ flex: '1 1 480px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: colors.muted, maxWidth: '62ch' }}>
              {c.digBody}
            </p>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}`, background: colors.yellow }}>
          <div data-insight style={{ maxWidth: 1440, margin: '0 auto', padding: '72px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: colors.bg }}>
              [ THE INSIGHT ]
            </div>
            <div
              data-insight-q
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 'clamp(30px, 4.2vw, 60px)',
                lineHeight: 1.08,
                color: colors.bg,
                textTransform: 'uppercase',
                maxWidth: '24ch'
              }}
            >
              {c.insight}
            </div>
          </div>
        </div>
      </section>

      {/* CH.03 */}
      <section data-screen-label="Ch3 Idea" style={{ borderTop: `1px solid ${colors.line}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '88px 72px', display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          {chapterRow('CH.03 // THE LEAP', 'INSIGHT → IDEA')}
          <div style={{ flex: '1 1 480px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 'clamp(28px, 3.6vw, 48px)',
                lineHeight: 1.05,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              {c.leapHead}
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: colors.muted, maxWidth: '62ch' }}>
              {c.leapBody}
            </p>
          </div>
        </div>
      </section>

      {/* CH.04 */}
      <section data-screen-label="Ch4 Solution" style={{ borderTop: `1px solid ${colors.line}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '88px 72px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginBottom: 40 }}>
            {chapterRow('CH.04 // THE SOLUTION', 'THE IDEA, MADE VISIBLE')}
            <p style={{ flex: '1 1 480px', minWidth: 300, margin: 0, fontSize: 16, lineHeight: 1.7, color: colors.muted, maxWidth: '62ch' }}>
              {c.solutionBody}
            </p>
          </div>
          {c.gallery && (
            <div data-case-gallery style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {c.gallery.map((fig, i) => (
                <figure
                  key={i}
                  style={{
                    margin: 0,
                    gridColumn: fig.col,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    minWidth: 0
                  }}
                >
                  <div style={{ position: 'relative', border: `1px solid ${colors.line}`, background: '#1A1A1A' }}>
                    <img
                      src={fig.img}
                      alt={fig.alt}
                      style={{ display: 'block', width: '100%', height: 'auto' }}
                    />
                    <CornerBrackets size={16} inset={10} corners={['tl', 'br']} />
                  </div>
                  <figcaption style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.2em', color: colors.yellow, whiteSpace: 'nowrap' }}>
                      {fig.tag}
                    </span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
                      {fig.caption}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CH.05 */}
      <section data-screen-label="Ch5 Payoff" style={{ borderTop: `1px solid ${colors.line}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '88px 72px', display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          {chapterRow('CH.05 // THE PAYOFF', 'WHERE IT LANDED')}
          <div style={{ flex: '1 1 480px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.6, maxWidth: '58ch' }}>{c.payoff}</p>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.12em', color: colors.yellow }}>
              STATUS: SHIPPED ✓ // CASE_FILE CLOSED
            </div>
          </div>
        </div>
      </section>

      {/* Next case link */}
      <section
        data-screen-label="Next case"
        style={{ borderTop: `1px solid ${colors.line}` }}
      >
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '72px' }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow, marginBottom: 20 }}>
            [ NEXT CASE_FILE ]
          </div>
          <Link
            href={`/work/${nextSlug}`}
            className="hover-border"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 32,
              alignItems: 'center',
              justifyContent: 'space-between',
              border: `1px solid ${colors.line}`,
              padding: 32,
              textDecoration: 'none',
              color: colors.fg,
              position: 'relative'
            }}
          >
            <CornerBrackets outside />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
                {nextMeta}
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 900,
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  textTransform: 'uppercase'
                }}
              >
                {nx.title}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: fonts.mono,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: colors.yellow
              }}
            >
              UNBOX NEXT
              <span
                style={{
                  width: 40,
                  height: 40,
                  border: `1px solid ${colors.yellow}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                →
              </span>
            </div>
            <img
              src={nx.coverImage}
              alt=""
              style={{ width: 180, height: 120, objectFit: 'cover', display: 'block', border: `1px solid ${colors.line}` }}
            />
          </Link>
        </div>
      </section>
    </>
  );
}
