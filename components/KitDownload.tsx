'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { anims, colors, fonts } from '@/lib/tokens';

const LOGS = [
  'HANDSHAKE // OTB-NODE-04 .......... OK',
  'AUTH TOKEN // FREE_INTEL .......... GRANTED',
  'DECRYPT PAYLOAD // 128-BIT ........ DONE',
  'FETCH BRAND_STARTER_KIT.pdf ....... COMPLETE',
  'PACKAGE READY_TO_DEPLOY ........... SEALED'
];

const MANIFEST = [
  { code: '01', name: 'Positioning Worksheet',   desc: 'Pin down who the brand is for and the belief it won’t compromise on.' },
  { code: '02', name: 'Voice & Tone Checklist',  desc: 'Define how the brand sounds — the words it uses and the ones it never does.' },
  { code: '03', name: '12 Brand Prompts',        desc: 'Twelve sharp questions that pull the brand’s story into the open.' },
  { code: '04', name: 'Type Pairing Cheatsheet', desc: 'Scale ratios and five battle-tested type pairings to steal.' }
];

// The real download is a PDF at /public/downloads/OTB-Brand-Starter-Kit.pdf
// served directly by Next — see the download() handler below.

export default function KitDownload() {
  const [pct, setPct] = useState(0);
  const [lines, setLines] = useState<string[]>([LOGS[0]]);
  const shownLineIdx = useRef(1);

  useEffect(() => {
    const iv = setInterval(() => {
      setPct((prev) => {
        if (prev >= 100) {
          clearInterval(iv);
          setLines(LOGS.slice());
          return 100;
        }
        const next = Math.min(100, prev + Math.round(4 + Math.random() * 9));
        const shouldShow = Math.max(1, Math.floor((next / 100) * LOGS.length));
        setLines((cur) => {
          const out = cur.slice();
          while (shownLineIdx.current < shouldShow && shownLineIdx.current < LOGS.length) {
            out.push(LOGS[shownLineIdx.current]);
            shownLineIdx.current += 1;
          }
          return out;
        });
        return next;
      });
    }, 300);
    return () => clearInterval(iv);
  }, []);

  const ready = pct >= 100;
  const pctLabel = useMemo(() => `${String(pct).padStart(3, '0')}%`, [pct]);

  const download = () => {
    if (!ready) return;
    // Ships the real PDF from public/downloads/. Direct <a> click keeps the
    // download attribute honored across browsers.
    const a = document.createElement('a');
    a.href = '/downloads/OTB-Brand-Starter-Kit.pdf?v=2';
    a.download = 'OTB-Brand-Starter-Kit.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <main
      style={{
        maxWidth: 1080,
        margin: '0 auto',
        padding: '72px 48px 96px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: 30
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.18em', color: colors.yellow }}>
          [ SECURE TRANSFER ]
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 84px)',
            lineHeight: 0.98,
            margin: 0,
            textTransform: 'uppercase'
          }}
        >
          DOWNLOAD
          <br />
          THE KIT.
        </h1>
        <p style={{ margin: 0, maxWidth: '56ch', fontSize: 16, lineHeight: 1.6, color: colors.muted }}>
          Your copy of the Brand Starter Kit is being packaged. Transfer completes automatically — then the payload is yours to deploy.
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          padding: 1,
          background: 'linear-gradient(135deg, #5A5A3C 0%, #2A2A2A 40%, #2A2A2A 60%, #5A5A3C 100%)',
          clipPath: 'polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)'
        }}
      >
        <div
          style={{
            position: 'relative',
            background: '#161616',
            overflow: 'hidden',
            clipPath: 'polygon(27px 0, 100% 0, 100% calc(100% - 27px), calc(100% - 27px) 100%, 0 100%, 0 27px)',
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
          <div
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
              <span style={{ color: ready ? colors.green : colors.red, animation: anims.blink }}>●</span>
              {ready ? 'DONE' : 'REC'}
              <span style={{ color: '#3A3A3A' }}>//</span>
              <span style={{ color: colors.mutedSoft }}>OTB://FREE_INTEL/BRAND_STARTER_KIT.pdf</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span>UNIT: OTB-KIT-04</span>
              <span style={{ color: '#3A3A3A' }}>|</span>
              <span>CHK: 0xF3A9</span>
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
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 40,
              padding: '36px 40px'
            }}
          >
            <div style={{ flex: '1 1 420px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                style={{
                  border: `1px solid ${colors.line}`,
                  background: '#101010',
                  padding: '16px 18px',
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  color: '#9A9A9A'
                }}
              >
                {lines.map((l, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: colors.yellow }}>›</span>
                    <span>{l}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 8, color: '#6A6A6A' }}>
                  <span style={{ color: colors.yellow, animation: anims.blink }}>▮</span>
                  <span>{ready ? 'AWAITING OPERATOR INPUT' : 'RECEIVING PACKETS...'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
                  <span>{ready ? 'TRANSFER COMPLETE' : 'TRANSFER IN PROGRESS'}</span>
                  <span style={{ color: colors.yellow }}>{pctLabel}</span>
                </div>
                <div style={{ height: 10, background: '#0E0E0E', border: `1px solid ${colors.line}`, position: 'relative', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      background:
                        'repeating-linear-gradient(-45deg, #FFE500 0px, #FFE500 7px, #C9B500 7px, #C9B500 14px)',
                      transition: 'width 0.25s linear'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginTop: 4 }}>
                <button
                  onClick={download}
                  disabled={!ready}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: ready ? colors.yellow : '#1B1B1B',
                    color: ready ? colors.bg : '#6A6A6A',
                    fontFamily: fonts.mono,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    padding: '17px 32px',
                    border: `1px solid ${ready ? colors.yellow : colors.line}`,
                    cursor: ready ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s'
                  }}
                >
                  {ready ? 'DOWNLOAD KIT' : 'PREPARING'}
                  <span style={{ animation: anims.blink }}>{ready ? '↓' : '█'}</span>
                </button>
                <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.12em', color: colors.muted }}>
                  {ready ? 'PDF · 24 PP · 9.0 MB' : 'STANDBY...'}
                </span>
              </div>
            </div>

            <div style={{ flex: '0 1 260px', minWidth: 230, display: 'flex' }}>
              <div
                role="img"
                aria-label="Brand starter kit PDF file"
                style={{
                  position: 'relative',
                  flex: 1,
                  minHeight: 320,
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
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 58,
                      letterSpacing: '0.04em',
                      color: colors.yellow,
                      textShadow: '0 0 22px rgba(255,229,0,0.35)',
                      lineHeight: 1
                    }}
                  >
                    PDF
                  </div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.22em', color: '#6A6A6A' }}>
                    FIELD GUIDE // 24 PP
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
                    <span>SIZE</span><span style={{ color: colors.mutedSoft }}>9.0 MB</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: ready ? colors.yellow : colors.muted }}>
                      {ready ? 'READY_TO_DEPLOY' : 'BUFFERING'}
                    </span>
                    <span style={{ color: ready ? colors.yellow : colors.muted }}>{pctLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 6 }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
          [ PAYLOAD MANIFEST ]
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
          {MANIFEST.map((mi) => (
            <div
              key={mi.code}
              style={{
                border: `1px solid ${colors.line}`,
                background: '#181818',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.16em', color: colors.yellow }}>
                {mi.code}
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 15, textTransform: 'uppercase' }}>
                {mi.name}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: colors.muted }}>{mi.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
