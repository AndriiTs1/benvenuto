import { ViewTransition, type ReactNode } from "react";

// Transizione tra schermate in stile iOS: avanti entra da destra, indietro da sinistra.
// Le animazioni sono in globals.css (.nav-forward / .nav-back); le navigazioni
// senza tipo (es. pulsante Indietro del browser) non animano.
const DIREZIONI = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={DIREZIONI} exit={DIREZIONI} default="none">
      {children}
    </ViewTransition>
  );
}
