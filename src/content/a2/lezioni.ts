import { readFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";

// Lezioni di grammatica nel formato v2: src/content/a2/{locale}/lezioni.json → lessons[topicId].
// Nei testi della lingua delle spiegazioni: {{…}} = italiano, **…** = grassetto.
// Nelle celle delle tabelle "parl|o" separa radice e desinenza.

export type EsempioV2 = { it: string; tr: string };

export type LezioneV2 = {
  id: string;
  inBreve: string[];
  formation: { steps: string[] };
  tables: { title: string; header: boolean; rows: string[][]; note?: string }[];
  uses: { text: string; it: string; tr: string }[];
  exceptions: { title: string; text: string; examples: EsempioV2[] }[];
  mistakes: { wrong: string; right: string; why: string }[];
  examples: EsempioV2[];
  summary: string;
  /** Id delle parole di vocab.json da mostrare in "Parole chiave", in quest'ordine. */
  keyWords?: string[];
};

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
