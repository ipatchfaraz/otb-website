/** @type {import('next').NextConfig} */
const nextConfig = {
  // Locally, disable outputFileTracing to sidestep a Next.js bug where
  // a `#` in the project's ancestor path breaks the tracer.
  // On Vercel, we MUST leave it enabled — disabling it breaks the RSC
  // manifest lookup at runtime ("Cannot read properties of undefined
  // (reading 'clientModules')"). Vercel builds under /vercel/path0/
  // so the `#` bug never triggers there.
  outputFileTracing: !!process.env.VERCEL,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' }
    ]
  },
  // 301 permanent redirects from old Webflow URL patterns to the new
  // structure. Two-way benefit:
  // 1. Any external backlink (Google, social, email) pointing at the
  //    old paths lands on the right case study without a 404.
  // 2. Google eventually consolidates ranking signals from the old
  //    URLs onto the new ones.
  async redirects() {
    return [
      // Webflow used /project/<slug>; new site uses /work/<slug>.
      // A few slugs also changed name — those get explicit rules first,
      // then the catch-all handles the ones that stayed the same.
      { source: '/project/dunes-water',      destination: '/work/dunes',    permanent: true },
      { source: '/project/the-barakah-effect', destination: '/work/barakah', permanent: true },
      // Catch-all — any other /project/<slug> maps 1:1 to /work/<slug>.
      { source: '/project/:slug',            destination: '/work/:slug',    permanent: true },
      // Webflow's portfolio index → new work index.
      { source: '/portfolio',                destination: '/work',          permanent: true }
    ];
  }
};

export default nextConfig;
