import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';
import { CASES, ORDER, COVERS, type CaseSlug } from '@/lib/case-studies';
import { PROJECTS, FEATURED_ORDER } from '@/lib/projects';
import { STATIC_JOURNAL } from '@/lib/journal';

const FEATURED_SET = new Set<string>(FEATURED_ORDER);

// POST /api/admin/seed
// Populates empty Project + JournalEntry tables from the compiled static data
// so admins can start editing immediately instead of typing everything.
// Idempotent — skips rows that already exist.
export async function POST() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });

  let projectsCreated = 0;
  let journalCreated = 0;

  for (let i = 0; i < ORDER.length; i++) {
    const slug = ORDER[i] as CaseSlug;
    const c = CASES[slug];
    if (!c) continue;
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) continue;
    const project = PROJECTS.find((p) => p.slug === slug);
    await prisma.project.create({
      data: {
        slug,
        order: i,
        discipline: project?.discipline ?? c.caseLabel,
        line: project?.line ?? c.tagline,
        tags: (project?.tags as string[]) ?? ['IDENTITY'],
        coverImage: COVERS[slug] ?? project?.img ?? c.heroImg,
        caseLabel: c.caseLabel,
        title: c.title,
        client: c.client,
        tagline: c.tagline,
        sector: c.sector,
        scope: c.scope,
        year: c.year,
        brief: c.brief,
        problemHead: c.problemHead,
        problemBody: c.problemBody,
        digBody: c.digBody,
        insight: c.insight,
        leapHead: c.leapHead,
        leapBody: c.leapBody,
        solutionBody: c.solutionBody,
        payoff: c.payoff,
        heroImg: c.heroImg,
        gallery: c.gallery ?? [],
        published: true,
        featured: FEATURED_SET.has(slug)
      }
    });
    projectsCreated += 1;
  }

  for (const a of STATIC_JOURNAL) {
    const existing = await prisma.journalEntry.findUnique({ where: { slug: a.slug } });
    if (existing) continue;
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
    journalCreated += 1;
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath('/journal');

  return NextResponse.json({
    ok: true,
    projectsCreated,
    journalCreated,
    message: `Seeded ${projectsCreated} projects + ${journalCreated} entries. Existing rows were preserved.`
  });
}
