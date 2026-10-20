import { readFile } from "node:fs/promises";
import path from "node:path";
import type curriculum from "./ru/curriculum.json";
import type grammar from "./ru/grammar.json";
import type vocab from "./ru/vocab.json";
import esercizi from "./esercizi.json";
import { SHOW_TEXTBOOK_CONTENT } from "@/lib/flags";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";

// I file stanno in src/content/a2/{locale}/; quelli che mancano per una lingua si
// prendono dalla versione russa. Inclusi nella build con outputFileTracingIncludes (next.config.ts).
const CARTELLA = path.join(process.cwd(), "src/content/a2");

type ContenutoA2 = {
  vocab: typeof vocab;
  grammar: typeof grammar;
  curriculum: typeof curriculum;
};

// In produzione i file non cambiano: si leggono una volta sola.
const cache = new Map<string, Promise<unknown>>();

async function leggiJson(locale: Locale, file: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(path.join(CARTELLA, locale, file), "utf8"));
  } catch (error) {
    if (locale !== DEFAULT_LOCALE && (error as NodeJS.ErrnoException).code === "ENOENT") {
      return leggiJson(DEFAULT_LOCALE, file);
    }
    throw error;
  }
}

function leggi<T>(locale: Locale, file: string): Promise<T> {
  const chiave = `${locale}/${file}`;
  if (process.env.NODE_ENV !== "production") return leggiJson(locale, file) as Promise<T>;
  if (!cache.has(chiave)) cache.set(chiave, leggiJson(locale, file));
  return cache.get(chiave) as Promise<T>;
}

export async function getContent(locale: Locale): Promise<ContenutoA2> {
  const [v, g, c] = await Promise.all([
    leggi<ContenutoA2["vocab"]>(locale, "vocab.json"),
    leggi<ContenutoA2["grammar"]>(locale, "grammar.json"),
    leggi<ContenutoA2["curriculum"]>(locale, "curriculum.json"),
  ]);
  return { vocab: v, grammar: g, curriculum: c };
}

const NON_PUBBLICABILE = "не для публикации";

// Contenuto del manuale da nascondere quando SHOW_TEXTBOOK_CONTENT è false (vedi curriculum.json → copyright_rule).
export function isVisibile(item: { source?: string }) {
  return SHOW_TEXTBOOK_CONTENT || !item.source?.includes(NON_PUBBLICABILE);
}

// Numeri della pagina /livello. Esercizi: le voci interattive di esercizi.json (quelle che si fanno).
export async function statisticheA2(locale: Locale) {
  const { grammar, vocab } = await getContent(locale);
  return {
    argomenti: grammar.topics.length,
    parole: vocab.words.length,
    esercizi: esercizi.sets.reduce((n, s) => n + s.items.length, 0),
  };
}
