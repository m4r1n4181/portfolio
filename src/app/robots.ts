import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/config";

// Pravi /robots.txt: dozvoli indeksiranje svega i pokaži gde je sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
