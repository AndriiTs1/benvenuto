import type { CSSProperties } from "react";
import { BackButton } from "@/components/BackButton";
import { IconLibro, IconMatita, IconScheda } from "@/components/lezione/ui";
import { PageTransition } from "@/components/PageTransition";
import { ProgressoCorso } from "@/components/livello/ProgressoCorso";
import { ScegliLivello } from "@/components/livello/ScegliLivello";
import { statisticheA2 } from "@/content/a2";
import { getPercorso } from "@/content/a2/grammatica";
import { LEVELS, type Level } from "@/lib/levels";
import { linguaScelta } from "@/lib/lingua-scelta";
import { livelloScelto } from "@/lib/livello-scelto";

// Attende il cookie sul server: il testo del pulsante ("Inizia"/"Continua") arriva già nell'HTML.
export const instant = false;

// "Scala dei livelli": A1 → C2. Il livello disponibile è una scheda grande con progresso,
// numeri e pulsante; gli altri sono righe semplici "In sviluppo". Solo italiano.
// Blu principale = --primario (globals.css).
export default async function LivelloPage() {
  const [scelto, locale] = await Promise.all([livelloScelto(), linguaScelta()]);
  const [stats, { argomenti }] = await Promise.all([statisticheA2(locale), getPercorso(locale)]);

  return (
    <PageTransition>
      <main className="min-h-dvh text-label">
        <div className="mx-auto w-full max-w-[35rem] px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
          <BackButton />

          <header className="mt-2 text-center">
            <h1 className="text-[34px] leading-tight font-bold tracking-tight">Il tuo livello</h1>
            <p className="mt-1 text-[17px] text-label-2">Sei livelli, da zero alla padronanza</p>
          </header>

          {/* Righe con lo stesso rientro del contenuto della scheda (bordo 1px + p-5): piastrelle e
              "In sviluppo" sulle stesse verticali. */}
          <ol className="mt-6 space-y-2">
            {LEVELS.map((level) =>
              level.status === "available" ? (
                <li key={level.code} className="py-1">
                  <SchedaCorso
                    level={level}
                    scelto={scelto !== null}
                    topicIds={argomenti.map((a) => a.id)}
                    stats={stats}
                  />
                </li>
              ) : (
                <li key={level.code} className="flex min-h-12 items-center gap-3 px-[21px]">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-label/[0.08] text-[15px] font-semibold text-label-2 dark:bg-label/[0.16]">
                    {level.code}
                  </span>
                  <span className="min-w-0 flex-1 text-[17px] text-label-2">{level.name}</span>
                  <span className="shrink-0 text-[13px] text-label-2">In sviluppo</span>
                </li>
              ),
            )}
          </ol>
        </div>
      </main>
    </PageTransition>
  );
}

// Colori dei numeri (globals.css → --sezione-*): variabili nello style, classi statiche bg-(--s-soft), text-(--s).
const STILE_GRAMMATICA = { "--s": "var(--sezione-grammatica)", "--s-soft": "var(--sezione-grammatica-soft)" } as CSSProperties;
const STILE_PAROLE = { "--s": "var(--sezione-parole)", "--s-soft": "var(--sezione-parole-soft)" } as CSSProperties;
const STILE_ESERCIZI = { "--s": "var(--sezione-esercizi)", "--s-soft": "var(--sezione-esercizi-soft)" } as CSSProperties;

function SchedaCorso({
  level,
  scelto,
  topicIds,
  stats,
}: {
  level: Level;
  scelto: boolean;
  topicIds: string[];
  stats: { argomenti: number; parole: number; esercizi: number };
}) {
  const numeri = [
    { valore: stats.argomenti, nome: "argomenti", Icona: IconLibro, stile: STILE_GRAMMATICA },
    { valore: stats.parole, nome: "parole", Icona: IconScheda, stile: STILE_PAROLE },
    { valore: stats.esercizi, nome: "esercizi", Icona: IconMatita, stile: STILE_ESERCIZI },
  ];
  return (
    <section
      aria-label={`${level.code} · ${level.name}`}
      className="rounded-[28px] border border-(--primario)/20 bg-card p-5 shadow-(--shadow-corso)"
    >
      {/* Mobile (< sm): piastrella sopra, testo sotto al centro. Da sm: piastrella a sinistra. */}
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
        {/* Testo nel colore di fondo: bianco su blu, nero sul blu chiaro del tema scuro (contrasto AA). */}
        <span className="flex size-[52px] shrink-0 items-center justify-center rounded-2xl bg-(--primario) text-[20px] font-bold text-bg">
          {level.code}
        </span>
        <span className="w-full min-w-0 sm:w-auto sm:flex-1">
          <span className="block text-[12px] font-semibold tracking-wide text-(--primario) uppercase">Il tuo corso</span>
          <span className="block text-[24px] leading-tight font-bold tracking-[-0.01em]">{level.name}</span>
          <span className="mt-0.5 block text-[15px] leading-snug text-label-2">{level.description}</span>
        </span>
      </div>

      <div className="mt-5">
        <ProgressoCorso topicIds={topicIds} />
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-2">
        {numeri.map(({ valore, nome, Icona, stile }) => (
          <li key={nome} style={stile} className="flex flex-col items-center rounded-[14px] bg-(--s-soft) px-2 py-3 text-center">
            <Icona className="size-[18px] text-(--s)" />
            <span className="mt-1 block text-[20px] leading-tight font-extrabold text-(--s) tabular-nums">{valore}</span>
            <span className="block text-[13px] text-label-2">{nome}</span>
          </li>
        ))}
      </ul>

      <ScegliLivello
        code={level.code}
        className="mt-5 flex h-[52px] w-full items-center justify-center rounded-full bg-(--primario) text-[17px] font-semibold text-bg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] active:opacity-80"
      >
        {scelto ? "Continua" : "Inizia"} il corso →
      </ScegliLivello>
    </section>
  );
}
