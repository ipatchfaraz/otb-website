import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// GET /api/admin/leads returns a CSV of every captured lead.
export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const CSV_HEADER =
    'email,source,referrer,referrer_raw,country,city,created_at_utc,downloaded_at_utc,synced_at,resend_error\n';
  if (!prisma)
    return new Response(CSV_HEADER, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="leads-empty.csv"'
      }
    });
  const rows = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  const body = rows
    .map((r) => {
      const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
      return [
        esc(r.email),
        esc(r.source),
        esc(r.referrer ?? ''),
        esc(r.referrerRaw ?? ''),
        esc(r.country ?? ''),
        esc(r.city ?? ''),
        r.createdAt.toISOString(),
        r.downloadedAt?.toISOString() ?? '',
        r.resendSyncedAt?.toISOString() ?? '',
        esc(r.resendError ?? '')
      ].join(',');
    })
    .join('\n');
  return new Response(CSV_HEADER + body + (body ? '\n' : ''), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="otb-leads-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`
    }
  });
}
