import { cookies, headers } from "next/headers";
import { LANG_COOKIE, isLocale, type Locale } from "@/lib/lingue";

// Accept-Language in ordine di preferenza (q): la prima lingua ru/uk/en vince, altrimenti en.
function daAcceptLanguage(header: string | null): Locale {
  const lingue = (header ?? "")
    .split(",")
    .map((parte) => {
      const [tag, ...params] = parte.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag, q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((lingua) => lingua.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of lingue) {
    if (tag.startsWith("uk")) return "uk";
    if (tag.startsWith("ru")) return "ru";
    if (tag.startsWith("en")) return "en";
  }
  return "en";
}

// Lingua delle spiegazioni (solo lato server): cookie bv_lang, altrimenti Accept-Language.
export async function linguaScelta(): Promise<Locale> {
  const cookie = (await cookies()).get(LANG_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;
  return daAcceptLanguage((await headers()).get("accept-language"));
}
