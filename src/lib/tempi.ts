import type { CSSProperties } from "react";

// Tempi verbali: le unità con il campo "tempo" in meta.json sono le unità principali del percorso.
// Il colore arriva come variabili CSS (--c, --c-soft, --c-shadow) nello style dell'elemento; le classi sono
// statiche (bg-(--c), text-(--c)…): nessun nome di classe costruito a runtime.
export const TEMPI = ["presente", "passato", "imperfetto", "futuro"] as const;

export type Tempo = (typeof TEMPI)[number];

export const STILE_TEMPO: Record<Tempo, CSSProperties> = {
  presente: { "--c": "var(--tempo-presente)", "--c-soft": "var(--tempo-presente-soft)", "--c-shadow": "var(--shadow-tempo-presente)" } as CSSProperties,
  passato: { "--c": "var(--tempo-passato)", "--c-soft": "var(--tempo-passato-soft)", "--c-shadow": "var(--shadow-tempo-passato)" } as CSSProperties,
  imperfetto: { "--c": "var(--tempo-imperfetto)", "--c-soft": "var(--tempo-imperfetto-soft)", "--c-shadow": "var(--shadow-tempo-imperfetto)" } as CSSProperties,
  futuro: { "--c": "var(--tempo-futuro)", "--c-soft": "var(--tempo-futuro-soft)", "--c-shadow": "var(--shadow-tempo-futuro)" } as CSSProperties,
};

export function isTempo(valore: unknown): valore is Tempo {
  return TEMPI.includes(valore as Tempo);
}
