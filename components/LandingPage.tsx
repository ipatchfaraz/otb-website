import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import BookingSection from './BookingSection';
import { colors, fonts } from '@/lib/tokens';

// Shared layout for SEO landing pages (/branding-agency-kuala-lumpur,
// /edutech-branding, /islamic-brand-design). Each page passes its own
// copy, FAQ and case-study callouts; the component renders a consistent
// on-brand page with FAQPage + BreadcrumbList JSON-LD baked in for rich
// snippets. Server component — static at build time.

export type LandingFaq = { q: string; a: string };
export type LandingCase = { slug: string; name: string; line: string };

export type LandingPageProps = {
  path: string;                 // e.g. '/branding-agency-kuala-lumpur'
  eyebrow: string;              // short mono tag
  h1: string;                   // visible page headline
  lead: string;                 // intro paragraph (also meta description source)
  sections: { heading: string; body: string }[];
  faqs: LandingFaq[];
  cases: LandingCase[];
  breadcrumbName: string;       // name shown in breadcrumb schema
};

const SITE = 'https://www.outtathebox.design';

export default function LandingPage(p: LandingPageProps) {
  const url = `${SITE}${p.path}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: p.breadcrumbName, item: url }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Header />

      <main style={{ background: colors.bg, color: colors.fg, minHeight: '70vh' }}>
        {/* Hero */}
        <section
          style={{
            padding: '110px 32px 72px',
            maxWidth: 1180,
            margin: '0 auto',
            backgroundImage: 'radial-gradient(#242414 1.4px, transparent 1.4px)',
            backgroundSize: '28px 28px'
          }}
        >
          <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.24em', color: colors.yellow, marginBottom: 18 }}>
            {p.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 'clamp(40px, 6.5vw, 82px)',
              lineHeight: 0.98,
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              maxWidth: '18ch'
            }}
          >
            {p.h1}
          </h1>
          <p style={{ marginTop: 28, maxWidth: '62ch', fontSize: 17, lineHeight: 1.65, color: colors.mutedSoft }}>
            {p.lead}
          </p>
        </section>

        {/* Body sections */}
        <section style={{ padding: '32px 32px 24px', maxWidth: 920, margin: '0 auto' }}>
          {p.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 42 }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 10.5, letterSpacing: '0.24em', color: colors.yellow, marginBottom: 12 }}>
                [ 0{i + 1} ]
              </div>
              <h2
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 'clamp(26px, 3.4vw, 38px)',
                  lineHeight: 1.05,
                  margin: '0 0 14px 0',
                  textTransform: 'uppercase'
                }}
              >
                {s.heading}
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: colors.mutedSoft, maxWidth: '68ch', margin: 0 }}>
                {s.body}
              </p>
            </div>
          ))}
        </section>

        {/* Case study callouts */}
        {p.cases.length > 0 && (
          <section style={{ padding: '32px 32px 48px', maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 10.5, letterSpacing: '0.24em', color: colors.yellow, marginBottom: 14 }}>
              [ CASE FILES · RELEVANT WORK ]
            </div>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 'clamp(26px, 3.4vw, 38px)',
                margin: '0 0 28px 0',
                textTransform: 'uppercase'
              }}
            >
              Work in this space.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {p.cases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/work/${c.slug}`}
                  style={{
                    border: `1px solid ${colors.line}`,
                    background: colors.bgAlt,
                    padding: '22px 20px',
                    color: colors.fg,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                  }}
                >
                  <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.2em', color: colors.yellow, textTransform: 'uppercase' }}>
                    ▸ CASE FILE
                  </div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: '-0.005em' }}>
                    {c.name}
                  </div>
                  <div style={{ fontFamily: fonts.body, fontSize: 13, color: colors.mutedSoft, lineHeight: 1.5 }}>
                    {c.line}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section style={{ padding: '32px 32px 72px', maxWidth: 920, margin: '0 auto' }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 10.5, letterSpacing: '0.24em', color: colors.yellow, marginBottom: 14 }}>
            [ FAQ ]
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 'clamp(26px, 3.4vw, 38px)',
              margin: '0 0 24px 0',
              textTransform: 'uppercase'
            }}
          >
            Questions.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${colors.line}` }}>
            {p.faqs.map((f, i) => (
              <details
                key={i}
                style={{
                  padding: '18px 0',
                  borderBottom: `1px solid ${colors.line}`,
                  color: colors.mutedSoft
                }}
              >
                <summary
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 17,
                    color: colors.fg,
                    cursor: 'pointer',
                    listStyle: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.005em'
                  }}
                >
                  <span style={{ color: colors.yellow, marginRight: 10, fontFamily: fonts.mono, fontSize: 13 }}>+</span>
                  {f.q}
                </summary>
                <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.65, color: colors.mutedSoft }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <BookingSection />
      <Footer />
    </>
  );
}
