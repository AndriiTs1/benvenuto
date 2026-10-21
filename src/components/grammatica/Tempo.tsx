import { IconArrowRight, IconCircleCheck, IconCircleDot, IconRepeat } from "@/components/lezione/ui";
import { STILE_TEMPO, type Tempo } from "@/lib/tempi";

const ICONE = { presente: IconCircleDot, passato: IconCircleCheck, imperfetto: IconRepeat, futuro: IconArrowRight };

// Piastrella del tempo verbale: fondo nel colore del tempo, icona bianca (nera nel tema scuro).
// data-tempo serve ai test (tests/tempi.spec.ts).
export function PiastrellaTempo({ tempo, grande = false }: { tempo: Tempo; grande?: boolean }) {
  const Icona = ICONE[tempo];
  return (
    <span
      data-tempo={tempo}
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

// Pagine dell'unità e dell'argomento: piastrella + "TEMPO VERBALE" sopra il titolo
// (nella pagina dell'unità con il numero davanti: "UNITÀ 3 · TEMPO VERBALE").
export function IntestazioneTempo({ tempo, unita }: { tempo: Tempo; unita?: number }) {
  return (
    <div style={STILE_TEMPO[tempo]} className="mb-2 flex items-center gap-3">
      <PiastrellaTempo tempo={tempo} />
      <span className="text-[12px] font-semibold tracking-wide whitespace-nowrap text-(--c) uppercase">
        {unita !== undefined && `Unità ${unita} · `}Tempo verbale
      </span>
    </div>
  );
}
