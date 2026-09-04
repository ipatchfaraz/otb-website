import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';
import { STATIC_JOURNAL } from '@/lib/journal';

// POST /api/admin/journal/sync
// Creates any JournalEntry rows that exist in STATIC_JOURNAL but not
// in the DB. Never overwrites an existing row (so admin edits to
// already-imported entries are safe). Use this to publish newly
// added static articles without wiping the CMS.

export async function POST() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });

  const existing = await prisma.journalEntry.findMany({ select: { slug: true } });
  const knownSlugs = new Set(existing.map((r) => r.slug));

  const missing = STATIC_JOURNAL.filter((a) => !knownSlugs.has(a.slug));
  if (missing.length === 0) {
    return NextResponse.json({ ok: true, created: 0, message: 'All static entries already exist in the DB.' });
  }

  for (const a of missing) {
    await prisma.journalEntry.create({
      data: {
        log: a.log,
        slug: a.slug,
        category: a.category,
        readMin: a.readMin,
        date: a.date,
        author: a.author,
        authorRole: a.authorRole,
        thumb: a.thumb,
        title: a.title,
        dek: a.dek,
        body: a.body,
        published: true
      }
    });
  }

  revalidatePath('/');
  revalidatePath('/journal');
  for (const a of missing) revalidatePath(`/journal/${a.slug}`);

  return NextResponse.json({
    ok: true,
    created: missing.length,
    slugs: missing.map((a) => a.slug),
    message: `Published ${missing.length} new journal entr${missing.length === 1 ? 'y' : 'ies'}.`
  });
}
