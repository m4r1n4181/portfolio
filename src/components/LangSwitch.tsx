"use client";
// "use client" = ova komponenta radi u browseru, jer joj treba trenutna putanja (usePathname).
// Sve ostale komponente su serverske: renderuju se unapred i ne šalju JavaScript.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { languages, type Lang } from "@/i18n/config";

export function LangSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname();

  return (
    <div className="ml-2 flex rounded-md border border-line p-0.5 font-mono text-xs" role="group" aria-label="Language">
      {languages.map((l) => {
        // /en/projects/x  ->  /sr/projects/x : menjamo samo prvi deo putanje.
        const href = pathname.replace(/^\/(en|sr)(?=\/|$)/, `/${l}`);
        const active = l === lang;
        return (
          <Link
            key={l}
            href={href}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            className={`grid min-h-9 min-w-10 place-items-center rounded px-2 uppercase transition-colors ${
              active ? "bg-ink text-paper" : "text-muted hover:text-ink"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
