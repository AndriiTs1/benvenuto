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

// La lingua in cui il contenuto è davvero scritto: se manca la cartella della lingua, il russo.
export async function linguaContenuto(locale: Locale): Promise<Locale> {
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

  const { grammar, vocab } = await getContent(locale);
  const contenuto = grammar.topics.find((t) => t.id === argomento.id);
  if (!contenuto) return null;

  const lezioni = contenuto.lesson.split(",").map((l) => l.trim());
  const parole = vocab.words.filter((w) => lezioni.includes(w.lesson));
  const esercizi = grammar.exercises.filter((e) => e.topic === argomento.id && isVisibile(e));

  return {
    argomento,
    contenuto: contenuto as Record<string, unknown>,
    parole,
    esercizi,
    successivo: argomenti[posizione + 1] ?? null,
    lingua: await linguaContenuto(locale),
  };
}
