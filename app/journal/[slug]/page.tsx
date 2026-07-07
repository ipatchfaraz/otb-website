import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Cursor from '@/components/Cursor';
import { EdgeMeta, ScanBar, Scanlines } from '@/components/Overlays';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CornerBrackets from '@/components/CornerBrackets';
import { colors, fonts } from '@/lib/tokens';
import { getJournalEntry, getJournalList, getJournalSlugs } from '@/lib/content';

type Props = { params: { slug: string } };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getJournalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getJournalEntry(params.slug);
  if (!a) return { title: 'Entry not found The Journal // Outta The Box™' };
  return {
    title: `${a.title} The Journal // Outta The Box™`,
    description: a.dek
  };
}

export default async function JournalEntryPage({ params }: Props) {
  const a = await getJournalEntry(params.slug);
  if (!a) notFound();

  const all = await getJournalList();
  const more = all.filter((x) => x.slug !== a.slug);

  return (
    <>
      <Cursor />
      <Scanlines />
      <ScanBar />
      <EdgeMeta left={`LOG_${a.log} // ${a.category}`} />
      <Header />

      <main style={{ maxWidth: 820, margin: '0 auto', padding: '64px 48px 96px 48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Link
            href="/journal"
            className="hover-yellow"
            style={{
              alignSelf: 'flex-start',
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: '0.15em',
              color: colors.muted,
              textDecoration: 'none'
            }}
          >
            ← THE JOURNAL
          </Link>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.16em', color: colors.yellow }}>
            LOG_{a.log} // {a.category} // {a.readMin}
          </div>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 'clamp(34px, 5.4vw, 62px)',
              lineHeight: 1,
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            {a.title}
          </h1>
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: colors.mutedSoft }}>{a.dek}</p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              alignItems: 'center',
              padding: '14px 0',
              borderTop: `1px solid ${colors.line}`,
              borderBottom: `1px solid ${colors.line}`,
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: '0.12em',
              color: colors.muted
            }}
          >
            <span style={{ color: colors.fg }}>{a.author}</span>
            <span style={{ color: '#3A3A3A' }}>//</span>
            <span>{a.authorRole}</span>
            <span style={{ color: '#3A3A3A' }}>//</span>
            <span>{a.date}</span>
          </div>
        </div>

        {a.thumb && (
          <div style={{ position: 'relative', margin: '34px 0 44px 0', border: `1px solid ${colors.line}` }}>
            <CornerBrackets size={14} outside corners={['tl', 'br']} />
            <img src={a.thumb} alt={a.title} style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
        )}

        <article style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          {a.body.map((b, i) => {
            if (b.t === 'h')
              return (
                <h2
                  key={i}
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 800,
                    fontSize: 26,
                    lineHeight: 1.15,
                    margin: '18px 0 0 0',
                    textTransform: 'uppercase'
                  }}
                >
                  {b.v}
                </h2>
              );
            if (b.t === 'p')
              return (
                <p
                  key={i}
                  style={{
                    margin: 0,
                    fontSize: 17,
                    lineHeight: 1.72,
                    color: '#C4C4C4',
                    textWrap: 'pretty' as React.CSSProperties['textWrap']
                  }}
                >
                  {b.v}
                </p>
              );
            if (b.t === 'quote')
              return (
                <blockquote
                  key={i}
                  style={{
                    margin: '8px 0',
                    borderLeft: `3px solid ${colors.yellow}`,
                    padding: '6px 0 6px 24px',
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 24,
                    lineHeight: 1.3,
                    color: colors.fg
                  }}
                >
                  {b.v}
                </blockquote>
              );
            return (
              <ul key={i} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {b.v.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      gap: 12,
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: '#C4C4C4'
                    }}
                  >
                    <span style={{ color: colors.yellow, fontFamily: fonts.mono, flex: 'none' }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          })}
        </article>

        <div
          style={{
            marginTop: 56,
            border: `1px solid ${colors.line}`,
            background: '#181818',
            padding: '30px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: 4,
              background:
                'repeating-linear-gradient(-45deg, #FFE500 0px, #FFE500 8px, #141414 8px, #141414 16px)'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 10 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
              [ FREE INTEL ]
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 22,
                textTransform: 'uppercase'
              }}
            >
              PUT THIS INTO PRACTICE.
            </div>
            <div style={{ fontSize: 14, color: colors.muted }}>
              Grab the Brand Starter Kit the worksheets behind this entry.
            </div>
          </div>
          <Link
            href="/#guide"
            className="cta-y"
            style={{ flex: 'none', fontSize: 12, padding: '16px 28px', gap: 10 }}
          >
            DOWNLOAD KIT →
          </Link>
        </div>

        {more.length > 0 && (
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
              [ NEXT IN THE ARCHIVE ]
            </div>
            {more.map((m) => (
              <Link
                key={m.slug}
                href={`/journal/${m.slug}`}
                className="hover-border"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  border: `1px solid ${colors.line}`,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 900,
                    fontSize: 26,
                    color: colors.yellow,
                    flex: 'none'
                  }}
                >
                  {m.log}
                </span>
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      color: colors.muted
                    }}
                  >
                    {m.category}
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: 16,
                      textTransform: 'uppercase',
                      lineHeight: 1.2
                    }}
                  >
                    {m.title}
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 16,
                    color: colors.yellow,
                    flex: 'none'
                  }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
