import type { ReactNode } from "react";
import { Tr } from "@/components/Tr";
import type { TraduzioniParticipi } from "@/content/a2/grammatica";
import type { Locale } from "@/lib/lingue";

// Sezioni di un argomento di grammar.json, nell'ordine dei campi. Testi nella lingua delle
// spiegazioni → <Tr>; l'italiano resta nel colore principale.

type Tabella = string[][];

// irregular_participles_tr non è una sezione: dà la terza colonna di irregular_participles.
const NASCOSTI = new Set(["id", "group", "title", "lesson", "source", "irregular_participles_tr"]);

const TITOLI_TABELLE: Record<string, string> = {
  table: "Tabella",
  irregular_table: "Verbi irregolari",
  isc_table: "Verbi in -isc",
  agreement: "Accordo",
  tenses: "Nei vari tempi",
  uses: "Quando si usa",
  spelling: "Ortografia",
  irregular_participles: "Participi irregolari",
  irregular_groups: "Participi per gruppi",
  both_aux: "Essere o avere",
  pairs: "Coppie",
  questions: "Domande",
  markers: "Indicatori di tempo",
  textbook_table: "Dal libro",
  range: "Da… a…",
  adverbs: "Avverbi",
  change_verbs: "Verbi di cambiamento",
  emotions: "Le emozioni",
  opposites: "Contrari",
  steps: "Passaggi",
};

// Tabelle in cui la prima riga è già un dato, non un'intestazione.
const SENZA_INTESTAZIONE = new Set([
  "emotions",
  "opposites",
  "irregular_participles",
  "irregular_groups",
  "both_aux",
  "spelling",
  "uses",
  "markers",
  "questions",
  "adverbs",
  "change_verbs",
  "imperfetto",
  "passato_prossimo",
  "steps",
]);

const ESEMPI = ["examples", "more_examples", "board_examples"];
const NOTE = ["notes", "board_note", "pronouns_note"];

const ELENCHI: Record<string, string> = {
  essere_list: "Con essere",
  avere_list: "Con avere",
  time_markers: "Indicatori di tempo",
  comparative: "Comparativo",
  superlative: "Superlativo",
};

const OGGETTI: Record<string, string> = {
  board: "Alla lavagna",
  story_model: "Modello di racconto",
};

function maiuscola(chiave: string) {
  const testo = chiave.replaceAll("_", " ");
  return testo.charAt(0).toUpperCase() + testo.slice(1);
}

function eTabella(valore: unknown): valore is Tabella {
  return (
    Array.isArray(valore) &&
    valore.length > 0 &&
    valore.every((riga) => Array.isArray(riga) && riga.every((cella) => typeof cella === "string"))
  );
}

function eElencoTesti(valore: unknown): valore is string[] {
  return Array.isArray(valore) && valore.every((v) => typeof v === "string");
}

function comeTesti(valore: unknown): string[] {
  if (typeof valore === "string") return [valore];
  return eElencoTesti(valore) ? valore : [];
}

export function Sezione({ titolo, children }: { titolo: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-1.5 px-4 text-[13px] tracking-wide text-label-2 uppercase">{titolo}</h2>
      {children}
    </section>
  );
}

// lingua: lingua in cui è scritto il contenuto (ru se manca quella scelta);
// locale: lingua scelta (cookie bv_lang), per i campi che hanno già tutte le traduzioni.
export function ContenutoArgomento({
  contenuto,
  lingua,
  locale,
}: {
  contenuto: Record<string, unknown>;
  lingua: Locale;
  locale: Locale;
}) {
  return <div className="space-y-6">{sezioni(contenuto, lingua, locale)}</div>;
}

function sezioni(oggetto: Record<string, unknown>, lingua: Locale, locale: Locale): ReactNode[] {
  const risultato: ReactNode[] = [];
  const fatti = new Set<string>();

  for (const [chiave, valore] of Object.entries(oggetto)) {
    if (NASCOSTI.has(chiave) || fatti.has(chiave)) continue;

    if (chiave === "rule" && typeof valore === "string") {
      risultato.push(
        <Sezione key={chiave} titolo="Regola">
          <Tr locale={lingua} as="p" size="md" className="rounded-2xl bg-card p-4">
            {valore}
          </Tr>
        </Sezione>,
      );
    } else if (ESEMPI.includes(chiave)) {
      // Tutti gli esempi in un'unica sezione, al posto del primo campo.
      const esempi = ESEMPI.flatMap((k) => comeTesti(oggetto[k]));
      ESEMPI.forEach((k) => fatti.add(k));
      risultato.push(
        <Sezione key={chiave} titolo="Esempi">
          <Righe testi={esempi} />
        </Sezione>,
      );
    } else if (NOTE.includes(chiave)) {
      const note = NOTE.flatMap((k) => comeTesti(oggetto[k]));
      NOTE.forEach((k) => fatti.add(k));
      risultato.push(
        <Sezione key={chiave} titolo="Note">
          <Righe testi={note} lingua={lingua} />
        </Sezione>,
      );
    } else if (chiave === "mistakes" && eElencoTesti(valore)) {
      risultato.push(
        <Sezione key={chiave} titolo="Errori frequenti">
          <ErroriFrequenti errori={valore} lingua={lingua} />
        </Sezione>,
      );
    } else if (chiave in ELENCHI && eElencoTesti(valore)) {
      risultato.push(
        <Sezione key={chiave} titolo={ELENCHI[chiave]}>
          <Righe testi={valore} lingua={lingua} />
        </Sezione>,
      );
    } else if (chiave === "irregular_participles" && eTabella(valore)) {
      risultato.push(
        <Sezione key={chiave} titolo={TITOLI_TABELLE[chiave]}>
          <TabellaParticipi
            righe={valore}
            traduzioni={(oggetto.irregular_participles_tr ?? {}) as TraduzioniParticipi}
            locale={locale}
          />
        </Sezione>,
      );
    } else if (eTabella(valore)) {
      risultato.push(
        <Sezione key={chiave} titolo={TITOLI_TABELLE[chiave] ?? maiuscola(chiave)}>
          <TabellaCard righe={valore} intestazione={!SENZA_INTESTAZIONE.has(chiave)} />
        </Sezione>,
      );
    } else if (valore && typeof valore === "object" && !Array.isArray(valore)) {
      // Oggetto (board, story_model): sezione con le stesse regole all'interno.
      const { title, ...resto } = valore as Record<string, unknown>;
      risultato.push(
        <section key={chiave} className="space-y-4 rounded-3xl border border-separator p-3 sm:p-4">
          <h2 className="px-1 text-[20px] font-semibold">{OGGETTI[chiave] ?? maiuscola(chiave)}</h2>
          {typeof title === "string" && (
            <Tr locale={lingua} as="p" size="sm" className="-mt-3 px-1">
              {title}
            </Tr>
          )}
          {sezioni(resto, lingua, locale)}
        </section>,
      );
    }
    // Altri formati: non mostrati.
  }
  return risultato;
}

