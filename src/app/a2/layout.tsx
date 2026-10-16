import type { ReactNode } from "react";
import { BackButton } from "@/components/BackButton";
import { CourseHeader } from "@/components/corso/CourseHeader";
import { CourseTabs } from "@/components/corso/CourseTabs";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PageTransition } from "@/components/PageTransition";
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
        <header className="mx-auto w-full max-w-md px-4 pt-[max(1rem,env(safe-area-inset-top))] md:max-w-2xl">
          <div className="flex items-center justify-between">
            <BackButton href="/livello" />
            <LanguageSwitcher locale={locale} />
          </div>
          <CourseHeader locale={locale} sottotitoli={testi.sezioni} />
        </header>

        <CourseTabs base="/a2" />

        {/* Su mobile lascia spazio alla tab bar fissa (49px + safe area). */}
        <main className="mx-auto w-full max-w-md px-4 pt-6 pb-[calc(49px+env(safe-area-inset-bottom)+1.5rem)] md:max-w-2xl md:pb-12">
          {children}
        </main>
      </div>
    </PageTransition>
  );
}
