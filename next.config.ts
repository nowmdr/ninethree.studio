import type { NextConfig } from "next";

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
  // Настройка для GitHub Pages
  basePath: '/ninethree.studio',
  assetPrefix: '/ninethree.studio',
};

export default nextConfig;
