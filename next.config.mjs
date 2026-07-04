/** @type {import('next').NextConfig} */
const nextConfig = {
  // The parent directory contains a `#` character, which Next.js's file
  // tracer misparses as a URL fragment. Disable tracing when building
  // locally; Vercel builds in a `#`-free path, so keep tracing on there.
  outputFileTracing: !process.env.VERCEL,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' }
    ]
  }
};

export default nextConfig;
