import type { SVGProps } from "react";
import { Persona } from "./Persona";

// Figura "Il busto e le braccia" (content/a2/figure/busto.json): la Persona dal collo in giù
// (stesso viewBox del JSON).
export function Busto(props: SVGProps<SVGSVGElement>) {
  return <Persona viewBox="115 440 410 500" {...props} />;
}
