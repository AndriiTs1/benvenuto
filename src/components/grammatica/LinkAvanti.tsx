import Link from "next/link";
import type { ReactNode } from "react";

// Link testuale "… →" in fondo alla pagina (unità o argomento successivo).
export function LinkAvanti({ href, indietro = false, children }: { href: string; indietro?: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      transitionTypes={[indietro ? "nav-back" : "nav-forward"]}
      className="flex min-h-11 items-center justify-center rounded-full px-4 text-[17px] font-medium text-label hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
    </Link>
  );
}
