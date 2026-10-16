import { BackButton } from "@/components/BackButton";
import { PageTransition } from "@/components/PageTransition";

// Pagina provvisoria: il percorso A2 verrà progettato in un passo successivo.
export default function A2Page() {
  return (
    <PageTransition>
      <main className="flex min-h-dvh justify-center bg-bg text-label">
        <div className="flex w-full max-w-md flex-col px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] md:max-w-lg">
          <BackButton href="/livello" />
          <div className="flex flex-1 flex-col items-center justify-center px-2 pb-[10dvh] text-center">
            <h1 className="text-[34px] leading-tight font-bold tracking-tight md:text-5xl">Italiano A2</h1>
            <p className="mt-3 text-lg text-label-2">Il percorso è in preparazione.</p>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
