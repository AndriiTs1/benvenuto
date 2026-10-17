import type { ReactNode } from "react";

// Общие классы и иконки плеера урока.

export const CAPSULA =
  "flex h-[52px] w-full items-center justify-center rounded-full bg-label text-[17px] font-semibold text-bg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] disabled:opacity-30 disabled:hover:opacity-30 disabled:active:scale-100 md:mx-auto md:w-80";

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
