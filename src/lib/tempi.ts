import type { CSSProperties } from "react";

// Tempi verbali: le unità con il campo "tempo" in meta.json sono le unità principali del percorso.
// Il colore arriva come variabili CSS (--c, --c-soft) nello style dell'elemento; le classi sono
// statiche (bg-(--c), text-(--c)…): nessun nome di classe costruito a runtime.
export const TEMPI = ["presente", "passato", "imperfetto", "futuro"] as const;

export type Tempo = (typeof TEMPI)[number];

export const STILE_TEMPO: Record<Tempo, CSSProperties> = {
  presente: { "--c": "var(--tempo-presente)", "--c-soft": "var(--tempo-presente-soft)" } as CSSProperties,
  passato: { "--c": "var(--tempo-passato)", "--c-soft": "var(--tempo-passato-soft)" } as CSSProperties,
  imperfetto: { "--c": "var(--tempo-imperfetto)", "--c-soft": "var(--tempo-imperfetto-soft)" } as CSSProperties,
  futuro: { "--c": "var(--tempo-futuro)", "--c-soft": "var(--tempo-futuro-soft)" } as CSSProperties,
};

export function isTempo(valore: unknown): valore is Tempo {
  return TEMPI.includes(valore as Tempo);
}
