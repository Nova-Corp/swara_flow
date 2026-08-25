import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: absoluteUrl("/"),
    lastModified: new Date("2026-08-25"),
    changeFrequency: "monthly",
    priority: 1,
    images: [absoluteUrl("/og.png")],
  }];
}
