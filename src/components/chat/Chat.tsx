"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import { ArrowUp, ChevronDown, ChevronUp, Square } from "lucide-react";
import type { Lang } from "@/i18n/config";
import { getDictionary, type Topic } from "@/i18n/dictionaries";
import { visibleProjects } from "@/data/projects";
import type { ShowProjectOutput, ShowProjectsOutput } from "@/lib/chat-tools";
import { isTopic, topics } from "@/components/topics";
import { ProjectDialog } from "@/components/project/ProjectDialog";
import { AboutPanel, ContactPanel, FunPanel, ProjectInline, ProjectsCarousel, SkillsPanel } from "./Panels";

const uid = () => Math.random().toString(36).slice(2, 10);

export function Chat({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  // "Transport" = kako useChat šalje poruke serveru. Šaljemo i jezik stranice.
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat", body: { lang } }), [lang]);
  const { messages, setMessages, sendMessage, status, error, regenerate, stop, clearError } = useChat({ transport });

  const [input, setInput] = useState("");
  const [showQuick, setShowQuick] = useState(true);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const busy = status === "submitted" || status === "streaming";

  // Brza pitanja odgovaraju odmah, bez poziva AI-ja: sami dodajemo pitanje i odgovor
  // sa "gotovim" pozivom alata. Besplatno, trenutno, i radi i kad AI nije povezan.
  // Pošto je u istom formatu kao pravi poziv alata, AI ga vidi u istoriji i zna šta je prikazano.
  function askTopic(topic: Topic) {
    if (busy) return;
    clearError();
    const def = topics.find((x) => x.id === topic)!;
    const intro = t.topicIntros[topic];
    const output = def.tool === "showProjects" ? { slugs: visibleProjects.map((p) => p.slug) } : {};
    const user = { id: uid(), role: "user", parts: [{ type: "text", text: t.topics[topic].question }] };
    const assistant = {
      id: uid(),
      role: "assistant",
      parts: [
        ...(intro ? [{ type: "text", text: intro }] : []),
        { type: `tool-${def.tool}`, toolCallId: uid(), state: "output-available", input: {}, output },
      ],
    };
    setMessages((prev) => [...prev, user, assistant] as UIMessage[]);
  }

  function ask(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    clearError();
    sendMessage({ text: q });
    setInput("");
  }

  // Pitanje sa početne strane stiže kroz URL (?q=... ili ?topic=...). Izvršavamo ga jednom.
  const params = useSearchParams();
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const topic = params.get("topic");
    const q = params.get("q");
    if (!topic && !q) return;
    // Čistimo URL da osvežavanje stranice ne pošalje isto pitanje ponovo.
    window.history.replaceState(null, "", window.location.pathname);
    // queueMicrotask: pokrećemo posle trenutnog rendera, ne usred efekta.
    queueMicrotask(() => {
      if (isTopic(topic)) askTopic(topic);
      else if (q) ask(q);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Svako novo pitanje skroluje na vrh ekrana, a odgovor se pojavljuje ispod njega.
  const lastUserId = [...messages].reverse().find((m) => m.role === "user")?.id;
  useEffect(() => {
    if (!lastUserId) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`m-${lastUserId}`)?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }, [lastUserId]);

  const last = messages.at(-1);
  const turns = messages.reduce<UIMessage[][]>((acc, m) => {
    if (m.role === "user" || acc.length === 0) acc.push([m]);
    else acc[acc.length - 1].push(m);
    return acc;
  }, []);
  const waiting = status === "submitted" || (status === "streaming" && last?.role === "assistant" && last.parts.length === 0);
  const errorKind = error ? (error.message.includes("rate_limited") ? "rate" : error.message.includes("offline") ? "offline" : "other") : null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-6 sm:px-6">
          {messages.length === 0 && <EmptyState lang={lang} onTopic={askTopic} />}

          {/* Poruke grupišemo u "krugove": pitanje + odgovor. Poslednji krug je bar visok
              kao ekran, pa novo pitanje može da stane na vrh, a odgovor se pojavi ispod. */}
          {turns.map((turn, ti) => {
            const isLast = ti === turns.length - 1;
            return (
              <div key={turn[0].id} className={`space-y-6 ${ti > 0 ? "pt-10" : ""} ${isLast ? "min-h-[calc(100dvh-15rem)]" : ""}`}>
                {turn.map((m) =>
                  m.role === "user" ? (
                    <div key={m.id} id={`m-${m.id}`} className="flex scroll-mt-6 justify-end">
                      <p className="max-w-[85%] rounded-2xl bg-subtle px-4 py-2.5 leading-relaxed">
                        <span className="sr-only">{t.chat.you}: </span>
                        {textOf(m)}
                      </p>
                    </div>
                  ) : (
                    <div key={m.id} className="space-y-5">
                      {m.parts.map((part, j) => (
                        <Part key={j} part={part} lang={lang} onOpen={setOpenSlug} />
                      ))}
                    </div>
                  ),
                )}

                {isLast && waiting && (
                  <p className="flex items-center gap-2 text-sm text-muted" role="status">
                    <span className="size-2 animate-pulse rounded-full bg-ink/40 motion-reduce:animate-none" />
                    {t.chat.thinking}
                  </p>
                )}

                {isLast && errorKind && (
                  <div className="rounded-2xl border border-line bg-surface p-4 text-sm" role="alert">
                    <p>{errorKind === "rate" ? t.chat.rateLimited : errorKind === "offline" ? t.chat.offline : t.chat.error}</p>
                    {errorKind === "other" && (
                      <button
                        type="button"
                        onClick={() => regenerate()}
                        className="mt-3 inline-flex min-h-11 items-center rounded-full border border-line px-4 font-medium hover:border-ink/30"
                      >
                        {t.chat.retry}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Donji deo: brza pitanja + polje za unos, kao u referenci. */}
      <div className="border-t border-line bg-paper">
        <div className="mx-auto max-w-3xl px-4 pb-4 pt-2 sm:px-6">
          {messages.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowQuick((v) => !v)}
                aria-expanded={showQuick}
                aria-controls="quick-topics"
                className="mx-auto flex min-h-11 items-center gap-1 px-3 text-xs text-muted hover:text-ink"
              >
                {showQuick ? <ChevronDown aria-hidden className="size-3.5" /> : <ChevronUp aria-hidden className="size-3.5" />}
                {showQuick ? t.composer.hideQuick : t.composer.showQuick}
              </button>
              {showQuick && (
                <div id="quick-topics" className="-mx-4 mb-3 overflow-x-auto px-4 [scrollbar-width:none]">
                  <TopicPills lang={lang} onTopic={askTopic} disabled={busy} compact />
                </div>
              )}
            </>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 rounded-full border border-line bg-subtle p-1.5 pl-5 focus-within:border-ink/25 focus-within:bg-surface"
          >
            <label htmlFor="chat-input" className="sr-only">
              {t.composer.label}
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.composer.placeholder}
              maxLength={600}
              autoComplete="off"
              className="min-h-11 flex-1 bg-transparent text-base outline-none placeholder:text-muted focus-visible:outline-none"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => stop()}
                aria-label={t.composer.stop}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-paper"
              >
                <Square aria-hidden className="size-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                aria-label={t.composer.send}
                disabled={!input.trim()}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-opacity disabled:opacity-30"
              >
                <ArrowUp aria-hidden className="size-4" />
              </button>
            )}
          </form>
        </div>
      </div>

      <ProjectDialog slug={openSlug} lang={lang} onClose={() => setOpenSlug(null)} />
    </div>
  );
}

function textOf(m: UIMessage) {
  return m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
}

// Jedan deo odgovora: tekst ili komponenta koju je AI "pozvao" kroz alat.
function Part({ part, lang, onOpen }: { part: UIMessage["parts"][number]; lang: Lang; onOpen: (s: string) => void }) {
  if (part.type === "text") {
    return (
      <div className="prose-chat leading-relaxed">
        <Markdown
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noreferrer" className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                {children}
              </a>
            ),
          }}
        >
          {part.text}
        </Markdown>
      </div>
    );
  }
  if (!part.type.startsWith("tool-") || !("state" in part) || part.state !== "output-available") return null;
  const output = (part as { output: unknown }).output;

  switch (part.type) {
    case "tool-showProjects":
      return <ProjectsCarousel slugs={(output as ShowProjectsOutput).slugs} lang={lang} onOpen={onOpen} />;
    case "tool-showProject":
      return <ProjectInline slug={(output as ShowProjectOutput).slug} lang={lang} onOpen={onOpen} />;
    case "tool-showSkills":
      return <SkillsPanel lang={lang} />;
    case "tool-showContact":
      return <ContactPanel lang={lang} />;
    case "tool-showAbout":
      return <AboutPanel lang={lang} />;
    case "tool-showFun":
      return <FunPanel lang={lang} />;
    default:
      return null;
  }
}

function EmptyState({ lang, onTopic }: { lang: Lang; onTopic: (t: Topic) => void }) {
  const t = getDictionary(lang);
  return (
    <div className="py-16 text-center">
      <p className="text-lg text-muted">{t.landing.greeting}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{t.meta.chatTitle}</h1>
      <div className="mt-8 flex justify-center">
        <TopicPills lang={lang} onTopic={onTopic} />
      </div>
    </div>
  );
}

export function TopicPills({
  lang,
  onTopic,
  disabled,
  compact,
}: {
  lang: Lang;
  onTopic: (t: Topic) => void;
  disabled?: boolean;
  compact?: boolean;
}) {
  const t = getDictionary(lang);
  return (
    <ul className={`flex gap-2 ${compact ? "w-max sm:mx-auto" : "flex-wrap justify-center"}`}>
      {topics.map(({ id, Icon }) => (
        <li key={id}>
          <button
            type="button"
            onClick={() => onTopic(id)}
            disabled={disabled}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium transition-colors hover:border-ink/30 disabled:opacity-50"
          >
            <Icon aria-hidden className="size-4 text-muted" />
            {t.topics[id].label}
          </button>
        </li>
      ))}
    </ul>
  );
}
