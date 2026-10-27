import Link from "next/link";
import type { Lang } from "@/i18n/config";
import { profile } from "@/data/profile";
import { LangSwitch } from "./LangSwitch";

// Gornja traka: ime levo (vodi na početnu), desno izbor jezika i opcioni dodatak (npr. "info").
export function TopBar({ lang, children }: { lang: Lang; children?: React.ReactNode }) {
  return (
    <header className="shrink-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={`/${lang}`} className="inline-flex min-h-11 items-center font-mono text-sm font-medium">
          {profile.name.toLowerCase()}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-1">
          {children}
          <LangSwitch lang={lang} />
        </div>
      </div>
    </header>
  );
}
