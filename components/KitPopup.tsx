'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { anims, colors, fonts } from '@/lib/tokens';

const KIT_ITEMS = [
  'POSITIONING WORKSHEET',
  'VOICE & TONE CHECKLIST',
  '12 BRAND PROMPTS',
  'TYPE PAIRING CHEATSHEET'
];

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Auto-appearing lead-magnet modal for the Brand Starter Kit.
 * `booted` should flip to true when the boot-loader animation completes;
 * the modal then fades in ~650 ms later.
 */
export default function KitPopup({ booted }: { booted: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => setOpen(true), 650);
    return () => clearTimeout(t);
  }, [booted]);

  // Lock page scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('sent');
      // Auto-redirect to the download page after a beat so the user sees
      // the confirmation message.
      setTimeout(() => router.push(`/kit?email=${encodeURIComponent(email)}`), 1400);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'FAILED');
    }
  };

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={close}
      className="otb-kit-overlay"
      style={{ animation: 'otbKitPopupFade 0.35s ease-out' }}
    >
      <div
        role="dialog"
        aria-label="The Brand Starter Kit"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="otb-kit-modal"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 620,
          background: colors.yellow,
          boxShadow: '0 0 80px rgba(255,229,0,0.15)',
          animation: 'otbKitPopupRise 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          marginBottom: 20
        }}
      >
        {/* Status bar dark, sits above the yellow body */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'space-between',
            alignItems: 'stretch',
            background: colors.bg
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              minWidth: 0,
              padding: '14px 12px 14px 20px',
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: '0.16em',
              color: colors.muted
            }}
          >
            <span style={{ color: colors.yellow, fontWeight: 700 }}>REC</span>
            <span style={{ color: '#3A3A3A' }}>//</span>
            <span
              style={{
                color: colors.mutedSoft,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              FREE_INTEL/BRAND_STARTER_KIT.pdf
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            style={{
              flex: '0 0 auto',
              width: 52,
              background: colors.bg,
              border: 'none',
              color: colors.fg,
              fontFamily: fonts.mono,
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1,
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Yellow / black hazard stripe */}
        <div
          aria-hidden
          style={{
            height: 14,
            background:
              'repeating-linear-gradient(-45deg, #FFE500 0px, #FFE500 12px, #141414 12px, #141414 24px)'
          }}
        />

        {/* Body yellow */}
        <div className="otb-kit-popup-body" style={{ padding: '36px 32px 32px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.2em', color: colors.bg }}>
            [ FREE INTEL ]
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 'clamp(34px, 6vw, 52px)',
              lineHeight: 0.98,
              margin: 0,
              textTransform: 'uppercase',
              color: colors.bg
            }}
          >
            THE BRAND STARTER KIT.
          </h2>
          <p style={{ margin: 0, maxWidth: '46ch', fontSize: 16, lineHeight: 1.55, color: '#1a1a1a' }}>
            A free field guide to unboxing your brand the same worksheets we run in our Discovery Workshops, compressed into one download.
          </p>

          <div className="otb-kit-items">
            {KIT_ITEMS.map((c) => (
              <div
                key={c}
                style={{
                  border: `1px solid ${colors.bg}`,
                  padding: '12px 16px',
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: colors.bg,
                  fontWeight: 700
                }}
              >
                {c}
              </div>
            ))}
          </div>

          {status === 'sent' ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                border: `1px solid ${colors.bg}`,
                background: 'rgba(0,0,0,0.08)',
                padding: '18px 20px',
                marginTop: 2
              }}
            >
              <span style={{ color: colors.bg, fontFamily: fonts.mono, fontSize: 18, fontWeight: 700 }}>✓</span>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  color: colors.bg,
                  lineHeight: 1.5,
                  fontWeight: 700
                }}
              >
                TRANSFER INITIATED. REDIRECTING TO DOWNLOAD…
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 2 }}>
              <form onSubmit={onSubmit} className="otb-kit-form">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR@EMAIL.COM"
                  disabled={status === 'sending'}
                  autoFocus
                  className="otb-kit-input"
                  style={{
                    background: colors.bg,
                    border: 'none',
                    color: colors.fg,
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    letterSpacing: '0.06em',
                    padding: '18px 20px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="otb-kit-submit"
                  style={{
                    background: colors.bg,
                    border: 'none',
                    color: colors.yellow,
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    padding: '18px 36px',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    opacity: status === 'sending' ? 0.6 : 1
                  }}
                >
                  {status === 'sending' ? 'SENDING' : 'GET THE KIT'}
                  <span style={{ animation: anims.blink, marginLeft: 4 }}>█</span>
                </button>
              </form>
              {error && (
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
                  ✕ {error}
                </div>
              )}
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  color: 'rgba(20,20,20,0.65)'
                }}
              >
                NO SPAM. ONE DOWNLOAD LINK, ZERO FOLLOW-UP LOOPS.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
