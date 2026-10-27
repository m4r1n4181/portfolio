"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUp } from "lucide-react";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { topics } from "./topics";

// Polje "Ask me anything" i brza pitanja na početnoj strani.
// Pitanje se prenosi na /chat kroz URL, a tamo ga chat odmah šalje.
export function AskBox({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <div className="w-full max-w-xl space-y-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) router.push(`/${lang}/chat?q=${encodeURIComponent(q.trim())}`);
        }}
        className="flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-5 shadow-[0_1px_2px_rgb(0_0_0/0.04)] focus-within:border-ink/25"
      >
        <label htmlFor="ask" className="sr-only">
          {t.composer.label}
        </label>
        <input
          id="ask"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.composer.placeholder}
          maxLength={600}
          autoComplete="off"
          className="min-h-11 flex-1 bg-transparent text-base outline-none placeholder:text-muted focus-visible:outline-none"
        />
        <button
          type="submit"
          aria-label={t.composer.send}
          disabled={!q.trim()}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-opacity disabled:opacity-30"
        >
          <ArrowUp aria-hidden className="size-4" />
        </button>
      </form>

      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {topics.map(({ id, Icon }) => (
          <li key={id}>
            <Link
              href={`/${lang}/chat?topic=${id}`}
              className="flex h-[76px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-line bg-surface text-sm font-medium transition-colors hover:border-ink/30"
            >
              <Icon aria-hidden className="size-[18px] text-muted" />
              {t.topics[id].label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
