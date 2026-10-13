// Показывается вместо звука, если на устройстве нет итальянского голоса.
export function AudioNonDisponibile({ testo }: { testo?: string }) {
  return (
    <div className="text-center">
      {testo && <p className="text-[22px] font-semibold">«{testo}»</p>}
      <p className="mt-1 text-[13px] text-label-2">Audio non disponibile su questo dispositivo</p>
    </div>
  );
}
