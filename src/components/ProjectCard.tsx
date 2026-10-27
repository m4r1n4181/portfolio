import Link from "next/link";
import type { Lang } from "@/i18n/config";
import type { Project } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";

// Velika kartica za izdvojeni projekat (web-automation).
export function FeaturedProject({ project, lang }: { project: Project; lang: Lang }) {
  const t = getDictionary(lang);
  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      className="group block rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent sm:p-8"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-accent">{t.featured.label}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
      <p className="mt-3 max-w-2xl text-muted">{project.summary[lang]}</p>

      {project.metrics.length > 0 && (
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.value} className="rounded-xl bg-accent-soft px-4 py-3">
              <dt className="sr-only">{m.label[lang]}</dt>
              <dd className="font-mono text-xl font-medium text-accent">{m.value}</dd>
              <dd className="mt-1 text-sm text-muted">{m.label[lang]}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <StackTags stack={project.stack} />
        <span className="text-sm font-medium text-accent">
          {t.featured.cta} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

// Standardna kartica u mreži projekata.
export function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const t = getDictionary(lang);
  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent"
    >
      <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 text-sm text-muted">{project.summary[lang]}</p>
      <p className="mt-4 border-l-2 border-accent pl-3 text-sm font-medium">{project.highlight[lang]}</p>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
        <StackTags stack={project.stack.slice(0, 4)} />
        <span className="text-sm text-accent">
          {t.projects.caseStudy} <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

export function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">
          {s}
        </li>
      ))}
    </ul>
  );
}
