import type { SVGProps } from "react";

// La persona intera, un solo disegno nelle coordinate del viso. Le figure (Viso, Busto…) ne mostrano
// una parte con il proprio viewBox (content/a2/figure/<id>.json): stessa scala, nessuna giuntura.
// Colori del disegno originale (non token), uguali nel tema chiaro e scuro.
// Livelli: gambe → pantaloncini → pantaloni → pelle del busto → braccia → canottiera → collo e ombra →
// linee dei trapezi → orecchie → viso → capelli → tratti del viso.

/** Busto e braccia: disegnati nelle loro coordinate, spostati sotto il collo. */
const BUSTO = "translate(-20,384)";

// Il braccio sinistro; il destro è lo stesso gruppo specchiato.
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

// La gamba sinistra (con il piede), già nelle coordinate della persona; la destra è lo stesso gruppo specchiato.
function Gamba(props: SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <path
        d="M232,960 C222,1020 228,1100 236,1150 C226,1200 222,1250 232,1300 C238,1340 244,1370 246,1395 L276,1395 C278,1360 286,1320 294,1270 C300,1230 294,1180 290,1150 C300,1100 312,1030 314,960 Z"
        fill="#F3CBA9"
      />
      <path d="M245,1150 Q263,1140 282,1150" stroke="#D9A47F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M250,1162 Q263,1172 276,1162" stroke="#E2AE88" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".8" />
      <path d="M234,1205 Q226,1248 240,1292" stroke="#D9A47F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M268,1180 Q272,1260 270,1340" stroke="#E2AE88" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".7" />
      <path
        d="M240,1390 C234,1410 222,1430 220,1446 C220,1456 236,1462 262,1462 L290,1462 C298,1458 294,1440 286,1420 C282,1405 279,1396 276,1390 Z"
        fill="#F3CBA9"
      />
      <circle cx="245" cy="1388" r="4" fill="#E2AE88" />
      <g fill="#EFC3A0">
        <ellipse cx="286" cy="1458" rx="8" ry="7" />
        <ellipse cx="272" cy="1460" rx="6" ry="6" />
        <ellipse cx="260" cy="1460" rx="5.5" ry="5.5" />
        <ellipse cx="248" cy="1458" rx="5" ry="5" />
        <ellipse cx="237" cy="1455" rx="4.5" ry="4.5" />
      </g>
    </g>
  );
}

export function Persona(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      {/* Gambe e piedi, poi i pantaloncini (sotto i pantaloni del busto) */}
      <Gamba />
      <Gamba transform="translate(640,0) scale(-1,1)" />
      <path d="M228,920 L412,920 L418,1040 L330,1040 L320,985 L310,1040 L222,1040 Z" fill="#3E4A61" />
      {/* Cucitura: parte da y 936, dove finisce quella dei pantaloni del busto (nel disegno originale: 940, con 4 unità di vuoto). */}
      <path d="M320,936 L320,985" stroke="#2F394D" strokeWidth="2" />

      {/* Pantaloni, pelle del busto, braccia, canottiera */}
      <g transform={BUSTO}>
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
      </g>

      {/* Collo (largo come quello del busto) e ombra sotto il mento */}
      <path d="M282,330 L282,454 Q320,488 358,454 L358,330 Z" fill="#E9B893" />
      <path d="M282,330 L358,330 L358,372 Q320,398 282,372 Z" fill="#D9A47F" />

      {/* Linee dei trapezi */}
      <g transform={BUSTO}>
        <path d="M300,64 Q275,76 252,84 M380,64 Q405,76 428,84" stroke="#D9A47F" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* Orecchie */}
      <ellipse cx="238" cy="252" rx="12" ry="20" fill="#EFC3A0" />
      <ellipse cx="402" cy="252" rx="12" ry="20" fill="#EFC3A0" />
      <path d="M240,242 Q233,252 240,262" fill="none" stroke="#D9A47F" strokeWidth="2" strokeLinecap="round" />
      <path d="M400,242 Q407,252 400,262" fill="none" stroke="#D9A47F" strokeWidth="2" strokeLinecap="round" />

      {/* Viso e capelli */}
      <path
        d="M242,228 C242,150 284,122 320,122 C356,122 398,150 398,228 C398,298 380,346 346,374 C334,384 306,384 294,374 C260,346 242,298 242,228 Z"
        fill="#F3CBA9"
      />
      <path
        d="M234,238 C222,160 256,102 322,98 C392,95 428,150 410,238 C404,204 396,180 380,164 C362,174 322,172 286,158 C266,170 248,198 240,238 Z"
        fill="#4B3226"
      />
      <path d="M286,158 C300,140 330,132 356,140" fill="none" stroke="#5E4033" strokeWidth="3" strokeLinecap="round" />

      {/* Tratti del viso */}
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
