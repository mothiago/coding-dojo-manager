/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/coding-dojo-manager' : '',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/coding-dojo-manager/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 