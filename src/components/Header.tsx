import Link from "next/link";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { LangSwitch } from "./LangSwitch";

export function Header({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const items = [
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${lang}`} className="font-mono text-sm font-medium tracking-tight">
          {profile.name.toLowerCase()}
          <span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {/* Na telefonu sakrivamo linkove sekcija, ostaje samo izbor jezika. */}
          <div className="hidden items-center gap-1 sm:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="rounded-md px-3 py-2 text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <LangSwitch lang={lang} />
        </nav>
      </div>
    </header>
  );
}
