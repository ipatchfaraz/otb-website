import type { ReactNode } from 'react';
import { colors, fonts } from '@/lib/tokens';
import CornerBrackets from './CornerBrackets';

type Service = {
  code: string;
  title: string;
  icon: ReactNode;
  items: string[];
};

const SERVICES: Service[] = [
  {
    code: 'MODULE_01',
    title: 'BRAND STRATEGY',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={{ filter: 'drop-shadow(0 0 6px rgba(255,229,0,0.35))' }}>
        <rect x="6" y="6" width="20" height="20" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <circle cx="16" cy="16" r="3" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
      </svg>
    ),
    items: [
      'BRAND AUDITS', 'DISCOVERY', 'QUANTITATIVE RESEARCH', 'QUALITATIVE RESEARCH',
      'POSITIONING', 'VOICE & TONE', 'MESSAGING FRAMEWORK', 'NAMING', 'USER PERSONAS'
    ]
  },
  {
    code: 'MODULE_02',
    title: 'BRAND IDENTITY',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={{ filter: 'drop-shadow(0 0 6px rgba(255,229,0,0.35))' }}>
        <polygon points="16,3 22,17 10,17" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <circle cx="16" cy="13" r="2" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <rect x="10" y="21" width="12" height="7" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
      </svg>
    ),
    items: [
      'LOGO DESIGN', 'VISUAL IDENTITY', 'COLOR PALETTE', 'TYPOGRAPHY',
      'BRAND STYLE-GUIDE', 'ILLUSTRATION & ICONOGRAPHY'
    ]
  },
  {
    code: 'MODULE_03',
    title: 'BRAND ACTIVATION',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={{ filter: 'drop-shadow(0 0 6px rgba(255,229,0,0.35))' }}>
        <polygon points="16,3 21,11 11,11" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <rect x="11" y="11" width="10" height="12" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2.5" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <line x1="11" y1="23" x2="7" y2="28" stroke={colors.yellow} strokeWidth="1.5" />
        <line x1="21" y1="23" x2="25" y2="28" stroke={colors.yellow} strokeWidth="1.5" />
      </svg>
    ),
    items: ['ROADMAP ACTIVATION', 'MONTHLY CHECKINS', 'TRAINING FOR TEAMS', 'WORKSHOPS', 'BRAND AUDITS']
  },
  {
    code: 'MODULE_04',
    title: 'DIGITAL COLLATERAL',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={{ filter: 'drop-shadow(0 0 6px rgba(255,229,0,0.35))' }}>
        <path d="M6 24 Q16 6 26 24" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <circle cx="6" cy="24" r="2.5" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <circle cx="26" cy="24" r="2.5" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <rect x="13" y="10" width="6" height="6" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
      </svg>
    ),
    items: ['PITCH DECK', 'WEB DESIGN', 'SOCIAL MEDIA TEMPLATES', 'LOGO ANIMATION', 'LOTTIE ANIMATIONS', 'EMAIL MARKETING TEMPLATES']
  },
  {
    code: 'MODULE_05',
    title: 'PHYSICAL COLLATERAL',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={{ filter: 'drop-shadow(0 0 6px rgba(255,229,0,0.35))' }}>
        <polygon points="10,6 22,6 20,27 12,27" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <line x1="9" y1="10" x2="23" y2="10" stroke={colors.yellow} strokeWidth="1.5" />
        <line x1="11" y1="22" x2="21" y2="22" stroke={colors.yellow} strokeWidth="1.5" />
      </svg>
    ),
    items: [
      'STATIONERY', 'BROCHURE DESIGN', 'WHITE PAPER', 'PACKAGING & LABELLING',
      'PRINT ADVERTISING', 'WAYFINDING & SIGNAGE', 'ANNUAL REPORT'
    ]
  },
  {
    code: 'MODULE_06',
    title: 'CONSULTANCY',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={{ filter: 'drop-shadow(0 0 6px rgba(255,229,0,0.35))' }}>
        <circle cx="16" cy="16" r="11" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <circle cx="16" cy="16" r="6" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
        <circle cx="16" cy="16" r="1.5" fill={colors.yellow} />
      </svg>
    ),
    items: [
      'PRINT CONSULTANCY', 'ART DIRECTION', 'BRAND SIGNAGE', 'INTERIOR DESIGN',
      'COLOR CONSULTATION', 'MATERIAL CONSULTATION', 'BRAND PHOTOGRAPHY'
    ]
  }
];

export default function Services() {
  return (
    <section
      id="services"
      data-screen-label="Services"
      style={{ borderTop: `1px solid ${colors.line}`, position: 'relative' }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '88px 72px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 40 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
            [ WHAT&rsquo;S INSIDE ]
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 'clamp(34px, 5vw, 68px)',
              lineHeight: 1.02,
              margin: 0,
              textTransform: 'uppercase',
              maxWidth: '20ch',
              textWrap: 'balance' as React.CSSProperties['textWrap']
            }}
          >
            EVERYTHING A BRAND NEEDS. NOTHING IT DOESN&rsquo;T.
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 16
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.code}
              data-svc-card
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.muted }}>
                  {s.code}
                </span>
                {s.icon}
              </div>
              <h3
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 800,
                  fontSize: 24,
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                {s.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {s.items.map((item, i) => (
                  <div
                    key={item}
                    className="hover-yellow"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 12,
                      padding: '9px 0',
                      borderTop: `1px solid ${colors.line}`,
                      fontFamily: fonts.mono,
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      color: colors.muted
                    }}
                  >
                    <span>{item}</span>
                    <span style={{ color: '#4A4A4A' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
