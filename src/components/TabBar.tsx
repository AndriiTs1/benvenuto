"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// match — разделы, при которых вкладка активна (по началу пути).
type Tab = { href: string; label: string; match: string[]; icon: ReactNode };

const TABS: Tab[] = [
  {
    href: "/percorso",
    match: ["/percorso", "/modulo"],
    label: "Percorso",
    icon: (
      <>
        <path d="M9 4.5 3.75 6.5v13l5.25-2 6 2 5.25-2v-13l-5.25 2-6-2Z" />
        <path d="M9 4.5v13M15 6.5v13" />
      </>
    ),
  },
  {
    href: "/ripasso",
    match: ["/ripasso"],
    label: "Ripasso",
    icon: (
      <>
        <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
        <path d="M19.5 4.5v4h-4" />
      </>
    ),
  },
  {
    href: "/quaderno",
    match: ["/quaderno"],
    label: "Quaderno",
    icon: (
      <>
        <path d="M12 6.5c-1.8-1.3-4.5-2-8.25-2v13c3.75 0 6.45.7 8.25 2 1.8-1.3 4.5-2 8.25-2v-13c-3.75 0-6.45.7-8.25 2Z" />
        <path d="M12 6.5v13" />
      </>
    ),
  },
  {
    href: "/profilo",
    match: ["/profilo"],
    label: "Profilo",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.75" />
        <path d="M4.5 20c.9-3.6 3.9-5.5 7.5-5.5s6.6 1.9 7.5 5.5" />
      </>
    ),
  },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigazione principale"
      className="fixed inset-x-0 bottom-0 border-t border-separator bg-bg/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
    >
      <div className="mx-auto grid h-14 max-w-lg grid-cols-4">
        {TABS.map((tab) => {
          const isActive = tab.match.some((prefix) => pathname.startsWith(prefix));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
                isActive ? "text-label" : "text-label-2"
              }`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {tab.icon}
              </svg>
              <span className="text-[11px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