// Righe in una scheda; con lingua sono testi della lingua delle spiegazioni, senza sono italiano.
function Righe({ testi, lingua }: { testi: string[]; lingua?: Locale }) {
  return (
    <ul className="overflow-hidden rounded-2xl bg-card">
      {testi.map((testo, i) => (
        <li
          key={i}
          lang={lingua ? undefined : "it"}
          className={`px-4 py-3 text-[17px] leading-snug ${i > 0 ? "border-t border-separator" : ""}`}
        >
          {lingua ? <Tr locale={lingua}>{testo}</Tr> : testo}
        </li>
      ))}
    </ul>
  );
}

function ErroriFrequenti({ errori, lingua }: { errori: string[]; lingua: Locale }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-error/[0.08] p-4">
      <svg
        role="img"
        aria-label="Attenzione"
        viewBox="0 0 24 24"
        className="mt-0.5 size-5 shrink-0 text-error"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.3 4.1 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.1a2 2 0 0 0-3.4 0z" />
        <path d="M12 9.5v4.5M12 17.25v.01" />
      </svg>
      <ul className="min-w-0 flex-1 space-y-2">
        {errori.map((errore, i) => (
          <Tr key={i} locale={lingua} as="li" size="md" className="block">
            {errore}
          </Tr>
        ))}
      </ul>
    </div>
  );
}

// Tabella in una scheda: su schermi stretti scorre in orizzontale dentro la scheda.
// Le celle sono italiano (colore principale), anche quando contengono qualche parola di spiegazione.
function TabellaCard({ righe, intestazione }: { righe: Tabella; intestazione: boolean }) {
  const testa = intestazione ? righe[0] : null;
  const corpo = intestazione ? righe.slice(1) : righe;
  // Testi brevi su una riga; quelli lunghi vanno a capo ma restano leggibili: se non c'è
  // spazio la tabella scorre invece di schiacciarsi.
  const cella = (testo: string) =>
    `px-4 py-2.5 text-left align-top ${testo.length > 20 ? "min-w-32" : "whitespace-nowrap"}`;
  // Prima colonna con intestazione vuota (io, tu, lui…): etichette delle righe.
  const etichette = testa?.[0] === "";

  return (
    <div className="overflow-x-auto overscroll-x-contain rounded-2xl bg-card">
      <table lang="it" className="w-full border-collapse text-[15px] leading-snug">
        {testa && (
          <thead>
            <tr className="border-b border-separator">
              {testa.map((testo, i) => (
                <th key={i} scope="col" className={`${cella(testo)} text-[13px] font-semibold`}>
                  {testo}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {corpo.map((riga, r) => (
            <tr key={r} className={r > 0 ? "border-t border-separator" : ""}>
              {riga.map((testo, i) =>
                i === 0 && etichette ? (
                  <th key={i} scope="row" className={`${cella(testo)} font-semibold`}>
                    {testo}
                  </th>
                ) : (
                  <td key={i} className={cella(testo)}>
                    {testo}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Participi irregolari: infinito | participio | traduzione. Il participio è ciò che va
// ricordato (grassetto, colore della grammatica). Sotto 640px la traduzione va a capo
// sotto l'infinito, in piccolo: tre colonne a 375px non entrerebbero.
function TabellaParticipi({
  righe,
  traduzioni,
  locale,
}: {
  righe: Tabella;
  traduzioni: TraduzioniParticipi;
  locale: Locale;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-card">
      <table lang="it" className="w-full border-collapse text-[15px] leading-snug">
        <tbody>
          {righe.map(([infinito, participio], r) => {
            const traduzione = traduzioni[infinito]?.[locale];
            return (
              <tr key={r} className={r > 0 ? "border-t border-separator" : ""}>
                <td className="px-4 py-2.5 align-top">
                  {infinito}
                  {traduzione && (
                    <Tr locale={locale} size="xs" className="block sm:hidden">
                      {traduzione}
                    </Tr>
                  )}
                </td>
                <td className="px-4 py-2.5 align-top font-semibold whitespace-nowrap text-grammar">{participio}</td>
                <td className="hidden px-4 py-2.5 align-top sm:table-cell">
                  {traduzione && <Tr locale={locale}>{traduzione}</Tr>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
