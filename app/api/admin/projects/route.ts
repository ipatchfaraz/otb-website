import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// GET /api/admin/projects — list all (published + drafts)
export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });
  const rows = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ projects: rows });
}

// POST /api/admin/projects — create a new empty project
export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });
  const body = (await req.json().catch(() => ({}))) as { slug?: string };
  const slug = (body.slug ?? '').trim().toLowerCase();
  if (!/^[a-z0-9-]{2,40}$/.test(slug))
    return NextResponse.json({ error: 'INVALID_SLUG' }, { status: 400 });

  const last = await prisma.project.findFirst({ orderBy: { order: 'desc' } });
  const nextOrder = (last?.order ?? -1) + 1;

  try {
    const p = await prisma.project.create({
      data: {
        slug,
        order: nextOrder,
        discipline: 'CLIENT // BRAND IDENTITY',
        line: '[ INSERT: one-line description ]',
        tags: ['IDENTITY'],
        coverImage: '',
        caseLabel: `[ CASE_FILE: ${slug.toUpperCase()} // IDENTITY ]`,
        title: `${slug.toUpperCase()}.`,
        client: slug.toUpperCase(),
        tagline: '[ INSERT: tagline ]',
        sector: '[ CONFIRM ]',
        scope: 'IDENTITY',
        year: '[ CONFIRM ]',
        brief: '[ INSERT: the story in one line ]',
        problemHead: '[ INSERT: THE PROBLEM ]',
        problemBody: '[ INSERT: the situation before OTB ]',
        digBody: '[ INSERT: what we uncovered ]',
        insight: '[ INSERT: the one-sentence insight ]',
        leapHead: '[ INSERT: THE LEAP ]',
        leapBody: '[ INSERT: how insight became idea ]',
        solutionBody: '[ INSERT: 1–2 sentences on the system ]',
        payoff: '[ INSERT: the result ]',
        heroImg: '',
        gallery: [],
        published: false
      }
    });
    revalidatePath('/');
    revalidatePath('/work');
    revalidatePath(`/work/${slug}`);
    return NextResponse.json({ project: p });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'CREATE_FAILED';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
