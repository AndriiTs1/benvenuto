"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE, LOCALES, type Locale } from "@/lib/lingue";

function salvaLingua(code: Locale) {
  document.cookie = `${LANG_COOKIE}=${code}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
}

// Lingua delle spiegazioni: capsula con sigla + menu a tendina largo quanto il pulsante.
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [aperto, setAperto] = useState(false);
  const contenitore = useRef<HTMLDivElement>(null);
  const pulsante = useRef<HTMLButtonElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const listaId = useId();
  // Aperto da tastiera: il fuoco entra nella lista. Col mouse resta sul pulsante,
  // così dopo la scelta non compare l'anello di focus.
  const daTastiera = useRef(false);
  const attuale = LOCALES.find((opzione) => opzione.code === locale)!;

  function opzioni() {
    return [...(lista.current?.querySelectorAll<HTMLLIElement>('[role="option"]') ?? [])];
  }

  function chiudi() {
    // Il fuoco torna al pulsante solo se era nella lista (uso da tastiera).
    if (lista.current?.contains(document.activeElement)) pulsante.current?.focus();
    setAperto(false);
  }

  function apri(conTastiera: boolean) {
    daTastiera.current = conTastiera;
    setAperto(true);
  }

  function scegli(code: Locale) {
    chiudi();
    salvaLingua(code);
    if (code !== locale) router.refresh();
  }

  function focusAttuale() {
    lista.current?.querySelector<HTMLLIElement>('[aria-selected="true"]')?.focus();
  }

  // Da tastiera il fuoco va sulla lingua attuale; un clic fuori chiude il menu.
  useEffect(() => {
    if (!aperto) return;
    if (daTastiera.current) focusAttuale();

    function fuori(event: PointerEvent) {
      if (!contenitore.current?.contains(event.target as Node)) setAperto(false);
    }
    document.addEventListener("pointerdown", fuori);
    return () => document.removeEventListener("pointerdown", fuori);
  }, [aperto]);

  function onKeyDownPulsante(event: KeyboardEvent<HTMLButtonElement>) {
    if (!aperto && ["ArrowDown", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      apri(true);
    } else if (aperto && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      // Aperto col mouse, poi frecce: si passa alla lista.
      event.preventDefault();
      focusAttuale();
    } else if (aperto && event.key === "Escape") {
      event.preventDefault();
      chiudi();
    }
  }

  function onKeyDownLista(event: KeyboardEvent<HTMLUListElement>) {
    const elenco = opzioni();
    const indice = elenco.indexOf(document.activeElement as HTMLLIElement);
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        const passo = event.key === "ArrowDown" ? 1 : -1;
        elenco[(indice + passo + elenco.length) % elenco.length]?.focus();
        break;
      }
      case "Home":
        event.preventDefault();
        elenco[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        elenco.at(-1)?.focus();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (indice >= 0) scegli(LOCALES[indice].code);
        break;
      case "Escape":
        event.preventDefault();
        chiudi();
        break;
      case "Tab":
        setAperto(false);
        break;
    }
  }

  return (
    <div ref={contenitore} className="relative">
      <button
        ref={pulsante}
        type="button"
        onClick={(event) => (aperto ? chiudi() : apri(event.detail === 0))}
        onKeyDown={onKeyDownPulsante}
        aria-label={`Lingua delle spiegazioni: ${attuale.nome}`}
        aria-haspopup="listbox"
        aria-expanded={aperto}
        aria-controls={aperto ? listaId : undefined}
        className="group inline-flex h-11 items-center focus-visible:outline-none"
      >
        <span className="flex h-10 items-center gap-1.5 rounded-full bg-label/[0.08] pr-2.5 pl-3 text-[15px] font-semibold text-label transition duration-150 group-hover:bg-label/[0.12] group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-label group-active:scale-[0.94] group-active:bg-label/[0.16] dark:bg-label/[0.16] dark:group-hover:bg-label/[0.22] dark:group-active:bg-label/[0.28]">
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
          {attuale.sigla}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`size-3 transition-transform duration-150 ${aperto ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {aperto && (
        // Sotto la capsula (alta 40px dentro un pulsante da 44px): 42px + 6px di distacco.
        <ul
          ref={lista}
          id={listaId}
          role="listbox"
          aria-label="Lingua delle spiegazioni"
          onKeyDown={onKeyDownLista}
          className="lingua-menu absolute inset-x-0 top-12 z-50 rounded-[14px] bg-card p-1 shadow-[0_8px_24px_rgba(0,0,0,0.14)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        >
          {LOCALES.map((opzione) => {
            const attiva = opzione.code === locale;
            return (
              <li
                key={opzione.code}
                role="option"
                aria-selected={attiva}
                aria-label={opzione.nome}
                title={opzione.nome}
                lang={opzione.code}
                tabIndex={-1}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => scegli(opzione.code)}
                className={`flex h-10 cursor-pointer items-center justify-center rounded-[10px] text-[15px] text-label outline-none select-none hover:bg-label/[0.08] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-label active:bg-label/[0.16] dark:hover:bg-label/[0.16] dark:active:bg-label/[0.24] ${
                  attiva ? "bg-label/[0.08] font-semibold dark:bg-label/[0.16]" : ""
                }`}
              >
                {opzione.sigla}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
