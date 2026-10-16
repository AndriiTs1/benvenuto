import { ViewTransition, type ReactNode } from "react";

// Contenuto della sezione: cambiando scheda fa solo una breve dissolvenza (.tab-fade in globals.css).
const DISSOLVENZA = { "nav-tab": "tab-fade", default: "none" };

export function TabContent({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={DISSOLVENZA} exit={DISSOLVENZA} default="none">
      {children}
    </ViewTransition>
  );
}
