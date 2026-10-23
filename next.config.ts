import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes a plain HTML/JS site to /out (deployable to Netlify, etc.).
  // Only for builds: in `next dev`, export mode turns unknown product ids into errors instead of 404s.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  // Emit /about/index.html instead of /about.html so static hosts resolve clean URLs.
  trailingSlash: true,
  images: { unoptimized: true },
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
