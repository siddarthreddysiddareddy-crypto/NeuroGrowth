/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // PPR: forward-compatible flag (active in Next.js 14 canary+)
    // In 14.0.0 stable this is a no-op but marks the intent
    ppr: false,
  },
  transpilePackages: ['three'],
}

module.exports = nextConfig