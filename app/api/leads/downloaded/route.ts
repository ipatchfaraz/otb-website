import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/leads/downloaded
// Body: { email: string }
// Flips the Lead row's downloadedAt so we can distinguish form-only
// leads from confirmed downloads. Idempotent — if downloadedAt is
// already set we don't overwrite (first download wins).
//
// Called from KitDownload.tsx on button click. Best-effort — the
// actual PDF download still fires even if this request errors, so a
// blip in tracking never blocks the user from getting the file.

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

  if (!prisma) return NextResponse.json({ ok: true, skipped: 'NO_DB' });

  try {
    const now = new Date();
    const row = await prisma.lead.findUnique({
      where: { email },
      select: { id: true, downloadedAt: true }
    });
    // Row missing (user typed the URL directly, or DB was reset since
    // submit): create a bare lead row so we still count the download.
    if (!row) {
      await prisma.lead.create({
        data: { email, source: 'direct-download', downloadedAt: now }
      });
      return NextResponse.json({ ok: true, created: true });
    }
    // Idempotent — leave the first-download timestamp in place.
    if (!row.downloadedAt) {
      await prisma.lead.update({
        where: { id: row.id },
        data: { downloadedAt: now }
      });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[leads/downloaded] db update failed', e);
    return NextResponse.json({ ok: false, error: 'DB_ERROR' }, { status: 500 });
  }
}
