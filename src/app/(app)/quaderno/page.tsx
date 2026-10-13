import { PageHeader } from "@/components/PageHeader";

export default function QuadernoPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pt-[max(1rem,env(safe-area-inset-top))] md:max-w-lg">
      <PageHeader title="Quaderno" />
      <div className="mt-6 rounded-2xl bg-card p-5">
        <p className="text-[17px] font-semibold">Presto disponibile</p>
        <p className="mt-1 text-[15px] text-label-2">Vocabolario, Grammatica, Verbi, Numeri e tempo, Frasi utili</p>
      </div>
    </main>
  );
}
