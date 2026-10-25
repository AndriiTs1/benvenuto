"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Tr } from "@/components/Tr";
import type { Locale } from "@/lib/lingue";

// Figura con le parti (FiguraParti): due viste dello stesso contenuto.
// Da lg: disegno al centro, didascalie a sinistra e a destra (side), ognuna centrata sull'altezza del suo punto
//   (spostata solo quanto basta per non sovrapporsi). Linea con gomito: orizzontale dalla didascalia,
//   poi un tratto breve a 45° fino al punto.
// Sotto lg: disegno tagliato in basso (viewBoxMobile), alto al massimo 45svh; numeri in due colonne fuori dal
//   disegno, con la stessa linea a gomito (i numeri non coprono la figura); sotto, elenco in 2 colonne.
//   Tocco su numero o riga → stessa voce evidenziata; dal numero, la riga fuori schermo scorre in vista.

type Parte = {
  n: number;
  side: "left" | "right";
  x: number;
  y: number;
  it: string;
  plural: string | null;
  irregular: boolean;
  tr: string;
};

type Linea = { n: number; punti: string; px: number; py: number };
type Schema = { margini: Record<number, number>; linee: Linea[] };

const SPAZIO = 4; // px tra due didascalie (lg)
const STACCO = 6; // px tra colonna e inizio della linea (lg)
const NUMERO = 20; // px: diametro dei numeri (sotto lg)
const SPAZIO_NUMERI = 4; // px tra due numeri dello stesso lato
const BORDO = 4; // px tra numero e bordo del disegno (i numeri stanno fuori dal disegno)

const leggiViewBox = (v: string) => v.trim().split(/\s+/).map(Number) as [number, number, number, number];

/**
 * Posizioni (centri) di elementi in colonna: ognuno il più vicino possibile al suo centro desiderato,
 * nell'ordine dato, senza sovrapporsi, dentro [min, max]. Gli elementi che si toccano formano un gruppo
 * centrato sulla media dei desideri: lo spostamento si divide tra tutti, non si accumula sull'ultimo.
 */
function disponi(voci: { centro: number; h: number }[], spazio: number, min: number, max: number): number[] {
  type Gruppo = { da: number; a: number; base: number; off: number[] };
  const gruppi: Gruppo[] = [];
  const alto = (g: Gruppo) => g.base + g.off[0] - voci[g.da].h / 2;
  const basso = (g: Gruppo) => g.base + g.off[g.off.length - 1] + voci[g.a].h / 2;
  const sistema = (g: Gruppo) => {
    g.base = g.off.reduce((s, o, k) => s + voci[g.da + k].centro - o, 0) / g.off.length;
    g.base += Math.max(0, min - alto(g));
    g.base -= Math.max(0, basso(g) - max);
  };
  voci.forEach((_, i) => {
    let g: Gruppo = { da: i, a: i, base: voci[i].centro, off: [0] };
    sistema(g);
    for (let p = gruppi.at(-1); p && basso(p) + spazio > alto(g); p = gruppi.at(-1)) {
      gruppi.pop();
      const passo = p.off[p.off.length - 1] + voci[p.a].h / 2 + spazio + voci[g.da].h / 2;
      g = { da: p.da, a: g.a, base: 0, off: [...p.off, ...g.off.map((o) => o + passo)] };
      sistema(g);
    }
    gruppi.push(g);
  });
  return gruppi.flatMap((g) => g.off.map((o) => g.base + o));
}

/** Linea a gomito da (x1, y1) al punto: orizzontale, poi un tratto a 45° (mai oltre l'inizio). */
function gomito(x1: number, y1: number, px: number, py: number) {
  const verso = px > x1 ? 1 : -1;
  const dy = Math.abs(py - y1);
  const xg = verso > 0 ? Math.max(x1, px - dy) : Math.min(x1, px + dy);
  return `${x1},${y1} ${xg},${y1} ${px},${py}`;
}

function Plurale({ parte }: { parte: Parte }) {
  if (!parte.plural) return null;
  return parte.irregular ? (
    <span lang="it" className="font-medium text-accent">
      {parte.plural}
      <span aria-hidden="true"> !</span>
      <span className="sr-only"> (plurale irregolare)</span>
    </span>
  ) : (
    <span lang="it" className="text-label-2">
      {parte.plural}
    </span>
  );
}

