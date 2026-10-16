import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";

// Pagina provvisoria: il percorso A2 verrà progettato in un passo successivo.
export default function A2Page() {
  return (
    <PageTransition>
      <main className="flex min-h-dvh justify-center bg-bg text-label">
        <div className="flex w-full max-w-md flex-col items-center justify-center px-6 pt-[max(4rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center">
          <h1 className="text-[34px] leading-tight font-bold tracking-tight md:text-5xl">Italiano A2</h1>
          <p className="mt-3 text-lg text-label-2">Il percorso è in preparazione.</p>
          <Link
            href="/livello"
            transitionTypes={["nav-back"]}
            className="mt-6 inline-flex h-11 items-center text-[17px] text-accent hover:underline"
          >
            Cambia livello
          </Link>
        </div>
      </main>
    </PageTransition>
  );
}
