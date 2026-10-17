import type { ReactNode } from "react";

// Contenuto di un corso (qualsiasi livello: /a2, /b1…): sotto md tutto al centro
// (.contenuto-corso in globals.css). La barra in alto e la tab bar vanno fuori da qui.
// Controllo automatico: npm run test:layout (tests/centrato.spec.ts).
export function ContenutoCorso({ children }: { children: ReactNode }) {
  return <div className="contenuto-corso">{children}</div>;
}
