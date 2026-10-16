import Link from "next/link";

// Pulsante "Indietro" comune: cerchio con chevron + etichetta. Porta sempre a un
// indirizzo preciso (non history.back), così funziona anche aprendo la pagina da un link.
export function BackButton({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      transitionTypes={["nav-back"]}
      aria-label="Indietro"
      className="group -ml-0.5 inline-flex h-11 items-center gap-2 rounded-full pr-2 text-[17px] text-label focus-visible:outline-none"
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-label/[0.08] transition duration-150 group-hover:bg-label/[0.12] group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-label group-active:scale-[0.94] group-active:bg-label/[0.16] dark:bg-label/[0.16] dark:group-hover:bg-label/[0.22] dark:group-active:bg-label/[0.28]">
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
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </span>
      <span aria-hidden="true" className="hidden min-[360px]:inline">
        Indietro
      </span>
    </Link>
  );
}
