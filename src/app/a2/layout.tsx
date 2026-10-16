import type { ReactNode } from "react";
import { CourseBack } from "@/components/corso/CourseBack";
import { CourseHeader } from "@/components/corso/CourseHeader";
import { CourseTabs } from "@/components/corso/CourseTabs";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PageTransition } from "@/components/PageTransition";
import { unitaPerSlug } from "@/content/a2/grammatica";
import { dizionario } from "@/lib/i18n";
import { linguaScelta } from "@/lib/lingua-scelta";

// Attende la lingua sul server: sottotitoli e codice lingua arrivano già nell'HTML.
export const instant = false;

export default async function A2Layout({ children }: { children: ReactNode }) {
  const locale = await linguaScelta();
  const testi = dizionario(locale);

  return (
    <PageTransition>
      <div className="min-h-dvh bg-bg-grouped text-label">
        <header className="mx-auto w-full max-w-188 px-4 pt-[max(1rem,env(safe-area-inset-top))]">
          {/* Colonna di 720px (+ margini). Da md: Indietro · schede al centro · lingua; su mobile le schede sono la tab bar in basso. */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div className="col-start-1 justify-self-start">
              <CourseBack unitaPerSlug={await unitaPerSlug(locale)} />
            </div>
            <CourseTabs base="/a2" />
            <div className="col-start-3 justify-self-end">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
          <CourseHeader locale={locale} sottotitoli={testi.sezioni} />
        </header>

        {/* Su mobile lascia spazio alla tab bar fissa (49px + safe area). */}
        <main className="mx-auto w-full max-w-188 px-4 pt-6 pb-[calc(49px+env(safe-area-inset-bottom)+1.5rem)] md:pb-12">
          {children}
        </main>
      </div>
    </PageTransition>
  );
}
