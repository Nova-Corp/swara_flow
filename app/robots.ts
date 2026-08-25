import type { MetadataRoute } from "next";
import { absoluteUrl, HAS_PUBLIC_SITE_URL } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!HAS_PUBLIC_SITE_URL) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
