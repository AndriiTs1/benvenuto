import { access } from "node:fs/promises";
import path from "node:path";
import { getContent, isVisibile } from "@/content/a2";
import { getParole, type ParolaVista } from "@/content/a2/vocabolario";
import meta from "@/content/a2/meta.json";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";
import { isTempo, type Tempo } from "@/lib/tempi";

// Percorso di grammatica A2: ordine da curriculum.json, nomi e sottotitoli da meta.json
// (uguale per tutte le lingue). Il campo title di grammar.json non si usa nell'interfaccia.

type Sottotitolo = Record<Locale, string>;
type MetaUnita = { number: number; title: string; subtitle: Partial<Sottotitolo>; tempo?: string };
type MetaArgomento = { slug: string; title: string; subtitle: Partial<Sottotitolo> };

const UNITA_META = meta.units as Record<string, MetaUnita>;
const ARGOMENTI_META = meta.topics as Record<string, MetaArgomento>;

function sottotitolo(testi: Partial<Sottotitolo>, locale: Locale) {
  return testi[locale] ?? testi[DEFAULT_LOCALE] ?? "";
}

export type ArgomentoPercorso = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  unita: number;
  /** Tempo verbale dell'unità (meta.json → units[].tempo); null = unità secondaria. */
  tempo: Tempo | null;
  /** Posizione nell'unità (da 1) e numero di argomenti dell'unità. */
  indice: number;
  totaleUnita: number;
};

export type UnitaPercorso = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  tempo: Tempo | null;
  argomenti: ArgomentoPercorso[];
};

export type TappaPercorso = { title: string; daUnita: number; aUnita: number };

export async function getPercorso(locale: Locale) {
  const { curriculum } = await getContent(locale);
  const unita: UnitaPercorso[] = curriculum.units.map((u) => {
    const m = UNITA_META[u.id];
    const tempo = isTempo(m.tempo) ? m.tempo : null;
    return {
      id: u.id,
      number: m.number,
      title: m.title,
      subtitle: sottotitolo(m.subtitle, locale),
      tempo,
      argomenti: u.topics.map((id, i) => {
        const t = ARGOMENTI_META[id];
        return {
          id,
          slug: t.slug,
          title: t.title,
          subtitle: sottotitolo(t.subtitle, locale),
          unita: m.number,
          tempo,
          indice: i + 1,
          totaleUnita: u.topics.length,
        };
      }),
    };
  });
  const numero = (id: string) => UNITA_META[id].number;
  const tappe: TappaPercorso[] = curriculum.milestones.map((t) => ({
    title: t.title,
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

export type ParolaChiave = ParolaVista;

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

async function risolviParole(locale: Locale, ids: string[]): Promise<ParolaChiave[]> {
  const perId = await getParole(locale, ids);
  return ids.flatMap((id) => perId.get(id) ?? []);
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
