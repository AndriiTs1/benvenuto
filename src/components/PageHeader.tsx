import Link from "next/link";

// Шапка вкладки: уровень, крупный заголовок и круглая кнопка смены уровня.
export function PageHeader({ title }: { title: string }) {
  return (
    <header className="flex items-end justify-between gap-4">
      <div>
        <p className="text-[15px] text-label-2">Livello A1</p>
        <h1 className="text-[34px] leading-tight font-bold tracking-tight">{title}</h1>
      </div>
      <Link
        href="/livello"
        aria-label="Cambia livello"
        className="mb-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-card font-semibold hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        A1
      </Link>
    </header>
  );
}
