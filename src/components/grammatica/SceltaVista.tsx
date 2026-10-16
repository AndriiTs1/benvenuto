import Link from "next/link";

export type Vista = "percorso" | "indice";

const VISTE: { vista: Vista; nome: string; href: string }[] = [
  { vista: "percorso", nome: "Percorso", href: "/a2/grammatica" },
  { vista: "indice", nome: "Indice", href: "/a2/grammatica?vista=indice" },
];

// Controllo segmentato in stile iOS; la vista scelta sta nell'URL (?vista=indice).
export function SceltaVista({ attiva }: { attiva: Vista }) {
  return (
    <nav aria-label="Vista" className="flex justify-center">
      <div className="grid w-full max-w-xs grid-cols-2 rounded-full bg-label/[0.08] p-0.5 dark:bg-label/[0.16]">
        {VISTE.map(({ vista, nome, href }) => (
          <Link
            key={vista}
            href={href}
            replace
            scroll={false}
            aria-current={vista === attiva ? "page" : undefined}
            className={`flex h-11 items-center justify-center rounded-full text-[15px] font-medium transition focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-label ${
              vista === attiva
                ? "bg-card font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12)] dark:bg-label/[0.24]"
                : "text-label-2 hover:text-label"
            }`}
          >
            {nome}
          </Link>
        ))}
      </div>
    </nav>
  );
}
