import Link from "next/link";
import { notFound } from "next/navigation";
import { Tr } from "@/components/Tr";
import { ElencoParole } from "@/components/vocabolario/ElencoParole";
import { getGruppi, getGruppo, TIPI } from "@/content/a2/vocabolario";
import { DEFAULT_LOCALE } from "@/lib/lingue";
import { linguaScelta } from "@/lib/lingua-scelta";

export async function generateStaticParams() {
  return (await getGruppi(DEFAULT_LOCALE)).map((g) => ({ gruppo: g.slug }));
}

// Uno slug inesistente → 404 (proxy.ts lo intercetta prima; notFound() resta come seconda difesa).
export const instant = false;

export default async function GruppoPage({ params, searchParams }: PageProps<"/a2/vocabolario/[gruppo]">) {
  const { gruppo: slug } = await params;
  const tipoParam = (await searchParams).tipo;
  const locale = await linguaScelta();
  const dati = await getGruppo(locale, slug);
  if (!dati) notFound();
  const { gruppo, parole } = dati;

  // Filtri per parte del discorso; si mostrano solo quelli che hanno parole.
  const filtri = TIPI.map((t) => ({ ...t, parole: parole.filter((p) => (t.pos as readonly string[]).includes(p.pos)) })).filter(
    (t) => t.parole.length > 0,
  );
  const attivo = filtri.find((t) => t.slug === tipoParam);
  const visibili = attivo ? attivo.parole : parole;

  return (
    <div className="space-y-6">
      <header>
        <h1 lang="it" className="text-[28px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[40px]">
          {gruppo.it}
        </h1>
        <Tr locale={gruppo.lingua} as="p" size="lg" className="mt-1">
          {gruppo.sottotitolo}
        </Tr>
        <p className="mt-2 text-[15px] text-label-2 tabular-nums">{parole.length} parole</p>
      </header>

      <nav aria-label="Filtra per tipo" className="flex flex-wrap gap-2 max-md:justify-center">
        <Filtro href={`/a2/vocabolario/${slug}`} attivo={!attivo}>
          Tutti
        </Filtro>
        {filtri.map((t) => (
          <Filtro key={t.slug} href={`/a2/vocabolario/${slug}?tipo=${t.slug}`} attivo={attivo?.slug === t.slug}>
            {t.nome}
          </Filtro>
        ))}
      </nav>

      <div className="overflow-hidden rounded-2xl bg-card">
        <ElencoParole parole={visibili} primaLinea={false} />
      </div>
    </div>
  );
}

function Filtro({ href, attivo, children }: { href: string; attivo: boolean; children: string }) {
  return (
    <Link
      href={href}
      replace
      scroll={false}
      aria-current={attivo ? "page" : undefined}
      className={`flex h-11 items-center rounded-full px-4 text-[15px] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        attivo ? "bg-vocab-soft font-semibold text-vocab" : "bg-label/[0.08] text-label hover:bg-label/[0.12] dark:bg-label/[0.16]"
      }`}
    >
      {children}
    </Link>
  );
}
