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
  // Argomenti uniti ad altri: il vecchio slug porta al nuovo (teoria ed esercizi).
  async redirects() {
    const percorso = ["/a2", "/a2/esercizi", "/a2/comunicare"].map((source) => ({
      source,
      destination: "/a2/grammatica",
      permanent: false,
    }));
    const argomenti = [["le-tappe-della-coppia", "i-verbi-reciproci"]].flatMap(([vecchio, nuovo]) =>
      ["grammatica", "esercizi"].map((sezione) => ({
        source: `/a2/${sezione}/${vecchio}`,
        destination: `/a2/${sezione}/${nuovo}`,
        permanent: false,
      })),
    );
    return [...percorso, ...argomenti];
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
