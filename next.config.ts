import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Koren sajta (/) vodi na englesku verziju.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
  cacheComponents: true,
  partialPrefetching: true,
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
