/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/coding-dojo-manager',
  assetPrefix: '/coding-dojo-manager/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 