import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-dvh justify-center bg-bg text-label">
      <div className="flex w-full max-w-md flex-col px-6 pt-[max(4rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-1 flex-col items-center justify-center pt-10 pb-[12dvh] text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">Benvenuto</h1>
          <p className="mx-auto mt-3 max-w-xs text-center text-lg font-normal text-label-2 md:text-xl">
            Impara l&apos;italiano passo dopo passo
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 md:items-center">
          <Link
            href="/livello"
            className="flex h-[52px] w-full items-center justify-center rounded-full bg-label text-[17px] font-semibold text-bg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-label active:scale-[0.98] md:mx-auto md:w-80"
          >
            Inizia
          </Link>
          <p className="flex h-11 items-center justify-center text-[15px] text-label-2">
            Hai già un account?&nbsp;
            <Link href="/accedi" className="font-semibold text-label hover:underline">
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
