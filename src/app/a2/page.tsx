import { BackButton } from "@/components/BackButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PageTransition } from "@/components/PageTransition";
import { linguaScelta } from "@/lib/lingua-scelta";

// Attende la lingua sul server: il codice nel pulsante arriva già nell'HTML.
export const instant = false;

// Pagina provvisoria: il percorso A2 verrà progettato in un passo successivo.
export default async function A2Page() {
  const locale = await linguaScelta();

  return (
    <PageTransition>
      <main className="flex min-h-dvh justify-center bg-bg text-label">
        <div className="flex w-full max-w-md flex-col px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] md:max-w-lg">
          <div className="flex items-center justify-between">
            <BackButton href="/livello" />
            <LanguageSwitcher locale={locale} />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-2 pb-[10dvh] text-center">
            <h1 className="text-[34px] leading-tight font-bold tracking-tight md:text-5xl">Italiano A2</h1>
            <p className="mt-3 text-lg text-label-2">Il percorso è in preparazione.</p>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
