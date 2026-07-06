import type { Gallery } from '@/lib/case-studies';
import { getFeaturedProjects } from '@/lib/content';
import FeaturedWorkClient, { type FeaturedCard } from './FeaturedWorkClient';

/**
 * Server wrapper. Fetches featured projects (DB → static fallback) and
 * hands them to the client component that owns the scroll-pin logic
 * and the on-hover image cycling.
 */
export default async function FeaturedWork() {
  const projects = await getFeaturedProjects();
  const cards: FeaturedCard[] = projects.map((p, i) => {
    const gallery = (p.gallery ?? []) as Gallery[];
    const hoverCycle = gallery
      .filter((g) => g.inHoverCycle && g.img)
      .map((g) => g.img);
    return {
      slug: p.slug,
      file: `FILE_${String(i + 1).padStart(2, '0')}`,
      cover: p.coverImage,
      meta: p.caseLabel.replace('[ CASE_FILE: ', '').replace(' ]', ''),
      tagline: p.tagline,
      alt: `${p.client} case study cover`,
      hoverCycle
    };
  });
  return <FeaturedWorkClient cards={cards} />;
}
