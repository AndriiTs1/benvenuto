import type { ReactNode } from "react";
import { Sezione } from "@/components/grammatica/ContenutoArgomento";
import { Tr } from "@/components/Tr";
import type { EsempioV2, LezioneV2 as Lezione } from "@/content/a2/lezioni";
import type { Locale } from "@/lib/lingue";

// Lezione di grammatica nel formato v2 (src/content/a2/{locale}/lezioni.json).
// Testo della lingua delle spiegazioni → <Tr>; italiano (it, wrong, right, celle) nel colore principale.

const TESTO = "text-[16px] leading-normal md:text-[17px]";

// Cella: "parl|o" → radice + desinenza in grassetto colorato; "-iamo" → tutta colorata.
// Senza a capo solo la parola con la desinenza ("mi vest|iamo": "mi" può andare a capo da sola).
function CellaTabella({ testo }: { testo: string }) {
  if (testo.startsWith("-")) return <span className="font-semibold whitespace-nowrap text-grammar">{testo}</span>;
  const barra = testo.indexOf("|");
  if (barra < 0) return <>{testo}</>;
  const prima = testo.slice(0, barra);
  const dopo = testo.slice(barra + 1);
  const inizioRadice = prima.lastIndexOf(" ") + 1;
  const fineDesinenza = dopo.indexOf(" ") < 0 ? dopo.length : dopo.indexOf(" ");
  return (
    <>
      {prima.slice(0, inizioRadice)}
      <span className="whitespace-nowrap">
        {prima.slice(inizioRadice)}
        <b className="font-semibold text-grammar">{dopo.slice(0, fineDesinenza)}</b>
      </span>
      {dopo.slice(fineDesinenza)}
    </>
  );
}

