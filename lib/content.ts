// DB-aware read helpers for the public site. If Postgres is configured
// AND has rows, use it; otherwise fall back to the compiled static
// data in lib/case-studies.ts, lib/projects.ts, lib/journal.ts.

import 'server-only';
import { prisma } from './prisma';
import {
  CASES,
  ORDER,
  COVERS,
  type CaseStudy,
  type CaseSlug,
  type Gallery
} from './case-studies';
import { PROJECTS, FEATURED_ORDER, type ProjectListing } from './projects';
import {
  STATIC_JOURNAL,
  STATIC_JOURNAL_BY_SLUG,
  STATIC_JOURNAL_BY_LOG,
  type JournalArticle
} from './journal';

export type PublicCase = CaseStudy & { slug: string; coverImage: string };

/** All projects for the /work grid sorted by manual order (DB) or FEATURED_ORDER (static). */
export async function getProjects(): Promise<ProjectListing[]> {
  if (prisma) {
    try {
      const rows = await prisma.project.findMany({
        where: { published: true },
        orderBy: { order: 'asc' }
      });
      if (rows.length)
        return rows.map((r) => ({
          slug: r.slug,
          name: r.title.replace(/\.$/, ''),
          discipline: r.discipline,
          line: r.line,
          tags: r.tags as ProjectListing['tags'],
          img: r.coverImage
        }));
    } catch {
      /* fall through to static */
    }
  }
  // Static fallback: use PROJECTS with FEATURED_ORDER-first ordering when possible
  const seen = new Set<string>();
  const ordered: ProjectListing[] = [];
  for (const slug of FEATURED_ORDER) {
    const p = PROJECTS.find((x) => x.slug === slug);
    if (p) {
      ordered.push(p);
      seen.add(slug);
    }
  }
  for (const p of PROJECTS) if (!seen.has(p.slug)) ordered.push(p);
  return ordered;
}

/** Featured projects for the homepage strip. */
export async function getFeaturedProjects(): Promise<PublicCase[]> {
  const bySlug: Record<string, PublicCase> = {};

  if (prisma) {
    try {
      // Prefer projects explicitly flagged as featured the admin's
      // curated homepage strip. If none are flagged yet (e.g. before
      // the first save after upgrade), fall back to the top 6 by order
      // so the strip never renders empty.
      let rows = await prisma.project.findMany({
        where: { published: true, featured: true },
        orderBy: { order: 'asc' }
      });
      if (!rows.length) {
        rows = await prisma.project.findMany({
          where: { published: true },
          orderBy: { order: 'asc' },
          take: 6
        });
      }
      if (rows.length)
        return rows.map((r) => ({
          slug: r.slug,
          coverImage: r.coverImage,
          caseLabel: r.caseLabel,
          title: r.title,
          client: r.client,
          tagline: r.tagline,
          sector: r.sector,
          scope: r.scope,
          year: r.year,
          brief: r.brief,
          problemHead: r.problemHead,
          problemBody: r.problemBody,
          digBody: r.digBody,
          insight: r.insight,
          leapHead: r.leapHead,
          leapBody: r.leapBody,
          solutionBody: r.solutionBody,
          payoff: r.payoff,
          heroImg: r.heroImg,
          gallery: (r.gallery as unknown as Gallery[] | null) ?? null
        }));
    } catch {
      /* fall through */
    }
  }

  // Static fallback: FEATURED_ORDER × CASES
  for (const slug of FEATURED_ORDER) {
    const c = CASES[slug as CaseSlug];
    if (!c) continue;
    bySlug[slug] = {
      ...c,
      slug,
      coverImage: COVERS[slug as CaseSlug] ?? c.heroImg
    };
  }
  return Object.values(bySlug);
}

/** Full case study for /work/[slug]. */
export async function getCase(slug: string): Promise<PublicCase | null> {
  if (prisma) {
    try {
      const r = await prisma.project.findUnique({ where: { slug } });
      if (r && r.published) {
        return {
          slug: r.slug,
          coverImage: r.coverImage,
          caseLabel: r.caseLabel,
          title: r.title,
          client: r.client,
          tagline: r.tagline,
          sector: r.sector,
          scope: r.scope,
          year: r.year,
          brief: r.brief,
          problemHead: r.problemHead,
          problemBody: r.problemBody,
          digBody: r.digBody,
          insight: r.insight,
          leapHead: r.leapHead,
          leapBody: r.leapBody,
          solutionBody: r.solutionBody,
          payoff: r.payoff,
          heroImg: r.heroImg,
          gallery: (r.gallery as unknown as Gallery[] | null) ?? null
        };
      }
    } catch {
      /* fall through */
    }
  }
  const c = CASES[slug as CaseSlug];
  if (!c) return null;
  return { ...c, slug, coverImage: COVERS[slug as CaseSlug] ?? c.heroImg };
}

/** Full case slug list for generateStaticParams. */
export async function getAllCaseSlugs(): Promise<string[]> {
  if (prisma) {
    try {
      const rows = await prisma.project.findMany({
        where: { published: true },
        select: { slug: true }
      });
      if (rows.length) return rows.map((r) => r.slug);
    } catch {
      /* fall through */
    }
  }
  return [...ORDER];
}

/** Next slug in the order carousel used on case study pages. */
export async function getNextCase(slug: string): Promise<PublicCase | null> {
  const list = await getAllCaseSlugs();
  const i = list.indexOf(slug);
  const next = list[(i + 1) % list.length];
  return next ? getCase(next) : null;
}

// ---- Journal ----

export async function getJournalList(): Promise<JournalArticle[]> {
  if (prisma) {
    try {
      const rows = await prisma.journalEntry.findMany({
        where: { published: true },
        orderBy: { date: 'desc' }
      });
      if (rows.length)
        return rows.map((r) => ({
          log: r.log,
          slug: r.slug,
          category: r.category,
          readMin: r.readMin,
          date: r.date,
          author: r.author,
          authorRole: r.authorRole,
          thumb: r.thumb ?? null,
          title: r.title,
          dek: r.dek,
          body: (r.body as unknown) as JournalArticle['body']
        }));
    } catch {
      /* fall through */
    }
  }
  return STATIC_JOURNAL.slice().sort((a, b) => b.date.localeCompare(a.date));
}

export async function getJournalEntry(slug: string): Promise<JournalArticle | null> {
  if (prisma) {
    try {
      const r = await prisma.journalEntry.findUnique({ where: { slug } });
      if (r && r.published)
        return {
          log: r.log,
          slug: r.slug,
          category: r.category,
          readMin: r.readMin,
          date: r.date,
          author: r.author,
          authorRole: r.authorRole,
          thumb: r.thumb ?? null,
          title: r.title,
          dek: r.dek,
          body: (r.body as unknown) as JournalArticle['body']
        };
    } catch {
      /* fall through */
    }
  }
  return STATIC_JOURNAL_BY_SLUG[slug] ?? STATIC_JOURNAL_BY_LOG[slug] ?? null;
}

export async function getJournalSlugs(): Promise<string[]> {
  if (prisma) {
    try {
      const rows = await prisma.journalEntry.findMany({
        where: { published: true },
        select: { slug: true }
      });
      if (rows.length) return rows.map((r) => r.slug);
    } catch {
      /* fall through */
    }
  }
  return STATIC_JOURNAL.map((a) => a.slug);
}
