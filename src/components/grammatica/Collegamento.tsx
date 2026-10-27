import Link from "next/link";
import { ChevronRight } from "@/components/ListRow";
import { Tr } from "@/components/Tr";
import type { Locale } from "@/lib/lingue";

// Collegamento a un argomento vicino (lezioni.json → links): scheda come quella degli Esercizi,
// testo italiano ("Stessa base del futuro → Il futuro") e sotto la traduzione.
export function Collegamento({ href, it, tr, locale }: { href: string; it: string; tr: string; locale: Locale }) {
  return (
    <Link
      href={href}
      data-collegamento
      transitionTypes={["nav-forward"]}
      className="flex min-h-[60px] items-center gap-3 rounded-2xl bg-card px-4 py-3 transition active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="min-w-0 flex-1">
        <span lang="it" className="block text-[17px] leading-snug font-semibold">
          {it}
        </span>
        <Tr locale={locale} size="sm" className="block">
          {tr}
        </Tr>
      </span>
      <ChevronRight />
    </Link>
  );
}
