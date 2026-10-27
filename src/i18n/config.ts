// Jezici koje sajt podržava. "en" je podrazumevani.
// `as const` kaže TypeScriptu da ovo nisu bilo kakvi stringovi,
// nego tačno "en" i "sr", pa iz toga možemo izvesti tip Lang.
export const languages = ["en", "sr"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "en";

export function isLang(value: string): value is Lang {
  return (languages as readonly string[]).includes(value);
}

// Tekst koji postoji na oba jezika.
export type Localized = Record<Lang, string>;

// Adresa sajta. Na Vercelu je postavi kao env promenljivu NEXT_PUBLIC_SITE_URL.
// "||" a ne "??": prazna vrednost (NEXT_PUBLIC_SITE_URL=) je "" i mora da padne na podrazumevanu,
// inače new URL("") pukne i stranica se ne učita.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
