import type { Metadata } from "next";
import { Suspense } from "react";
import { Info } from "lucide-react";
import { isLang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { TopBar } from "@/components/TopBar";
import { Chat } from "@/components/chat/Chat";

export async function generateMetadata({ params }: PageProps<"/[lang]/chat">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  // Chat nema sopstveni sadržaj za Google, pa ga ne indeksiramo (noindex).
  return { title: getDictionary(lang).meta.chatTitle, robots: { index: false, follow: true } };
}

export default async function ChatPage({ params }: PageProps<"/[lang]/chat">) {
  const { lang } = await params;
  if (!isLang(lang)) return null;
  const t = getDictionary(lang);

  return (
    <div className="flex h-dvh flex-col">
      <TopBar lang={lang}>
        {/* "popover" je ugrađen u HTML: zatvara se klikom van ili tasterom Escape. */}
        <button
          type="button"
          popoverTarget="chat-info"
          aria-label={t.chat.infoTitle}
          title={t.chat.infoTitle}
          className="grid size-11 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
        >
          <Info aria-hidden className="size-5" />
        </button>
        <div
          id="chat-info"
          popover="auto"
          style={{ inset: "auto", top: 64, right: 16, margin: 0 }}
          className="w-[min(calc(100vw-32px),360px)] rounded-2xl border border-line bg-surface p-5 text-left text-sm leading-relaxed text-ink shadow-[0_8px_30px_rgb(0_0_0/0.08)]"
        >
          <h2 className="font-semibold">{t.chat.infoTitle}</h2>
          <p className="mt-2 text-muted">{t.chat.infoBody}</p>
        </div>
      </TopBar>
      {/* useSearchParams u Chat-u traži Suspense granicu. */}
      <Suspense>
        <Chat lang={lang} />
      </Suspense>
    </div>
  );
}
