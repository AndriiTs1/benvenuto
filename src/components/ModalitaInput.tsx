"use client";

import { useEffect } from "react";

// Segna su <html> l'ultimo tipo di input: data-input="pointer" (mouse, tocco) o "keyboard".
// globals.css nasconde gli anelli di fuoco col puntatore, qualunque cosa decida il browser
// su :focus-visible (Safari a volte li mostra dopo un clic). Da tastiera restano.
export function ModalitaInput() {
  useEffect(() => {
    const radice = document.documentElement;
    const tastiera = () => radice.setAttribute("data-input", "keyboard");
    const puntatore = () => radice.setAttribute("data-input", "pointer");
    window.addEventListener("keydown", tastiera, true);
    window.addEventListener("pointerdown", puntatore, true);
    return () => {
      window.removeEventListener("keydown", tastiera, true);
      window.removeEventListener("pointerdown", puntatore, true);
    };
  }, []);
  return null;
}
