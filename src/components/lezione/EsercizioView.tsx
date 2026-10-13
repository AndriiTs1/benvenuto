"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Esercizio } from "@/content/types";
import { aggiungiErrore } from "@/lib/progress";
import { RATE_LENTO, speak, useSpeechAvailable } from "@/lib/speech";
import { Abbina } from "./Abbina";
import { AudioNonDisponibile } from "./AudioNonDisponibile";
import { CAPSULA, FOCUS, IconCheck, IconSpeaker, IconX, RIEMPIMENTO } from "./ui";

export type Risultato = {
  corretto: boolean;
  aiuto: boolean;
  datoUtente: string;
  rispostaGiusta: string;
};

type EsercizioViewProps = {
  esercizio: Esercizio;
  numero: number;
  lezioneId: string;
  onContinua: (risultato: Risultato) => void;
};

// Сравнение письменного ответа: без учёта регистра и пробелов.
function normalizza(testo: string) {
  return testo.replace(/\s+/g, "").toUpperCase();
}

export function EsercizioView({ esercizio, numero, lezioneId, onContinua }: EsercizioViewProps) {
  const audioDisponibile = useSpeechAvailable();
  const [risposta, setRisposta] = useState("");
  const [risultato, setRisultato] = useState<Risultato | null>(null);
  const [aiutoAperto, setAiutoAperto] = useState(false);
  const [suggerimentoVisibile, setSuggerimentoVisibile] = useState(false);
  const [aiutoUsato, setAiutoUsato] = useState(false);
  const continuaRef = useRef<HTMLButtonElement>(null);
  const audio = "audio" in esercizio ? esercizio.audio : null;

  // Звук задания играет один раз при появлении.
  useEffect(() => {
    if (audio) speak(audio);
  }, [audio]);

  // После проверки фокус переходит на «Continua», чтобы урок проходился с клавиатуры.
  useEffect(() => {
    if (risultato) continuaRef.current?.focus();
  }, [risultato]);

  function concludi(esito: Omit<Risultato, "aiuto">) {
    const completo = { ...esito, aiuto: aiutoUsato };
    setRisultato(completo);
    if (!completo.corretto || completo.aiuto) {
      aggiungiErrore({
        lezione: lezioneId,
        esercizio: numero,
        datoUtente: completo.datoUtente,
        rispostaGiusta: completo.rispostaGiusta,
        aiuto: completo.aiuto,
        data: new Date().toISOString(),
      });
    }
  }

  function verifica(event?: FormEvent) {
    event?.preventDefault();
    if (risultato || esercizio.tipo === "abbina" || !risposta.trim()) return;
    const giusta = esercizio.risposta;
    const corretto =
      esercizio.tipo === "ascolta-scrivi"
        ? normalizza(risposta) === normalizza(giusta)
        : risposta === giusta;
    const datoUtente = esercizio.tipo === "ascolta-scrivi" ? risposta.trim().toUpperCase() : risposta;
    concludi({ corretto, datoUtente, rispostaGiusta: giusta });
  }

  function abbinaFinito(errori: string[]) {
    if (esercizio.tipo !== "abbina") return;
    concludi({
      corretto: errori.length === 0,
      datoUtente: errori.join(", "),
      rispostaGiusta: esercizio.coppie.map(([l, nome]) => `${l} – ${nome}`).join(", "),
    });
  }

  function usaAiuto() {
    setAiutoUsato(true);
  }

  return (
    <form onSubmit={verifica} className="flex flex-1 flex-col">
      <h1 className="text-[22px] leading-tight font-bold">{esercizio.istruzione}</h1>

      <div className="flex flex-1 flex-col justify-center gap-8 py-8">
        {audio && (
          <div className="flex flex-col items-center gap-2">
            {audioDisponibile ? (
              <>
                <button
                  type="button"
                  aria-label="Ascolta"
                  onClick={() => speak(audio)}
                  className={`flex size-20 items-center justify-center rounded-full bg-label text-bg transition active:scale-95 ${FOCUS}`}
                >
                  <IconSpeaker className="size-9" />
                </button>
                <button
                  type="button"
                  onClick={() => speak(audio, { rate: RATE_LENTO })}
                  className={`h-11 rounded-full px-4 text-[15px] text-label-2 hover:text-label ${FOCUS}`}
                >
                  Più piano
                </button>
              </>
            ) : (
              <AudioNonDisponibile testo={audio} />
            )}
          </div>
        )}

        {esercizio.tipo === "scegli" && (
          <p className="text-center text-[28px] leading-tight font-semibold">{esercizio.domanda}</p>
        )}

        {(esercizio.tipo === "ascolta-scegli" || esercizio.tipo === "scegli") && (
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Risposte">
            {esercizio.opzioni.map((opzione) => {
              const selezionata = risposta === opzione;
              return (
                <button
                  key={opzione}
                  type="button"
                  role="radio"
                  aria-checked={selezionata}
                  disabled={risultato !== null}
                  onClick={() => setRisposta(opzione)}
                  className={`min-h-[64px] rounded-2xl text-[22px] font-semibold transition disabled:cursor-default ${FOCUS} ${
                    selezionata ? "bg-card ring-2 ring-label" : RIEMPIMENTO
                  }`}
                >
                  {opzione}
                </button>
              );
            })}
          </div>
        )}

        {esercizio.tipo === "abbina" && <Abbina coppie={esercizio.coppie} onFinito={abbinaFinito} />}

        {esercizio.tipo === "ascolta-scrivi" && (
          <input
            type="text"
            value={risposta}
            onChange={(event) => setRisposta(event.target.value)}
            disabled={risultato !== null}
            aria-label="La tua risposta"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck={false}
            className={`h-16 w-full rounded-2xl text-center text-[28px] font-semibold tracking-[0.3em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-label ${RIEMPIMENTO}`}
          />
        )}

        {suggerimentoVisibile && (
          <p className="text-center text-[15px] text-label-2">{esercizio.suggerimento}</p>
        )}
      </div>

      {risultato ? (
        // Место под панелью обратной связи, чтобы она не закрывала задание.
        <div aria-hidden="true" className="h-64 shrink-0" />
      ) : (
        <div className="flex flex-col-reverse gap-1 md:flex-row md:items-center md:justify-center md:gap-4">
          <button
            type="button"
            onClick={() => setAiutoAperto(true)}
            className={`h-11 rounded-full px-4 text-[17px] text-label-2 hover:text-label ${FOCUS}`}
          >
            Aiuto
          </button>
          {esercizio.tipo !== "abbina" && (
            <button type="submit" disabled={!risposta.trim()} className={`${CAPSULA} md:mx-0`}>
              Verifica
            </button>
          )}
        </div>
      )}

      {aiutoAperto && (
        <AiutoSheet
          audio={audio}
          onChiudi={() => setAiutoAperto(false)}
          onSuggerimento={() => {
            usaAiuto();
            setSuggerimentoVisibile(true);
            setAiutoAperto(false);
          }}
          onAscoltaPiano={() => {
            usaAiuto();
            if (audio) speak(audio, { rate: RATE_LENTO });
            setAiutoAperto(false);
          }}
        />
      )}

      <div
        aria-live="polite"
        inert={!risultato}
        className={`fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 ease-out ${
          risultato ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-md rounded-t-3xl bg-card px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:max-w-lg">
          {risultato && (
            <>
              {risultato.corretto ? (
                <p className="flex items-center gap-2 text-[22px] font-bold text-success">
                  <IconCheck className="size-6" />
                  Corretto!
                </p>
              ) : (
                <>
                  <p className="flex items-center gap-2 text-[22px] font-bold text-error">
                    <IconX className="size-6" />
                    Non è corretto
                  </p>
                  <p className="mt-2 text-[17px] font-semibold text-label">
                    Risposta giusta: {risultato.rispostaGiusta}
                  </p>
                </>
              )}
              <p className="mt-1 text-[15px] text-label-2">{esercizio.spiegazione}</p>
              <button
                ref={continuaRef}
                type="button"
                onClick={() => onContinua(risultato)}
                className={`${CAPSULA} mt-5`}
              >
                Continua
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

type AiutoSheetProps = {
  audio: string | null;
  onChiudi: () => void;
  onSuggerimento: () => void;
  onAscoltaPiano: () => void;
};

function AiutoSheet({ audio, onChiudi, onSuggerimento, onAscoltaPiano }: AiutoSheetProps) {
  const primoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    primoRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onChiudi();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onChiudi]);

  const voce = `flex h-[52px] w-full items-center justify-center rounded-2xl text-[17px] font-semibold ${RIEMPIMENTO} ${FOCUS}`;

  return (
    <div className="fixed inset-0 z-40 flex items-end">
      <button
        type="button"
        aria-label="Chiudi"
        onClick={onChiudi}
        className="absolute inset-0 bg-black/30"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="aiuto-titolo"
        className="relative mx-auto w-full max-w-md rounded-t-3xl bg-card px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:max-w-lg"
      >
        <h2 id="aiuto-titolo" className="mb-4 text-center text-[17px] font-semibold">
          Aiuto
        </h2>
        <div className="flex flex-col gap-2.5">
          <button ref={primoRef} type="button" onClick={onSuggerimento} className={voce}>
            Suggerimento
          </button>
          {audio && (
            <button type="button" onClick={onAscoltaPiano} className={voce}>
              Ascolta piano
            </button>
          )}
          <button
            type="button"
            onClick={onChiudi}
            className={`h-11 text-[17px] text-label-2 hover:text-label ${FOCUS} rounded-full`}
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}
