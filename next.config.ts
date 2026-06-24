import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["lucide-react"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tildacdn.pro',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;