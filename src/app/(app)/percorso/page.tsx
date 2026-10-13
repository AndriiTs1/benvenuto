import { ListRow } from "@/components/ListRow";
import { PageHeader } from "@/components/PageHeader";
import { ContinuaCard } from "@/components/percorso/ContinuaCard";
import { LezioniCompletate } from "@/components/percorso/LezioniCompletate";
import { MODULI_A1 } from "@/content/a1/moduli";

export default function PercorsoPage() {
  const primoModulo = MODULI_A1[0];

  return (
    <main className="mx-auto w-full max-w-md px-4 pt-[max(1rem,env(safe-area-inset-top))] md:max-w-lg">
      <PageHeader title="Il tuo percorso" />

      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-separator">
          <div className="h-full rounded-full bg-label" style={{ width: "0%" }} />
        </div>
        <p className="mt-2 text-[13px] text-label-2">0 di {MODULI_A1.length} moduli completati</p>
      </div>

      <ContinuaCard modulo={primoModulo} />

      <section className="mt-8">
        <h2 className="mb-2 px-4 text-[13px] text-label-2 uppercase">Moduli</h2>
        <div className="overflow-hidden rounded-2xl bg-card">
          {MODULI_A1.map((modulo, index) => (
            <ListRow
              key={modulo.id}
              href={`/modulo/${modulo.id}`}
              leading={modulo.id}
              title={modulo.titolo}
              subtitle={
                modulo.id === 1 ? (
                  <LezioniCompletate
                    ids={modulo.lezioni.map((lezione) => lezione.id)}
                    totale={modulo.lezioniTotali}
                  />
                ) : (
                  `0 di ${modulo.lezioniTotali} lezioni`
                )
              }
              first={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
