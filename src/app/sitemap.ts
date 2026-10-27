import type { MetadataRoute } from "next";
import { languages, siteUrl } from "@/i18n/config";
import { visibleProjects as projects } from "@/data/projects";

// Next.js od ovoga pravi /sitemap.xml: spisak svih stranica za Google.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.flatMap((path) =>
    languages.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      alternates: { languages: Object.fromEntries(languages.map((l) => [l, `${siteUrl}/${l}${path}`])) },
    })),
  );
}
