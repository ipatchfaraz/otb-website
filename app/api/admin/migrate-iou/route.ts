import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';
import { CASES } from '@/lib/case-studies';

// POST /api/admin/migrate-iou
// One-shot migration to rename the IOU case study slug (iou →
// international-open-university) in the live DB and overwrite its body
// copy with the SEO-enriched text from lib/case-studies.ts. Safe to run
// multiple times: idempotent on both the rename and the content copy.
export async function POST() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });

  const newSlug = 'international-open-university';
  const fresh = CASES[newSlug];
  if (!fresh) return NextResponse.json({ error: 'STATIC_MISSING' }, { status: 500 });

  const existingOld = await prisma.project.findUnique({ where: { slug: 'iou' } });
  const existingNew = await prisma.project.findUnique({ where: { slug: newSlug } });

  if (!existingOld && !existingNew) {
    return NextResponse.json({ ok: true, message: 'No IOU row in DB — nothing to migrate.' });
  }

  const data = {
    slug: newSlug,
    caseLabel: fresh.caseLabel,
    title: fresh.title,
    client: fresh.client,
    tagline: fresh.tagline,
    sector: fresh.sector,
    scope: fresh.scope,
    year: fresh.year,
    brief: fresh.brief,
    problemHead: fresh.problemHead,
    problemBody: fresh.problemBody,
    digBody: fresh.digBody,
    insight: fresh.insight,
    leapHead: fresh.leapHead,
    leapBody: fresh.leapBody,
    solutionBody: fresh.solutionBody,
    payoff: fresh.payoff
  };

  if (existingOld && !existingNew) {
    await prisma.project.update({ where: { slug: 'iou' }, data });
  } else if (existingNew) {
    await prisma.project.update({ where: { slug: newSlug }, data });
    if (existingOld) {
      await prisma.project.delete({ where: { slug: 'iou' } });
    }
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath('/work/iou');
  revalidatePath(`/work/${newSlug}`);

  return NextResponse.json({
    ok: true,
    message: `IOU case study migrated to /work/${newSlug} with enriched copy.`
  });
}
