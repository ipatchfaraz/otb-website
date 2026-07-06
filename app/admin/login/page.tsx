'use client';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { colors, fonts } from '@/lib/tokens';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get('callbackUrl') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn('credentials', {
      email: email.trim().toLowerCase(),
      password,
      redirect: false
    });
    setLoading(false);
    if (res?.ok) router.push(callbackUrl);
    else setError('INVALID CREDENTIALS — ACCESS DENIED');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: '100%',
          maxWidth: 400,
          border: '1px solid #262626',
          background: '#141414',
          padding: '34px 32px 30px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'relative'
        }}
      >
        {[
          { top: -1, left: -1, borderTop: `2px solid ${colors.yellow}`, borderLeft: `2px solid ${colors.yellow}` },
          { top: -1, right: -1, borderTop: `2px solid ${colors.yellow}`, borderRight: `2px solid ${colors.yellow}` },
          { bottom: -1, left: -1, borderBottom: `2px solid ${colors.yellow}`, borderLeft: `2px solid ${colors.yellow}` },
          { bottom: -1, right: -1, borderBottom: `2px solid ${colors.yellow}`, borderRight: `2px solid ${colors.yellow}` }
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 13, height: 13, ...s }} />
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/assets/otb-logomark.svg" alt="" style={{ width: 32, height: 32 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, lineHeight: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 15, letterSpacing: '0.04em' }}>OTB</span>
              <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 15, letterSpacing: '0.04em', color: colors.yellow }}>
                CONTENT OS
              </span>
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.22em', color: '#6A6A6A' }}>
              RESTRICTED // ADMIN ONLY
            </span>
          </div>
        </div>

        <div style={{ height: 1, background: '#232323' }} />

        <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.18em', color: colors.muted }}>
          // SIGN IN TO CONTINUE
        </div>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.14em', color: '#6A6A6A' }}>EMAIL</span>
          <input
            type="email"
            required
            autoComplete="username"
            placeholder="admin@…"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              background: '#0C0C0C',
              border: `1px solid ${colors.line}`,
              color: colors.fg,
              fontFamily: fonts.mono,
              fontSize: 12,
              padding: '12px 13px'
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.14em', color: '#6A6A6A' }}>PASSWORD</span>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type={reveal ? 'text' : 'password'}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                background: '#0C0C0C',
                border: `1px solid ${colors.line}`,
                color: colors.fg,
                fontFamily: fonts.mono,
                fontSize: 12,
                padding: '12px 62px 12px 13px'
              }}
            />
            <button
              type="button"
              onClick={() => setReveal((r) => !r)}
              className="hover-yellow"
              style={{
                position: 'absolute',
                right: 6,
                background: 'transparent',
                border: 'none',
                color: colors.muted,
                fontFamily: fonts.mono,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.12em',
                padding: 8,
                cursor: 'pointer'
              }}
            >
              {reveal ? 'HIDE' : 'SHOW'}
            </button>
          </div>
        </label>

        {error && (
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: '0.08em',
              color: '#E5484D',
              border: '1px solid #3A2020',
              background: 'rgba(229,72,77,0.06)',
              padding: '10px 12px'
            }}
          >
            ✕ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            cursor: loading ? 'default' : 'pointer',
            background: loading ? '#c9b400' : colors.yellow,
            border: `1px solid ${colors.yellow}`,
            color: colors.bg,
            fontFamily: fonts.mono,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.16em',
            padding: 14
          }}
        >
          {loading ? 'AUTHENTICATING…' : '▸ ENTER PANEL'}
        </button>

        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 8,
            letterSpacing: '0.1em',
            color: '#4A4A4A',
            lineHeight: 1.6,
            textAlign: 'center'
          }}
        >
          OUTTA THE BOX — CONTENT OPERATING SYSTEM
        </div>
      </form>
    </div>
  );
}
