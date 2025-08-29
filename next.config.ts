import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.frogmates.suno.uz', 't.me'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.frogmates.suno.uz',
      },
      {
        protocol: 'https',
        hostname: 't.me',
      }
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
