import { Tr } from "@/components/Tr";
import { ElencoParole } from "@/components/vocabolario/ElencoParole";
import type { GruppoParoleChiave } from "@/content/a2/grammatica";
import type { Locale } from "@/lib/lingue";

// Contenuto di "Parole chiave" (riga di Approfondisci): spiegazione e parole, a gruppi con
// sottotitolo (italiano, maiuscoletto) se keyWords li ha.
export function ParoleChiave({
  gruppi,
  nota,
  locale,
}: {
  gruppi: GruppoParoleChiave[];
  /** Spiegazione sotto il titolo, nella lingua scelta (i18n: paroleChiaveNota). */
  nota: string;
  locale: Locale;
}) {
  return (
    <>
      <Tr locale={locale} as="p" size="sm" className="block px-4 pb-3">
        {nota}
      </Tr>
      {gruppi.map((gruppo, i) => (
        <section key={i}>
          {gruppo.title && (
            <h4 lang="it" className="border-t border-separator px-4 pt-4 pb-1.5 text-[13px] tracking-wide text-label-2 uppercase">
              {gruppo.title}
            </h4>
          )}
          <ElencoParole parole={gruppo.parole} />
        </section>
      ))}
    </>
  );
}
