import type { Locale } from "@/lib/lingue";
import { en } from "./en";
import { ru, type Dizionario } from "./ru";
import { uk } from "./uk";

// Le lingue senza un file proprio usano il russo.
const DIZIONARI: Partial<Record<Locale, Dizionario>> = { ru, uk, en };

export function dizionario(locale: Locale): Dizionario {
  return DIZIONARI[locale] ?? ru;
}
