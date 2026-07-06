'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { anims, colors, fonts } from '@/lib/tokens';

// Local-storage key that remembers the user has either submitted or
// dismissed the popup. Cleared automatically after 30 days so we can
// re-engage lapsed visitors.
const STORAGE_KEY = 'otb-kit-popup-dismissed';
const COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

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
    // Skip if dismissed within cooldown
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const dismissedAt = Number(raw);
        if (Number.isFinite(dismissedAt) && Date.now() - dismissedAt < COOLDOWN_MS) return;
      }
    } catch {
      /* localStorage disabled — proceed anyway */
    }
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
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
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
      // Stamp dismissal so we don't reopen on next visit
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
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
      style={{
        display: 'flex',
        position: 'fixed',
        inset: 0,
        zIndex: 130,
        background: 'rgba(6,6,6,0.88)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
        animation: 'otbKitPopupFade 0.35s ease-out'
      }}
    >
      <div
        role="dialog"
        aria-label="The Brand Starter Kit"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 620,
          maxHeight: '92vh',
          overflowY: 'auto',
          background: colors.bg,
          border: `1px solid ${colors.line}`,
          boxShadow: '0 0 80px rgba(255,229,0,0.06)',
          animation: 'otbKitPopupRise 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'space-between',
            alignItems: 'stretch',
            borderBottom: `1px solid ${colors.line}`,
            background: colors.bgAlt
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              minWidth: 0,
              padding: '14px 8px 14px 20px',
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: '0.16em',
              color: colors.muted
            }}
          >
            <span style={{ color: colors.yellow }}>REC</span>
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
              background: colors.yellow,
              border: 'none',
              color: colors.bg,
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

        <div
          aria-hidden
          style={{
            height: 6,
            background:
              'repeating-linear-gradient(-45deg, #FFE500 0px, #FFE500 9px, #141414 9px, #141414 18px)',
            opacity: 0.85
          }}
        />

        {/* Body */}
        <div style={{ padding: '36px 32px 32px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.2em', color: colors.yellow }}>
            [ FREE INTEL ]
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 'clamp(34px, 6vw, 52px)',
              lineHeight: 0.98,
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            THE BRAND STARTER KIT.
          </h2>
          <p style={{ margin: 0, maxWidth: '46ch', fontSize: 16, lineHeight: 1.55, color: colors.muted }}>
            A free field guide to unboxing your brand — the same worksheets we run in our Discovery Workshops, compressed into one download.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {KIT_ITEMS.map((c) => (
              <div
                key={c}
                style={{
                  border: `1px solid ${colors.line}`,
                  padding: '10px 15px',
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  color: colors.mutedSoft
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
                border: '1px solid #3A3A2E',
                background: '#161608',
                padding: '18px 20px',
                marginTop: 2
              }}
            >
              <span style={{ color: colors.yellow, fontFamily: fonts.mono, fontSize: 18 }}>✓</span>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  color: colors.mutedSoft,
                  lineHeight: 1.5
                }}
              >
                TRANSFER INITIATED. REDIRECTING TO DOWNLOAD…
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 2 }}>
              <form
                onSubmit={onSubmit}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'stretch' }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR@EMAIL.COM"
                  disabled={status === 'sending'}
                  autoFocus
                  style={{
                    flex: '1 1 240px',
                    minWidth: 180,
                    background: colors.bgAlt,
                    border: `1px solid ${colors.line}`,
                    color: colors.fg,
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    letterSpacing: '0.06em',
                    padding: '16px 18px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="cta-y"
                  style={{
                    flex: '0 0 auto',
                    padding: '16px 36px',
                    fontSize: 14,
                    opacity: status === 'sending' ? 0.6 : 1
                  }}
                >
                  {status === 'sending' ? 'SENDING' : 'GET THE KIT'}
                  <span style={{ animation: anims.blink }}>█</span>
                </button>
              </form>
              {error && (
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
                  ✕ {error}
                </div>
              )}
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  color: '#6A6A6A'
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
