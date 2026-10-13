import Link from "next/link";
import { ListRow } from "@/components/ListRow";
import { PageHeader } from "@/components/PageHeader";
import { MODULI_A1 } from "@/content/a1/moduli";

export default function PercorsoPage() {
  const primoModulo = MODULI_A1[0];
  const prossima = primoModulo.lezioni[0];

  return (
    <main className="mx-auto w-full max-w-md px-4 pt-[max(1rem,env(safe-area-inset-top))] md:max-w-lg">
      <PageHeader title="Il tuo percorso" />

      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-separator">
          <div className="h-full rounded-full bg-label" style={{ width: "0%" }} />
        </div>
        <p className="mt-2 text-[13px] text-label-2">0 di {MODULI_A1.length} moduli completati</p>
      </div>

      <section className="mt-6 rounded-3xl bg-card p-5">
        <p className="text-[13px] font-semibold tracking-wide text-label-2 uppercase">Continua</p>
        <h2 className="mt-1 text-[22px] font-bold">
          {prossima.numero} · {prossima.titolo}
        </h2>
        <p className="text-[15px] text-label-2">
          {primoModulo.titolo} · {prossima.minuti} min
        </p>
        <Link
          href={`/lezione/${prossima.id}`}
          className="mt-4 flex h-[50px] w-full items-center justify-center rounded-full bg-label text-[17px] font-semibold text-bg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-label active:scale-[0.98]"
        >
          Inizia
        </Link>
      </section>

      <section className="mt-8">
        <h2 className="mb-2 px-4 text-[13px] text-label-2 uppercase">Moduli</h2>
        <div className="overflow-hidden rounded-2xl bg-card">
          {MODULI_A1.map((modulo, index) => (
            <ListRow
              key={modulo.id}
              href={`/modulo/${modulo.id}`}
              leading={modulo.id}
              title={modulo.titolo}
              subtitle={`0 di ${modulo.lezioniTotali} lezioni`}
              first={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
