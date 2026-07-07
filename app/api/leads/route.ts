import { NextResponse, type NextRequest } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

// POST /api/leads
// Body: { email: string }
// 1. validates email
// 2. inserts (or upserts) into the Lead table
// 3. syncs to Resend Audience (best-effort; DB row still saved on failure)
// Response: { ok: true } the form redirects to /kit/download on success.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ ok: false, error: 'INVALID_EMAIL' }, { status: 400 });

  const source = 'kit-download';

  // Save to DB if configured. If not, we still hand back OK so the site
  // works pre-DB the user gets the download, we just don't record them.
  let lead: { id: string; email: string } | null = null;
  if (prisma) {
    try {
      lead = await prisma.lead.upsert({
        where: { email },
        update: { source },
        create: { email, source },
        select: { id: true, email: true }
      });
    } catch (e) {
      console.error('[leads] db upsert failed', e);
      // fall through email service can still capture them
    }
  }

  // Fire-and-await Resend sync (fast, ~200ms). Best-effort don't block
  // the user's download if Resend is down.
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (apiKey && audienceId) {
    try {
      const resend = new Resend(apiKey);
      const res = await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId
      });
      if (res.error) throw new Error(res.error.message);
      if (prisma && lead)
        await prisma.lead
          .update({ where: { id: lead.id }, data: { resendSyncedAt: new Date(), resendError: null } })
          .catch(() => {});
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown';
      console.error('[leads] resend sync failed', message);
      if (prisma && lead)
        await prisma.lead
          .update({ where: { id: lead.id }, data: { resendError: message } })
          .catch(() => {});
    }
  }

  return NextResponse.json({ ok: true });
}
