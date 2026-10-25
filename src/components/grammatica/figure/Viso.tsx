import type { SVGProps } from "react";

// Figura "Il viso" (content/a2/figure/viso.json): solo il disegno, senza scritte.
// I colori della figura sono quelli del disegno originale (non token): è un'illustrazione didattica,
// uguale nel tema chiaro e scuro. Le didascalie e i punti li disegna FiguraParti sopra, con i token.
export function Viso(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="170 90 300 440" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path d="M175,530 C180,478 228,452 292,442 L348,442 C412,452 460,478 465,530 Z" fill="#F3CBA9" />
      <path d="M300,440 Q275,452 250,462 M340,440 Q365,452 390,462" fill="none" stroke="#D9A47F" strokeWidth="2" strokeLinecap="round" />
      <path d="M262,530 L266,478 Q268,462 282,456 L290,452 Q320,500 350,452 L358,456 Q372,462 374,478 L378,530 Z" fill="#5B8DEF" />
      <path d="M300,360 L300,441 Q320,462 340,441 L340,360 Z" fill="#E9B893" />
      <path d="M300,372 Q320,392 340,372 L340,360 L300,360 Z" fill="#D9A47F" />
      <ellipse cx="238" cy="252" rx="12" ry="20" fill="#EFC3A0" />
      <ellipse cx="402" cy="252" rx="12" ry="20" fill="#EFC3A0" />
      <path d="M240,242 Q233,252 240,262" fill="none" stroke="#D9A47F" strokeWidth="2" strokeLinecap="round" />
      <path d="M400,242 Q407,252 400,262" fill="none" stroke="#D9A47F" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M242,228 C242,150 284,122 320,122 C356,122 398,150 398,228 C398,298 380,346 346,374 C334,384 306,384 294,374 C260,346 242,298 242,228 Z"
        fill="#F3CBA9"
      />
      <path
        d="M234,238 C222,160 256,102 322,98 C392,95 428,150 410,238 C404,204 396,180 380,164 C362,174 322,172 286,158 C266,170 248,198 240,238 Z"
        fill="#4B3226"
      />
      <path d="M286,158 C300,140 330,132 356,140" fill="none" stroke="#5E4033" strokeWidth="3" strokeLinecap="round" />
      <path d="M270,213 Q287,201 307,207 Q289,208 272,218 Z" fill="#4B3226" />
      <path d="M370,213 Q353,201 333,207 Q351,208 368,218 Z" fill="#4B3226" />
      <ellipse cx="289" cy="233" rx="13" ry="8" fill="#ffffff" />
      <circle cx="289" cy="233" r="6" fill="#5E8B5A" />
      <circle cx="289" cy="233" r="3" fill="#1d1d1f" />
      <circle cx="291" cy="231" r="1.4" fill="#fff" />
      <path d="M276,231 Q289,222 302,231" fill="none" stroke="#3a2a20" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="351" cy="233" rx="13" ry="8" fill="#ffffff" />
      <circle cx="351" cy="233" r="6" fill="#5E8B5A" />
      <circle cx="351" cy="233" r="3" fill="#1d1d1f" />
      <circle cx="353" cy="231" r="1.4" fill="#fff" />
      <path d="M338,231 Q351,222 364,231" fill="none" stroke="#3a2a20" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M322,242 Q319,266 312,279 Q320,287 331,281"
        fill="none"
        stroke="#C98E6A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="268" cy="290" r="15" fill="#F0A3A0" opacity=".4" />
      <circle cx="372" cy="290" r="15" fill="#F0A3A0" opacity=".4" />
      <path d="M297,318 Q309,310 320,315 Q331,310 343,318 Q320,322 297,318 Z" fill="#C8676A" />
      <path d="M297,318 Q320,338 343,318 Q320,325 297,318 Z" fill="#DA7E7F" />
    </svg>
  );
}
