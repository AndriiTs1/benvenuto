import { access } from "node:fs/promises";
import path from "node:path";
import { getContent, isVisibile } from "@/content/a2";
import meta from "@/content/a2/meta.json";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";

// Percorso di grammatica A2: ordine da curriculum.json, nomi e sottotitoli da meta.json
// (uguale per tutte le lingue). Il campo title di grammar.json non si usa nell'interfaccia.

type Sottotitolo = Record<Locale, string>;
type MetaUnita = { number: number; title: string; subtitle: Partial<Sottotitolo> };
type MetaArgomento = { slug: string; title: string; subtitle: Partial<Sottotitolo> };

const UNITA_META = meta.units as Record<string, MetaUnita>;
const ARGOMENTI_META = meta.topics as Record<string, MetaArgomento>;
export const GRUPPI_GRAMMATICA = meta.grammarGroups as Record<string, string>;

function sottotitolo(testi: Partial<Sottotitolo>, locale: Locale) {
  return testi[locale] ?? testi[DEFAULT_LOCALE] ?? "";
}

export type ArgomentoPercorso = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  unita: number;
  /** Gruppo di grammar.json (chiave di grammarGroups in meta.json). */
  gruppo: number;
  /** Posizione nell'unità (da 1) e numero di argomenti dell'unità. */
  indice: number;
  totaleUnita: number;
};

export type UnitaPercorso = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  argomenti: ArgomentoPercorso[];
};

export type TappaPercorso = { title: string; afterUnit: number; daUnita: number; aUnita: number };

export async function getPercorso(locale: Locale) {
  const { curriculum, grammar } = await getContent(locale);
  const gruppi = new Map(grammar.topics.map((t) => [t.id, t.group]));
  const unita: UnitaPercorso[] = curriculum.units.map((u) => {
    const m = UNITA_META[u.id];
    return {
      id: u.id,
      number: m.number,
      title: m.title,
      subtitle: sottotitolo(m.subtitle, locale),
      argomenti: u.topics.map((id, i) => {
        const t = ARGOMENTI_META[id];
        return {
          id,
          slug: t.slug,
          title: t.title,
          subtitle: sottotitolo(t.subtitle, locale),
          unita: m.number,
          gruppo: gruppi.get(id) ?? 0,
          indice: i + 1,
          totaleUnita: u.topics.length,
        };
      }),
    };
  });
  const numero = (id: string) => UNITA_META[id].number;
  const tappe: TappaPercorso[] = curriculum.milestones.map((t) => ({
    title: t.title,
    afterUnit: numero(t.after_unit),
    daUnita: Math.min(...t.covers.map(numero)),
    aUnita: Math.max(...t.covers.map(numero)),
  }));
  return { unita, argomenti: unita.flatMap((u) => u.argomenti), tappe };
}

// Mappa slug → numero di unità, per il pulsante Indietro nell'intestazione del corso.
export async function unitaPerSlug(locale: Locale): Promise<Record<string, number>> {
  const { argomenti } = await getPercorso(locale);
  return Object.fromEntries(argomenti.map((a) => [a.slug, a.unita]));
}

// irregular_participles_tr in grammar.json: infinito (come nella prima cella di
// irregular_participles) → traduzione in ogni lingua delle spiegazioni.
export type TraduzioniParticipi = Record<string, Partial<Record<Locale, string>>>;

export type ParolaChiave = {
  id: string;
  it: string;
  traduzione: string;
  /** Lingua della traduzione: quella scelta se il vocabolario la ha, altrimenti il russo. */
  lingua: Locale;
  aux?: string;
  participle?: string;
  irregolare: boolean;
  example?: string;
};

export type GruppoParoleChiave = { title?: string; parole: ParolaChiave[] };

// Parole chiave della lezione (keyWords di lezioni.json): un elenco di id (un solo gruppo
// senza titolo) oppure gruppi { title, ids }. Ordine come nel file.
export async function getParoleChiave(
  locale: Locale,
  keyWords: string[] | { title: string; ids: string[] }[],
): Promise<GruppoParoleChiave[]> {
  const gruppi = keyWords.every((k) => typeof k === "string")
    ? [{ title: undefined, ids: keyWords as string[] }]
    : (keyWords as { title: string; ids: string[] }[]);
  const parole = await risolviParole(locale, gruppi.flatMap((g) => g.ids));
  const perId = new Map(parole.map((p) => [p.id, p]));
  return gruppi
    .map((g) => ({ title: g.title, parole: g.ids.flatMap((id) => perId.get(id) ?? []) }))
    .filter((g) => g.parole.length > 0);
}

// Traduzioni di una parola di vocab.json: ru sempre, uk ed en dove ci sono.
export type TraduzioniParola = { ru: string } & Partial<Record<Exclude<Locale, "ru">, string>>;

// Traduzione nella lingua scelta (cookie bv_lang); se manca o è vuota, il russo.
// Da usare ovunque si mostri una parola (parole chiave, griglie, Vocabolario).
export function traduzioneParola(parola: TraduzioniParola, locale: Locale): { testo: string; lingua: Locale } {
  const propria = locale === DEFAULT_LOCALE ? undefined : parola[locale]?.trim();
  return propria ? { testo: propria, lingua: locale } : { testo: parola.ru, lingua: DEFAULT_LOCALE };
}

async function risolviParole(locale: Locale, ids: string[]): Promise<ParolaChiave[]> {
  const { vocab } = await getContent(locale);
  type Parola = (typeof vocab.words)[number] & TraduzioniParola & Partial<Record<"irregular" | "aux" | "participle", string | null>>;
  const perId = new Map(vocab.words.map((w) => [w.id, w as Parola]));
  return ids.flatMap((id) => {
    const w = perId.get(id);
    if (!w) return [];
    const { testo, lingua } = traduzioneParola(w, locale);
    return [
      {
        id,
        it: w.it,
        traduzione: testo,
        lingua,
        aux: w.aux ?? undefined,
        participle: w.participle ?? undefined,
        irregolare: Boolean(w.irregular),
        example: w.example || undefined,
      },
    ];
  });
}

// La lingua in cui il contenuto è davvero scritto: se manca la cartella della lingua, il russo.
async function linguaContenuto(locale: Locale): Promise<Locale> {
  if (locale === DEFAULT_LOCALE) return locale;
  try {
    await access(path.join(process.cwd(), "src/content/a2", locale, "grammar.json"));
    return locale;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export async function getArgomento(locale: Locale, slug: string) {
  const { argomenti } = await getPercorso(locale);
  const posizione = argomenti.findIndex((a) => a.slug === slug);
  if (posizione < 0) return null;
  const argomento = argomenti[posizione];

  const { grammar } = await getContent(locale);
  const contenuto = grammar.topics.find((t) => t.id === argomento.id);
  if (!contenuto) return null;

  const esercizi = grammar.exercises.filter((e) => e.topic === argomento.id && isVisibile(e));

  return {
    argomento,
    contenuto: contenuto as Record<string, unknown>,
    esercizi,
    successivo: argomenti[posizione + 1] ?? null,
    lingua: await linguaContenuto(locale),
  };
}
