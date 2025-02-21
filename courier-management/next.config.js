/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // 'export' yerine 'standalone' kullanalım
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'vercel.app']
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig