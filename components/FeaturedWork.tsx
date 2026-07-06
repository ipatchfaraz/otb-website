import { getFeaturedProjects } from '@/lib/content';
import FeaturedWorkClient, { type FeaturedCard } from './FeaturedWorkClient';

/**
 * Server wrapper. Fetches featured projects (DB → static fallback) and
 * hands them to the client component that owns the scroll-pin logic.
 */
export default async function FeaturedWork() {
  const projects = await getFeaturedProjects();
  const cards: FeaturedCard[] = projects.map((p, i) => ({
    slug: p.slug,
    file: `FILE_${String(i + 1).padStart(2, '0')}`,
    cover: p.coverImage,
    meta: p.caseLabel.replace('[ CASE_FILE: ', '').replace(' ]', ''),
    tagline: p.tagline,
    alt: `${p.client} case study cover`
  }));
  return <FeaturedWorkClient cards={cards} />;
}
