import type { ComponentType, SVGProps } from "react";
import { FiguraInterattiva } from "@/components/grammatica/FiguraInterattiva";
import { Tr } from "@/components/Tr";
import { getFigura } from "@/content/a2/figure";
import type { Locale } from "@/lib/lingue";

// Figura con le parti indicate (lezioni.json → "figure": ["viso", …]).
// Dati: content/a2/figure/<id>.json; disegno: ./figure/<Id>.tsx con export omonimo (Viso, Corpo…).
// Una figura nuova = due file, nessuna modifica qui.

/** Sotto lg: quanto disegno resta sotto il punto più basso (unità del viewBox). */
const MARGINE_SOTTO = 55;

export async function FiguraParti({ id, locale }: { id: string; locale: Locale }) {
  const figura = await getFigura(id);
  if (!figura) return null;
  const nome = id[0].toUpperCase() + id.slice(1);
  const modulo = (await import(`./figure/${nome}`)) as Record<string, ComponentType<SVGProps<SVGSVGElement>>>;
  const Disegno = modulo[nome];
  if (!Disegno) return null;
  // Sotto lg il disegno si taglia in basso: fino a poco sotto il punto più basso (viso: spalle corte).
  const [vx, vy, vw, vh] = figura.viewBox.trim().split(/\s+/).map(Number);
  const fondo = Math.min(vy + vh, Math.max(...figura.parts.map((p) => p.y)) + MARGINE_SOTTO);
  const viewBoxMobile = `${vx} ${vy} ${vw} ${fondo - vy}`;

  return (
    <section aria-labelledby={`figura-${id}`} className="rounded-2xl bg-card p-4 md:p-5">
      <h2 id={`figura-${id}`} lang="it" className="text-[20px] leading-tight font-bold md:text-[22px]">
        {figura.title}
      </h2>
      <Tr locale={locale} size="sm" className="mt-0.5 block">
        {figura.titleTr[locale]}
      </Tr>
      <FiguraInterattiva
        titolo={figura.title}
        viewBox={figura.viewBox}
        viewBoxMobile={viewBoxMobile}
        locale={locale}
        parti={figura.parts.map((p) => ({ ...p, tr: p.tr[locale] }))}
        disegno={<Disegno className="block size-full" />}
        disegnoMobile={<Disegno viewBox={viewBoxMobile} className="block size-full" />}
      />
    </section>
  );
}
