'use client';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { colors, fonts } from '@/lib/tokens';

/** Interactive dashboard card. Click anywhere navigates to `href`, the
 *  small "VIEW LIVE" link opens `viewHref` in a new tab without triggering
 *  the parent navigation. */
export default function DashboardCard({
  tag,
  title,
  desc,
  count,
  href,
  viewHref,
  icon
}: {
  tag: string;
  title: string;
  desc: string;
  count: string;
  href: string;
  viewHref: string;
  icon: ReactNode;
}) {
  const router = useRouter();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && router.push(href)}
      className="hover-border"
      style={{
        border: '1px solid #262626',
        background: '#141414',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minHeight: 300,
        overflow: 'hidden',
        cursor: 'pointer',
        color: 'inherit'
      }}
    >
      {[
        { top: 10, left: 10, borderTop: `2px solid ${colors.yellow}`, borderLeft: `2px solid ${colors.yellow}` },
        { top: 10, right: 10, borderTop: `2px solid ${colors.yellow}`, borderRight: `2px solid ${colors.yellow}` },
        { bottom: 10, left: 10, borderBottom: `2px solid ${colors.yellow}`, borderLeft: `2px solid ${colors.yellow}` },
        { bottom: 10, right: 10, borderBottom: `2px solid ${colors.yellow}`, borderRight: `2px solid ${colors.yellow}` }
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 13, height: 13, ...s }} />
      ))}

      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 24px 0 24px' }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.18em', color: '#6A6A6A' }}>{tag}</span>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.14em', color: colors.yellow }}>{count}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div
          style={{
            width: 74,
            height: 74,
            border: `1px solid ${colors.line}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </div>
      </div>

      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 9, padding: '0 24px 24px 24px' }}>
        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 26,
            lineHeight: 1.02,
            margin: 0,
            textTransform: 'uppercase'
          }}
        >
          {title}
        </h2>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: colors.muted }}>{desc}</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 8,
            borderTop: '1px solid #232323',
            marginTop: 4
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: colors.yellow
            }}
          >
            OPEN PANEL →
          </span>
          <a
            href={viewHref}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: fonts.mono,
              fontSize: 9,
              letterSpacing: '0.14em',
              color: '#6A6A6A',
              textDecoration: 'none'
            }}
          >
            VIEW LIVE ↗
          </a>
        </div>
      </div>
    </div>
  );
}
