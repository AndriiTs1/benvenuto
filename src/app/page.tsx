import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-dvh justify-center bg-bg text-label">
      <div className="flex w-full max-w-md flex-col px-6 pt-[max(4rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">benvenuto</h1>
          <p className="mt-3 text-lg text-label-2 md:text-xl">
            Impara l&apos;italiano passo dopo passo
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:mx-auto md:max-w-sm">
          <Link
            href="/livello"
            className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-accent text-[17px] font-semibold text-white transition active:opacity-80"
          >
            Inizia
          </Link>
          <Link
            href="/accedi"
            className="flex h-11 w-full items-center justify-center text-[17px] font-medium text-accent transition active:opacity-60"
          >
            Ho già un account
          </Link>
        </div>
      </div>
    </main>
  );
}
