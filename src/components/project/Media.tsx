"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/i18n/config";
import type { Media as MediaItem } from "@/data/projects";

// Prikaz jedne slike ili videa sa potpisom.
// Video: kratki snimci ekrana (bivši GIF-ovi, pretvoreni u MP4 jer su ~10× manji).
// Puštaju se sami, bez zvuka, u petlji, osim ako je u sistemu isključena animacija.
export function Media({ item, lang, priority }: { item: MediaItem; lang: Lang; priority?: boolean }) {
  return (
    <figure className="space-y-2">
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        {item.type === "video" ? (
          <LoopVideo item={item} lang={lang} />
        ) : (
          <Image
            src={item.src}
            alt={item.alt[lang]}
            width={item.width}
            height={item.height}
            sizes="(min-width: 768px) 720px, 100vw"
            priority={priority}
            className="h-auto w-full"
          />
        )}
      </div>
      {item.caption && <figcaption className="text-sm leading-relaxed text-muted">{item.caption[lang]}</figcaption>}
    </figure>
  );
}

function LoopVideo({ item, lang }: { item: MediaItem; lang: Lang }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) ref.current?.pause();
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      poster={item.poster}
      width={item.width}
      height={item.height}
      aria-label={item.alt[lang]}
      autoPlay={!reduced}
      muted
      loop
      playsInline
      controls={reduced}
      preload="metadata"
      className="h-auto w-full"
    >
      {/* WebM za browsere bez H.264 (npr. Chromium), MP4 za Safari i ostale. */}
      <source src={item.src.replace(/\.mp4$/, ".webm")} type="video/webm" />
      <source src={item.src} type="video/mp4" />
    </video>
  );
}
