import { BackButton } from "@/components/BackButton";
import { PageTransition } from "@/components/PageTransition";
import { ScegliLivello } from "@/components/livello/ScegliLivello";
import { statisticheA2 } from "@/content/a2";
import { CURRENT_LEVEL, LEVELS } from "@/lib/levels";

export default function LivelloPage() {
  const corso = LEVELS.find((level) => level.code === CURRENT_LEVEL)!;
  const prossimamente = LEVELS.filter((level) => level.status === "in_development");
  const stats = statisticheA2();

  return (
    <PageTransition>
      <main className="min-h-dvh bg-bg-grouped text-label">
        <div className="mx-auto w-full max-w-md px-4 pt-[max(1rem,env(safe-area-inset-top))] md:max-w-lg">
          <BackButton />

          <h1 className="mt-2 text-center text-[34px] leading-tight font-bold tracking-tight">
            Il tuo livello
          </h1>
          <p className="mt-1 text-center text-[17px] text-balance text-label-2">
            Inizia dal corso {CURRENT_LEVEL}. Gli altri livelli sono in sviluppo.
          </p>

          <ScegliLivello
            code={corso.code}
            className="mt-6 flex w-full flex-col items-center rounded-2xl bg-card p-5 text-center transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-label active:scale-[0.99] md:p-6"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-label text-[17px] font-semibold text-bg">
              {corso.code}
            </span>
            <span className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span className="text-[17px] font-semibold whitespace-nowrap md:text-xl">
                {corso.code} · {corso.name}
              </span>
              <span className="rounded-full bg-bg-grouped px-2.5 py-0.5 text-[13px] font-semibold whitespace-nowrap">
                Il tuo corso
              </span>
            </span>
            <span className="mt-1 block text-[15px] text-balance text-label-2">{corso.description}</span>
            <span className="mt-4 block w-full border-t border-separator pt-4 text-[15px] font-medium text-label-2">
              <span className="text-grammar">{stats.argomenti} argomenti</span>
              {" · "}
              <span className="text-vocab">{stats.parole} parole</span>
              {" · "}
              <span className="text-exercises">{stats.esercizi} esercizi</span>
            </span>
          </ScegliLivello>

          <h2 className="mt-8 mb-2 px-4 text-[13px] tracking-wide text-label-2 uppercase">
            Prossimamente
          </h2>
          <div className="overflow-hidden rounded-2xl bg-card">
            {prossimamente.map((level, index) => (
              <div key={level.code} aria-disabled="true" className="flex min-h-12 items-center pl-4">
                <span
                  className={`flex min-h-12 flex-1 items-center justify-between gap-3 self-stretch pr-4 ${
                    index > 0 ? "border-t border-separator" : ""
                  }`}
                >
                  <span className="text-[17px] text-label-2">
                    {level.code} · {level.name}
                  </span>
                  <span className="shrink-0 rounded-full bg-bg-grouped px-2.5 py-1 text-[13px] whitespace-nowrap text-label-2">
                    In sviluppo
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 mt-4 bg-bg-grouped/85 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur">
            <ScegliLivello
              code={corso.code}
              className="flex h-[52px] w-full items-center justify-center rounded-full bg-label text-[17px] font-semibold text-bg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-label active:scale-[0.98] active:opacity-80 md:mx-auto md:w-80"
            >
              Inizia il corso {corso.code}
            </ScegliLivello>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
