import { IconArrowRight, IconCircleCheck, IconCircleDot, IconRepeat, IconSparkles } from "@/components/lezione/ui";
import { isModo, STILE_TEMPO, type ColoreUnita } from "@/lib/tempi";

const ICONE = { presente: IconCircleDot, passato: IconCircleCheck, imperfetto: IconRepeat, futuro: IconArrowRight, condizionale: IconSparkles };

// Piastrella del tempo (o del modo) verbale: fondo nel suo colore, icona bianca (nera nel tema scuro).
// data-tempo / data-modo servono ai test (tests/tempi.spec.ts).
export function PiastrellaTempo({ tempo, grande = false }: { tempo: ColoreUnita; grande?: boolean }) {
  const Icona = ICONE[tempo];
  return (
    <span
      data-tempo={isModo(tempo) ? undefined : tempo}
      data-modo={isModo(tempo) ? tempo : undefined}
      style={STILE_TEMPO[tempo]}
      className={
        grande
          ? "flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-(--c) text-bg"
          : "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-(--c) text-bg"
      }
    >
      <Icona className={grande ? "size-6" : "size-5"} />
    </span>
  );
}

// Pagine dell'unità e dell'argomento: piastrella + "TEMPO VERBALE" (o "MODO VERBALE") sopra il titolo
// (nella pagina dell'unità con il numero davanti: "UNITÀ 3 · TEMPO VERBALE").
export function IntestazioneTempo({ tempo, unita }: { tempo: ColoreUnita; unita?: number }) {
  return (
    <div style={STILE_TEMPO[tempo]} className="mb-2 flex items-center gap-3">
      <PiastrellaTempo tempo={tempo} />
      <span className="text-[12px] font-semibold tracking-wide whitespace-nowrap text-(--c) uppercase">
        {unita !== undefined && `Unità ${unita} · `}
        {isModo(tempo) ? "Modo verbale" : "Tempo verbale"}
      </span>
    </div>
  );
}
