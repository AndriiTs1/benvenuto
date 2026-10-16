"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SEZIONI, type SezioneSlug } from "@/lib/sezioni";

const ICONE: Record<SezioneSlug, ReactNode> = {
  // Libro aperto
  grammatica: (
    <>
      <path d="M12 6.5C10.3 5.2 8 4.5 4.5 4.5v13c3.5 0 5.8.7 7.5 2 1.7-1.3 4-2 7.5-2v-13c-3.5 0-5.8.7-7.5 2z" />
      <path d="M12 6.5v13" />
    </>
  ),
  // Due schede, sulla prima una "A"
  vocabolario: (
    <>
      <rect x="3.5" y="7" width="12.5" height="13.5" rx="2.5" />
      <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h7.5a2.5 2.5 0 0 1 2.5 2.5V14a2.5 2.5 0 0 1-2.5 2.5H16" />
      <path d="M6.75 17.25l3-7 3 7M7.9 14.75h3.7" />
    </>
  ),
  // Matita con spunta
  esercizi: (
    <>
      <path d="M14.5 5.5l4 4L9 19H5v-4z" />
      <path d="M12.5 7.5l4 4" />
      <path d="M14 19.5l2 2 4-4.5" />
    </>
  ),
  // Due nuvolette di dialogo
  comunicare: (
    <>
      <path d="M14.5 9.5V6a2.5 2.5 0 0 0-2.5-2.5H5.5A2.5 2.5 0 0 0 3 6v4.5A2.5 2.5 0 0 0 5.5 13H6v3l3-3" />
      <path d="M11.5 10.5h7a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-2.5 2.5H18v2.5l-3-2.5h-3.5A2.5 2.5 0 0 1 9 17v-4a2.5 2.5 0 0 1 2.5-2.5z" />
    </>
  ),
};

// Menu del corso: tab bar in basso su mobile (stile iOS), schede in alto da md.
export function CourseTabs({ base }: { base: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sezioni del corso"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-separator bg-bg/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-[20px] md:static md:z-auto md:mt-6 md:border-0 md:bg-transparent md:pb-0 md:backdrop-blur-none"
    >
      <ul className="mx-auto flex h-[49px] max-w-md md:h-auto md:max-w-none md:justify-center md:gap-2">
        {SEZIONI.map((sezione) => {
          const href = `${base}/${sezione.slug}`;
          const attiva = pathname === href;
          return (
            <li key={sezione.slug} className="flex flex-1 md:flex-none">
              <Link
                href={href}
                transitionTypes={["nav-tab"]}
                aria-current={attiva ? "page" : undefined}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-label md:h-11 md:flex-row md:gap-2 md:rounded-full md:px-4 md:text-[15px] md:focus-visible:outline-offset-2 ${
                  attiva ? `${sezione.colore} ${sezione.sfondo}` : "text-label-2 hover:text-label md:hover:bg-label/[0.06]"
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-6 shrink-0 md:size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONE[sezione.slug]}
                </svg>
                {sezione.nome}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
