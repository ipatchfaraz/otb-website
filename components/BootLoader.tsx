'use client';
import { useEffect, useState } from 'react';
import { colors, fonts } from '@/lib/tokens';

export default function BootLoader({ onDone }: { onDone?: () => void }) {
  const [charge, setCharge] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setPhase('done');
      onDone?.();
      return;
    }
    const iv = setInterval(() => {
      setCharge((c) => {
        if (c >= 10) {
          clearInterval(iv);
          setTimeout(() => setPhase('fading'), 250);
          setTimeout(() => {
            setPhase('done');
            onDone?.();
          }, 250 + 480);
          return 10;
        }
        return c + 1;
      });
    }, 150);
    return () => clearInterval(iv);
  }, [onDone]);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: colors.bg,
        display: 'flex',
        opacity: phase === 'loading' ? 1 : 0,
        transition: 'opacity 0.45s linear',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, filter: 'drop-shadow(0 0 26px rgba(255,229,0,0.4))' }}>
        <div
          data-battery
          style={{
            border: `3px solid ${colors.yellow}`,
            borderRadius: 4,
            padding: 10,
            display: 'flex',
            gap: 7
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const active = i < charge;
            return (
              <div
                key={i}
                data-batt-seg
                style={{
                  width: 34,
                  height: 92,
                  background: active ? colors.yellow : 'rgba(255,229,0,0.08)',
                  boxShadow: active ? '0 0 10px rgba(255,229,0,0.45)' : 'none'
                }}
              />
            );
          })}
        </div>
        <div data-batt-nub style={{ width: 12, height: 44, background: colors.yellow, borderRadius: '0 3px 3px 0' }} />
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.3em',
          color: colors.yellow,
          textAlign: 'center'
        }}
      >
        PWR {String(charge * 10).padStart(3, '0')}%
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: '0.18em',
          color: colors.muted,
          textAlign: 'center'
        }}
      >
        SYS: BRAND ENGINE V.15 // BOOT SEQUENCE INITIALISED // KUALA LUMPUR
      </div>
    </div>
  );
}
