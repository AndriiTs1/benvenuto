import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Il simbolo di Next.js in sviluppo a destra: a sinistra coprirebbe la tab bar.
  devIndicators: { position: "bottom-right" },
  partialPrefetching: true,
  // Contenuti letti da disco a runtime (src/content/a2/index.ts): vanno inclusi nella build.
  outputFileTracingIncludes: {
    "/*": ["src/content/**/*.json"],
  },
  // /a2 apre la prima sezione del corso (prima del rendering, con un vero 307).
  async redirects() {
    return [{ source: "/a2", destination: "/a2/grammatica", permanent: false }];
  },
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
