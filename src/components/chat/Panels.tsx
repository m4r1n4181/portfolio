"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, CodeXml, FileText, Mail } from "lucide-react";
import type { Lang } from "@/i18n/config";
import { getProject, type Project } from "@/data/projects";
import { profile, skills } from "@/data/profile";
import { getDictionary } from "@/i18n/dictionaries";
import { Tags } from "@/components/project/CaseStudy";

type Open = (slug: string) => void;

// Komponente koje AI "prikazuje" kroz alate (showProjects, showSkills...).

export function ProjectsCarousel({ slugs, lang, onOpen }: { slugs: string[]; lang: Lang; onOpen: Open }) {
  const t = getDictionary(lang);
  const track = useRef<HTMLDivElement>(null);
  const items = slugs.map(getProject).filter(Boolean) as Project[];
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 296, behavior: "smooth" });

  return (
    <section aria-label={t.panels.projects} className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t.panels.projects}</h2>
      {/* Horizontalna traka sa "snap" skrolovanjem: kartice se poravnavaju pri listanju. */}
      <div
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {items.map((p) => (
          <ProjectTile key={p.slug} project={p} lang={lang} onOpen={onOpen} />
        ))}
      </div>
      {items.length > 2 && (
        <div className="flex justify-end gap-2">
          <IconButton label={t.project.prev} onClick={() => scroll(-1)}>
            <ArrowLeft aria-hidden className="size-4" />
          </IconButton>
          <IconButton label={t.project.next} onClick={() => scroll(1)}>
            <ArrowRight aria-hidden className="size-4" />
          </IconButton>
        </div>
      )}
    </section>
  );
}

// Visoka kartica po uzoru na referencu: tamna površina, oznaka i naslov gore, snimak ekrana dole.
function ProjectTile({ project, lang, onOpen }: { project: Project; lang: Lang; onOpen: Open }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project.slug)}
      className="group relative flex aspect-[3/4] w-[264px] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-line bg-subtle text-left text-ink outline-offset-4 transition-colors hover:border-ink/20 sm:w-[280px]"
    >
      <div className="relative z-10 p-5">
        <p className="text-[13px] text-muted">{project.label[lang]}</p>
        <h3 className="mt-1 text-[22px] font-semibold leading-tight tracking-tight">{project.title}</h3>
      </div>
      {project.cover ? (
        <div className="absolute inset-x-0 bottom-0 top-[42%] overflow-hidden">
          <Image
            src={project.cover.src}
            alt=""
            width={project.cover.width}
            height={project.cover.height}
            sizes="280px"
            className="absolute left-5 top-0 h-full w-auto max-w-none rounded-tl-xl border-l border-t border-line object-cover object-left-top shadow-[0_2px_12px_rgb(0_0_0/0.06)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
          />
        </div>
      ) : (
        <div className="mt-auto p-5">
          <p className="font-mono text-2xl text-accent">{project.metrics[0]?.value}</p>
          <p className="mt-1 text-sm text-muted">{project.metrics[0]?.label[lang]}</p>
        </div>
      )}
    </button>
  );
}

export function ProjectInline({ slug, lang, onOpen }: { slug: string; lang: Lang; onOpen: Open }) {
  const project = getProject(slug);
  const t = getDictionary(lang);
  if (!project) return null;
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-xs text-muted">{project.label[lang]}</p>
      <h3 className="mt-1 text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.highlight[lang]}</p>
      <div className="mt-4">
        <Tags items={project.stack.slice(0, 6)} />
      </div>
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-paper hover:bg-ink/85"
      >
        {t.project.open}
        <ArrowRight aria-hidden className="size-4" />
      </button>
    </div>
  );
}

export function SkillsPanel({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t.panels.skills}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.group.en} className="rounded-2xl border border-line bg-surface p-4">
            <h3 className="text-sm font-semibold">{s.group[lang]}</h3>
            <div className="mt-3">
              <Tags items={s.items} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutPanel({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  return (
    <section className="space-y-4 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{profile.name}</h2>
        <p className="mt-1 text-sm text-muted">
          {profile.role[lang]} · {profile.location[lang]}
        </p>
      </div>
      <div className="space-y-3 leading-relaxed text-muted">
        {profile.about.map((p) => (
          <p key={p.en}>{p[lang]}</p>
        ))}
      </div>
      <p className="border-t border-line pt-4 text-sm">
        <span className="font-semibold">{t.panels.lookingFor}: </span>
        <span className="text-muted">{profile.lookingFor[lang]}</span>
      </p>
    </section>
  );
}

export function FunPanel({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  return (
    <section className="space-y-3 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <h2 className="text-2xl font-semibold tracking-tight">{t.panels.fun}</h2>
      <ul className="flex flex-wrap gap-2">
        {profile.fun.map((f) => (
          <li key={f.en} className="rounded-full border border-line px-3 py-1.5 text-sm">
            {f[lang]}
          </li>
        ))}
      </ul>
      <p className="leading-relaxed text-muted">{profile.funNote[lang]}</p>
    </section>
  );
}

export function ContactPanel({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const { links } = profile;
  const rows = [
    { href: links.email && `mailto:${links.email}`, label: t.contact.email, detail: links.email, Icon: Mail },
    { href: links.linkedin, label: t.contact.linkedin, detail: links.linkedin.replace(/^https?:\/\/(www\.)?/, ""), Icon: Briefcase },
    { href: links.github, label: t.contact.github, detail: links.github.replace(/^https?:\/\//, ""), Icon: CodeXml },
    { href: links.cv, label: t.contact.cv, detail: "PDF", Icon: FileText },
  ].filter((r) => r.href);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t.panels.contact}</h2>
      <p className="text-muted">{profile.lookingFor[lang]}</p>
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {rows.map(({ href, label, detail, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex min-h-14 items-center gap-3 px-4 hover:bg-ink/[0.03]"
            >
              <Icon aria-hidden className="size-4 text-muted" />
              <span className="font-medium">{label}</span>
              <span className="ml-auto truncate text-sm text-muted">{detail}</span>
              <ArrowUpRight aria-hidden className="size-4 shrink-0 text-muted" />
            </a>
          </li>
        ))}
      </ul>
      {(!links.email || !links.linkedin) && <p className="text-sm text-muted">{t.contact.more}</p>}
    </section>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid size-11 place-items-center rounded-full border border-line bg-surface text-muted hover:text-ink"
    >
      {children}
    </button>
  );
}
