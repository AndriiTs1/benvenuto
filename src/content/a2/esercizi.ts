import dati from "@/content/a2/esercizi.json";
import meta from "@/content/a2/meta.json";
import { getPercorso } from "@/content/a2/grammatica";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";

// Esercizi interattivi (esercizi.json): un insieme per argomento, voci "fill" e "choice".
// Al browser arriva solo l'insieme aperto, con i testi già nella lingua scelta.
// task (facoltativo): consegna della voce al posto di quella generale (istruzioni del tipo).
// situation (solo choice, facoltativa): situazione nella lingua delle spiegazioni al posto della frase
// italiana con "___" (si sceglie la frase intera da dire).

type Tradotto = { ru: string } & Partial<Record<Exclude<Locale, "ru">, string>>;

type VoceFill = { id: string; type: "fill"; task?: Tradotto; it: string; hint: string; answers: string[]; why: Tradotto };
type VoceChoice = {
  id: string;
  type: "choice";
  task?: Tradotto;
  it?: string;
  situation?: Tradotto;
  options: string[];
  answer: number;
  why: Tradotto;
};
type Insieme = { topic: string; items: (VoceFill | VoceChoice)[] };
type FileEsercizi = { version: number; istruzioni: Record<"fill" | "choice", Tradotto>; sets: Insieme[] };

const FILE = dati as FileEsercizi;

function tradotto(testo: Tradotto, locale: Locale): { testo: string; lingua: Locale } {
  const proprio = locale === DEFAULT_LOCALE ? undefined : testo[locale]?.trim();
  return proprio ? { testo: proprio, lingua: locale } : { testo: testo.ru, lingua: DEFAULT_LOCALE };
}

type TestoTradotto = { testo: string; lingua: Locale };

/** Una voce pronta per il player (testi di spiegazione già nella lingua scelta). */
export type VoceEsercizio = { task?: TestoTradotto } & (
  | { id: string; type: "fill"; it: string; hint: string; answers: string[]; why: string; lingua: Locale }
  | {
      id: string;
      type: "choice";
      it: string;
      situation?: TestoTradotto;
      options: string[];
      answer: number;
      why: string;
      lingua: Locale;
    }
);

export type Istruzioni = Record<"fill" | "choice", { testo: string; lingua: Locale }>;

const SLUG_PER_ARGOMENTO = meta.topics as Record<string, { slug: string; title: string }>;

/** Slug delle pagine /a2/esercizi/[slug]: gli argomenti che hanno un insieme (lo usa anche proxy.ts). */
export const SLUG_ESERCIZI: string[] = FILE.sets.map((s) => SLUG_PER_ARGOMENTO[s.topic]?.slug).filter(Boolean);

export function haEsercizi(topicId: string) {
  return FILE.sets.some((s) => s.topic === topicId);
}

/** id delle voci di un argomento (per il progresso "fatti X / N"). */
export function idEsercizi(topicId: string): string[] {
  return FILE.sets.find((s) => s.topic === topicId)?.items.map((i) => i.id) ?? [];
}

export function istruzioni(locale: Locale): Istruzioni {
  return { fill: tradotto(FILE.istruzioni.fill, locale), choice: tradotto(FILE.istruzioni.choice, locale) };
}

export async function getEsercizi(locale: Locale, slug: string) {
  const { argomenti } = await getPercorso(locale);
  const argomento = argomenti.find((a) => a.slug === slug);
  const insieme = argomento && FILE.sets.find((s) => s.topic === argomento.id);
  if (!argomento || !insieme) return null;
  const voci: VoceEsercizio[] = insieme.items.map((v) => {
    const { testo, lingua } = tradotto(v.why, locale);
    const task = v.task && tradotto(v.task, locale);
    return v.type === "fill"
      ? { id: v.id, type: "fill", task, it: v.it, hint: v.hint, answers: v.answers, why: testo, lingua }
      : {
          id: v.id,
          type: "choice",
          task,
          it: v.it ?? "",
          situation: v.situation && tradotto(v.situation, locale),
          options: v.options,
          answer: v.answer,
          why: testo,
          lingua,
        };
  });
  return { argomento, voci, istruzioni: istruzioni(locale) };
}
