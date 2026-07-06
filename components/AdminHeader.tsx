'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { colors, fonts } from '@/lib/tokens';

export default function AdminHeader({ subtitle }: { subtitle?: string }) {
  const { data } = useSession();
  const email = data?.user?.email ?? '';
  return (
    <header
      style={{
        borderBottom: `1px solid #242424`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        padding: '0 30px',
        height: 66
      }}
    >
      <Link
        href="/admin"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 13,
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <img src="/assets/otb-logomark.svg" alt="" style={{ width: 34, height: 34 }} />
        <div style={{ width: 1, height: 30, background: '#2A2A2A' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, lineHeight: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 16, letterSpacing: '0.04em' }}>OTB</span>
            <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 16, letterSpacing: '0.04em', color: colors.yellow }}>
              CONTENT OS
            </span>
          </div>
          <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.24em', color: '#6A6A6A' }}>
            {subtitle ?? 'CENTRAL CONTROL // v1.0'}
          </span>
        </div>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: '0.14em'
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#57C7A0' }} />
          <span style={{ color: colors.muted }}>{email}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="hover-yellow"
          style={{
            cursor: 'pointer',
            background: 'transparent',
            border: `1px solid ${colors.line}`,
            color: '#9A9A9A',
            fontFamily: fonts.mono,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.14em',
            padding: '9px 14px'
          }}
        >
          LOG OUT ⏻
        </button>
      </div>
    </header>
  );
}
