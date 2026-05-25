import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "marafet-landing-partnerka";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  distDir: "out",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  trailingSlash: true,
};

export default nextConfig;
