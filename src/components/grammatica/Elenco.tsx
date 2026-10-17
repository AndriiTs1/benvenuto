import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "@/components/ListRow";

// Elenco raggruppato in stile iOS per la grammatica: il separatore parte dopo l'icona.
export function Elenco({ titolo, children }: { titolo?: string; children: ReactNode }) {
  return (
    <section>
      {titolo && <h2 className="mb-1.5 px-4 text-[13px] tracking-wide text-label-2 uppercase">{titolo}</h2>}
      <div className="overflow-hidden rounded-2xl bg-card">{children}</div>
    </section>
  );
}

export function RigaElenco({
  href,
  leading,
  children,
  trailing,
  first,
}: {
  /** Senza href la riga non si tocca e non ha il chevron. */
  href?: string;
  leading: ReactNode;
  children: ReactNode;
  trailing?: ReactNode;
  first: boolean;
}) {
  const contenuto = (
    <>
      <span className="flex w-9 shrink-0 justify-center">{leading}</span>
      <span
        className={`flex min-h-[60px] min-w-0 flex-1 items-center gap-3 self-stretch py-2.5 pr-4 ${
          first ? "" : "border-t border-separator"
        }`}
      >
        <span className="min-w-0 flex-1">{children}</span>
        {trailing}
        {href && <ChevronRight />}
      </span>
    </>
  );

  if (!href) return <div className="flex items-center gap-3 pl-4">{contenuto}</div>;

  return (
    <Link
      href={href}
      transitionTypes={["nav-forward"]}
      className="flex items-center gap-3 pl-4 hover:bg-bg-grouped/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent active:bg-bg-grouped dark:hover:bg-label/[0.06] dark:active:bg-label/[0.1]"
    >
      {contenuto}
    </Link>
  );
}

// Titolo + sottotitolo nella lingua delle spiegazioni, dentro una riga.
export function TestoRiga({ sopra, titolo, sotto }: { sopra?: ReactNode; titolo: string; sotto?: ReactNode }) {
  return (
    <>
      {sopra && <span className="block text-[13px] text-label-2">{sopra}</span>}
      <span className="block text-[17px] leading-snug">{titolo}</span>
      {sotto && <span className="mt-0.5 block text-[15px] leading-snug">{sotto}</span>}
    </>
  );
}
