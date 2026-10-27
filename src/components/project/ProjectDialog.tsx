"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Lang } from "@/i18n/config";
import { getProject } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { CaseStudy } from "./CaseStudy";

// Modal sa studijom slučaja. Koristimo HTML <dialog> sa showModal():
// browser sam rešava fokus unutar modala, zatvaranje na Escape i blokiranje pozadine.
export function ProjectDialog({ slug, lang, onClose }: { slug: string | null; lang: Lang; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const project = slug ? getProject(slug) : undefined;
  const t = getDictionary(lang);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Klik na tamnu pozadinu (sam <dialog>, ne njegov sadržaj) zatvara modal.
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-labelledby="project-dialog-title"
      className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/30 sm:m-auto sm:h-[min(90dvh,900px)] sm:w-[min(92vw,760px)]"
    >
      {project && (
        <div className="flex h-full flex-col overflow-hidden bg-paper text-ink sm:rounded-2xl sm:shadow-[0_24px_60px_rgb(0_0_0/0.18)]">
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs text-muted">{project.label[lang]}</p>
              <h2 id="project-dialog-title" className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                {project.title}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href={`/${lang}/projects/${project.slug}`}
                className="hidden min-h-11 items-center rounded-full px-3 text-sm text-muted hover:text-ink sm:inline-flex"
              >
                {t.project.page}
              </Link>
              <button
                type="button"
                onClick={() => ref.current?.close()}
                aria-label={t.chat.close}
                className="grid size-11 place-items-center rounded-full hover:bg-ink/5"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
            <CaseStudy project={project} lang={lang} />
          </div>
        </div>
      )}
    </dialog>
  );
}
