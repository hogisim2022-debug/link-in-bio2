import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      // TODO: Supabase 연동 후 아래 주석 해제 (xxxx는 실제 프로젝트 ID로 교체)
      // { hostname: "xxxx.supabase.co" },
    ],
  },
};

export default nextConfig;
