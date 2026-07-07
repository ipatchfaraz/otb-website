import AdminHeader from '@/components/AdminHeader';
import SeedButton from '@/components/SeedButton';
import ResyncCasesButton from '@/components/ResyncCasesButton';
import FaviconUploader from '@/components/FaviconUploader';
import DashboardCard from '@/components/DashboardCard';
import { colors, fonts } from '@/lib/tokens';
import { getJournalList, getProjects } from '@/lib/content';
import { prisma } from '@/lib/prisma';

// This page reads the session cookie via middleware guard + Prisma at
// request time don't try to prerender it.
export const dynamic = 'force-dynamic';

// Server-rendered so we can pull counts directly from the DB.
// Middleware guarantees the visitor is authenticated.
export default async function AdminDashboard() {
  const [journal, projects] = await Promise.all([getJournalList(), getProjects()]);
  const jCount = String(journal.length).padStart(2, '0');
  const pCount = String(projects.length).padStart(2, '0');
  // Show the one-shot seed button when the DB is configured but empty.
  const dbConfigured = !!prisma;
  const dbEmpty =
    dbConfigured &&
    prisma &&
    (await prisma.project.count()) === 0 &&
    (await prisma.journalEntry.count()) === 0;

  const cards = [
    {
      tag: 'MODULE_01',
      title: 'JOURNAL',
      desc: 'Blog entries headline, dek, body blocks and cover imagery. Write in flowing text or structured blocks.',
      count: `${jCount} ENTRIES`,
      href: '/admin/journal',
      viewHref: '/journal',
      icon: (
        <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={colors.yellow} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3.5h11a2 2 0 0 1 2 2V20a1 1 0 0 1-1.5.87L15 20l-1.5.87L12 20l-1.5.87L9 20l-1.5.87A1 1 0 0 1 6 20V5.5" />
          <line x1={7.5} y1={8} x2={13.5} y2={8} />
          <line x1={7.5} y1={11} x2={13.5} y2={11} />
          <line x1={7.5} y1={14} x2={11.5} y2={14} />
        </svg>
      )
    },
    {
      tag: 'MODULE_02',
      title: 'PROJECTS',
      desc: 'Each project in one place the case-study story plus its Work-grid card (cover, tags, order).',
      count: `${pCount} PROJECTS`,
      href: '/admin/projects',
      viewHref: '/work',
      icon: (
        <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={colors.yellow} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3.5h7.5L18 8v12.5H6V3.5Z" />
          <path d="M13.5 3.5V8H18" />
          <line x1={8.5} y1={12} x2={15} y2={12} />
          <line x1={8.5} y1={15} x2={15} y2={15} />
        </svg>
      )
    },
    {
      tag: 'MODULE_03',
      title: 'LEADS',
      desc: 'Kit downloads every email captured by the brand starter kit form on the homepage.',
      count: 'CSV EXPORT',
      href: '/admin/leads',
      viewHref: '/',
      icon: (
        <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={colors.yellow} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <rect x={3} y={5} width={18} height={14} rx={1} />
          <path d="M3 6l9 8 9-8" />
        </svg>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader />

      <section
        style={{
          padding: '54px 40px 30px 40px',
          maxWidth: 1180,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}
      >
        <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.2em', color: colors.yellow }}>
          [ CONTENT CONTROL PANEL ]
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 'clamp(38px, 6vw, 68px)',
            lineHeight: 0.98,
            margin: 0,
            textTransform: 'uppercase'
          }}
        >
          MANAGE THE
          <br />
          ARCHIVE.
        </h1>
        <p style={{ margin: 0, maxWidth: '56ch', fontSize: 16, lineHeight: 1.6, color: '#9A9A9A' }}>
          One panel for everything that ships to the site journal entries, the work grid and the deep case files. Pick a system to edit.
        </p>
      </section>

      <section style={{ padding: '18px 40px 40px 40px', maxWidth: 1180, width: '100%', margin: '0 auto' }}>
        {!dbConfigured && (
          <div
            style={{
              border: '1px solid #3A2020',
              background: 'rgba(229,72,77,0.06)',
              padding: '14px 18px',
              marginBottom: 20,
              fontFamily: fonts.mono,
              fontSize: 11,
              color: '#E5484D',
              letterSpacing: '0.1em'
            }}
          >
            ✕ DATABASE_URL is not configured. The CMS panels will show 503 errors set the env var in Vercel and redeploy.
          </div>
        )}
        {dbEmpty && (
          <div
            style={{
              border: '1px solid #3A3A22',
              background: 'rgba(255,229,0,0.06)',
              padding: '14px 18px',
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16
            }}
          >
            <div style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.yellow, letterSpacing: '0.1em' }}>
              DB IS EMPTY POPULATE IT WITH THE EXISTING STATIC CONTENT (13 CASE STUDIES + 3 JOURNAL ENTRIES) TO START EDITING.
            </div>
            <SeedButton />
          </div>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20
          }}
        >
          {cards.map((c) => (
            <DashboardCard
              key={c.title}
              tag={c.tag}
              title={c.title}
              desc={c.desc}
              count={c.count}
              href={c.href}
              viewHref={c.viewHref}
              icon={c.icon}
            />
          ))}
        </div>

        {dbConfigured && !dbEmpty && (
          <div
            style={{
              marginTop: 28,
              border: '1px solid #242424',
              background: '#0F0F0F',
              padding: '20px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 26
            }}
          >
            <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.22em', color: '#5A5A5A' }}>
              SITE // BRANDING
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 420 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.mutedSoft, letterSpacing: '0.1em', fontWeight: 700 }}>
                  FAVICON
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: '0.08em', lineHeight: 1.5 }}>
                  THE IMAGE THAT APPEARS IN BROWSER TABS, BOOKMARKS AND WHATSAPP LINK CARDS. UPLOAD A CUSTOM ONE OR REVERT TO THE BUILT-IN OTB MARK.
                </div>
              </div>
              <FaviconUploader />
            </div>

            <div style={{ borderTop: '1px solid #242424', paddingTop: 22, display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 420 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.mutedSoft, letterSpacing: '0.1em', fontWeight: 700 }}>
                  RESYNC CASE STUDIES
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.muted, letterSpacing: '0.08em', lineHeight: 1.5 }}>
                  RESYNC UP TO 5 CASE STUDIES (BARAKAH, REVIVERS, GRAINER, SIFA, QURAANY) FROM THE STATIC FILE. USE AFTER A CONTENT UPDATE THAT LANDED IN CODE BUT NOT IN THE DB. PRESERVES ORDER, FEATURED STATE AND COVER IMAGE.
                </div>
              </div>
              <ResyncCasesButton />
            </div>
          </div>
        )}
      </section>

      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid #242424',
          padding: '16px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.16em', color: '#5A5A5A' }}>
          OUTTA THE BOX CONTENT OPERATING SYSTEM
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.16em', color: '#5A5A5A' }}>
          {jCount} ENTRIES + {pCount} PROJECTS MANAGED
        </span>
      </footer>
    </div>
  );
}
