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
        body: JSON.stringify({
          email,
          source: 'teaser',
          referrer: typeof document !== 'undefined' ? document.referrer : ''
        })
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
      className="otb-kit-section"
    >
      <div className="otb-kit-card">
        {/* Corner brackets (desktop only) */}
        <div aria-hidden className="otb-kit-corner otb-kit-corner-tl" />
        <div aria-hidden className="otb-kit-corner otb-kit-corner-br" />

        {/* Status bar */}
        <div className="otb-kit-status">
          <div className="otb-kit-status-left">
            <span style={{ color: colors.red, animation: anims.blink }}>●</span>
            <span style={{ color: colors.yellow, fontWeight: 700 }}>REC</span>
            <span style={{ color: '#3A3A3A' }}>//</span>
            <span className="otb-kit-path">
              <span className="otb-kit-path-full">OTB://FREE_INTEL/</span>BRAND_STARTER_KIT.pdf
            </span>
          </div>
          <div className="otb-kit-status-right">
            <span className="otb-kit-status-meta">UNIT: OTB-KIT-04</span>
            <span className="otb-kit-status-meta" style={{ color: '#3A3A3A' }}>|</span>
            <span className="otb-kit-status-meta">CHK: 0xF3A9</span>
            <span style={{ color: colors.yellow, fontWeight: 700 }}>
              <span className="otb-kit-status-full">[ TRANSFER </span>100%<span className="otb-kit-status-full"> ]</span>
            </span>
          </div>
        </div>

        {/* Hazard stripe */}
        <div
          aria-hidden
          style={{
            height: 12,
            background:
              'repeating-linear-gradient(-45deg, #FFE500 0px, #FFE500 12px, #141414 12px, #141414 24px)'
          }}
        />

        <div className="otb-kit-body">
          {/* Left column copy + form */}
          <div className="otb-kit-main">
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.2em', color: colors.bg, fontWeight: 700 }}>
              [ FREE INTEL ]
            </div>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 'clamp(32px, 4.4vw, 56px)',
                lineHeight: 0.98,
                margin: 0,
                textTransform: 'uppercase',
                color: colors.bg
              }}
            >
              THE BRAND STARTER KIT.
            </h2>
            <p style={{ margin: 0, maxWidth: '52ch', fontSize: 16, lineHeight: 1.6, color: '#1a1a1a' }}>
              A free field guide to unboxing your brand the same worksheets we run in our Discovery Workshops, compressed into one download.
            </p>

            {/* Desktop pill list */}
            <div className="otb-kit-pills">
              {KIT_ITEMS.map((it) => (
                <span key={it} className="otb-kit-pill">{it}</span>
              ))}
            </div>

            {/* Mobile checkbox list */}
            <div className="otb-kit-checklist">
              <div style={{ borderTop: `1px solid ${colors.bg}`, marginBottom: 14, opacity: 0.35 }} />
              <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.2em', color: '#3a3a3a', marginBottom: 8, fontWeight: 700 }}>
                WHAT&rsquo;S INSIDE
              </div>
              {KIT_ITEMS.map((it) => (
                <div key={it} className="otb-kit-check-row">
                  <span className="otb-kit-check">✓</span>
                  <span>{it}</span>
                </div>
              ))}
            </div>

            {/* Mobile PDF meta bar */}
            <div className="otb-kit-meta-bar">
              <span style={{ color: colors.yellow, fontWeight: 700 }}>PDF</span>
              <span style={{ color: colors.mutedSoft }}>24 PAGES</span>
              <span style={{ color: colors.mutedSoft }}>4.2 MB</span>
            </div>

            <form onSubmit={onSubmit} className="otb-kit-t-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR@EMAIL.COM"
                aria-label="Email address"
                disabled={status === 'sending'}
                className="otb-kit-t-input"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="otb-kit-t-submit"
                style={{ opacity: status === 'sending' ? 0.6 : 1 }}
              >
                {status === 'sending' ? 'SENDING' : 'GET THE KIT'}
                <span style={{ animation: anims.blink, marginLeft: 4 }}>█</span>
              </button>
            </form>
            {errMsg && (
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  color: '#7a0e0a',
                  border: '1px solid #7a0e0a',
                  background: 'rgba(122,14,10,0.08)',
                  padding: '9px 12px'
                }}
              >
                ✕ {errMsg}
              </div>
            )}
            <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: 'rgba(20,20,20,0.65)' }}>
              NO SPAM. ONE DOWNLOAD LINK, ZERO FOLLOW-UP LOOPS.
            </div>
          </div>

          {/* Right column dark PDF card (desktop only) */}
          <aside className="otb-kit-aside" aria-hidden>
            <div className="otb-kit-pdf">
              <div style={{ position: 'relative', padding: '13px 15px', fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.14em', color: colors.muted, borderBottom: `1px solid ${colors.line}` }}>
                KIT_V1.0 // PDF
              </div>
              <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, border: `1px solid ${colors.yellow}` }} />
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 900,
                    fontSize: 66,
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
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  color: colors.muted
                }}
              >
                <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 22, marginBottom: 4 }}>
                  {[10, 16, 8, 20, 14, 18, 6, 22, 12, 18, 10, 16].map((h, i) => (
                    <div key={i} style={{ width: 3, height: h, background: colors.muted }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>PAGES</span><span style={{ color: colors.mutedSoft }}>24</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>SIZE</span><span style={{ color: colors.mutedSoft }}>4.2 MB</span>
                </div>
                <div style={{ height: 2, background: colors.line, marginTop: 4 }}>
                  <div style={{ width: '100%', height: '100%', background: colors.yellow, animation: anims.barPulse }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: colors.yellow }}>READY_TO_DEPLOY</span>
                  <span style={{ color: colors.yellow }}>100%</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
