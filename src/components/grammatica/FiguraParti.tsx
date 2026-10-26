import type { ComponentType, SVGProps } from "react";
import { FiguraInterattiva } from "@/components/grammatica/FiguraInterattiva";
import { Tr } from "@/components/Tr";
import { getFigura, type Figura } from "@/content/a2/figure";
import type { Locale } from "@/lib/lingue";

// Figura con le parti indicate (lezioni.json → "figure": ["viso", …]).
// Dati: content/a2/figure/<id>.json; disegno: ./figure/<Id>.tsx con export omonimo (Viso, Busto…).
// Una figura nuova = due file, nessuna modifica qui.
// Le figure della stessa pagina sono finestre della stessa persona: stessa scala (px per unità del
// viewBox) per tutte, da lg e sotto lg. La scala si calcola sulla figura più larga e più alta dell'insieme.

/** Sotto lg: quanto disegno resta sotto il punto più basso (unità del viewBox). */
const MARGINE_SOTTO = 55;

const numeri = (viewBox: string) => viewBox.trim().split(/\s+/).map(Number) as [number, number, number, number];

// Sotto lg il disegno si taglia in basso: fino a poco sotto il punto più basso (viso: spalle corte).
function viewBoxMobile(figura: Figura) {
  const [vx, vy, vw, vh] = numeri(figura.viewBox);
  const fondo = Math.min(vy + vh, Math.max(...figura.parts.map((p) => p.y)) + MARGINE_SOTTO);
  return `${vx} ${vy} ${vw} ${fondo - vy}`;
}

export async function FiguraParti({ id, insieme = [id], locale }: { id: string; insieme?: string[]; locale: Locale }) {
  const figura = await getFigura(id);
  if (!figura) return null;
  const nome = id[0].toUpperCase() + id.slice(1);
  const modulo = (await import(`./figure/${nome}`)) as Record<string, ComponentType<SVGProps<SVGSVGElement>>>;
  const Disegno = modulo[nome];
  if (!Disegno) return null;
  const vbMobile = viewBoxMobile(figura);
  // Unità di riferimento della pagina: larghezza massima e altezza massima (sotto lg) delle figure.
  const tutte = (await Promise.all(insieme.map(getFigura))).filter((f): f is Figura => f !== null);
  const scala = {
    larghezza: Math.max(...tutte.map((f) => numeri(f.viewBox)[2])),
    altezzaMobile: Math.max(...tutte.map((f) => numeri(viewBoxMobile(f))[3])),
  };

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
        viewBoxMobile={vbMobile}
        scala={scala}
        locale={locale}
        parti={figura.parts.map((p) => ({ ...p, tr: p.tr[locale] }))}
        disegno={<Disegno viewBox={figura.viewBox} className="block size-full" />}
        disegnoMobile={<Disegno viewBox={vbMobile} className="block size-full" />}
      />
    </section>
  );
}