function Scheda({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-card p-4 ${className}`}>{children}</div>;
}

function Esempio({ esempio, lingua }: { esempio: EsempioV2; lingua: Locale }) {
  return (
    <>
      <p lang="it" className={`${TESTO} font-medium`}>
        {esempio.it}
      </p>
      <Tr locale={lingua} size="sm" className="block">
        {esempio.tr}
      </Tr>
    </>
  );
}

export function LezioneV2({
  lezione,
  lingua,
  dopoTabelle,
}: {
  lezione: Lezione;
  lingua: Locale;
  /** Blocco extra tra le tabelle e "Quando si usa" (es. la griglia dei participi irregolari). */
  dopoTabelle?: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <Sezione titolo="In breve">
        {/* Tinta mescolata con card (non trasparente su bg-grouped): il testo della traduzione resta ≥ 4.5:1. */}
        <ul className="space-y-2 rounded-2xl bg-[color-mix(in_srgb,var(--color-grammar)_10%,var(--card))] p-4">
          {lezione.inBreve.map((punto, i) => (
            <li key={i} className={`flex gap-2.5 ${TESTO}`}>
              <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-grammar" />
              <Tr locale={lingua}>{punto}</Tr>
            </li>
          ))}
        </ul>
      </Sezione>

      <Sezione titolo="Come si forma">
        <Scheda>
          <ol className="space-y-3">
            {lezione.formation.steps.map((passo, i) => (
              <li key={i} className={`flex gap-3 ${TESTO}`}>
                <span
                  aria-hidden="true"
                  className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-grammar text-[13px] font-semibold text-grammar tabular-nums"
                >
                  {i + 1}
                </span>
                <Tr locale={lingua}>{passo}</Tr>
              </li>
            ))}
          </ol>
        </Scheda>
      </Sezione>

      <Sezione titolo="Tabelle">
        <div className="space-y-3">
          {lezione.tables.map((tabella, i) => (
            <TabellaV2 key={i} tabella={tabella} lingua={lingua} />
          ))}
        </div>
      </Sezione>

      {dopoTabelle}

      <Sezione titolo="Quando si usa">
        <ul className="overflow-hidden rounded-2xl bg-card">
          {lezione.uses.map((uso, i) => (
            <li key={i} className={`px-4 py-3 ${i > 0 ? "border-t border-separator" : ""}`}>
              <Tr locale={lingua} size="md" className="block font-medium">
                {uso.text}
              </Tr>
              <p lang="it" className={`mt-1 ${TESTO}`}>
                {uso.it}
              </p>
              <Tr locale={lingua} size="sm" className="block">
                {uso.tr}
              </Tr>
            </li>
          ))}
        </ul>
      </Sezione>

      <Sezione titolo="Eccezioni">
        <div className="space-y-3">
          {lezione.exceptions.map((eccezione, i) => (
            <Scheda key={i}>
              <Tr locale={lingua} size="md" className="block font-semibold">
                {eccezione.title}
              </Tr>
              <Tr locale={lingua} size="md" className="mt-1 block">
                {eccezione.text}
              </Tr>
              <ul className="mt-3 space-y-2 border-t border-separator pt-3">
                {eccezione.examples.map((esempio, j) => (
                  <li key={j}>
                    <Esempio esempio={esempio} lingua={lingua} />
                  </li>
                ))}
              </ul>
            </Scheda>
          ))}
        </div>
      </Sezione>

      <Sezione titolo="Errori frequenti">
        <ul className="space-y-3 rounded-2xl bg-[color-mix(in_srgb,var(--error)_8%,var(--card))] p-4">
          {lezione.mistakes.map((errore, i) => (
            <li key={i} className={i > 0 ? "border-t border-error/15 pt-3" : ""}>
              <p lang="it" className={`flex flex-wrap items-center gap-x-2 ${TESTO}`}>
                <span className="text-error">
                  <span aria-hidden="true">✕ </span>
                  <span className="sr-only">Sbagliato: </span>
                  <s>{errore.wrong}</s>
                </span>
                <span aria-hidden="true" className="text-label-2">
                  →
                </span>
                {/* Su fondo card: il verde di success resta ≥ 4.5:1 anche nel tema chiaro. */}
                <span className="rounded-md bg-card px-1.5 font-medium text-success">
                  <span aria-hidden="true">✓ </span>
                  <span className="sr-only">Corretto: </span>
                  {errore.right}
                </span>
              </p>
              <Tr locale={lingua} size="sm" className="mt-0.5 block">
                {errore.why}
              </Tr>
            </li>
          ))}
        </ul>
      </Sezione>

      <Sezione titolo="Esempi">
        <ul className="overflow-hidden rounded-2xl bg-card">
          {lezione.examples.map((esempio, i) => (
            <li key={i} className={`px-4 py-3 ${i > 0 ? "border-t border-separator" : ""}`}>
              <Esempio esempio={esempio} lingua={lingua} />
            </li>
          ))}
        </ul>
      </Sezione>

      <Sezione titolo="In sintesi">
        <div className={`rounded-2xl border border-grammar bg-card p-4 ${TESTO}`}>
          <Tr locale={lingua}>{lezione.summary}</Tr>
        </div>
      </Sezione>
    </div>
  );
}

// Tabella in una scheda con titolo; fino a 4 colonne sta nella larghezza del telefono.
function TabellaV2({ tabella, lingua }: { tabella: Lezione["tables"][number]; lingua: Locale }) {
  const testa = tabella.header ? tabella.rows[0] : null;
  const corpo = tabella.header ? tabella.rows.slice(1) : tabella.rows;
  // Prima colonna (persone) con pr-2: a 375px quattro colonne entrano senza scorrere.
  const cella = "px-3 py-2.5 text-left align-top";

  return (
    <div className="overflow-hidden rounded-2xl bg-card">
      <Tr locale={lingua} size="sm" className="block px-3 pt-3 pb-1 font-semibold">
        {tabella.title}
      </Tr>
      <div className="overflow-x-auto overscroll-x-contain">
        <table lang="it" className="w-full border-collapse text-[15px] leading-snug md:text-[17px]">
          {testa && (
            <thead>
              <tr className="border-b border-separator">
                {testa.map((testo, i) => (
                  <th key={i} scope="col" className={`${cella} font-semibold ${i === 0 ? "pr-2" : ""}`}>
                    <CellaTabella testo={testo} />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {corpo.map((riga, r) => (
              <tr key={r} className={r > 0 ? "border-t border-separator" : ""}>
                {riga.map((testo, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className={`${cella} pr-2 font-normal whitespace-nowrap text-label-2`}>
                      {testo}
                    </th>
                  ) : (
                    <td key={i} className={cella}>
                      <CellaTabella testo={testo} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tabella.note && (
        <Tr locale={lingua} size="sm" className="block border-t border-separator px-3 py-2.5">
          {tabella.note}
        </Tr>
      )}
    </div>
  );
}
