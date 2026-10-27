import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isLang, languages } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, visibleProjects } from "@/data/projects";
import { TopBar } from "@/components/TopBar";
import { CaseStudy } from "@/components/project/CaseStudy";

// Statička stranica za svaki projekat na svakom jeziku. Ovo indeksira Google.
export function generateStaticParams() {
  return languages.flatMap((lang) => visibleProjects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLang(lang)) return {};
  return {
    title: project.title,
    description: project.summary[lang],
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: { en: `/en/projects/${slug}`, sr: `/sr/projects/${slug}` },
    },
    openGraph: project.cover ? { images: [{ url: project.cover.src }] } : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLang(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <TopBar lang={lang} />
      <main className="rise mx-auto max-w-3xl px-4 pb-24 pt-6 sm:px-6">
        <Link
          href={`/${lang}/chat?topic=projects`}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {t.project.back}
        </Link>
        <p className="mt-6 text-sm text-muted">{project.label[lang]}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-tight">{project.title}</h1>
        <div className="mt-6">
          <CaseStudy project={project} lang={lang} />
        </div>
      </main>
    </>
  );
}
