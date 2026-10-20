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
  // Esercizi e Comunicare non sono più schede: i vecchi indirizzi portano al percorso.
  // (?vista=indice di /a2/grammatica si toglie in proxy.ts: qui la query passerebbe alla destinazione.)
  async redirects() {
    return ["/a2", "/a2/esercizi", "/a2/comunicare"].map((source) => ({
      source,
      destination: "/a2/grammatica",
      permanent: false,
    }));
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
