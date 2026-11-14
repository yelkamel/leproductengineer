import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Firebase Hosting sert des fichiers statiques : pas de serveur Node.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ["@lpe/curriculum"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
