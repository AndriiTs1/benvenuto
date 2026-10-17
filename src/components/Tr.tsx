import type { ReactNode } from "react";
import type { Locale } from "@/lib/lingue";

// L'unico modo di mostrare testo nella lingua delle spiegazioni (ru / uk / en):
// colore --color-translation e lang. L'italiano resta nel colore principale.
// Una stringa può contenere {{…}} (frammento italiano: colore principale, 500, senza a capo)
// e **…** (grassetto). className serve solo a layout e peso, mai al colore.

const DIMENSIONI = {
  xs: "text-[13px] leading-normal",
  sm: "text-[15px] leading-normal",
  md: "text-[16px] leading-normal md:text-[17px]",
  lg: "text-[16px] leading-normal md:text-[20px]",
};

export function Tr({
  locale,
  children,
  size,
  className = "",
  as: Tag = "span",
}: {
  locale: Locale;
  children: ReactNode;
  size?: keyof typeof DIMENSIONI;
  className?: string;
  as?: "span" | "p" | "div" | "li";
}) {
  return (
    <Tag lang={locale} className={`text-translation ${size ? DIMENSIONI[size] : ""} ${className}`}>
      {typeof children === "string" ? <Marcato testo={children} /> : children}
    </Tag>
  );
}

function Marcato({ testo }: { testo: string }): ReactNode {
  return testo.split(/(\{\{.*?\}\}|\*\*.*?\*\*)/).map((parte, i) => {
    if (parte.startsWith("{{") && parte.endsWith("}}")) {
      return (
        <span key={i} lang="it" className="font-medium whitespace-nowrap text-label">
          {parte.slice(2, -2)}
        </span>
      );
    }
    if (parte.startsWith("**") && parte.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          <Marcato testo={parte.slice(2, -2)} />
        </strong>
      );
    }
    return parte;
  });
}
