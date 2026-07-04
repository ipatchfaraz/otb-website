/** @type {import('next').NextConfig} */
const nextConfig = {
  // All routes here are prerendered at build time (● SSG / ○ Static),
  // so file tracing isn't needed at runtime. Disabling it also
  // sidesteps a Next.js bug where a `#` in the project's ancestor
  // path breaks the tracer during local `next build`.
  outputFileTracing: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' }
    ]
  }
};

export default nextConfig;
