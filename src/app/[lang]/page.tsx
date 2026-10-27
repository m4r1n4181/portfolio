import Link from "next/link";
import { isLang, siteUrl } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { visibleProjects } from "@/data/projects";
import { TopBar } from "@/components/TopBar";
import { AskBox } from "@/components/AskBox";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  const t = getDictionary(lang);

  // JSON-LD: strukturisani podaci za Google (schema.org Person).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role.en,
    url: siteUrl,
    sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TopBar lang={lang} />

      <main className="rise relative z-10 flex flex-1 flex-col items-center px-4 pb-16 pt-[12vh] text-center sm:px-6">
        <p className="text-lg text-muted sm:text-xl">{t.landing.greeting}</p>
        <h1 className="mt-1 text-[44px] font-semibold leading-[1.05] tracking-tight sm:text-7xl">{profile.role[lang]}</h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">{t.landing.intro}</p>

        <div className="mt-10 flex w-full justify-center">
          <AskBox lang={lang} />
        </div>

        {/* Obični linkovi ka studijama slučaja: za Google i za one koji ne žele chat. */}
        <nav aria-label={t.landing.browse} className="mt-14 max-w-xl">
          <h2 className="text-xs text-muted">{t.landing.browse}</h2>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
            {visibleProjects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${lang}/projects/${p.slug}`}
                  className="inline-flex min-h-11 items-center underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      {/* Veliko ime u pozadini, kao u referenci. Samo ukras, čitači ekrana ga preskaču. */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] select-none text-center text-[26vw] font-bold leading-none tracking-tighter text-ink/[0.035]"
      >
        {profile.name}
      </p>
    </div>
  );
}
