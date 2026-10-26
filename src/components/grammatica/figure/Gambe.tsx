import type { SVGProps } from "react";
import { Persona } from "./Persona";

// Figura "Le gambe e i piedi" (content/a2/figure/gambe.json): la Persona dai pantaloncini in giù
// (stesso viewBox del JSON).
export function Gambe(props: SVGProps<SVGSVGElement>) {
  return <Persona viewBox="115 925 410 550" {...props} />;
}
