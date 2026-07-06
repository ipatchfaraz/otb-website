'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { anims, colors, fonts } from '@/lib/tokens';
import Cube from './Cube';

const FULL_TAG = '[ BRANDING & DESIGN AGENCY — KUALA LUMPUR ]';

export default function HeroSection({ started }: { started: boolean }) {
  const [tag, setTag] = useState('');
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setTag(FULL_TAG.slice(0, i));
      if (i >= FULL_TAG.length) clearInterval(iv);
    }, 38);
    return () => clearInterval(iv);
  }, [started]);

  return (
    <section
      data-screen-label="Hero"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(#242414 1.5px, transparent 1.5px)',
        backgroundSize: '34px 34px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 48,
          padding: '80px 72px 48px 72px',
          maxWidth: 1440,
          margin: '0 auto',
          width: '100%'
        }}
      >
        <div style={{ flex: '1 1 520px', minWidth: 320, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.15em', color: colors.yellow, minHeight: 16 }}>
            {tag}
            <span style={{ animation: anims.blink }}>█</span>
          </div>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 'clamp(52px, 7.5vw, 110px)',
              lineHeight: 0.98,
              letterSpacing: '-0.01em',
              margin: 0,
              textTransform: 'uppercase',
              textWrap: 'balance' as React.CSSProperties['textWrap']
            }}
          >
            IDEAS THIS GOOD DON&rsquo;T STAY IN THE{' '}
            <span style={{ color: colors.yellow, animation: anims.flicker }}>BOX</span>.
          </h1>
          <p style={{ margin: 0, maxWidth: '58ch', fontSize: 17, lineHeight: 1.65, color: colors.muted }}>
            Outta The Box is a branding agency that&rsquo;s spent 10+ years unboxing brands — using unconventional thinking and our own Organic Intelligence (OI) approach to build purpose-driven, humanised brands.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link href="/#book" className="cta-y" style={{ fontSize: 12, padding: '16px 28px' }}>
              BOOK A FREE DISCOVERY CALL<span style={{ animation: anims.blink }}>█</span>
            </Link>
            <Link href="/work" className="cta-outline" style={{ fontSize: 12, padding: '16px 28px' }}>
              SEE THE WORK
            </Link>
          </div>
        </div>
        <div style={{ flex: '0 1 420px', minWidth: 280, display: 'flex', justifyContent: 'center', padding: '40px 0' }} aria-hidden>
          <Cube size={260} />
        </div>
      </div>
      <div style={{ overflow: 'hidden', borderTop: `1px solid ${colors.line}`, padding: '14px 0', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-flex', animation: anims.ticker }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              aria-hidden={i === 1}
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: '0.2em',
                color: colors.muted,
                paddingRight: '2ch'
              }}
            >
              EST. KUALA LUMPUR /// 10+ YEARS /// 100+ CLIENTS /// SHIPPED WORLDWIDE /// EST. KUALA LUMPUR /// 10+ YEARS /// 100+ CLIENTS /// SHIPPED WORLDWIDE ///{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
