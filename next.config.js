/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'production'
      ? 'http://localhost:3000/api'
      : 'http://localhost:3000/api'
  }
}

module.exports = nextConfig
