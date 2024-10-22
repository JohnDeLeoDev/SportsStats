/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
    swcMinify: isProduction, // Use SWC in production builds
    babel: !isProduction
        ? {
              presets: ['next/babel'],
          }
        : null,
}

export default nextConfig
