import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "rickandmortyapi.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
