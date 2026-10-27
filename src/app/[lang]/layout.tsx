import type { Metadata } from "next";
import { notFound } from "next/navigation";
// Font je u paketu "geist" (self-hosted): ne zavisi od Google Fonts servera pri buildu.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { isLang, languages, siteUrl } from "@/i18n/config";
import { profile } from "@/data/profile";
import { getDictionary } from "@/i18n/dictionaries";

// Unapred napravi /en i /sr pri buildu (statičke stranice = brzo i dobro za SEO).
// Bilo koji drugi jezik u URL-u (npr. /de) daje 404 preko notFound() ispod.
export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const title = `${profile.name} · ${profile.role[lang]}`;
  const description = getDictionary(lang).landing.intro;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s · ${profile.name}` },
    description,
    // hreflang: govori Googleu da su /en i /sr ista stranica na dva jezika.
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", sr: "/sr", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      title,
      description,
      locale: lang === "sr" ? "sr_RS" : "en_US",
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        {children}
      </body>
    </html>
  );
}
