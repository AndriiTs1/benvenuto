export type Lezione = { id: string; numero: string; titolo: string; descrizione: string; minuti: number };
export type Modulo = {
  id: number;
  titolo: string;
  lezioniTotali: number;
  lezioni: Lezione[]; // пока заполнены только у модуля 1
  situazione: string; // итоговое задание модуля
};

export const MODULI_A1: Modulo[] = [
  {
    id: 1,
    titolo: "Suoni e alfabeto",
    lezioniTotali: 5,
    lezioni: [
      { id: "1-1", numero: "1.1", titolo: "L'alfabeto", descrizione: "Le 21 lettere e i loro nomi; J, K, W, X, Y nelle parole straniere", minuti: 5 },
      { id: "1-2", numero: "1.2", titolo: "Le vocali", descrizione: "A, E, I, O, U; E e O aperte e chiuse", minuti: 5 },
      { id: "1-3", numero: "1.3", titolo: "C e G", descrizione: "Ca, che, chi, co, cu · ci, ce · ga, ghe, ghi · gi, ge", minuti: 6 },
      { id: "1-4", numero: "1.4", titolo: "GLI, GN, SC", descrizione: "Figlio, bagno, scuola, sciare", minuti: 6 },
      { id: "1-5", numero: "1.5", titolo: "Doppie e accento", descrizione: "Pala e palla, caffè, città", minuti: 5 },
    ],
    situazione: "Come si scrive il tuo nome?",
  },
  { id: 2, titolo: "Ciao! Saluti e presentazioni", lezioniTotali: 5, lezioni: [], situazione: "Presentati a un nuovo vicino" },
  { id: 3, titolo: "Numeri, ore e date", lezioniTotali: 5, lezioni: [], situazione: "Prendi un appuntamento al telefono" },
  { id: 4, titolo: "La famiglia e le persone", lezioniTotali: 5, lezioni: [], situazione: "Parla della tua famiglia" },
  { id: 5, titolo: "Al bar e al supermercato", lezioniTotali: 5, lezioni: [], situazione: "Ordina al bar e paga" },
  { id: 6, titolo: "La casa", lezioniTotali: 5, lezioni: [], situazione: "Descrivi il tuo appartamento" },
  { id: 7, titolo: "In città", lezioniTotali: 5, lezioni: [], situazione: "Chiedi e spiega la strada" },
  { id: 8, titolo: "La mia giornata", lezioniTotali: 5, lezioni: [], situazione: "Racconta la tua giornata" },
  { id: 9, titolo: "Il corpo e la salute", lezioniTotali: 5, lezioni: [], situazione: "Spiega cosa ti fa male" },
  { id: 10, titolo: "Lavoro e tempo libero", lezioniTotali: 5, lezioni: [], situazione: "Racconta il tuo fine settimana" },
];

export function getModulo(id: number): Modulo | undefined {
  return MODULI_A1.find((modulo) => modulo.id === id);
}
