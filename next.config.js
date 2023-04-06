/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['nextjs-upload-indol.vercel.app', 'localhost'],
  },
}
module.exports = nextConfig
