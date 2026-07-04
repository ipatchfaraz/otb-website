import { colors, fonts } from '@/lib/tokens';
import CornerBrackets from './CornerBrackets';

const ENTRIES = [
  {
    log: 'LOG_01 // STRATEGY // 6 MIN READ',
    head: 'WHAT IS A TRUELINE — AND WHY YOUR TAGLINE ISN’T ONE.',
    body: 'The one-sentence truth at the centre of every brand we build, and how to find yours.'
  },
  {
    log: 'LOG_02 // IDENTITY // 4 MIN READ',
    head: 'FIVE SIGNS YOUR BRAND IS STILL IN THE BOX.',
    body: 'Template logos, borrowed voice, trend-chasing colour — a quick self-audit before you rebrand.'
  },
  {
    log: 'LOG_03 // NAMING // 5 MIN READ',
    head: 'NAMING A BRAND: PROCESS, NOT SORCERY.',
    body: 'How we generate, stress-test and legally clear names — and the shortlist rules we never break.'
  }
];

export default function Journal() {
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
              fontWeight: 900,
              fontSize: 'clamp(34px, 5vw, 68px)',
              lineHeight: 1.02,
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            BRANDING 101.
          </h2>
        </div>
        <a
          href="#"
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
        </a>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16
        }}
      >
        {ENTRIES.map((e) => (
          <article
            key={e.log}
            className="hover-border"
            style={{
              border: `1px solid ${colors.line}`,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              position: 'relative'
            }}
          >
            <CornerBrackets outside corners={['tl', 'br']} />
            <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>{e.log}</div>
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
              {e.head}
            </h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: colors.muted }}>{e.body}</p>
            <a
              href="#"
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
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
