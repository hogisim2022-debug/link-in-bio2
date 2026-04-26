import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "srmoliyhigxamvuntzxz.supabase.co" },
    ],
  },
};

export default nextConfig;
