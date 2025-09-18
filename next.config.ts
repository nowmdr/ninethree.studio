import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Настройка для GitHub Pages только в продакшене
  ...(isProduction &&
    isGitHubPages && {
      basePath: "/ninethree.studio",
      assetPrefix: "/ninethree.studio",
    }),
};

export default nextConfig;
