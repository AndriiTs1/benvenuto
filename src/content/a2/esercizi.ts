import dati from "@/content/a2/esercizi.json";
import meta from "@/content/a2/meta.json";
import { getPercorso } from "@/content/a2/grammatica";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";

// Esercizi interattivi (esercizi.json): un insieme per argomento, voci "fill" e "choice".
// Al browser arriva solo l'insieme aperto, con i testi già nella lingua scelta.
// task (facoltativo): consegna della voce al posto di quella generale (istruzioni del tipo).
// situation (solo choice, facoltativa): situationIt — la situazione in italiano; situation — la sua traduzione
// nella lingua delle spiegazioni (al posto della frase italiana con "___": si sceglie la frase intera da dire).

type Tradotto = { ru: string } & Partial<Record<Exclude<Locale, "ru">, string>>;

type VoceFill = { id: string; type: "fill"; task?: Tradotto; it: string; hint: string; answers: string[]; why: Tradotto; tr?: Tradotto };
type VoceChoice = {
  id: string;
  type: "choice";
  task?: Tradotto;
  it?: string;
  situation?: Tradotto;
  situationIt?: string;
  options: string[];
  answer: number;
  why: Tradotto;
  tr?: Tradotto;
};
/** Blocco di una tema grande (> 20 voci): voci di un solo argomento, nell'ordine del blocco. */
type Blocco = { id: string; titolo: { it: string } & Tradotto; items: string[] };
type Insieme = { topic: string; items: (VoceFill | VoceChoice)[]; blocchi?: Blocco[] };
type FileEsercizi = { version: number; istruzioni: Record<"fill" | "choice", Tradotto>; sets: Insieme[] };

const FILE = dati as FileEsercizi;

function tradotto(testo: Tradotto, locale: Locale): { testo: string; lingua: Locale } {
  const proprio = locale === DEFAULT_LOCALE ? undefined : testo[locale]?.trim();
  return proprio ? { testo: proprio, lingua: locale } : { testo: testo.ru, lingua: DEFAULT_LOCALE };
}

type TestoTradotto = { testo: string; lingua: Locale };

/** Una voce pronta per il player (testi di spiegazione già nella lingua scelta). */
export type VoceEsercizio = { task?: TestoTradotto; tr?: TestoTradotto } & (
  | { id: string; type: "fill"; it: string; hint: string; answers: string[]; why: string; lingua: Locale }
  | {
      id: string;
      type: "choice";
      it: string;
      situation?: TestoTradotto;
      situationIt?: string;
      options: string[];
      answer: number;
      why: string;
      lingua: Locale;
    }
);

/** Il blocco aperto nel player: posizione, titolo e il blocco dopo (se c'è). */
export type InfoBlocco = {
  numero: number;
  totale: number;
  titoloIt: string;
  titolo: TestoTradotto;
  successivo?: { numero: number; titoloIt: string };
};

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

/** Blocchi di un argomento (numero da 1, titolo italiano e tradotto, id delle voci); [] senza blocchi. */
export function blocchi(topicId: string, locale: Locale) {
  const insieme = FILE.sets.find((s) => s.topic === topicId);
  return (insieme?.blocchi ?? []).map((b, i) => ({
    numero: i + 1,
    titoloIt: b.titolo.it,
    titolo: tradotto(b.titolo, locale),
    ids: b.items,
  }));
}

/** Pagine /a2/esercizi/[slug]/[blocco] (generateStaticParams e proxy.ts). */
export const PARAMETRI_BLOCCHI: { slug: string; blocco: string }[] = FILE.sets.flatMap((s) =>
  (s.blocchi ?? []).map((_, i) => ({ slug: SLUG_PER_ARGOMENTO[s.topic]?.slug, blocco: String(i + 1) })).filter((p) => p.slug),
);

export function istruzioni(locale: Locale): Istruzioni {
  return { fill: tradotto(FILE.istruzioni.fill, locale), choice: tradotto(FILE.istruzioni.choice, locale) };
}

/** Con `blocco` (numero da 1) solo le voci di quel blocco, nell'ordine del blocco; numero sbagliato → null. */
export async function getEsercizi(locale: Locale, slug: string, blocco?: number) {
  const { argomenti } = await getPercorso(locale);
  const argomento = argomenti.find((a) => a.slug === slug);
  const insieme = argomento && FILE.sets.find((s) => s.topic === argomento.id);
  if (!argomento || !insieme) return null;
  let scelte = insieme.items;
  let infoBlocco: InfoBlocco | undefined;
  if (blocco !== undefined) {
    const elenco = blocchi(argomento.id, locale);
    const b = elenco[blocco - 1];
    if (!Number.isInteger(blocco) || !b) return null;
    const perId = new Map(insieme.items.map((v) => [v.id, v]));
    scelte = b.ids.map((id) => perId.get(id)).filter((v) => v !== undefined);
    const dopo = elenco[blocco];
    infoBlocco = {
      numero: b.numero,
      totale: elenco.length,
      titoloIt: b.titoloIt,
      titolo: b.titolo,
      successivo: dopo && { numero: dopo.numero, titoloIt: dopo.titoloIt },
    };
  }
  const voci: VoceEsercizio[] = scelte.map((v) => {
    const { testo, lingua } = tradotto(v.why, locale);
    const task = v.task && tradotto(v.task, locale);
    const tr = v.tr && tradotto(v.tr, locale);
    return v.type === "fill"
      ? { id: v.id, type: "fill", task, tr, it: v.it, hint: v.hint, answers: v.answers, why: testo, lingua }
      : {
          id: v.id,
          type: "choice",
          task,
          tr,
          it: v.it ?? "",
          situation: v.situation && tradotto(v.situation, locale),
          situationIt: v.situationIt,
          options: v.options,
          answer: v.answer,
          why: testo,
          lingua,
        };
  });
  return { argomento, voci, istruzioni: istruzioni(locale), blocco: infoBlocco };
}
