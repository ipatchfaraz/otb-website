'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { colors, fonts } from '@/lib/tokens';
import type { ProjectListing, ProjectTag } from '@/lib/projects';
import CornerBrackets from './CornerBrackets';

const FILTERS: Array<'ALL' | ProjectTag> = ['ALL', 'STRATEGY', 'IDENTITY', 'PACKAGING'];

export default function WorkGrid({ projects }: { projects: ProjectListing[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL');
  const shown = useMemo(
    () => (filter === 'ALL' ? projects : projects.filter((p) => (p.tags as string[]).includes(filter))),
    [filter, projects]
  );

  return (
    <>
      <section
        data-screen-label="Archive hero"
        style={{
          padding: '96px 72px 56px 72px',
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          backgroundImage: 'radial-gradient(#242414 1.5px, transparent 1.5px)',
          backgroundSize: '34px 34px'
        }}
      >
        <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.15em', color: colors.yellow }}>
          [ CASE FILE INDEX ]
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            lineHeight: 1,
            margin: 0,
            textTransform: 'uppercase'
          }}
        >
          THE UNBOXED ARCHIVE.
        </h1>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.muted }}>
          RECORDS: {String(shown.length).padStart(2, '0')} // STATUS: DECLASSIFIED // SORT: RECENT FIRST
        </div>
      </section>

      <div
        data-screen-label="Filters"
        style={{
          borderTop: `1px solid ${colors.line}`,
          borderBottom: `1px solid ${colors.line}`,
          padding: '0 72px',
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 8,
          minHeight: 60
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.2em', color: colors.muted, marginRight: 12 }}>
          FILTER:
        </span>
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="hover-border"
              style={{
                background: active ? colors.yellow : 'transparent',
                color: active ? colors.bg : colors.muted,
                border: `1px solid ${active ? colors.yellow : colors.line}`,
                fontFamily: fonts.mono,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.15em',
                padding: '9px 18px',
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <section
        data-screen-label="Case grid"
        style={{ padding: '56px 72px 88px 72px', maxWidth: 1440, margin: '0 auto' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 24
          }}
        >
          {shown.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="hover-border"
              style={{
                border: `1px solid ${colors.line}`,
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: colors.fg,
                position: 'relative',
                background: colors.bg
              }}
            >
              <div
                style={{
                  position: 'relative',
                  margin: 14,
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  border: `1px solid ${colors.line}`
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('${p.img}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(20,20,20,0.35), transparent 40%)'
                  }}
                />
                <CornerBrackets />
                <span
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 20,
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    color: colors.fg,
                    opacity: 0.85
                  }}
                >
                  FILE_{String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 20px 20px 20px' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
                  {p.discipline}
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 22, textTransform: 'uppercase' }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: colors.muted }}>{p.line}</div>
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: colors.yellow,
                    marginTop: 6
                  }}
                >
                  UNBOX THE CASE →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
