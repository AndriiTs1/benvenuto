"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { IconCheck, IconX } from "@/components/lezione/ui";
import { Tr } from "@/components/Tr";
import type { InfoBlocco, Istruzioni, VoceEsercizio } from "@/content/a2/esercizi";
import { cancellaGiro, leggiGiro, salvaGiro, salvaMigliore, salvaRisposta, type GiroSalvato } from "@/lib/progress";
import { verificaRisposta } from "@/lib/verifica";

// Player degli esercizi: una voce alla volta, poi il risultato finale.
// Gira solo nel browser: l'ordine delle opzioni è casuale a ogni giro e così server e
// client non devono coincidere (sul server si vede solo lo scheletro).

type Esito = { ok: boolean; data: string; accento?: string; scelta?: number };

const CAPSULA =
  "flex h-[52px] w-full items-center justify-center rounded-full bg-(--primario) text-[17px] font-semibold text-bg transition hover:opacity-90 active:scale-[0.98] disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mx-auto md:w-80";
const CAPSULA_2 =
  "flex h-[52px] w-full items-center justify-center rounded-full bg-label/[0.08] text-[17px] font-semibold text-label transition hover:bg-label/[0.12] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-label/[0.16] md:mx-auto md:w-80";

function mescola(n: number) {
  const ordine = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ordine[i], ordine[j]] = [ordine[j], ordine[i]];
  }
  return ordine;
}

// Nuovo ordine delle opzioni per ogni voce "choice" del giro.
function ordini(voci: VoceEsercizio[]) {
  return Object.fromEntries(voci.flatMap((v) => (v.type === "choice" ? [[v.id, mescola(v.options.length)]] : [])));
}

const nessuno = () => () => {};

// Il giro salvato vale solo se combacia con le voci di adesso (il contenuto può essere cambiato).
function giroValido(g: GiroSalvato | null, voci: VoceEsercizio[]): g is GiroSalvato {
  if (!g || g.ids.length === 0) return false;
  const perId = new Map(voci.map((v) => [v.id, v]));
  const risposte = Object.keys(g.esiti).length;
  return (
    g.ids.every((id) => {
      const v = perId.get(id);
      return v !== undefined && (v.type !== "choice" || g.ordini[id]?.length === v.options.length);
    }) &&
    g.pos >= 0 &&
    g.pos < g.ids.length &&
    (g.pos > 0 || risposte > 0)
  );
}

// chiave: dove si salva il giro (topicId, o `${topicId}#${n}` per un blocco); blocco: il blocco aperto, se c'è.
export function PlayerEsercizi(props: {
  topicId: string;
  chiave: string;
  titolo: string;
  slug: string;
  voci: VoceEsercizio[];
  istruzioni: Istruzioni;
  blocco?: InfoBlocco;
}) {
  const nelBrowser = useSyncExternalStore(nessuno, () => true, () => false);
  if (!nelBrowser) {
    return <div aria-hidden="true" className="mx-auto h-80 max-w-md rounded-3xl bg-card" />;
  }
  return <Giro key={props.chiave} {...props} />;
}

