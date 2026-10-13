import Link from "next/link";
import type { ReactNode } from "react";

type ListRowProps = {
  href?: string;
  leading: ReactNode;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  first: boolean;
};

// Строка сгруппированного списка в стиле iOS: разделитель начинается после значка.
// Без href строка не нажимается и выводится без шеврона.
export function ListRow({ href, leading, title, subtitle, trailing, first }: ListRowProps) {
  const content = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg-grouped text-[15px] font-semibold">
        {leading}
      </span>
      <span
        className={`flex min-h-[60px] min-w-0 flex-1 items-center gap-3 self-stretch py-2.5 pr-4 ${
          first ? "" : "border-t border-separator"
        }`}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[17px]">{title}</span>
          {subtitle && <span className="block text-[13px] text-label-2">{subtitle}</span>}
        </span>
        {trailing}
        {href && <ChevronRight />}
      </span>
    </>
  );

  if (!href) {
    return <div className="flex min-h-[60px] items-center gap-3 pl-4">{content}</div>;
  }

  return (
    <Link
      href={href}
      className="flex min-h-[60px] items-center gap-3 pl-4 hover:bg-bg-grouped/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-label active:bg-bg-grouped"
    >
      {content}
    </Link>
  );
}

export function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 shrink-0 text-label-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ChevronLeft() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}
