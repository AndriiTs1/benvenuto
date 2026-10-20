// Le sezioni del corso, nell'ordine del menu. I nomi restano sempre in italiano.
// Le classi sono scritte per intero perché Tailwind le trovi.
// Esercizi e Comunicare non sono schede: gli esercizi stanno dentro l'argomento,
// /a2/esercizi e /a2/comunicare portano a /a2/grammatica (next.config.ts).
export type SezioneSlug = "grammatica" | "vocabolario";

export const SEZIONI: { slug: SezioneSlug; nome: string; colore: string; sfondo: string }[] = [
  { slug: "grammatica", nome: "Grammatica", colore: "text-grammar", sfondo: "md:bg-grammar-soft" },
  { slug: "vocabolario", nome: "Vocabolario", colore: "text-vocab", sfondo: "md:bg-vocab-soft" },
];
