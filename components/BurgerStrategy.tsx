'use client';
import { useState } from 'react';
import { colors, fonts } from '@/lib/tokens';

const PHASES: Array<{ code: string; title: string; body: string }> = [
  { code: 'PHASE_01', title: 'DISCOVERY',           body: 'A 12-hour Discovery Workshop that digs deep into the organisation: goals, audience, and what’s really being built.' },
  { code: 'PHASE_02', title: 'RESEARCH',            body: 'Customer and competitive analysis: interviews, surveys, and a full landscape scan.' },
  { code: 'PHASE_03', title: 'DIFFERENTIATION',     body: 'Isolating the unique position only this brand can own.' },
  { code: 'PHASE_04', title: 'BRAND',               body: 'Heart, purpose and messaging: the trueline, voice and personality across every touchpoint.' },
  { code: 'PHASE_05', title: 'IDENTITY & TESTING',  body: 'Logo, typography, colour and imagery — validated with real audiences before launch.' }
];

export default function BurgerStrategy() {
  const [hovered, setHovered] = useState(0);
  const opacityFor = (n: number) => (hovered === 0 ? 1 : hovered === n ? 1 : 0.2);

  return (
    <section
      id="process"
      data-screen-label="Process — Burger Strategy"
      style={{
        borderTop: `1px solid ${colors.line}`,
        position: 'relative',
        overflow: 'clip'
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: fonts.mono,
          fontSize: 'clamp(40px, 8vw, 110px)',
          letterSpacing: '0.5em',
          color: 'rgba(138,138,138,0.08)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}
      >
        PROCESS
      </div>
      <div style={{ padding: '88px 72px', maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow, marginBottom: 20 }}>
          [ OUR PROCESS ]
        </div>
        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 'clamp(34px, 5vw, 68px)',
            lineHeight: 1.02,
            margin: '0 0 24px 0',
            textTransform: 'uppercase'
          }}
        >
          THE BURGER STRATEGY™.
        </h2>
        <p style={{ margin: '0 0 56px 0', maxWidth: '58ch', fontSize: 17, lineHeight: 1.65, color: colors.muted }}>
          Our brand creation process, divided into five phases — each an in-depth layer of the whole. Built in order. Never half-baked.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 56, alignItems: 'center' }}>
          <div style={{ flex: '0 1 380px', minWidth: 280, display: 'flex', justifyContent: 'center' }} aria-hidden>
            <svg
              width="320"
              height="360"
              viewBox="0 0 320 360"
              style={{ filter: 'drop-shadow(0 0 16px rgba(255,229,0,0.25))', maxWidth: '100%' }}
            >
              <g opacity={opacityFor(1)} style={{ transition: 'opacity 0.2s linear' }}>
                <path d="M40 78 Q160 -12 280 78 L280 86 L40 86 Z" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
                <circle cx="120" cy="46" r="2" fill={colors.yellow} />
                <circle cx="170" cy="36" r="2" fill={colors.yellow} />
                <circle cx="215" cy="52" r="2" fill={colors.yellow} />
              </g>
              <g opacity={opacityFor(2)} style={{ transition: 'opacity 0.2s linear' }}>
                <path d="M40 126 Q55 110 70 126 Q85 142 100 126 Q115 110 130 126 Q145 142 160 126 Q175 110 190 126 Q205 142 220 126 Q235 110 250 126 Q265 142 280 126" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
              </g>
              <g opacity={opacityFor(3)} style={{ transition: 'opacity 0.2s linear' }}>
                <rect x="40" y="162" width="240" height="30" rx="15" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
              </g>
              <g opacity={opacityFor(4)} style={{ transition: 'opacity 0.2s linear' }}>
                <polygon points="40,228 280,228 258,252 62,252" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
              </g>
              <g opacity={opacityFor(5)} style={{ transition: 'opacity 0.2s linear' }}>
                <rect x="40" y="288" width="240" height="38" rx="14" fill="none" stroke={colors.yellow} strokeWidth="1.5" />
              </g>
            </svg>
          </div>
          <div style={{ flex: '1 1 480px', minWidth: 300, display: 'flex', flexDirection: 'column' }}>
            {PHASES.map((p, i) => (
              <div
                key={p.code}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(0)}
                style={{
                  display: 'flex',
                  gap: 24,
                  alignItems: 'baseline',
                  padding: '24px 16px',
                  borderTop: `1px solid ${colors.line}`,
                  borderBottom: i === PHASES.length - 1 ? `1px solid ${colors.line}` : undefined,
                  cursor: 'default',
                  background:
                    hovered === i + 1 ? 'rgba(255,229,0,0.03)' : 'transparent',
                  transition: 'background 0.15s'
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    color: colors.yellow,
                    flex: '0 0 88px'
                  }}
                >
                  {p.code}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h3
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 800,
                      fontSize: 22,
                      margin: 0,
                      textTransform: 'uppercase'
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: colors.muted }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
