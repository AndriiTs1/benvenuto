// Testi nella lingua delle spiegazioni: russo (riferimento e fallback).
export const ru = {
  sezioni: {
    grammatica: "Правила и темы курса",
    vocabolario: "Слова по темам",
    esercizi: "Практика по темам",
    comunicare: "Диалоги и рассказы о себе",
  },
  // Avviso sopra un argomento non ancora tradotto (solo vecchio formato, in russo).
  // Per il russo non serve: null = nessun avviso.
  soloInRusso: null as string | null,
};

export type Dizionario = typeof ru;
