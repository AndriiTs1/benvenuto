import type { SVGProps } from "react";

// Figura "Il busto e le braccia" (content/a2/figure/busto.json): solo il disegno, senza scritte.
// Come Viso.tsx: colori del disegno originale (non token), uguali nel tema chiaro e scuro.
// Livelli: pantaloni → pelle del busto → le due braccia → canottiera → collo.
// Il braccio è disegnato una volta (sinistro); il destro è lo stesso gruppo specchiato.

function Braccio(props: SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <ellipse cx="206" cy="122" rx="34" ry="32" fill="#F3CBA9" />
      <path
        d="M190,104 C164,128 152,190 158,240 C161,270 162,292 160,312 C150,350 146,400 150,440 L184,442 C188,400 196,350 200,312 C212,290 232,262 240,220 C246,186 240,150 224,126 Z"
        fill="#F3CBA9"
      />
      <path d="M178,152 Q206,166 236,150" stroke="#D9A47F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M196,168 Q186,225 194,286" stroke="#D9A47F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M232,176 Q240,222 214,268" stroke="#E2AE88" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7" />
      <path d="M170,322 Q164,380 166,430" stroke="#D9A47F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path
        d="M148,488 L142,522 M159,494 L156,534 M171,494 L173,531 M181,486 L186,516 M184,454 L199,476"
        stroke="#F3CBA9"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <ellipse cx="165" cy="470" rx="25" ry="31" fill="#F3CBA9" />
      <path d="M151,448 Q166,442 181,449" stroke="#D9A47F" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

export function Busto(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="225 0 410 556" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <g transform="translate(90,0)">
        <path d="M252,462 L428,462 L432,552 L248,552 Z" fill="#3E4A61" />
        <path d="M340,505 L340,552" stroke="#2F394D" strokeWidth="2" />
        <path
          d="M300,56 Q262,80 216,90 Q196,96 190,120 L238,150 L250,200 L256,470 L424,470 L430,200 L442,150 L490,120 Q484,96 464,90 Q418,80 380,56 Z"
          fill="#F3CBA9"
        />
        <Braccio />
        <Braccio transform="translate(680,0) scale(-1,1)" />
        <path
          d="M282,78 L264,98 Q258,150 252,198 Q248,330 254,480 L426,480 Q432,330 428,198 Q422,150 416,98 L398,78 Q388,128 340,132 Q292,128 282,78 Z"
          fill="#5B8DEF"
        />
        <path d="M286,160 Q312,180 338,172 M342,172 Q368,180 394,160" stroke="#4776D6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M340,140 L340,250" stroke="#4776D6" strokeWidth="1.5" opacity=".6" />
        <path d="M258,478 L422,478" stroke="#4776D6" strokeWidth="3" />
        <path d="M302,0 L302,70 Q340,104 378,70 L378,0 Z" fill="#E9B893" />
        <path d="M302,0 L378,0 L378,14 Q340,26 302,14 Z" fill="#D9A47F" />
        <path d="M300,64 Q275,76 252,84 M380,64 Q405,76 428,84" stroke="#D9A47F" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
