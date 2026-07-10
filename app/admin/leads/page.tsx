import AdminHeader from '@/components/AdminHeader';
import { colors, fonts } from '@/lib/tokens';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/** Format a Date as `YYYY-MM-DD HH:mm MYT` in Malaysia Time (UTC+8).
 *  The `sv-SE` locale gives us the ISO-like `YYYY-MM-DD HH:mm` output
 *  natively; we just pin the timezone to `Asia/Kuala_Lumpur` and
 *  append the MYT suffix so admins reading from anywhere know which
 *  clock the timestamp is on. */
const fmtMYT = (d: Date): string => {
  const s = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
    hour12: false
  }).format(d);
  return `${s} MYT`;
};

export default async function LeadsAdminPage() {
  const leads = prisma
    ? await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader subtitle="LEADS // v1.0" />
      <main style={{ padding: '32px 40px 80px', maxWidth: 1180, width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.16em', color: colors.yellow }}>
              [ MAILING LIST ]
            </div>
            <h1
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 36,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              KIT DOWNLOADS
            </h1>
          </div>
          <a
            href="/api/admin/leads"
            download
            style={{
              background: colors.yellow,
              color: colors.bg,
              fontFamily: fonts.mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              padding: '12px 18px',
              textDecoration: 'none'
            }}
          >
            ⤓ EXPORT CSV
          </a>
        </div>

        <div style={{ border: `1px solid ${colors.line}`, background: '#141414', overflow: 'hidden' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              padding: '12px 16px',
              background: '#121212',
              borderBottom: `1px solid ${colors.line}`,
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: '0.14em',
              color: colors.muted
            }}
          >
            <span>EMAIL</span>
            <span>SOURCE</span>
            <span>CAPTURED</span>
            <span>RESEND</span>
          </div>
          {leads.length === 0 && (
            <div style={{ padding: '20px 16px', color: colors.muted, fontFamily: fonts.mono, fontSize: 11 }}>
              {prisma
                ? 'No leads captured yet.'
                : 'DB not configured set DATABASE_URL to start capturing leads.'}
            </div>
          )}
          {leads.map((l) => (
            <div
              key={l.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '12px 16px',
                borderBottom: `1px solid ${colors.line}`,
                fontFamily: fonts.mono,
                fontSize: 12
              }}
            >
              <span style={{ color: colors.fg }}>{l.email}</span>
              <span style={{ color: colors.muted }}>{l.source}</span>
              <span style={{ color: colors.muted }}>{fmtMYT(l.createdAt)}</span>
              <span style={{ color: l.resendSyncedAt ? '#57C7A0' : '#E5484D' }}>
                {l.resendSyncedAt ? '✓ SYNCED' : l.resendError ? '✕ ' + l.resendError.slice(0, 20) : '· pending'}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
