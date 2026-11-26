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
  // Static fallback also used as source for fields the DB schema does not
  // yet carry (e.g. testimonial). This keeps new CaseStudy fields working
  // the moment they are added, without a Prisma migration.
  const staticCase = CASES[slug as CaseSlug];

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
          gallery: (r.gallery as unknown as Gallery[] | null) ?? null,
          // Static-only fields layered on top of the DB result
          testimonial: staticCase?.testimonial
        };
      }
    } catch {
      /* fall through */
    }
  }
  if (!staticCase) return null;
  return { ...staticCase, slug, coverImage: COVERS[slug as CaseSlug] ?? staticCase.heroImg };
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

/**
 * Is a static-journal article live right now? An article is live when it has
 * no `publishAt` (legacy articles) or its `publishAt` is in the past AND its
 * `status` is not 'draft'. This is what powers scheduled auto-publishing:
 * assign a future ISO datetime and the article appears automatically once
 * Next's ISR revalidation picks it up (see revalidate = 60 on the pages).
 */
function isLive(a: JournalArticle, now: Date = new Date()): boolean {
  if (a.status === 'draft') return false;
  if (!a.publishAt) return true;
  const t = Date.parse(a.publishAt);
  if (Number.isNaN(t)) return true; // malformed date -> fail open (visible)
  return t <= now.getTime();
}

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
  return STATIC_JOURNAL.filter((a) => isLive(a))
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
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
  const a = STATIC_JOURNAL_BY_SLUG[slug] ?? STATIC_JOURNAL_BY_LOG[slug] ?? null;
  if (!a) return null;
  return isLive(a) ? a : null;
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
  return STATIC_JOURNAL.filter((a) => isLive(a)).map((a) => a.slug);
}

/** Logo Vault marks. DB-first with a fallback to the compiled list of
 *  63 static SVGs in /public/images/logos/. Public callers get a
 *  simple `{ url, alt }[]` shape ready to drop into <img>. */
export type PublicLogo = { url: string; alt: string };

const STATIC_LOGO_COUNT = 63;

export async function getLogos(): Promise<PublicLogo[]> {
  if (prisma) {
    try {
      const rows = await prisma.logo.findMany({
        where: { published: true },
        orderBy: { order: 'asc' }
      });
      if (rows.length) {
        return rows.map((r, i) => ({
          url: r.imageUrl,
          alt: r.title || `Logo mark ${String(i + 1).padStart(2, '0')} from the OTB archive`
        }));
      }
    } catch {
      /* fall through */
    }
  }
  return Array.from({ length: STATIC_LOGO_COUNT }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      url: `/images/logos/logo-${n}.svg`,
      alt: `Logo mark ${n} from the OTB archive`
    };
  });
}
