// Testi nella lingua delle spiegazioni: russo (riferimento e fallback).
export const ru = {
  sezioni: {
    grammatica: "Правила и темы курса",
    vocabolario: "Слова по темам",
  },
  // Avviso sopra un argomento non ancora tradotto (solo vecchio formato, in russo).
  // Per il russo non serve: null = nessun avviso.
  soloInRusso: null as string | null,
  // Riga sotto il titolo del blocco "Parole chiave".
  paroleChiaveNota: "Слова этой темы с переводом и примером",
  // Sottotitolo della sezione «I modi verbali» del percorso.
  modiVerbali: "Наклонения",
};

export type Dizionario = typeof ru;
