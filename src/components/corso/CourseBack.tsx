"use client";

import { usePathname } from "next/navigation";
import { BackButton } from "@/components/BackButton";

// Indietro nell'intestazione del corso (come la barra di navigazione iOS):
// scheda → Livelli; unità → Percorso (Grammatica); argomento → la sua unità;
// esercizi di un argomento → l'argomento (stesso slug); gruppo → Vocabolario.
export function CourseBack({ unitaPerSlug }: { unitaPerSlug: Record<string, number> }) {
  const parti = usePathname().split("/").filter(Boolean);

  if (parti[1] === "grammatica" && parti.length > 2) {
    if (parti[2] === "unita") {
      return <BackButton href="/a2/grammatica" label="Percorso" ariaLabel="Torna al percorso" compattoSuTablet />;
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

  if (parti[1] === "esercizi" && parti.length > 2) {
    return (
      <BackButton href={`/a2/grammatica/${parti[2]}`} label="Argomento" ariaLabel="Torna all'argomento" compattoSuTablet />
    );
  }
  if (parti[1] === "vocabolario" && parti.length > 2) {
    return <BackButton href="/a2/vocabolario" label="Vocabolario" ariaLabel="Torna al Vocabolario" compattoSuTablet />;
  }

  return <BackButton href="/livello" label="Livelli" ariaLabel="Torna ai livelli" compattoSuTablet />;
}
