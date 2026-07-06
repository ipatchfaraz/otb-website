import Link from 'next/link';
import { anims, colors, fonts } from '@/lib/tokens';

const sitemap = [
  { href: '/work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#about', label: 'About' },
  { href: '/#journal', label: 'Journal' },
  { href: '/#contact', label: 'Contact' }
];

const marqueeItems = [
  'THINK OUTTA THE BOX',
  'BRANDING THAT REFUSES THE TEMPLATE',
  'KUALA LUMPUR',
  'EST. 2016'
];

function MarqueeRow() {
  return (
    <>
      {marqueeItems.map((m, i) => (
        <span key={`a${i}`}>
          <span style={{ padding: '0 22px' }}>{m}</span>
          <span style={{ color: '#3A3A3A' }}>✦</span>
        </span>
      ))}
      {marqueeItems.map((m, i) => (
        <span key={`b${i}`}>
          <span style={{ padding: '0 22px' }}>{m}</span>
          <span style={{ color: '#3A3A3A' }}>✦</span>
        </span>
      ))}
    </>
  );
}

export default function Footer() {
  return (
    <footer
      data-screen-label="Footer"
      style={{
        position: 'relative',
        borderTop: `1px solid ${colors.line}`,
        background: colors.bgAlt,
        overflow: 'hidden'
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,229,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,229,0,0.035) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          opacity: 0.5,
          pointerEvents: 'none'
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none'
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '4%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 'clamp(120px, 22vw, 340px)',
          lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,229,0,0.07)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        OTB
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 72px',
          borderBottom: `1px solid ${colors.line}`,
          background: colors.bgAlt2,
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: '0.16em',
          color: colors.muted
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: colors.green,
              boxShadow: `0 0 6px ${colors.green}`
            }}
          />
          SYSTEM ONLINE
          <span style={{ color: '#3A3A3A' }}>//</span>
          <span style={{ color: colors.mutedSoft }}>OTB://TRANSMISSION_LOG</span>
        </span>
        <span>LAT 3.1390° N // LONG 101.6869° E</span>
      </div>
      <div
        aria-hidden
        style={{
          position: 'relative',
          zIndex: 2,
          height: 5,
          background:
            'repeating-linear-gradient(-45deg, #FFE500 0px, #FFE500 8px, #141414 8px, #141414 16px)',
          opacity: 0.8
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '64px 72px 40px 72px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: '0.18em',
              color: colors.yellow
            }}
          >
            [ START A TRANSMISSION ]
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 'clamp(32px, 4.5vw, 62px)',
              lineHeight: 1,
              margin: 0,
              textTransform: 'uppercase',
              maxWidth: '15ch'
            }}
          >
            LET&rsquo;S BUILD SOMETHING OUTTA THE BOX.
          </h2>
        </div>
        <Link
          href="/#book"
          className="cta-y"
          style={{
            padding: '18px 34px',
            fontSize: 13,
            gap: 4,
            boxShadow: '0 0 26px rgba(255,229,0,0.28)',
            whiteSpace: 'nowrap'
          }}
        >
          BOOK A FREE DISCOVERY CALL
          <span style={{ animation: anims.blink }}>█</span>
        </Link>
      </div>

      <div
        data-foot-cols
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '8px 72px 48px 72px',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 32
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 16 }}>OUTTA THE BOX™</div>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: colors.muted }}>
            Branding agency, Kuala Lumpur. Think outta the box.
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: '0.14em',
              color: '#5A5A5A',
              marginTop: 4
            }}
          >
            EST. 2016 // 10+ YRS ACTIVE
          </div>
        </div>
        <nav aria-label="Sitemap" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: '0.15em',
              color: colors.yellow,
              marginBottom: 4
            }}
          >
            SITEMAP
          </div>
          {sitemap.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="hover-white"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
                color: colors.muted,
                textDecoration: 'none'
              }}
            >
              <span style={{ fontFamily: fonts.mono, fontSize: 9, color: '#5A5A5A' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: '0.15em',
              color: colors.yellow,
              marginBottom: 4
            }}
          >
            CONTACT
          </div>
          <a href="mailto:info@outtathebox.design" className="hover-white" style={{ fontSize: 14, color: colors.muted, textDecoration: 'none' }}>
            info@outtathebox.design
          </a>
          <a href="tel:+60172579400" className="hover-white" style={{ fontSize: 14, color: colors.muted, textDecoration: 'none' }}>
            +60 17-257 9400
          </a>
          <div style={{ fontSize: 14, color: colors.muted }}>Kuala Lumpur, Malaysia</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: '0.15em',
              color: colors.yellow,
              marginBottom: 4
            }}
          >
            SOCIALS
          </div>
          {['INSTAGRAM', 'LINKEDIN', 'BEHANCE'].map((s, i, a) => (
            <a
              key={s}
              href="#"
              className="hover-yellow"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 14,
                color: colors.muted,
                textDecoration: 'none',
                borderBottom: i === a.length - 1 ? 'none' : `1px solid ${colors.line2}`,
                paddingBottom: 8,
                maxWidth: 200
              }}
            >
              {s}
              <span style={{ fontFamily: fonts.mono, fontSize: 10 }}>↗</span>
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          borderTop: `1px solid ${colors.line}`,
          borderBottom: `1px solid ${colors.line}`,
          overflow: 'hidden',
          padding: '14px 0',
          background: colors.bgAlt2
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            whiteSpace: 'nowrap',
            animation: anims.marquee,
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: colors.yellow
          }}
        >
          <MarqueeRow />
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '18px 72px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: '0.15em',
          color: colors.muted
        }}
      >
        <div>© OUTTA THE BOX™ 2026. ALL RIGHTS RESERVED.</div>
        <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: colors.yellow, textDecoration: 'none' }}>
          ↑ BACK TO TOP
        </a>
        <div>
          SYS: BRAND ENGINE V.15 // KL // ONLINE
          <span style={{ animation: anims.blink, color: colors.yellow }}>▮</span>
        </div>
      </div>
    </footer>
  );
}
