'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { anims, colors, fonts } from '@/lib/tokens';

type SubmitState = 'idle' | 'sending' | 'error';

const KIT_ITEMS = [
  'POSITIONING WORKSHEET',
  'VOICE & TONE CHECKLIST',
  '12 BRAND PROMPTS',
  'TYPE PAIRING CHEATSHEET'
];

export default function KitTeaser() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrMsg(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong');
      router.push(`/kit?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setStatus('error');
      setErrMsg(err instanceof Error ? err.message : 'FAILED');
    }
  };

  return (
    <section
      id="guide"
      data-screen-label="Brand starter guide"
      style={{
        borderTop: `1px solid ${colors.line}`,
        padding: '72px',
        maxWidth: 1440,
        margin: '0 auto'
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: 1,
          background: 'linear-gradient(135deg, #5A5A3C 0%, #2A2A2A 40%, #2A2A2A 60%, #5A5A3C 100%)',
          clipPath: 'polygon(26px 0, 100% 0, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0 100%, 0 26px)'
        }}
      >
        <div
          style={{
            position: 'relative',
            background: '#161616',
            overflow: 'hidden',
            clipPath: 'polygon(25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 25px)',
            boxShadow: '0 0 60px rgba(255,229,0,0.05)'
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
              background:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 3px)',
              opacity: 0.6
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 46,
              zIndex: 1,
              pointerEvents: 'none',
              background:
                'linear-gradient(to bottom, transparent, rgba(255,229,0,0.07), transparent)',
              animation: anims.guideSweep
            }}
          />
          {/* Corner brackets */}
          <div style={{ position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderTop: `2px solid ${colors.yellow}`, borderRight: `2px solid ${colors.yellow}`, zIndex: 3, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 10, left: 10, width: 18, height: 18, borderBottom: `2px solid ${colors.yellow}`, borderLeft: `2px solid ${colors.yellow}`, zIndex: 3, pointerEvents: 'none' }} />

          {/* Status bar */}
          <div
            data-kit-term
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '13px 24px 13px 40px',
              borderBottom: `1px solid ${colors.line}`,
              background: '#121212',
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: '0.16em',
              color: colors.muted
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: colors.red, animation: anims.blink }}>●</span> REC
              <span style={{ color: '#3A3A3A' }}>//</span>
              <span data-kit-path style={{ color: colors.mutedSoft }}>OTB://FREE_INTEL/BRAND_STARTER_KIT.pdf</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span>UNIT: OTB-KIT-04</span>
              <span style={{ color: '#3A3A3A' }}>|</span>
              <span>CHK: 0xF3A9</span>
              <span style={{ color: colors.yellow }}>[ TRANSFER 100% ]</span>
            </div>
          </div>
          <div
            aria-hidden
            style={{
              position: 'relative',
              zIndex: 2,
              height: 6,
              background:
                'repeating-linear-gradient(-45deg, #FFE500 0px, #FFE500 9px, #141414 9px, #141414 18px)',
              opacity: 0.85
            }}
          />

          <div
            data-kit-body
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 44,
              alignItems: 'stretch',
              padding: '44px 44px 40px 44px'
            }}
          >
            <div style={{ flex: '1 1 440px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
                [ FREE INTEL ]
              </div>
              <h2
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 'clamp(30px, 3.6vw, 52px)',
                  lineHeight: 1.02,
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                THE BRAND STARTER KIT.
              </h2>
              <p style={{ margin: 0, maxWidth: '52ch', fontSize: 16, lineHeight: 1.6, color: colors.muted }}>
                A free field guide to unboxing your brand — the same worksheets we run in our Discovery Workshops, compressed into one download.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {KIT_ITEMS.map((it) => (
                  <span
                    key={it}
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      color: colors.mutedSoft,
                      border: `1px solid ${colors.line}`,
                      background: '#1B1B1B',
                      padding: '7px 11px'
                    }}
                  >
                    {it}
                  </span>
                ))}
              </div>
              <form onSubmit={onSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 6 }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR@EMAIL.COM"
                  aria-label="Email address"
                  disabled={status === 'sending'}
                  style={{
                    flex: '1 1 240px',
                    background: colors.bg,
                    border: `1px solid ${colors.line}`,
                    color: colors.fg,
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    letterSpacing: '0.1em',
                    padding: '15px 18px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="cta-y"
                  disabled={status === 'sending'}
                  style={{ padding: '15px 26px', fontSize: 12, opacity: status === 'sending' ? 0.6 : 1 }}
                >
                  {status === 'sending' ? 'SENDING' : 'GET THE KIT'}
                  <span style={{ animation: anims.blink }}>█</span>
                </button>
              </form>
              {errMsg && (
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    color: colors.red,
                    border: `1px solid ${colors.red}`,
                    background: 'rgba(255,59,48,0.08)',
                    padding: '9px 12px'
                  }}
                >
                  ✕ {errMsg}
                </div>
              )}
              <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
                NO SPAM. ONE DOWNLOAD LINK, ZERO FOLLOW-UP LOOPS.
              </div>
            </div>
            <div style={{ flex: '0 1 280px', minWidth: 240, display: 'flex' }}>
              <div
                role="img"
                aria-label="Brand starter kit PDF file"
                style={{
                  position: 'relative',
                  flex: 1,
                  minHeight: 300,
                  border: `1px solid ${colors.line}`,
                  background:
                    'repeating-linear-gradient(45deg, #191919 0px, #191919 11px, #151515 11px, #151515 22px)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background:
                      'repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 1px, transparent 1px, transparent 3px)'
                  }}
                />
                <div style={{ position: 'relative', padding: '13px 15px', fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.14em', color: colors.muted, borderBottom: `1px solid ${colors.line}` }}>
                  KIT_V1.0 // PDF
                </div>
                <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <div
                    style={{
                      position: 'relative',
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 56,
                      letterSpacing: '0.04em',
                      color: colors.yellow,
                      textShadow: '0 0 22px rgba(255,229,0,0.35)',
                      lineHeight: 1
                    }}
                  >
                    PDF
                  </div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.22em', color: '#6A6A6A' }}>
                    [ COVER : DROP-IN ]
                  </div>
                </div>
                <div
                  style={{
                    position: 'relative',
                    padding: '14px 15px',
                    borderTop: `1px solid ${colors.line}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 9,
                    fontFamily: fonts.mono,
                    fontSize: 9,
                    letterSpacing: '0.12em',
                    color: colors.muted
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>PAGES</span><span style={{ color: colors.mutedSoft }}>24</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>SIZE</span><span style={{ color: colors.mutedSoft }}>4.2 MB</span>
                  </div>
                  <div style={{ height: 4, background: colors.line, marginTop: 2 }}>
                    <div style={{ width: '100%', height: '100%', background: colors.yellow, animation: anims.barPulse }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: colors.yellow }}>READY_TO_DEPLOY</span>
                    <span style={{ color: colors.yellow }}>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
