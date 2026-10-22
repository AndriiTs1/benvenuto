import { getContent } from "@/content/a2";
import { semplice, slugGruppo } from "@/content/a2/slug";
import { DEFAULT_LOCALE, type Locale } from "@/lib/lingue";

// Vocabolario A2 (vocab.json): gruppi tematici, ricerca, scheda di una parola.
// Usato dalla scheda Vocabolario e dalle "Parole chiave" delle lezioni.

const CIRILLICO = /[Ѐ-ӿ]/;

// Traduzioni di una parola: ru sempre, uk ed en dove ci sono.
export type TraduzioniParola = { ru: string } & Partial<Record<Exclude<Locale, "ru">, string>>;

// Traduzione nella lingua scelta (cookie bv_lang); se manca o è vuota, il russo.
export function traduzioneParola(parola: TraduzioniParola, locale: Locale): { testo: string; lingua: Locale } {
  const propria = locale === DEFAULT_LOCALE ? undefined : parola[locale]?.trim();
  return propria ? { testo: propria, lingua: locale } : { testo: parola.ru, lingua: DEFAULT_LOCALE };
}

/** Una parola pronta da mostrare: solo campi in italiano o tradotti (niente note in russo). */
export type ParolaVista = {
  id: string;
  it: string;
  traduzione: string;
  /** Lingua della traduzione: quella scelta se il vocabolario la ha, altrimenti il russo. */
  lingua: Locale;
  pos: string;
  aux?: string;
  participle?: string;
  /** Plurale dei nomi, solo se è italiano (alcuni hanno note in russo: non si mostrano). */
  plural?: string;
  irregolare: boolean;
  example?: string;
};

type ParolaGrezza = TraduzioniParola & {
  id: string;
  it: string;
  pos: string;
  group: number;
  example?: string;
  aux?: string | null;
  participle?: string | null;
  plural?: string | null;
  irregular?: string | null;
};

export function vistaParola(w: ParolaGrezza, locale: Locale): ParolaVista {
  const { testo, lingua } = traduzioneParola(w, locale);
  const plural = w.pos === "noun" && w.plural && !CIRILLICO.test(w.plural) ? w.plural : undefined;
  return {
    id: w.id,
    it: w.it,
    traduzione: testo,
    lingua,
    pos: w.pos,
    aux: w.aux ?? undefined,
    participle: w.participle ?? undefined,
    plural,
    irregolare: Boolean(w.irregular),
    example: w.example || undefined,
  };
}

async function parole(locale: Locale): Promise<ParolaGrezza[]> {
  const { vocab } = await getContent(locale);
  return vocab.words as ParolaGrezza[];
}

// --- Ordinamento e ricerca senza articolo, maiuscole e accenti ---

// Articoli iniziali, anche in coppia: "il / la dentista" → "dentista", "l'antidolorifico" → "antidolorifico".
const ARTICOLO = /^(?:(?:il|lo|la|i|gli|le|un|uno|una)\s+|(?:l|un)'\s*)(?:\/\s*(?:(?:il|lo|la|i|gli|le|un|uno|una)\s+|(?:l|un)'\s*))*/i;

/** Forma per ordinare e cercare: minuscole, senza accenti e senza articolo iniziale. */
export function senzaArticolo(testo: string) {
  return semplice(testo).replace(ARTICOLO, "");
}

export function ordinaParole(lista: ParolaVista[]) {
  return [...lista].sort((a, b) => senzaArticolo(a.it).localeCompare(senzaArticolo(b.it), "it"));
}

// --- Gruppi ---

type Gruppo = { it: string } & TraduzioniParola;

export type GruppoVista = {
  numero: number;
  slug: string;
  it: string;
  sottotitolo: string;
  lingua: Locale;
  totale: number;
};

export async function getGruppi(locale: Locale): Promise<GruppoVista[]> {
  const { vocab } = await getContent(locale);
  const gruppi = (vocab as unknown as { gruppi: Record<string, Gruppo> }).gruppi;
  const lista = await parole(locale);
  return Object.entries(gruppi)
    .map(([numero, g]) => {
      const { testo, lingua } = traduzioneParola(g, locale);
      return {
        numero: Number(numero),
        slug: slugGruppo(g.it),
        it: g.it,
        sottotitolo: testo,
        lingua,
        totale: lista.filter((w) => w.group === Number(numero)).length,
      };
    })
    .sort((a, b) => a.numero - b.numero);
}

// Filtri della pagina del gruppo: per parte del discorso (pos).
export const TIPI = [
  { slug: "verbi", nome: "Verbi", pos: ["verb"] },
  { slug: "nomi", nome: "Nomi", pos: ["noun", "adjective/noun"] },
  { slug: "aggettivi", nome: "Aggettivi", pos: ["adjective", "adjective/adverb", "adjective/noun"] },
  { slug: "espressioni", nome: "Espressioni", pos: ["expression"] },
] as const;

export async function getGruppo(locale: Locale, slug: string) {
  const gruppi = await getGruppi(locale);
  const gruppo = gruppi.find((g) => g.slug === slug);
  if (!gruppo) return null;
  const lista = (await parole(locale)).filter((w) => w.group === gruppo.numero).map((w) => vistaParola(w, locale));
  return { gruppo, parole: ordinaParole(lista) };
}

/** Ricerca per italiano (senza articolo) e per traduzione nella lingua scelta. */
export async function cercaParole(locale: Locale, query: string): Promise<ParolaVista[]> {
  const q = senzaArticolo(query);
  if (!q) return [];
  const trovate = (await parole(locale))
    .map((w) => vistaParola(w, locale))
    .filter((w) => senzaArticolo(w.it).includes(q) || semplice(w.traduzione).includes(q));
  return ordinaParole(trovate);
}

export async function getParole(locale: Locale, ids: string[]): Promise<Map<string, ParolaVista>> {
  const perId = new Map((await parole(locale)).map((w) => [w.id, w]));
  return new Map(ids.flatMap((id) => (perId.has(id) ? [[id, vistaParola(perId.get(id)!, locale)] as const] : [])));
}
