"use client";

import { usePathname } from "next/navigation";
import { BackButton } from "@/components/BackButton";

// Indietro nell'intestazione del corso (come la barra di navigazione iOS):
// scheda → Livelli; unità → Grammatica; argomento → la sua unità.
export function CourseBack({ unitaPerSlug }: { unitaPerSlug: Record<string, number> }) {
  const parti = usePathname().split("/").filter(Boolean);

  if (parti[1] === "grammatica" && parti.length > 2) {
    if (parti[2] === "unita") {
      return <BackButton href="/a2/grammatica" label="Grammatica" ariaLabel="Torna a Grammatica" compattoSuTablet />;
    }
    const unita = unitaPerSlug[parti[2]];
    if (unita) {
      return (
        <BackButton
          href={`/a2/grammatica/unita/${unita}`}
          label={`Unità ${unita}`}
          ariaLabel={`Torna all'unità ${unita}`}
          compattoSuTablet
        />
      );
    }
  }

  return <BackButton href="/livello" label="Livelli" ariaLabel="Torna ai livelli" compattoSuTablet />;
}
