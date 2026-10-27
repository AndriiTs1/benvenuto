import type { ReactNode } from "react";

// Общие классы и иконки плеера урока.

export const CAPSULA =
  "flex h-[52px] w-full items-center justify-center rounded-full bg-(--primario) text-[17px] font-semibold text-bg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] disabled:opacity-30 disabled:hover:opacity-30 disabled:active:scale-100 md:mx-auto md:w-80";

// В тёмной теме bg-grouped совпадает с bg, поэтому плитки берут цвет карточки.
export const RIEMPIMENTO = "bg-bg-grouped dark:bg-card";

export const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type IconProps = { className?: string };

function Icon({ className = "size-5", children, strokeWidth = 2 }: IconProps & { children: ReactNode; strokeWidth?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={2.5}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Icon>
  );
}

export function IconX({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={2.25}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function IconSpeaker({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.75}>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" fill="currentColor" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </Icon>
  );
}

// Icone dei tempi verbali (disegni di Lucide, ISC: circle-dot, circle-check, repeat, arrow-right).
export function IconCircleDot({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
    </Icon>
  );
}

export function IconCircleCheck({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function IconRepeat({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </Icon>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </Icon>
  );
}

// Sparkles (lucide): il condizionale, primo modo verbale del percorso.
export function IconSparkles({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </Icon>
  );
}

// Icone dei numeri del corso in /livello: libro aperto, scheda con righe, matita.
export function IconLibro({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.75}>
      <path d="M12 6.5C10.3 5.2 8 4.5 4.5 4.5v13c3.5 0 5.8.7 7.5 2 1.7-1.3 4-2 7.5-2v-13c-3.5 0-5.8.7-7.5 2z" />
      <path d="M12 6.5v13" />
    </Icon>
  );
}

export function IconScheda({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.75}>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="M7.5 9.5h9M7.5 12.5h9M7.5 15.5h5" />
    </Icon>
  );
}

export function IconMatita({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.75}>
      <path d="M14.5 5.5l4 4L9 19H5v-4z" />
      <path d="M12.5 7.5l4 4" />
    </Icon>
  );
}
