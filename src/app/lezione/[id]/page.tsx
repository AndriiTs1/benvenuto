import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/lezione/LessonPlayer";
import { ChevronLeft } from "@/components/ListRow";
import { MODULI_A1 } from "@/content/a1/moduli";
import { getLezioneContenuto } from "@/content/a1/lezioni";

const LEZIONI = MODULI_A1.flatMap((modulo) => modulo.lezioni);

export function generateStaticParams() {
  return LEZIONI.map((lezione) => ({ id: lezione.id }));
}

// Неизвестный id должен давать настоящий 404, поэтому params читаются вне Suspense.
export const instant = false;

export default async function LezionePage({ params }: PageProps<"/lezione/[id]">) {
  const { id } = await params;
  const lezione = LEZIONI.find((l) => l.id === id);
  if (!lezione) notFound();

  const contenuto = getLezioneContenuto(id);
  if (contenuto) return <LessonPlayer lezione={contenuto} />;

  return (
    <main className="min-h-dvh bg-bg text-label">
      <div className="mx-auto w-full max-w-md px-5 pt-[max(0.5rem,env(safe-area-inset-top))] md:max-w-lg">
        <Link
          href="/percorso"
          className="-ml-1 inline-flex h-11 items-center gap-1 text-[17px] text-label hover:opacity-70"
        >
          <ChevronLeft />
          Percorso
        </Link>
        <p className="mt-2 text-[15px] text-label-2">Lezione {lezione.numero}</p>
        <h1 className="text-[34px] leading-tight font-bold tracking-tight">{lezione.titolo}</h1>
        <div className="mt-6 rounded-2xl bg-bg-grouped p-5 dark:bg-card">
          <p className="text-[17px] font-semibold">Lezione in preparazione</p>
          <p className="mt-1 text-[15px] text-label-2">Presto disponibile</p>
        </div>
      </div>
    </main>
  );
}