// Linee e punti sul disegno (token: alone del colore della scheda, linea label-2, punto label).
function Linee({ linee, raggio, viewBox }: { linee: Linea[]; raggio: number; viewBox?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      preserveAspectRatio={viewBox ? "none" : undefined}
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
    >
      {linee.map((l) => (
        <g key={l.n} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points={l.punti} stroke="var(--card)" strokeWidth={3} vectorEffect="non-scaling-stroke" />
          <polyline points={l.punti} stroke="var(--label-2)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      {linee.map((l) => (
        <circle
          key={l.n}
          cx={l.px}
          cy={l.py}
          r={raggio}
          fill="var(--label)"
          stroke="var(--card)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function FiguraInterattiva({
  titolo,
  viewBox,
  viewBoxMobile,
  parti,
  locale,
  disegno,
  disegnoMobile,
}: {
  titolo: string;
  viewBox: string;
  /** Sotto lg: stesso viewBox tagliato in basso. */
  viewBoxMobile: string;
  parti: Parte[];
  locale: Locale;
  /** Il disegno intero (da lg) e quello tagliato (sotto lg): svg che riempiono il contenitore. */
  disegno: ReactNode;
  disegnoMobile: ReactNode;
}) {
  const [vx, vy, vw, vh] = leggiViewBox(viewBox);
  const [, , , vhM] = leggiViewBox(viewBoxMobile);
  const [scelta, setScelta] = useState<number | null>(null);
  const [schema, setSchema] = useState<Schema | null>(null);
  // px per unità del viewBox sotto lg (1 finché non si misura: il disegno è largo ~300px sul telefono).
  const [scalaMobile, setScalaMobile] = useState(1);
  const contenitore = useRef<HTMLDivElement>(null);
  const figura = useRef<HTMLDivElement>(null);
  const figuraMobile = useRef<HTMLDivElement>(null);
  const elenco = useRef<HTMLOListElement>(null);

  const perLato = (lato: Parte["side"]) => parti.filter((p) => p.side === lato).sort((a, b) => a.y - b.y);
  const lati = [perLato("left"), perLato("right")] as const;
  const inOrdine = [...parti].sort((a, b) => a.n - b.n);

  // Sotto lg: numeri ai lati (unità del viewBox), in colonna senza sovrapporsi, linea a gomito fino al punto.
  const r = NUMERO / 2 / scalaMobile;
  const numeri = lati.flatMap((voci, l) => {
    const sx = l === 0;
    // Colonne dei numeri fuori dal disegno (a sinistra e a destra): non coprono mai la figura,
    // anche quando arriva fino al bordo del viewBox (braccia del busto).
    const fuori = (BORDO + NUMERO / 2) / scalaMobile;
    const cx = sx ? vx - fuori : vx + vw + fuori;
    const centri = disponi(
      voci.map((p) => ({ centro: p.y, h: 2 * r })),
      SPAZIO_NUMERI / scalaMobile,
      vy,
      vy + vhM,
    );
    return voci.map((p, i) => ({
      parte: p,
      cx,
      cy: centri[i],
      linea: { n: p.n, punti: gomito(sx ? cx + r : cx - r, centri[i], p.x, p.y), px: p.x, py: p.y },
    }));
  });

  // Misure: da lg posizioni delle didascalie e linee (px); sotto lg la scala del disegno.
  // ResizeObserver chiama subito la prima volta e poi a ogni cambio di misura.
  useLayoutEffect(() => {
    const box = contenitore.current;
    const fig = figura.current;
    const figM = figuraMobile.current;
    if (!box || !fig || !figM) return;
    const calcola = () => {
      // Larghezza 0 (vista nascosta o misura a metà di un ridimensionamento, es. DevTools): si ignora.
      // Con scala 0 raggi e posizioni diventerebbero Infinity / NaN negli attributi dell'svg.
      const larghezzaM = figM.offsetParent !== null ? figM.getBoundingClientRect().width : 0;
      if (larghezzaM > 0) setScalaMobile(larghezzaM / vw);
      if (fig.offsetParent === null || fig.getBoundingClientRect().width === 0) return setSchema(null);
      const rb = box.getBoundingClientRect();
      const rf = fig.getBoundingClientRect();
      const scala = rf.width / vw;
      const margini: Schema["margini"] = {};
      const linee: Linea[] = [];
      for (const colonna of box.querySelectorAll<HTMLElement>("[data-colonna]")) {
        const sx = colonna.dataset.colonna === "left";
        const rc = colonna.getBoundingClientRect();
        const voci = [...colonna.querySelectorAll<HTMLElement>("[data-n]")].map((el) => {
          const parte = parti.find((p) => p.n === Number(el.dataset.n))!;
          return { parte, h: el.getBoundingClientRect().height, centro: rf.top - rc.top + (parte.y - vy) * scala };
        });
        const centri = disponi(voci, SPAZIO, 0, rf.bottom - rc.top);
        voci.forEach((v, i) => {
          const alto = centri[i] - v.h / 2;
          const prima = i === 0 ? 0 : centri[i - 1] + voci[i - 1].h / 2;
          margini[v.parte.n] = alto - prima;
          const x1 = (sx ? rc.right + STACCO : rc.left - STACCO) - rb.left;
          const y1 = rc.top - rb.top + centri[i];
          const px = rf.left - rb.left + (v.parte.x - vx) * scala;
          const py = rf.top - rb.top + (v.parte.y - vy) * scala;
          linee.push({ n: v.parte.n, punti: gomito(x1, y1, px, py), px, py });
        });
      }
      setSchema({ margini, linee });
    };
    const osservatore = new ResizeObserver(calcola);
    osservatore.observe(fig);
    osservatore.observe(figM);
    return () => osservatore.disconnect();
  }, [parti, vx, vy, vw]);

  // Dal numero: evidenzia e, se la riga dell'elenco è fuori schermo (o sotto le barre), la porta in vista.
  const scegliDalNumero = (n: number) => {
    const nuova = scelta === n ? null : n;
    setScelta(nuova);
    if (nuova === null) return;
    const riga = elenco.current?.querySelector<HTMLElement>(`[data-riga="${n}"]`);
    if (!riga) return;
    const rr = riga.getBoundingClientRect();
    const stile = getComputedStyle(riga);
    const fuori = rr.top < parseFloat(stile.scrollMarginTop) || rr.bottom > window.innerHeight - parseFloat(stile.scrollMarginBottom);
    if (fuori) {
      const lento = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      riga.scrollIntoView({ block: "nearest", behavior: lento ? "smooth" : "auto" });
    }
  };

  const colonna = (lato: Parte["side"], voci: readonly Parte[]) => (
    <div data-colonna={lato} className={`flex flex-col ${schema ? "" : "justify-around"} ${lato === "left" ? "text-right" : "text-left"}`}>
      {voci.map((p) => (
        <div key={p.n} data-n={p.n} style={schema ? { marginTop: schema.margini[p.n] } : undefined}>
          <p lang="it" className="text-[15px] leading-[1.25] font-semibold">
            {p.it}
            {p.plural && !p.irregular && (
              <span className="text-[13px] font-normal text-label-2">
                {" · "}
                {p.plural}
              </span>
            )}
          </p>
          {p.irregular && (
            <p className="text-[13px] leading-[1.25]">
              <Plurale parte={p} />
            </p>
          )}
          <Tr locale={locale} className="block text-[13px] leading-[1.25]">
            {p.tr}
          </Tr>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-4">
      {/* Da lg */}
      <div
        ref={contenitore}
        data-vista="desktop"
        className="relative hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)_minmax(0,1fr)] lg:gap-x-3"
      >
        {colonna("left", lati[0])}
        <div ref={figura} className="w-full" style={{ aspectRatio: `${vw} / ${vh}` }}>
          {disegno}
        </div>
        {colonna("right", lati[1])}
        {schema && <Linee linee={schema.linee} raggio={3.5} />}
      </div>

      {/* Sotto lg */}
      <div data-vista="mobile" className="lg:hidden">
        <div
          ref={figuraMobile}
          className="relative mx-auto"
          // Larghezza: lascia ai lati lo spazio delle due colonne di numeri (BORDO + NUMERO per lato).
          style={{ width: `min(calc(100% - ${2 * (BORDO + NUMERO)}px), calc(45svh * ${vw} / ${vhM}))`, aspectRatio: `${vw} / ${vhM}` }}
        >
          {disegnoMobile}
          <Linee linee={numeri.map((x) => x.linea)} raggio={2.5 / scalaMobile} viewBox={viewBoxMobile} />
          {numeri.map(({ parte: p, cx, cy }) => (
            <button
              key={p.n}
              type="button"
              aria-label={`${p.n}: ${p.it}`}
              aria-pressed={scelta === p.n}
              onClick={() => scegliDalNumero(p.n)}
              className={`absolute flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[12px] font-semibold text-bg tabular-nums ring-[1.5px] ring-bg before:absolute before:-inset-x-3 before:-inset-y-0.5 before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                scelta === p.n ? "bg-accent" : "bg-label"
              }`}
              style={{ left: `${((cx - vx) / vw) * 100}%`, top: `${((cy - vy) / vhM) * 100}%` }}
            >
              {p.n}
            </button>
          ))}
        </div>

        {/* Elenco in 2 colonne (1–6 | 7–11), colonne al centro, testo della cella a sinistra: numeri allineati.
            data-celle-a-sinistra: eccezione voluta alla regola "sotto md tutto al centro" (CLAUDE.md, centrato.spec.ts). */}
        <ol
          ref={elenco}
          data-celle-a-sinistra
          aria-label={titolo}
          className="mx-auto mt-3 grid w-fit max-w-full grid-flow-col gap-x-2"
          style={{ gridTemplateRows: `repeat(${Math.ceil(inOrdine.length / 2)}, auto)` }}
        >
          {inOrdine.map((p) => (
            <li key={p.n}>
              <button
                type="button"
                data-riga={p.n}
                aria-pressed={scelta === p.n}
                onClick={() => setScelta((s) => (s === p.n ? null : p.n))}
                className={`grid min-h-11 w-full scroll-mt-20 scroll-mb-24 grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2 rounded-xl px-2 py-1.5 text-left focus-visible:outline-2 focus-visible:outline-accent ${
                  scelta === p.n ? "bg-accent/12" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-px grid size-5 place-items-center rounded-full text-[12px] font-semibold text-bg tabular-nums ${
                    scelta === p.n ? "bg-accent" : "bg-label"
                  }`}
                >
                  {p.n}
                </span>
                <span className="min-w-0">
                  <span lang="it" className="block text-[15px] leading-[1.3] font-medium">
                    {p.it}
                  </span>
                  {p.plural && (
                    <span className="block text-[13px] leading-[1.3]">
                      <Plurale parte={p} />
                    </span>
                  )}
                  <Tr locale={locale} className="block text-[13px] leading-[1.3]">
                    {p.tr}
                  </Tr>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
