import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// GET /api/admin/journal list all entries (published + drafts)
export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });
  const rows = await prisma.journalEntry.findMany({ orderBy: { date: 'desc' } });
  return NextResponse.json({ entries: rows });
}

// POST /api/admin/journal create a new blank entry
export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });
  const body = (await req.json().catch(() => ({}))) as { slug?: string; log?: string };
  const slug = (body.slug ?? '').trim().toLowerCase();
  if (!/^[a-z0-9-]{2,40}$/.test(slug))
    return NextResponse.json({ error: 'INVALID_SLUG' }, { status: 400 });

  // Next log number
  const last = await prisma.journalEntry.findFirst({ orderBy: { log: 'desc' } });
  const nextLog = String(((last?.log ? parseInt(last.log, 10) : 0) || 0) + 1).padStart(2, '0');

  try {
    const e = await prisma.journalEntry.create({
      data: {
        log: body.log?.trim() || nextLog,
        slug,
        category: 'STRATEGY',
        readMin: '5 MIN READ',
        date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
        author: 'THE OTB TEAM',
        authorRole: 'STUDIO',
        thumb: null,
        title: `[ NEW ENTRY // ${slug.toUpperCase()} ]`,
        dek: '',
        body: [],
        published: false
      }
    });
    revalidatePath('/');
    revalidatePath('/journal');
    revalidatePath(`/journal/${slug}`);
    return NextResponse.json({ entry: e });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'CREATE_FAILED';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
