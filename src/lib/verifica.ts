// Controllo delle risposte "fill": spazi ai lati e doppi, maiuscole, apostrofo tipografico (’ = ').
// Uguale a una delle risposte → giusta. Uguale solo senza accenti (e andata / è andata) → giusta,
// ma con l'avviso sull'accento e la forma corretta.

function normale(testo: string) {
  return testo.trim().toLowerCase().replace(/\s+/g, " ").replace(/[’‘`´]/g, "'");
}

function senzaAccenti(testo: string) {
  return testo.normalize("NFD").replace(/\p{Mn}/gu, "");
}

export type Verifica = { ok: boolean; accento?: string };

export function verificaRisposta(data: string, risposte: string[]): Verifica {
  const r = normale(data);
  if (!r) return { ok: false };
  if (risposte.some((g) => normale(g) === r)) return { ok: true };
  const quasi = risposte.find((g) => senzaAccenti(normale(g)) === senzaAccenti(r));
  return quasi ? { ok: true, accento: quasi } : { ok: false };
}
