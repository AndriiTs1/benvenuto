import dati from "@/content/a2/esercizi.json";
import meta from "@/content/a2/meta.json";
import { getContent } from "@/content/a2";
import { getPercorso } from "@/content/a2/grammatica";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";

// Esercizi interattivi (esercizi.json): un insieme per argomento, voci "fill" e "choice".
// Al browser arriva solo l'insieme aperto, con i testi già nella lingua scelta.

type Tradotto = { ru: string } & Partial<Record<Exclude<Locale, "ru">, string>>;

type VoceFill = { id: string; type: "fill"; it: string; hint: string; answers: string[]; why: Tradotto };
type VoceChoice = { id: string; type: "choice"; it: string; options: string[]; answer: number; why: Tradotto };
type Insieme = { topic: string; items: (VoceFill | VoceChoice)[] };
type FileEsercizi = { version: number; istruzioni: Record<"fill" | "choice", Tradotto>; sets: Insieme[] };

const FILE = dati as FileEsercizi;

function tradotto(testo: Tradotto, locale: Locale): { testo: string; lingua: Locale } {
  const proprio = locale === DEFAULT_LOCALE ? undefined : testo[locale]?.trim();
  return proprio ? { testo: proprio, lingua: locale } : { testo: testo.ru, lingua: DEFAULT_LOCALE };
}

/** Una voce pronta per il player (testi di spiegazione già nella lingua scelta). */
export type VoceEsercizio =
  | { id: string; type: "fill"; it: string; hint: string; answers: string[]; why: string; lingua: Locale }
  | { id: string; type: "choice"; it: string; options: string[]; answer: number; why: string; lingua: Locale };

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
    return v.type === "fill"
      ? { id: v.id, type: "fill", it: v.it, hint: v.hint, answers: v.answers, why: testo, lingua }
      : { id: v.id, type: "choice", it: v.it, options: v.options, answer: v.answer, why: testo, lingua };
  });
  return { argomento, voci, istruzioni: istruzioni(locale) };
}

export type RigaEsercizi = { id: string; slug: string; title: string; subtitle: string; ids: string[] };

/** Scheda Esercizi: argomenti del test di metà corso (con insieme) e gli altri, per unità. */
export async function getIndiceEsercizi(locale: Locale) {
  const { grammar } = await getContent(locale);
  const { unita } = await getPercorso(locale);
  const riga = (id: string): RigaEsercizi | null => {
    for (const u of unita) {
      const a = u.argomenti.find((x) => x.id === id);
      if (a) return { id, slug: a.slug, title: a.title, subtitle: a.subtitle, ids: idEsercizi(id) };
    }
    return null;
  };

  // exam.topics[].refs: solo id di argomenti con un insieme ("L14" e simili si saltano), senza doppioni.
  const esame = grammar.exam as { title: string; topics: { name: string; refs: string[] }[] };
  const nelTest = [...new Set(esame.topics.flatMap((t) => t.refs))].filter(haEsercizi);
  const test = nelTest.map(riga).filter((r): r is RigaEsercizi => r !== null);

  const altri = unita
    .map((u) => ({
      numero: u.number,
      titolo: u.title,
      righe: u.argomenti
        .filter((a) => haEsercizi(a.id) && !nelTest.includes(a.id))
        .map((a) => riga(a.id))
        .filter((r): r is RigaEsercizi => r !== null),
    }))
    .filter((u) => u.righe.length > 0);

  return { titoloTest: esame.title, test, altri };
}
