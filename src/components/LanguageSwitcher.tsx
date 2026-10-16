"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE, LOCALES, type Locale } from "@/lib/lingue";

function salvaLingua(code: Locale) {
  document.cookie = `${LANG_COOKIE}=${code}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
}

// Lingua delle spiegazioni: pulsante a capsula + pannello dal basso (mobile) / popover (md+).
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [aperto, setAperto] = useState(false);
  const pulsante = useRef<HTMLButtonElement>(null);
  const pannello = useRef<HTMLDivElement>(null);
  const titoloId = useId();

  function chiudi() {
    setAperto(false);
    pulsante.current?.focus();
  }

  function scegli(code: Locale) {
    salvaLingua(code);
    chiudi();
    router.refresh();
  }

  // All'apertura il fuoco va sulla lingua attuale.
  useEffect(() => {
    if (!aperto) return;
    pannello.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
  }, [aperto]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      chiudi();
      return;
    }
    const opzioni = [...(pannello.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [])];
    const attuale = opzioni.indexOf(document.activeElement as HTMLButtonElement);
    const passo = { ArrowDown: 1, ArrowUp: -1, Tab: event.shiftKey ? -1 : 1 }[event.key];
    if (passo === undefined) {
      if (event.key === "Home") opzioni[0]?.focus();
      if (event.key === "End") opzioni.at(-1)?.focus();
      return;
    }
    // Tab e frecce girano tra le opzioni: il fuoco resta nel pannello.
    event.preventDefault();
    opzioni[(attuale + passo + opzioni.length) % opzioni.length]?.focus();
  }

  return (
    <div className="relative">
      <button
        ref={pulsante}
        type="button"
        onClick={() => setAperto(true)}
        aria-label="Lingua delle spiegazioni"
        aria-haspopup="dialog"
        aria-expanded={aperto}
        className="group inline-flex h-11 items-center focus-visible:outline-none"
      >
        <span className="flex h-10 items-center gap-1.5 rounded-full bg-label/[0.08] px-3 text-[15px] font-semibold text-label transition duration-150 group-hover:bg-label/[0.12] group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-label group-active:scale-[0.94] group-active:bg-label/[0.16] dark:bg-label/[0.16] dark:group-hover:bg-label/[0.22] dark:group-active:bg-label/[0.28]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
          </svg>
          {locale.toUpperCase()}
        </span>
      </button>

      {aperto && (
        <>
          <div aria-hidden="true" onClick={chiudi} className="lingua-sfondo fixed inset-0 z-40 bg-black/30 md:bg-black/10" />
          <div
            ref={pannello}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titoloId}
            onKeyDown={onKeyDown}
            className="lingua-pannello fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-card px-4 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:absolute md:inset-x-auto md:top-12 md:right-0 md:bottom-auto md:w-72 md:rounded-2xl md:p-2 md:shadow-[0_8px_30px_rgba(0,0,0,0.16)]"
          >
            <h2
              id={titoloId}
              className="px-2 pb-3 text-center text-[17px] font-semibold md:px-3 md:pt-2 md:pb-2 md:text-left md:text-[13px] md:font-normal md:tracking-wide md:text-label-2 md:uppercase"
            >
              Lingua delle spiegazioni
            </h2>
            <div role="menu" aria-labelledby={titoloId} className="overflow-hidden rounded-2xl bg-bg-grouped md:rounded-xl md:bg-transparent">
              {LOCALES.map((opzione, index) => {
                const attiva = opzione.code === locale;
                return (
                  <button
                    key={opzione.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={attiva}
                    lang={opzione.code}
                    onClick={() => scegli(opzione.code)}
                    className="flex min-h-12 w-full items-center pl-4 text-left text-[17px] text-label hover:bg-label/[0.04] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-label md:rounded-lg md:pl-3"
                  >
                    <span
                      className={`flex min-h-12 flex-1 items-center justify-between gap-3 self-stretch pr-4 md:pr-3 ${
                        index > 0 ? "border-t border-separator md:border-0" : ""
                      }`}
                    >
                      {opzione.nome}
                      {attiva && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="size-5 shrink-0 text-label"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
