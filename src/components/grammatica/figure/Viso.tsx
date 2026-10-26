import type { SVGProps } from "react";
import { Persona } from "./Persona";

// Figura "Il viso" (content/a2/figure/viso.json): la parte alta della Persona (stesso viewBox del JSON).
export function Viso(props: SVGProps<SVGSVGElement>) {
  return <Persona viewBox="115 90 410 380" {...props} />;
}
