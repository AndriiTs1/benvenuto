import { NextResponse, type NextRequest } from "next/server";
import { LEVEL_COOKIE, isAvailableLevel, levelHref } from "@/lib/levels";

// Chi ha già scelto un livello salta il benvenuto e va al suo corso.
export function proxy(request: NextRequest) {
  const level = request.cookies.get(LEVEL_COOKIE)?.value;
  if (isAvailableLevel(level)) {
    return NextResponse.redirect(new URL(levelHref(level), request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
