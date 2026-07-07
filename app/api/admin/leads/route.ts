import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// GET /api/admin/leads returns a CSV of every captured lead.
export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma)
    return new Response('email,source,created_at,synced_at\n', {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="leads-empty.csv"'
      }
    });
  const rows = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  const header = 'email,source,created_at,synced_at,resend_error\n';
  const body = rows
    .map((r) => {
      const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
      return [
        esc(r.email),
        esc(r.source),
        r.createdAt.toISOString(),
        r.resendSyncedAt?.toISOString() ?? '',
        esc(r.resendError ?? '')
      ].join(',');
    })
    .join('\n');
  return new Response(header + body + (body ? '\n' : ''), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="otb-leads-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`
    }
  });
}
