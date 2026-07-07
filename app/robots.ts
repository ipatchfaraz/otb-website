import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Admin panel and API endpoints have no public content — keep
        // them out of crawl index entirely.
        disallow: ['/admin', '/admin/*', '/api', '/api/*']
      }
    ],
    sitemap: 'https://www.outtathebox.design/sitemap.xml',
    host: 'https://www.outtathebox.design'
  };
}
