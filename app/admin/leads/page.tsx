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

/** Convert a 2-letter ISO country code to its emoji flag. Falls back
 *  to a globe if the code isn't a valid pair of letters. */
const flagFor = (iso: string): string => {
  const code = iso.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return '🌐';
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
};

/** Colour-code the SOURCE column so popup vs teaser is skimmable at
 *  a glance. Anything unknown just stays muted. */
const sourceColor = (source: string): string => {
  if (source === 'popup') return '#FFE500';
  if (source === 'teaser') return '#57C7A0';
  return '#8A8A8A';
};

/** Compact device glyph — icon + one-letter tag so the DEVICE cell
 *  stays readable at any width. Unknown / missing UA renders as an
 *  em-dash. */
const deviceGlyph = (d: string | null): string => {
  if (d === 'mobile') return '📱 M';
  if (d === 'tablet') return '📟 T';
  if (d === 'desktop') return '🖥 D';
  return '—';
};

export default async function LeadsAdminPage() {
  const leads = prisma
    ? await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader subtitle="LEADS // v1.0" />
      <main style={{ padding: '32px 40px 80px', maxWidth: 1400, width: '100%', margin: '0 auto' }}>
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

        <div style={{ border: `1px solid ${colors.line}`, background: '#141414', overflow: 'auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 0.7fr 0.9fr 0.7fr 0.9fr 1.1fr 0.9fr 0.9fr',
              padding: '12px 16px',
              background: '#121212',
              borderBottom: `1px solid ${colors.line}`,
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: '0.14em',
              color: colors.muted,
              minWidth: 900
            }}
          >
            <span>EMAIL</span>
            <span>SOURCE</span>
            <span>REFERRER</span>
            <span>DEVICE</span>
            <span>COUNTRY</span>
            <span>CAPTURED</span>
            <span>DOWNLOADED</span>
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
                gridTemplateColumns: '2fr 0.7fr 0.9fr 0.7fr 0.9fr 1.1fr 0.9fr 0.9fr',
                padding: '12px 16px',
                borderBottom: `1px solid ${colors.line}`,
                fontFamily: fonts.mono,
                fontSize: 12,
                minWidth: 900,
                alignItems: 'center'
              }}
            >
              <span style={{ color: colors.fg, overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.email}</span>
              <span style={{ color: sourceColor(l.source) }}>{l.source}</span>
              <span
                style={{ color: colors.mutedSoft }}
                title={l.referrerRaw ?? ''}
              >
                {l.referrer ?? 'direct'}
              </span>
              <span
                style={{ color: colors.mutedSoft }}
                title={l.device ?? ''}
              >
                {deviceGlyph(l.device)}
              </span>
              <span style={{ color: colors.mutedSoft }}>
                {l.country ? `${flagFor(l.country)} ${l.country}${l.city ? ` · ${l.city}` : ''}` : '—'}
              </span>
              <span style={{ color: colors.muted }}>{fmtMYT(l.createdAt)}</span>
              <span style={{ color: l.downloadedAt ? '#57C7A0' : '#6A6A6A' }}>
                {l.downloadedAt ? `✓ ${fmtMYT(l.downloadedAt).slice(5, 16)}` : '· no'}
              </span>
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
