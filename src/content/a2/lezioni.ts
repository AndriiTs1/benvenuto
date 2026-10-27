import { readFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";

// Lezioni di grammatica nel formato v2: src/content/a2/{locale}/lezioni.json → lessons[topicId].
// Nei testi della lingua delle spiegazioni: {{…}} = italiano, **…** = grassetto.
// Nelle celle delle tabelle "parl|o" separa radice e desinenza.

export type EsempioV2 = { it: string; tr: string };

export type GruppoParole = { title: string; ids: string[] };

/** Tabella normale: righe di celle (la prima è l'intestazione se header). */
export type TabellaClassica = { type?: undefined; title: string; header: boolean; rows: string[][]; note?: string };

/** Griglia di coppie con traduzione: "a sep b" (b facoltativo; sep vuoto = solo a) + tr. */
export type TabellaCoppie = {
  type: "pairs";
  title: string;
  sep: string;
  items: { a: string; b?: string; tr: string }[];
  note?: string;
};

/** Formula della forma: parti unite da "+", con esempi divisi nelle stesse parti. Una parte è in italiano
 *  oppure { tr } nella lingua delle spiegazioni (es. "основа futuro"). */
export type ParteFormula = string | { tr: string };

export type Formula = {
  parts: ParteFormula[];
  examples: { parts: string[]; it: string; tr: string }[];
};

/** "Essere o avere?": gruppi di verbi per ausiliare (verbs può essere vuoto: solo titolo e testo).
 *  intro (facoltativo): un test a passi numerati, in cima al blocco. */
export type SceltaAusiliare = {
  title: string;
  intro?: { title: string; steps: string[] };
  groups: {
    aux: "essere" | "avere";
    title: string;
    text: string;
    verbs: { id: string; it: string; participle: string; tr: string }[];
  }[];
};

export type LezioneV2 = {
  id: string;
  inBreve: string[];
  /** Con formula: formula, esempi e passi si vedono subito dopo "In breve" (non in Approfondisci).
   *  note (facoltativa): riga sotto i passi (es. "Подсказка: …"). */
  formation: { steps: string[]; formula?: Formula; note?: string };
  tables: (TabellaClassica | TabellaCoppie)[];
  uses: { text: string; it: string; tr: string }[];
  exceptions: { title: string; text: string; examples: EsempioV2[] }[];
  mistakes: { wrong: string; right: string; why: string }[];
  examples: EsempioV2[];
  /** "In sintesi"; senza summary il blocco non c'è. */
  summary?: string;
  auxChoice?: SceltaAusiliare;
  /** Parole di vocab.json per "Parole chiave", in quest'ordine: elenco di id oppure gruppi con titolo. */
  keyWords?: string[] | GruppoParole[];
  /** Figure con le parti indicate (content/a2/figure/<id>.json), dopo "Come si forma" e prima di "Tabelle". */
  figure?: string[];
  /** Collegamenti a un altro argomento: "start" sotto il titolo, "end" in fondo alla pagina. */
  links?: CollegamentoV2[];
};

/** it: testo del collegamento (italiano); tr: traduzione; topic: id dell'argomento (meta.json). */
export type CollegamentoV2 = { at: "start" | "end"; it: string; tr: string; topic: string };

type FileLezioni = { version: number; lessons: Record<string, LezioneV2> };

const CARTELLA = path.join(process.cwd(), "src/content/a2");

// In produzione i file non cambiano: si leggono una volta sola.
const cache = new Map<Locale, Promise<FileLezioni | null>>();

async function leggiFile(locale: Locale): Promise<FileLezioni | null> {
  try {
    return JSON.parse(await readFile(path.join(CARTELLA, locale, "lezioni.json"), "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function lezioni(locale: Locale) {
  if (process.env.NODE_ENV !== "production") return leggiFile(locale);
  if (!cache.has(locale)) cache.set(locale, leggiFile(locale));
  return cache.get(locale)!;
}

// Lezione v2 dell'argomento nella lingua scelta, altrimenti in russo; null se non esiste (vecchio formato).
export async function getLezioneV2(
  locale: Locale,
  topicId: string,
): Promise<{ lezione: LezioneV2; lingua: Locale } | null> {
  const propria = (await lezioni(locale))?.lessons[topicId];
  if (propria) return { lezione: propria, lingua: locale };
  if (locale === DEFAULT_LOCALE) return null;
  const russa = (await lezioni(DEFAULT_LOCALE))?.lessons[topicId];
  return russa ? { lezione: russa, lingua: DEFAULT_LOCALE } : null;
}
