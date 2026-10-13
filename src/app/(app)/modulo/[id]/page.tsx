import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ListRow } from "@/components/ListRow";
import { MODULI_A1, getModulo } from "@/content/a1/moduli";

export function generateStaticParams() {
  return MODULI_A1.map((modulo) => ({ id: String(modulo.id) }));
}

// Неизвестный id должен давать настоящий 404, поэтому params читаются вне Suspense.
// Все 10 модулей собираются заранее через generateStaticParams.
export const instant = false;

export default async function ModuloPage({ params }: PageProps<"/modulo/[id]">) {
  const { id } = await params;
  const modulo = getModulo(Number(id));
  if (!modulo) notFound();

  return (
    <main className="mx-auto w-full max-w-md px-4 pt-[max(1rem,env(safe-area-inset-top))] md:max-w-lg">
      <Link
        href="/percorso"
        className="inline-flex h-11 items-center gap-1 text-[17px] text-label hover:opacity-70"
      >
        <ChevronLeft />
        Percorso
      </Link>

      <p className="mt-2 text-[15px] text-label-2">Modulo {modulo.id}</p>
      <h1 className="text-[34px] leading-tight font-bold tracking-tight">{modulo.titolo}</h1>

      {modulo.lezioni.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-2xl bg-card">
          {modulo.lezioni.map((lezione, index) => (
            <ListRow
              key={lezione.id}
              href={`/lezione/${lezione.id}`}
              leading={<span className="text-[13px]">{lezione.numero}</span>}
              title={lezione.titolo}
              subtitle={lezione.descrizione}
              trailing={
                <span className="shrink-0 text-[15px] text-label-2">{lezione.minuti} min</span>
              }
              first={index === 0}
            />
          ))}
          <ListRow
            leading={
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              >
                <path d="m12 3.5 2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.8l-5.25 2.8 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
              </svg>
            }
            title="Situazione finale"
            subtitle={modulo.situazione}
            first={false}
          />
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-card p-5">
          <p className="text-[17px] font-semibold">Lezioni in preparazione</p>
          <p className="mt-1 text-[15px] text-label-2">Presto disponibili</p>
        </div>
      )}
    </main>
  );
}
