"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { IconCheck, IconX } from "@/components/lezione/ui";
import { Tr } from "@/components/Tr";
import type { Istruzioni, VoceEsercizio } from "@/content/a2/esercizi";
import { salvaMigliore, salvaRisposta } from "@/lib/progress";
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

export function PlayerEsercizi(props: {
  topicId: string;
  titolo: string;
  slug: string;
  voci: VoceEsercizio[];
  istruzioni: Istruzioni;
}) {
  const nelBrowser = useSyncExternalStore(nessuno, () => true, () => false);
  if (!nelBrowser) {
    return <div aria-hidden="true" className="mx-auto h-80 max-w-md rounded-3xl bg-card" />;
  }
  return <Giro {...props} />;
}

function Giro({
  topicId,
  titolo,
  slug,
  voci,
  istruzioni,
}: {
  topicId: string;
  titolo: string;
  slug: string;
  voci: VoceEsercizio[];
  istruzioni: Istruzioni;
}) {
  const [giro, setGiro] = useState(voci);
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
    if (nuova >= giro.length && completo) salvaMigliore(topicId, giro.filter((v) => esiti[v.id]?.ok).length);
    dopoAvanti.current = true;
    setTesto("");
    setPos(nuova);
  }

  function ricomincia(soloErrori: boolean) {
    const nuovo = soloErrori ? giro.filter((v) => !esiti[v.id]?.ok) : voci;
    setGiro(nuovo);
    setCompleto(!soloErrori);
    setOrdiniOpzioni(ordini(nuovo));
    setEsiti({});
    setTesto("");
    dopoAvanti.current = true;
    setPos(0);
  }

  const risposte = Object.keys(esiti).length;

  return (
    <div className="mx-auto w-full max-w-xl space-y-5">
      <header>
        <h1 lang="it" className="text-[24px] leading-[1.2] font-bold tracking-[-0.02em] md:text-[32px]">
          {titolo}
        </h1>
        {/* Nella schermata finale il numero grande è il punteggio: qui niente "12 / 12" che confonde. */}
        {!finito && (
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

      {voce ? (
        <div key={`${voce.id}-${pos}`} className="space-y-4">
          {/* Consegna della voce (task) o quella generale del tipo. */}
          <Tr locale={(voce.task ?? istruzioni[voce.type]).lingua} as="p" size="sm" className="block">
            {(voce.task ?? istruzioni[voce.type]).testo}
          </Tr>

          {voce.type === "choice" && voce.situation ? <Situazione situazione={voce.situation} /> : <Frase voce={voce} esito={esito} />}

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
          onRipeti={() => ricomincia(false)}
          onErrori={() => ricomincia(true)}
        />
      )}
    </div>
  );
}

// Situazione (voci choice con situation): testo nella lingua delle spiegazioni, si sceglie cosa dire.
function Situazione({ situazione }: { situazione: { testo: string; lingua: VoceEsercizio["lingua"] } }) {
  return (
    <Tr locale={situazione.lingua} as="p" className="block rounded-2xl bg-card p-4 text-[19px] leading-snug font-medium outline-none md:text-[20px]">
      <span id="esercizio-frase" tabIndex={-1} className="outline-none">
        {situazione.testo}
      </span>
    </Tr>
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

function Finale({
  giuste,
  totale,
  errori,
  slug,
  onRipeti,
  onErrori,
}: {
  giuste: number;
  totale: number;
  errori: number;
  slug: string;
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
      <button type="button" onClick={onRipeti} className={CAPSULA}>
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
