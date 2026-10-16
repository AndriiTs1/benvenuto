import type { ReactNode } from "react";
import type { Locale } from "@/lib/lingue";

// Testo nella lingua delle spiegazioni (traduzioni, regole, note): colore proprio e lang.
// L'italiano resta nel colore principale.
export function Tr({
  locale,
  children,
  className = "",
  as: Tag = "span",
}: {
  locale: Locale;
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "div" | "li";
}) {
  return (
    <Tag lang={locale} className={`text-translation ${className}`}>
      {children}
    </Tag>
  );
}
