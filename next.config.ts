import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns : [
      {
        protocol : "https",
        hostname: "cdn.dummyjson.com",
        pathname:"/recipe-images/**"
      }
    ]
  },
};

export default nextConfig;
