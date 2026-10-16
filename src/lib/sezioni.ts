// Le 4 sezioni del corso, nell'ordine del menu. I nomi restano sempre in italiano.
// Le classi sono scritte per intero perché Tailwind le trovi.
export type SezioneSlug = "grammatica" | "vocabolario" | "esercizi" | "comunicare";

export const SEZIONI: { slug: SezioneSlug; nome: string; colore: string; sfondo: string }[] = [
  { slug: "grammatica", nome: "Grammatica", colore: "text-grammar", sfondo: "md:bg-grammar-soft" },
  { slug: "vocabolario", nome: "Vocabolario", colore: "text-vocab", sfondo: "md:bg-vocab-soft" },
  { slug: "esercizi", nome: "Esercizi", colore: "text-exercises", sfondo: "md:bg-exercises-soft" },
  { slug: "comunicare", nome: "Comunicare", colore: "text-communicate", sfondo: "md:bg-communicate-soft" },
];
