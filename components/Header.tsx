'use client';
import Link from 'next/link';
import { useState } from 'react';
import { anims, colors, fonts } from '@/lib/tokens';

type Href = { href: string; label: string };

const NAV: Href[] = [
  { href: '/work', label: 'WORK' },
  { href: '/#services', label: 'SERVICES' },
  { href: '/#process', label: 'PROCESS' },
  { href: '/#about', label: 'ABOUT' },
  { href: '/journal', label: 'JOURNAL' }
];

export default function Header({ homeHref = '/' }: { homeHref?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header
        data-screen-label="Header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: colors.bg,
          borderBottom: `1px solid ${colors.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          padding: '0 48px',
          height: 68
        }}
      >
        <Link
          href={homeHref}
          aria-label="Outta The Box home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 11,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flex: 'none',
            color: colors.fg
          }}
        >
          <img
            src="/assets/otb-logomark.svg"
            alt=""
            style={{ display: 'block', width: 28, height: 28 }}
          />
          <span
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '0.02em',
              color: colors.fg
            }}
          >
            OUTTA THE BOX™
          </span>
        </Link>
        <nav
          className="nav-main"
          aria-label="Main"
          style={{
            display: 'flex',
            gap: 32,
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: '0.15em'
          }}
        >
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#book"
          className="nav-cta cta-y"
          style={{
            padding: '12px 20px',
            fontSize: 11,
            gap: 2,
            whiteSpace: 'nowrap'
          }}
        >
          BOOK A FREE CALL<span style={{ animation: anims.blink }}>█</span>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setOpen((s) => !s)}
        >
          <span style={{ fontSize: 16, lineHeight: 1, fontFamily: fonts.mono }}>
            {open ? '✕' : '☰'}
          </span>
        </button>
      </header>

      {open && (
        <div
          style={{
            display: 'flex',
            position: 'fixed',
            top: 57,
            left: 0,
            right: 0,
            zIndex: 49,
            background: colors.bg,
            borderBottom: `1px solid ${colors.line}`,
            flexDirection: 'column',
            padding: '6px 20px 18px 20px'
          }}
        >
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="hover-yellow"
              style={{
                padding: '15px 4px',
                color: '#C9C9C9',
                textDecoration: 'none',
                fontFamily: fonts.mono,
                fontSize: 12,
                letterSpacing: '0.15em',
                borderBottom: i === NAV.length - 1 ? 'none' : `1px solid ${colors.line}`
              }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/#book"
            onClick={() => setOpen(false)}
            className="cta-y"
            style={{
              marginTop: 14,
              justifyContent: 'center',
              padding: '14px 20px',
              fontSize: 12
            }}
          >
            BOOK A FREE DISCOVERY CALL
          </Link>
        </div>
      )}
    </>
  );
}
