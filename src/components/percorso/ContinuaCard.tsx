"use client";

import Link from "next/link";
import type { Modulo } from "@/content/a1/moduli";
import { useCompletate } from "@/lib/progress";

// Карточка ведёт на первый непройденный урок модуля; если пройдены все — на последний.
export function ContinuaCard({ modulo }: { modulo: Modulo }) {
  const completate = useCompletate();
  const prossima =
    modulo.lezioni.find((lezione) => !completate.includes(lezione.id)) ??
    modulo.lezioni[modulo.lezioni.length - 1];

  return (
    <section className="mt-6 rounded-3xl bg-card p-5">
      <p className="text-[13px] font-semibold tracking-wide text-label-2 uppercase">Continua</p>
      <h2 className="mt-1 text-[22px] font-bold">
        {prossima.numero} · {prossima.titolo}
      </h2>
      <p className="text-[15px] text-label-2">
        {modulo.titolo} · {prossima.minuti} min
      </p>
      <Link
        href={`/lezione/${prossima.id}`}
        className="mt-4 flex h-[50px] w-full items-center justify-center rounded-full bg-label text-[17px] font-semibold text-bg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-label active:scale-[0.98]"
      >
        Inizia
      </Link>
    </section>
  );
}
