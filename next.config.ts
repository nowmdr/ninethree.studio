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
  // Если ваш репозиторий НЕ является username.github.io, раскомментируйте строку ниже:
  // basePath: '/ninethree.studio'
};

export default nextConfig;