// Nello stato solo gli id: i testi arrivano sempre da `voci`, così dopo il cambio di lingua (router.refresh) si vedono nella lingua nuova.
// Il giro in corso si salva in localStorage (benvenuto.giro.a2): riaprendo la pagina si sceglie Continua o Ricomincia.
function Giro({
  topicId,
  chiave,
  titolo,
  slug,
  voci,
  istruzioni,
  blocco,
}: {
  topicId: string;
  chiave: string;
  titolo: string;
  slug: string;
  voci: VoceEsercizio[];
  istruzioni: Istruzioni;
  blocco?: InfoBlocco;
}) {
  // Solo al primo rendering (il componente gira solo nel browser): giro salvato da riprendere, se vale ancora.
  const [salvato, setSalvato] = useState(() => {
    // Argomento a blocchi: il vecchio giro salvato "su tutto l'argomento" non serve più.
    if (blocco) cancellaGiro(topicId);
    const g = leggiGiro(chiave);
    if (giroValido(g, voci)) return g;
    if (g) cancellaGiro(chiave);
    return null;
  });
  const [giroIds, setGiroIds] = useState(() => voci.map((v) => v.id));
  const perId = new Map(voci.map((v) => [v.id, v]));
  const giro = giroIds.map((id) => perId.get(id)).filter((v): v is VoceEsercizio => v !== undefined);
  const [completo, setCompleto] = useState(true);
  const [ordiniOpzioni, setOrdiniOpzioni] = useState(() => ordini(voci));
  const [pos, setPos] = useState(0);
  const [esiti, setEsiti] = useState<Record<string, Esito>>({});
  const [testo, setTesto] = useState("");
  const avanti = useRef<HTMLButtonElement>(null);
  const campo = useRef<HTMLInputElement>(null);
  const dopoAvanti = useRef(false);

  const finito = pos >= giro.length;
  const voce = finito ? null : giro[pos];
  const esito = voce ? esiti[voce.id] : undefined;
  const giuste = giro.filter((v) => esiti[v.id]?.ok).length;

  const risposte = Object.keys(esiti).length;

  // Si salva il giro in corso (non la schermata di scelta); a giro finito si cancella.
  useEffect(() => {
    if (salvato) return;
    if (finito) cancellaGiro(chiave);
    else if (pos > 0 || risposte > 0) salvaGiro(chiave, { ids: giroIds, pos, esiti, ordini: ordiniOpzioni, completo });
  }, [salvato, finito, chiave, giroIds, pos, esiti, risposte, ordiniOpzioni, completo]);

  // Dopo la verifica il fuoco va su "Avanti"; passando alla voce dopo, sul campo di risposta.
  useEffect(() => {
    if (esito) avanti.current?.focus();
  }, [esito]);
  useEffect(() => {
    if (!dopoAvanti.current) return;
    dopoAvanti.current = false;
    if (campo.current) campo.current.focus();
    else document.getElementById("esercizio-frase")?.focus();
  }, [pos]);

  function registra(v: VoceEsercizio, e: Esito) {
    setEsiti((prima) => ({ ...prima, [v.id]: e }));
    salvaRisposta(v.id, e.ok);
  }

  function verificaFill(event: FormEvent) {
    event.preventDefault();
    if (!voce || voce.type !== "fill" || esito || !testo.trim()) return;
    const { ok, accento } = verificaRisposta(testo, voce.answers);
    registra(voce, { ok, accento, data: testo.trim() });
  }

  function scegli(indice: number) {
    if (!voce || voce.type !== "choice" || esito) return;
    registra(voce, { ok: indice === voce.answer, data: voce.options[indice], scelta: indice });
  }

  function prossima() {
    const nuova = pos + 1;
    if (nuova >= giro.length && completo) salvaMigliore(chiave, giro.filter((v) => esiti[v.id]?.ok).length);
    dopoAvanti.current = true;
    setTesto("");
    setPos(nuova);
  }

  function ricomincia(soloErrori: boolean) {
    cancellaGiro(chiave);
    const nuovo = soloErrori ? giro.filter((v) => !esiti[v.id]?.ok) : voci;
    setGiroIds(nuovo.map((v) => v.id));
    setCompleto(!soloErrori);
    setOrdiniOpzioni(ordini(nuovo));
    setEsiti({});
    setTesto("");
    dopoAvanti.current = true;
    setPos(0);
  }

  function continua(g: GiroSalvato) {
    setGiroIds(g.ids);
    setCompleto(g.completo);
    setOrdiniOpzioni(g.ordini);
    setEsiti(g.esiti);
    setTesto("");
    setSalvato(null);
    dopoAvanti.current = true;
    setPos(g.pos);
  }

  function daCapo() {
    setSalvato(null);
    ricomincia(false);
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-5">
      <header>
        <h1 lang="it" className="text-[24px] leading-[1.2] font-bold tracking-[-0.02em] md:text-[32px]">
          {titolo}
        </h1>
        {blocco && (
          <>
            <p lang="it" className="mt-1 text-[15px] text-label-2">
              Blocco {blocco.numero} di {blocco.totale} · {blocco.titoloIt}
            </p>
            <Tr locale={blocco.titolo.lingua} as="p" size="sm" className="block">
              {blocco.titolo.testo}
            </Tr>
          </>
        )}
        {/* Nella schermata finale il numero grande è il punteggio: qui niente "12 / 12" che confonde. */}
        {!finito && !salvato && (
          <p className="mt-2 text-[15px] text-label-2 tabular-nums" aria-live="polite">
            {pos + 1} / {giro.length}
          </p>
        )}
        <div
          role="progressbar"
          aria-label="Esercizi fatti"
          aria-valuemin={0}
          aria-valuemax={giro.length}
          aria-valuenow={risposte}
          className="mt-2 h-1 overflow-hidden rounded-full bg-label/[0.08] dark:bg-label/[0.16]"
        >
          <div
            className="h-full rounded-full bg-exercises transition-[width] duration-300"
            style={{ width: `${(risposte / Math.max(giro.length, 1)) * 100}%` }}
          />
        </div>
      </header>

      {salvato ? (
        <Ripresa fatti={salvato.pos} totale={salvato.ids.length} onContinua={() => continua(salvato)} onRicomincia={daCapo} />
      ) : voce ? (
        <div key={`${voce.id}-${pos}`} className="space-y-4">
          {/* Consegna della voce (task) o quella generale del tipo. */}
          <Tr locale={(voce.task ?? istruzioni[voce.type]).lingua} as="p" size="sm" className="block">
            {(voce.task ?? istruzioni[voce.type]).testo}
          </Tr>

          {voce.type === "choice" && voce.situation && voce.situationIt ? (
            <Situazione situazioneIt={voce.situationIt} traduzione={voce.situation} />
          ) : (
            <Frase voce={voce} esito={esito} />
          )}

          {voce.type === "fill" ? (
            <form onSubmit={verificaFill} className="space-y-3">
              <input
                ref={campo}
                id="risposta"
                name="risposta"
                type="text"
                lang="it"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                aria-label="Risposta"
                value={esito ? esito.data : testo}
                onChange={(e) => setTesto(e.target.value)}
                readOnly={!!esito}
                className={`h-12 w-full rounded-2xl bg-card px-4 text-[17px] text-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-md:text-center ${
                  esito ? (esito.ok ? "text-success" : "text-error") : ""
                }`}
              />
              {!esito && (
                <button type="submit" disabled={!testo.trim()} className={CAPSULA}>
                  Verifica
                </button>
              )}
            </form>
          ) : (
            <ul className="space-y-2">
              {ordiniOpzioni[voce.id].map((i) => {
                const scelta = esito?.scelta === i;
                const giusta = i === voce.answer;
                const stato = !esito
                  ? "border-transparent"
                  : giusta && (scelta || !esito.ok)
                    ? "border-success text-success"
                    : scelta
                      ? "border-error text-error"
                      : "border-transparent opacity-60";
                return (
                  <li key={i}>
                    <button
                      type="button"
                      lang="it"
                      disabled={!!esito}
                      aria-pressed={scelta}
                      onClick={() => scegli(i)}
                      className={`flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border-2 bg-card px-4 text-[17px] font-medium transition active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${stato}`}
                    >
                      {esito && giusta && (scelta || !esito.ok) && <IconCheck className="size-5" />}
                      {esito && scelta && !giusta && <IconX className="size-5" />}
                      {voce.options[i]}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {esito && (
            <div className="space-y-4">
              <div role="status" className="rounded-2xl bg-card p-4">
                <p className={`flex items-center gap-2 text-[17px] font-semibold max-md:justify-center ${esito.ok ? "text-success" : "text-error"}`}>
                  {esito.ok ? <IconCheck className="size-5" /> : <IconX className="size-5" />}
                  {esito.ok ? "Giusto!" : "Sbagliato"}
                </p>
                {esito.accento && (
                  <p lang="it" className="mt-1 text-[16px]">
                    Attenzione all&apos;accento: <strong className="font-semibold">{esito.accento}</strong>
                  </p>
                )}
                {!esito.ok && (
                  <p lang="it" className="mt-1 text-[16px]">
                    Risposta corretta:{" "}
                    <strong className="font-semibold">
                      {voce.type === "fill" ? voce.answers[0] : voce.options[voce.answer]}
                    </strong>
                  </p>
                )}
                {voce.tr && (
                  <Tr locale={voce.tr.lingua} as="p" size="sm" className="mt-2 block">
                    {voce.tr.testo}
                  </Tr>
                )}
                <Tr locale={voce.lingua} as="p" size="sm" className="mt-2 block">
                  {voce.why}
                </Tr>
              </div>
              <button ref={avanti} type="button" onClick={prossima} className={CAPSULA}>
                Avanti
              </button>
            </div>
          )}
        </div>
      ) : (
        <Finale
          giuste={giuste}
          totale={giro.length}
          errori={giro.length - giuste}
          slug={slug}
          successivo={blocco?.successivo}
          onRipeti={() => ricomincia(false)}
          onErrori={() => ricomincia(true)}
        />
      )}
    </div>
  );
}

// Situazione (voci choice con situation): testo nella lingua delle spiegazioni, si sceglie cosa dire.
function Situazione({
  situazioneIt,
  traduzione,
}: {
  situazioneIt: string;
  traduzione: { testo: string; lingua: VoceEsercizio["lingua"] };
}) {
  return (
    <div className="rounded-2xl bg-card p-4">
      <p lang="it" id="esercizio-frase" tabIndex={-1} className="text-[19px] leading-snug font-medium outline-none md:text-[20px]">
        {situazioneIt}
      </p>
      <Tr locale={traduzione.lingua} as="p" size="sm" className="mt-1.5 block">
        {traduzione.testo}
      </Tr>
    </div>
  );
}

// La frase con il vuoto "___": sottolineato; dopo la verifica dentro c'è la risposta data.
function Frase({ voce, esito }: { voce: VoceEsercizio; esito?: Esito }) {
  const [prima, dopo] = voce.it.split("___");
  return (
    <p id="esercizio-frase" tabIndex={-1} lang="it" className="text-[21px] leading-relaxed font-medium outline-none md:text-[22px]">
      {prima}
      <span
        className={`mx-1 inline-block min-w-[4.5rem] border-b-2 px-1 text-center ${
          esito ? (esito.ok ? "border-success text-success" : "border-error text-error") : "border-label-2"
        }`}
      >
        {esito ? esito.data : <span className="sr-only">spazio vuoto</span>}
        {!esito && " "}
      </span>
      {voce.type === "fill" && <span className="text-label-2">({voce.hint})</span>}
      {dopo}
    </p>
  );
}

// Riaprendo la pagina con un giro a metà: continuare da lì o ricominciare da 1.
function Ripresa({
  fatti,
  totale,
  onContinua,
  onRicomincia,
}: {
  fatti: number;
  totale: number;
  onContinua: () => void;
  onRicomincia: () => void;
}) {
  return (
    <div className="space-y-4 text-center">
      <div className="rounded-3xl bg-card px-4 py-8 text-center">
        <p id="esercizio-frase" tabIndex={-1} className="text-[48px] leading-none font-bold tabular-nums outline-none">
          {fatti} / {totale}
        </p>
        <p className="mt-2 text-[17px] text-label-2">esercizi fatti</p>
      </div>
      <button type="button" onClick={onContinua} className={CAPSULA}>
        Continua dal {fatti + 1}
      </button>
      <button type="button" onClick={onRicomincia} className={CAPSULA_2}>
        Ricomincia
      </button>
    </div>
  );
}

function Finale({
  giuste,
  totale,
  errori,
  slug,
  successivo,
  onRipeti,
  onErrori,
}: {
  giuste: number;
  totale: number;
  errori: number;
  slug: string;
  successivo?: { numero: number; titoloIt: string };
  onRipeti: () => void;
  onErrori: () => void;
}) {
  return (
    <div className="space-y-4 text-center">
      <div className="rounded-3xl bg-card px-4 py-8">
        <p id="esercizio-frase" tabIndex={-1} className="text-[48px] leading-none font-bold tabular-nums outline-none">
          {giuste} / {totale}
        </p>
        <p className="mt-2 text-[17px] text-label-2">risposte giuste</p>
      </div>
      {/* Blocco con un seguito: prima il blocco successivo, "Ripeti" diventa secondario. */}
      {successivo && (
        <Link href={`/a2/esercizi/${slug}/${successivo.numero}`} transitionTypes={["nav-forward"]} className={CAPSULA}>
          Blocco successivo →
        </Link>
      )}
      <button type="button" onClick={onRipeti} className={successivo ? CAPSULA_2 : CAPSULA}>
        Ripeti
      </button>
      {errori > 0 && (
        <button type="button" onClick={onErrori} className={CAPSULA_2}>
          Solo gli errori
        </button>
      )}
      <Link
        href={`/a2/grammatica/${slug}`}
        transitionTypes={["nav-back"]}
        className="flex min-h-11 items-center justify-center rounded-full px-4 text-[17px] font-medium text-label hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Torna all&apos;argomento
      </Link>
    </div>
  );
}
