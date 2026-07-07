import type { MetadataRoute } from 'next';
import { ORDER } from '@/lib/case-studies';
import { STATIC_JOURNAL } from '@/lib/journal';

const BASE = 'https://outtathebox.design';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/work`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/journal`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/kit`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/logo-vault`,lastModified: now, changeFrequency: 'monthly', priority: 0.6 }
  ];

  const workRoutes: MetadataRoute.Sitemap = ORDER.map((slug) => ({
    url: `${BASE}/work/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const journalRoutes: MetadataRoute.Sitemap = STATIC_JOURNAL.map((j) => {
    // date format is 'YYYY.MM.DD' — convert to ISO
    const iso = j.date ? j.date.replace(/\./g, '-') : undefined;
    const parsed = iso ? new Date(iso) : now;
    return {
      url: `${BASE}/journal/${j.slug}`,
      lastModified: isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    };
  });

  return [...staticRoutes, ...workRoutes, ...journalRoutes];
}
