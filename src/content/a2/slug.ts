// Forme semplici per URL, ordinamento e ricerca (senza dipendenze: lo usa anche proxy.ts).

/** Minuscole, senza accenti, senza spazi ai lati. */
export function semplice(testo: string) {
  return testo
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .trim();
}

/** "La vita quotidiana" → "la-vita-quotidiana"; "Città e servizi" → "citta-e-servizi". */
export function slugGruppo(nome: string) {
  return semplice(nome)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
