import { ArrowUpRight } from "lucide-react";
import type { Lang, Localized } from "@/i18n/config";
import type { Project } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { Media } from "./Media";
import { CopyValue } from "./CopyValue";

// Sadržaj studije slučaja. Isti se koristi u modalu (chat) i na stranici /projects/[slug],
// zato nema sopstveni naslov stranice ni margine: to određuje roditelj.
export function CaseStudy({ project, lang }: { project: Project; lang: Lang }) {
  const t = getDictionary(lang).project;
  const [lead, ...gallery] = project.media;

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <p className="text-[15px] leading-relaxed text-muted sm:text-base">{project.summary[lang]}</p>
        <p className="border-l-2 border-accent pl-4 font-medium">{project.highlight[lang]}</p>
        <ProjectLinks project={project} lang={lang} />
      </div>

      {project.metrics.length > 0 && (
        <dl className="grid gap-2 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.value} className="rounded-xl bg-subtle px-4 py-3">
              <dd className="font-mono text-lg font-medium text-accent">{m.value}</dd>
              <dt className="mt-0.5 text-sm text-muted">{m.label[lang]}</dt>
            </div>
          ))}
        </dl>
      )}

      {lead && <Media item={lead} lang={lang} priority />}

      <Section title={t.problem}>
        <p className="leading-relaxed text-muted">{project.problem[lang]}</p>
      </Section>
      {project.approach.length > 0 && (
        <Section title={t.approach}>
          <Bullets items={project.approach} lang={lang} />
        </Section>
      )}
      {project.results.length > 0 && (
        <Section title={t.results}>
          <Bullets items={project.results} lang={lang} />
        </Section>
      )}
      {project.learned.length > 0 && (
        <Section title={t.learned}>
          <Bullets items={project.learned} lang={lang} />
        </Section>
      )}

      {gallery.length > 0 && (
        <Section title={t.media}>
          <div className="space-y-8">
            {gallery.map((m) => (
              <Media key={m.src} item={m} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      {project.limitations.length > 0 && (
        <Section title={t.limitations}>
          <Bullets items={project.limitations} lang={lang} />
        </Section>
      )}

      <Section title={t.stack}>
        <Tags items={project.stack} />
      </Section>
    </div>
  );
}

export function ProjectLinks({ project, lang }: { project: Project; lang: Lang }) {
  const t = getDictionary(lang).project;
  const { links } = project;
  const items = [
    links.demo && { href: links.demo, label: t.demo, primary: true },
    links.video && { href: links.video, label: t.video, primary: !links.demo },
    links.github && { href: links.github, label: t.code, primary: false },
  ].filter(Boolean) as { href: string; label: string; primary: boolean }[];
  if (!items.length) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {items.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors ${
              l.primary ? "bg-ink text-paper hover:bg-ink/85" : "border border-line bg-surface hover:border-ink/30"
            }`}
          >
            {l.label}
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        ))}
      </div>
      {links.demo && project.demoNote && (
        <p className="text-xs text-muted">
          {project.demoNote[lang]}
          {project.loginOnRequest && !project.demoLogins?.length ? ` ${t.loginOnRequest}` : ""}
        </p>
      )}
      {links.demo && project.demoLogins?.length ? (
        <div className="rounded-xl bg-subtle p-4 text-sm">
          <p className="font-medium">{t.demoLogin}</p>
          <dl className="mt-2 space-y-3">
            {project.demoLogins.map((d) => (
              <div key={d.email}>
                <dt className="text-xs text-muted">{d.role[lang]}</dt>
                <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <CopyValue value={d.email} label={t.copy} done={t.copied} />
                  <CopyValue value={d.password} label={t.copy} done={t.copied} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function Bullets({ items, lang }: { items: Localized[]; lang: Lang }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.en} className="flex gap-3 leading-relaxed text-muted">
          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink/40" />
          <span>{item[lang]}</span>
        </li>
      ))}
    </ul>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li key={s} className="rounded-md bg-subtle px-2 py-1 text-xs text-ink/80">
          {s}
        </li>
      ))}
    </ul>
  );
}
