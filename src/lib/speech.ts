import { useSyncExternalStore } from "react";

// Озвучка через Web Speech API. Вызывать только в браузере (обработчики, эффекты).

export const RATE_NORMALE = 0.9;
export const RATE_LENTO = 0.6;

const VOCI_PREFERITE = ["Alice", "Federica", "Luca", "Emma"];
// Голоса-«персонажи» Eloquence на macOS/iOS: звучат неестественно, берём их в последнюю очередь.
// Имена голосов локализуются (Alice в русской системе — «Элис»), поэтому одного списка
// предпочтений мало: иначе первым в списке оказывается Eddy.
const VOCI_ELOQUENCE = ["Eddy", "Flo", "Grandma", "Grandpa", "Reed", "Rocko", "Sandy", "Shelley"];

function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  return window.speechSynthesis;
}

function normalizzaLang(lang: string) {
  return lang.replace("_", "-").toLowerCase();
}

// Голоса грузятся асинхронно, поэтому выбираем при каждом вызове, а не один раз.
function trovaVoce(): SpeechSynthesisVoice | null {
  const synth = getSynth();
  if (!synth) return null;
  const italiane = synth.getVoices().filter((v) => normalizzaLang(v.lang).startsWith("it"));
  const itIT = italiane.filter((v) => normalizzaLang(v.lang) === "it-it");
  return (
    itIT.find((v) => VOCI_PREFERITE.some((nome) => v.name.includes(nome))) ??
    itIT.find((v) => !VOCI_ELOQUENCE.some((nome) => v.name.startsWith(nome))) ??
    itIT[0] ??
    italiane[0] ??
    null
  );
}

export function isSpeechAvailable(): boolean {
  return trovaVoce() !== null;
}

function subscribeVoices(onChange: () => void) {
  const synth = getSynth();
  if (!synth) return () => {};
  synth.addEventListener("voiceschanged", onChange);
  return () => synth.removeEventListener("voiceschanged", onChange);
}

// На сервере считаем озвучку доступной, чтобы не мигала пометка до загрузки голосов.
export function useSpeechAvailable(): boolean {
  return useSyncExternalStore(subscribeVoices, isSpeechAvailable, () => true);
}

// Произносит текст; промис завершается, когда фраза договорена или прервана.
export function speak(text: string, opts: { rate?: number } = {}): Promise<void> {
  const synth = getSynth();
  const voce = trovaVoce();
  if (!synth || !voce) return Promise.resolve();

  synth.cancel();
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "it-IT";
    utterance.voice = voce;
    utterance.rate = opts.rate ?? RATE_NORMALE;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    synth.speak(utterance);
  });
}
