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
  }
};

export default nextConfig;
