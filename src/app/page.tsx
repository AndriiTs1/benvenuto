import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh bg-lago text-white">
      <div className="relative mx-auto flex min-h-dvh max-w-md flex-col justify-end overflow-hidden px-6 pb-10">
        <svg
          aria-hidden="true"
          viewBox="0 0 390 420"
          className="absolute inset-x-0 top-16 w-full"
        >
          <circle cx="195" cy="170" r="168" fill="none" stroke="#F2B33D" strokeWidth="2" opacity="0.08" />
          <circle cx="195" cy="170" r="130" fill="none" stroke="#F2B33D" strokeWidth="2" opacity="0.18" />
          <circle cx="195" cy="170" r="92" fill="#F2B33D" />
          <path
            d="M0 250 L70 190 L120 225 L190 150 L260 215 L310 180 L390 240 L390 420 L0 420 Z"
            fill="#1A3A55"
          />
          <path
            d="M0 280 L90 230 L150 262 L230 212 L300 255 L390 228 L390 420 L0 420 Z"
            fill="#24425C"
          />
          <rect x="0" y="300" width="390" height="120" fill="#1F7A74" />
          <g fill="none" stroke="#8FD3C9" strokeWidth="3" strokeLinecap="round">
            <path d="M40 330 q15 -8 30 0 t30 0" />
            <path d="M220 350 q15 -8 30 0 t30 0 t30 0" />
            <path d="M110 385 q15 -8 30 0 t30 0" />
          </g>
        </svg>

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="size-3.5 rounded-full bg-sole" />
            <h1 className="font-display text-5xl font-bold tracking-tight">benvenuto</h1>
          </div>
          <p className="mt-3 text-xl text-white/80">Impara l&apos;italiano passo dopo passo</p>

          <div className="mt-10 flex flex-col gap-3">
            <Link
              href="/livello"
              className="flex h-14 items-center justify-center rounded-2xl bg-sole font-bold text-lago transition-transform active:scale-[0.98]"
            >
              Iniziamo →
            </Link>
            <Link
              href="/accedi"
              className="flex h-12 items-center justify-center rounded-2xl border border-white/25 text-white"
            >
              Ho già un account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
